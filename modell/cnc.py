"""CNC-Dateien (DXF) für den Fräs-Dienstleister aus dem gemeinsamen Teilemodell (ADR 0023).

Je Eckausbildung nach docs/cnc/<variante>/:
  - eine DXF je unterschiedlichem Brett (gleiche Bretter wie S1/S2 nur einmal, Stückzahl im Auftrag),
  - alle-teile.dxf mit jedem Brett in Auftragsstückzahl nebeneinander (Übersicht, kein Nesting),
  - AUFTRAG.md mit Stückliste und allen Annahmen zum Mitschicken,
  - vorschau/*.svg und docs/cnc/cnc.js für den Reiter „DXF · CNC“ im Viewer.

Nur 2D-Durchfräsungen: Außenkontur und Innenkontur (geschlossene Schlitze). Keine Bohrungen,
keine Taschen, keine Beschriftung in den DXF. Maßstab 1:1, Einheit mm.
Die Brettgeometrie (fertige Kontur, Zapfen, Schlitze, Aussparungen) kommt aus
zeichnungen.brett_geometrie() — dieselbe wie auf den Einzelbrett-Blättern.

  .venv/bin/python modell/cnc.py
"""

import json
import math
import sys
from datetime import date
from pathlib import Path

import build123d as bd

sys.path.insert(0, str(Path(__file__).resolve().parent))
import modell  # noqa: E402
import zeichnungen  # noqa: E402

ZIEL = Path(__file__).resolve().parent.parent / "docs" / "cnc"

# (Dateiname, Kürzel gleicher Bretter, Ansicht wie in zeichnungen.brett_geometrie)
# Bezeichnung: {B1} usw. wird zur Eselsbrücke aus modell.GRUPPEN, z. B. „Bottom_1“ (ADR 0022)
BRETTER = [
    ("b1-t1", ["B1", "T1"], "oben", "Bodenplatte ({B1}) und Deckplatte ({T1})"),
    ("s1-s2", ["S1", "S2"], "z", "Seitenwände links ({S1}) und rechts ({S2})"),
    ("m1-m2", ["M1", "M2"], "z", "Trennwand links ({M1}) / rechts ({M2})"),
    ("r1", ["R1"], "x", "Rückwand ({R1})"),
    ("f1", ["F1"], "oben", "Klappbrett Rücksitz ({F1})"),
    ("f2", ["F2"], "oben", "Klappbrett Kopfende ({F2})"),
]
LAYER_AUSSEN, LAYER_INNEN, LAYER_KANTE = "AUSSENKONTUR", "INNENKONTUR", "KANTE_R2"


def eselsbruecke(id):
    """„S2“ → „Side_2“: Wort aus der Klammer in modell.GRUPPEN, Nummer aus dem Kürzel."""
    gruppe = modell.GRUPPEN[id[0]]
    return f"{gruppe[gruppe.index('(') + 1:gruppe.index(')')]}_{id[1:]}"


def _rechteck(u0, v0, u1, v1):
    return bd.Pos(u0, v0) * bd.Rectangle(u1 - u0, v1 - v0, align=(bd.Align.MIN, bd.Align.MIN))


def _eckpunkte(wire):
    """Eckpunkte einer geraden Kontur in Umlaufreihenfolge (Kanten verkettet)."""
    kanten = [(e.start_point(), e.end_point()) for e in wire.edges()]
    a, b = kanten.pop(0)
    punkte = [(a.X, a.Y)]
    ende = b
    while kanten:
        i = next(i for i, (s, e) in enumerate(kanten) if (s - ende).length < 1e-6 or (e - ende).length < 1e-6)
        s, e = kanten.pop(i)
        punkte.append((ende.X, ende.Y))
        ende = e if (s - ende).length < 1e-6 else s
    return punkte


def _flaeche(punkte):
    return sum(x0 * y1 - x1 * y0 for (x0, y0), (x1, y1) in zip(punkte, punkte[1:] + punkte[:1])) / 2


def _innenecken(punkte, aussen):
    """Konkave Ecken (Material > 180°): dort erreicht der runde Fräser die Ecke nicht.

    Liefert je Ecke den Punkt und die Einheitsrichtung der Winkelhalbierenden in den
    weggefrästen Bereich hinein."""
    # Umlaufsinn so drehen, dass das Material links liegt: Außenkontur gegen, Loch im Uhrzeigersinn
    if (_flaeche(punkte) > 0) != aussen:
        punkte = punkte[::-1]
    ecken = []
    n = len(punkte)
    for i, v in enumerate(punkte):
        p, q = punkte[i - 1], punkte[(i + 1) % n]
        a = (v[0] - p[0], v[1] - p[1])
        b = (q[0] - v[0], q[1] - v[1])
        la, lb = (a[0] ** 2 + a[1] ** 2) ** 0.5, (b[0] ** 2 + b[1] ** 2) ** 0.5
        a, b = (a[0] / la, a[1] / la), (b[0] / lb, b[1] / lb)
        if a[0] * b[1] - a[1] * b[0] < -1e-9:              # Rechtskurve bei Material links = Innenecke
            d = (b[0] - a[0], b[1] - a[1])
            ld = (d[0] ** 2 + d[1] ** 2) ** 0.5
            ecken.append((v, (d[0] / ld, d[1] / ld)))
    return ecken


def kontur(p, behalten, loecher, fenster=()):
    """Fertige Frässkontur aus Rechtecken (u0, v0, u1, v1) in (u, v), Ursprung links unten.

    behalten: vereinigt · loecher: Schlitze/Aussparungen, je Seite um die halbe Passungsluft
    größer, Innenecken mit Dogbone · fenster: (u0, v0, u1, v1, radius) mit runden Ecken, erst
    nach den Dogbones abgezogen (runde Ecken brauchen keinen Freischnitt)."""
    c = p["cnc"]
    form = _rechteck(*behalten[0])
    for r in behalten[1:]:
        form = form + _rechteck(*r)
    luft = c["passungsluft"] / 2
    for u0, v0, u1, v1 in loecher:
        form = form - _rechteck(u0 - luft, v0 - luft, u1 + luft, v1 + luft)
    flaechen = form.faces()
    assert len(flaechen) == 1, f"Kontur zerfällt in {len(flaechen)} Teile"
    flaeche = flaechen[0]
    if c["innenecken"] == "dogbone":
        r = c["fraeser_durchmesser"] / 2
        ecken = _innenecken(_eckpunkte(flaeche.outer_wire()), True)
        for w in flaeche.inner_wires():
            ecken += _innenecken(_eckpunkte(w), False)
        for (x, y), (dx, dy) in ecken:                      # Kreis durch die Ecke, Mittelpunkt im Abfall
            flaeche = (flaeche - bd.Pos(x + dx * r, y + dy * r) * bd.Circle(r)).faces()[0]
    for u0, v0, u1, v1, radius in fenster:
        assert radius >= c["fraeser_durchmesser"] / 2, "Fensterradius kleiner als der Fräserradius"
        rund = abs(u1 - u0 - 2 * radius) < 1e-6 and abs(v1 - v0 - 2 * radius) < 1e-6   # Loch im Lochraster
        form = bd.Circle(radius) if rund else bd.RectangleRounded(u1 - u0, v1 - v0, radius)
        flaeche = (flaeche - bd.Pos((u0 + u1) / 2, (v0 + v1) / 2) * form).faces()[0]
    return flaeche


def brett_kontur(alle, p, id, ansicht):
    """Box- und Liegeflächenbrett aus zeichnungen.brett_geometrie (dieselbe Geometrie wie die Einzelbrett-Blätter)."""
    breite, hoehe, behalten, loecher, _ = zeichnungen.brett_geometrie(alle, p, id, ansicht)
    return kontur(p, behalten, loecher), breite, hoehe, len(loecher)


def _symmetrie(flaeche, breite, hoehe):
    """Spiegelachsen der Kontur: 'links/rechts' (senkrechte Mittelachse), 'oben/unten' (waagerechte)."""
    achsen = []
    for name, ebene in (("links/rechts", bd.Plane(origin=(breite / 2, 0, 0), z_dir=(1, 0, 0))),
                        ("oben/unten", bd.Plane(origin=(0, hoehe / 2, 0), z_dir=(0, 1, 0)))):
        gespiegelt = flaeche.mirror(ebene)
        if (flaeche - gespiegelt).area + (gespiegelt - flaeche).area < 0.01:
            achsen.append(name)
    return achsen


def _signatur(flaeche):
    bb = flaeche.bounding_box()
    return (round(flaeche.area, 1), round(bb.size.X, 2), round(bb.size.Y, 2), len(flaeche.inner_wires()),
            len(flaeche.edges()))


def _dxf(teile, pfad):
    """teile: Liste (Face, Versatz u, Versatz v[, Kanten mit Kantenbruch])."""
    dxf = bd.ExportDXF(unit=bd.Unit.MM)
    dxf.add_layer(LAYER_AUSSEN, color=bd.ColorIndex.RED)
    dxf.add_layer(LAYER_INNEN, color=bd.ColorIndex.BLUE)
    if any(len(t) > 3 and t[3] for t in teile):
        dxf.add_layer(LAYER_KANTE, color=bd.ColorIndex.GREEN)
    for flaeche, du, dv, *kanten in teile:
        verschoben = bd.Pos(du, dv) * flaeche
        dxf.add_shape(verschoben.outer_wire(), layer=LAYER_AUSSEN)
        for w in verschoben.inner_wires():
            dxf.add_shape(w, layer=LAYER_INNEN)
        for k in (kanten[0] if kanten else []):
            dxf.add_shape(bd.Pos(du, dv) * k, layer=LAYER_KANTE)
    dxf.write(str(pfad))


def _schreibe(ordner, pfad, zeilen, flaechen, titel, abschnitte_liste):
    """DXF je Brett + alle-teile.dxf + Vorschau-SVGs + AUFTRAG.md; liefert die Viewer-Daten.

    zeilen: je Brett ein dict (datei, kuerzel, name, stk, mass, schlitze, fenster, symmetrie, material),
    flaechen: dieselbe Reihenfolge, je (Face, breite, hoehe)."""
    ordner.mkdir(parents=True, exist_ok=True)
    (ordner / "vorschau").mkdir(exist_ok=True)
    abstand = modell.lade_parameter()["cnc"]["teileabstand"]
    sammlung, v = [], 0
    for zl, (flaeche, breite, hoehe) in zip(zeilen, flaechen):
        kanten = zl.get("_kanten", [])
        _dxf([(flaeche, 0, 0, kanten)], ordner / zl["datei"])
        _vorschau([(flaeche, 0, 0, kanten)], ordner / "vorschau" / f"{zl['datei'][:-4]}.svg", 5)
        sammlung += [(flaeche, i * (breite + abstand), v, kanten) for i in range(zl["stk"])]
        v += hoehe + abstand
    _dxf(sammlung, ordner / "alle-teile.dxf")
    _vorschau(sammlung, ordner / "vorschau" / "alle-teile.svg", 6)
    (ordner / "AUFTRAG.md").write_text(auftrag(titel, zeilen, abschnitte_liste), encoding="utf-8")
    p = modell.lade_parameter()
    return {
        "platten": _platten_daten(ordner, pfad, zeilen, flaechen, p),
        "platte": f"{zeichnungen.fmt(p['cnc']['platte']['laenge'])} × {zeichnungen.fmt(p['cnc']['platte']['breite'])}",
        "teile": [{"datei": f"{pfad}/{zl['datei']}", "vorschau": f"{pfad}/vorschau/{zl['datei'][:-4]}.svg",
                   "kuerzel": zl["kuerzel"], "name": zl["name"], "stk": zl["stk"], "mass": zl["mass"],
                   "schlitze": zl["schlitze"], "fenster": zl["fenster"], "fenster_art": zl.get("fenster_art", "Fenster"),
                   "material": zl["material"], "kanten_r2": len(zl.get("_kanten", []))}
                  for zl in zeilen],
        "alle_dxf": f"{pfad}/alle-teile.dxf", "alle_vorschau": f"{pfad}/vorschau/alle-teile.svg",
        "auftrag": f"{pfad}/AUFTRAG.md",
        "abschnitte": [{"titel": t, "art": a, "texte": x} for t, a, x in abschnitte_liste],
    }


def _zeile(datei, ids, name, stk, flaeche, breite, hoehe, material, fenster=0):
    return {"datei": datei, "kuerzel": " / ".join(ids), "name": name, "stk": stk,
            "mass": f"{zeichnungen.fmt(breite)} × {zeichnungen.fmt(hoehe)}",
            "schlitze": len(flaeche.inner_wires()) - fenster, "fenster": fenster,
            "symmetrie": _symmetrie(flaeche, breite, hoehe), "material": material}


def erzeuge(variante):
    p = modell.lade_parameter()
    alle = modell.teile(p, variante)
    zeilen, flaechen = [], []
    for datei, ids, ansicht, bezeichnung in BRETTER:
        flaeche, breite, hoehe, _ = brett_kontur(alle, p, ids[0], ansicht)
        for weitere in ids[1:]:                            # gleiche Bretter müssen wirklich gleich sein
            andere = brett_kontur(alle, p, weitere, ansicht)[0]
            assert _signatur(andere) == _signatur(flaeche), f"{weitere} weicht von {ids[0]} ab"
        namen = bezeichnung.format(**{i: eselsbruecke(i) for i in ids})
        zeilen.append(_zeile(f"{datei}.dxf", ids, namen, len(ids), flaeche, breite, hoehe, p["cnc"]["material"]))
        flaechen.append((flaeche, breite, hoehe))
    titel = f"Box + Liegefläche ({variante})"
    pfad = f"docs/cnc/{variante}"
    return ZIEL / variante, zeilen, _schreibe(ZIEL / variante, pfad, zeilen, flaechen, titel,
                                              abschnitte(variante, p, zeilen))


def _kanten_r2(flaeche, oben=None, bereich=None, fenster=(), ringsum=False):
    """Kanten mit gefrästem Kantenbruch (ADR 0034) als Liste von Edges.

    oben: v der Oberkante — die waagerechten Kanten darauf (Rand der Kastenwand) · bereich: (u0, v0, u1, v1),
    jede Kante der Außenkontur ganz darin (Griffausschnitt) · fenster: (u0, v0, u1, v1, r) — Innenkonturen mit
    dieser Mitte (Fenster, Löcher; Schlitze nicht) · ringsum: Außenkontur, soweit sie auf dem Hüllrechteck liegt
    (Sitz-/Tischbrett: ohne die Böden der Aussparungen für die Wangenzapfen)."""
    e = 1e-3
    bb = flaeche.bounding_box()
    out = []
    for k in flaeche.outer_wire().edges():
        a, b = k.start_point(), k.end_point()
        if oben is not None and abs(a.Y - oben) < e and abs(b.Y - oben) < e:
            out.append(k)
        elif bereich and all(bereich[0] - e <= q.X <= bereich[2] + e and bereich[1] - e <= q.Y <= bereich[3] + e
                             for q in (a, b, k.center())):
            out.append(k)
        elif ringsum and any(all(abs(getattr(q, ach) - wert) < e for q in (a, b))
                             for ach, wert in (("X", bb.min.X), ("X", bb.max.X), ("Y", bb.min.Y), ("Y", bb.max.Y))):
            out.append(k)
    mitten = [((f[0] + f[2]) / 2, (f[1] + f[3]) / 2) for f in fenster]
    for w in flaeche.inner_wires():
        m = w.bounding_box().center()
        if any(abs(m.X - u) < 0.5 and abs(m.Y - v) < 0.5 for u, v in mitten):
            out += w.edges()
    return out


def erzeuge_schubladen():
    """Zweiter Auftrag: Wände und Böden der Schubladenkästen D1–D3 (ADR 0024)."""
    p = modell.lade_parameter()
    zeilen, flaechen = [], []
    for b in modell.schubladen_bretter(p):
        flaeche = kontur(p, b["behalten"], b["loecher"], b["fenster"] + b.get("griff", []))
        for u, v, r, seite in b.get("griff_ecken", []):    # obere Außenecken des Griffausschnitts runden
            mu = u + seite * r
            ecke = bd.Pos(u + seite * r / 2, v - r / 2) * bd.Rectangle(r, r) - bd.Pos(mu, v - r) * bd.Circle(r)
            flaeche = (flaeche - ecke).faces()[0]
        datei = "-".join(i.lower() for i in b["ids"]) + ".dxf"   # z. B. d1-s-d2-s.dxf
        kanten = []
        if "schubladen" in p["cnc"]["kantenbruch"]["auftraege"] and not b["id"].endswith("-B"):
            griff = b.get("griff", [])                    # Ausschnitt samt gerundeten oberen Außenecken
            ro = max([r for _, _, r, _ in b.get("griff_ecken", [])] + [0])
            bereich = (griff[0][0] - ro, griff[0][1], griff[0][2] + ro, b["hoehe"]) if griff and griff[0][3] > b["hoehe"] else None
            kanten = _kanten_r2(flaeche, oben=b["hoehe"], bereich=bereich,
                                fenster=b["fenster"] + [g for g in griff if g[3] <= b["hoehe"]])
        zeilen.append(_zeile(datei, b["ids"], b["name"], b["stk"], flaeche, b["breite"], b["hoehe"],
                             f"Birke-Multiplex {zeichnungen.fmt(b['staerke'])} mm", len(b["fenster"])))
        flaechen.append((flaeche, b["breite"], b["hoehe"]))
        voll = kontur(p, b["behalten"], b["loecher"]).area           # ohne Fenster, Löcher und Griff
        rund = b["fenster"] and b["fenster"][0][4] * 2 == b["fenster"][0][2] - b["fenster"][0][0]
        zeilen[-1].update(_staerke=b["staerke"], _flaeche=flaeche.area, _voll=voll,
                          fenster_art=("Löcher" if rund else "Fenster") + (" + Griff" if b.get("griff") else ""),
                          _kanten=kanten)
    zeilen_c, flaechen_c = brettelemente(p)
    zeilen += zeilen_c
    flaechen += flaechen_c
    return ZIEL / "schubladen", zeilen, _schreibe(ZIEL / "schubladen", "docs/cnc/schubladen", zeilen, flaechen,
                                                  TITEL_SCHUBLADEN, abschnitte_schubladen(p, zeilen))


TITEL_SCHUBLADEN = "Schubladenkästen D1–D3 + Sitz-/Tischbretter C1–C3"


def brettelemente(p):
    """Sitz-/Tischbretter C1–C3: Brett mit Schlitzen + zwei Wangen mit Durchzapfen (ADR 0029, ADR 0031).

    Im selben Auftrag wie die Schubladenkästen (Bauherr, 2026-11-13). Gleiche Teile (C1 = C2, alle
    Wangen gleich lang) werden zusammengefasst, wenn ihre Kontur wirklich übereinstimmt."""
    alle = modell.teile(p)
    zug = p["elemente"]["wangenzapfen"]["schleifzugabe"]
    teile = []                                          # (id, Fläche, breite, hoehe, Anzahl Schlitze)
    for c in ("C1", "C2", "C3"):
        breite, hoehe, behalten, loecher, _ = zeichnungen.brett_geometrie(alle, p, c, "oben")
        teile.append((c, kontur(p, behalten, loecher), breite, hoehe, len(loecher)))
        for seite in ("a", "b"):
            wid = f"{c}-W{seite}"
            breite, hoehe, behalten, loecher, zapfen = zeichnungen.brett_geometrie(alle, p, wid, "z")
            # Zapfen oben um die Schleifzugabe länger: stehen nach dem Verleimen über, bündig schleifen
            behalten = behalten[:1] + [(u0, v0, u1, v1 + zug) for u0, v0, u1, v1 in zapfen]
            teile.append((wid, kontur(p, behalten, loecher), breite, max(r[3] for r in behalten), 0))
    gruppen = []                                        # [[ids], Fläche, breite, hoehe, schlitze]
    for id, flaeche, breite, hoehe, schlitze in teile:
        gleich = next((g for g in gruppen if _signatur(g[1]) == _signatur(flaeche)), None)
        if gleich:
            gleich[0].append(id)
        else:
            gruppen.append([[id], flaeche, breite, hoehe, schlitze])
    zeilen, flaechen = [], []
    staerke = p["elemente"]["brett_staerke"]
    for ids, flaeche, breite, hoehe, _ in gruppen:
        elemente = list(dict.fromkeys(i[:2] for i in ids))          # C1, C2, C3
        if "-W" in ids[0]:                                          # Wangen: je Element a + b
            kuerzel = [f"{c}-Wa/b" for c in elemente]
            name = "Wange " + " / ".join(f"{modell.ELEMENTE[c]} ({c})" for c in elemente)
            datei = "-".join(c.lower() for c in elemente) + "-wangen.dxf"
        else:
            kuerzel = ids
            name = " / ".join(f"{modell.ELEMENTE[c]} ({c})" for c in ids)
            datei = "-".join(c.lower() for c in ids) + ".dxf"
        zeilen.append(_zeile(datei, kuerzel, name, len(ids), flaeche, breite, hoehe, p["cnc"]["material"]))
        kanten = (_kanten_r2(flaeche, ringsum=True)
                  if "-W" not in ids[0] and "schubladen" in p["cnc"]["kantenbruch"]["auftraege"] else [])
        zeilen[-1].update(_staerke=staerke, _flaeche=flaeche.area, _voll=flaeche.area, _kanten=kanten)
        flaechen.append((flaeche, breite, hoehe))
    return zeilen, flaechen


def _wenden(zeilen):
    ohne_achse = [zl["kuerzel"] for zl in zeilen if not zl["symmetrie"]]
    if ohne_achse:
        return f"**Nicht wenden:** {', '.join(ohne_achse)} sind nicht spiegelsymmetrisch und nur so richtig, wie gezeichnet."
    return ("Wenden (Rückseite nach oben) ist ebenfalls erlaubt: Jedes Teil ist spiegelsymmetrisch ("
            + ", ".join(f"{zl['kuerzel']} {' + '.join(zl['symmetrie'])}" for zl in zeilen)
            + "), gewendet entsteht dasselbe Teil.")


def _ecken(c):
    f = zeichnungen.fmt
    return (f"Jede Innenecke hat einen **Dogbone**: Freischnitt Ø {f(c['fraeser_durchmesser'])} mm über die Ecke "
            "hinaus, Kreis durch den Eckpunkt. Ohne ihn bliebe in jeder Ecke ein Radius stehen, und die eckigen "
            "Zapfen passten nicht in Schlitze und Aussparungen."
            if c["innenecken"] == "dogbone" else
            "Innenecken sind **scharfkantig** gezeichnet — der Dienstleister setzt die Freischnitte (Dogbones) selbst.")


def _dateien(c, innen="geschlossene Schlitze", kante=False):
    f = zeichnungen.fmt
    r = f(c["kantenbruch"]["radius"])
    return ("Dateien", "liste", [
        "DXF (AutoCAD 2013, `AC1027`), Maßstab 1:1, Einheit **mm**, Ursprung links unten am Teil.",
        f"Layer `{LAYER_AUSSEN}` (rot): Außenkontur, durchfräsen, Fräser außen an der Linie.",
        f"Layer `{LAYER_INNEN}` (blau): {innen}, durchfräsen, Fräser innen an der Linie.",
    ] + ([f"Layer `{LAYER_KANTE}` (grün): **Kantenbruch R{r} — optional** an der Oberseite — dieselben Linien wie die "
          f"Kontur darunter, dort mit Abrundfräser (Viertelstabfräser) R{r} nachfahren. Keine Durchfräsung. Fehlt die "
          "Zeit oder der Fräser, den Layer einfach weglassen — dann bricht der Bauherr die Kanten von Hand."]
         if kante else []) + [
        "Alle Konturen geschlossen. Nur Linien und Kreisbögen, keine Beschriftung, keine Bohrungen, "
        "keine Taschen — alles ist ein 2D-Durchschnitt" + (f" außer dem optionalen Kantenbruch R{r}." if kante else "."),
        f"`alle-teile.dxf` enthält jedes Teil in Auftragsstückzahl nebeneinander, mit {f(c['teileabstand'])} mm "
        "Abstand — nur zur Übersicht, **kein Nesting**. Die Verteilung auf die Platten macht der Dienstleister.",
    ])


def abschnitte(variante, p, zeilen):
    """Alle Hinweise zum Auftrag als (Titel, Art, [Texte]) — Quelle für AUFTRAG.md und den Viewer.

    Art: "absatz" | "liste" | "nummeriert". Texte dürfen **fett** und `code` enthalten."""
    c, z = p["cnc"], p["zapfen"]
    f = zeichnungen.fmt
    stk = sum(zl["stk"] for zl in zeilen)
    out = [
        ("Teile", "absatz", [f"Material: **{c['material']}**, {stk} Teile in {len(zeilen)} unterschiedlichen Formen."]),
        _dateien(c),
    ]
    if variante == "gezapft":
        out.append(("Passung Zapfen ↔ Schlitz", "liste", [
            f"Die Wände (S1/S2, M1/M2, R1) tragen Zapfen {f(z['laenge'])} × {f(c['plattenstaerke'])} mm, B1/T1 und R1 "
            "die passenden Schlitze und Aussparungen — alles ganz durch die Platte.",
            f"Schlitze und Aussparungen sind je Richtung **{f(c['passungsluft'])} mm größer** als der Zapfen "
            "(Zapfen bleiben auf Nennmaß).",
            f"Zapfen sind **19 mm lang** (18 mm Plattenstärke + {f(z['schleifzugabe'])} mm Schleifzugabe): Sie stehen "
            "nach dem Zusammenbau 1 mm über und werden bündig geschliffen. Gewollt, nicht korrigieren.",
            _ecken(c),
        ]))
    else:
        out.append(("Eckausbildung „stumpf“", "absatz", [
            "Rückfallvariante ohne Zapfen: alle Bretter sind reine Rechtecke, die Wände stehen stumpf zwischen "
            "Boden- und Deckplatte. Dafür braucht es eigentlich keine CNC — ein Plattenzuschnitt genügt."]))
    out.append(("Annahmen (vor dem Auftrag mit dem Dienstleister klären)", "nummeriert", [
        f"**Fräserdurchmesser {f(c['fraeser_durchmesser'])} mm.** Bestimmt die Dogbones. Fräst der Dienstleister mit "
        "einem anderen Durchmesser, `cnc.fraeser_durchmesser` ändern und neu erzeugen — oder "
        "`cnc.innenecken: \"keine\"`, wenn er die Freischnitte selbst setzt.",
        f"**Passungsluft {f(c['passungsluft'])} mm** bei Plattenstärke {f(c['plattenstaerke'])} mm. „18 mm“-Multiplex "
        "ist real oft 17,6–18,3 mm. Ist die Platte dicker als 18,0, die Luft um die Differenz erhöhen. Ein "
        "Probestück (ein Schlitz + ein Zapfen) vor dem ganzen Auftrag ist sinnvoll.",
        "**Haltestege** (Tabs) und Fräsreihenfolge legt der Dienstleister fest; danach nur Stegreste verschleifen.",
        f"**Faserrichtung egal**: Die Teile dürfen beim Nesting beliebig gedreht werden. {_wenden(zeilen)}",
        "**Keine Bohrungen**: Scharniere (V17), Gurtschlaufen (F2) und Schrauben werden beim Zusammenbau "
        "angerissen und gebohrt.",
        "**Nicht enthalten**: Schubladenkästen D1–D3 und Sitz-/Tischbretter C1–C3 sind ein eigener Auftrag "
        "(`docs/cnc/schubladen/`, ADR 0024, ADR 0031).",
        "**Kanten**: keine Fase, kein Radius an den Außenkanten.",
    ]))
    return out


def abschnitte_schubladen(p, zeilen):
    """Hinweise zum Schubladen-Auftrag (ADR 0024), Form wie abschnitte()."""
    c, s, z = p["cnc"], p["schubladen"], p["zapfen"]
    f = zeichnungen.fmt
    T, Tb, bz, fe = s["wandstaerke"], s["bodenstaerke"], s["bodenzapfen"], s["fenster"]
    kb = "schubladen" in c["kantenbruch"]["auftraege"]
    r = f(c["kantenbruch"]["radius"])
    stk = sum(zl["stk"] for zl in zeilen)
    e, wz = p["elemente"], p["elemente"]["wangenzapfen"]
    alle = modell.teile(p)
    kaesten = []
    for d in ("D1", "D2", "D3"):
        (x0, x1), (y0, y1), (z0, z1) = next(t for t in alle if t["id"] == d)["box"]
        kaesten.append(f"{d} {f(x1 - x0)} × {f(z1 - z0)} × {f(y1 - y0)}")
    gewicht, ohne = (sum(zl["stk"] * zl[k] * zl["_staerke"] for zl in zeilen) * 1e-9 * s["dichte_kg_m3"]
                     for k in ("_flaeche", "_voll"))
    return [
        ("Teile", "absatz", [
            f"Material: **Birke-Multiplex {f(T)} mm** (Wände) und **{f(Tb)} mm** (Böden), {stk} Teile in "
            f"{len(zeilen)} unterschiedlichen Formen — die Wände und Böden der drei Schubladenkästen "
            f"(Außenmaß B × T × H: {', '.join(kaesten)} mm) und die Sitz-/Tischbretter C1–C3 mit ihren Wangen "
            f"(alles {f(e['brett_staerke'])} mm).",
            f"Gewicht aller Teile ca. **{f(round(gewicht, 1))} kg** (ohne Fenster, Löcher und Griffe "
            f"wären es {f(round(ohne, 1))} kg, Dichte {s['dichte_kg_m3']} kg/m³ angenommen)."]),
        _dateien(c, "geschlossene Schlitze, Fenster und Löcher der Seitenwände", kante=kb),
        ("Verbindungen", "liste", [
            f"**Ecken: Fingerzinken**, {s['zinken_anzahl']} Felder über die Kastenhöhe. Die Seitenwände (`-S`) "
            "haben oben und unten einen Zinken, Kastenfront (`-E1`) und -rückwand (`-E2`) die Lücken dazwischen.",
            f"**Boden** (`-B`, {f(Tb)} mm): Zapfen {f(bz['laenge'])} mm breit, je {bz['anzahl_lang']} an den langen "
            f"und {bz['anzahl_kurz']} an den kurzen Kanten, durch Schlitze {f(bz['laenge'])} × {f(Tb)} mm in allen "
            f"vier Wänden, {f(s['boden_abstand_unten'])} mm über der Wandunterkante.",
            f"Lücken und Schlitze sind je Richtung **{f(c['passungsluft'])} mm größer** als Zinken und Zapfen "
            "(die bleiben auf Nennmaß).",
            f"Zinken und Bodenzapfen sind **{f(T + z['schleifzugabe'])} mm lang** ({f(T)} mm Wandstärke + "
            f"{f(z['schleifzugabe'])} mm Schleifzugabe): Sie stehen nach dem Verleimen 1 mm über und werden bündig "
            "geschliffen, bevor die Schienen angeschraubt werden. Gewollt, nicht korrigieren.",
            f"**Sitz-/Tischbretter C1–C3**: Brett oben, darunter zwei Wangen (`-Wa`/`-Wb`, umgedrehtes U). "
            f"Jede Wange greift mit {wz['anzahl']} Zapfen {f(wz['laenge'])} mm breit durch das Brett; die Wangen "
            "sitzen bündig mit den Brettkanten, deshalb sind es **offene Aussparungen am Brettrand**, keine "
            f"geschlossenen Schlitze. Die Zapfen sind {f(e['brett_staerke'] + wz['schleifzugabe'])} mm lang "
            f"({f(wz['schleifzugabe'])} mm Schleifzugabe), werden verleimt und bündig geschliffen (ADR 0029, ADR 0031). "
            "Alle sechs Wangen sind gleich.",
            _ecken(c),
            f"**Fenster** in den Seitenwänden der äußeren Schubladen "
            f"({', '.join(d for d, art in s['aussparung'].items() if art == 'fenster')}): Ecken mit Radius "
            f"{f(fe['radius'])} mm, ohne Dogbone. **Lochraster** (runde Löcher Ø {f(s['lochraster']['durchmesser'])} mm "
            f"im Abstand {f(s['lochraster']['abstand'])} mm) in den Seitenwänden der mittleren Schublade "
            f"({', '.join(d for d, art in s['aussparung'].items() if art == 'lochraster')}) und in allen "
            "Kastenfronten und -rückwänden (ADR 0026, ADR 0027). Das Band der Schubladenschiene "
            f"(± {f(fe['abstand_schiene'])} mm) bleibt immer voll stehen — dort wird die Schiene angeschraubt.",
            (f"**Griff** in der Kastenfront (`-E1`): Ausschnitt von der Oberkante, {f(s['griff']['breite'])} mm breit, "
             f"{f(s['griff']['tiefe'])} mm tief, unten Radius {f(s['griff']['radius'])} mm"
             + (f", die beiden oberen Außenecken Radius {f(s['griff']['radius_oben'])} mm"
                if s["griff"].get("radius_oben") else "") + " (ADR 0027)."
             if s["griff"]["art"] == "ausschnitt" else
             f"**Griff** in der Kastenfront (`-E1`): Griffloch {f(s['griff']['breite'])} × {f(s['griff']['tiefe'])} mm "
             f"mit runden Enden, {f(s['griff']['abstand_oben'])} mm unter der Oberkante (ADR 0027)."),
        ]),
        ("Annahmen (vor dem Auftrag klären)", "nummeriert", [
            f"**Kastenbreite** = Sektionsbreite − 2 × Schienenstärke − 2 mm Spiel. Die Stärke der gelieferten "
            f"80-kg-Schiene ist **gemessen** ({f(p['schienen']['typen']['leicht']['staerke'])} mm je Seite, "
            "2026-11-12). Die Lage der Schraublöcher steht noch aus — die Fenster lassen das Schienenband "
            "± 15 mm frei, das sollte reichen; vor der Bestellung trotzdem gegen die Lochreihe prüfen.",
            f"**Fräserdurchmesser {f(c['fraeser_durchmesser'])} mm** und **Passungsluft {f(c['passungsluft'])} mm** "
            f"wie beim Korpus-Auftrag. Gilt auch für die {f(Tb)}-mm-Böden: „{f(Tb)} mm“-Multiplex ist real oft "
            "etwas dünner oder dicker — die Schlitzhöhe an der gelieferten Platte prüfen.",
            "**Haltestege** (Tabs) und Fräsreihenfolge legt der Dienstleister fest; danach nur Stegreste verschleifen.",
            f"**Faserrichtung egal**: Die Teile dürfen beim Nesting beliebig gedreht werden. {_wenden(zeilen)}",
            "**Keine Bohrungen**: Die Schienen (auch die M6-Löcher der 170-kg-Schienen in den Wangen) werden beim "
            "Zusammenbau angerissen und gebohrt.",
            "**Keine Frontblenden** (ADR 0027): Die Kastenfront `-E1` ist die sichtbare Front, mit gefrästem Griff.",
            (f"**Kantenbruch R{r} — optional** (Abrundfräser, nur von oben, eine Aufspannung) an allen Kanten auf Layer "
             f"`{LAYER_KANTE}`: Oberkante der Kastenwände (`-S`, `-E1`, `-E2`), Griffausschnitt, Fenster und Löcher, "
             "die Sitz-/Tischbretter C1–C3 ringsum. **Nicht** an Zinken, Zapfen, Schlitzen, Aussparungen und Böden — "
             "Fügeflächen bleiben scharfkantig. Die Unterseite bricht der Bauherr von Hand (ADR 0034). Ohne den Layer "
             "(keine Zeit, kein Fräser) bricht er auch die Oberseite von Hand — das Teil passt trotzdem."
             if kb else
             "**Kanten**: keine Fase, kein Radius an den Außenkanten. Die Kanten am Griff werden von Hand gebrochen."),
        ]),
    ]


def auftrag(titel, zeilen, abschnitte_liste):
    teile = ["| Datei | Kürzel | Langname | Material | Stk. | Außenmaß (mm) |", "|---|---|---|---|---|---|"]
    teile += [f"| `{zl['datei']}` | {zl['kuerzel']} | {zl['name']} | {zl['material']} | {zl['stk']} | {zl['mass']} |"
              for zl in zeilen]
    md = [f"# CNC-Auftrag — VW Caddy Mk3 Camper, {titel}", "",
          f"Erzeugt am {date.today().isoformat()} von `modell/cnc.py` aus `modell/parameter.json` — nicht von Hand "
          "ändern, sondern Parameter anpassen und neu erzeugen. Entscheidung und Hintergrund: ADR 0023"
          + (", ADR 0024, ADR 0031." if "Schublade" in titel else ".")]
    for t, art, texte in abschnitte_liste:
        md += ["", f"## {t}", ""]
        if art == "absatz":
            md += [x for x in texte for x in (x, "")][:-1]
        else:
            md += [(f"{i}. " if art == "nummeriert" else "- ") + x for i, x in enumerate(texte, 1)]
        if t == "Teile":
            md += [""] + teile
    return "\n".join(md) + "\n"


def _maxrects(teile, L, B, drehen=False):
    """Rechtecke (schluessel, w, h) auf eine Fläche L × B legen (MaxRects, beste kurze Seite).

    drehen=True erlaubt je Teil auch 90°. Liefert (gelegt [(schluessel, x, y, gedreht)], übrig [teile]).
    Grob, aber für eine Plattenzahl genau genug."""
    frei, gelegt, uebrig = [(0, 0, L, B)], [], []
    for sch, w0, h0 in teile:
        beste = None
        for fx, fy, fw, fh in frei:
            for gedreht, (w, h) in enumerate([(w0, h0)] + ([(h0, w0)] if drehen else [])):
                if w <= fw + 1e-6 and h <= fh + 1e-6:
                    wert = (min(fw - w, fh - h), max(fw - w, fh - h))
                    if beste is None or wert < beste[0]:
                        beste = (wert, fx, fy, bool(gedreht), w, h)
        if beste is None:
            uebrig.append((sch, w0, h0))
            continue
        _, x, y, gedreht, w, h = beste
        gelegt.append((sch, x, y, gedreht))
        neu = []
        for fx, fy, fw, fh in frei:                  # jedes freie Rechteck um das neue Teil zerlegen
            if x >= fx + fw or x + w <= fx or y >= fy + fh or y + h <= fy:
                neu.append((fx, fy, fw, fh))
                continue
            if x > fx:
                neu.append((fx, fy, x - fx, fh))
            if x + w < fx + fw:
                neu.append((x + w, fy, fx + fw - x - w, fh))
            if y > fy:
                neu.append((fx, fy, fw, y - fy))
            if y + h < fy + fh:
                neu.append((fx, y + h, fw, fy + fh - y - h))
        frei = [a for a in neu if not any(a != b and b[0] <= a[0] and b[1] <= a[1] and a[0] + a[2] <= b[0] + b[2]
                                          and a[1] + a[3] <= b[1] + b[3] for b in neu)]
    return gelegt, uebrig


def plattenbelegung(zeilen, flaechen, p, drehen=False):
    """Plattenbedarf je Stärke (ADR 0033): Hüllrechtecke der Teile in Auftragsstückzahl, lange Seite längs der
    Platte (Faser), `teileabstand` dazwischen, Randstreifen ringsum. drehen=True: Teile dürfen auch quer
    liegen (Faser egal). Nur eine Schätzung für uns — der Dienstleister nestet selbst (alle-teile.dxf
    bleibt ungenestet).

    Liefert {stärke: [Platte, …]}, Platte = [(Fläche, gedreht, x, y), …] in Plattenkoordinaten."""
    c = p["cnc"]
    pl, a = c["platte"], c["teileabstand"]
    L = pl["laenge"] - 2 * pl["randstreifen"] + a     # jedes Teil belegt w + a, das letzte braucht kein a
    B = pl["breite"] - 2 * pl["randstreifen"] + a
    je_staerke = {}
    for zl, (flaeche, breite, hoehe) in zip(zeilen, flaechen):
        st = zl.get("_staerke", c["plattenstaerke"])
        gedreht = hoehe > breite
        w, h = (hoehe, breite) if gedreht else (breite, hoehe)
        assert w <= pl["laenge"] - 2 * pl["randstreifen"] and h <= pl["breite"] - 2 * pl["randstreifen"], \
            f"{zl['datei']} passt nicht auf eine Platte"
        je_staerke.setdefault(st, []).extend([((flaeche, gedreht), w + a, h + a)] * zl["stk"])
    out = {}
    for st, teile in sorted(je_staerke.items(), reverse=True):
        beste = None
        for ordnung in (lambda t: -t[1] * t[2], lambda t: -t[1], lambda t: -t[2], lambda t: -max(t[1], t[2])):
            rest, platten = sorted(teile, key=ordnung), []
            while rest:
                gelegt, rest = _maxrects(rest, L, B, drehen)
                platten.append(gelegt)
            if beste is None or len(platten) < len(beste) or (
                    len(platten) == len(beste) and len(platten[-1]) < len(beste[-1])):
                beste = platten
        r = pl["randstreifen"]
        out[st] = [[(fl, gedreht != quer, x + r, y + r) for (fl, gedreht), x, y, quer in platte] for platte in beste]
    return out


def _platten_vorschau(platten, p, pfad):
    """Alle Platten einer Stärke untereinander: Plattenrand grau, Teile wie in der DXF-Vorschau."""
    pl = p["cnc"]["platte"]
    svg = bd.ExportSVG(unit=bd.Unit.MM, margin=40)
    svg.add_layer("PLATTE", line_weight=6, line_color=(0.55, 0.55, 0.55))
    svg.add_layer(LAYER_AUSSEN, line_weight=5, line_color=(0.85, 0.1, 0.1))
    svg.add_layer(LAYER_INNEN, line_weight=5, line_color=(0.1, 0.25, 0.85))
    for i, platte in enumerate(platten):
        dv = -i * (pl["breite"] + 150)
        svg.add_shape(_rechteck(0, dv, pl["laenge"], dv + pl["breite"]).faces()[0].outer_wire(), "PLATTE")
        for flaeche, gedreht, x, y in platte:
            if gedreht:                                 # um 90° drehen und wieder bei (0, 0) beginnen lassen
                flaeche = bd.Rot(0, 0, 90) * flaeche
            bb = flaeche.bounding_box()
            teil = bd.Pos(x - bb.min.X, y + dv - bb.min.Y) * flaeche
            svg.add_shape(teil.outer_wire(), LAYER_AUSSEN)
            for w in teil.inner_wires():
                svg.add_shape(w, LAYER_INNEN)
    svg.write(str(pfad))


def _platten_daten(ordner, pfad, zeilen, flaechen, p):
    """Plattenbelegung je Stärke schätzen (Faser längs und frei drehbar), Vorschau schreiben; Daten für den Viewer."""
    pl = p["cnc"]["platte"]
    out = {}
    for drehen, zusatz in ((False, ""), (True, "-gedreht")):
        for st, platten in plattenbelegung(zeilen, flaechen, p, drehen).items():
            datei = f"platten-{zeichnungen.fmt(st)}mm{zusatz}.svg"
            _platten_vorschau(platten, p, ordner / "vorschau" / datei)
            teile = sum(f.area for platte in platten for f, *_ in platte)
            eintrag = out.setdefault(st, {"staerke": st, "teile": sum(len(x) for x in platten)})
            eintrag["gedreht" if drehen else "laengs"] = {
                "anzahl": len(platten), "vorschau": f"{pfad}/vorschau/{datei}",
                "belegung": round(100 * teile / (len(platten) * pl["laenge"] * pl["breite"]))}
    return list(out.values())


def _vorschau(teile, pfad, strich):
    """SVG-Vorschau wie die DXF: Außenkontur rot, Schlitze blau (für den Reiter „DXF · CNC“)."""
    svg = bd.ExportSVG(unit=bd.Unit.MM, margin=strich * 4)
    svg.add_layer(LAYER_KANTE, line_weight=strich * 3, line_color=(0.2, 0.7, 0.3))   # grüner Saum unter der Kontur
    svg.add_layer(LAYER_AUSSEN, line_weight=strich, line_color=(0.85, 0.1, 0.1))
    svg.add_layer(LAYER_INNEN, line_weight=strich, line_color=(0.1, 0.25, 0.85))
    for flaeche, du, dv, *kanten in teile:
        for k in (kanten[0] if kanten else []):
            svg.add_shape(bd.Pos(du, dv) * k, LAYER_KANTE)
    for flaeche, du, dv, *_ in teile:
        verschoben = bd.Pos(du, dv) * flaeche
        svg.add_shape(verschoben.outer_wire(), LAYER_AUSSEN)
        for w in verschoben.inner_wires():
            svg.add_shape(w, LAYER_INNEN)
    svg.write(str(pfad))


def viewer_daten(daten):
    """docs/cnc/cnc.js: Teileliste und Hinweise je Eckausbildung — per <script src> ladbar, auch über file://."""
    inhalt = ("// Generiert von modell/cnc.py — nicht von Hand ändern (ADR 0023)\n"
              f"window.CNC = {json.dumps(daten, ensure_ascii=False, indent=1)};\n")
    (ZIEL / "cnc.js").write_text(inhalt, encoding="utf-8")


def main():
    daten = {"stand": date.today().isoformat(), "varianten": {}}
    auftraege = [(v, lambda v=v: erzeuge(v)) for v in zeichnungen.VARIANTEN] + [("schubladen", erzeuge_schubladen)]
    for name, erzeuger in auftraege:
        ordner, zeilen, daten["varianten"][name] = erzeuger()
        print(f"{ordner.relative_to(ZIEL.parent.parent)}/: "
              + ", ".join(f"{zl['datei']} ({zl['stk']}×, {zl['schlitze']} Schlitze"
                          + (f", {zl['fenster']} {zl['fenster_art']}" if zl["fenster"] else "")
                          + f", symmetrisch {'/'.join(zl['symmetrie']) or '–'})" for zl in zeilen))
        print("  Plattenbedarf (Schätzung, " + daten["varianten"][name]["platte"] + "): "
              + ", ".join(f"{zeichnungen.fmt(x['staerke'])} mm: {x['laengs']['anzahl']} Platte(n) Faser längs "
                          f"({x['laengs']['belegung']} %), {x['gedreht']['anzahl']} frei gedreht ({x['gedreht']['belegung']} %)"
                          for x in daten["varianten"][name]["platten"]))
    viewer_daten(daten)
    print(f"{(ZIEL / 'cnc.js').relative_to(ZIEL.parent.parent)}  (Daten für den Reiter „DXF · CNC“)")


if __name__ == "__main__":
    main()

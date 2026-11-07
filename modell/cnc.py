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
import sys
from datetime import date
from pathlib import Path

import build123d as bd

sys.path.insert(0, str(Path(__file__).resolve().parent))
import modell  # noqa: E402
import zeichnungen  # noqa: E402

ZIEL = Path(__file__).resolve().parent.parent / "docs" / "cnc"

# (Dateiname, Kürzel gleicher Bretter, Ansicht wie in zeichnungen.brett_geometrie)
BRETTER = [
    ("b1-t1", ["B1", "T1"], "oben"),
    ("s1-s2", ["S1", "S2"], "z"),
    ("m1-m2", ["M1", "M2"], "z"),
    ("r1", ["R1"], "x"),
    ("f1", ["F1"], "oben"),
    ("f2", ["F2"], "oben"),
]
LAYER_AUSSEN, LAYER_INNEN = "AUSSENKONTUR", "INNENKONTUR"


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


def brett_kontur(alle, p, id, ansicht):
    """Fertige Frässkontur eines Bretts als Face in (u, v), Ursprung links unten."""
    c = p["cnc"]
    breite, hoehe, behalten, loecher, _ = zeichnungen.brett_geometrie(alle, p, id, ansicht)
    form = _rechteck(*behalten[0])
    for r in behalten[1:]:
        form = form + _rechteck(*r)
    luft = c["passungsluft"] / 2
    for u0, v0, u1, v1 in loecher:                         # Schlitze/Aussparungen je Seite um die halbe Luft größer
        form = form - _rechteck(u0 - luft, v0 - luft, u1 + luft, v1 + luft)
    flaechen = form.faces()
    assert len(flaechen) == 1, f"{id}: Kontur zerfällt in {len(flaechen)} Teile"
    flaeche = flaechen[0]
    if c["innenecken"] == "dogbone":
        r = c["fraeser_durchmesser"] / 2
        ecken = _innenecken(_eckpunkte(flaeche.outer_wire()), True)
        for w in flaeche.inner_wires():
            ecken += _innenecken(_eckpunkte(w), False)
        for (x, y), (dx, dy) in ecken:                      # Kreis durch die Ecke, Mittelpunkt im Abfall
            flaeche = (flaeche - bd.Pos(x + dx * r, y + dy * r) * bd.Circle(r)).faces()[0]
    return flaeche, breite, hoehe, len(loecher)


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
    """teile: Liste (Face, Versatz u, Versatz v)."""
    dxf = bd.ExportDXF(unit=bd.Unit.MM)
    dxf.add_layer(LAYER_AUSSEN, color=bd.ColorIndex.RED)
    dxf.add_layer(LAYER_INNEN, color=bd.ColorIndex.BLUE)
    for flaeche, du, dv in teile:
        verschoben = bd.Pos(du, dv) * flaeche
        dxf.add_shape(verschoben.outer_wire(), layer=LAYER_AUSSEN)
        for w in verschoben.inner_wires():
            dxf.add_shape(w, layer=LAYER_INNEN)
    dxf.write(str(pfad))


def erzeuge(variante):
    p = modell.lade_parameter()
    c = p["cnc"]
    alle = modell.teile(p, variante)
    ordner = ZIEL / variante
    ordner.mkdir(parents=True, exist_ok=True)

    zeilen, sammlung, v = [], [], 0
    for datei, ids, ansicht in BRETTER:
        flaeche, breite, hoehe, _ = brett_kontur(alle, p, ids[0], ansicht)
        for weitere in ids[1:]:                            # gleiche Bretter müssen wirklich gleich sein
            andere = brett_kontur(alle, p, weitere, ansicht)[0]
            assert _signatur(andere) == _signatur(flaeche), f"{weitere} weicht von {ids[0]} ab"
        _dxf([(flaeche, 0, 0)], ordner / f"{datei}.dxf")
        (ordner / "vorschau").mkdir(exist_ok=True)
        _vorschau([(flaeche, 0, 0)], ordner / "vorschau" / f"{datei}.svg", 5)
        sammlung += [(flaeche, i * (breite + c["teileabstand"]), v) for i in range(len(ids))]
        v += hoehe + c["teileabstand"]
        namen = " / ".join(zeichnungen.langname(alle, i) for i in ids)
        namen = namen.replace("Seitenwand links / Seitenwand rechts", "Seitenwand links / rechts") \
                     .replace("Trennwand links / Trennwand rechts", "Trennwand links / rechts")
        zeilen.append((f"{datei}.dxf", " / ".join(ids), namen, len(ids),
                       f"{zeichnungen.fmt(breite)} × {zeichnungen.fmt(hoehe)}",
                       len(flaeche.inner_wires()), _symmetrie(flaeche, breite, hoehe)))
    _dxf(sammlung, ordner / "alle-teile.dxf")
    (ordner / "vorschau").mkdir(exist_ok=True)
    _vorschau(sammlung, ordner / "vorschau" / "alle-teile.svg", 6)
    (ordner / "AUFTRAG.md").write_text(auftrag(variante, p, zeilen), encoding="utf-8")
    pfad = f"docs/cnc/{variante}"
    viewer = {
        "teile": [{"datei": f"{pfad}/{d}", "vorschau": f"{pfad}/vorschau/{d[:-4]}.svg", "kuerzel": k, "name": n,
                   "stk": s, "mass": m, "schlitze": i} for d, k, n, s, m, i, _ in zeilen],
        "alle_dxf": f"{pfad}/alle-teile.dxf", "alle_vorschau": f"{pfad}/vorschau/alle-teile.svg",
        "auftrag": f"{pfad}/AUFTRAG.md",
        "abschnitte": [{"titel": t, "art": a, "texte": x} for t, a, x in abschnitte(variante, p, zeilen)],
    }
    return ordner, zeilen, viewer


def abschnitte(variante, p, zeilen):
    """Alle Hinweise zum Auftrag als (Titel, Art, [Texte]) — Quelle für AUFTRAG.md und den Viewer.

    Art: "absatz" | "liste" | "nummeriert". Texte dürfen **fett** und `code` enthalten."""
    c, z = p["cnc"], p["zapfen"]
    f = zeichnungen.fmt
    ohne_achse = [zl[1] for zl in zeilen if not zl[6]]
    wenden = ("Wenden (Rückseite nach oben) ist ebenfalls erlaubt: Jedes Teil ist spiegelsymmetrisch ("
              + ", ".join(f"{zl[1]} {' + '.join(zl[6])}" for zl in zeilen) + "), gewendet entsteht dasselbe Teil."
              if not ohne_achse else
              f"**Nicht wenden:** {', '.join(ohne_achse)} sind nicht spiegelsymmetrisch und nur so richtig, wie gezeichnet.")
    stk = sum(zl[3] for zl in zeilen)
    ecken = (f"Jede Innenecke hat einen **Dogbone**: Freischnitt Ø {f(c['fraeser_durchmesser'])} mm über die Ecke "
             "hinaus, Kreis durch den Eckpunkt. Ohne ihn bliebe in jeder Ecke ein Radius stehen, und die eckigen "
             "Zapfen passten nicht in Schlitze und Aussparungen."
             if c["innenecken"] == "dogbone" else
             "Innenecken sind **scharfkantig** gezeichnet — der Dienstleister setzt die Freischnitte (Dogbones) selbst.")
    out = [
        ("Teile", "absatz", [f"Material: **{c['material']}**, {stk} Teile in {len(zeilen)} unterschiedlichen Formen."]),
        ("Dateien", "liste", [
            "DXF (AutoCAD 2013, `AC1027`), Maßstab 1:1, Einheit **mm**, Ursprung links unten am Teil.",
            f"Layer `{LAYER_AUSSEN}` (rot): Außenkontur, durchfräsen, Fräser außen an der Linie.",
            f"Layer `{LAYER_INNEN}` (blau): geschlossene Schlitze, durchfräsen, Fräser innen an der Linie.",
            "Alle Konturen geschlossen. Nur Linien und Kreisbögen, keine Beschriftung, keine Bohrungen, "
            "keine Taschen — alles ist ein 2D-Durchschnitt.",
            f"`alle-teile.dxf` enthält jedes Teil in Auftragsstückzahl nebeneinander, mit {f(c['teileabstand'])} mm "
            "Abstand — nur zur Übersicht, **kein Nesting**. Die Verteilung auf die Platten macht der Dienstleister.",
        ]),
    ]
    if variante == "gezapft":
        out.append(("Passung Zapfen ↔ Schlitz", "liste", [
            f"Die Wände (S1/S2, M1/M2, R1) tragen Zapfen {f(z['laenge'])} × {f(c['plattenstaerke'])} mm, B1/T1 und R1 "
            "die passenden Schlitze und Aussparungen — alles ganz durch die Platte.",
            f"Schlitze und Aussparungen sind je Richtung **{f(c['passungsluft'])} mm größer** als der Zapfen "
            "(Zapfen bleiben auf Nennmaß).",
            f"Zapfen sind **19 mm lang** (18 mm Plattenstärke + {f(z['schleifzugabe'])} mm Schleifzugabe): Sie stehen "
            "nach dem Zusammenbau 1 mm über und werden bündig geschliffen. Gewollt, nicht korrigieren.",
            ecken,
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
        f"**Faserrichtung egal**: Die Teile dürfen beim Nesting beliebig gedreht werden. {wenden}",
        "**Keine Bohrungen**: Scharniere (V17), Gurtschlaufen (F2) und Schrauben werden beim Zusammenbau "
        "angerissen und gebohrt.",
        "**Nicht enthalten**: Schubladen, Sitz- und Tischbretter (C1–C3, D1–D3) — deren Maße werden erst am "
        "fertigen Korpus festgelegt (zweiter Auftrag).",
        "**Kanten**: keine Fase, kein Radius an den Außenkanten.",
    ]))
    return out


def auftrag(variante, p, zeilen):
    teile = ["| Datei | Kürzel | Langname | Stk. | Außenmaß (mm) |", "|---|---|---|---|---|"]
    teile += [f"| `{d}` | {k} | {n} | {s} | {m} |" for d, k, n, s, m, *_ in zeilen]
    md = [f"# CNC-Auftrag — VW Caddy Mk3 Camper, Box + Liegefläche ({variante})", "",
          f"Erzeugt am {date.today().isoformat()} von `modell/cnc.py` aus `modell/parameter.json` — nicht von Hand "
          "ändern, sondern Parameter anpassen und neu erzeugen. Entscheidung und Hintergrund: ADR 0023."]
    for titel, art, texte in abschnitte(variante, p, zeilen):
        md += ["", f"## {titel}", ""]
        if art == "absatz":
            md += texte
        else:
            md += [(f"{i}. " if art == "nummeriert" else "- ") + t for i, t in enumerate(texte, 1)]
        if titel == "Teile":
            md += [""] + teile
    return "\n".join(md) + "\n"


def _vorschau(teile, pfad, strich):
    """SVG-Vorschau wie die DXF: Außenkontur rot, Schlitze blau (für den Reiter „DXF · CNC“)."""
    svg = bd.ExportSVG(unit=bd.Unit.MM, margin=strich * 4)
    svg.add_layer(LAYER_AUSSEN, line_weight=strich, line_color=(0.85, 0.1, 0.1))
    svg.add_layer(LAYER_INNEN, line_weight=strich, line_color=(0.1, 0.25, 0.85))
    for flaeche, du, dv in teile:
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
    for variante in zeichnungen.VARIANTEN:
        ordner, zeilen, daten["varianten"][variante] = erzeuge(variante)
        print(f"{ordner.relative_to(ZIEL.parent.parent)}/: "
              + ", ".join(f"{d} ({s}×, {i} Schlitze innen, symmetrisch {'/'.join(a) or '–'})"
                          for d, _, _, s, _, i, a in zeilen))
    viewer_daten(daten)
    print(f"{(ZIEL / 'cnc.js').relative_to(ZIEL.parent.parent)}  (Daten für den Reiter „DXF · CNC“)")


if __name__ == "__main__":
    main()

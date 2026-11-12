"""Gemeinsames Teilemodell für 3D-Viewer und Werkzeichnungen.

Liest modell/parameter.json, leitet daraus jedes Bauteil als achsparallelen
Quader ab und schreibt modell/modell.js für index.html. Die Zeichnungen
(modell/zeichnungen.py) importieren dieselbe Funktion `teile()` — es gibt
keine zweite Stelle, an der Maße stehen. Entscheidung: docs/adrs/0015-shared-model-data-for-viewer-and-drawings.md

Koordinaten wie im Viewer, alles in mm:
  x  Breite, 0 = Fahrzeugmitte, +x = Fahrerseite (Linkslenker)
  y  Höhe, 0 = Ladeboden
  z  Tiefe, 0 = offene Korpusfront an der Heckklappe, +z Richtung Vordersitze

Aufruf ohne Zusatzpakete:  python3 modell/modell.py
"""

import json
import math
from pathlib import Path

ORDNER = Path(__file__).resolve().parent
ECKAUSBILDUNGEN = ("gezapft", "stumpf")   # Boden + Deckel immer durchlaufend (ADR 0018), Zapfen ADR 0020

# Kürzel bleiben feste Positionsnummern; der Buchstabe ist eine Eselsbrücke (ADR 0022), `name` der
# Langname (Funktion + Lage, links/rechts aus Fahrersicht). Glossar: List_of_Materials.md „Bezeichnungen“.
GRUPPEN = {
    "B": "Bodenplatte (Bottom)", "R": "Rückwand (Rear)", "S": "Seitenwände (Side)", "M": "Trennwände (Mid)",
    "T": "Deckplatte (Top)", "F": "Klappbretter (Fold)",
    "C": "Auszugbretter", "D": "Schubladen", "E": "Schienen",
    "V": "Verbindungsmittel & Beschläge", "G": "Ausstattung", "H": "Scharniere (Hinge)",
}
ELEMENTE = {
    "C1": "Sitzbrett links", "C2": "Sitzbrett rechts", "C3": "Tischbrett Mitte",
    "D1": "Schublade links", "D2": "Schublade rechts", "D3": "Schublade Mitte",
}
# Wand an der −x- bzw. +x-Seite jeder Sektion (L = Fahrerseite = +x)
SEKTIONSWAENDE = {"L": ("Trennwand links", "Seitenwand links"),
                  "M": ("Trennwand rechts", "Trennwand links"),
                  "R": ("Seitenwand rechts", "Trennwand rechts")}


def lade_parameter():
    return json.loads((ORDNER / "parameter.json").read_text(encoding="utf-8"))


def _teil(id, name, gruppe, material, x, y, z, faehrt=None, **extra):
    t = {"id": id, "name": name, "gruppe": gruppe, "material": material,
         "faehrt": faehrt, "box": [list(x), list(y), list(z)]}
    t.update(extra)
    return t


def _korpus(p, eck):
    k = p["korpus"]
    W, D, H, T = k["breite"], k["tiefe"], k["hoehe"], k["plattenstaerke"]
    DW, swM = k["trennwandstaerke"], k["sektion_mitte_innen"]
    xa, xi = W / 2, W / 2 - T          # Außen- / Innenfläche der Seitenwände
    d = swM / 2                        # Innenfläche der Trennwände zur Mitte

    # Boden B1 und Deckel T1 laufen voll durch (1.120 × 900); alle Wände stehen dazwischen.
    if eck not in ECKAUSBILDUNGEN:
        raise ValueError(f"unbekannte eckausbildung: {eck}")
    wand_y = (T, H)

    wandhoehe = H - T
    if eck == "gezapft":
        roh = wandhoehe + 2 * (T + p["zapfen"]["schleifzugabe"])
        roh_r = {"zuschnitt": [W - 2 * T, roh]}
        roh_s = roh_m = {"zuschnitt": [D, roh]}     # M1/M2: 882 + hinterer Zapfen = so lang wie S1/S2
    else:
        roh_r = roh_s = roh_m = {}

    waende = [
        _teil("S1", "Seitenwand links (Fahrerseite)", "korpus", "holz", (xi, xa), wand_y, (0, D), **roh_s),
        _teil("S2", "Seitenwand rechts (Beifahrerseite)", "korpus", "holz", (-xa, -xi), wand_y, (0, D), **roh_s),
        _teil("R1", "Rückwand", "korpus", "holz", (-xi, xi), wand_y, (D - T, D), **roh_r),
        _teil("B1", "Bodenplatte", "korpus", "holz", (-xa, xa), (0, T), (0, D)),
        _teil("M1", "Trennwand links", "korpus", "holz", (d, d + DW), wand_y, (0, D - T), **roh_m),
        _teil("M2", "Trennwand rechts", "korpus", "holz", (-d - DW, -d), wand_y, (0, D - T), **roh_m),
        _teil("T1", "Deckplatte", "liegeflaeche", "holz", (-xa, xa), (H, H + T), (0, D)),
    ]
    return waende + (_zapfen(p, waende) if eck == "gezapft" else [])


def _zapfen(p, waende):
    """Zapfen als eigene Quader: je Wandkante oben in T1 und unten in B1, an M1/M2 zusätzlich hinten in R1.

    Sie stecken an M1/M2 in geschlossenen Schlitzen, an R1/S1/S2 in zum Plattenrand offenen
    Aussparungen — der Quader ist derselbe, nur das Gegenstück unterscheidet sich (ADR 0020).
    """
    k, z = p["korpus"], p["zapfen"]
    D, H, T = k["tiefe"], k["hoehe"], k["plattenstaerke"]
    L, R, n = z["laenge"], z["abstand_rand"], z["anzahl_je_kante"]
    out = []

    def setze(wand, x, zz, nr):
        name = wand["name"].split(" (")[0]
        for lage, y, platte in (("u", (0, T), "B1"), ("o", (H, H + T), "T1")):
            out.append(_teil(f"{wand['id']}-Z{nr}{lage}", f"Zapfen {name} in {platte}", "korpus", "holz",
                             x, y, zz, steckt_in=[platte], zapfen_von=wand["id"]))

    for wand in waende:
        if wand["id"] in ("B1", "T1"):
            continue
        (x0, x1), _, (z0, z1) = wand["box"]
        if wand["id"] == "R1":
            for nr, m in enumerate(z["r1_mitten"], 1):
                setze(wand, (m - L / 2, m + L / 2), (z0, z1), nr)
            continue
        for i in range(n):
            start = z0 + R + (z1 - z0 - 2 * R - L) * i / (n - 1)
            setze(wand, (x0, x1), (start, start + L), i + 1)
        if wand["id"].startswith("M"):         # hinterer Zapfen, mittig in der Wandhöhe, durch die Rückwand
            mitte = (T + H) / 2
            out.append(_teil(f"{wand['id']}-Zh", f"Zapfen {wand['name']} in R1", "korpus", "holz",
                             (x0, x1), (mitte - L / 2, mitte + L / 2), (D - T, D),
                             steckt_in=["R1"], zapfen_von=wand["id"]))
    return out


def _sektionen(p):
    k = p["korpus"]
    xi = k["breite"] / 2 - k["plattenstaerke"]
    d = k["sektion_mitte_innen"] / 2
    DW = k["trennwandstaerke"]
    # Links/rechts immer aus Sicht des Fahrers (Blick nach vorn, Linkslenker):
    # L = Fahrerseite = +x, R = Beifahrerseite = −x. Beim Blick durch die Heckklappe ebenso.
    return {"L": (d + DW, xi), "M": (-d, d), "R": (-xi, -d - DW)}


def _einbauten(p):
    """Sitz-/Tischbretter, Schubladenkästen und Schienen (Höhenplan ADR 0028).

    Sektion L/R von unten: Sitzschiene auf B1 mit Sitzbrett-Element (Wangen + Brett oben), Spalt, Kasten,
    Spalt zu T1. Sektion M von unten: Kasten, Tischbrett-Element, Tischschiene 5 mm unter T1.
    Das Element reicht von der Brettoberkante (bündig mit dem 55-mm-Mittelteil, `ueberstand_mittelteil`)
    bis zur Wangen-Unterkante, `rand_lochreihe` unter der Lochreihe (ADR 0031). D1/D2 sind gleich hoch,
    D3 ist `kasten_mitte_hoehe` hoch, höchstens bis `boden_luft` unter die Wangen von C3.
    """
    k, s, e = p["korpus"], p["schienen"], p["elemente"]
    H, T = k["hoehe"], k["plattenstaerke"]

    def typ(element_id):                # Schienentyp je Element (C1–C3 schwer, Schubladen leicht)
        return s["typen"][s["zuordnung"][element_id]]
    sp, spiel, vor = e["spalt_hoehe"], e["spiel_seitlich"], e["vorstand_front"]
    luft = e["boden_luft"]
    bs, ws = e["brett_staerke"], e["wange_staerke"]
    yB = T                                          # Oberkante Bodenplatte
    rhC = typ("C1")["hoehe"]
    assert typ("C3")["hoehe"] == rhC, "C1 und C3 brauchen dieselbe Schienenhöhe"
    # Wangen-Unterkante über der Schienen-Unterkante: Teleskopteil mittig + Spiel (ADR 0029)
    # Brettoberkante relativ zur Schienenoberkante: bündig mit dem Mittelteil (ADR 0031)
    ue = -(rhC - typ("C1")["hoehe_auszug"]) / 2 + e["ueberstand_mittelteil"]
    # Wangen-Unterkante über der Schienen-Unterkante: genau `rand_lochreihe` Holz unter der Lochreihe
    wl = rhC / 2 - e["rand_lochreihe"]
    assert wl - (rhC + ue - e["brett_staerke"]) < 0, "Wange hätte keine Höhe"
    assert rhC + ue - e["brett_staerke"] - rhC / 2 >= 5, "Lochreihe zu nah an der Brettunterseite (Leimfuge)"
    hE = rhC + ue - wl                              # Element: Brettoberkante bis Wangen-Unterkante
    assert rhC / 2 - wl >= e["rand_lochreihe"], \
        f"Wange zu kurz: unter der Lochreihe blieben nur {rhC / 2 - wl} mm Holz (mind. {e['rand_lochreihe']})"
    hK = H - yB - (rhC + ue) - 2 * sp               # Kastenhöhe, in allen drei Sektionen gleich
    zK = (-vor, -vor + e["kasten_tiefe"])           # ohne Blende (ADR 0027): bündig mit den Brettern
    zB = (-vor, -vor + e["brett_tiefe"])

    sek = _sektionen(p)
    out = []

    def element(sx, id):                # Breite: Innen − 2 × Schiene − 2 × Spiel
        rs = typ(id)["staerke"]
        return (sx[0] + rs + spiel, sx[1] - rs - spiel)

    def schienenpaar(sek_id, y0, faehrt, zu):
        x0, x1 = sek[sek_id]
        t = typ(zu)
        y = (round(y0, 2), round(y0 + t["hoehe"], 2))
        wand_a, wand_b = SEKTIONSWAENDE[sek_id]
        for seite, xs, wand, r in (("a", (x0, x0 + t["staerke"]), wand_a, 1), ("b", (x1 - t["staerke"], x1), wand_b, -1)):
            out.append(_teil(f"E-{zu}-{seite}", f"Schiene {ELEMENTE[zu]}, an {wand} · {t['name']}", "schiene",
                             "schiene", xs, y, (0, t["laenge"]), faehrt, richtung=r, auszug=t["laenge"]))
        return y

    wz = e["wangenzapfen"]

    def brett_element(id, sx, y0, material):
        """Brett oben über die ganze Breite, darunter je eine Wange an den Schienenseiten. Die Wangen
        greifen mit Zapfen durch Schlitze im Brett (verleimt, bündig geschliffen, ADR 0029)."""
        x0, x1 = element(sx, id)
        y1 = y0 + hE
        auszug = typ(id)["laenge"]
        out.append(_teil(id, ELEMENTE[id], "brett", material, (x0, x1), (y1 - bs, y1), zB, "bretter", auszug=auszug))
        for seite, xs in (("a", (x0, x0 + ws)), ("b", (x1 - ws, x1))):
            wid = f"{id}-W{seite}"
            out.append(_teil(wid, f"{ELEMENTE[id]}, Wange", "brett", material, xs, (y0, y1 - bs), zB,
                             "bretter", auszug=auszug,
                             rohmass=[zB[1] - zB[0], round(hE + wz["schleifzugabe"], 2)]))   # Länge × Höhe inkl. Zapfen
            for nr, start in enumerate(_verteilt(zB[1] - zB[0], wz["anzahl"], wz["laenge"], wz["abstand_rand"]), 1):
                z = zB[0] + start
                out.append(_teil(f"{wid}-Z{nr}", f"Zapfen Wange in {ELEMENTE[id]}", "brett", material, xs,
                                 (y1 - bs, y1), (z, z + wz["laenge"]), "bretter", auszug=auszug,
                                 steckt_in=[id], zapfen_von=wid))

    def kasten(id, sx, y0, h=hK, y_max=None, y_min=None, **extra):
        lage = ELEMENTE[id].split()[-1]
        out.append(_teil(id, f"Schubladenkasten {lage}", "schublade", "schublade", element(sx, id),
                         (y0, round(y0 + h, 2)), zK, "schubladen", auszug=typ(id)["laenge"], **extra))
        return schienenpaar_mittig(id, y0, h, y_max, y_min)

    def schienenpaar_mittig(id, y0, h, y_max, y_min):  # Schubladenschiene am Kasten: außen unten, Mitte oben (ADR 0028)
        sid = {"D1": "L", "D2": "R", "D3": "M"}[id]
        lage = e["schubladenschiene"]["mitte" if sid == "M" else "aussen"]
        ab, rh = e["schubladenschiene"]["abstand_kasten"], typ(id)["hoehe"]
        if lage == "unten":
            y = math.ceil(max(y0 + ab, y_min or 0))     # ganze mm, nach innen gerundet
        elif lage == "oben":
            oben = y0 + h - ab if y_max is None else min(y0 + h - ab, y_max)
            y = math.floor(oben - rh)
        else:
            y = y0 + (h - rh) / 2
        return schienenpaar(sid, y, "schubladen", id)

    baender = {}
    gleich = e["schubladenschiene"]["abstand_gleiche_seite"]   # Abstand zur Brettschiene an derselben Wand
    # Seiten L/R: unten Sitzbrett-Element, darüber Schublade
    for nr, sid in ((1, "L"), (2, "R")):
        baender[f"C{nr}"] = schienenpaar(sid, yB, "bretter", f"C{nr}")
        brett_element(f"C{nr}", sek[sid], yB + wl, "sitz")
        baender[f"D{nr}"] = kasten(f"D{nr}", sek[sid], yB + rhC + ue + sp,
                                   y_min=baender[f"C{nr}"][1] + gleich)   # über der Sitzschiene, gleiche Wand
    # Mitte: unten Schublade, oben Tischbrett-Element (hängt von oben, 5 mm unter T1)
    y_c3_schiene = H - sp - typ("C3")["hoehe"]     # Tischschiene 5 mm unter T1, das Brett liegt tiefer
    y_c3 = y_c3_schiene + wl                         # Wangen-Unterkante C3
    h3_max = y_c3 - luft - (yB + luft)              # D3 höchstens `boden_luft` unter die Wangen von C3
    h3 = min(e["kasten_mitte_hoehe"], h3_max)
    extra = {"gekappt": round(e["kasten_mitte_hoehe"] - h3, 2)} if h3 < e["kasten_mitte_hoehe"] else {}
    baender["D3"] = kasten("D3", sek["M"], yB + luft, h3, y_c3_schiene - gleich, **extra)
    baender["C3"] = schienenpaar("M", y_c3_schiene, "bretter", "C3")
    assert baender["D3"][1] + gleich <= baender["C3"][0], \
        "Schiene D3 stößt an die Schiene C3"
    brett_element("C3", sek["M"], y_c3, "tisch")
    assert y_c3 + hE + sp <= H + 1e-6, "Tischbrett stößt an die Deckplatte"

    # An M1/M2 liegen die Schienen der Nachbarsektionen gegenüber (ADR 0025): Bänder dürfen sich nicht
    # überlappen, sonst landen die Muttern der M6-Durchsteckschrauben unter einer Schiene der Gegenseite.
    mind = e["schubladenschiene"]["mindestabstand_gegenseite"]
    for links in ("C1", "D1"):
        for mitte in ("D3", "C3"):
            (a0, a1), (b0, b1) = baender[links], baender[mitte]
            assert a1 + mind <= b0 or b1 + mind <= a0, \
                f"Schienen {links} und {mitte} liegen an der Trennwand weniger als {mind} mm auseinander"
    return out


def _scharniere(p):
    """Klappscharniere an den Fugen T1↔F1 (oben) und F1↔F2 (unten), dazu die Klappachsen.

    Ein aufgeschraubtes Scharnier lässt sich nur zur Seite seiner Achse öffnen: oben auf
    T1↔F1 klappt F1 nur nach oben über die Box, unten an F1↔F2 klappt F2 nur nach unten —
    nach dem Umklappen von F1 ist „unten“ oben, F2 legt sich auf F1.
    """
    k, l, s = p["korpus"], p["liegeflaeche"], p["scharniere"]
    W, D, H, T = k["breite"], k["tiefe"], k["hoehe"], k["plattenstaerke"]
    a, b, lo = s["achse_ueber_flaeche"], s["blatt_breite"], s["laenge_offen"]
    z12, z23 = D, D + l["laenge_f1"]
    xs = [0] + [v * (W / 2 - s["abstand_rand"]) for v in (-1, 1)] if s["je_fuge"] == 3 else \
         [W * (i + 1) / (s["je_fuge"] + 1) - W / 2 for i in range(s["je_fuge"])]
    out = []
    for i, x in enumerate(sorted(xs), 1):
        out.append(_teil(f"H1-{i}", "Scharnier Deckplatte ↔ Klappbrett Rücksitz (oben)", "scharnier", "scharnier",
                         (x - b / 2, x + b / 2), (H + T, H + T + 2 * a), (z12 - lo / 2, z12 + lo / 2)))
        out.append(_teil(f"H2-{i}", "Scharnier Klappbrett Rücksitz ↔ Kopfende (unten)", "scharnier", "scharnier",
                         (x - b / 2, x + b / 2), (H - 2 * a, H), (z23 - lo / 2, z23 + lo / 2), klappt_mit="F1"))
    # Achsen (y, z) im flachen Zustand und Klappwinkel um x für die Fahrmodi
    achsen = {"F1": {"y": H + T + a, "z": z12, "winkel": -180},
              "F2": {"y": H - a, "z": z23, "winkel": 180, "an": "F1"}}
    return out, achsen


def _liegeflaeche(p):
    k, l, m = p["korpus"], p["liegeflaeche"], p["matratze"]
    W, D, H, T = k["breite"], k["tiefe"], k["hoehe"], k["plattenstaerke"]
    y = (H, H + T)
    return _scharniere(p)[0] + [
        _teil("F1", "Klappbrett Rücksitz", "liegeflaeche", "holz", (-W / 2, W / 2), y, (D, D + l["laenge_f1"])),
        _teil("F2", "Klappbrett Kopfende", "liegeflaeche", "holz", (-W / 2, W / 2), y,
              (D + l["laenge_f1"], D + l["laenge_f1"] + l["laenge_f2"])),
        _teil("G1", "Matratze", "matratze", "matratze", (-m["breite"] / 2, m["breite"] / 2),
              (H + T, H + T + m["hoehe"]), (0, m["laenge"])),
    ]


def teile(p=None, eckausbildung=None):
    p = p or lade_parameter()
    eck = eckausbildung or p["eckausbildung"]
    return _korpus(p, eck) + _einbauten(p) + _liegeflaeche(p)


def _verteilt(spanne, anzahl, laenge, rand):
    """Startpunkte von `anzahl` gleich langen Stücken, gleichmäßig in [rand, spanne − rand]."""
    if anzahl == 1:
        return [(spanne - laenge) / 2]
    return [rand + (spanne - 2 * rand - laenge) * i / (anzahl - 1) for i in range(anzahl)]


def schubladen_bretter(p=None, alle=None, zusammenfassen=True):
    """Die Bretter der Schubladenkästen D1–D3 als ebene Frässkonturen (ADR 0024).

    Außenmaße jedes Kastens kommen aus dem Quader D1/D2/D3 in `teile()`, die Höhe des
    Schienenbands aus den Schienen E-D*-a — es gibt keine zweite Stelle für diese Maße.
    Je Brett: Rechtecke (u0, v0, u1, v1) zum Behalten bzw. Ausfräsen, dazu Fenster
    (u0, v0, u1, v1, radius). Ursprung links unten am Rohteil, Zinken und Bodenzapfen
    stehen um die Schleifzugabe über. Gleiche Bretter (D1/D2) werden zusammengefasst.

    Seitenwand -S: u = Kastentiefe (z), v = Höhe · Stirnwand -E (Kastenfront und
    -rückwand): u = Kastenbreite (x), v = Höhe · Boden -B: u = Breite (x), v = Tiefe (z).
    zusammenfassen=False: je Kasten eigene Einträge, mit `kasten` (Quader) — für schubladen_3d().
    """
    p = p or lade_parameter()
    alle = alle or teile(p)
    s, zug = p["schubladen"], p["zapfen"]["schleifzugabe"]
    T, Tb, h0 = s["wandstaerke"], s["bodenstaerke"], s["boden_abstand_unten"]
    n, bz, f, g = s["zinken_anzahl"], s["bodenzapfen"], s["fenster"], s["griff"]
    nach_id = {t["id"]: t for t in alle}
    rand = T + zug                              # Zinkenlänge inkl. Schleifzugabe

    def lochraster(u_a, u_b, baender):
        """Runde Löcher im Quadratraster, mittig in [u_a, u_b] × jedes Band (ADR 0026).
        Als Fenster mit Radius = halbe Seite, damit cnc.py und der Viewer sie als Kreise zeichnen."""
        dm, ab = s["lochraster"]["durchmesser"], s["lochraster"]["abstand"]
        nu = int((u_b - u_a - dm) // ab) + 1
        if nu < 1:
            return []
        u_mitten = [u_a + (u_b - u_a - (nu - 1) * ab) / 2 + i * ab for i in range(nu)]
        out = []
        for a, b in baender:
            nv = int((b - a - dm) // ab) + 1
            for j in range(max(nv, 0)):
                vm = a + (b - a - (nv - 1) * ab) / 2 + j * ab
                out += [(um - dm / 2, vm - dm / 2, um + dm / 2, vm + dm / 2, dm / 2) for um in u_mitten]
        return out

    def zinken(lang, hoehe, gerade_aussen):
        """Ausfräsungen an beiden Enden: Lücken dort, wo das Gegenstück seinen Zinken hat."""
        out = []
        for k in range(n):
            if (k % 2 == 0) == gerade_aussen:
                continue
            v0 = -1 if k == 0 else hoehe * k / n
            v1 = hoehe + 1 if k == n - 1 else hoehe * (k + 1) / n
            out += [(-1, v0, rand, v1), (lang + 2 * zug - rand, v0, lang + 2 * zug + 1, v1)]
        return out

    def bodenschlitze(innen, anzahl):
        return [(rand + a, h0, rand + a + bz["laenge"], h0 + Tb)
                for a in _verteilt(innen, anzahl, bz["laenge"], bz["abstand_rand"])]

    bretter = []
    for d in ("D1", "D2", "D3"):
        (x0, x1), (y0, y1), (z0, z1) = nach_id[d]["box"]
        B, H, L = x1 - x0, y1 - y0, z1 - z0
        Bi, Li = B - 2 * T, L - 2 * T
        _, (s0, s1), _ = nach_id[f"E-{d}-a"]["box"]
        band = (s0 - y0 - f["abstand_schiene"], s1 - y0 + f["abstand_schiene"])
        frei, unten = [], h0 + Tb + f["steg_boden"]
        for a, b in ((unten, band[0]), (band[1], H - f["rand_oben"])):
            if b - a >= f["min_hoehe"]:
                frei.append((a, b))
        art = s["aussparung"].get(d, "keine")
        u_a, u_b = rand + f["rand_ende"], rand + Li - f["rand_ende"]
        if art == "fenster":
            bf = (Li - 2 * f["rand_ende"] - (f["anzahl"] - 1) * f["steg"]) / f["anzahl"]
            fenster = [(u_a + i * (bf + f["steg"]), a, u_a + i * (bf + f["steg"]) + bf, b, f["radius"])
                       for a, b in frei for i in range(f["anzahl"])]
        elif art == "lochraster":
            fenster = lochraster(u_a, u_b, frei)
        else:
            fenster = []

        # Kastenfront (-E1) und -rückwand (-E2): Lochraster über die ganze freie Höhe, vorn dazu der Griff
        stirn_frei = [(unten, H - f["rand_oben"])]
        mitte = B / 2 + zug
        if g["art"] == "ausschnitt":
            griff = (mitte - g["breite"] / 2, H - g["tiefe"], mitte + g["breite"] / 2, H + g["radius"] + 1, g["radius"])
            ro = g.get("radius_oben", 0)
            assert ro + g["radius"] <= g["tiefe"], "Griff: radius + radius_oben größer als die Tiefe"
            # obere Außenecken des Ausschnitts: (Ecke u, v, Radius, Richtung zum Material)
            griff_ecken = [(griff[0], H, ro, -1), (griff[2], H, ro, 1)] if ro else []
        else:
            griff = (mitte - g["breite"] / 2, H - g["abstand_oben"] - g["tiefe"],
                     mitte + g["breite"] / 2, H - g["abstand_oben"], min(g["radius"], g["tiefe"] / 2))
            griff_ecken = []
        steg = s["lochraster"]["abstand"] - s["lochraster"]["durchmesser"]
        frei_griff = (griff[0] - steg, griff[1] - steg, griff[2] + steg, griff[3] + steg)
        e_a, e_b = rand + f["rand_ende"], rand + Bi - f["rand_ende"]
        loecher_hinten = lochraster(e_a, e_b, stirn_frei)
        loecher_vorn = [l for l in loecher_hinten if not (l[2] > frei_griff[0] and l[0] < frei_griff[2]
                                                          and l[3] > frei_griff[1] and l[1] < frei_griff[3])]

        boden_zapfen = [(0, rand + a, rand, rand + a + bz["laenge"]) for a in
                        _verteilt(Li, bz["anzahl_lang"], bz["laenge"], bz["abstand_rand"])]
        boden_zapfen += [(B + 2 * zug - u1, v0, B + 2 * zug - u0, v1) for u0, v0, u1, v1 in boden_zapfen]
        quer = [(rand + a, 0, rand + a + bz["laenge"], rand) for a in
                _verteilt(Bi, bz["anzahl_kurz"], bz["laenge"], bz["abstand_rand"])]
        boden_zapfen += quer + [(u0, L + 2 * zug - v1, u1, L + 2 * zug - v0) for u0, v0, u1, v1 in quer]

        lage = ELEMENTE[d].split()[-1]
        bretter += [
            {"id": f"{d}-S", "teil": "Seitenwand", "lagen": [lage], "stk": 2, "staerke": T, "kasten": d,
             "breite": L + 2 * zug, "hoehe": H, "behalten": [(0, 0, L + 2 * zug, H)],
             "loecher": zinken(L, H, True) + bodenschlitze(Li, bz["anzahl_lang"]), "fenster": fenster},
            {"id": f"{d}-E1", "teil": "Kastenfront mit Griff", "lagen": [lage], "stk": 1, "staerke": T, "kasten": d,
             "breite": B + 2 * zug, "hoehe": H, "behalten": [(0, 0, B + 2 * zug, H)],
             "loecher": zinken(B, H, False) + bodenschlitze(Bi, bz["anzahl_kurz"]), "fenster": loecher_vorn,
             "griff": [griff], "griff_ecken": griff_ecken},
            {"id": f"{d}-E2", "teil": "Kastenrückwand", "lagen": [lage], "stk": 1, "staerke": T, "kasten": d,
             "breite": B + 2 * zug, "hoehe": H, "behalten": [(0, 0, B + 2 * zug, H)],
             "loecher": zinken(B, H, False) + bodenschlitze(Bi, bz["anzahl_kurz"]), "fenster": loecher_hinten},
            {"id": f"{d}-B", "teil": "Boden", "lagen": [lage], "stk": 1, "staerke": Tb, "kasten": d,
             "breite": B + 2 * zug, "hoehe": L + 2 * zug, "behalten": [(rand, rand, rand + Bi, rand + Li)] + boden_zapfen,
             "loecher": [], "fenster": []},
        ]

    if not zusammenfassen:
        for b in bretter:
            b["name"] = f"Schublade {b['lagen'][0]}, {b['teil']}"
        return bretter

    def gleich(a, b):
        schluessel = ("staerke", "breite", "hoehe", "behalten", "loecher", "fenster", "griff")
        return all(_runde(a.get(k)) == _runde(b.get(k)) for k in schluessel)

    out = []
    for b in bretter:
        vorhanden = next((o for o in out if o["id"].split("-")[1] == b["id"].split("-")[1] and gleich(o, b)), None)
        if vorhanden:
            vorhanden["ids"].append(b["id"])
            vorhanden["lagen"] = vorhanden["lagen"] + b["lagen"]
            vorhanden["stk"] += b["stk"]
        else:
            out.append(dict(b, ids=[b["id"]]))
    for b in out:
        b["name"] = f"Schublade {' / '.join(b['lagen'])}, {b['teil']}"
    return out


def _umriss(behalten, loecher):
    """Rechteck-Vereinigung minus Löcher → geschlossene Polygone [(u, v), …].

    Koordinaten-Raster aus allen Rechteckkanten, Zellen füllen, Randkanten verketten. Außen-
    konturen laufen gegen den Uhrzeigersinn, Löcher im Uhrzeigersinn (Material immer links)."""
    xs = sorted({r[i] for r in behalten + loecher for i in (0, 2)})
    ys = sorted({r[i] for r in behalten + loecher for i in (1, 3)})

    def drin(u, v, rechtecke):
        return any(r[0] < u < r[2] and r[1] < v < r[3] for r in rechtecke)

    voll = {(i, j) for i in range(len(xs) - 1) for j in range(len(ys) - 1)
            if drin((xs[i] + xs[i + 1]) / 2, (ys[j] + ys[j + 1]) / 2, behalten)
            and not drin((xs[i] + xs[i + 1]) / 2, (ys[j] + ys[j + 1]) / 2, loecher)}
    kanten = {}
    for i, j in voll:
        a, b, c, d = (xs[i], ys[j]), (xs[i + 1], ys[j]), (xs[i + 1], ys[j + 1]), (xs[i], ys[j + 1])
        for nb, k in (((i, j - 1), (a, b)), ((i + 1, j), (b, c)), ((i, j + 1), (c, d)), ((i - 1, j), (d, a))):
            if nb not in voll:
                kanten[k[0]] = k[1]
    schleifen = []
    while kanten:
        start, punkt = next(iter(kanten.items()))
        del kanten[start]
        zug = [start]
        while punkt != start:
            zug.append(punkt)
            punkt = kanten.pop(punkt)
        # kollineare Zwischenpunkte entfernen
        n = len(zug)
        eck = [zug[k] for k in range(n)
               if (zug[k][0] - zug[k - 1][0]) * (zug[(k + 1) % n][1] - zug[k][1])
               != (zug[k][1] - zug[k - 1][1]) * (zug[(k + 1) % n][0] - zug[k][0])]
        schleifen.append([[round(u, 2), round(v, 2)] for u, v in eck])
    return schleifen


def schubladen_3d(p=None, alle=None):
    """Bretter der Schubladenkästen für den 3D-Viewer: Umriss + Löcher + Fenster in (u, v) und
    die Lage im Raum (Ursprung und Achsen u, v, w in Welt-mm; w = u × v, Brett von 0 bis Stärke).
    Zinken und Zapfen mit Schleifzugabe (Rohteil), ohne Passungsluft und Dogbones."""
    p = p or lade_parameter()
    alle = alle or teile(p)
    s, zug = p["schubladen"], p["zapfen"]["schleifzugabe"]
    T, Tb, h0 = s["wandstaerke"], s["bodenstaerke"], s["boden_abstand_unten"]
    nach_id = {t["id"]: t for t in alle}
    out = []
    for b in schubladen_bretter(p, alle, zusammenfassen=False):
        (x0, x1), (y0, y1), (z0, z1) = nach_id[b["kasten"]]["box"]
        ex, ey, ez = [1, 0, 0], [0, 1, 0], [0, 0, 1]
        art = b["id"].split("-")[1]
        if art == "S":      # u = z, v = y, w = −x
            lagen = [("a", [x0 + T, y0, z0 - zug]), ("b", [x1, y0, z0 - zug])]
            achsen = (ez, ey)
        elif art == "E1":   # u = x, v = y, w = +z — Kastenfront
            lagen = [("", [x0 - zug, y0, z0])]
            achsen = (ex, ey)
        elif art == "E2":   # Kastenrückwand
            lagen = [("", [x0 - zug, y0, z1 - T])]
            achsen = (ex, ey)
        else:               # u = x, v = z, w = −y
            lagen = [("", [x0 - zug, y0 + h0 + Tb, z0 - zug])]
            achsen = (ex, ez)
        # Griffausschnitt im Viewer als eckige Aussparung (in der DXF mit Radius)
        schleifen = _umriss(b["behalten"], b["loecher"] + [r[:4] for r in b.get("griff", [])
                                                           if r[3] > b["hoehe"]])
        flaeche = lambda pts: sum(u0 * v1 - u1 * v0 for (u0, v0), (u1, v1) in zip(pts, pts[1:] + pts[:1]))
        aussen = [l for l in schleifen if flaeche(l) > 0]
        assert len(aussen) == 1, f"{b['id']}: {len(aussen)} Außenkonturen"
        g = [r for r in b.get("griff", []) if r[3] > b["hoehe"]]
        if g:   # Griffausschnitt von oben: unten Radius, oben die Außenecken (wie in der DXF)
            u0, v0, u1, _, r = g[0]
            aussen = [_verrunde(aussen[0], [((u0, v0), r), ((u1, v0), r)] +
                                [((u, v), ro) for u, v, ro, _ in b.get("griff_ecken", [])])]
        for suffix, ursprung in lagen:
            out.append({"id": b["id"] + suffix, "name": b["name"], "kasten": b["kasten"], "faehrt": "schubladen",
                        "auszug": nach_id[b["kasten"]]["auszug"],
                        "staerke": b["staerke"], "ursprung": [round(c, 2) for c in ursprung],
                        "u": achsen[0], "v": achsen[1], "aussen": aussen[0],
                        "loecher": [l for l in schleifen if flaeche(l) < 0],
                        "fenster": [[round(c, 2) for c in f] for f in b["fenster"] +
                                    [r for r in b.get("griff", []) if r[3] <= b["hoehe"]]]})
    return out


def _verrunde(poly, ecken, schritte=8):
    """Rechtwinklige Ecken eines Polygons [(u, v), …] durch Kreisbögen ersetzen (konvex oder konkav).
    ecken: [((u, v), radius)] — Punkte, die nicht im Polygon liegen, werden ignoriert."""
    out, n = [], len(poly)
    for k, pkt in enumerate(poly):
        r = next((r for e, r in ecken if abs(e[0] - pkt[0]) < 1e-6 and abs(e[1] - pkt[1]) < 1e-6), 0)
        if not r:
            out.append(pkt)
            continue
        a, b = poly[k - 1], poly[(k + 1) % n]

        def richtung(q):
            du, dv = q[0] - pkt[0], q[1] - pkt[1]
            l = math.hypot(du, dv)
            return du / l, dv / l
        (au, av), (bu, bv) = richtung(a), richtung(b)
        mu, mv = pkt[0] + r * (au + bu), pkt[1] + r * (av + bv)          # Kreismitte
        w0 = math.atan2(pkt[1] + r * av - mv, pkt[0] + r * au - mu)
        w1 = math.atan2(pkt[1] + r * bv - mv, pkt[0] + r * bu - mu)
        d = (w1 - w0 + math.pi) % (2 * math.pi) - math.pi                 # kürzerer Bogen (90°)
        out += [(round(mu + r * math.cos(w0 + d * i / schritte), 3), round(mv + r * math.sin(w0 + d * i / schritte), 3))
                for i in range(schritte + 1)]
    return out


def _runde(wert):
    if isinstance(wert, (list, tuple)):
        return [_runde(w) for w in wert]
    return round(wert, 3) if isinstance(wert, float) else wert


KATEGORIEN = {
    "zapfen": "Zapfen steckt in Schlitz/Aussparung (gewollt)",
    "eckverbindung": "Eckausbildung Korpus — welche Platte läuft durch?",
    "rueckwand": "Rückwand R1 ragt in Schienen/Elemente (lichte Tiefe < Schienenlänge)",
    "auflage": "Matratze liegt auf den Scharnieren (weich, unkritisch)",
    "sonstige": "Sonstige Überschneidung",
}
GEWOLLT = {"zapfen", "auflage"}


def _kategorie(a, b):
    ids = {a["id"], b["id"]}
    if b["id"] in a.get("steckt_in", []) or a["id"] in b.get("steckt_in", []):
        return "zapfen"
    if {a["material"], b["material"]} == {"matratze", "scharnier"}:
        return "auflage"
    if a["gruppe"] == b["gruppe"] == "korpus":
        return "eckverbindung"
    if "R1" in ids:
        return "rueckwand"
    return "sonstige"


def kollisionen(liste, toleranz=0.01):
    """Alle Teilepaare, die sich mit echtem Volumen überschneiden (Berührung zählt nicht)."""
    out = []
    for i, a in enumerate(liste):
        for b in liste[i + 1:]:
            box = []
            for (a0, a1), (b0, b1) in zip(a["box"], b["box"]):
                lo, hi = max(a0, b0), min(a1, b1)
                if hi - lo <= toleranz:
                    break
                box.append([round(lo, 2), round(hi, 2)])
            else:
                kat = _kategorie(a, b)
                out.append({"a": a["id"], "b": b["id"], "box": box, "kategorie": kat, "gewollt": kat in GEWOLLT,
                            "mass": [round(hi - lo, 2) for lo, hi in box]})
    return out


def fahrzeug_pruefung(p=None):
    """Passt der Plan ins nachgemessene Fahrzeug? Status: ok · knapp (kein Spiel) · anpassen."""
    p = p or lade_parameter()
    k, l, f = p["korpus"], p["liegeflaeche"], p["fahrzeug"]
    T = k["plattenstaerke"]

    def pruefung(was, soll, ist, luft_text, status):
        return {"was": was, "plan": soll, "fahrzeug": ist, "ergebnis": luft_text, "status": status}

    out = []
    lo, hi = f["ladebreite_radkaesten_min"] - k["breite"], f["ladebreite_radkaesten_max"] - k["breite"]
    out.append(pruefung("Korpusbreite zwischen den Radkästen", k["breite"],
                        f"{f['ladebreite_radkaesten_min']}–{f['ladebreite_radkaesten_max']}",
                        f"{lo}–{hi} mm Spiel (bewusst nicht genutzt)",
                        "ok" if lo > 0 else ("knapp" if lo == 0 else "anpassen")))
    lo, hi = f["ladetiefe_min"] - k["tiefe"], f["ladetiefe_max"] - k["tiefe"]
    out.append(pruefung("Korpustiefe Heckklappe → Rücksitze", k["tiefe"],
                        f"{f['ladetiefe_min']}–{f['ladetiefe_max']}",
                        f"{lo}–{hi} mm Luft zu den Rücksitzen",
                        "ok" if lo > 0 else "anpassen"))
    lang = k["tiefe"] + l["laenge_f1"] + l["laenge_f2"]
    luft = f["laenge_heck_bis_kopfstuetzen"] - lang
    out.append(pruefung("Liegefläche T1 + F1 + F2 bis zu den Kopfstützen", lang,
                        f["laenge_heck_bis_kopfstuetzen"], f"{luft} mm Luft",
                        "ok" if luft > 0 else ("knapp" if luft == 0 else "anpassen")))
    hebel = p["schienen"]["hebel_vorn"]
    lo, hi = f["ladetiefe_min"] - k["tiefe"], f["ladetiefe_max"] - k["tiefe"]
    out.append(pruefung("Arretierungshebel der Schienen vor der Korpusfront", hebel,
                        f"{lo}–{hi} mm Luft (Ladetiefe − Korpus)",
                        f"Hebel ragen {hebel} mm vor — am Auto prüfen, ob die Heckklappe schließt; sonst Korpus "
                        "ganz an die Rücksitze schieben oder die Schienen bis 12 mm zurücksetzen (ADR 0028)",
                        "ok" if hebel < lo else ("knapp" if hebel <= hi else "anpassen")))
    spalt = k["hoehe"] - f["ruecksitzlehne_hoehe"]
    out.append(pruefung("Unterkante F1 über umgeklappten Rücksitzlehnen", k["hoehe"], f["ruecksitzlehne_hoehe"],
                        f"{spalt} mm Spalt — unter F1 ausgleichen (§H4)" if spalt else "liegt bündig auf",
                        "anpassen" if spalt else "ok"))
    return out


def main():
    p = lade_parameter()
    daten = {"parameter": p, "eckausbildung": p["eckausbildung"], "teile": teile(p),
             "kategorien": KATEGORIEN, "gruppen": GRUPPEN,
             # je Variante nur die Kollisionen — der Viewer zeigt immer die eingestellte Variante
             "varianten": {e: kollisionen(teile(p, e)) for e in ECKAUSBILDUNGEN}}
    daten["kollisionen"] = daten["varianten"][p["eckausbildung"]]
    daten["fahrzeug_pruefung"] = fahrzeug_pruefung(p)
    daten["klappachsen"] = _scharniere(p)[1]
    daten["schubladen_3d"] = schubladen_3d(p, teile(p))   # Kastenbretter statt Quader im 3D-Reiter (ADR 0024)
    ziel = ORDNER / "modell.js"
    ziel.write_text(
        "// GENERIERT von modell/modell.py aus modell/parameter.json — nicht von Hand bearbeiten.\n"
        "window.MODELL = " + json.dumps(daten, ensure_ascii=False, indent=1) + ";\n",
        encoding="utf-8")
    gewollt = sum(k["gewollt"] for k in daten["kollisionen"])
    print(f"{ziel.relative_to(ORDNER.parent)}: {len(daten['teile'])} Teile, "
          f"{len(daten['kollisionen']) - gewollt} Überschneidungen (+ {gewollt} gewollte: Zapfen, Matratze auf Scharnier)")
    for pr in daten["fahrzeug_pruefung"]:
        print(f"  [{pr['status']:8}] {pr['was']}: Plan {pr['plan']} / Fahrzeug {pr['fahrzeug']} → {pr['ergebnis']}")


if __name__ == "__main__":
    main()

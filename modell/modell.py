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
    k, s, e = p["korpus"], p["schienen"], p["elemente"]
    D, H, T = k["tiefe"], k["hoehe"], k["plattenstaerke"]
    rl = s["laenge"]

    def typ(element_id):                # Schienentyp je Element (C1–C3 schwer, Schubladen leicht)
        return s["typen"][s["zuordnung"][element_id]]
    bh, sp, spiel = e["brett_hoehe"], e["spalt_hoehe"], e["spiel_seitlich"]
    vor, bs = e["vorstand_front"], e["blende_staerke"]
    yB = T                              # Oberkante Bodenplatte
    hK = H - T - bh - 2 * sp            # Schubladenkasten-Höhe (320−18−32−10 = 260)
    zF = (-vor, -vor + bs)              # Frontblende, 1,5 mm vor der Korpusfront
    zK = (zF[1], zF[1] + e["kasten_tiefe"])
    zB = (-vor, -vor + e["brett_tiefe"])  # Sitz-/Tisch-Brett, so lang wie die Schiene

    sek = _sektionen(p)
    out = []

    # Schubladenschienen (ADR 0025): An M1/M2 liegen Schienen beider Nachbarsektionen gegenüber. Die
    # M5-Durchsteckschrauben (V9) stehen auf der Gegenseite über — dort darf keine Schiene sitzen. Darum
    # liegen beide Schubladenbänder im freien Streifen zwischen Sitzbrett-Schiene (unten, L/R) und
    # Tischbrett-Schiene (oben, Mitte), mit gleich großer Luft dazwischen: L/R unten, Mitte oben
    # (so bleibt in allen Seitenwänden Platz für die Fenster, ADR 0024).
    frei_u = yB + typ("C1")["hoehe"]
    frei_o = yB + hK + sp + bh - typ("C3")["hoehe"]
    hLR, hM = typ("D1")["hoehe"], typ("D3")["hoehe"]
    luft = (frei_o - frei_u - hLR - hM) / 3
    assert luft >= 5, f"Schubladenschienen passen nicht zwischen Sitz- und Tischbrett-Schiene ({luft:.1f} mm Luft)"
    y_schiene = {"LR": frei_u + luft, "M": frei_u + 2 * luft + hLR}
    assert yB + bh + sp <= y_schiene["LR"] and y_schiene["LR"] + hLR <= yB + bh + sp + hK, "Schiene D1/D2 außerhalb des Kastens"
    assert y_schiene["M"] + hM <= yB + hK, "Schiene D3 außerhalb des Kastens"

    def element(sx, id):                # Breite: Innen − 2 × Schiene − 2 × Spiel
        rs = typ(id)["staerke"]
        return (sx[0] + rs + spiel, sx[1] - rs - spiel)

    def schienenpaar(sek_id, y0, faehrt, zu):
        x0, x1 = sek[sek_id]
        rs, rh = typ(zu)["staerke"], typ(zu)["hoehe"]
        y = (round(y0, 2), round(y0 + rh, 2))
        wand_a, wand_b = SEKTIONSWAENDE[sek_id]
        out.append(_teil(f"E-{zu}-a", f"Schiene {ELEMENTE[zu]}, an {wand_a} · {typ(zu)['name']}", "schiene",
                         "schiene", (x0, x0 + rs), y, (0, rl), faehrt, richtung=1))
        out.append(_teil(f"E-{zu}-b", f"Schiene {ELEMENTE[zu]}, an {wand_b} · {typ(zu)['name']}", "schiene",
                         "schiene", (x1 - rs, x1), y, (0, rl), faehrt, richtung=-1))

    # Seiten L/R: unten Sitz-Brett, darüber Schublade
    for nr, sid in ((1, "L"), (2, "R")):
        out.append(_teil(f"C{nr}", ELEMENTE[f"C{nr}"], "brett", "sitz", element(sek[sid], f"C{nr}"),
                         (yB, yB + bh), zB, "bretter"))
        y0 = yB + bh + sp
        out.append(_teil(f"D{nr}", f"Schubladenkasten {ELEMENTE[f'D{nr}'].split()[-1]}", "schublade", "schublade", element(sek[sid], f"D{nr}"),
                         (y0, y0 + hK), zK, "schubladen"))
        out.append(_teil(f"D{nr}-F", f"Schubladenfront {ELEMENTE[f'D{nr}'].split()[-1]}", "schublade", "blende",
                         sek[sid], (yB + bh, yB + bh + e["blende_hoehe"]), zF, "schubladen"))
        schienenpaar(sid, yB, "bretter", f"C{nr}")
        schienenpaar(sid, y_schiene["LR"], "schubladen", f"D{nr}")

    # Mitte: unten Schublade, oben Tisch-Brett
    out.append(_teil("D3", "Schubladenkasten Mitte", "schublade", "schublade", element(sek["M"], "D3"),
                     (yB, yB + hK), zK, "schubladen"))
    out.append(_teil("D3-F", "Schubladenfront Mitte", "schublade", "blende",
                     sek["M"], (yB, yB + e["blende_hoehe"]), zF, "schubladen"))
    yT = yB + hK + sp
    out.append(_teil("C3", ELEMENTE["C3"], "brett", "tisch", element(sek["M"], "C3"), (yT, yT + bh), zB, "bretter"))
    schienenpaar("M", y_schiene["M"], "schubladen", "D3")
    schienenpaar("M", yT + bh - typ("C3")["hoehe"], "bretter", "C3")
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


def schubladen_bretter(p=None, alle=None):
    """Die Bretter der Schubladenkästen D1–D3 als ebene Frässkonturen (ADR 0024).

    Außenmaße jedes Kastens kommen aus dem Quader D1/D2/D3 in `teile()`, die Höhe des
    Schienenbands aus den Schienen E-D*-a — es gibt keine zweite Stelle für diese Maße.
    Je Brett: Rechtecke (u0, v0, u1, v1) zum Behalten bzw. Ausfräsen, dazu Fenster
    (u0, v0, u1, v1, radius). Ursprung links unten am Rohteil, Zinken und Bodenzapfen
    stehen um die Schleifzugabe über. Gleiche Bretter (D1/D2) werden zusammengefasst.

    Seitenwand -S: u = Kastentiefe (z), v = Höhe · Stirnwand -E (Kastenfront und
    -rückwand): u = Kastenbreite (x), v = Höhe · Boden -B: u = Breite (x), v = Tiefe (z).
    """
    p = p or lade_parameter()
    alle = alle or teile(p)
    s, zug = p["schubladen"], p["zapfen"]["schleifzugabe"]
    T, Tb, h0 = s["wandstaerke"], s["bodenstaerke"], s["boden_abstand_unten"]
    n, bz, f = s["zinken_anzahl"], s["bodenzapfen"], s["fenster"]
    nach_id = {t["id"]: t for t in alle}
    rand = T + zug                              # Zinkenlänge inkl. Schleifzugabe

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
        bf = (Li - 2 * f["rand_ende"] - (f["anzahl"] - 1) * f["steg"]) / f["anzahl"]
        fenster = [(rand + f["rand_ende"] + i * (bf + f["steg"]), a,
                    rand + f["rand_ende"] + i * (bf + f["steg"]) + bf, b, f["radius"])
                   for a, b in frei for i in range(f["anzahl"])]

        boden_zapfen = [(0, rand + a, rand, rand + a + bz["laenge"]) for a in
                        _verteilt(Li, bz["anzahl_lang"], bz["laenge"], bz["abstand_rand"])]
        boden_zapfen += [(B + 2 * zug - u1, v0, B + 2 * zug - u0, v1) for u0, v0, u1, v1 in boden_zapfen]
        quer = [(rand + a, 0, rand + a + bz["laenge"], rand) for a in
                _verteilt(Bi, bz["anzahl_kurz"], bz["laenge"], bz["abstand_rand"])]
        boden_zapfen += quer + [(u0, L + 2 * zug - v1, u1, L + 2 * zug - v0) for u0, v0, u1, v1 in quer]

        lage = ELEMENTE[d].split()[-1]
        bretter += [
            {"id": f"{d}-S", "teil": "Seitenwand", "lagen": [lage], "stk": 2, "staerke": T,
             "breite": L + 2 * zug, "hoehe": H, "behalten": [(0, 0, L + 2 * zug, H)],
             "loecher": zinken(L, H, True) + bodenschlitze(Li, bz["anzahl_lang"]), "fenster": fenster},
            {"id": f"{d}-E", "teil": "Kastenfront und -rückwand", "lagen": [lage], "stk": 2, "staerke": T,
             "breite": B + 2 * zug, "hoehe": H, "behalten": [(0, 0, B + 2 * zug, H)],
             "loecher": zinken(B, H, False) + bodenschlitze(Bi, bz["anzahl_kurz"]), "fenster": []},
            {"id": f"{d}-B", "teil": "Boden", "lagen": [lage], "stk": 1, "staerke": Tb,
             "breite": B + 2 * zug, "hoehe": L + 2 * zug, "behalten": [(rand, rand, rand + Bi, rand + Li)] + boden_zapfen,
             "loecher": [], "fenster": []},
        ]

    def gleich(a, b):
        schluessel = ("staerke", "breite", "hoehe", "behalten", "loecher", "fenster")
        return all(_runde(a[k]) == _runde(b[k]) for k in schluessel)

    out = []
    for b in bretter:
        vorhanden = next((o for o in out if o["id"][-1] == b["id"][-1] and gleich(o, b)), None)
        if vorhanden:
            vorhanden["ids"].append(b["id"])
            vorhanden["lagen"] = vorhanden["lagen"] + b["lagen"]
            vorhanden["stk"] += b["stk"]
        else:
            out.append(dict(b, ids=[b["id"]]))
    for b in out:
        b["name"] = f"Schublade {' / '.join(b['lagen'])}, {b['teil']}"
    return out


def _runde(wert):
    if isinstance(wert, (list, tuple)):
        return [_runde(w) for w in wert]
    return round(wert, 3) if isinstance(wert, float) else wert


KATEGORIEN = {
    "zapfen": "Zapfen steckt in Schlitz/Aussparung (gewollt)",
    "eckverbindung": "Eckausbildung Korpus — welche Platte läuft durch?",
    "rueckwand": "Rückwand R1 ragt in Schienen/Elemente (lichte Tiefe < Schienenlänge)",
    "frontblende": "Schubladenfront überdeckt Schienen bzw. Nachbarelement",
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
    if "blende" in (a["material"], b["material"]):
        return "frontblende"
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

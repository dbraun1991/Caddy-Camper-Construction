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
ECKAUSBILDUNGEN = ("genutet", "stumpf")   # Boden + Deckel immer durchlaufend, ADR 0018

# Kürzel bleiben feste Positionsnummern; der Buchstabe nennt die Gruppe, `name` den Langnamen
# (Funktion + Lage, links/rechts aus Fahrersicht). Glossar: List_of_Materials.md „Bezeichnungen“.
GRUPPEN = {
    "A": "Liegefläche (waagerecht oben)", "B": "Wände (senkrecht)", "F": "Fußboden (waagerecht unten)",
    "C": "Auszugbretter", "D": "Schubladen", "E": "Schienen",
    "V": "Verbindungsmittel & Beschläge", "G": "Ausstattung", "S": "Scharniere",
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

    # Boden F1 und Deckel A1 laufen voll durch (1.120 × 900); alle Wände stehen dazwischen.
    # Genutet: jede Wand steckt nt tief in F1 und A1 — an den Außenkanten als Falz, innen als Nut.
    if eck not in ECKAUSBILDUNGEN:
        raise ValueError(f"unbekannte eckausbildung: {eck}")
    nt = k["nut_tiefe"] if eck == "genutet" else 0
    wand_y = (T - nt, H + nt)
    nut = {"steckt_in": ["F1", "A1"]} if nt else {}

    return [
        _teil("B2-F", "Seitenwand links (Fahrerseite)", "korpus", "holz", (xi, xa), wand_y, (0, D), **nut),
        _teil("B2-B", "Seitenwand rechts (Beifahrerseite)", "korpus", "holz", (-xa, -xi), wand_y, (0, D), **nut),
        _teil("B1", "Rückwand", "korpus", "holz", (-xi, xi), wand_y, (D - T, D), **nut),
        _teil("F1", "Bodenplatte", "korpus", "holz", (-xa, xa), (0, T), (0, D)),
        _teil("B3-1", "Trennwand links", "korpus", "holz", (d, d + DW), wand_y, (0, D - T), **nut),
        _teil("B3-2", "Trennwand rechts", "korpus", "holz", (-d - DW, -d), wand_y, (0, D - T), **nut),
        _teil("A1", "Deckplatte", "liegeflaeche", "holz", (-xa, xa), (H, H + T), (0, D)),
    ]


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

    def typ(element_id):                # Schienentyp je Element (C1/C2 schwer, Rest leicht)
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
        # Schubladenschiene mittig auf 2/3 Kastenhöhe — Bänder dürfen sich an B3 nicht überlappen (§H1)
        schienenpaar(sid, yB + bh + sp + hK * 2 / 3 - typ(f"D{nr}")["hoehe"] / 2, "schubladen", f"D{nr}")

    # Mitte: unten Schublade, oben Tisch-Brett
    out.append(_teil("D3", "Schubladenkasten Mitte", "schublade", "schublade", element(sek["M"], "D3"),
                     (yB, yB + hK), zK, "schubladen"))
    out.append(_teil("D3-F", "Schubladenfront Mitte", "schublade", "blende",
                     sek["M"], (yB, yB + e["blende_hoehe"]), zF, "schubladen"))
    yT = yB + hK + sp
    out.append(_teil("C3", ELEMENTE["C3"], "brett", "tisch", element(sek["M"], "C3"), (yT, yT + bh), zB, "bretter"))
    schienenpaar("M", yB + hK / 3 - typ("D3")["hoehe"] / 2, "schubladen", "D3")
    schienenpaar("M", yT + bh - typ("C3")["hoehe"], "bretter", "C3")
    return out


def _scharniere(p):
    """Klappscharniere an den Fugen A1↔A2 (oben) und A2↔A3 (unten), dazu die Klappachsen.

    Ein aufgeschraubtes Scharnier lässt sich nur zur Seite seiner Achse öffnen: oben auf
    A1↔A2 klappt A2 nur nach oben über die Box, unten an A2↔A3 klappt A3 nur nach unten —
    nach dem Umklappen von A2 ist „unten“ oben, A3 legt sich auf A2.
    """
    k, l, s = p["korpus"], p["liegeflaeche"], p["scharniere"]
    W, D, H, T = k["breite"], k["tiefe"], k["hoehe"], k["plattenstaerke"]
    a, b, lo = s["achse_ueber_flaeche"], s["blatt_breite"], s["laenge_offen"]
    z12, z23 = D, D + l["laenge_a2"]
    xs = [0] + [v * (W / 2 - s["abstand_rand"]) for v in (-1, 1)] if s["je_fuge"] == 3 else \
         [W * (i + 1) / (s["je_fuge"] + 1) - W / 2 for i in range(s["je_fuge"])]
    out = []
    for i, x in enumerate(sorted(xs), 1):
        out.append(_teil(f"S1-{i}", "Scharnier Deckplatte ↔ Klappbrett Rücksitz (oben)", "scharnier", "scharnier",
                         (x - b / 2, x + b / 2), (H + T, H + T + 2 * a), (z12 - lo / 2, z12 + lo / 2)))
        out.append(_teil(f"S2-{i}", "Scharnier Klappbrett Rücksitz ↔ Kopfende (unten)", "scharnier", "scharnier",
                         (x - b / 2, x + b / 2), (H - 2 * a, H), (z23 - lo / 2, z23 + lo / 2), klappt_mit="A2"))
    # Achsen (y, z) im flachen Zustand und Klappwinkel um x für die Fahrmodi
    achsen = {"A2": {"y": H + T + a, "z": z12, "winkel": -180},
              "A3": {"y": H - a, "z": z23, "winkel": 180, "an": "A2"}}
    return out, achsen


def _liegeflaeche(p):
    k, l, m = p["korpus"], p["liegeflaeche"], p["matratze"]
    W, D, H, T = k["breite"], k["tiefe"], k["hoehe"], k["plattenstaerke"]
    y = (H, H + T)
    return _scharniere(p)[0] + [
        _teil("A2", "Klappbrett Rücksitz", "liegeflaeche", "holz", (-W / 2, W / 2), y, (D, D + l["laenge_a2"])),
        _teil("A3", "Klappbrett Kopfende", "liegeflaeche", "holz", (-W / 2, W / 2), y,
              (D + l["laenge_a2"], D + l["laenge_a2"] + l["laenge_a3"])),
        _teil("G1", "Matratze", "matratze", "matratze", (-m["breite"] / 2, m["breite"] / 2),
              (H + T, H + T + m["hoehe"]), (0, m["laenge"])),
    ]


def teile(p=None, eckausbildung=None):
    p = p or lade_parameter()
    eck = eckausbildung or p["eckausbildung"]
    return _korpus(p, eck) + _einbauten(p) + _liegeflaeche(p)


KATEGORIEN = {
    "nut": "Nut/Falz: Wand steckt in Bodenplatte F1 bzw. Deckplatte A1 (gewollt)",
    "eckverbindung": "Eckausbildung Korpus — welche Platte läuft durch?",
    "rueckwand": "Rückwand B1 ragt in Schienen/Elemente (lichte Tiefe < Schienenlänge)",
    "frontblende": "Schubladenfront überdeckt Schienen bzw. Nachbarelement",
    "auflage": "Matratze liegt auf den Scharnieren (weich, unkritisch)",
    "sonstige": "Sonstige Überschneidung",
}
GEWOLLT = {"nut", "auflage"}


def _kategorie(a, b):
    ids = {a["id"], b["id"]}
    if b["id"] in a.get("steckt_in", []) or a["id"] in b.get("steckt_in", []):
        return "nut"
    if {a["material"], b["material"]} == {"matratze", "scharnier"}:
        return "auflage"
    if a["gruppe"] == b["gruppe"] == "korpus":
        return "eckverbindung"
    if "B1" in ids:
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
    lang = k["tiefe"] + l["laenge_a2"] + l["laenge_a3"]
    luft = f["laenge_heck_bis_kopfstuetzen"] - lang
    out.append(pruefung("Liegefläche A1 + A2 + A3 bis zu den Kopfstützen", lang,
                        f["laenge_heck_bis_kopfstuetzen"], f"{luft} mm Luft",
                        "ok" if luft > 0 else ("knapp" if luft == 0 else "anpassen")))
    spalt = k["hoehe"] - f["ruecksitzlehne_hoehe"]
    out.append(pruefung("Unterkante A2 über umgeklappten Rücksitzlehnen", k["hoehe"], f["ruecksitzlehne_hoehe"],
                        f"{spalt} mm Spalt — unter A2 ausgleichen (§H4)" if spalt else "liegt bündig auf",
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
          f"{len(daten['kollisionen']) - gewollt} Überschneidungen (+ {gewollt} gewollte: Nut/Falz, Matratze auf Scharnier)")
    for pr in daten["fahrzeug_pruefung"]:
        print(f"  [{pr['status']:8}] {pr['was']}: Plan {pr['plan']} / Fahrzeug {pr['fahrzeug']} → {pr['ergebnis']}")


if __name__ == "__main__":
    main()

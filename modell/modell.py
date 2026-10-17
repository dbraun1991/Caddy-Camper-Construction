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
ECKAUSBILDUNGEN = ("stueckliste", "boden_durchlaufend", "seiten_durchlaufend")


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

    if eck == "stueckliste":           # Maße 1:1 aus List_of_Materials.md §B
        wand_y, b4_x, b4_z = (0, H), (-xa, xa), (0, D)
        b1_x, b1_y, b3_z = (-xa, xa), (0, H), (0, D)
    elif eck == "boden_durchlaufend":  # B4 durchgehend, alle Wände stehen darauf
        wand_y, b4_x, b4_z = (T, H), (-xa, xa), (0, D)
        b1_x, b1_y, b3_z = (-xi, xi), (T, H), (0, D - T)
    elif eck == "seiten_durchlaufend":  # B2 bis zum Ladeboden, B4/B1 dazwischen
        wand_y, b4_x, b4_z = (0, H), (-xi, xi), (0, D)
        b1_x, b1_y, b3_z = (-xi, xi), (T, H), (0, D - T)
    else:
        raise ValueError(f"unbekannte eckausbildung: {eck}")
    b3_y = (T, H) if eck != "stueckliste" else (0, H)

    return [
        _teil("B2-F", "Seitenwand Fahrerseite", "korpus", "holz", (xi, xa), wand_y, (0, D)),
        _teil("B2-B", "Seitenwand Beifahrerseite", "korpus", "holz", (-xa, -xi), wand_y, (0, D)),
        _teil("B1", "Rückwand", "korpus", "holz", b1_x, b1_y, (D - T, D)),
        _teil("B4", "Bodenplatte", "korpus", "holz", b4_x, (0, T), b4_z),
        _teil("B3-1", "Trennwand 1", "korpus", "holz", (-d - DW, -d), b3_y, b3_z),
        _teil("B3-2", "Trennwand 2", "korpus", "holz", (d, d + DW), b3_y, b3_z),
        _teil("A1", "Unterbau-Deckel", "liegeflaeche", "holz", (-xa, xa), (H, H + T), (0, D)),
    ]


def _sektionen(p):
    k = p["korpus"]
    xi = k["breite"] / 2 - k["plattenstaerke"]
    d = k["sektion_mitte_innen"] / 2
    DW = k["trennwandstaerke"]
    # Reihenfolge und Namen wie in List_of_Materials.md: L = −x, R = +x
    return {"L": (-xi, -d - DW), "M": (-d, d), "R": (d + DW, xi)}


def _einbauten(p):
    k, s, e = p["korpus"], p["schienen"], p["elemente"]
    D, H, T = k["tiefe"], k["hoehe"], k["plattenstaerke"]
    rs, rh, rl = s["staerke"], s["hoehe"], s["laenge"]
    bh, sp, spiel = e["brett_hoehe"], e["spalt_hoehe"], e["spiel_seitlich"]
    vor, bs = e["vorstand_front"], e["blende_staerke"]
    yB = T                              # Oberkante Bodenplatte
    hK = H - T - bh - 2 * sp            # Schubladenkasten-Höhe (320−18−32−10 = 260)
    zF = (-vor, -vor + bs)              # Frontblende, 1,5 mm vor der Korpusfront
    zK = (zF[1], zF[1] + e["kasten_tiefe"])
    zB = (-vor, -vor + D)               # Sitz-/Tisch-Brett, volle Korpustiefe

    sek = _sektionen(p)
    out = []

    def element(sx):                    # Breite: Innen − 2 × Schiene − 2 × Spiel
        return (sx[0] + rs + spiel, sx[1] - rs - spiel)

    def schienenpaar(sek_id, y0, faehrt, zu):
        x0, x1 = sek[sek_id]
        y = (round(y0, 2), round(y0 + rh, 2))
        out.append(_teil(f"E-{zu}-a", f"Schiene {zu} (−x)", "schiene",
                         "schiene", (x0, x0 + rs), y, (0, rl), faehrt, richtung=1))
        out.append(_teil(f"E-{zu}-b", f"Schiene {zu} (+x)", "schiene",
                         "schiene", (x1 - rs, x1), y, (0, rl), faehrt, richtung=-1))

    # Seiten L/R: unten Sitz-Brett, darüber Schublade
    for nr, sid in ((1, "L"), (2, "R")):
        x = element(sek[sid])
        out.append(_teil(f"C{nr}", f"Sitz-Brett {sid}", "brett", "sitz", x, (yB, yB + bh), zB, "bretter"))
        y0 = yB + bh + sp
        out.append(_teil(f"D{nr}", f"Schublade {sid} — Kasten", "schublade", "schublade", x, (y0, y0 + hK), zK, "schubladen"))
        out.append(_teil(f"D{nr}-F", f"Schublade {sid} — Frontblende", "schublade", "blende",
                         sek[sid], (yB + bh, yB + bh + e["blende_hoehe"]), zF, "schubladen"))
        schienenpaar(sid, yB, "bretter", f"C{nr}")
        schienenpaar(sid, yB + bh + sp + hK * 2 / 3 - rh / 2, "schubladen", f"D{nr}")

    # Mitte: unten Schublade, oben Tisch-Brett
    x = element(sek["M"])
    out.append(_teil("D3", "Schublade M — Kasten", "schublade", "schublade", x, (yB, yB + hK), zK, "schubladen"))
    out.append(_teil("D3-F", "Schublade M — Frontblende", "schublade", "blende",
                     sek["M"], (yB, yB + e["blende_hoehe"]), zF, "schubladen"))
    yT = yB + hK + sp
    out.append(_teil("C3", "Tisch-Brett M", "brett", "tisch", x, (yT, yT + bh), zB, "bretter"))
    schienenpaar("M", yB + hK / 3 - rh / 2, "schubladen", "D3")
    schienenpaar("M", yT + bh - rh, "bretter", "C3")
    return out


def _liegeflaeche(p):
    k, l, m = p["korpus"], p["liegeflaeche"], p["matratze"]
    W, D, H, T = k["breite"], k["tiefe"], k["hoehe"], k["plattenstaerke"]
    y = (H, H + T)
    return [
        _teil("A2", "Brett Sitzrücken", "liegeflaeche", "holz", (-W / 2, W / 2), y, (D, D + l["laenge_a2"])),
        _teil("A3", "Brett Kopfbereich", "liegeflaeche", "holz", (-W / 2, W / 2), y,
              (D + l["laenge_a2"], D + l["laenge_a2"] + l["laenge_a3"])),
        _teil("G1", "Matratze", "matratze", "matratze", (-m["breite"] / 2, m["breite"] / 2),
              (H + T, H + T + m["hoehe"]), (0, m["laenge"])),
    ]


def teile(p=None, eckausbildung=None):
    p = p or lade_parameter()
    eck = eckausbildung or p["eckausbildung"]
    return _korpus(p, eck) + _einbauten(p) + _liegeflaeche(p)


KATEGORIEN = {
    "eckverbindung": "Eckausbildung Korpus — welche Platte läuft durch?",
    "rueckwand": "Rückwand B1 ragt in Schienen/Elemente (lichte Tiefe < Schienenlänge)",
    "frontblende": "Frontblende überdeckt Schienen bzw. Nachbarelement",
    "sonstige": "Sonstige Überschneidung",
}


def _kategorie(a, b):
    ids = {a["id"], b["id"]}
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
                out.append({"a": a["id"], "b": b["id"], "box": box, "kategorie": _kategorie(a, b),
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
    luft = f["ladebreite_radkaesten"] - k["breite"]
    out.append(pruefung("Korpusbreite zwischen den Radkästen", k["breite"], f["ladebreite_radkaesten"],
                        f"{luft} mm Spiel", "ok" if luft > 0 else ("knapp" if luft == 0 else "anpassen")))
    lo, hi = f["ladetiefe_min"] - k["tiefe"], f["ladetiefe_max"] - k["tiefe"]
    lo2, hi2 = lo - T, hi - T
    out.append(pruefung("Korpustiefe Heckklappe → Rücksitze", k["tiefe"],
                        f"{f['ladetiefe_min']}–{f['ladetiefe_max']}",
                        f"{lo}–{hi} mm Luft; mit Rückwand hinter 900 mm lichter Tiefe "
                        f"({k['tiefe'] + T} mm) noch {lo2}–{hi2} mm",
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
             "kategorien": KATEGORIEN,
             # je Variante nur die Kollisionen — der Viewer zeigt immer die eingestellte Variante
             "varianten": {e: kollisionen(teile(p, e)) for e in ECKAUSBILDUNGEN}}
    daten["kollisionen"] = daten["varianten"][p["eckausbildung"]]
    daten["fahrzeug_pruefung"] = fahrzeug_pruefung(p)
    ziel = ORDNER / "modell.js"
    ziel.write_text(
        "// GENERIERT von modell/modell.py aus modell/parameter.json — nicht von Hand bearbeiten.\n"
        "window.MODELL = " + json.dumps(daten, ensure_ascii=False, indent=1) + ";\n",
        encoding="utf-8")
    print(f"{ziel.relative_to(ORDNER.parent)}: {len(daten['teile'])} Teile, "
          f"{len(daten['kollisionen'])} Überschneidungen")
    for pr in daten["fahrzeug_pruefung"]:
        print(f"  [{pr['status']:8}] {pr['was']}: Plan {pr['plan']} / Fahrzeug {pr['fahrzeug']} → {pr['ergebnis']}")


if __name__ == "__main__":
    main()

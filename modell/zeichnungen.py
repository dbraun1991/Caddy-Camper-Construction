"""Werkzeichnungen (Draufsicht, Vorderansicht, Seitenansicht) aus dem gemeinsamen Teilemodell.

Baut jedes Teil aus modell.teile() als Volumenkörper in build123d auf, projiziert
orthogonal mit getrennten sichtbaren und verdeckten Kanten und schreibt je
Eckausbildung drei DIN-A3-Blätter im Maßstab 1:5 nach docs/zeichnungen/<variante>/.
Rechnerische Überschneidungen (modell.kollisionen) werden rot hinterlegt, gewollte
Überdeckungen (Wand steckt in Nut/Falz von Boden und Deckel) grün.

Benötigt build123d (siehe modell/requirements.txt):
  python3 -m venv .venv && .venv/bin/pip install -r modell/requirements.txt
  .venv/bin/python modell/zeichnungen.py [--png]
"""

import sys
from datetime import date
from pathlib import Path

import build123d as bd

sys.path.insert(0, str(Path(__file__).resolve().parent))
import modell  # noqa: E402

ZIEL = Path(__file__).resolve().parent.parent / "docs" / "zeichnungen"
M = 1 / 5                                # Maßstab 1:5 — mm Modell → mm Papier
BLATT_B, BLATT_H = 420, 297              # DIN A3 quer
SCHRIFT = "DejaVu Sans"

VARIANTEN = {   # Boden B4 und Deckel A1 laufen immer durch (ADR 0018)
    "genutet": "Boden- + Deckplatte durchlaufend, Wände in Nut/Falz",
    "stumpf": "Boden- + Deckplatte durchlaufend, Wände stumpf",
}

# Blickrichtung je Ansicht: Kamera-Position, Bild-oben, und dieselbe Abbildung
# Modell (x, y, z) → Bild (u, v) als Funktion, damit Maße und rote Flächen exakt
# auf den projizierten Kanten liegen.
ANSICHTEN = {
    "vorderansicht": dict(
        titel="Vorderansicht", nr=1,
        blick="Blick von der Heckklappe auf die offene Korpusfront (Fahrerseite links im Bild)",
        kamera=(0, 0, -20000), oben=(0, 1, 0), uv=lambda x, y, z: (-x, y),
        ohne={"A2", "A3", "G1"},
        # Rückwand-Kollisionen liegen 882–900 mm tief — frontal projiziert würden sie ganze Schubladen rot färben
        zeige={"nut", "eckverbindung", "frontblende", "sonstige"},
        # die Rückwand liegt ganz hinten über die volle Breite — ihre Nut/Falz würde frontal
        # wie eine durchgehende Nut in Boden und Deckel aussehen
        ohne_koll_mit={"B1"}),
    "draufsicht": dict(
        titel="Draufsicht", nr=2,
        blick="Blick von oben, Deckel A1 abgenommen — Korpusfront (Heckklappe) unten im Bild",
        kamera=(0, 20000, 0), oben=(0, 0, 1), uv=lambda x, y, z: (-x, z),
        ohne={"A1", "A2", "A3", "G1"}, zeige=set(modell.KATEGORIEN)),
    "seitenansicht": dict(
        titel="Seitenansicht", nr=3,
        blick="Blick von der Fahrerseite (+x) — Korpusfront (Heckklappe) rechts im Bild",
        kamera=(20000, 0, 0), oben=(0, 1, 0), uv=lambda x, y, z: (-z, y),
        ohne={"A2", "A3", "G1"}, zeige=set(modell.KATEGORIEN)),
}


# ── Hilfen ───────────────────────────────────────────────────────────────────
def solid(t):
    (x0, x1), (y0, y1), (z0, z1) = t["box"]
    return bd.Solid.make_box(x1 - x0, y1 - y0, z1 - z0, bd.Plane((x0, y0, z0)))


def rechteck_uv(box, uv):
    """2D-Rechteck (u0, v0, u1, v1) eines Quaders in Modell-mm."""
    (x0, x1), (y0, y1), (z0, z1) = box
    ecken = [uv(x, y, z) for x in (x0, x1) for y in (y0, y1) for z in (z0, z1)]
    us, vs = [e[0] for e in ecken], [e[1] for e in ecken]
    return min(us), min(vs), max(us), max(vs)


def fmt(wert):
    return f"{wert:g}".replace(".", ",")


class Blatt:
    """Ein A3-Blatt: Ansicht in Modell-mm hinein, Ausgabe in Papier-mm."""

    def __init__(self, mitte):
        self.mitte = mitte                     # Papierposition des Modell-Ursprungs (u=0, v=0)
        self.ebenen = {n: [] for n in ("rahmen", "verdeckt", "sichtbar", "nut", "kollision", "mass", "text")}
        self.draft = bd.Draft(font_size=3.0, font=SCHRIFT, decimal_precision=0, display_units=False,
                              arrow_length=2.2, line_width=0.18, pad_around_text=1.0, extension_gap=1.0)

    def p(self, u, v):                         # Modell (u, v) → Papier
        return (self.mitte[0] + u * M, self.mitte[1] + v * M, 0)

    def kanten(self, kanten, ebene):
        verschiebung = bd.Location((self.mitte[0], self.mitte[1], 0))
        self.ebenen[ebene] += [verschiebung * e.scale(M) for e in kanten]

    def text(self, s, u, v, groesse=3.0, papier=False, ausrichtung=(bd.TextAlign.CENTER, bd.TextAlign.CENTER)):
        x, y = (u, v) if papier else self.p(u, v)[:2]
        self.ebenen["text"].append(bd.Pos(x, y) * bd.Text(s, groesse, font=SCHRIFT, text_align=ausrichtung))

    def mass(self, a, b, abstand, label=None):
        """Maß zwischen zwei Modellpunkten (u, v); abstand in Papier-mm, rechts der Richtung a→b."""
        laenge = ((b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2) ** 0.5
        self.ebenen["mass"].append(bd.ExtensionLine(
            border=[self.p(*a), self.p(*b)], offset=abstand, draft=self.draft,
            label=label or fmt(round(laenge, 1))))

    def kette(self, punkte, abstand):
        versatz = 0
        for a, b in zip(punkte, punkte[1:]):
            laenge = ((b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2) ** 0.5
            if laenge * M >= 10:                 # Zahl passt zwischen die Pfeile
                self.mass(a, b, abstand)
                continue
            # Kurzes Maß: Linie ohne Zahl, Zahl gestaffelt außerhalb (rechts der Richtung a→b)
            self.mass(a, b, abstand, label=" ")
            versatz = 4.5 if versatz != 4.5 else 8.5
            nx, ny = (b[1] - a[1]) / laenge, -(b[0] - a[0]) / laenge
            weg = (abstand + versatz) / M
            self.text(fmt(round(laenge, 1)), (a[0] + b[0]) / 2 + nx * weg, (a[1] + b[1]) / 2 + ny * weg, 2.6)

    def masslinie(self, a, b, label):
        """Maß direkt im Bild, ohne Hilfslinien."""
        self.ebenen["mass"].append(bd.DimensionLine(path=[self.p(*a), self.p(*b)], draft=self.draft, label=label))

    def flaeche(self, u0, v0, u1, v1, ebene="kollision"):
        (x0, y0, _), (x1, y1, _) = self.p(u0, v0), self.p(u1, v1)
        self.ebenen[ebene].append(
            bd.Pos((x0 + x1) / 2, (y0 + y1) / 2) * bd.Rectangle(max(x1 - x0, 0.4), max(y1 - y0, 0.4)))

    def linie(self, *punkte, ebene="rahmen"):
        self.ebenen[ebene].append(bd.Polyline(*punkte))

    def rahmen(self, titel, untertitel, nummer, variante):
        # DIN-Rand: 20 mm links (Heftrand), sonst 10 mm
        self.linie((20, 10), (BLATT_B - 10, 10), (BLATT_B - 10, BLATT_H - 10), (20, BLATT_H - 10), (20, 10))
        # Schriftfeld unten rechts, 180 × 36 mm
        x0, x1, y0, y1 = BLATT_B - 190, BLATT_B - 10, 10, 46
        self.linie((x0, y0), (x0, y1), (x1, y1))
        for y in (22, 34):
            self.linie((x0, y), (x1, y))
        self.linie((x0 + 60, y0), (x0 + 60, y1))
        self.linie((x0 + 120, y0), (x0 + 120, 22))
        links = (bd.TextAlign.LEFT, bd.TextAlign.CENTER)
        felder = [
            (x0 + 2, 43, "Benennung", titel, 4.2), (x0 + 62, 43, "Projekt", "VW Caddy Mk3 Camper — Unterbau", 3.0),
            (x0 + 2, 31, "Maßstab", "1:5 (DIN A3)", 3.0), (x0 + 62, 31, "Eckausbildung", variante, 2.6),
            (x0 + 2, 19, "Blatt", f"{nummer} von 3", 3.0), (x0 + 62, 19, "Stand", date.today().isoformat(), 3.0),
            (x0 + 122, 19, "Maße", "mm", 3.0),
        ]
        for x, y, kopf, wert, gr in felder:
            self.text(kopf, x, y, 1.8, papier=True, ausrichtung=links)
            self.text(wert, x, y - 5.5, gr, papier=True, ausrichtung=links)
        self.text(untertitel, 25, BLATT_H - 17, 3.2, papier=True, ausrichtung=links)
        self.text(f"{titel}", 25, BLATT_H - 25, 6, papier=True, ausrichtung=links)

    def legende(self, kollisionen, zeige):
        x, y = 25, 46
        links = (bd.TextAlign.LEFT, bd.TextAlign.CENTER)
        self.linie((x, y), (x + 12, y), ebene="sichtbar")
        self.text("sichtbare Kante", x + 15, y, 2.6, papier=True, ausrichtung=links)
        self.linie((x, y - 5), (x + 12, y - 5), ebene="verdeckt")
        self.text("verdeckte Kante", x + 15, y - 5, 2.6, papier=True, ausrichtung=links)
        self.ebenen["kollision"].append(bd.Pos(x + 6, y - 10) * bd.Rectangle(12, 3))
        self.text("rechnerische Überschneidung zweier Teile (Fehler)", x + 15, y - 10, 2.6, papier=True, ausrichtung=links)
        self.ebenen["nut"].append(bd.Pos(x + 6, y - 15) * bd.Rectangle(12, 3))
        self.text("gewollte Überdeckung: Wand steckt in Nut/Falz", x + 15, y - 15, 2.6, papier=True, ausrichtung=links)
        y -= 5
        zaehler = {}
        for k in kollisionen:
            zaehler[k["kategorie"]] = zaehler.get(k["kategorie"], 0) + 1
        zeilen = [f"{n} × {modell.KATEGORIEN[k]}" + ("" if k in zeige else " — hier nicht dargestellt, siehe Draufsicht/Seitenansicht")
                  for k, n in zaehler.items()] or ["keine Überschneidungen"]
        for i, z in enumerate(zeilen):
            self.text(z, x + 15, y - 16 - i * 4.2, 2.4, papier=True, ausrichtung=links)
        self.text("Schlafmodus (alles eingefahren) · Klappbretter A2/A3, Scharniere und Matratze nicht dargestellt",
                  x, 14, 2.2, papier=True, ausrichtung=links)

    def positionsliste(self, eintraege):
        """Kürzel → Langname der beschrifteten Teile, zweispaltig zwischen Legende und Schriftfeld."""
        links = (bd.TextAlign.LEFT, bd.TextAlign.CENTER)
        x0, y0, zeilen = 128, 46, 6
        self.text("Positionen", x0, y0, 2.6, papier=True, ausrichtung=links)
        for i, (id, name) in enumerate(eintraege):
            x = x0 + (i // zeilen) * 50
            y = y0 - 5 - (i % zeilen) * 4
            self.text(id, x, y, 2.2, papier=True, ausrichtung=links)
            self.text(name, x + 10, y, 2.2, papier=True, ausrichtung=links)

    def schreiben(self, pfad):
        svg = bd.ExportSVG(unit=bd.Unit.MM, margin=0, fit_to_stroke=False)
        svg.add_layer("rahmen", line_weight=0.5, fill_color=None, line_color=(0.0, 0.0, 0.0))
        svg.add_layer("nut", line_weight=0.1, fill_color=(0.2, 0.65, 0.3, 0.55), line_color=(0.1, 0.45, 0.2))
        svg.add_layer("kollision", line_weight=0.1, fill_color=(0.9, 0.16, 0.16, 0.45), line_color=(0.78, 0.0, 0.0))
        svg.add_layer("verdeckt", line_weight=0.18, fill_color=None, line_color=(0.43, 0.43, 0.43),
                      line_type=bd.LineType.ISO_DASH)
        svg.add_layer("sichtbar", line_weight=0.35, fill_color=None, line_color=(0.0, 0.0, 0.0))
        svg.add_layer("mass", line_weight=0.18, fill_color=(0.12, 0.24, 0.55), line_color=(0.12, 0.24, 0.55))
        svg.add_layer("text", line_weight=0.01, fill_color=(0.0, 0.0, 0.0), line_color=None)
        # unsichtbare Blattecken, damit jede SVG exakt A3 groß ist
        svg.add_layer("blatt", line_weight=0.01, line_color=(1.0, 1.0, 1.0))
        svg.add_shape(bd.Polyline((0, 0), (BLATT_B, 0), (BLATT_B, BLATT_H), (0, BLATT_H), (0, 0)), "blatt")
        for name, formen in self.ebenen.items():
            if formen:
                svg.add_shape(formen, name)
        svg.write(str(pfad))


# ── Bemaßung je Ansicht (alle Werte aus den Teilen, nichts hart codiert) ──────
def teil(teile, id):
    return next(t for t in teile if t["id"] == id)


def bemassen(name, blatt, teile, p):
    k = p["korpus"]
    W, D = k["breite"], k["tiefe"]
    a1 = teil(teile, "A1")["box"]
    oben = a1[1][1]                                       # Oberkante Deckel
    b4 = teil(teile, "B4")["box"]
    b1 = teil(teile, "B1")["box"]
    wand_x = sorted({v for id in ("B2-F", "B2-B", "B3-1", "B3-2") for v in teil(teile, id)["box"][0]})
    hoehen = sorted({0, b4[1][1], a1[1][0], oben})
    r_ende = teil(teile, "E-C1-a")["box"][2][1]          # hinteres Schienenende
    wand = teil(teile, "B2-F")["box"][1]                  # Wandhöhe inkl. Nut/Falz in B4 und A1
    genutet = wand[0] < b4[1][1]

    if name == "vorderansicht":
        blatt.mass((-W / 2, 0), (W / 2, 0), 14, fmt(W))                  # unten, Gesamtbreite
        blatt.kette([(-x, oben) for x in wand_x], 8)                      # oben, Sektionen + Wände
        blatt.kette([(W / 2, v) for v in hoehen], 10)                    # rechts im Bild = Beifahrerseite (R)
        blatt.mass((W / 2, 0), (W / 2, oben), 22, fmt(oben))
        if genutet:
            blatt.mass((W / 2, wand[0]), (W / 2, wand[1]), 32, f"Wand 302+2t = {fmt(wand[1] - wand[0])}")
        # Höhenkette in der Sektion (Fahrerseite = links im Bild): Sitz-Brett, Spalt, Kasten, Spalt
        c2, d2 = teil(teile, "C1")["box"], teil(teile, "D1")["box"]   # Sektion L = links im Bild
        uL = -W / 2
        blatt.mass((uL, c2[1][1]), (uL, c2[1][0]), 10, fmt(c2[1][1] - c2[1][0]))
        blatt.mass((uL, d2[1][1]), (uL, d2[1][0]), 10, fmt(d2[1][1] - d2[1][0]))
        blatt.text(f"Spalt je {fmt(d2[1][0] - c2[1][1])}", uL - 150, (c2[1][0] + c2[1][1]) / 2, 2.4)
        # Mitte im Bild: Kasten D3 / Spalt / Tisch-Brett C3
        d3, c3 = teil(teile, "D3")["box"], teil(teile, "C3")["box"]
        u = -(d3[0][0] + 40)
        blatt.masslinie((u, d3[1][0]), (u, d3[1][1]), f"D3 {fmt(d3[1][1] - d3[1][0])}")
        blatt.masslinie((u, c3[1][0]), (u, c3[1][1]), fmt(c3[1][1] - c3[1][0]))
        # Blendenhöhen
        d2f = teil(teile, "D1-F")["box"]
        u = -(d2f[0][0] + 30)
        blatt.masslinie((u, d2f[1][0]), (u, d2f[1][1]), f"Blende {fmt(d2f[1][1] - d2f[1][0])}")

    elif name == "draufsicht":
        blatt.mass((-W / 2, 0), (W / 2, 0), 16, fmt(W))
        blatt.kette([(-x, D) for x in wand_x], 8)
        tiefen = sorted({0, r_ende, b1[2][0], D})
        blatt.kette([(-W / 2, z) for z in reversed(tiefen)], 10)         # links im Bild = Fahrerseite
        blatt.mass((-W / 2, D), (-W / 2, 0), 20, fmt(D))
        r = teil(teile, "E-D1-b")["box"]
        u = -(r[0][0] - 25)
        blatt.masslinie((u, r[2][0]), (u, r[2][1]), f"Schiene {fmt(r[2][1] - r[2][0])}")

    elif name == "seitenansicht":
        blatt.mass((-D, 0), (0, 0), 14, fmt(D))                          # unten, Korpustiefe
        tiefen = sorted({0, r_ende, b1[2][0], D})
        blatt.kette([(-z, oben) for z in tiefen], 8)                      # oben: Schiene, Spiel, Rückwand
        blatt.kette([(0, v) for v in hoehen], 10)                         # rechts = Korpusfront
        blatt.mass((0, 0), (0, oben), 22, fmt(oben))
        if genutet:                                                    # links = Rückseite
            blatt.mass((-D, wand[1]), (-D, wand[0]), 10, f"Wand {fmt(wand[1] - wand[0])}, Nut t = {fmt(b4[1][1] - wand[0])} (6–9)")
        r = teil(teile, "E-C1-b")["box"]
        v = (r[1][0] + r[1][1]) / 2
        blatt.masslinie((-r[2][0], v), (-r[2][1], v), f"Schiene {fmt(r[2][1] - r[2][0])}")


# ── Teile-Beschriftung ───────────────────────────────────────────────────────
BESCHRIFTUNG = {
    "vorderansicht": ["B2-F", "B2-B", "B3-1", "B3-2", "B4", "A1", "C1", "C2", "C3", "D1-F", "D2-F", "D3-F"],
    "draufsicht": ["B1", "B2-F", "B2-B", "B3-1", "B3-2", "D1", "D2", "C3"],
    "seitenansicht": ["B2-F", "A1"],
}


def zeichne(variante, name, png=False):
    p = modell.lade_parameter()
    alle = modell.teile(p, variante)
    a = ANSICHTEN[name]
    teile = [t for t in alle if t["id"] not in a["ohne"] and t["gruppe"] != "scharnier"]
    ids = {t["id"] for t in teile}
    koll = [k for k in modell.kollisionen(alle) if k["a"] in ids and k["b"] in ids]

    # Bildausschnitt bestimmen und auf dem Blatt zentrieren (über der Legende)
    rechtecke = [rechteck_uv(t["box"], a["uv"]) for t in teile]
    u0, v0 = min(r[0] for r in rechtecke), min(r[1] for r in rechtecke)
    u1, v1 = max(r[2] for r in rechtecke), max(r[3] for r in rechtecke)
    mitte = (20 + (BLATT_B - 30) / 2 - (u0 + u1) / 2 * M, 60 + (BLATT_H - 100) / 2 - (v0 + v1) / 2 * M)
    blatt = Blatt(mitte)

    sichtbar, verdeckt = bd.Compound([solid(t) for t in teile]).project_to_viewport(
        a["kamera"], viewport_up=a["oben"], look_at=(0, 0, 0))
    blatt.kanten(verdeckt, "verdeckt")
    blatt.kanten(sichtbar, "sichtbar")
    for k in koll:
        if k["kategorie"] in a["zeige"] and not {k["a"], k["b"]} & a.get("ohne_koll_mit", set()):
            blatt.flaeche(*rechteck_uv(k["box"], a["uv"]), ebene="nut" if k["gewollt"] else "kollision")
    bemassen(name, blatt, alle, p)
    for id in BESCHRIFTUNG[name]:
        if id in ids:
            r = rechteck_uv(teil(alle, id)["box"], a["uv"])
            u, v = (r[0] + r[2]) / 2, (r[1] + r[3]) / 2
            if (r[2] - r[0]) < 60:                # schmale Wände: Beschriftung daneben
                v = r[1] - (30 if name == "vorderansicht" else 45)
            blatt.text(id, u, v, 2.8)
    blatt.rahmen(a["titel"], a["blick"], a["nr"], VARIANTEN[variante])
    blatt.legende(koll, a["zeige"])
    blatt.positionsliste([(id, teil(alle, id)["name"].split(" (")[0])
                          for id in BESCHRIFTUNG[name] if id in ids])

    ordner = ZIEL / variante
    ordner.mkdir(parents=True, exist_ok=True)
    pfad = ordner / f"{name}.svg"
    blatt.schreiben(pfad)
    if png:
        import cairosvg
        cairosvg.svg2png(url=str(pfad), write_to=str(pfad.with_suffix(".png")),
                         output_width=2400, background_color="white")
    return pfad, len(koll)


def main():
    png = "--png" in sys.argv
    for variante in VARIANTEN:
        for name in ANSICHTEN:
            pfad, n = zeichne(variante, name, png)
            print(f"{pfad.relative_to(ZIEL.parent.parent)}  ({n} Überschneidungen inkl. gewollter Nut/Falz)")


if __name__ == "__main__":
    main()

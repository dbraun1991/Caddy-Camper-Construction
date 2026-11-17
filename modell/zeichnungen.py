"""Werkzeichnungen (Draufsicht, Vorderansicht, Seitenansicht) aus dem gemeinsamen Teilemodell.

Baut jedes Teil aus modell.teile() als Volumenkörper in build123d auf, projiziert
orthogonal mit getrennten sichtbaren und verdeckten Kanten und schreibt je
Eckausbildung nach docs/zeichnungen/<variante>/: ein Übersichtsblatt „Bezeichnungen“
(alle Kürzel mit Langnamen und Isometrie), drei DIN-A3-Blätter im Maßstab 1:5, das
Zuschnittblatt „Box-Bretter“ (1:10) und drei Einzelbrett-Blätter (1:5), auf denen jeder
Zapfen, Schlitz und jede Aussparung zum Sägen bemaßt ist, dazu zwei Schubladenblätter (1:5,
Kastenbretter D1/D2 und D3 mit der Kontur der CNC-Dateien, bemaßt). Alle Blätter zusammen als
werkzeichnungen.pdf zum Drucken auf A3 (braucht cairosvg + pypdf).
Rechnerische Überschneidungen (modell.kollisionen) werden rot hinterlegt, gewollte
Überdeckungen (Zapfen steckt in Schlitz/Aussparung) grün.

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

VARIANTEN = {   # Boden B1 und Deckel T1 laufen immer durch (ADR 0018)
    "gezapft": "Boden- + Deckplatte durchlaufend, Wände gezapft",
    "stumpf": "Boden- + Deckplatte durchlaufend, Wände stumpf",
}

# Blickrichtung je Ansicht: Kamera-Position, Bild-oben, und dieselbe Abbildung
# Modell (x, y, z) → Bild (u, v) als Funktion, damit Maße und rote Flächen exakt
# auf den projizierten Kanten liegen.
ANSICHTEN = {
    "vorderansicht": dict(
        titel="Vorderansicht", nr=2,
        blick="Blick von der Heckklappe auf die offene Korpusfront (Fahrerseite links im Bild)",
        kamera=(0, 0, -20000), oben=(0, 1, 0), uv=lambda x, y, z: (-x, y),
        ohne={"F1", "F2", "G1"},
        # Rückwand-Kollisionen liegen 882–900 mm tief — frontal projiziert würden sie ganze Schubladen rot färben
        zeige={"zapfen", "eckverbindung", "sonstige"},
        # der hintere M1/M2-Zapfen in der Rückwand läge frontal mitten auf der Trennwand
        ohne_koll_mit={"R1"}),
    "draufsicht": dict(
        titel="Draufsicht", nr=3,
        blick="Blick von oben, Deckplatte (T1) abgenommen — Korpusfront (Heckklappe) unten im Bild",
        kamera=(0, 20000, 0), oben=(0, 0, 1), uv=lambda x, y, z: (-x, z),
        ohne={"T1", "F1", "F2", "G1"}, zeige=set(modell.KATEGORIEN)),
    "seitenansicht": dict(
        titel="Seitenansicht", nr=4,
        blick="Blick von der Fahrerseite (+x) — Korpusfront (Heckklappe) rechts im Bild",
        kamera=(20000, 0, 0), oben=(0, 1, 0), uv=lambda x, y, z: (-z, y),
        ohne={"F1", "F2", "G1"}, zeige=set(modell.KATEGORIEN)),
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

    def __init__(self, mitte, massstab=M):
        self.mitte = mitte                     # Papierposition des Modell-Ursprungs (u=0, v=0)
        self.m = massstab                      # mm Modell → mm Papier
        self.ebenen = {n: [] for n in ("rahmen", "abfall", "verdeckt", "sichtbar", "kontur", "zapfen", "kollision",
                                       "mass", "text")}
        self.draft = bd.Draft(font_size=3.0, font=SCHRIFT, decimal_precision=0, display_units=False,
                              arrow_length=2.2, line_width=0.18, pad_around_text=1.0, extension_gap=1.0)

    def p(self, u, v):                         # Modell (u, v) → Papier
        return (self.mitte[0] + u * self.m, self.mitte[1] + v * self.m, 0)

    def kanten(self, kanten, ebene):
        verschiebung = bd.Location((self.mitte[0], self.mitte[1], 0))
        self.ebenen[ebene] += [verschiebung * e.scale(self.m) for e in kanten]

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
            if laenge < 0.01:                     # doppelter Punkt in der Kette
                continue
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

    def rechteck(self, u0, v0, u1, v1, ebene="sichtbar"):
        a, b, c, d = self.p(u0, v0), self.p(u1, v0), self.p(u1, v1), self.p(u0, v1)
        self.ebenen[ebene].append(bd.Polyline(a, b, c, d, a))

    def rahmen(self, titel, untertitel, nummer, variante, massstab="1:5 (DIN A3)"):
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
            (x0 + 2, 43, "Benennung", titel, min(4.2, 88 / max(len(titel), 1))), (x0 + 62, 43, "Projekt", "VW Caddy Mk3 Camper — Unterbau", 3.0),
            (x0 + 2, 31, "Maßstab", massstab, 3.0), (x0 + 62, 31, "Eckausbildung", variante, 2.6),
            (x0 + 2, 19, "Blatt", f"{nummer} von {BLATT_GESAMT}", 3.0), (x0 + 62, 19, "Stand", date.today().isoformat(), 3.0),
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
        self.ebenen["zapfen"].append(bd.Pos(x + 6, y - 15) * bd.Rectangle(12, 3))
        self.text("gewollte Überdeckung: Zapfen in Schlitz/Aussparung", x + 15, y - 15, 2.6, papier=True, ausrichtung=links)
        y -= 5
        zaehler = {}
        for k in kollisionen:
            zaehler[k["kategorie"]] = zaehler.get(k["kategorie"], 0) + 1
        zeilen = [f"{n} × {modell.KATEGORIEN[k]}" + ("" if k in zeige else " — hier nicht dargestellt, siehe Draufsicht/Seitenansicht")
                  for k, n in zaehler.items()] or ["keine Überschneidungen"]
        for i, z in enumerate(zeilen):
            self.text(z, x + 15, y - 16 - i * 4.2, 2.4, papier=True, ausrichtung=links)
        self.text("Schlafmodus (alles eingefahren) · Klappbrett Rücksitz (F1) / Kopfende (F2), Scharniere und Matratze nicht dargestellt",
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
        svg.add_layer("abfall", line_weight=0.05, fill_color=(0.78, 0.78, 0.78), line_color=(0.6, 0.6, 0.6))
        svg.add_layer("zapfen", line_weight=0.1, fill_color=(0.2, 0.65, 0.3, 0.55), line_color=(0.1, 0.45, 0.2))
        svg.add_layer("kollision", line_weight=0.1, fill_color=(0.9, 0.16, 0.16, 0.45), line_color=(0.78, 0.0, 0.0))
        svg.add_layer("verdeckt", line_weight=0.18, fill_color=None, line_color=(0.43, 0.43, 0.43),
                      line_type=bd.LineType.ISO_DASH)
        svg.add_layer("sichtbar", line_weight=0.35, fill_color=None, line_color=(0.0, 0.0, 0.0))
        svg.add_layer("kontur", line_weight=0.5, fill_color=None, line_color=(0.0, 0.0, 0.0))
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


def langname(teile, id):
    """Langname ohne Klammerzusatz, z. B. „Seitenwand links“ für S1."""
    return teil(teile, id)["name"].split(" (")[0]


def bemassen(name, blatt, teile, p):
    k = p["korpus"]
    W, D = k["breite"], k["tiefe"]
    t1 = teil(teile, "T1")["box"]
    oben = t1[1][1]                                       # Oberkante Deckel
    b1 = teil(teile, "B1")["box"]
    r1 = teil(teile, "R1")["box"]
    wand_x = sorted({v for id in ("S1", "S2", "M1", "M2") for v in teil(teile, id)["box"][0]})
    hoehen = sorted({0, b1[1][1], t1[1][0], oben})
    r_ende = teil(teile, "E-C1-a")["box"][2][1]          # hinteres Schienenende
    zuschnitt = teil(teile, "S1").get("zuschnitt")      # nur bei Zapfen: [Länge, Höhe] des Rohzuschnitts

    if name == "vorderansicht":
        blatt.mass((-W / 2, 0), (W / 2, 0), 14, fmt(W))                  # unten, Gesamtbreite
        blatt.kette([(-x, oben) for x in wand_x], 8)                      # oben, Sektionen + Wände
        blatt.kette([(W / 2, v) for v in hoehen], 10)                    # rechts im Bild = Beifahrerseite (R)
        blatt.mass((W / 2, 0), (W / 2, oben), 22, fmt(oben))
        if zuschnitt:
            blatt.mass((W / 2, 0), (W / 2, oben), 32, f"Wand mit Zapfen, Zuschnitt {fmt(zuschnitt[1])}")
        # Höhenkette in der Sektion (Fahrerseite = links im Bild): Sitz-Brett, Spalt, Kasten, Spalt
        c2, d2 = teil(teile, "C1")["box"], teil(teile, "D1")["box"]   # Sektion L = links im Bild
        uL = -W / 2
        blatt.mass((uL, c2[1][1]), (uL, c2[1][0]), 10, fmt(c2[1][1] - c2[1][0]))
        blatt.mass((uL, d2[1][1]), (uL, d2[1][0]), 10, fmt(d2[1][1] - d2[1][0]))
        blatt.text(f"Spalt je {fmt(d2[1][0] - c2[1][1])}", uL - 200, (c2[1][0] + c2[1][1]) / 2, 2.4)
        wange = teil(teile, "C1-Wa")["box"]
        blatt.mass((uL, c2[1][1]), (uL, wange[1][0]), 20, " ")       # zu kurz für die Zahl: Text daneben
        blatt.text(f"C1/C2 mit Wangen {fmt(c2[1][1] - wange[1][0])}", uL - 200, wange[1][0] - 12, 2.4)
        # Mitte im Bild: Kasten D3 / Spalt / Tisch-Brett C3
        d3, c3 = teil(teile, "D3")["box"], teil(teile, "C3")["box"]
        u = -(d3[0][0] + 40)
        blatt.masslinie((u, d3[1][0]), (u, d3[1][1]), f"Schubladenkasten (D3) {fmt(d3[1][1] - d3[1][0])}")
        blatt.masslinie((u, c3[1][0]), (u, c3[1][1]), fmt(c3[1][1] - c3[1][0]))
        # Gesamtbreiten der Bretter (mit Wangen) und Schubladenkästen, im Bild zwischen den Wangen bzw. oben im Kasten
        for id in ("C1", "C2", "C3"):
            (x0, x1), _, _ = teil(teile, id)["box"]
            w = teil(teile, f"{id}-Wa")["box"][1]
            blatt.masslinie((-x1, (w[0] + w[1]) / 2), (-x0, (w[0] + w[1]) / 2), f"{id} Breite {fmt(x1 - x0)}")
        for id in ("D1", "D2", "D3"):
            (x0, x1), (y0, y1), _ = teil(teile, id)["box"]
            blatt.masslinie((-x1, y1 - 30), (-x0, y1 - 30), f"{id} Breite {fmt(x1 - x0)}")

    elif name == "draufsicht":
        blatt.mass((-W / 2, 0), (W / 2, 0), 16, fmt(W))
        blatt.kette([(-x, D) for x in wand_x], 8)
        tiefen = sorted({0, r_ende, r1[2][0], D})
        blatt.kette([(-W / 2, z) for z in reversed(tiefen)], 10)         # links im Bild = Fahrerseite
        blatt.mass((-W / 2, D), (-W / 2, 0), 20, fmt(D))
        r = teil(teile, "E-D1-b")["box"]
        u = -(r[0][0] - 25)
        blatt.masslinie((u, r[2][0]), (u, r[2][1]), f"Schiene {fmt(r[2][1] - r[2][0])}")
        # Gesamtlängen rechts neben der Zeichnung: Schubladenkästen (D1–D3) und Sitz-/Tischbretter (C1–C3)
        _, _, (z0, z1) = teil(teile, "D1")["box"]
        blatt.mass((W / 2, z0), (W / 2, z1), 10, f"Schubladen D1–D3 {fmt(z1 - z0)}")
        _, _, (z0, z1) = teil(teile, "C3")["box"]
        blatt.mass((W / 2, z0), (W / 2, z1), 20, f"Bretter C1–C3 {fmt(z1 - z0)}")

    elif name == "seitenansicht":
        blatt.mass((-D, 0), (0, 0), 14, fmt(D))                          # unten, Korpustiefe
        tiefen = sorted({0, r_ende, r1[2][0], D})
        blatt.kette([(-z, oben) for z in tiefen], 8)                      # oben: Schiene, Spiel, Rückwand
        blatt.kette([(0, v) for v in hoehen], 10)                         # rechts = Korpusfront
        blatt.mass((0, 0), (0, oben), 22, fmt(oben))
        if zuschnitt:                                                  # links = Rückseite
            blatt.mass((-D, oben), (-D, 0), 10, f"Wand mit Zapfen, Zuschnitt {fmt(zuschnitt[1])}")
        r = teil(teile, "E-C1-b")["box"]
        v = (r[1][0] + r[1][1]) / 2
        blatt.masslinie((-r[2][0], v), (-r[2][1], v), f"Schiene {fmt(r[2][1] - r[2][0])}")


# ── Teile-Beschriftung ───────────────────────────────────────────────────────
BESCHRIFTUNG = {
    "vorderansicht": ["S1", "S2", "M1", "M2", "B1", "T1", "C1", "C2", "C3", "D1", "D2", "D3"],
    "draufsicht": ["R1", "S1", "S2", "M1", "M2", "D1", "D2", "C3"],
    "seitenansicht": ["S1", "T1"],
}
# Beschriftung seitlich verschieben (Modell-mm in u), wo sie sonst auf einem Zapfen läge
BESCHRIFTUNG_VERSATZ = {("seitenansicht", "T1"): -180}


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
            blatt.flaeche(*rechteck_uv(k["box"], a["uv"]), ebene="zapfen" if k["gewollt"] else "kollision")
    bemassen(name, blatt, alle, p)
    for id in BESCHRIFTUNG[name]:
        if id in ids:
            r = rechteck_uv(teil(alle, id)["box"], a["uv"])
            u, v = (r[0] + r[2]) / 2 + BESCHRIFTUNG_VERSATZ.get((name, id), 0), (r[1] + r[3]) / 2
            ausrichtung = (bd.TextAlign.CENTER, bd.TextAlign.CENTER)
            if (r[2] - r[0]) < 60:                # schmale Wände: Beschriftung darunter
                v = r[1] - (30 if name == "vorderansicht" else 45)
                # Außenwände nach innen ausrichten, sonst kreuzt der Text die Maßhilfslinie am Rand
                if r[0] <= u0:
                    u, ausrichtung = r[2], (bd.TextAlign.LEFT, bd.TextAlign.CENTER)
                elif r[2] >= u1:
                    u, ausrichtung = r[0], (bd.TextAlign.RIGHT, bd.TextAlign.CENTER)
            blatt.text(f"{id} {langname(alle, id)}", u, v, 2.8, ausrichtung=ausrichtung)
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


# ── Blatt 4: Box-Bretter (Zuschnitt) ────────────────────────────────────────
# Jede Platte flach, einzeln, im Maßstab 1:10; gleiche Teile (S1/S2, M1/M2)
# einmal mit Stückzahl. Lage auf dem Blatt in Papier-mm (linke untere Ecke).
BRETTER = [  # (Kürzel, weitere gleiche Kürzel, Ansicht, x, y) — Ansicht: "oben" = Fläche x×z, "x" = x×y, "z" = z×y
    ("B1", [], "oben", 34, 162), ("T1", [], "oben", 164, 162),
    ("S1", ["S2"], "z", 294, 214), ("R1", [], "x", 294, 162),
    ("F1", [], "oben", 34, 66), ("F2", [], "oben", 164, 66), ("M1", ["M2"], "z", 294, 66),
]
M_BRETTER = 1 / 10


def zeichne_bretter(variante, png=False):
    p = modell.lade_parameter()
    alle = modell.teile(p, variante)
    xa = p["korpus"]["breite"] / 2
    blatt = Blatt((0, 0), M_BRETTER)
    zeilen = []

    for id, gleiche, ansicht, x, y in BRETTER:
        t = teil(alle, id)
        (x0, x1), (y0, y1), (z0, z1) = t["box"]
        breite, hoehe, staerke = {"oben": (x1 - x0, z1 - z0, y1 - y0),
                                  "x": (x1 - x0, y1 - y0, z1 - z0),
                                  "z": (z1 - z0, y1 - y0, x1 - x0)}[ansicht]
        if "zuschnitt" in t:                    # Wand mit Zapfen: Rohmaß statt Wandkörper
            breite, hoehe = t["zuschnitt"]
        stk = 1 + len(gleiche)
        blatt.mitte = (x, y)
        blatt.rechteck(0, 0, breite, hoehe)
        blatt.mass((0, 0), (breite, 0), 7, fmt(breite))                 # unten
        blatt.mass((0, hoehe), (0, 0), 7, fmt(hoehe))                   # links
        name = t["name"].split(" (")[0]
        if gleiche:
            name = " / ".join(teil(alle, i)["name"].split(" (")[0] for i in [id] + gleiche)
            name = name.replace("Seitenwand links / Seitenwand rechts", "Seitenwand links / rechts") \
                       .replace("Trennwand links / Trennwand rechts", "Trennwand links / rechts")
        kuerzel = " / ".join([id] + gleiche)
        mitte_v = hoehe / 2
        blatt.text(kuerzel, breite / 2, mitte_v + 0.45 / M_BRETTER * 10, 3.0)
        blatt.text(name, breite / 2, mitte_v, 2.4)
        blatt.text(f"{stk} Stk. · {fmt(staerke)} mm", breite / 2, mitte_v - 0.45 / M_BRETTER * 10, 2.2)

        # Schlitze/Aussparungen in Boden- und Deckplatte: Fußabdruck jedes Zapfens, der darin steckt
        if ansicht == "oben" and id in ("B1", "T1"):
            zapfen = [w for w in alle if id in w.get("steckt_in", [])]
            for w in zapfen:
                (wx0, wx1), _, (wz0, wz1) = w["box"]
                blatt.rechteck(x1 - wx1, wz0 - z0, x1 - wx0, wz1 - z0, "verdeckt")
            if zapfen:
                blatt.text("Schlitze + Aussparungen 18 × 50, ganz durch", breite / 2, hoehe * 0.2, 2.2)

        # Wände: fertige Kontur gestrichelt im Rohzuschnitt. Rand = Schleifzugabe an Ober-/Unterkante
        if "zuschnitt" in t:
            zug = p["zapfen"]["schleifzugabe"]
            lage = (lambda b: (b[2][0], b[1][0] + zug, b[2][1], b[1][1] + zug)) if ansicht == "z" else \
                   (lambda b: (b[0][0] - x0, b[1][0] + zug, b[0][1] - x0, b[1][1] + zug))
            blatt.rechteck(*lage(t["box"]), "verdeckt")
            eigene = [w for w in alle if w.get("zapfen_von") == id]
            for w in eigene:
                blatt.rechteck(*lage(w["box"]), "verdeckt")
            if ansicht == "z":
                starts = sorted({w["box"][2][0] for w in eigene if w["id"].endswith("u")})
                wort = f"Zapfen je 50, ab Vorderkante {' · '.join(fmt(s) for s in starts)}"
                if id.startswith("M"):
                    wort += " + hinten mittig"
            else:
                starts = sorted({w["box"][0][0] - x0 for w in eigene if w["id"].endswith("u")})
                wort = f"Zapfen je 50, ab linker Kante {' · '.join(fmt(s) for s in starts)}"
                for w in (w for w in alle if id in w.get("steckt_in", [])):   # Schlitze für die M1/M2-Zapfen
                    blatt.rechteck(*lage(w["box"]), "verdeckt")
                wort += " + 2 Schlitze für Trennwände (M1/M2)"
            blatt.text(wort, breite / 2, hoehe + 30, 2.0)
        zeilen.append((kuerzel, name, f"{fmt(breite)} × {fmt(hoehe)}", fmt(staerke), stk))

    blatt.rahmen("Box-Bretter", "Zuschnitt aller Platten der Box und der Liegefläche — Birke-Multiplex, "
                 "jede Platte einzeln, Fahrerseite links", len(ANSICHTEN) + 2, VARIANTEN[variante],
                 massstab="1:10 (DIN A3)")

    # Legende + Zuschnittliste unten
    links = (bd.TextAlign.LEFT, bd.TextAlign.CENTER)
    blatt.linie((25, 46), (37, 46), ebene="sichtbar")
    blatt.text("Plattenkante (Zuschnitt)", 40, 46, 2.6, papier=True, ausrichtung=links)
    if variante == "gezapft":
        blatt.linie((25, 41), (37, 41), ebene="verdeckt")
        blatt.text("Zapfen, Schlitze, Aussparungen — selbst sägen", 40, 41, 2.6, papier=True, ausrichtung=links)
        blatt.text("Wandhöhe 340 = 302 + 2 × 19 mm Zapfen (1 mm Schleifzugabe je Kante).", 25, 34, 2.2, papier=True, ausrichtung=links)
        blatt.text("Absatz an Trennwand (M1/M2) hinten genau 882 ab Vorderkante.", 25, 30, 2.2, papier=True, ausrichtung=links)
        blatt.text(f"Alle Zapfen, Schlitze und Aussparungen bemaßt: Blätter {len(ANSICHTEN) + 3}–{BLATT_ELEMENTE} (1:5).",
                   25, 26, 2.2, papier=True, ausrichtung=links)
    blatt.text(f"Ohne Schubladen und Sitz-/Tischbretter — die kommen gefräst, bemaßt auf den Blättern "
               f"{BLATT_ELEMENTE - len(SCHUBLADENBLAETTER)}–{BLATT_ELEMENTE}. Lüftungslöcher: Blätter "
               f"{BLATT_GESAMT - 1}–{BLATT_GESAMT}.",
               25, 14, 2.2, papier=True, ausrichtung=links)
    x0, y0 = 120, 46
    for x, kopf in ((x0, "Pos."), (x0 + 22, "Langname"), (x0 + 72, "Maß"), (x0 + 96, "mm"), (x0 + 104, "Stk.")):
        blatt.text(kopf, x, y0, 2.4, papier=True, ausrichtung=links)
    for i, (k, n, mass, st, stk) in enumerate(zeilen):
        y = y0 - 4.5 - i * 3.9
        for x, v in ((x0, k), (x0 + 22, n), (x0 + 72, mass), (x0 + 96, st), (x0 + 104, str(stk))):
            blatt.text(v, x, y, 2.1, papier=True, ausrichtung=links)

    ordner = ZIEL / variante
    ordner.mkdir(parents=True, exist_ok=True)
    pfad = ordner / "box-bretter.svg"
    blatt.schreiben(pfad)
    if png:
        import cairosvg
        cairosvg.svg2png(url=str(pfad), write_to=str(pfad.with_suffix(".png")),
                         output_width=2400, background_color="white")
    return pfad


# ── Blätter 5–7: Einzelbretter mit Bemaßung aller Zapfen, Schlitze, Aussparungen ──
# Jede Platte in ihrer eigenen Ebene (u, v) in mm, Ursprung links unten an der gelieferten Plattenkante.
DETAILBLAETTER = [  # (Dateiname, Titel, [(Kürzel, gleiche Kürzel, Ansicht, Papier-x, Papier-y)])
    ("brett-b1-t1", "Bodenplatte B1 / Deckplatte T1", [("B1", ["T1"], "oben", 55, 60)]),
    ("brett-s-m", "Seitenwände S1/S2 + Trennwände M1/M2", [("S1", ["S2"], "z", 50, 178), ("M1", ["M2"], "z", 50, 66)]),
    ("brett-r1", "Rückwand R1", [("R1", [], "x", 50, 150)]),
]
# Schubladenkästen (ADR 0024): je Kastentyp ein Blatt mit allen vier Brettern, Geometrie = CNC-DXF
SCHUBLADENBLAETTER = [  # (Dateiname, Titel, Kasten)
    ("schublade-d1-d2", "Schublade links / rechts (D1 / D2)", "D1"),
    ("schublade-d3", "Schublade Mitte (D3)", "D3"),
]
ELEMENTBLATT = ("elemente-c1-c3", "Sitz-/Tischbretter C1–C3")   # Bretter + Wangen zum Nachmessen (ADR 0029/0031)
BOHRPLAN = ("bohrplan-liegeflaeche", "Bohrplan Liegefläche T1 / F1 / F2")   # Lüftungslöcher von Hand (ADR 0035)
BOHRPLAN_RAND = ("bohrplan-randmasse", "Bohrplan Liegefläche — Randmaße")    # Schräglinien ab Brettkante
BLATT_GESAMT = 1 + len(ANSICHTEN) + 1 + len(DETAILBLAETTER) + len(SCHUBLADENBLAETTER) + 1 + 2   # Blatt 1 = „Bezeichnungen“
BLATT_ELEMENTE = BLATT_GESAMT - 2                                    # die letzten zwei = Bohrplan


def brett_geometrie(alle, p, id, ansicht):
    """Rohzuschnitt, fertige Kontur und Ausschnitte einer Platte in ihrer Ebene (u, v).

    Liefert (breite, hoehe, behalten, loecher, eigene_zapfen): Rechtecke (u0, v0, u1, v1).
    Wände: Körper + eigene Zapfen (unten/oben mit Schleifzugabe bis zur Plattenkante).
    Löcher: Fußabdruck jedes fremden Zapfens, der in dieser Platte steckt.
    """
    t = teil(alle, id)
    (x0, x1), (y0, y1), (z0, z1) = t["box"]
    zug = p["zapfen"]["schleifzugabe"] if "zuschnitt" in t else 0
    if ansicht == "oben":
        breite, hoehe = x1 - x0, z1 - z0
        lage = lambda b: (x1 - b[0][1], b[2][0] - z0, x1 - b[0][0], b[2][1] - z0)   # Fahrerseite (+x) links
    else:
        breite, hoehe = (z1 - z0, y1 - y0) if ansicht == "z" else (x1 - x0, y1 - y0)
        if "zuschnitt" in t:
            breite, hoehe = t["zuschnitt"]
        rand = (breite - ((z1 - z0) if ansicht == "z" else (x1 - x0))) / 2 if ansicht == "x" else 0
        unten = y0 - (hoehe - (y1 - y0)) / 2                # Modell-y der gelieferten Unterkante (−1 bei Zapfen)
        if ansicht == "z":
            lage = lambda b: (b[2][0] - z0, b[1][0] - unten, b[2][1] - z0, b[1][1] - unten)
        else:
            lage = lambda b: (b[0][0] - x0 + rand, b[1][0] - unten, b[0][1] - x0 + rand, b[1][1] - unten)
    behalten = [lage(t["box"])]
    zapfen = []
    for w in (w for w in alle if w.get("zapfen_von") == id):
        u0, v0, u1, v1 = lage(w["box"])
        if w["id"].endswith("u"):
            v0 -= zug
        elif w["id"].endswith("o"):
            v1 += zug
        zapfen.append((u0, v0, u1, v1))
    loecher = [lage(w["box"]) for w in alle if id in w.get("steckt_in", [])]
    if ansicht == "oben":
        behalten = [(0, 0, breite, hoehe)]
    return breite, hoehe, behalten + zapfen, loecher, zapfen


def _rechteck(blatt, u0, v0, u1, v1):
    """Rechteck in Modell-mm (u, v) direkt in Papier-Koordinaten (Skalieren verschiebt sonst nicht mit)."""
    (x0, y0, _), (x1, y1, _) = blatt.p(u0, v0), blatt.p(u1, v1)
    return bd.Pos(x0, y0) * bd.Rectangle(x1 - x0, y1 - y0, align=(bd.Align.MIN, bd.Align.MIN))


def zeichne_brett(blatt, alle, p, id, gleiche, ansicht):
    breite, hoehe, behalten, loecher, zapfen = brett_geometrie(alle, p, id, ansicht)
    roh = _rechteck(blatt, 0, 0, breite, hoehe)
    fertig = _rechteck(blatt, *behalten[0])
    for r in behalten[1:]:
        fertig = fertig + _rechteck(blatt, *r)
    for r in loecher:
        fertig = fertig - _rechteck(blatt, *r)
    abfall = roh - fertig
    blatt.ebenen["abfall"] += list(abfall.faces())
    blatt.rechteck(0, 0, breite, hoehe, "verdeckt")                 # gelieferte Plattenkante
    blatt.ebenen["kontur"] += list(fertig.edges())

    t = teil(alle, id)
    stk = 1 + len(gleiche)
    namen = [teil(alle, i)["name"].split(" (")[0] for i in [id] + gleiche]
    name = namen[0] if len(set(namen)) == 1 else " / ".join(namen)
    name = name.replace("Seitenwand links / Seitenwand rechts", "Seitenwand links / rechts") \
               .replace("Trennwand links / Trennwand rechts", "Trennwand links / rechts")
    links = (bd.TextAlign.LEFT, bd.TextAlign.CENTER)
    x, y = blatt.mitte
    staerke = t["box"][1][1] - t["box"][1][0] if ansicht == "oben" else \
        (t["box"][0][1] - t["box"][0][0] if ansicht == "z" else t["box"][2][1] - t["box"][2][0])
    beschriftung = (f"{' / '.join([id] + gleiche)}  ·  {name}  ·  {stk} Stk.  ·  "
                    f"Rohmaß {fmt(breite)} × {fmt(hoehe)} × {fmt(staerke)}")
    if ansicht == "oben":                                          # über dem Brett ist kein Platz (Maßketten)
        blatt.text(beschriftung.replace("  ·  Rohmaß", "\nRohmaß"), 312, 264, 3.0, papier=True, ausrichtung=links)
    else:
        oben_kette = loecher or behalten[0][2] < breite             # R1 Schlitze, M1/M2 Absatz: Kette über dem Brett
        abstand = (28 if oben_kette else 16) if zapfen else 6     # darunter das Gesamtmaß (nur mit Zapfen)
        blatt.text(beschriftung, x, y + hoehe * blatt.m + abstand, 3.0, papier=True, ausrichtung=links)

    unten = sorted({z for r in zapfen if r[1] == 0 for z in (r[0], r[2])})
    if ansicht == "oben" and not loecher:                          # stumpf: nur Rohmaß
        blatt.mass((0, 0), (breite, 0), 8, fmt(breite))
        blatt.mass((0, hoehe), (0, 0), 10, fmt(hoehe))
        return
    if ansicht == "oben":
        # oben (Hinterkante): Aussparungen für R1 · zweite Kette: Schlitze für M1/M2
        hinten = sorted({u for r in loecher if r[3] == hoehe for u in (r[0], r[2])})
        mitte = sorted({u for r in loecher if 0 < r[0] and r[2] < breite and r[3] < hoehe for u in (r[0], r[2])})
        blatt.kette([(u, hoehe) for u in reversed([0] + hinten + [breite])], 8)
        blatt.kette([(u, hoehe) for u in reversed([0] + mitte + [breite])], 21)
        # links (Fahrerseite): Aussparungen für S1/S2 · rechts: Schlitze für M1/M2 + Aussparungstiefe für R1
        seite = sorted({v for r in loecher if r[0] == 0 for v in (r[1], r[3])})
        schlitz = sorted({v for r in loecher if 0 < r[0] and r[2] < breite for v in (r[1], r[3])} |
                         {r[1] for r in loecher if r[3] == hoehe})
        blatt.kette([(0, v) for v in reversed([0] + seite + [hoehe])], 10)
        blatt.kette([(breite, v) for v in [0] + schlitz + [hoehe]], 10)
        tiefe = min(r[2] - r[0] for r in loecher if r[0] == 0)
        lage_s = next(r for r in loecher if r[0] == 0)
        blatt.text(f"Aussparungen {fmt(tiefe)} tief", lage_s[2] + 10, (lage_s[1] + lage_s[3]) / 2, 2.4,
                   ausrichtung=(bd.TextAlign.LEFT, bd.TextAlign.CENTER))
        # Gesamtmaße der Platte zusätzlich zu den Ketten
        blatt.mass((0, 0), (breite, 0), 11, f"{fmt(breite)} gesamt")
        blatt.mass((0, hoehe), (0, 0), 22, f"{fmt(hoehe)} gesamt")
        return
    # Wände: unten Zapfenkette (oben gleich), rechts Höhen
    blatt.kette([(u, 0) for u in [0] + unten + [breite]], 8)
    hoehen = {0, hoehe} | {v for r in behalten[:1] for v in (r[1], r[3])}
    hoehen |= {v for r in zapfen if r[2] == breite and 0 < r[1] for v in (r[1], r[3])}   # hinterer M1/M2-Zapfen
    blatt.kette([(breite, v) for v in sorted(hoehen)], 10)
    if behalten[0][2] < breite:                                    # M1/M2: Absatz vor dem hinteren Zapfen
        blatt.kette([(u, hoehe) for u in (breite, behalten[0][2], 0)], 8)
    if loecher:                                                    # R1: Schlitze für die M1/M2-Zapfen
        quer = sorted({u for r in loecher for u in (r[0], r[2])})
        blatt.kette([(u, hoehe) for u in reversed([0] + quer + [breite])], 8)
        hoch = sorted({v for r in loecher for v in (r[1], r[3])})
        blatt.kette([(0, v) for v in reversed([0] + hoch + [hoehe])], 10)
    if zapfen:                                                     # Gesamtmaße der Platte zusätzlich zu den Ketten
        oben_kette = loecher or behalten[0][2] < breite
        blatt.mass((breite, hoehe), (0, hoehe), 20 if oben_kette else 8, f"{fmt(breite)} gesamt")
        blatt.mass((breite, 0), (breite, hoehe), 24, f"{fmt(hoehe)} gesamt")


def zeichne_detail(variante, datei, titel, bretter, nr, png=False):
    p = modell.lade_parameter()
    alle = modell.teile(p, variante)
    blatt = Blatt((0, 0))
    for id, gleiche, ansicht, x, y in bretter:
        blatt.mitte = (x, y)
        zeichne_brett(blatt, alle, p, id, gleiche, ansicht)

    gezapft = any(w.get("zapfen_von") and w["gruppe"] == "korpus" for w in alle)   # Wangenzapfen C1–C3 zählen nicht
    untertitel = ("Einzelbrett zum Sägen: jeder Zapfen, Schlitz und jede Aussparung bemaßt"
                  if gezapft else "Einzelbrett — in dieser Eckausbildung ohne Zapfen")
    blatt.rahmen(titel, untertitel, nr, VARIANTEN[variante])

    links = (bd.TextAlign.LEFT, bd.TextAlign.CENTER)
    blatt.linie((25, 46), (37, 46), ebene="kontur")
    blatt.text("fertige Kontur = Sägelinie", 40, 46, 2.6, papier=True, ausrichtung=links)
    blatt.linie((25, 41), (37, 41), ebene="verdeckt")
    blatt.text("gelieferte Plattenkante (Rohzuschnitt)", 40, 41, 2.6, papier=True, ausrichtung=links)
    blatt.ebenen["abfall"].append(bd.Pos(31, 36) * bd.Rectangle(12, 3))
    blatt.text("Abfall: wegsägen bzw. ausschneiden", 40, 36, 2.6, papier=True, ausrichtung=links)

    z = p["zapfen"]
    hinweise = {
        "brett-b1-t1": [
            "Bodenplatte (B1) und Deckplatte (T1) sind gleich:",
            "dieselbe Zeichnung gilt für beide. Blick von oben,",
            "Fahrerseite links, Heckklappe (Vorderkante) unten.",
            "",
            f"Seitlich: Aussparungen {fmt(z['laenge'])} × 18 für Seitenwände (S1/S2),",
            "offen zum Rand.",
            f"Hinten: Aussparungen {fmt(z['laenge'])} × 18 für Rückwand (R1), offen.",
            f"Innen: Schlitze 18 × {fmt(z['laenge'])} für Trennwände (M1/M2),",
            "geschlossen.",
            "Alles ganz durch die 18-mm-Platte.",
            "",
            "Schlitze: in den Ecken vorbohren (≥ 8 mm),",
            "mit der Stichsäge aussägen, auf Linie feilen.",
            "Lieber knapp sägen und nachpassen.",
            "",
            "Deckplatte (T1): Klappscharniere (V17) bei",
            "x = 0 und ± 410 liegen zwischen den",
            "Aussparungen für die Rückwand (R1).",
        ],
        "brett-s-m": [
            "Zapfen oben und unten an denselben Stellen",
            "(Maßkette unten gilt für beide Kanten).",
            f"Zapfenlänge 19 = 18 Plattenstärke + {fmt(z['schleifzugabe'])} mm",
            "Schleifzugabe; nach dem Verleimen bündig",
            "schleifen.",
            "",
            "Maße ab Vorderkante (Heckklappe, links).",
            "",
            "Trennwand (M1/M2) hinten: Absatz genau bei 882,",
            "dahinter nur der mittige Zapfen in die",
            "Rückwand (R1), ohne Schleifzugabe.",
            "",
            "Schnitte zwischen den Zapfen mit der",
            "Stichsäge, an Zapfen auf Linie feilen.",
        ],
        "brett-r1": [
            "Zapfen oben und unten an denselben Stellen",
            "(Maßkette unten gilt für beide Kanten).",
            f"Zapfenlänge 19 = 18 + {fmt(z['schleifzugabe'])} mm Schleifzugabe.",
            "",
            "Zwei Schlitze 18 × 50 für die hinteren Zapfen",
            "der Trennwände (M1/M2), ganz durch",
            "(Kette oben + links).",
            "",
            "Symmetrisch — von welcher Seite gemessen",
            "wird, ist egal.",
            "",
            "Zapfenlage weicht den Klappscharnieren (V17)",
            "auf der Deckplatte (T1) aus (ADR 0020).",
        ],
    }[datei] if gezapft else ["Ohne Zapfen: Platte nur auf Rohmaß zuschneiden."]
    hx = 312 if datei == "brett-b1-t1" else 300
    for i, zeile in enumerate(hinweise):
        blatt.text(zeile, hx, 255 - i * 5, 2.6, papier=True, ausrichtung=links)

    ordner = ZIEL / variante
    ordner.mkdir(parents=True, exist_ok=True)
    pfad = ordner / f"{datei}.svg"
    blatt.schreiben(pfad)
    if png:
        import cairosvg
        cairosvg.svg2png(url=str(pfad), write_to=str(pfad.with_suffix(".png")),
                         output_width=2400, background_color="white")
    return pfad


# ── Schubladenblätter: Bretter der Kästen D1–D3 flach, 1:5 ─────────────────────
def _schubladen_flaeche(blatt, b, tauschen=False):
    """Fertige Kontur eines Kastenbretts — wie die DXF, aber ohne Dogbones und Passungsluft — direkt in
    Papier-Koordinaten (blatt.p; Skalieren verschiebt Lagen sonst nicht mit).
    tauschen: u und v vertauschen (Boden liegend statt stehend gezeichnet)."""
    m = blatt.m

    def t(r):
        return (r[1], r[0], r[3], r[2]) + tuple(r[4:]) if tauschen else tuple(r)

    def rechteck(u0, v0, u1, v1):
        return _rechteck(blatt, u0, v0, u1, v1)

    def pos(u, v):
        return bd.Pos(*blatt.p(u, v)[:2])
    form = None
    for r in b["behalten"]:
        form = rechteck(*t(r)) if form is None else form + rechteck(*t(r))
    for r in b["loecher"]:
        form = form - rechteck(*t(r))
    for r in b["fenster"] + b.get("griff", []):
        u0, v0, u1, v1, rad = t(r)
        rund = abs(u1 - u0 - 2 * rad) < 1e-6 and abs(v1 - v0 - 2 * rad) < 1e-6
        ausschnitt = bd.Circle(rad * m) if rund else bd.RectangleRounded((u1 - u0) * m, (v1 - v0) * m, rad * m)
        form = form - pos((u0 + u1) / 2, (v0 + v1) / 2) * ausschnitt
    for u, v, rad, seite in b.get("griff_ecken", []):      # obere Außenecken des Griffausschnitts
        ecke = pos(u + seite * rad / 2, v - rad / 2) * bd.Rectangle(rad * m, rad * m) - \
            pos(u + seite * rad, v - rad) * bd.Circle(rad * m)
        form = form - ecke
    return form


def zeichne_schublade(variante, datei, titel, kasten, nr, png=False):
    p = modell.lade_parameter()
    alle = modell.teile(p, variante)
    s = p["schubladen"]
    T, Tb, h0 = s["wandstaerke"], s["bodenstaerke"], s["boden_abstand_unten"]
    zug = p["zapfen"]["schleifzugabe"]
    bretter = {b["id"].split("-")[1]: b for b in modell.schubladen_bretter(p, alle) if f"{kasten}-S" in b["ids"] or any(i.startswith(kasten + "-") for i in b["ids"])}
    box = teil(alle, kasten)["box"]
    schiene = teil(alle, f"E-{kasten}-a")["box"][1]
    s0, s1 = schiene[0] - box[1][0], schiene[1] - box[1][0]       # Schienenband über Kastenunterkante
    loch = (s0 + s1) / 2
    blatt = Blatt((0, 0))
    links = (bd.TextAlign.LEFT, bd.TextAlign.CENTER)
    breit = bretter["E1"]["breite"] > 300                          # D3: Stirnwände übereinander

    def kontur(b, x, y, tauschen=False):
        blatt.mitte = (x, y)
        blatt.ebenen["kontur"] += list(_schubladen_flaeche(blatt, b, tauschen).edges())

    def kopf(b, x, y, zusatz=""):
        ids = " / ".join(b["ids"])
        blatt.text(f"{ids} — {b['teil']} · {fmt(b['staerke'])} mm · {b['stk']} Stk.{zusatz}", x, y, 2.8,
                   papier=True, ausrichtung=links)

    def schlitz_kette(b, abstand):                                # Bodenschlitze entlang der Unterkante
        us = sorted({0, b["breite"]} | {v for r in b["loecher"] if abs(r[1] - h0) < 1e-6 for v in (r[0], r[2])})
        blatt.kette([(u, 0) for u in us], abstand)

    # ── Seitenwand ──
    S = bretter["S"]
    xs, ys = 40, 185
    kontur(S, xs, ys)
    kopf(S, 25, ys + S["hoehe"] * M + 26)
    blatt.mass((0, 0), (S["breite"], 0), 16, f"{fmt(S['breite'])} (Rohteil, fertig {fmt(S['breite'] - 2 * zug)})")
    schlitz_kette(S, 8)
    blatt.mass((0, S["hoehe"]), (0, 0), 8)
    for v, art in ((s0, "verdeckt"), (s1, "verdeckt"), (loch, "verdeckt")):
        blatt.linie(blatt.p(0, v)[:2], blatt.p(S["breite"], v)[:2], ebene=art)
    blatt.text(f"Schienenband {fmt(s0)}–{fmt(s1)}, Lochreihe {fmt(loch)} (gestrichelt) — bleibt voll stehen",
               S["breite"] / 2, loch + 6, 2.3)
    fen = S["fenster"]
    rund = fen and abs(fen[0][2] - fen[0][0] - 2 * fen[0][4]) < 1e-6
    vs = {0, s0, s1, S["hoehe"]}                                   # Bodenschlitz: Hinweistext
    if fen:
        vs |= {fen[0][1], fen[0][3]} if not rund else {min(r[1] for r in fen) + fen[0][4], max(r[3] for r in fen) - fen[0][4]}
    blatt.kette([(S["breite"], v) for v in sorted(vs)], 8)
    if fen and not rund:
        us = sorted({0, S["breite"]} | {v for r in fen for v in (r[0], r[2])})
        blatt.kette([(u, S["hoehe"]) for u in reversed(us)], 8)
        blatt.text(f"{len(fen)} Fenster {fmt(round(fen[0][2] - fen[0][0], 1))} × {fmt(round(fen[0][3] - fen[0][1], 1))}, "
                   f"Ecken R {fmt(fen[0][4])}", S["breite"] / 2, S["hoehe"] + 14 / M, 2.4)
    elif fen:
        um = sorted({(r[0] + r[2]) / 2 for r in fen})
        blatt.kette([(u, S["hoehe"]) for u in (S["breite"], um[-1], um[0], 0)], 8)
        blatt.text(f"{len(fen)} Löcher Ø {fmt(2 * fen[0][4])} im Raster {fmt(s['lochraster']['abstand'])} "
                   f"(Maße auf Lochmitte)", S["breite"] / 2, S["hoehe"] + 14 / M, 2.4)

    # ── Boden, liegend: u = Kastentiefe, v = Breite ──
    Bo = bretter["B"]
    xb, yb = 40, 72
    kontur(Bo, xb, yb, tauschen=True)
    kopf(Bo, 25, yb + Bo["breite"] * M + 14)
    lang = sorted({0, Bo["hoehe"]} | {v for r in Bo["behalten"][1:] if r[0] < 1e-6 for v in (r[1], r[3])})
    blatt.kette([(u, 0) for u in lang], 8)
    blatt.mass((0, 0), (Bo["hoehe"], 0), 16, f"{fmt(Bo['hoehe'])} (Rohteil)")
    kurz = sorted({0, Bo["breite"]} | {v for r in Bo["behalten"][1:] if r[1] < 1e-6 for v in (r[0], r[2])})
    blatt.kette([(Bo["hoehe"], v) for v in kurz], 8)
    blatt.mass((0, Bo["breite"]), (0, 0), 8)

    # ── Kastenfront (mit Griff) und -rückwand ──
    E1, E2 = bretter["E1"], bretter["E2"]
    xe = 245 if breit else 262
    lagen = [(E1, xe, 185), (E2, xe, 100)]
    for b, x, y in lagen:
        kontur(b, x, y)
        kopf(b, x - 8, y + b["hoehe"] * M + (22 if b.get("griff") else 8))
        blatt.mass((0, 0), (b["breite"], 0), 16, f"{fmt(b['breite'])} (Rohteil)")
        schlitz_kette(b, 8)
        blatt.mass((0, b["hoehe"]), (0, 0), 8)
        um = sorted({(r[0] + r[2]) / 2 for r in b["fenster"]})
        vm = sorted({(r[1] + r[3]) / 2 for r in b["fenster"]})
        vs = sorted({0, h0, h0 + Tb, vm[0], b["hoehe"]} | ({b["griff"][0][1]} if b.get("griff") else set()))
        blatt.kette([(b["breite"], v) for v in vs], 8)
        if b.get("griff"):
            g = b["griff"][0]
            blatt.kette([(u, b["hoehe"]) for u in (b["breite"], g[2], g[0], 0)], 8)
    g = s["griff"]

    hinweise = [
        "Alle Teile kommen gefräst (CNC-Auftrag",
        "docs/cnc/schubladen/, gleiche Geometrie).",
        "Maße = Rohteil wie in der DXF; Zinken und",
        f"Bodenzapfen stehen {fmt(zug)} mm über und werden",
        "nach dem Verleimen bündig geschliffen.",
        "",
        f"Ecken: Fingerzinken, {s['zinken_anzahl']} Felder à "
        f"{fmt(round(S['hoehe'] / s['zinken_anzahl'], 2))}.",
        "Seitenwände: Zinken oben und unten,",
        "Stirnwände: die Lücken dazwischen.",
        "",
        f"Boden {fmt(Tb)} mm: Zapfen {fmt(s['bodenzapfen']['laenge'])} × {fmt(Tb)} durch",
        f"die Schlitze aller vier Wände, {fmt(h0)} mm über",
        "der Wandunterkante.",
        "",
        f"Griff: Ausschnitt {fmt(g['breite'])} × {fmt(g['tiefe'])}, unten",
        f"R {fmt(g['radius'])}, oben außen R {fmt(g.get('radius_oben', 0))}.",
        "",
        f"Schiene ({fmt(s1 - s0)} mm): an der Seitenwand",
        f"{fmt(s0)} über Kastenunterkante, Lochreihe {fmt(loch)}.",
        "Innenmaß: Boden liegt "
        f"{fmt(h0 + Tb)} über der Unterkante,",
        f"nutzbare Höhe {fmt(round(S['hoehe'] - h0 - Tb, 1))} mm.",
    ]
    hx = xe + E1["breite"] * M + 22
    for i, zeile in enumerate(hinweise):
        blatt.text(zeile, hx, 262 - i * 4.4, 2.2, papier=True, ausrichtung=links)

    blatt.rahmen(titel, "Kastenbretter flach: Kontur wie die CNC-Datei, bemaßt (ADR 0024, 0026, 0027)", nr,
                 "gleich in beiden Varianten")
    blatt.linie((25, 46), (37, 46), ebene="kontur")
    blatt.text("fertige Kontur (Fräslinie)", 40, 46, 2.6, papier=True, ausrichtung=links)
    blatt.linie((25, 41), (37, 41), ebene="verdeckt")
    blatt.text("Schienenband und Lochreihe", 40, 41, 2.6, papier=True, ausrichtung=links)

    ordner = ZIEL / variante
    ordner.mkdir(parents=True, exist_ok=True)
    pfad = ordner / f"{datei}.svg"
    blatt.schreiben(pfad)
    if png:
        import cairosvg
        cairosvg.svg2png(url=str(pfad), write_to=str(pfad.with_suffix(".png")),
                         output_width=2400, background_color="white")
    return pfad


# ── Blatt 11: Sitz-/Tischbretter C1–C3 mit Wangen, stehend, 1:5 ─────────────────
def zeichne_elemente(variante, datei, titel, nr, png=False):
    """Brett und Wange jedes Elements flach, Länge senkrecht (Vorderkante unten), plus Querschnitt.
    Geometrie = CNC-DXF (cnc.brettelemente) ohne Dogbones und Passungsluft; Wangenzapfen mit Schleifzugabe."""
    p = modell.lade_parameter()
    alle = modell.teile(p, variante)
    e, wz = p["elemente"], p["elemente"]["wangenzapfen"]
    zug = wz["schleifzugabe"]
    blatt = Blatt((0, 0))
    links = (bd.TextAlign.LEFT, bd.TextAlign.CENTER)
    y0 = 56                                                         # Papier-y der Vorderkante

    def kopf(x, zeile1, zeile2):
        blatt.text(zeile1, x, y0 + 870 * M + 31, 3.0, papier=True, ausrichtung=links)
        blatt.text(zeile2, x, y0 + 870 * M + 26.5, 2.4, papier=True, ausrichtung=links)

    def laengskette(punkte, u, abstand, links_davon):
        """Kette entlang der Länge (v) bei u; links_davon: Maße links der Kante."""
        vs = sorted(punkte)
        blatt.kette([(u, v) for v in (reversed(vs) if links_davon else vs)], abstand)

    # ── Bretter C1/C2 und C3: u = Breite, v = Länge ab Vorderkante ──
    for ids, x in ((["C1", "C2"], 48), (["C3"], 140)):
        breite, hoehe, behalten, loecher, _ = brett_geometrie(alle, p, ids[0], "oben")
        blatt.mitte = (x, y0)
        form = _rechteck(blatt, *behalten[0])
        for r in loecher:
            form = form - _rechteck(blatt, *r)
        blatt.ebenen["kontur"] += list(form.edges())
        laengskette({0, hoehe} | {v for r in loecher if r[0] == 0 for v in (r[1], r[3])}, 0, 10, True)
        blatt.mass((0, hoehe), (0, 0), 22, f"{fmt(hoehe)} gesamt")
        quer = sorted({0, breite} | {u for r in loecher for u in (r[0], r[2])})
        blatt.kette([(u, hoehe) for u in reversed(quer)], 8)
        blatt.mass((breite, hoehe), (0, hoehe), 20, f"{fmt(breite)} gesamt")
        name = langname(alle, ids[0]) if len(ids) == 1 else "Sitzbrett links / rechts"
        kopf(x - 22, f"{' / '.join(ids)} — {name}", f"{len(ids)} Stk. · {fmt(e['brett_staerke'])} mm · "
             f"{fmt(breite)} × {fmt(hoehe)}")

    # ── Wange (alle sechs gleich): gedreht, u = Höhe (Zapfen rechts), v = Länge ──
    laenge, h_wange, behalten, _, zapfen = brett_geometrie(alle, p, "C1-Wa", "z")
    h_roh = h_wange + e["brett_staerke"] + zug
    xw = 262
    blatt.mitte = (xw, y0)
    dreh = [(v0, u0, v1 + (zug if i else 0), u1) for i, (u0, v0, u1, v1) in enumerate(behalten)]
    form = _rechteck(blatt, *dreh[0])
    for r in dreh[1:]:
        form = form + _rechteck(blatt, *r)
    blatt.ebenen["kontur"] += list(form.edges())
    laengskette({0, laenge} | {u for r in zapfen for u in (r[0], r[2])}, h_roh, 10, False)
    blatt.mass((h_roh, 0), (h_roh, laenge), 22, f"{fmt(laenge)} gesamt")
    blatt.kette([(u, laenge) for u in (h_roh, h_wange, 0)], 8)
    blatt.mass((h_roh, laenge), (0, laenge), 20, " ")              # zu schmal für die Zahl: Text daneben
    blatt.text(f"{fmt(h_roh)} gesamt", h_roh + 4 / M, laenge + 20 / M, 2.6, ausrichtung=links)
    kopf(xw - 6, "C1–C3 -Wa / -Wb — Wange", f"6 Stk. · {fmt(e['wange_staerke'])} mm · Zapfen rechts")

    # ── Querschnitt C1/C2 (Blick von der Heckklappe), zusammengebaut ──
    c1 = teil(alle, "C1")["box"]
    b = c1[0][1] - c1[0][0]
    hb, wst = e["brett_staerke"], e["wange_staerke"]
    blatt.mitte = (318, 66)
    for r in ((0, h_wange, b, h_wange + hb), (0, 0, wst, h_wange), (b - wst, 0, b, h_wange)):
        blatt.rechteck(*r, "kontur")
    blatt.mass((0, 0), (b, 0), 8, f"{fmt(b)} (C3: {fmt(teil(alle, 'C3')['box'][0][1] - teil(alle, 'C3')['box'][0][0])})")
    blatt.kette([(b, v) for v in (0, h_wange, h_wange + hb)], 8)
    blatt.mass((b, 0), (b, h_wange + hb), 20, " ")
    blatt.text(f"{fmt(h_wange + hb)} gesamt", b + 20 / M, -6 / M, 2.4)
    loch = e["rand_lochreihe"]                                      # Wange endet so weit unter der Lochreihe
    blatt.linie(blatt.p(-4 / M, loch)[:2], blatt.p(b + 4 / M, loch)[:2], ebene="verdeckt")
    blatt.text(f"gestrichelt: Lochreihe der Schiene, {fmt(loch)} über Wangenunterkante", 0, -14 / M, 2.2,
               ausrichtung=links)
    blatt.text("Querschnitt C1 / C2, zusammengebaut (Blick von der Heckklappe)", 318, 66 + (h_wange + hb) * M + 8, 2.6,
               papier=True, ausrichtung=links)

    hinweise = [
        "Zum Nachmessen nach Lieferung: alle Teile",
        "kommen gefräst (CNC-Auftrag docs/cnc/schubladen/:",
        "c1-c2.dxf, c3.dxf, c1-c2-c3-wangen.dxf).",
        "Maße = Rohteil wie in der DXF, ohne Dogbones.",
        "",
        "Vorderkante (Heckklappe) unten im Bild,",
        f"Maße ab Vorderkante. {wz['anzahl']} Zapfen bzw.",
        f"Aussparungen je {fmt(wz['laenge'])} breit, an denselben Stellen.",
        "",
        f"Brett: Aussparungen {fmt(wst)} × {fmt(wz['laenge'])} an beiden",
        "Längskanten, offen zum Rand, ganz durch.",
        f"Wange: Zapfen {fmt(hb + zug)} hoch = {fmt(hb)} Brett + {fmt(zug)} mm",
        "Schleifzugabe; nach dem Verleimen bündig",
        "schleifen. Wangen bündig mit den Brettkanten.",
        "Alle sechs Wangen sind gleich.",
        "",
        "Die Schiene wird an die Wange geschraubt",
        "(Löcher beim Montieren bohren, ADR 0031).",
    ]
    for i, zeile in enumerate(hinweise):
        blatt.text(zeile, 318, 262 - i * 4.6, 2.3, papier=True, ausrichtung=links)

    blatt.rahmen(titel, "Brett + zwei Wangen je Element, flach: Kontur wie die CNC-Datei, bemaßt (ADR 0029, 0031)",
                 nr, "gleich in beiden Varianten")
    blatt.linie((25, 46), (37, 46), ebene="kontur")
    blatt.text("fertige Kontur (Fräslinie)", 40, 46, 2.6, papier=True, ausrichtung=links)

    ordner = ZIEL / variante
    ordner.mkdir(parents=True, exist_ok=True)
    pfad = ordner / f"{datei}.svg"
    blatt.schreiben(pfad)
    if png:
        import cairosvg
        cairosvg.svg2png(url=str(pfad), write_to=str(pfad.with_suffix(".png")),
                         output_width=2400, background_color="white")
    return pfad


# ── Letzte Blätter: Bohrplan Lüftungslöcher T1 / F1 / F2, 1:10 (ADR 0035) ─────────
BOHRPLAN_LAGE = {"T1": (40, 128), "F1": (215, 148), "F2": (215, 68)}   # Papier: linke untere Ecke je Brett
RANDMASS_LAGE = dict(BOHRPLAN_LAGE, F1=(215, 160))                    # Randmaße brauchen mehr Platz zwischen F1/F2


def _bohrbrett(alle, id):
    """Brett in Blattkoordinaten (u = Fahrerseite links, v = ab Vorderkante): Maße, Hilfslinien, Löcher,
    alle Rasterpunkte (auch ausgelassene) und die Schräglinien (u + v = s bzw. u − v = d) bei Muster diagonal."""
    t = teil(alle, id)
    (x0, x1), _, (z0, z1) = t["box"]
    l = t["lueftung"]
    us = [round(x1 - x, 2) for x in l["x"]]                     # Index i wie im Modell (x aufsteigend)
    vs = [round(z - z0, 2) for z in l["z"]]
    punkte = [(us[i], vs[j]) for j in range(len(vs)) for i in range(len(us))
              if l["muster"] != "diagonal" or (i + j) % 2 == l["paritaet"]]
    loecher = [(round(x1 - x, 2), round(z - z0, 2)) for x, z in l["mitten"]]
    summen = sorted({round(u + v, 2) for u, v in punkte})
    differenzen = sorted({round(u - v, 2) for u, v in punkte})
    return {"t": t, "l": l, "breite": x1 - x0, "hoehe": z1 - z0, "us": sorted(us), "vs": vs, "punkte": punkte,
            "loecher": loecher, "summen": summen, "differenzen": differenzen}


def _schraeglinie(art, c, breite, hoehe):
    """Schnitt der Linie u + v = c (art "s") bzw. u − v = c (art "d") mit dem Brett: (Anfang, Ende) oder None."""
    pts = []
    for u in (0, breite):
        v = c - u if art == "s" else u - c
        if -1e-6 <= v <= hoehe + 1e-6:
            pts.append((u, v))
    for v in (0, hoehe):
        u = c - v if art == "s" else c + v
        if -1e-6 <= u <= breite + 1e-6:
            pts.append((u, v))
    pts = sorted(set((round(a, 2), round(b, 2)) for a, b in pts))
    return (pts[0], pts[-1]) if len(pts) >= 2 and pts[0] != pts[-1] else None


def _bohrblatt_rahmen(blatt, titel, untertitel, nr, hinweise, legende):
    links = (bd.TextAlign.LEFT, bd.TextAlign.CENTER)
    for i, zeile in enumerate(hinweise):
        blatt.text(zeile, 345, 262 - i * 4.6, 2.3, papier=True, ausrichtung=links)
    blatt.rahmen(titel, untertitel, nr, "gleich in beiden Varianten", massstab="1:10 (DIN A3)")
    for i, (ebene, text) in enumerate(legende):
        y = 46 - 5 * i
        if ebene == "kreis":
            blatt.ebenen["sichtbar"].append(bd.Pos(31, y) * bd.Circle(1.5).edges()[0])
        else:
            blatt.linie((25, y), (37, y), ebene=ebene)
        blatt.text(text, 40, y, 2.6, papier=True, ausrichtung=links)


def _bohrblatt_schreiben(blatt, variante, datei, png):
    ordner = ZIEL / variante
    ordner.mkdir(parents=True, exist_ok=True)
    pfad = ordner / f"{datei}.svg"
    blatt.schreiben(pfad)
    if png:
        import cairosvg
        cairosvg.svg2png(url=str(pfad), write_to=str(pfad.with_suffix(".png")),
                         output_width=2400, background_color="white")
    return pfad


def zeichne_bohrplan(variante, datei, titel, nr, png=False):
    """Lüftungslöcher (ADR 0035) zum Anreißen mit Hilfsraster: Längs- und Querlinien gestrichelt, Bohrungen als
    Kreis — bei Muster diagonal nur an jeder zweiten Kreuzung (Schachbrett). Blick von oben, Fahrerseite links,
    Kante zur Heckklappe (T1) bzw. zum Vorgängerbrett (F1, F2) unten — wie Blatt 6."""
    p = modell.lade_parameter()
    alle = modell.teile(p, variante)
    lu = p["lueftung"]
    m = 1 / 10
    blatt = Blatt((0, 0), m)
    links = (bd.TextAlign.LEFT, bd.TextAlign.CENTER)
    summe = 0
    for id in lu["bretter"]:
        b = _bohrbrett(alle, id)
        breite, hoehe, us, vs, l = b["breite"], b["hoehe"], b["us"], b["vs"], b["l"]
        blatt.mitte = BOHRPLAN_LAGE[id]
        blatt.rechteck(0, 0, breite, hoehe, "kontur")
        for u in us:
            blatt.linie(blatt.p(u, 0)[:2], blatt.p(u, hoehe)[:2], ebene="verdeckt")
        for v in vs:
            blatt.linie(blatt.p(0, v)[:2], blatt.p(breite, v)[:2], ebene="verdeckt")
        for u, v in b["loecher"]:
            px, py, _ = blatt.p(u, v)
            blatt.ebenen["sichtbar"].append(bd.Pos(px, py) * bd.Circle(l["durchmesser"] / 2 * m).edges()[0])
        summe += len(b["loecher"])
        a = us[1] - us[0] if len(us) > 1 else lu["abstand"]
        # quer: Rand · n × Abstand · Rand (über dem Brett), längs: dasselbe links
        blatt.mass((us[0], hoehe), (0, hoehe), 6)                    # von rechts nach links: Maß über dem Brett
        blatt.mass((us[-1], hoehe), (us[0], hoehe), 6, f"{len(us) - 1} × {fmt(a)} = {fmt(us[-1] - us[0])}")
        blatt.mass((breite, hoehe), (us[-1], hoehe), 6)
        blatt.mass((breite, hoehe), (0, hoehe), 14, f"{fmt(breite)} gesamt")
        blatt.mass((0, vs[0]), (0, 0), 6)
        if len(vs) > 1:
            blatt.mass((0, vs[-1]), (0, vs[0]), 6, f"{len(vs) - 1} × {fmt(a)}")
        blatt.mass((0, hoehe), (0, vs[-1]), 6)
        blatt.mass((0, hoehe), (0, 0), 16, f"{fmt(hoehe)} gesamt")
        kante = "Kante zur Heckklappe" if id == "T1" else f"Kante zu {'T1' if id == 'F1' else 'F1'}"
        blatt.text(f"{id} — {langname(alle, id)}: {len(b['loecher'])} Löcher Ø {fmt(l['durchmesser'])}",
                   blatt.mitte[0], blatt.mitte[1] + hoehe * m + 22, 3.0, papier=True, ausrichtung=links)
        blatt.text(f"↓ {kante}", blatt.mitte[0] + breite * m / 2, blatt.mitte[1] - 4, 2.4, papier=True)

    diagonal = lu.get("muster") == "diagonal"
    schritt = lu["abstand"] / 2 if diagonal else lu["abstand"]
    flaeche = 3.1416 * (lu["durchmesser"] / 2) ** 2 / (2 * schritt ** 2 if diagonal else schritt ** 2)
    hinweise = [
        f"Ø {fmt(lu['durchmesser'])} mm — ANNAHME, bis die vorhandenen",
        "Bohrer nachgeschaut sind (parameter.json →",
        "lueftung, neu erzeugen).",
        "",
    ] + ([
        "Muster um 45° gedreht: Löcher auf Schräglinien,",
        f"{fmt(round(lu['abstand'] / 2 ** 0.5, 1))} mm auseinander. Zum Anreißen hier ein",
        f"Hilfsraster {fmt(schritt)} mm längs und quer — gebohrt",
        "wird nur jede zweite Kreuzung (Schachbrett),",
        "wo ein Kreis gezeichnet ist.",
        f"Schräglinien direkt anreißen: Blatt {nr + 1}.",
    ] if diagonal else [
        "Anreißen: Querlinien (gestrichelt, senkrecht im",
        "Bild) und Längslinien ab Brettkante wie bemaßt,",
        "Bohrung nur, wo ein Kreis gezeichnet ist.",
    ]) + [
        f"Ausgelassen: Lochrand näher als {fmt(lu['abstand_hindernis'])} mm an",
        "Scharnier (H1/H2) oder Wand unter T1",
        "(S1/S2, M1/M2, R1 mit Zapfen).",
        "",
        "Bohren: Forstnerbohrer, Opferbrett darunter",
        "fest anpressen (sonst reißt die Unterseite aus),",
        "senkrecht (Bohrständer oder Bohrführung).",
        "Danach beide Seiten leicht brechen.",
        "",
        f"Zusammen {summe} Löcher, sie nehmen ca.",
        f"{fmt(round(100 * flaeche, 1))} % der Fläche weg (ADR 0035).",
    ]
    _bohrblatt_rahmen(blatt, titel, "Lüftungslöcher unter der Matratze, von Hand gebohrt — Hilfsraster zum Anreißen "
                      "(ADR 0035)", nr, hinweise,
                      [("kontur", "Brettkante"), ("verdeckt", f"Hilfslinie (alle {fmt(schritt)} mm)"),
                       ("kreis", "Bohrung")])
    return _bohrblatt_schreiben(blatt, variante, datei, png)


def zeichne_bohrplan_rand(variante, datei, titel, nr, png=False):
    """Randmaße der Schräglinien (ADR 0035, Muster diagonal): wo jede Lochlinie die Brettkanten trifft, als
    Koordinate ab der Ecke unten links — so lassen sich die Linien mit Lineal von Kante zu Kante ziehen."""
    p = modell.lade_parameter()
    alle = modell.teile(p, variante)
    lu = p["lueftung"]
    m = 1 / 10
    blatt = Blatt((0, 0), m)
    links = (bd.TextAlign.LEFT, bd.TextAlign.CENTER)

    def marke(u, v, kante, lang=False):
        """Strich nach außen + Zahl (Abstand ab der Ecke unten links entlang der Kante), quer zur Kante gedreht.
        lang: Strich länger, damit die Zahlen eng liegender Marken nicht übereinander stehen."""
        wert = u if kante in ("unten", "oben") else v
        nu, nv = {"unten": (0, -1), "oben": (0, 1), "links": (-1, 0), "rechts": (1, 0)}[kante]
        weg = 85 if lang else 25
        a, b = blatt.p(u, v), blatt.p(u + nu * weg, v + nv * weg)
        blatt.linie(a[:2], b[:2], ebene="sichtbar")
        x, y = b[0] + nu * 1.2, b[1] + nv * 1.2
        drehung = 90 if kante in ("unten", "oben") else 0
        ausr = (bd.TextAlign.RIGHT if (kante in ("unten", "links")) else bd.TextAlign.LEFT, bd.TextAlign.CENTER)
        blatt.ebenen["text"].append(bd.Pos(x, y) * bd.Rot(0, 0, drehung) *
                                    bd.Text(fmt(round(wert, 1)), 2.0, font=SCHRIFT, text_align=ausr))

    for id in lu["bretter"]:
        b = _bohrbrett(alle, id)
        breite, hoehe, l = b["breite"], b["hoehe"], b["l"]
        blatt.mitte = RANDMASS_LAGE[id]
        blatt.rechteck(0, 0, breite, hoehe, "kontur")
        treffer = set()
        for art, werte in (("s", b["summen"]), ("d", b["differenzen"])):
            for c in werte:
                strecke = _schraeglinie(art, c, breite, hoehe)
                if not strecke:
                    continue
                blatt.linie(blatt.p(*strecke[0])[:2], blatt.p(*strecke[1])[:2], ebene="verdeckt")
                treffer |= set(strecke)
        je_kante = {}
        for u, v in sorted(treffer):
            kanten = [k for k, ok in (("unten", abs(v) < 1e-6), ("oben", abs(v - hoehe) < 1e-6),
                                      ("links", abs(u) < 1e-6), ("rechts", abs(u - breite) < 1e-6)) if ok]
            for k in kanten[:1]:                                      # Ecke: nur einmal beschriften
                je_kante.setdefault(k, []).append((u, v))
        for k, marken in je_kante.items():
            marken.sort(key=lambda q: q[0] if k in ("unten", "oben") else q[1])
            vorher, lang = None, False
            for u, v in marken:
                pos = u if k in ("unten", "oben") else v
                lang = vorher is not None and pos - vorher < 40 and not lang   # eng: abwechselnd lang
                marke(u, v, k, lang)
                vorher = pos
        for u, v in b["loecher"]:
            px, py, _ = blatt.p(u, v)
            blatt.ebenen["sichtbar"].append(bd.Pos(px, py) * bd.Circle(l["durchmesser"] / 2 * m).edges()[0])
        kante = "Kante zur Heckklappe" if id == "T1" else f"Kante zu {'T1' if id == 'F1' else 'F1'}"
        blatt.text(f"{id} — {langname(alle, id)}: {fmt(breite)} × {fmt(hoehe)}, {len(b['loecher'])} Löcher",
                   blatt.mitte[0], blatt.mitte[1] + hoehe * m + 22, 3.0, papier=True, ausrichtung=links)
        blatt.text(f"↓ {kante}", blatt.mitte[0] + breite * m / 2, blatt.mitte[1] - 18, 2.4, papier=True)
        blatt.text("0", blatt.mitte[0] - 2.5, blatt.mitte[1] - 2.5, 2.0, papier=True)

    hinweise = [
        "Randmaße der Schräglinien (Muster 45°).",
        "",
        "Jede Zahl = Abstand vom Nullpunkt (Ecke unten",
        "links, Fahrerseite / Vorderkante) entlang der",
        "Kante: unten und oben nach rechts gemessen,",
        "links und rechts nach oben gemessen.",
        "",
        "Anreißen: alle Marken an den vier Kanten setzen,",
        "dann je zwei Marken mit dem Lineal verbinden,",
        "die auf einer 45°-Linie liegen (gestrichelt). Wo",
        "sich zwei Linien kreuzen, sitzt eine Bohrung —",
        "außer dort, wo im Bild kein Kreis ist",
        "(Scharnier oder Wand darunter).",
        "",
        f"Entlang einer Kante liegen die Linien einer",
        f"Richtung {fmt(lu['abstand'])} mm auseinander; beide Richtungen",
        "zusammen ergeben die abwechselnden Abstände.",
        f"Kontrolle mit dem Hilfsraster: Blatt {nr - 1}.",
    ]
    _bohrblatt_rahmen(blatt, titel, "Wo jede Lochlinie die Brettkante trifft — Maße ab Ecke unten links (ADR 0035)",
                      nr, hinweise, [("kontur", "Brettkante"), ("verdeckt", "Schräglinie durch die Bohrungen"),
                                     ("kreis", "Bohrung")])
    return _bohrblatt_schreiben(blatt, variante, datei, png)


# ── Blatt 1: Übersicht „Bezeichnungen“ ──────────────────────────────────────
# Isometrie der Box mit Liegefläche (Schlafmodus, ohne Einbauten) und Tabelle aller Kürzel.
ISO_KAMERA, ISO_ZIEL = (10000, 9000, -13000), (0, 160, 1000)   # von vorn-oben, Fahrerseite (+x)
ISO_TEILE = ("B1", "R1", "S1", "S2", "M1", "M2", "T1", "F1", "F2")
# Beschriftung: Ankerpunkt (Bruchteile der Teil-Box je Achse 0…1) und Textversatz in Papier-mm
ISO_BESCHRIFTUNG = {
    "F2": ((0.5, 1, 0.5), (-14, 16)), "F1": ((0.5, 1, 0.5), (-14, 18)), "T1": ((0.5, 1, 0.5), (40, 20)),
    "S1": ((1, 0.5, 0.3), (-24, -22)), "S2": ((0.5, 1, 0), (6, 26)),
    "M1": ((0.5, 0.3, 0), (-30, -38)), "B1": ((0.5, 0.5, 0), (-4, -40)),
    "R1": ((0.5, 0.5, 0.5), (25, 50)), "M2": ((0.5, 0.3, 0), (28, -28)),
}
# Tabelle: einzelne Teile, Gruppen aus vielen Modellteilen zusammengefasst (Kürzel, Langname)
UEBERSICHT_SAMMEL = {
    "E": ("E-C1-a … E-D3-b", "Schienen: je Element ein Paar a/b, z. B. „Schiene Sitzbrett links, an Seitenwand links“"),
    "H": ("H1-1…3 / H2-1…3", "Scharniere Deckplatte ↔ Klappbrett Rücksitz (oben) / Klappbrett Rücksitz ↔ Kopfende (unten), Kaufposition V17"),
}


def zeichne_uebersicht(variante, png=False):
    p = modell.lade_parameter()
    alle = modell.teile(p, variante)
    blatt = Blatt((0, 0), 1 / 11)
    links = (bd.TextAlign.LEFT, bd.TextAlign.CENTER)

    # Isometrie: Kanten projizieren, Abbildung Modell → Bild aus vier projizierten Punkten bestimmen
    teile = [t for t in alle if t["id"] in ISO_TEILE or (t.get("zapfen_von") and t["gruppe"] == "korpus")]
    sichtbar, verdeckt = bd.Compound([solid(t) for t in teile]).project_to_viewport(
        ISO_KAMERA, viewport_up=(0, 1, 0), look_at=ISO_ZIEL)

    def bildpunkt(pt):
        b = bd.Solid.make_box(2, 2, 2, bd.Plane((pt[0] - 1, pt[1] - 1, pt[2] - 1)))
        kanten = bd.Compound([b]).project_to_viewport(ISO_KAMERA, viewport_up=(0, 1, 0), look_at=ISO_ZIEL)[0]
        punkte = [v for e in kanten for v in (e.start_point(), e.end_point())]
        return sum(v.X for v in punkte) / len(punkte), sum(v.Y for v in punkte) / len(punkte)
    o, ex, ey, ez = (bildpunkt(q) for q in ((0, 0, 0), (1000, 0, 0), (0, 1000, 0), (0, 0, 1000)))

    def abbild(x, y, z):
        return tuple(o[i] + (ex[i] - o[i]) * x / 1000 + (ey[i] - o[i]) * y / 1000 + (ez[i] - o[i]) * z / 1000
                     for i in (0, 1))

    ecken = [abbild(*e) for t in teile for e in
             ((x, y, z) for x in t["box"][0] for y in t["box"][1] for z in t["box"][2])]
    u0, u1 = min(e[0] for e in ecken), max(e[0] for e in ecken)
    v0, v1 = min(e[1] for e in ecken), max(e[1] for e in ecken)
    blatt.mitte = (25 + 105 - (u0 + u1) / 2 * blatt.m, 60 + 105 - (v0 + v1) / 2 * blatt.m)
    blatt.kanten(sichtbar, "sichtbar")
    # Die Rückwand R1 ist unter dem Deckel ganz verdeckt: allein projiziert, gestrichelt
    blatt.kanten([e for kanten in bd.Compound([solid(teil(alle, "R1"))]).project_to_viewport(
        ISO_KAMERA, viewport_up=(0, 1, 0), look_at=ISO_ZIEL) for e in kanten], "verdeckt")
    for id, (anteil, (dx, dy)) in ISO_BESCHRIFTUNG.items():
        box = teil(alle, id)["box"]
        anker = blatt.p(*abbild(*(box[i][0] + (box[i][1] - box[i][0]) * anteil[i] for i in range(3))))[:2]
        text = (anker[0] + dx, anker[1] + dy)
        blatt.linie(anker, text, ebene="mass")
        blatt.ebenen["mass"].append(bd.Pos(*anker) * bd.Circle(0.6))
        ausrichtung = (bd.TextAlign.RIGHT if dx < 0 else bd.TextAlign.LEFT, bd.TextAlign.CENTER)
        x = text[0] + (-1.5 if dx < 0 else 1.5)
        blatt.text(id, x, text[1] + 2.2, 3.2, papier=True, ausrichtung=ausrichtung)
        blatt.text(langname(alle, id) + (" (verdeckt)" if id == "R1" else ""), x, text[1] - 2.2, 2.4, papier=True, ausrichtung=ausrichtung)
    blatt.text("Isometrie ohne Maßstab · Schlafmodus, ohne Schubladen, Sitz-/Tischbretter und Schienen",
               25, 60, 2.2, papier=True, ausrichtung=links)
    blatt.text("Korpusfront (Heckklappe) rechts vorn im Bild, Fahrerseite (S1) links vorn · gestrichelt: Rückwand R1, unter T1 verdeckt", 25, 55.5, 2.2, papier=True,
               ausrichtung=links)

    # Tabelle aller Kürzel, nach Gruppen
    zeilen, gesehen = [], set()
    for t in alle:
        if t.get("zapfen_von"):
            continue
        g = t["id"][0]
        if g in UEBERSICHT_SAMMEL:
            if g not in gesehen:
                zeilen.append((g, *UEBERSICHT_SAMMEL[g]))
            gesehen.add(g)
            continue
        zeilen.append((g, t["id"], langname(alle, t["id"])))
    reihenfolge = list(modell.GRUPPEN)
    zeilen.sort(key=lambda z: reihenfolge.index(z[0]) if z[0] in reihenfolge else 99)
    x0, y0 = 258, 262
    for x, kopf in ((x0, "Gruppe"), (x0 + 38, "Kürzel"), (x0 + 64, "Langname")):
        blatt.text(kopf, x, y0, 2.8, papier=True, ausrichtung=links)
    blatt.linie((x0, y0 - 3), (BLATT_B - 15, y0 - 3), ebene="sichtbar")
    y, vorher = y0 - 8, None
    for g, kuerzel, name in zeilen:
        if g != vorher and vorher is not None:
            blatt.linie((x0, y + 3), (BLATT_B - 15, y + 3), ebene="verdeckt")
            y -= 1.2
        if g != vorher:
            blatt.text(f"{g} — {modell.GRUPPEN.get(g, '')}", x0, y, 2.3, papier=True, ausrichtung=links)
        blatt.text(kuerzel, x0 + 38, y, 2.5, papier=True, ausrichtung=links)
        for i, teilzeile in enumerate(_umbrechen(name, 48)):
            if i:
                y -= 4
            blatt.text(teilzeile, x0 + 64, y, 2.5, papier=True, ausrichtung=links)
        vorher = g
        y -= 5.2
    blatt.text("V1 … V17 Verbindungsmittel & Beschläge, G2 … G5 Ausstattung: List_of_Materials.md",
               x0, y - 1, 2.2, papier=True, ausrichtung=links)
    blatt.text("Links/rechts immer aus Fahrersicht (Blick nach vorn): links = Fahrerseite.",
               x0, y - 6, 2.2, papier=True, ausrichtung=links)

    blatt.rahmen("Bezeichnungen", "Übersicht aller Kürzel und Langnamen — die Buchstaben sind Eselsbrücken "
                 "(Bottom, Rear, Side, Mid, Top, Fold, Hinge)", 1, VARIANTEN[variante], massstab="ohne (Übersicht)")
    blatt.text("Blätter: 1 Bezeichnungen · 2–4 Ansichten (1:5) · 5 Box-Bretter (1:10) · "
               f"6–{5 + len(DETAILBLAETTER)} Einzelbretter zum Sägen (1:5) · "
               f"{6 + len(DETAILBLAETTER)}–{BLATT_ELEMENTE} Schubladen und Sitz-/Tischbretter, gefräst (1:5) · "
               f"{BLATT_GESAMT - 1}–{BLATT_GESAMT} Bohrplan Liegefläche (1:10)",
               25, 14, 2.2, papier=True, ausrichtung=links)

    ordner = ZIEL / variante
    ordner.mkdir(parents=True, exist_ok=True)
    pfad = ordner / "bezeichnungen.svg"
    blatt.schreiben(pfad)
    if png:
        import cairosvg
        cairosvg.svg2png(url=str(pfad), write_to=str(pfad.with_suffix(".png")),
                         output_width=2400, background_color="white")
    return pfad


def _umbrechen(text, breite):
    zeilen, zeile = [], ""
    for wort in text.split():
        if zeile and len(zeile) + 1 + len(wort) > breite:
            zeilen.append(zeile)
            zeile = wort
        else:
            zeile = f"{zeile} {wort}".strip()
    return zeilen + [zeile]


def sammel_pdf(variante, blaetter):
    """Alle Blätter einer Eckausbildung in Blattreihenfolge als ein PDF (A3 quer, Vektor)."""
    import io
    import cairosvg
    from pypdf import PdfWriter
    pdf = PdfWriter()
    for pfad in blaetter:
        pdf.append(io.BytesIO(cairosvg.svg2pdf(url=str(pfad))))
    ziel = ZIEL / variante / "werkzeichnungen.pdf"
    with open(ziel, "wb") as f:
        pdf.write(f)
    return ziel


def p_lueftung_diagonal():
    return modell.lade_parameter()["lueftung"].get("muster") == "diagonal"


def main():
    png = "--png" in sys.argv
    for variante in VARIANTEN:
        blaetter = [zeichne_uebersicht(variante, png)]
        for name in ANSICHTEN:
            pfad, n = zeichne(variante, name, png)
            blaetter.append(pfad)
            print(f"{pfad.relative_to(ZIEL.parent.parent)}  ({n} Überschneidungen inkl. gewollter Zapfen)")
        blaetter.append(zeichne_bretter(variante, png))
        for nr, (datei, titel, bretter) in enumerate(DETAILBLAETTER, len(ANSICHTEN) + 3):
            blaetter.append(zeichne_detail(variante, datei, titel, bretter, nr, png))
        for nr, (datei, titel, kasten) in enumerate(SCHUBLADENBLAETTER, len(ANSICHTEN) + 3 + len(DETAILBLAETTER)):
            blaetter.append(zeichne_schublade(variante, datei, titel, kasten, nr, png))
        blaetter.append(zeichne_elemente(variante, *ELEMENTBLATT, BLATT_ELEMENTE, png))
        blaetter.append(zeichne_bohrplan(variante, *BOHRPLAN, BLATT_GESAMT - 1, png))
        if p_lueftung_diagonal():
            blaetter.append(zeichne_bohrplan_rand(variante, *BOHRPLAN_RAND, BLATT_GESAMT, png))
        print("\n".join(str(b.relative_to(ZIEL.parent.parent)) for b in blaetter if b.parent.name == variante
                        and b.stem not in ANSICHTEN))
        try:
            print(sammel_pdf(variante, blaetter).relative_to(ZIEL.parent.parent))
        except ImportError:
            print("werkzeichnungen.pdf übersprungen — cairosvg und pypdf installieren (modell/requirements.txt)")


if __name__ == "__main__":
    main()

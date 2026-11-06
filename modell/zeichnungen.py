"""Werkzeichnungen (Draufsicht, Vorderansicht, Seitenansicht) aus dem gemeinsamen Teilemodell.

Baut jedes Teil aus modell.teile() als Volumenkörper in build123d auf, projiziert
orthogonal mit getrennten sichtbaren und verdeckten Kanten und schreibt je
Eckausbildung drei DIN-A3-Blätter im Maßstab 1:5 nach docs/zeichnungen/<variante>/,
dazu das Zuschnittblatt „Box-Bretter“ (1:10) und drei Einzelbrett-Blätter (1:5), auf
denen jeder Zapfen, Schlitz und jede Aussparung zum Sägen bemaßt ist.
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

VARIANTEN = {   # Boden F1 und Deckel A1 laufen immer durch (ADR 0018)
    "gezapft": "Boden- + Deckplatte durchlaufend, Wände gezapft",
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
        zeige={"zapfen", "eckverbindung", "frontblende", "sonstige"},
        # der hintere B3-Zapfen in der Rückwand läge frontal mitten auf der Trennwand
        ohne_koll_mit={"B1"}),
    "draufsicht": dict(
        titel="Draufsicht", nr=2,
        blick="Blick von oben, Deckplatte (A1) abgenommen — Korpusfront (Heckklappe) unten im Bild",
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
        self.text("Schlafmodus (alles eingefahren) · Klappbrett Rücksitz (A2) / Kopfende (A3), Scharniere und Matratze nicht dargestellt",
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
    """Langname ohne Klammerzusatz, z. B. „Seitenwand links“ für B2-F."""
    return teil(teile, id)["name"].split(" (")[0]


def bemassen(name, blatt, teile, p):
    k = p["korpus"]
    W, D = k["breite"], k["tiefe"]
    a1 = teil(teile, "A1")["box"]
    oben = a1[1][1]                                       # Oberkante Deckel
    b4 = teil(teile, "F1")["box"]
    b1 = teil(teile, "B1")["box"]
    wand_x = sorted({v for id in ("B2-F", "B2-B", "B3-1", "B3-2") for v in teil(teile, id)["box"][0]})
    hoehen = sorted({0, b4[1][1], a1[1][0], oben})
    r_ende = teil(teile, "E-C1-a")["box"][2][1]          # hinteres Schienenende
    zuschnitt = teil(teile, "B2-F").get("zuschnitt")      # nur bei Zapfen: [Länge, Höhe] des Rohzuschnitts

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
        blatt.text(f"Spalt je {fmt(d2[1][0] - c2[1][1])}", uL - 150, (c2[1][0] + c2[1][1]) / 2, 2.4)
        # Mitte im Bild: Kasten D3 / Spalt / Tisch-Brett C3
        d3, c3 = teil(teile, "D3")["box"], teil(teile, "C3")["box"]
        u = -(d3[0][0] + 40)
        blatt.masslinie((u, d3[1][0]), (u, d3[1][1]), f"Schubladenkasten (D3) {fmt(d3[1][1] - d3[1][0])}")
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
        if zuschnitt:                                                  # links = Rückseite
            blatt.mass((-D, oben), (-D, 0), 10, f"Wand mit Zapfen, Zuschnitt {fmt(zuschnitt[1])}")
        r = teil(teile, "E-C1-b")["box"]
        v = (r[1][0] + r[1][1]) / 2
        blatt.masslinie((-r[2][0], v), (-r[2][1], v), f"Schiene {fmt(r[2][1] - r[2][0])}")


# ── Teile-Beschriftung ───────────────────────────────────────────────────────
BESCHRIFTUNG = {
    "vorderansicht": ["B2-F", "B2-B", "B3-1", "B3-2", "F1", "A1", "C1", "C2", "C3", "D1-F", "D2-F", "D3-F"],
    "draufsicht": ["B1", "B2-F", "B2-B", "B3-1", "B3-2", "D1", "D2", "C3"],
    "seitenansicht": ["B2-F", "A1"],
}
# Beschriftung seitlich verschieben (Modell-mm in u), wo sie sonst auf einem Zapfen läge
BESCHRIFTUNG_VERSATZ = {("seitenansicht", "A1"): -180}


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
# Jede Platte flach, einzeln, im Maßstab 1:10; gleiche Teile (B2-F/B2-B, B3-1/B3-2)
# einmal mit Stückzahl. Lage auf dem Blatt in Papier-mm (linke untere Ecke).
BRETTER = [  # (Kürzel, weitere gleiche Kürzel, Ansicht, x, y) — Ansicht: "oben" = Fläche x×z, "x" = x×y, "z" = z×y
    ("F1", [], "oben", 34, 162), ("A1", [], "oben", 164, 162),
    ("B2-F", ["B2-B"], "z", 294, 214), ("B1", [], "x", 294, 162),
    ("A2", [], "oben", 34, 66), ("A3", [], "oben", 164, 66), ("B3-1", ["B3-2"], "z", 294, 66),
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
        if ansicht == "oben" and id in ("F1", "A1"):
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
                if id.startswith("B3"):
                    wort += " + hinten mittig"
            else:
                starts = sorted({w["box"][0][0] - x0 for w in eigene if w["id"].endswith("u")})
                wort = f"Zapfen je 50, ab linker Kante {' · '.join(fmt(s) for s in starts)}"
                for w in (w for w in alle if id in w.get("steckt_in", [])):   # Schlitze für die B3-Zapfen
                    blatt.rechteck(*lage(w["box"]), "verdeckt")
                wort += " + 2 Schlitze für Trennwände (B3)"
            blatt.text(wort, breite / 2, hoehe + 30, 2.0)
        zeilen.append((kuerzel, name, f"{fmt(breite)} × {fmt(hoehe)}", fmt(staerke), stk))

    blatt.rahmen("Box-Bretter", "Zuschnitt aller Platten der Box und der Liegefläche — Birke-Multiplex, "
                 "jede Platte einzeln, Fahrerseite links", len(ANSICHTEN) + 1, VARIANTEN[variante],
                 massstab="1:10 (DIN A3)")

    # Legende + Zuschnittliste unten
    links = (bd.TextAlign.LEFT, bd.TextAlign.CENTER)
    blatt.linie((25, 46), (37, 46), ebene="sichtbar")
    blatt.text("Plattenkante (Zuschnitt)", 40, 46, 2.6, papier=True, ausrichtung=links)
    if variante == "gezapft":
        blatt.linie((25, 41), (37, 41), ebene="verdeckt")
        blatt.text("Zapfen, Schlitze, Aussparungen — selbst sägen", 40, 41, 2.6, papier=True, ausrichtung=links)
        blatt.text("Wandhöhe 340 = 302 + 2 × 19 mm Zapfen (1 mm Schleifzugabe je Kante).", 25, 34, 2.2, papier=True, ausrichtung=links)
        blatt.text("Absatz an Trennwand (B3) hinten genau 882 ab Vorderkante.", 25, 30, 2.2, papier=True, ausrichtung=links)
        blatt.text(f"Alle Zapfen, Schlitze und Aussparungen bemaßt: Blätter {len(ANSICHTEN) + 2}–{BLATT_GESAMT} (1:5).",
                   25, 26, 2.2, papier=True, ausrichtung=links)
    blatt.text("Ohne Schubladen und Sitz-/Tischbretter — deren Maße werden am fertigen Korpus festgelegt.",
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
    ("brett-f1-a1", "Bodenplatte F1 / Deckplatte A1", [("F1", ["A1"], "oben", 55, 58)]),
    ("brett-b2-b3", "Seitenwände B2 + Trennwände B3", [("B2-F", ["B2-B"], "z", 50, 178), ("B3-1", ["B3-2"], "z", 50, 70)]),
    ("brett-b1", "Rückwand B1", [("B1", [], "x", 50, 150)]),
]
BLATT_GESAMT = len(ANSICHTEN) + 1 + len(DETAILBLAETTER)


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
        oben_kette = loecher or behalten[0][2] < breite             # B1 Schlitze, B3 Absatz: Kette über dem Brett
        blatt.text(beschriftung, x, y + hoehe * blatt.m + (22 if oben_kette else 6), 3.0, papier=True,
                   ausrichtung=links)

    unten = sorted({z for r in zapfen if r[1] == 0 for z in (r[0], r[2])})
    if ansicht == "oben" and not loecher:                          # stumpf: nur Rohmaß
        blatt.mass((0, 0), (breite, 0), 8, fmt(breite))
        blatt.mass((0, hoehe), (0, 0), 10, fmt(hoehe))
        return
    if ansicht == "oben":
        # oben (Hinterkante): Aussparungen für B1 · zweite Kette: Schlitze für B3
        hinten = sorted({u for r in loecher if r[3] == hoehe for u in (r[0], r[2])})
        mitte = sorted({u for r in loecher if 0 < r[0] and r[2] < breite and r[3] < hoehe for u in (r[0], r[2])})
        blatt.kette([(u, hoehe) for u in reversed([0] + hinten + [breite])], 8)
        blatt.kette([(u, hoehe) for u in reversed([0] + mitte + [breite])], 21)
        # links (Fahrerseite): Aussparungen für B2 · rechts: Schlitze für B3 + Aussparungstiefe für B1
        seite = sorted({v for r in loecher if r[0] == 0 for v in (r[1], r[3])})
        schlitz = sorted({v for r in loecher if 0 < r[0] and r[2] < breite for v in (r[1], r[3])} |
                         {r[1] for r in loecher if r[3] == hoehe})
        blatt.kette([(0, v) for v in reversed([0] + seite + [hoehe])], 10)
        blatt.kette([(breite, v) for v in [0] + schlitz + [hoehe]], 10)
        tiefe = min(r[2] - r[0] for r in loecher if r[0] == 0)
        lage_b2 = next(r for r in loecher if r[0] == 0)
        blatt.text(f"Aussparungen {fmt(tiefe)} tief", lage_b2[2] + 10, (lage_b2[1] + lage_b2[3]) / 2, 2.4,
                   ausrichtung=(bd.TextAlign.LEFT, bd.TextAlign.CENTER))
        return
    # Wände: unten Zapfenkette (oben gleich), rechts Höhen
    blatt.kette([(u, 0) for u in [0] + unten + [breite]], 8)
    hoehen = {0, hoehe} | {v for r in behalten[:1] for v in (r[1], r[3])}
    hoehen |= {v for r in zapfen if r[2] == breite and 0 < r[1] for v in (r[1], r[3])}   # hinterer B3-Zapfen
    blatt.kette([(breite, v) for v in sorted(hoehen)], 10)
    if behalten[0][2] < breite:                                    # B3: Absatz vor dem hinteren Zapfen
        blatt.kette([(u, hoehe) for u in (breite, behalten[0][2], 0)], 8)
    if loecher:                                                    # B1: Schlitze für die B3-Zapfen
        quer = sorted({u for r in loecher for u in (r[0], r[2])})
        blatt.kette([(u, hoehe) for u in reversed([0] + quer + [breite])], 8)
        hoch = sorted({v for r in loecher for v in (r[1], r[3])})
        blatt.kette([(0, v) for v in reversed([0] + hoch + [hoehe])], 10)


def zeichne_detail(variante, datei, titel, bretter, nr, png=False):
    p = modell.lade_parameter()
    alle = modell.teile(p, variante)
    blatt = Blatt((0, 0))
    for id, gleiche, ansicht, x, y in bretter:
        blatt.mitte = (x, y)
        zeichne_brett(blatt, alle, p, id, gleiche, ansicht)

    gezapft = any(w.get("zapfen_von") or w.get("steckt_in") for w in alle)
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
        "brett-f1-a1": [
            "Bodenplatte (F1) und Deckplatte (A1) sind gleich:",
            "dieselbe Zeichnung gilt für beide. Blick von oben,",
            "Fahrerseite links, Heckklappe (Vorderkante) unten.",
            "",
            f"Seitlich: Aussparungen {fmt(z['laenge'])} × 18 für Seitenwände (B2),",
            "offen zum Rand.",
            f"Hinten: Aussparungen {fmt(z['laenge'])} × 18 für Rückwand (B1), offen.",
            f"Innen: Schlitze 18 × {fmt(z['laenge'])} für Trennwände (B3),",
            "geschlossen.",
            "Alles ganz durch die 18-mm-Platte.",
            "",
            "Schlitze: in den Ecken vorbohren (≥ 8 mm),",
            "mit der Stichsäge aussägen, auf Linie feilen.",
            "Lieber knapp sägen und nachpassen.",
            "",
            "Deckplatte (A1): Klappscharniere (V17) bei",
            "x = 0 und ± 410 liegen zwischen den",
            "Aussparungen für die Rückwand (B1).",
        ],
        "brett-b2-b3": [
            "Zapfen oben und unten an denselben Stellen",
            "(Maßkette unten gilt für beide Kanten).",
            f"Zapfenlänge 19 = 18 Plattenstärke + {fmt(z['schleifzugabe'])} mm",
            "Schleifzugabe; nach dem Verleimen bündig",
            "schleifen.",
            "",
            "Maße ab Vorderkante (Heckklappe, links).",
            "",
            "Trennwand (B3) hinten: Absatz genau bei 882,",
            "dahinter nur der mittige Zapfen in die",
            "Rückwand (B1), ohne Schleifzugabe.",
            "",
            "Schnitte zwischen den Zapfen mit der",
            "Stichsäge, an Zapfen auf Linie feilen.",
        ],
        "brett-b1": [
            "Zapfen oben und unten an denselben Stellen",
            "(Maßkette unten gilt für beide Kanten).",
            f"Zapfenlänge 19 = 18 + {fmt(z['schleifzugabe'])} mm Schleifzugabe.",
            "",
            "Zwei Schlitze 18 × 50 für die hinteren Zapfen",
            "der Trennwände (B3), ganz durch",
            "(Kette oben + links).",
            "",
            "Symmetrisch — von welcher Seite gemessen",
            "wird, ist egal.",
            "",
            "Zapfenlage weicht den Klappscharnieren (V17)",
            "auf der Deckplatte (A1) aus (ADR 0020).",
        ],
    }[datei] if gezapft else ["Ohne Zapfen: Platte nur auf Rohmaß zuschneiden."]
    hx = 312 if datei == "brett-f1-a1" else 300
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


def main():
    png = "--png" in sys.argv
    for variante in VARIANTEN:
        for name in ANSICHTEN:
            pfad, n = zeichne(variante, name, png)
            print(f"{pfad.relative_to(ZIEL.parent.parent)}  ({n} Überschneidungen inkl. gewollter Zapfen)")
        print(zeichne_bretter(variante, png).relative_to(ZIEL.parent.parent))
        for nr, (datei, titel, bretter) in enumerate(DETAILBLAETTER, len(ANSICHTEN) + 2):
            print(zeichne_detail(variante, datei, titel, bretter, nr, png).relative_to(ZIEL.parent.parent))


if __name__ == "__main__":
    main()

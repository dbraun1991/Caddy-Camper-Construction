"""Plattenoptimum für den Schubladen-Auftrag (D1–D3 + C1–C3): welche Plattenformate mit dem wenigsten Verschnitt?

Probiert je Stärke alle Kombinationen aus bis zu drei Platten aus FORMATE und sucht die kleinste gekaufte
Fläche, auf die alle Teile passen (Hüllrechtecke, `cnc.teileabstand` dazwischen, `cnc.platte.randstreifen`
ringsum, MaxRects aus cnc.py). Einmal mit Faser egal (wie im Auftrag erlaubt), einmal mit Faser längs.
Der Korpus ist nicht dabei: seine Bretter liegen schon zugeschnitten vor (ADR 0032).

Dazu die Fräsbett-Variante (FRAESBETTEN): Fräse kleiner als eine Platte, Zuschnitt in Stücke von Fräsbettgröße.

    .venv/bin/python modell/plattenoptimum.py   → docs/plattenoptimum/ (PLATTENOPTIMUM.md + SVG je Stärke)
"""
from datetime import date
from itertools import combinations_with_replacement, permutations
from pathlib import Path

import cnc
import modell
import zeichnungen

ZIEL = Path(__file__).resolve().parent.parent / "docs" / "plattenoptimum"

# (Länge, Breite, Bezeichnung, Hinweis) — Faser der Decklage längs der ersten Zahl
FORMATE = [
    (2500, 1250, "Standardplatte", "Standard im Holzhandel"),
    (1525, 1525, "BB/BB-Format", "gängig bei Birke-Multiplex (finnisch/baltisch)"),
    (2440, 1220, "8 × 4 ft", "seltener"),
    (3000, 1500, "Großformat", "seltener, eher für große Aufträge"),
    (1250, 1250, "halbe Platte (quer)", "Zuschnitt, viele Händler verkaufen halbe Platten"),
    (2500, 625, "halbe Platte (längs)", "Zuschnitt"),
    (1250, 625, "Viertelplatte", "Zuschnitt"),
]
MAX_PLATTEN = 3

# Fräsbett-Variante: Fräse kleiner als eine ganze Platte (z. B. bei einem Bekannten). Der Händler schneidet die
# gekauften Platten in Stücke von Fräsbettgröße, gefräst wird Stück für Stück. (Länge, Breite, Hinweis)
FRAESBETTEN = [
    (900, 1250, "Empfehlung — Teile sind fast alle ~870 mm lang"),
    (900, 1000, ""),
    (900, 625, "kleine Hobbyfräse"),
]
KAUFBAR = [f for f in FORMATE if f[0] in (2500, 1250) and f[1] == 1250]   # ganze + halbe Platte


def teile_je_staerke(p):
    """{stärke: [(kürzel, breite, hoehe, fläche_holz)], …} in Auftragsstückzahl."""
    out = {}
    for b in modell.schubladen_bretter(p):
        flaeche = cnc.kontur(p, b["behalten"], b["loecher"], b["fenster"] + b.get("griff", [])).area
        out.setdefault(b["staerke"], []).extend([(b["id"], b["breite"], b["hoehe"], flaeche)] * b["stk"])
    zeilen, flaechen = cnc.brettelemente(p)
    for zl, (_, breite, hoehe) in zip(zeilen, flaechen):
        out.setdefault(zl["_staerke"], []).extend([(zl["kuerzel"], breite, hoehe, zl["_flaeche"])] * zl["stk"])
    return out


ORDNUNGEN = (lambda t: -t[1] * t[2], lambda t: -t[1], lambda t: -t[2], lambda t: -max(t[1], t[2]))


def belege(teile, platten, p, drehen):
    """Teile nacheinander auf die gegebenen Platten legen. Liefert [[(teil, x, y, gedreht)], …] oder None."""
    a, r = p["cnc"]["teileabstand"], p["cnc"]["platte"]["randstreifen"]
    for folge in set(permutations(platten)):
        for ordnung in ORDNUNGEN:
            rest = sorted([(t, *((t[2], t[1]) if t[2] > t[1] else (t[1], t[2]))) for t in teile], key=ordnung)
            rest = [(t, w + a, h + a) for t, w, h in rest]
            ergebnis = []
            for L, B, *_ in folge:
                gelegt, rest = cnc._maxrects(rest, L - 2 * r + a, B - 2 * r + a, drehen)
                ergebnis.append([(t, x + r, y + r, g) for t, x, y, g in gelegt])
            if not rest and all(ergebnis):
                return list(zip(folge, ergebnis))
    return None


def optimum(teile, p, drehen):
    """Kleinste gekaufte Fläche; bei Gleichstand weniger Platten, dann größerer zusammenhängender Rest."""
    kandidaten = sorted((k for n in range(1, MAX_PLATTEN + 1) for k in combinations_with_replacement(FORMATE, n)),
                        key=lambda k: (sum(f[0] * f[1] for f in k), len(k)))
    holz = sum(t[3] for t in teile)
    ergebnisse = []
    for k in kandidaten:
        if sum(f[0] * f[1] for f in k) < holz:
            continue
        belegung = belege(teile, k, p, drehen)
        if belegung:
            ergebnisse.append((k, belegung))
        if len(ergebnisse) >= 4:
            break
    return ergebnisse


def standard(teile, p, drehen):
    """Nur Standardplatten 2.500 × 1.250 (wie ADR 0033) — zum Vergleich."""
    for n in range(1, 6):
        b = belege(teile, (FORMATE[0],) * n, p, drehen)
        if b:
            return (FORMATE[0],) * n, b


def stuecke_je_platte(platte, stueck):
    """Wie viele Stücke l × b passen beim Zuschnitt aus einer Platte L × B (beide Lagen probiert)?"""
    (L, B), (l, b) = platte, stueck          # Schnittfuge ignoriert: Stücke werden ein paar mm kleiner (Randstreifen)
    return max(L // x * (B // y) for x, y in ((l, b), (b, l)))


def fraesbett(teile, p, bett):
    """Wie viele Stücke von Fräsbettgröße und welche Platten dafür kaufen (kleinste gekaufte Fläche)?"""
    for n in range(1, 10):
        belegung = belege(teile, ((bett[0], bett[1], "Stück", ""),) * n, p, True)
        if belegung:
            break
    kauf = min((k for m in range(1, MAX_PLATTEN + 1) for k in combinations_with_replacement(KAUFBAR, m)
                if sum(stuecke_je_platte(x[:2], bett[:2]) for x in k) >= n),
               key=lambda k: (sum(x[0] * x[1] for x in k), len(k)))
    return n, belegung, kauf


def svg(belegung, pfad):
    """Platten nebeneinander als einfache Rechteck-Skizze (1 px = 1 mm)."""
    x0, teile, breite = 0, [], 0
    for (L, B, name, _), gelegt in belegung:
        teile.append(f'<rect x="{x0}" y="0" width="{L}" height="{B}" fill="#eee" stroke="#888" stroke-width="6"/>')
        teile.append(f'<text x="{x0 + 10}" y="{B + 60}" font-size="48" fill="#444">{L} × {B} ({name})</text>')
        for (kz, w, h, _), x, y, g in gelegt:
            w, h = (h, w) if h > w else (w, h)
            w, h = (h, w) if g else (w, h)
            teile.append(f'<rect x="{x0 + x}" y="{y}" width="{w}" height="{h}" fill="#e7c9a0" stroke="#a33" stroke-width="4"/>')
            kurz = kz.split(" / ")[0] if min(w, h) < 120 else kz       # schmale Wangen: nur ein Kürzel
            cx, cy = x0 + x + w / 2, y + h / 2
            dreh = f' transform="rotate(-90 {cx} {cy})"' if h > w else ""
            teile.append(f'<text x="{cx}" y="{cy + 12}" font-size="{30 if min(w, h) < 120 else 40}" '
                         f'text-anchor="middle" fill="#222"{dreh}>{kurz}</text>')
        x0 += L + 150
        breite = max(breite, B)
    pfad.write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="-20 -20 {x0 + 20} {breite + 120}" '
                    f'font-family="sans-serif">' + "".join(teile) + "</svg>\n", encoding="utf-8")


def zeile(k, belegung, teile, zusatz=""):
    gekauft = sum(f[0] * f[1] for f in k)
    rechteck = sum(t[1] * t[2] for t in teile)
    formate = " + ".join(f"{f[0]} × {f[1]}" for f in k)
    return (f"| {formate}{zusatz} | {gekauft / 1e6:.2f} m² | {100 * rechteck / gekauft:.0f} % | "
            f"{(gekauft - rechteck) / 1e6:.2f} m² | " + " / ".join(str(len(g)) for _, g in belegung) + " |")


def main():
    p = modell.lade_parameter()
    ZIEL.mkdir(parents=True, exist_ok=True)
    f = zeichnungen.fmt
    md = ["# Plattenoptimum — Schubladen-Auftrag D1–D3 + C1–C3", "",
          f"Erzeugt am {date.today().isoformat()} von `modell/plattenoptimum.py` aus `modell/parameter.json`. "
          "Korpus und Liegefläche sind nicht dabei — die Bretter liegen schon zugeschnitten vor (ADR 0032).", "",
          f"Rechnung: Hüllrechtecke der Teile, {f(p['cnc']['teileabstand'])} mm Abstand für den Fräser, "
          f"{f(p['cnc']['platte']['randstreifen'])} mm unbrauchbarer Rand je Platte, MaxRects wie in ADR 0033, "
          f"bis zu {MAX_PLATTEN} Platten aus den Formaten unten kombiniert. *Ausnutzung* = "
          "Hüllrechtecke der Teile / gekaufte Fläche, *Verschnitt* = gekauft − Hüllrechtecke (Fenster, Löcher und "
          "Griffe kommen noch dazu, sind aber gewollt). Grobe Schätzung — echtes Nesting des Dienstleisters "
          "kann nur gleich gut oder besser sein.", "",
          "Formate: " + "; ".join(f"{a} × {b} ({n}, {h})" for a, b, n, h in FORMATE) + ".", ""]
    empfehlung = []
    for st, teile in sorted(teile_je_staerke(p).items(), reverse=True):
        holz = sum(t[3] for t in teile)
        rechteck = sum(t[1] * t[2] for t in teile)
        md += [f"## {f(st)} mm — {len(teile)} Teile, {rechteck / 1e6:.2f} m² Hüllrechtecke "
               f"({holz / 1e6:.2f} m² Holz nach Fenstern/Löchern)", ""]
        for drehen, titel in ((True, "Faser egal (Teile dürfen quer liegen — so steht es im Auftrag)"),
                              (False, "Faser längs (jedes Teil mit der langen Seite längs der Faser)")):
            md += [f"### {titel}", "", "| Platten | gekauft | Ausnutzung | Verschnitt | Teile je Platte |",
                   "|---|---|---|---|---|"]
            beste = optimum(teile, p, drehen)
            md += [zeile(k, b, teile, " **← Optimum**" if i == 0 else "") for i, (k, b) in enumerate(beste)]
            k, b = standard(teile, p, drehen)
            md += [zeile(k, b, teile, " (nur Standardplatten, Vergleich)"), ""]
            zusatz = "" if drehen else "-faser-laengs"
            svg(beste[0][1], ZIEL / f"optimum-{f(st)}mm{zusatz}.svg")
            md += [f"![Belegung {f(st)} mm](optimum-{f(st)}mm{zusatz}.svg)", ""]
            if drehen:
                empfehlung.append(f"- **{f(st)} mm:** " + " + ".join(f"{x[0]} × {x[1]} ({x[2]})" for x in beste[0][0])
                                  + f" — {100 * rechteck / sum(x[0] * x[1] for x in beste[0][0]):.0f} % Ausnutzung.")
    md += fraesbett_abschnitt(p, f)
    kopf = md.index("Formate: " + "; ".join(f"{a} × {b} ({n}, {h})" for a, b, n, h in FORMATE) + ".") + 2
    md[kopf:kopf] = ["## Ergebnis", ""] + empfehlung + [
        "", "Zuschnitt-Formate (halbe/Viertelplatte) gibt es nicht überall — vorher beim Händler oder Fräsdienst "
        "fragen. Reste aus dem Korpus-Zuschnitt (falls noch da) oder Reste des Dienstleisters können die "
        "kleinste Platte ersetzen.", ""]
    (ZIEL / "PLATTENOPTIMUM.md").write_text("\n".join(md) + "\n", encoding="utf-8")
    print("\n".join(empfehlung))


def fraesbett_abschnitt(p, f):
    """Abschnitt „Fräsbett-Variante“: Zuschnitt in Stücke von Fräsbettgröße, Stückzahl und Einkauf je Stärke."""
    md = ["## Fräsbett-Variante — Fräse kleiner als eine ganze Platte", "",
          "Für eine Fräse bei einem Bekannten o. Ä.: Der Holzhändler schneidet die gekauften Platten in Stücke von "
          "Fräsbettgröße, gefräst wird Stück für Stück. Das längste Teil ist "
          f"{f(max(max(t[1], t[2]) for ts in teile_je_staerke(p).values() for t in ts))} mm lang — das Fräsbett "
          f"braucht mit Rand und Abstand mindestens ~900 mm. Die Schnittfuge beim Zuschnitt macht ein Stück ein paar "
          f"mm kleiner als das Fräsbett — das schluckt der Randstreifen ({f(p['cnc']['platte']['randstreifen'])} mm). "
          "Gekauft wird aus ganzen (2500 × 1250) und halben (1250 × 1250) Platten. Stücke bis ~1120 mm "
          "passen quer in den Caddy, ganze Platten nicht.", "",
          "| Fräsbett | Stärke | Stücke | Ausnutzung der Stücke | kaufen | Reste nach Zuschnitt |",
          "|---|---|---|---|---|---|"]
    for L, B, hinweis in FRAESBETTEN:
        for st, teile in sorted(teile_je_staerke(p).items(), reverse=True):
            n, belegung, kauf = fraesbett(teile, p, (L, B))
            rechteck = sum(t[1] * t[2] for t in teile)
            gekauft = sum(x[0] * x[1] for x in kauf)
            md.append(f"| {L} × {B}" + (f" ({hinweis})" if hinweis else "") + f" | {f(st)} mm | {n} × {L} × {B} | "
                      f"{100 * rechteck / (n * L * B):.0f} % | " + " + ".join(f"{x[0]} × {x[1]}" for x in kauf)
                      + f" | {(gekauft - n * L * B) / 1e6:.2f} m² |")
            if (L, B) == FRAESBETTEN[0][:2]:
                svg(belegung, ZIEL / f"fraesbett-{L}x{B}-{f(st)}mm.svg")
    md += ["", "Reste = gekaufte Fläche − Stücke; taugen für ein Probestück (Zapfen in Schlitz) vor dem Auftrag.", ""]
    md += [f"![Fräsbett {FRAESBETTEN[0][0]} × {FRAESBETTEN[0][1]}, {f(st)} mm]"
           f"(fraesbett-{FRAESBETTEN[0][0]}x{FRAESBETTEN[0][1]}-{f(st)}mm.svg)"
           for st in sorted(teile_je_staerke(p), reverse=True)] + [""]
    return md


if __name__ == "__main__":
    main()

# Idee: Lüftungslöcher in F1, F2 und T1 (Matratzenbelüftung)

Status: offen · notiert 2026-11-17

## Frage

Nachträglich kleine Löcher in die drei Liegeflächen-Bretter `F1`, `F2` (Klappbretter)
und `T1` (Deckplatte) bohren, damit die Matratze von unten lüftet. Muster:
Linien längs und quer, Bohrung an jedem Schnittpunkt. Groß genug für Luft, ohne
die Tragfähigkeit zu gefährden, einfach umsetzbar.

## Erste Gedanken

- Anders als ADR 0032 (Gewicht sparen): `F1/F2` bleiben „massiv" im Sinne von
  *nicht erleichtern* – Lüftungsbohrungen sind ein anderer Zweck mit wenig
  Materialabtrag. Trotzdem beim Angehen ausdrücklich bestätigen lassen.
- Größenordnung zum Prüfen: Ø 20–25 mm im Raster ~80–100 mm entfernt nur ~3–6 %
  der Fläche – bei 18 mm Multiplex statisch vernachlässigbar. Ø 8–10 mm lüftet
  kaum; ab ~Ø 15 mm sinnvoll.
- Freizuhalten: Rand (≥ 40–50 mm), Scharnierzonen `H1-*`/`H2-*`, Zapfen/Schlitze
  von `T1`, Auflagen (Shim V16), Aufhängung F2 (V15).
- Umsetzung: Raster mit Bleistift anreißen (oder Schablone aus Restplatte mit
  einem Loch + Anschlag), **Forstnerbohrer** oder Holzspiralbohrer mit
  Vorstecher, **Opferbrett** drunter gegen Ausriss, Kanten danach brechen
  (→ [03-kanten-abrunden.md](03-kanten-abrunden.md)).
- Offen: Unter `T1` liegt der Stauraum – feuchte Luft zieht in die Schubladen?
  Alternativ/zusätzlich: Abstandsgewirke (3D-Mesh) unter die Matratze.
- Modell: Löcher wären ein neues Merkmal von `F1`, `F2`, `T1` in
  `parameter.json`/`modell.py` (Zeichnung + ggf. Bohrplan), nicht in `index.html`.

## Verknüpft

- ADR 0019 (Klappbretter), ADR 0032 (Erleichtern, offen), `Hinweise-Sommernutzung.md` (Lüftung)

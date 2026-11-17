# Idee: Gefräste Kanten leicht abrunden

Status: umgesetzt 2026-11-17 → [ADR 0034](../adrs/0034-milled-r2-edge-break-top-side-only.md) · notiert 2026-11-17

## Frage

Kanten leicht runden, damit sie nicht scharf sind – geht das beim CNC-Betrieb mit,
und wie heißt das?

## Erste Gedanken

- Fachwörter: **Kantenbruch** (allgemein), **Fase** (z. B. „Fase 1 × 45°") oder
  **Radius / Abrundung** (z. B. „Radius R2", Werkzeug „Abrundfräser" /
  „Viertelstabfräser"). Für die Anfrage z. B.: „sichtbare Kanten mit Kantenbruch
  R2 bzw. Fase 1 mm".
- Die CNC fräst von oben → nur die **Oberseiten-Kanten** gehen in einer
  Aufspannung. Unterseite heißt **Wenden / zweiseitige Bearbeitung** → teurer.
  Alternative: Unterseite selbst mit Schleifklotz / Kantenfräse brechen.
- **Nicht** an Fügeflächen runden: Fingerzinken, Zapfen, Schlitze, Bodennuten
  müssen scharfkantig bleiben, sonst Spalt. Also nur Außenkonturen, Griffmulde,
  Fenster und Lochraster – das muss im DXF unterscheidbar sein (eigener Layer
  für „Kante brechen").
- Innenecken der Fenster/Griffe sind ohnehin durch den Fräser gerundet; es geht
  um die Kante zur Fläche.

## Verknüpft

- ADR 0023 (Dogbones, Layer), ADR 0024 / 0026 / 0027 (Fenster, Lochraster, Griff)

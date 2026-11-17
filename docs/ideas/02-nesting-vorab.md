# Idee: Teile selbst auf der Platte anordnen (Nesting)?

Status: umgesetzt 2026-11-17 → [ADR 0033](../adrs/0033-plate-count-estimate-shop-nests.md) · notiert 2026-11-17 (Vorgänger-Notiz in AGENTS.md vom 2026-11-15)

## Frage

Ist es sinnvoll, die DXF-Teile vorab selbst auf Plattenformat anzuordnen? Brauchen
Betriebe das?

## Erste Gedanken

- Fachwort: **Nesting** / „Verschachtelung", die Software dafür hat jeder
  Plattenfräsbetrieb (oft automatisch im CAM). Meist wollen Betriebe **einzelne
  Teile als DXF** und nesten selbst – passend zu ihrem Fräser, ihren
  Spannmitteln (Vakuumtisch, Haltestege/„Tabs") und ihren Plattenresten.
- Wert eines eigenen Nestings trotzdem: Wir wissen vorab, ob 1 oder 2 Platten
  reichen (→ [01-plattenbedarf-schubladen.md](01-plattenbedarf-schubladen.md)),
  und können das Angebot plausibilisieren.
- Wichtig, falls wir nesten: **Faserrichtung** der Decklage pro Teil festlegen
  (lange Bretter längs zur Faser), nicht frei drehen lassen.
- `alle-teile.dxf` ist bewusst nicht genestet – so lassen, bis ein Betrieb
  etwas anderes verlangt. Beim Anschreiben fragen.

## Verknüpft

- ADR 0023, `Einkaufsliste.md` §1 (Anbieter-Suche, Brockmann Holz)

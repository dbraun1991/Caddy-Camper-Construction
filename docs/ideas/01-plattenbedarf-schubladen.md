# Idee: Plattenbedarf für den CNC-Auftrag Schubladen + C1–C3

Status: umgesetzt 2026-11-17 → [ADR 0033](../adrs/0033-plate-count-estimate-shop-nests.md) · notiert 2026-11-17

## Frage

Wie viele Multiplexplatten braucht der zweite CNC-Auftrag (`docs/cnc/schubladen/`:
`D1`–`D3` + `C1`–`C3` mit Wangen) – 1, 2 oder 3?

## Erste Gedanken

- Gängige Formate Multiplex (Birke): **2500 × 1250 mm**, **1250 × 2500** (gleich,
  andere Faserrichtung der Decklage), **1525 × 1525 mm** (BB/BB-Birke, „5 × 5 ft"),
  seltener 2440 × 1220 / 3000 × 1500. Pappel/Kiefer-Multiplex meist 2500 × 1250.
  Händler nennen die Faserrichtung zuerst – bei Brettern, die lang und schmal
  sind, zählt das.
- Stärken: hier 12 mm (Schubladenböden) und 18 mm (Wände, Brettelemente) →
  vermutlich mindestens **eine 18er + eine 12er**, die Frage ist eher, ob die
  18er reicht.
- Zum Angehen: Flächen und Hüllmaße aus `modell.schubladen_bretter()` /
  `brettelemente()` summieren, je Stärke gegen 2500 × 1250 legen, Sägefuge bzw.
  Fräserabstand (~10–15 mm) und Randstreifen einrechnen. Faustregel: Nutzungsgrad
  70–85 % beim Fräsen.

## Verknüpft

- [02-nesting-vorab.md](02-nesting-vorab.md)
- ADR 0023, ADR 0024, `Einkaufsliste.md` §1

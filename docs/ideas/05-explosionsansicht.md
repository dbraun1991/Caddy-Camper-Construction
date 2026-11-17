# Idee: Explosionsansicht als eigener Reiter

Status: offen · notiert 2026-11-17

## Wunsch (Bauherr)

Eine Explosionsansicht wie im Nebenprojekt ideastorm, als **eigener Reiter** neben
„Dynamisch · 3D“ (ganzer Caddy). Betrachtet wird immer **ein** Objekt, ausgewählt
per Dropdown:

- a) die Box (Korpus),
- b) die Schubladen,
- c) die Sitz-/Tischbretter.

Bei Schublade und Box sind die Schienen dabei.

## Recherche: so macht es ideastorm

Quelle: `../ideastorm/prototyp/kern.py` (`modell()`), `prototyp/index.html`
(`baueSzene()`), Idee 0042 dort.

- Jedes Brett trägt im Modell einen Einheitsvektor `explode`, z. B. Boden
  `[0, -1, 0]`, Deckel `[0, 1, 0]`, Seiten `[±1, 0, 0]`, Rückwand `[0, 0, -1]`,
  Fachböden `[0, 0, 1]`.
- Zapfen haben keinen eigenen Vektor: Sie übernehmen den ihres Bretts
  (`zapfen_von`) und wandern mit ihm.
- Ein Regler „Auseinander“ (0–250 mm) skaliert alle Vektoren gleich:
  Position = Mitte + `explode` × Wert. Die Szene wird bei jeder Reglerbewegung neu
  aufgebaut.
- Der Boden ist zu 40 % deckend und schreibt keine Tiefe (`depthWrite: false`),
  damit das untere Brett unter der Bodenebene sichtbar bleibt (Idee 0042).

## Übertragung auf dieses Projekt

- Die Richtungen gehören ins Modell (`modell/modell.py` → `modell.js`, ADR 0015) und
  nicht in `index.html`.
- Box: `B1`, `T1`, `R1`, `S1/S2`, `M1/M2` + Zapfen (`_zapfen`), dazu die
  Schienengehäuse an den Wänden.
- Schubladen: die Bretter `D*-S`, `-E1`, `-E2`, `-B` aus `schubladen_bretter()` /
  `schubladen_3d()` (Fingerzinken, Bodenzapfen) und die Schienen-Innenteile.
- Sitz-/Tischbretter: `C1`–`C3` (Brett und 2 Wangen mit Wangenzapfen) und die Schienen.
- Bestehende Bausteine: Three.js r128, `box()`, die Extrusion aus `schubladen_3d`,
  die Orbit-Steuerung des 3D-Reiters.

## Entscheidungen (Bauherr, 2026-11-17)

1. Dropdown: **Box**, **D1/D2**, **D3**, **C1/C2**, **C3** (die baugleichen Teile
   zusammengefasst, immer nur ein Objekt).
2. Box = Korpus mit Zapfen, Schienengehäuse an den Wänden, **dazu F1/F2 und die
   Scharniere H1/H2**.
3. Schienen bei D*/C*: **komplette Schiene je Seite** (eingefahren) als ein Teil,
   das seitlich vom Kasten bzw. von der Wange wegwandert. In der Box nur die Gehäuse.
4. Bedienung: **Regler „Auseinander“** 0–250 mm wie in ideastorm, Startwert in
   der Mitte. Orbit, Zoom und Pan wie im 3D-Reiter.
5. **Kürzel als Etiketten** an jedem Teil, langer Name beim Überfahren oder
   Antippen. Zapfen grün wie in den Zeichnungen.

## Verknüpft

- ADR 0004 (Szenengraph), ADR 0015, ADR 0024, ADR 0030 (Teleskop-Schiene), ADR 0031

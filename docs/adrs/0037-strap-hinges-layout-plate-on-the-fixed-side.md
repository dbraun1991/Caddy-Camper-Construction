# 0037: Strap hinges — three large on top, large in the middle underneath, plate on the fixed side

Status: **Accepted** (2026-11-22). Amends [ADR 0019](0019-hinged-sleeping-boards-fold-onto-the-corpus.md)
(hinge geometry and stack height, not the top/bottom placement). Related:
[ADR 0020](0020-through-tenons-instead-of-routed-grooves.md) (R1 tenon positions in `T1`),
[ADR 0035](0035-ventilation-holes-in-the-sleeping-boards.md) (holes skipped near hinge leaves).

## Context

The hinges `V17` were bought before the model knew their size; `scharniere` in
`modell/parameter.json` held assumed symmetric 60 × 60 mm leaves with the axis 3 mm
above the board. The builder measured them on 2026-11-22. They are T-shaped strap
hinges (Kistenbänder), all lengths from the knuckle centre:

- 4 large + 2 small. Every hinge has the same **base plate 70 × 30 mm, 3 holes**.
- The **strap** is 35 mm wide, **145 mm** long with 4 holes (large) or
  **115 mm** with 3 holes (small).
- Leaves ~2 mm thick, knuckle Ø ~5–10 mm (modelled as 8 → axis 4 mm off the board).

The builder asked how many to fit and where, and to recheck that top/bottom still
works for Fahrmodus 2 (five seats, boards stacked on the box).

## Decision

- **All six, three per joint, at x = −400 / 0 / +400.**
  - `T1`↔`F1` (on top, `H1-1…3`): **three large**.
  - `F1`↔`F2` (underneath, `H2-1…3`): **small – large – small**.
- **Base plate on the board towards the box, strap on the board that swings**:
  `H1` plate on `T1`, strap on `F1`; `H2` plate under `F1`, strap under `F2`.
- Top/bottom stays as in ADR 0019 — rechecked for Fahrmodus 2: the top axis lets
  `F1` swing over onto `T1`; once `F1` is upside down its underside faces up, so
  the bottom hinge's axis is on top and `F2` folds onto `F1`. With the hinge on
  top of `F1`↔`F2`, `F2` would end up between `F1` and `T1`.
- Model: each hinge is two boxes, `H…-n-G` (Grundplatte) and `H…-n-B` (Band), with
  `scharnier` and `typ`. Leaves on `F1`/`F2` carry `klappt_mit`, and the viewer now
  also rotates parts with `klappt_mit: "F2"`. `modell.py` asserts that no more hinges
  of a type are placed than exist, and that the plates on `T1` keep ≥ 10 mm off the
  flush R1 tenons.

## Reasons

- **Top joint gets the large ones.** It is crawled over (knees, centred) when
  getting in through the tailgate, and it is folded before every drive. Lifting
  `F1` by one corner twists the outer hinges, and 4 screws per strap hold that
  better than 3. Under load the board edges bear against each other at the bottom
  and the hinge is in tension, on an 18 mm lever arm.
- **Bottom joint: large in the middle.** `F2` carries only the head and hangs from
  the headrests on the loops `V15` near its sides, so the joint sags most in the
  middle.
- **Plate on the fixed side.** The 30 mm plate on `T1` (z 870–900) sits right above
  `R1` (z 882–900), where `T1` is supported. The 145 mm strap would otherwise reach
  z 755 on `T1` and only cost ventilation holes there. On `F1` the strap spreads the
  tension into the board that hangs from the hinge. Underneath, a strap under `F1`
  would reach z 1455 and could meet the shim strips `V16` on the seat backs; under
  `F2` there is only air towards the footwell.
- **x = ±400.** The R1 tenons sit flush in `T1` at |x| 130–180 and 450–500. A 70 mm
  plate at ±400 covers 365–435, 15 mm clear of the tenon; further out it would hit
  one. x = 0 is free (`M1`/`M2` at ±212–230). The bottom joint uses the same x for a
  uniform look; the loop holes in `F2` (set on the car) stay clear of it.

## Consequences

- Folded stack: `F1` y 346–364, `F2` y 372–390 → **stack height 390 mm** (was 386).
  The knuckle at z 900 stands ~4 mm proud of the box towards the upright rear seat
  backs (20–30 mm clearance at floor level). Worth one check on the car whether the
  reclined seat back comes closer at ~340 mm height.
- Ventilation holes: `F1` 65 (was 68) and `F2` 35 (was 38) because holes keep 15 mm
  off the straps; `T1` stays at 78. 178 in total.
- Shown everywhere (2026-11-22): the 3D tab draws the leaves plus the knuckles
  (`MODELL.scharnierrollen`, display only); the drawings show the leaves on the
  two Bohrplan sheets and on "Box-Bretter" (top side filled grey, underside dashed,
  centres from the left edge as text), in the isometric overview, and on `T1` in
  the views. The Bohrplan sheet states the smallest hole-to-leaf distance
  (22.5 mm ≥ 15 mm); `zeichnungen.py` asserts it.
- Screws max. 15 mm (boards 18 mm). Not in any DXF; marked and drilled on assembly.
- Rejected alternative: large – small – large at both joints (symmetric). Also
  workable, but it puts a small hinge at the centre of the entry joint.

# 0028: Height plan — seat/table board on cheeks, equal drawer boxes, foolproof runner layout

Status: Accepted (2026-11-12). Decides [ADR 0013](0013-rail-carrier-cheeks-for-seat-and-table-boards.md)
(variant: board on top, cheeks below), replaces the runner placement of
[ADR 0025](0025-drawer-runners-interleaved-between-seat-and-table-runners.md),
corrects the 170 kg runner length assumed in [ADR 0017](0017-850-mm-runners-in-900-mm-corpus.md).

## Context

With the drawers toggleable in the 3D view, the builder saw that the drawer
boxes used the height band of the seat/table runners. The model drew the
seat/table boards 32 mm thick, but their 170 kg runners are 76 mm high
(re-measured 2026-11-12; datasheet 76.2 ± 0.5 mm, `docs/runner-pdfs/heavy-runners.pdf`)
and all screw holes sit on the runner's centre line, 38 mm up. A 32 mm board
ends below its own hole row: the runner had nothing to be screwed to. Whatever
hangs on the runner occupies the runner's full height, so the drawer boxes
cannot use that band. This was the open question of ADR 0013.

Further facts gathered the same day:

- Lengths measured: 80 kg runner 850 mm, 170 kg runner **870 mm** (not 850),
  each plus a ~30 mm lock lever at the front, on the moving member.
- Datasheet: thickness 19.2 ± 0.3 mm, screws **M6**. Our 19 mm + 1 mm play per
  side takes up to 20 mm, so the widths stay.
- The builder wants no edge on the seat: the board may sit 1–2 mm above the
  runner, but the runner must never stand proud of the board. Aim: nearly flush.
- Hole spacing along the runner does not matter for the model (every runner
  sits on solid material over its full length).

## Decision

- **Seat/table element = an inverted U**: an 18 mm board on top across the full
  element width, two 18 mm cheeks underneath on the runner sides. The runner's
  inner member is screwed to the outer face of the cheek; the hole line lies in
  the middle of the cheek. The seat surface is flat, with no raised edges (the
  alternative from ADR 0013, board below and cheeks rising, would leave 44 mm
  edges on both sides of the seat).
- **Board top 1.5 mm above the runner** (`elemente.ueberstand_brett`): covers
  the datasheet's +0.5 mm height tolerance plus ±0.5 mm of mounting error before
  the runner could show as an edge, and stays inside the builder's 1–2 mm.
- **3 mm clearance above `B1` under `D3`** (`boden_luft`), chosen by the
  builder for sag under load, build tolerances and grit; previously `D3` sat
  directly on `B1` and would have dragged. It costs no drawer height; `D3` and
  its runner just move up.
- **Short cheeks to save material** (`wange_luft` = 20 mm): each cheek ends
  20 mm above the runner's bottom edge, so it is 39.5 mm high. The minimum is
  set by the screw: ≥ 15 mm of wood below the hole line (≈ 3 × the 5 mm screw,
  `rand_lochreihe`, asserted); 20 mm leaves 18 mm. Bending along the length is
  carried by the steel runner, so the cheek only has to hold the screws and the
  board.
- The seat runner itself stands directly on `B1`: its outer member is fixed,
  and the moving members clear the floor by ~10 mm (measured 2026-11-12). 5 mm gaps between elements and
  to `T1`.
- Resulting plan (mm above the load floor; `B1` top 18, `T1` underside 320):

  | | sections L/R | middle section |
  |---|---|---|
  | lower | seat element 38–95.5 (runner 18–94) | drawer box `D3` 21–235.5 |
  | upper | drawer box `D1/D2` 100.5–315 | table element 257.5–315 (runner 237.5–313.5) |

  All three boxes are 214.5 mm high (inner 192.5 mm, was 238 mm).
- **Drawer runners placed for a foolproof assembly** (builder, 2026-11-12;
  `elemente.schubladenschiene`). A first draft centred them on the boxes; that
  left no room for windows or holes in the side walls. Now:
  - outer drawers `D1/D2`: runner as **low** as possible, 5 mm above the box
    bottom → 106–159 mm, leaving one row of 4 windows ~110 mm high above it
    (reach in while seated, ADR 0026);
  - middle drawer `D3`: runner as **high** as possible, 5 mm below the box top
    → 177–230 mm, leaving two rows of Ø 25 mm holes below it.
  - Drawer runner heights are whole millimetres (cut spacer blocks to them).
  - Result on `M1/M2`: every runner of an outer section lies **below** 141 mm
    above `B1`, every runner of the middle section **above** 159 mm. A pencil
    line at 150 mm above `B1` separates the two faces; no band comes within
    10 mm of one on the opposite face (`mindestabstand_gegenseite`, asserted in
    `modell.py`), so through-bolt nuts always land on bare wall.
- **Runner length per type** (`schienen.typen.*.laenge`): 870 mm heavy, 850 mm
  light. Seat/table elements are 870 mm long (13.5 mm to `R1`), the viewer moves
  each element by its own runner length.
- **Screws**: through-bolts `V9` M6 × 30 (datasheet M6), heavy runners into the
  cheeks with 5 × 16 mm flat-head wood screws (new `V18`); 3.5 mm screws are too
  thin for M6 holes. The light runner's hole size is still to be checked.
- **Lock levers** stand ~30 mm proud of the corpus front when retracted. The
  measured room to the tailgate is 20–30 mm, so `fahrzeug_pruefung()` flags it
  as "knapp": check on the car. Fallbacks: push the corpus fully against the
  rear seats, or set the runners back by up to 12 mm (the 870 mm runner leaves
  12 mm in front of `R1`).

## Consequences

- Drawer volume drops by roughly 20 % (inner height 192.5 instead of 238 mm).
  The three boxes weigh about 19 kg (23.1 kg without windows, holes and grips).
  That is the price of 76 mm runners; it was hidden by the 32 mm boards before.
- The seat sits at 95.5 mm above the load floor instead of 50 mm.
- All three drawer boxes have the same height. The side walls come in two
  shapes again (`D1/D2` runner low + windows, `D3` runner high + holes), which
  is easy to tell apart.
- `V14` (carrier cheeks) becomes six cheeks of 870 × 39.5 × 18 mm. Joining
  board and cheeks (glue + screws from above, or CNC tabs like the drawer
  bottoms) is not decided yet; `C1`–`C3` are not in a CNC job yet.

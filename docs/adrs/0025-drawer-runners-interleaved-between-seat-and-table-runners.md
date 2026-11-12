# 0025: Drawer runners interleaved between the seat and table runners

Status: Accepted (2026-11-12). Amends the rail band layout in
[ADR 0021](0021-table-board-on-170-kg-runners.md) and §H1.

## Context

The dividers `M1/M2` carry runners on both faces. Until now the drawer runner
heights followed a rule of thumb: `D1/D2` at 2/3 of the box height
(≈ 202–255 mm), `D3` at 1/3 (≈ 78–131 mm). That made two runner bands overlap
by 16 mm across each divider: seat L/R (18–94) with drawer M (78–131), and
drawer L/R (202–255) with table M (239–315).

The front two holes of every runner get M5 through-bolts (V9). On a divider,
bolt end, washer and nut stand proud on the opposite face, in the neighbouring
section. Where a runner sits on that face at the same height, the nut collides
with it. Opposing 16 mm wood screws in an 18 mm divider were a second problem
in the same bands.

The builder pointed out (2026-11-12) that the drawer runners don't have to sit
at any particular height on the box, so they can be placed to avoid this.

## Decision

The seat runners (bottom of `C1/C2`) and the table runner (top of `C3`) are
fixed by their boards. The two drawer runner bands go into the free strip
between them, one above the other, with equal clearance:

- free strip on `M1/M2`: top of the seat runner (94) to bottom of the table
  runner (239) = 145 mm; two 53 mm bands leave 3 × 13 mm.
- `D1/D2` runners **107–160 mm** (lower), `D3` runners **173–226 mm** (upper).
  That order leaves room for lightening windows in all side walls (ADR 0024):
  `D1/D2` above their runner, `D3` below it. The reverse order would leave
  `D1/D2` without windows.
- `modell/modell.py` computes this from the runner heights instead of storing
  numbers, and asserts at least 5 mm clearance and that each runner stays within
  its drawer box. If the 170 kg runner turns out to be 74 mm high instead of the
  datasheet 76 mm, the clearance grows to 14.3 mm automatically.

No two runner bands on opposite faces of a divider overlap anywhere any more.

## Consequences

- Through-bolts can be used on every runner, including on `M1/M2`: the bolt end
  lands on a bare face of the neighbouring section. The element in that section
  is 20 mm away from the wall (19 mm runner + 1 mm clearance), so bolt end, washer
  and nut must stay under 20 mm proud: **V9 changes from M5 × 40 to M5 × 30**
  (18 mm wall + ~2 mm runner steel + washer + lock nut ≈ 26 mm, ~10 mm proud).
- The 16 mm wood screws on opposite faces never meet, so the screw rows no
  longer need staggering along z.
- The drawer runners now sit near the middle of each box (`D1/D2` 52–105 mm and
  `D3` 155–208 mm above the box bottom), which is fine for an 80 kg runner.
- Drawings, viewer and the drawer CNC job are regenerated from the model; the
  lightening windows move with the runner bands.

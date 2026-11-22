# 0035: Ventilation holes in the sleeping boards (T1, F1, F2), drilled by hand

Status: **Accepted** (2026-11-17). Hole Ø and grid pitch are **assumptions**
until the builder has checked which drill bits they own. Related:
[ADR 0019](0019-hinged-sleeping-boards-fold-onto-the-corpus.md) (hinged boards),
[ADR 0032](0032-lightening-the-corpus-boards-hole-grid-or-windows.md) (lightening,
open; `T1`, `F1/F2` stay solid *for weight*). Idea:
[docs/ideas/04](../ideas/04-lueftungsloecher-liegeflaeche.md).

## Context

The mattress (80 mm foam) lies directly on 18 mm birch ply. A sleeper gives
off moisture all night, and a closed board under foam does not let it out.
The builder wants small holes drilled into the three sleeping boards after the
fact: lines along and across, one hole at every crossing. The holes must be big
enough to let air through, must not cost the boards their load capacity, and
must be simple to make by hand. The boards are already cut to size.

This is not the lightening of ADR 0032. Its purpose is air, not weight, and
the material removed is small. ADR 0032's point about `T1` stands: kneeling
loads `T1` locally, so its stiffness matters. The builder confirmed all three
boards on 2026-11-17.

## Decision

- **Grid of holes in `T1`, `F1`, `F2`** (`lueftung` in `modell/parameter.json`).
  Lines run along (z) and across (x) at a pitch of `abstand`, centred on each
  board, with the first line at least `rand` = 50 mm from the edge. There is a
  hole at every crossing of Ø `durchmesser`.
  - **Assumed Ø 20 mm on a 100 mm grid.** That removes π·10²/100² ≈ 3 % of the
    area. At any cross-section through a row of holes, 20 % of the width is
    missing, but only over 20 mm out of every 100 mm. The bending stiffness of
    the whole board drops by a few percent, well below the scatter of the ply
    itself. Below about Ø 15 mm a hole hardly moves air; above about Ø 25 mm
    the foam starts to print through.
- **Holes are left out** (`_lueftung()` in `modell/modell.py`) where the hole's
  edge comes closer than `abstand_hindernis` = 15 mm to:
  - a hinge leaf `H1-*`/`H2-*`;
  - for `T1`, any wall below it: `S1/S2`, `M1/M2`, `R1` and their tenons.
    A hole there would hit the tenon or the wall's end grain and would not
    breathe anyway.

  With the assumed values this gives `T1` 78, `F1` 71 and `F2` 41 holes,
  190 in total. The columns over `M1/M2` are left out on `T1`, as are three
  holes next to each hinge line.
- **Drilled by hand, not on the CNC.** The boards are already cut. The holes
  are not in the corpus DXF (`b1-t1.dxf` would no longer serve `B1` too), and
  `AUFTRAG.md` does not mention them. The procedure:
  1. Mark the lines on the board.
  2. Drill with a Forstner bit, square to the board (drill stand or guide),
     with a sacrificial board clamped underneath against tear-out.
  3. Break both edges lightly.
- **Drawing:** new last sheet "Bohrplan Liegefläche T1 / F1 / F2" (1:10,
  `zeichne_bohrplan()`). It shows the grid lines dashed for marking out, holes
  as circles, crossings without a hole left empty, and the chains "edge ·
  n × 100 · edge" from the board edges.
- **Viewer:** `T1`, `F1`, `F2` are drawn as extruded shapes with real holes
  (`lochBrett()`). They fold with the boards in the driving modes and appear in
  the explosion view.

## Amendment 2026-11-17: pattern rotated by 45°

The builder prefers the look of holes on diagonal lines and accepts fewer
holes. `lueftung.muster` is now `diagonal`:
- Two families of 45° lines cross, with a hole at every crossing.
- `abstand` = 140 mm is now the spacing of the lines along a board edge, a
  round number that is easy to mark. Along a line the holes are 140/√2 ≈ 99 mm
  apart, so the density is about the same as before.
- Seen along the board edges, this is a 70 mm helper grid with every other
  crossing drilled (checkerboard). Of the two checkerboard halves, the model
  takes the one with more crossings.
- Result: `T1` 78, `F1` 68, `F2` 38 holes, 184 in total instead of 190. About
  3.2 % of the area is removed. (Since ADR 0037, 2026-11-22: the measured strap
  hinges cost 3 holes each in `F1` and `F2` → 78 / 65 / 35, 178 in total.)

There are now two drawing sheets, and both marking methods lead to the same
holes:
- Sheet 12 shows the helper grid with chains "edge · n × 70 · edge".
- Sheet 13, "Randmaße" (`zeichne_bohrplan_rand()`), shows where each diagonal
  meets the four board edges, as ordinates from the bottom-left corner (driver
  side, front edge). Close marks get alternating tick lengths so their numbers
  stay readable. The builder sets all marks and joins them with a straightedge.

`muster: gerade` still gives the original along/across grid.

## Consequences

- Changing `durchmesser`/`abstand` after the builder checks the drill bits
  updates the model, drawing and viewer on the next regeneration.
- The strap holes for `F2` (V15) are set on the car. Place them between vent
  holes, at least 15 mm away. The shim strips under `F1` (V16) may cover a row
  partly, which does no harm.
- With summer-only use (Hinweise-Sommernutzung) the holes are a cheap extra
  against a damp mattress underside. They do not replace airing the mattress.
- The air under `T1` mixes with the storage space below. Damp textiles in the
  drawers would now also reach the mattress from below.

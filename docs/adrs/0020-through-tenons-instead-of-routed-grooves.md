# 0020: Through tenons instead of routed grooves

Status: Accepted. Amends [ADR 0018](0018-continuous-bottom-and-lid-walls-in-grooves.md)
(the grooves; `B1` and `T1` still run through at full size).

## Context

ADR 0018 housed the walls in grooves and rebates routed over the full 900 mm of
`B1` and `T1`. The builder has no matching router bit, only a circular saw and a
jigsaw, and considers a finger-style joint within reach of those tools
(2026-11-04). The decision was also made under time pressure: boards were being
ordered from a store's cutting service, so the cut sizes had to be final.

## Decision

Walls carry **tenons** that pass through `B1` and `T1`:

- **Terms:** *Zapfen* is the piece protruding from a wall. *Schlitz* is a closed
  hole for it. *Aussparung* is a notch open to the board edge.
- **Cross-section:** 18 × 50 mm, through the full 18 mm board.
- **`M1/M2`:** 3 tenons per long edge in closed slots in `B1`/`T1`, starting 50, 416
  and 782 mm from the front. Plus one rear tenon, mid-height, through a slot in `R1`.
- **`S1/S2`:** 3 tenons per long edge in open notches at the side edges, starting
  50, 425 and 800 mm from the front.
- **`R1`:** 4 tenons per long edge in open notches at the rear edge, centred at
  x = ±155 and ±475 mm.
- **Cut sizes:** walls are 340 mm high (302 + 2 × 19 mm, including 1 mm per edge
  to sand flush). `M1/M2` is cut to 900 mm (882 + 18 mm rear tenon), the same as `S1/S2`.
  The rear tenon has no sanding allowance, because a slightly short tenon on the
  back face carries nothing.
- **Screws and glue stay:** tenons take over alignment and shear from the groove.
  Screws through `B1`/`T1` into the wall edges still take tension.
- **Model:** `eckausbildung: gezapft`, parameters in `zapfen`. `genutet` and its
  drawings are removed; `stumpf` stays as the fallback.

Why these counts:

- **`M1/M2` has three tenons, not two.** Top and bottom plates already stop the wall
  tipping. The risk is bowing: two tenons would leave about 700 mm unguided, while
  the drawers have only about 1 mm of side clearance.
- **`R1` has four tenons, not three.** The hinges `V17` sit on `T1` at x = 0 and
  ±410 mm. A centred tenon would put hinge screws into its end grain, so the
  positions avoid them with at least 10 mm clearance.

## Consequences

- ADR 0018's "never through" rule no longer applies. It protected recesses running
  the full 900 mm; short local slots leave `B1` and `T1` largely intact.
- The wall height no longer depends on a measured groove depth, so all walls can be
  ordered now. Overall box height (338 mm) and clear height (302 mm) are unchanged.
- **Assembly order is forced:** the `M1/M2` tenons enter `B1` vertically, but the rear
  tenon enters `R1` horizontally. It works only because the `R1` notches are open to
  the rear: `M1/M2` into `B1`, slide `R1` on from behind, then `S1/S2`, then `T1`.
  Dry-fit before gluing.
- More precision is needed than with a groove: about 30 individual fits, and 10 long
  wall edges to cut down between tenons. The 302 mm between shoulders matters most
  right next to the tenons; between them the edge may sit back up to about 0.5 mm,
  with screws kept close to the tenons so they don't pull the board across a gap.
- A plain circular saw cannot start inside a board safely and leaves a curved cut
  end, so cuts between tenons are made with the jigsaw and filed to the line.
- Tenon ends are visible on the sleeping surface, the underside, and the back of `R1`.
- If sawing fails on a test piece, the 340 mm boards can still be cut down to 302 mm
  for the `stumpf` fallback (`M1/M2` then to 882 mm).
- Tenons are separate boxes in the model (`M1-Z1u`, `…-Zh`), flagged `gewollt`
  (green) and kept out of the problem count. Red overlaps stay at 13.

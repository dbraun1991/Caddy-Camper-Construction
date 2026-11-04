# 0020: Through tenons instead of routed grooves

Status: Accepted. Amends [ADR 0018](0018-continuous-bottom-and-lid-walls-in-grooves.md)
(the grooves; `F1` and `A1` still run through at full size).

## Context

ADR 0018 housed the walls in grooves and rebates routed over the full 900 mm of
`F1` and `A1`. The builder has no matching router bit, only a circular saw and a
jigsaw, and considers a finger-style joint within reach of those tools
(2026-11-04). The decision was also made under time pressure: boards were being
ordered from a store's cutting service, so the cut sizes had to be final.

## Decision

Walls carry **tenons** that pass through `F1` and `A1`:

- **Terms:** *Zapfen* is the piece protruding from a wall. *Schlitz* is a closed
  hole for it. *Aussparung* is a notch open to the board edge.
- **Cross-section:** 18 × 50 mm, through the full 18 mm board.
- **`B3`:** 3 tenons per long edge in closed slots in `F1`/`A1`, starting 50, 416
  and 782 mm from the front. Plus one rear tenon, mid-height, through a slot in `B1`.
- **`B2`:** 3 tenons per long edge in open notches at the side edges, starting
  50, 425 and 800 mm from the front.
- **`B1`:** 4 tenons per long edge in open notches at the rear edge, centred at
  x = ±155 and ±475 mm.
- **Cut sizes:** walls are 340 mm high (302 + 2 × 19 mm, including 1 mm per edge
  to sand flush). `B3` is cut to 900 mm (882 + 18 mm rear tenon), the same as `B2`.
  The rear tenon has no sanding allowance, because a slightly short tenon on the
  back face carries nothing.
- **Screws and glue stay:** tenons take over alignment and shear from the groove.
  Screws through `F1`/`A1` into the wall edges still take tension.
- **Model:** `eckausbildung: gezapft`, parameters in `zapfen`. `genutet` and its
  drawings are removed; `stumpf` stays as the fallback.

Why these counts:

- **`B3` has three tenons, not two.** Top and bottom plates already stop the wall
  tipping. The risk is bowing: two tenons would leave about 700 mm unguided, while
  the drawers have only about 1 mm of side clearance.
- **`B1` has four tenons, not three.** The hinges `V17` sit on `A1` at x = 0 and
  ±410 mm. A centred tenon would put hinge screws into its end grain, so the
  positions avoid them with at least 10 mm clearance.

## Consequences

- ADR 0018's "never through" rule no longer applies. It protected recesses running
  the full 900 mm; short local slots leave `F1` and `A1` largely intact.
- The wall height no longer depends on a measured groove depth, so all walls can be
  ordered now. Overall box height (338 mm) and clear height (302 mm) are unchanged.
- **Assembly order is forced:** the `B3` tenons enter `F1` vertically, but the rear
  tenon enters `B1` horizontally. It works only because the `B1` notches are open to
  the rear: `B3` into `F1`, slide `B1` on from behind, then `B2`, then `A1`.
  Dry-fit before gluing.
- More precision is needed than with a groove: about 30 individual fits, and 10 long
  wall edges to cut down between tenons. The 302 mm between shoulders matters most
  right next to the tenons; between them the edge may sit back up to about 0.5 mm,
  with screws kept close to the tenons so they don't pull the board across a gap.
- A plain circular saw cannot start inside a board safely and leaves a curved cut
  end, so cuts between tenons are made with the jigsaw and filed to the line.
- Tenon ends are visible on the sleeping surface, the underside, and the back of `B1`.
- If sawing fails on a test piece, the 340 mm boards can still be cut down to 302 mm
  for the `stumpf` fallback (`B3` then to 882 mm).
- Tenons are separate boxes in the model (`B3-1-Z1u`, `…-Zh`), flagged `gewollt`
  (green) and kept out of the problem count. Red overlaps stay at 13.

# 0018: Continuous bottom and lid; walls housed in grooves between them

Status: Accepted (continuous `B4`/`A1`) — grooves planned, depth 6 mm to be confirmed at the bench. Amends [ADR 0007](0007-dowel-screw-bracket-joinery.md).

## Context

The cut list gave the walls `B2`/`B3` 320 mm height *and* the bottom `B4` and back
wall `B1` the full 1,120 mm width. That only works if somebody decides which
panel runs through at each corner; the overlap check (ADR 0015) showed them
colliding at every corner. The workshop drawings offered three variants.

The builder's decision (2026-10-17): **bottom plate `B4` and lid `A1` run through
at the full 1,120 × 900 mm**; all walls stand between them. On top of that the
builder intends to rout recesses into `B4` and `A1` so the walls plug in —
which turns the overlap into an intended housing joint.

## Decision

- `B4` and `A1`: 1,120 × 900 × 18 mm, uninterrupted. All walls stand between them.
- Walls are housed in `B4` and `A1`, **6 mm deep** (⅓ of the 18 mm board, the
  usual limit), as a **rebate (Falz)** along the open-to-the-outside edges
  (`B2` left/right, `B1` back) and as a **groove (Nut)** for the dividers `B3`.
  Wall height becomes 302 + 2 × 6 = **314 mm**; clear interior height stays 302 mm.
- `B1` sits between the side walls (1,084 mm), `B3` runs up to `B1` (882 mm).
- Parameters: `korpus.nut_tiefe` and `eckausbildung` (`genutet` | `stumpf`) in
  `modell/parameter.json`. `stumpf` (walls 302 mm, no recess) is kept as the
  fallback if routing turns out impractical — the cut sizes of `B4`/`A1` are the
  same in both.

Cut sizes (`genutet`):

| Part | Size |
|---|---|
| `B4`, `A1` | 1,120 × 900 |
| `B2` × 2 | 900 × 314 |
| `B1` | 1,084 × 314 |
| `B3` × 2 | 882 × 314 |

## Consequences

- No unresolved corner overlaps remain. The model marks the ten wall-in-recess
  overlaps as intended (green in the drawings) and keeps them out of the
  problem count.
- Joinery (amends ADR 0007): the recess takes over what the dowels did —
  alignment and shear — and the walls no longer stand on bare end grain. Screws
  from above through `A1` and from below through `B4` into the wall edges stay
  for tension; the corner brackets become optional reserve. Dowels (`F4`) are
  only needed for the `stumpf` fallback.
- The old instruction to screw the dividers "from outside through the side
  walls" was geometrically impossible (`B3` is parallel to `B2` and does not
  touch it). Dividers are now fixed by their grooves plus screws through `B4`,
  `A1` and `B1`.
- `B4` and `A1` can be cut now; the walls only once the groove depth is
  confirmed (314 vs. 302 mm).
- Tooling: router with an 18 mm straight bit (or table saw in several passes).
  Birch multiplex is often slightly over nominal thickness — rout a test groove
  in an offcut and fit it to the actual board before cutting the real panels.
  Most cutting services do not rout grooves.

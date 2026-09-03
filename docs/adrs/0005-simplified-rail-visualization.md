# 0005: Simplified rail visualization — inner member only

Status: Accepted

## Context

Each of the 6 movable elements (3 drawers, 2 seat boards, 1 table board) rides a
real pair of full-extension runners, each runner itself made of an outer
(fixed, wall-mounted) member and an inner (moving, load-bearing) member. An
earlier version of `index.html` modeled both: a static `mRunner`-colored channel
box fixed to the section wall, plus mode-based runner-line helpers in `bankG`/
`packG`. In practice the fixed outer channel visually overlapped the clearance
gap left for it in the element-width formula (`section width − 2×runner − 2mm
gap`), making the render ambiguous about where the real cut line was.

## Decision

Render only the inner rail member — the part that physically travels with the
element — as a distinct red (`mRailRed`) box (`railDuo()`), parented in the
static group `sg` and moved in lockstep with its element by `setMode`. The
outer, wall-fixed rail member is not rendered at all; its presence is implied
by the clearance already subtracted in the element-width formula and documented
in `List_of_Materials.md` §E.

## Consequences

- The render shows exactly what changes position (in ↔ out) and exactly what's
  cut to size (element width already accounts for both rail members), with no
  extra geometry that could be mistaken for a cuttable part.
- Someone reading the viewer needs `List_of_Materials.md` §E (rail dimensions,
  the `76 mm hoch` runner height, mounting) to get the outer/fixed rail's own
  geometry — the viewer intentionally doesn't duplicate that.
- If a future need arises to visually verify wall-mounting clearance (not just
  element clearance), that's a reason to revisit this decision — not to
  silently add outer-rail geometry back without updating this ADR.

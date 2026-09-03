# 0008: Heavy-duty 900 mm full-extension runners over shorter soft-close runners

Status: Accepted

## Context

All 6 movable elements (3 drawers, 2 seat boards, 1 table board) need to travel
the full 900 mm section depth to clear the load bay, and the seat/table boards
must support a seated adult's full weight when extended — not just hold their
own weight like a typical furniture drawer. `List_of_Materials.md` §E evaluated
three concrete runner options against these two constraints (extension length
and load rating).

## Decision

Use full-extension, lockable runners rated for the load at each position, not
general-purpose furniture slides:

- Drawers: AOLISHENG 900 mm, 150 kg load rating, 19 mm thickness per side
  (Amazon B086JQLXRJ) — the 19 mm thickness is load-bearing in the geometry
  itself, subtracted twice from every section's interior width to get element
  width (see [ADR 0006](0006-three-section-corpus-layout.md)).
- Seat/table boards: 900 mm heavy-duty, 95 kg rating (Amazon B09XXDHW1C) — lower
  capacity accepted here because these carry a person's weight but not stored
  cargo weight simultaneously.
- Rejected: a 550 mm soft-close runner (Amazon B08625F5G9) — soft-close is a
  nice-to-have, but 550 mm extension doesn't clear the 900 mm section depth at
  all; using it would require redesigning the whole layout around a shorter
  pull-out, not just swapping a part number.

Both selected options require lock/arretierung — an unlocked full-extension
runner is not acceptable given the elements' role as seating/step surfaces.

## Consequences

- Runner thickness (19 mm/side) is baked directly into the corpus width
  formula in `index.html` and `List_of_Materials.md` §B/§C/§D
  (`runnerT = 19`). Switching to a runner of different thickness is not a
  hardware-only change — it shifts every section's element width and must be
  propagated through both files.
- The 95 kg-rated board runners are the load-bearing limit of the whole seating
  arrangement (two people on one extended board approaches that limit) —
  this is a constraint to flag if the sitting/table use case ever expands
  (e.g. adding a second simultaneous occupant per board).
- Locking hardware is a hard requirement, not a preference — any substitute
  runner considered in the future must retain a lock/detent at full extension.

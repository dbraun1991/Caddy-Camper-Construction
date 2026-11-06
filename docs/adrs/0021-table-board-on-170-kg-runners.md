# 0021: Table board C3 on the 170 kg runners

Status: Accepted — amends [ADR 0017](0017-850-mm-runners-in-900-mm-corpus.md) (runner assignment for `C3`)

## Context

ADR 0017 put the table board `C3` on the 80 kg / 53 mm runner, on the
assumption that it is "a table, not a seat". The builder has now stated
(2026-11-06) that it must be possible to sit on the table board too — at the
very least it must not break when someone does. A person on the 850 mm extended
board is the same load case as on the seat boards `C1`/`C2`, which ADR 0017
already gave the 170 kg runner. 80 kg rated load is too little for a person at
full extension, and the lock requirement from ADR 0008 applies as for the seats.

The runners were ordered on 2026-11-04 as 2 pairs of 170 kg and 4 pairs of
80 kg.

## Decision

- `C3` runs on the **AOLISHENG 850 mm · 170 kg · 76 mm** runner, like `C1`/`C2`
  (`schienen.zuordnung.C3 = "schwer"` in `modell/parameter.json`).
- Runner count: **3 pairs 170 kg** (`C1`–`C3`) + **3 pairs 80 kg** (drawers
  `D1`–`D3`). The order needs one more 170 kg pair; one 80 kg pair is surplus.
- Element widths are unchanged: both types are planned at 19 mm per side, and
  the 170 kg type is specified at 19.2 + 0.5 mm.

## Consequences

- The `C3` rail band, flush with the top of `C3`, grows from 262–315 to
  **239–315 mm**. On the dividers `M1/M2` it now overlaps the L/R drawer band
  (202–255) by 16 mm in height on the opposite face. (The seat band L/R 18–94
  already overlapped the middle drawer band 78–131 by 16 mm.) With 16 mm screws
  in an 18 mm divider, screws in these bands must not sit opposite each other:
  check the hole rows on delivery and stagger them along z if needed (§H1).
- Rails: ~501 € instead of ~458 € (+~43 €).
- ADR 0013 (still Proposed) now faces a 76 mm runner on all three boards. For
  `C3`, a 76 mm carrier cheek would hang down into the drawer `D3` zone (D3 box
  top at y = 278), so option 1 would cost `D3` height.
- Tipping/hold-down (ADR 0016) was estimated for one person on one board. With
  all three boards sat on at once the hold-down force roughly triples; the
  estimate stays a single-person figure until the eye positions are known.
- The table board itself (384 × 850 × 32 mm, cantilevered 850 mm) must carry a
  person's weight, not only the runner. Checked as part of ADR 0013, since the
  board build-up (cheeks or not) decides its stiffness.

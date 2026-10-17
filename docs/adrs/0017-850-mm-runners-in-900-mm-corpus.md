# 0017: 850 mm runners in the 900 mm corpus

Status: Accepted — amends [ADR 0008](0008-heavy-duty-full-extension-runners.md) (runner length only)

## Context

ADR 0008 chose 900 mm runners because the corpus is 900 mm deep. The overlap
check from ADR 0015 showed that this never fitted: the back wall `B1` (18 mm)
leaves **882 mm** of clear depth, so 900 mm runners, the 880 mm drawer boxes
behind their 18 mm fronts, and the 900 mm seat/table boards all ran 14–18 mm
into the back wall (18 overlaps).

The 900 mm corpus depth itself has a real reason: the lid `A1` is part of the
sleeping platform and must reach the folded rear seats where `A2` starts. The
measured load depth is 920–930 mm (2026-10-17). The builder wants to keep the
corpus at 900 mm and keep ~2 cm of air at the rear-seat end, not use the space
for a deeper corpus.

Options:

- **Corpus 918 mm** (back wall behind 900 mm clear depth) — keeps 900 mm runners,
  but only 2–12 mm left to the rear seats.
- **Thinner back wall** (12 mm) — 888 mm clear, still too short, and weakens the
  main anti-racking panel (ADR 0007).
- **850 mm runners in the unchanged corpus** — chosen.

## Decision

- Corpus stays **900 mm** deep; 20–30 mm air to the rear seats.
- **One runner for all six positions** (3 drawers, 2 seat boards, 1 table
  board): AOLISHENG 850 mm full-extension, 170 kg, 76 mm high, with lock
  (104.99 € per pair, seen 2026-10-17). The separate 95 kg / 53 mm board
  runner from ADR 0008 is dropped — it was only found in 900 mm, and one part
  for every position means one thickness, one height and one mounting pattern.
- Derived in `modell/parameter.json`: drawer box depth **830 mm** (runner − 20,
  as before), seat/table board depth **850 mm** (= runner length).
- Behind the runners and elements: **32 mm** clear space before `B1`.

## Consequences

- The 18 back-wall overlaps are gone; what remains are the open corner
  construction and the drawer-front/runner conflict.
- Extension in Bankmodus/Packmodus is 850 mm instead of 900 mm. The tipping
  estimate in ADR 0016 (based on 900 mm) stays as a slightly conservative figure.
- **To verify before ordering:** the runner thickness per side. The listing
  gives the 76 mm height but not the thickness; every element width is computed
  with 19 mm (ADR 0006/0008). A different thickness changes all element widths
  and must go into `schienen.staerke`.
- The lock requirement of ADR 0008 is unchanged. ADR 0008's note that the 95 kg
  board runners are the limit of the seating arrangement no longer applies —
  the boards now run on 170 kg runners.
- The seat/table boards now face a **76 mm** runner instead of 53 mm, which
  changes the numbers in the still-open ADR 0013.

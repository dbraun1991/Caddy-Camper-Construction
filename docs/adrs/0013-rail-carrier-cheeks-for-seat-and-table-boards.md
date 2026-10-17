# 0013: Carrier cheeks to give the seat/table boards a full-height rail face

Status: Proposed — needs a decision before cutting `C1`–`C3`

## Context

Planning the junctions in detail (ADR 0011, `List_of_Materials.md` §H) surfaced a
conflict between two numbers that were each correct in isolation:

- `C1`–`C3` (seat boards L/R, table board M) are **32 mm** thick
  (`boardH = 32` in `index.html`, §C in the materials list).
- The selected runners are **76 mm** high for the drawer option (B086JQLXRJ) and
  **53 mm** for the board option (B09XXDHW1C). `index.html` already acknowledges
  this — the comments around the rail Y-bands note the rail "überragt Brett nach
  oben" by 44 mm.

A rail's inner member transfers load through the screws along its height. Screwed
to a 32 mm edge, only the lowest row of holes is in material: the upper two
thirds of the member carry nothing, and the board's 32 mm edge is end grain — the
orientation ADR 0007 and ADR 0011 both rejected for load paths. These are the
boards a person sits on at 900 mm extension, where the cantilever moment is
highest, so this is the worst joint in the build to leave underspecified.

The drawer boxes have no such problem: their 248 mm sides give the member a full
face to sit on (ADR 0011).

Options:

1. **Carrier cheeks (Trägerwangen)** — an 18 mm multiplex strip, full rail height
   and the full 900 mm length, glued and screwed along each long edge of the
   board. The rail member screws to the cheek's *face*; the board itself carries
   no rail screws. Board stays 32 mm, but its top surface rises to the top of the
   cheek, so the element's overall height grows to the rail height (53 or 76 mm)
   and the section's Y-bands in `index.html` shift.
2. **Bottom-mounted runners** — lay the rails flat on the bottom plate (`F1`)
   under `C1`/`C2`, which already rest on it. Avoids any edge-screwing, but costs
   the rail height out of the 302 mm interior and does not work for `C3`, which
   is at the *top* of the middle section.
3. **Thicken the boards to rail height** — 53 mm solid board. Simple, but heavy,
   expensive in multiplex, and still only usable with the 53 mm runner.

> **Update 2026-10-17 ([ADR 0017](0017-850-mm-runners-in-900-mm-corpus.md)):**
> runners are now AOLISHENG 850 mm: **76 mm high on the seat boards `C1`/`C2`**
> (170 kg) and **53 mm on the table board `C3`** (80 kg). For `C3` the analysis
> below is unchanged. For `C1`/`C2`, option-1 cheeks would be 76 mm high — the
> element grows by 44 mm instead of 21 mm and no longer fits the current height
> chain (seat board y 18–50 directly below the drawer zone from y 50); option 3
> would mean a 76 mm board. The recommendation has to be re-evaluated for
> `C1`/`C2`. The runners themselves are chosen; only cutting `C1`–`C3` is
> blocked.

## Decision

*Not yet taken.* Recommendation is **option 1 (carrier cheeks)** with the 53 mm
runner (B09XXDHW1C) for all three boards: it keeps the documented 32 mm board,
puts every rail screw into 18 mm face grain, and costs 21 mm of interior height
rather than 53 mm. The §C note "32 mm = 18 mm Multiplex + 14 mm Auflageleiste"
already anticipates a glued-on strip — this makes that strip the structural
member and gives it the height it actually needs.

Taking this decision means propagating a new element height through `index.html`
(`boardH`, the four rail Y-band constants), `List_of_Materials.md` §B/§C, and the
height table in `README.md`. It is therefore a geometry change, not a hardware
swap, and is held open deliberately rather than applied silently.

## Consequences

- Until this is decided, `C1`–`C3` and the board runners must not be cut or
  ordered; everything else in the build (corpus, drawers, platform) is unaffected
  and can proceed.
- Whichever option wins, the drawer-side numbers and ADR 0006's width formula
  stay valid — this touches heights only.
- Related: `index.html` computes `drawerH = 260` mm while `List_of_Materials.md`
  §D states 268 mm. That 8 mm divergence sits in the same height chain and should
  be resolved in the same pass.

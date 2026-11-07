# 0023: CNC export as 2D DXF with dogbones and slot clearance

Status: Accepted (2026-11-07) — the values in `cnc` are assumptions until a CNC
service has confirmed them

## Context

The builder wants to upload files to a CNC routing service and pick up finished
boards instead of cutting tenons, slots and notches with a jigsaw and circular
saw (ADR 0020). The geometry of every board already exists in the model:
`zeichnungen.brett_geometrie()` gives the finished outline, the tenons and the
slot/notch footprints for the single-board drawing sheets.

Since ADR 0020 every joint goes **through** the board, so all cuts are 2D
profiles. No pockets, no depth information.

A router leaves a radius of half the cutter diameter in every inside corner.
Square tenons then don't fit into slots with rounded corners, and a tenon with a
rounded root does not sit flush against the plate it goes through.
Nominal "18 mm" birch plywood also varies (roughly 17.6–18.3 mm), so a slot
exactly 18 mm wide may be too tight.

## Decision

- New script `modell/cnc.py` (build123d, which brings `ezdxf`; no new
  dependency) writes per corner variant to `docs/cnc/<variante>/`:
  - one **DXF per distinct board** (`b1-t1`, `s1-s2`, `m1-m2`, `r1`, `f1`, `f2`).
    Identical boards share a file; the script asserts they really are identical.
  - `alle-teile.dxf` with every board in its order quantity side by side, as an
    overview, **not nested**. Nesting is left to the service.
  - `AUFTRAG.md`: parts list and every assumption, meant to be sent along.
- DXF format: AC1027, mm, 1:1, origin at the board's lower-left corner. Layers
  `AUSSENKONTUR` (outer profile) and `INNENKONTUR` (closed slots). Lines and
  arcs only, no text, **no drill holes** (hinges, straps and screws are marked
  and drilled at assembly, by the builder's choice).
- **Dogbones** in every concave corner: a circle with the cutter's diameter
  through the corner point, centred on the bisector in the waste. Concave
  corners are found generically from the contour, so tenon roots, notches,
  closed slots and the step at the rear of `M1`/`M2` are all covered.
- **Clearance**: slots and notches grow by `passungsluft` in each direction
  (half on each side); tenons stay at their nominal size. The 1 mm sanding
  allowance on the tenons (ADR 0020) stays.
- Parameters in `modell/parameter.json` → `cnc`, all marked as assumptions:
  cutter Ø 6 mm, clearance 0.2 mm, `innenecken: "dogbone"` (or `"keine"` if
  the service adds the reliefs itself), sheet thickness 18 mm, 20 mm part spacing.
- `AUFTRAG.md` states whether boards may be flipped during nesting. The
  script derives this from each contour's mirror symmetry instead of asserting
  it.

## Consequences

- The tenon-and-slot joint becomes practical without hand sawing, and the
  drawings stay the reference for checking the delivered parts.
- Dogbones remove a little material at every inside corner. They are hidden
  inside the joint, except at the notch corners on the edges of `B1`/`T1`,
  where small round reliefs stay visible.
- The cutter diameter and clearance must be confirmed with the service and then
  set in `parameter.json`, followed by a regeneration. A test piece (one tenon,
  one slot) before the full job is recommended.
- `F1`/`F2` are plain rectangles and could go to a cheaper panel saw instead.
  They are included so everything can be picked up in one job.
- Drawers and seat/table boards are not exported yet. Their dimensions are set
  on the finished corpus (open findings in `AGENTS.md`).

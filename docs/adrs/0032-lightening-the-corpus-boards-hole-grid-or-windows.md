# 0032: Lightening the corpus boards: hole grid or windows (open)

Status: **Proposed, not decided** (2026-11-13). Nothing has been changed in the
model. Related: [ADR 0020](0020-through-tenons-instead-of-routed-grooves.md)
(through-tenons, cut by hand so far), [ADR 0023](0023-cnc-dxf-export-with-dogbones.md)
(CNC export), [ADR 0026](0026-windows-for-outer-drawers-hole-grid-for-middle-drawer.md)
(hole grid in the drawers).

## Context

The corpus boards (`B1`, `T1`, `S1/S2`, `M1/M2`, `R1`, `F1/F2`) are already
bought, cut to size and on site. The builder asked whether they could still be
CNC-perforated to save weight, given that two people of about 70 kg will sleep
on the box. The builder's preference is no windows in the corpus; if anything
is removed, it should be the drawers' hole grid (Ø 25 mm on a 40 mm grid).

**Feasibility:** a CNC router can machine pre-cut panels. Each panel is
referenced to a marked corner on the vacuum table. The job file has only inner
contours and tenon reliefs, with no outer contour, and the service needs the
measured actual size of every panel. Most of the cost is set-up per panel, very
roughly 1–2 machine hours for five panels; there is no quote yet.

**Loads:** two sleepers plus mattress and fold boards come to about 160 kg,
about 0.4 kN per wall if it all sat on `T1`.
- The walls carry this in **compression**. Birch ply takes about 20–30 N/mm²,
  so even 10 % of a 900 mm wall left standing carries about 30 kN, around 80
  times the load. Wall capacity therefore argues neither for nor against
  cut-outs.
- What does matter is **stiffness**:
  - **`T1` in bending:** kneeling or standing on it puts 70–150 kg on a small
    area.
  - **The walls against racking** (cornering, braking): the corpus front is
    open, so `R1` is the only wall that resists lateral racking (in x).
    `S1/S2` and `M1/M2` resist fore-aft racking.

All figures are back-of-envelope estimates at 680 kg/m³ and typical material
values.

## Options per board

| Board | Hole grid Ø 25 / 40 | Windows (as in the drawers) | Assessment |
|---|---|---|---|
| `T1` lid (sleeping surface) | no | no | A 37.5 % ligament leaves the plate about 2.5–3 × softer: under 150 kg the front edge would bend about 16–20 mm instead of about 6.5 mm, more than the 15.5 mm gap to the table board, with stress peaks at the hole edges under a knee. **Stays solid.** |
| `F1/F2` fold boards | no | no | sleeping surface; `F2` hangs on loops. **Solid.** |
| `M1/M2` dividers | no | no | runners on both faces; only a ~29 mm strip is free. **Solid.** |
| `S1/S2` side walls | ~0.35 kg each | ~1 kg each | free band above the runners (~120 × 780 mm). Windows are acceptable if solid frames ≥ 40–50 mm stay at the tenons, the corners and the tie-down brackets (ADR 0016). |
| `R1` rear wall | ~0.75 kg | ~1.7 kg | the **only** wall against lateral racking (open front). Large windows would weaken it noticeably. **Hole grid at most.** |
| `B1` bottom | ~2 kg | ~3–4 kg | fully supported on the load floor, so bending doesn't matter. It is the plan diaphragm together with `T1`, and the tie-down base. Margins, tenon zones, the seat-runner footprint and tie-down points stay solid. Crumbs fall onto the car floor. |

Totals:

| Variant | Saving |
|---|---|
| A. no lightening | 0 |
| B. hole grid in `S1/S2` + `R1` | ~1.5 kg |
| C. hole grid in `S1/S2` + `R1` + `B1` | ~3.5 kg |
| D. windows in `S1/S2`, hole grid in `R1`, windows in `B1` (max. without loss of integrity) | ~6–6.5 kg |
| E. windows everywhere possible, incl. `R1` | ~7–8 kg, **not recommended** (racking) |

For comparison: the corpus without `F1/F2` weighs about 44 kg, the three
drawer boxes about 20 kg.

## Recommendation (Claude)

- **Not worth a CNC appointment for lightening alone:** 1.5–6.5 kg costs
  roughly 25–50 € per kilogram saved.
- **If the panels go to a CNC anyway:** in that case the tenon reliefs and the
  slots in `B1`/`T1`/`R1` would also be milled instead of cut with a jigsaw
  (ADR 0020). Add the hole grid in `S1/S2` and `R1`, optionally `B1`
  (variant B/C), as the builder prefers.
- **Windows** save about twice as much. In `S1/S2` and `B1` they keep the
  integrity if the frames are kept. In `R1` they do not.

## Open

- Should the tenon reliefs and slots of the existing blanks be CNC-milled at
  all? Only then is this ADR relevant.
- Variant A–D, and with or without `B1`.
- If yes:
  - the actual dimensions of the blanks;
  - a job type "machining of existing blanks" in `modell/cnc.py`, with no
    outer contour and a reference corner per panel;
  - hole zones in the model with solid margins at tenons, runner bands and
    tie-down points.

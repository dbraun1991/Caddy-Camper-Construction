# 0024: CNC-cut drawer boxes with finger joints, tabbed bottom and lightening windows

Status: Accepted (2026-11-12). The 80 kg runner thickness that sets the box
widths was measured the same day: 19 mm, as modelled.
Supersedes the box joinery of [ADR 0011](0011-drawer-box-panel-shear-joinery.md);
ADR 0011's front-panel and rail-attachment rules stay.

## Context

The drawer runners have arrived. ADR 0011 planned the three drawer boxes as
screwed butt joints (screws into end grain) with a 12 mm bottom screwed on
from below as the bracing panel, plus softwood cleats in every inside corner.

The builder wants the drawer boxes cut by the same CNC service as the corpus
(ADR 0023) and asked for:

- interlocking joints (fingers/tabs) instead of screws into end grain,
- material removed from the side walls to cut weight, without losing
  stiffness where it matters.

Options considered for the bottom, given to the builder on 2026-11-12:

- **Bottom in a routed groove**: the classic drawer joint, but a groove is a
  pocket (depth cut). Every other part of the project is a 2D through-cut.
- **Bottom with tabs through slots in all four walls** (chosen): 2D only, the
  same tenon-and-slot principle as the corpus (ADR 0020). The slot ends show on
  the outside of the walls.
- Bottom screwed on from below as in ADR 0011, finger joints only at the corners.

Options for the lightening cut-outs: large through windows (chosen), shallow
pockets (wall stays closed, roughly half the saving, much longer machining
time), or many small round holes.

## Decision

All drawer box parts are 2D through-cuts generated from the model
(`modell.schubladen_bretter()` → `modell/cnc.py` → `docs/cnc/schubladen/`).
Parameters live in `modell/parameter.json` → `schubladen`. Outer box sizes are
still taken from the `D1`–`D3` boxes in `teile()`, so they follow the runner
thickness and section widths automatically.

- **Part codes** per box: `-S` side wall (2 per box), `-E` end wall (box front
  and back, identical, 2 per box), `-B` bottom. *Since [ADR 0027](0027-no-drawer-front-panels-box-front-with-grip-cut-out.md):
  `-E1` front with grip and `-E2` rear, no front panels.* `D1-F`…`D3-F` stay the visible
  front panels. `D1`/`D2` boxes are identical, so their parts share a DXF.
- **Corners: finger joints** over the box height, `zinken_anzahl` = 7 fields
  (odd, so the side walls carry the top and bottom fingers). Fingers are
  18 mm + 1 mm sanding allowance long, sockets get the CNC clearance, inside
  corners get dogbones (ADR 0023).
- **Bottom: 12 mm with tabs** 50 mm wide (5 per long edge, 2 per short edge)
  through 12 mm slots in all four walls, 10 mm above the wall's lower edge.
  The box is glued in one go: bottom on the bench, side walls on, end walls
  pushed on along their normal (that direction engages both the fingers and the
  bottom tabs).
- **Walls are the full box height** (260 mm); the bottom sits inside, so the
  usable inner height drops from 248 to 238 mm.
- **Lightening windows** in the side walls only: 4 windows per free band, corner
  radius 20 mm (≥ cutter radius, so no dogbones). Solid zones that always stay:
  the runner band ± 15 mm (taken from the model's rail position, [ADR 0025](0025-drawer-runners-interleaved-between-seat-and-table-runners.md):
  `D1/D2` runner 52–105 mm, `D3` runner 155–208 mm above the box bottom), 30 mm top
  rim, 30 mm web above the bottom slots, 50 mm next to the finger zone, 40 mm
  webs between windows. A band shorter than 60 mm gets no windows. Result:
  `D1/D2` have one row above the runner, `D3` one row below it.
  *Amended by [ADR 0026](0026-windows-for-outer-drawers-hole-grid-for-middle-drawer.md):
  `D3` gets a grid of Ø 25 mm holes in that band instead of windows.*
- ADR 0011 still applies to: rail inner members screwed to the side faces with
  3.5 × 16 mm screws (now into the solid band), and the front panel mounted
  last from inside the box.

## Consequences

- No corner screws, no bottom screws and no corner cleats: `V8` and `V12` are no
  longer needed, `V7` only for the front panels. The corners now carry load
  through glued finger joints instead of the bottom panel alone.
- Weight (since ADR 0026): about 23.0 kg for the three boxes without front
  panels. Originally 22.2 kg with windows everywhere, 4.2 kg less
  than without windows (680 kg/m³ assumed). The windows are a modest saving;
  most of the mass is the 18 mm walls.
- Small items can fall through the windows into the corpus. Accepted by the
  builder; a liner or bag in the drawer solves it if it becomes a nuisance.
- Fingers and tabs stand 1 mm proud and must be sanded flush **before** the
  runners are mounted.
- The glue-up is one step with 4 walls + bottom and many glue faces; dry-fit
  first, and use a glue with enough open time.
- The box widths follow the 80 kg runner thickness
  (`schienen.typen.leicht.staerke`, measured 19 mm). Before ordering, check the
  runner's screw holes against the solid band left in the side walls. The cutter
  diameter and clearance remain the ADR 0023 assumptions, now also for the
  12 mm sheet.
- The 3D viewer renders each drawer box from its CNC boards
  (`modell.schubladen_3d()`: outline with fingers and tabs, slots and rounded
  windows as holes, extruded by the board thickness and placed by origin + axes).
  The `D1`–`D3` blocks stay in the model for the drawings and the overlap check,
  but are not drawn in the 3D tab.

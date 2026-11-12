# Architecture Decision Records

This folder records the non-obvious decisions behind this project — both the
3D viewer's software architecture and the physical camper build. Each ADR is a
short, immutable record: once accepted, don't edit it to reflect new
information — write a new ADR that supersedes it and link back.

Part codes in all ADRs follow the current scheme in `List_of_Materials.md`
("Bezeichnungen"); on 2026-10-17 the floor plate `B4` became `F1` and the
fastener positions `F1`–`F17` became `V1`–`V17`; on 2026-11-07 the boards got
mnemonic codes ([ADR 0022](0022-mnemonic-board-codes.md): `F1`→`B1`, `B1`→`R1`,
`A1`→`T1`, `A2`/`A3`→`F1`/`F2`, `B2-F`/`B2-B`→`S1`/`S2`, `B3-1`/`B3-2`→`M1`/`M2`,
hinges `S1-*`/`S2-*`→`H1-*`/`H2-*`). Both times the ADRs were updated
accordingly, so a code in an older ADR always means the current part.

Format: lightweight [MADR](https://adr.github.io/madr/)-style — Status, Context,
Decision, Consequences.

| # | Title | Status |
|---|---|---|
| [0001](0001-self-contained-single-file-viewer.md) | Self-contained single-file viewer, no build step | Accepted, amended by 0015 |
| [0002](0002-pinned-threejs-r128-via-cdn.md) | Pinned Three.js r128 via CDN | Accepted |
| [0003](0003-real-world-mm-scale-factor.md) | Model in real-world millimeters with a single scale constant | Accepted |
| [0004](0004-static-scene-graph-with-z-position-toggle.md) | Static scene graph with Z-position toggling instead of per-mode subtrees | Accepted, amended by 0019 |
| [0005](0005-simplified-rail-visualization.md) | Simplified rail visualization: inner member only | Superseded by 0030 |
| [0006](0006-three-section-corpus-layout.md) | Three-section corpus layout (312 / 424 / 312 mm) | Accepted |
| [0007](0007-dowel-screw-bracket-joinery.md) | Dowel + screw + corner-bracket joinery over glue-only or biscuits | Accepted, amended by 0018 |
| [0008](0008-heavy-duty-full-extension-runners.md) | Heavy-duty 900 mm full-extension runners over shorter soft-close runners | Accepted, length amended by 0017 |
| [0009](0009-translucent-caddy-shell-overlay.md) | Translucent Caddy shell as a separate, toggled overlay group | Accepted |
| [0010](0010-detailed-caddy-shell.md) | More detailed Caddy shell: door openings, rear-seat states, load-floor plane | Accepted |
| [0011](0011-drawer-box-panel-shear-joinery.md) | Drawer boxes braced by their bottom panel, not by corner joints | Box joinery superseded by 0024, front panels by 0027 |
| [0012](0012-non-destructive-vehicle-tie-down.md) | Non-destructive tie-down via factory lashing eyes, no holes in the body | Accepted, amended by 0016 |
| [0013](0013-rail-carrier-cheeks-for-seat-and-table-boards.md) | Carrier cheeks to give the seat/table boards a full-height rail face | Accepted as variant in 0028 |
| [0014](0014-self-contained-corpus-with-own-side-walls.md) | Self-contained corpus with its own side walls, removable as one unit | Accepted |
| [0015](0015-shared-model-data-for-viewer-and-drawings.md) | Shared part model for the 3D viewer and build123d workshop drawings | Accepted |
| [0016](0016-rear-lashing-eyes-carry-the-hold-down.md) | Rear lashing eyes carry the hold-down, fastened to the side walls | Accepted |
| [0017](0017-850-mm-runners-in-900-mm-corpus.md) | 850 mm runners in the 900 mm corpus | Accepted, C3 runner amended by 0021, heavy runner length (870) by 0028 |
| [0018](0018-continuous-bottom-and-lid-walls-in-grooves.md) | Continuous bottom and lid; walls housed in grooves between them | Accepted, grooves replaced by 0020 |
| [0019](0019-hinged-sleeping-boards-fold-onto-the-corpus.md) | Hinged sleeping boards fold back onto the corpus for driving | Accepted |
| [0020](0020-through-tenons-instead-of-routed-grooves.md) | Through tenons instead of routed grooves | Accepted |
| [0021](0021-table-board-on-170-kg-runners.md) | Table board C3 on the 170 kg runners (it must take a person sitting on it) | Accepted |
| [0022](0022-mnemonic-board-codes.md) | Mnemonic part codes for the boards (Bottom, Rear, Side, Mid, Top, Fold) | Accepted |
| [0023](0023-cnc-dxf-export-with-dogbones.md) | CNC export as 2D DXF with dogbones and slot clearance | Accepted (values are assumptions) |
| [0024](0024-cnc-drawer-boxes-finger-joints-and-lightening-windows.md) | CNC-cut drawer boxes: finger joints, tabbed bottom, lightening windows | Accepted |
| [0025](0025-drawer-runners-interleaved-between-seat-and-table-runners.md) | Drawer runners interleaved between the seat and table runners (no overlap on M1/M2) | Accepted, placement replaced by 0028 |
| [0026](0026-windows-for-outer-drawers-hole-grid-for-middle-drawer.md) | Large windows in the outer drawers (reach in while seated), hole grid in the middle drawer | Accepted |
| [0027](0027-no-drawer-front-panels-box-front-with-grip-cut-out.md) | No drawer front panels; the box front is the visible front, with a milled grip cut-out | Accepted |
| [0028](0028-height-plan-board-on-cheeks-foolproof-runner-layout.md) | Height plan: seat/table board on cheeks, equal drawer boxes, foolproof runner layout (outer low, middle high), runner lengths 870/850 | Accepted |
| [0029](0029-cheeks-sized-to-the-moving-runner-member-flush-seat-taller-middle-drawer.md) | Cheeks sized to the 55 mm moving runner member, flush seat, through-tenoned cheeks, taller middle drawer | Accepted |
| [0030](0030-telescopic-rail-visualization.md) | Telescopic rail visualization: housing, middle and inner member, silver grey | Accepted |

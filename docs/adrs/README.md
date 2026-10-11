# Architecture Decision Records

This folder records the non-obvious decisions behind this project — both the
3D viewer's software architecture and the physical camper build. Each ADR is a
short, immutable record: once accepted, don't edit it to reflect new
information — write a new ADR that supersedes it and link back.

Format: lightweight [MADR](https://adr.github.io/madr/)-style — Status, Context,
Decision, Consequences.

| # | Title | Status |
|---|---|---|
| [0001](0001-self-contained-single-file-viewer.md) | Self-contained single-file viewer, no build step | Accepted |
| [0002](0002-pinned-threejs-r128-via-cdn.md) | Pinned Three.js r128 via CDN | Accepted |
| [0003](0003-real-world-mm-scale-factor.md) | Model in real-world millimeters with a single scale constant | Accepted |
| [0004](0004-static-scene-graph-with-z-position-toggle.md) | Static scene graph with Z-position toggling instead of per-mode subtrees | Accepted |
| [0005](0005-simplified-rail-visualization.md) | Simplified rail visualization: inner member only | Accepted |
| [0006](0006-three-section-corpus-layout.md) | Three-section corpus layout (312 / 424 / 312 mm) | Accepted |
| [0007](0007-dowel-screw-bracket-joinery.md) | Dowel + screw + corner-bracket joinery over glue-only or biscuits | Accepted |
| [0008](0008-heavy-duty-full-extension-runners.md) | Heavy-duty 900 mm full-extension runners over shorter soft-close runners | Accepted |
| [0009](0009-translucent-caddy-shell-overlay.md) | Translucent Caddy shell as a separate, toggled overlay group | Accepted |
| [0010](0010-detailed-caddy-shell.md) | More detailed Caddy shell: door openings, rear-seat states, load-floor plane | Accepted |
| [0009](0009-drawer-box-panel-shear-joinery.md) | Drawer boxes braced by their bottom panel, not by corner joints | Accepted |
| [0010](0010-non-destructive-vehicle-tie-down.md) | Non-destructive tie-down via factory lashing eyes, no holes in the body | Accepted |
| [0011](0011-rail-carrier-cheeks-for-seat-and-table-boards.md) | Carrier cheeks to give the seat/table boards a full-height rail face | **Proposed** |

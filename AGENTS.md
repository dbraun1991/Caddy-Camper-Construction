# AGENTS.md

Guidance for AI coding agents (and humans) working in this repository.

## What this is

A planning project for converting a VW Caddy Mk3 (Kombi, 05/2012, usable load width 1,120 mm)
into a camper: a fixed under-floor storage unit with three pull-out sections
(2 drawers + a seat/table board each) and a stacked sleeping platform. The repo holds
both the physical build plan (materials, dimensions, joinery) and a browser-based
3D viewer used to check that plan visually before cutting any wood.

There is no application server, no package.json, and no build pipeline. Everything
needed to view the model ships in one HTML file.

## Repo structure

```
index.html            — self-contained 3D viewer (Three.js r128 via CDN, inline CSS/JS)
List_of_Materials.md  — bill of materials, dimensions, hardware options, joinery notes
README.md             — usage, controls, dimensions overview, render architecture notes
docs/adrs/            — architecture decision records (see below)
```

There are no tests, linter, or build step. "Running" the project means opening
`index.html` in a browser (internet connection required on first load for the
Three.js CDN script).

## Conventions to preserve

- **Language**: all user-facing content (UI strings, README, code comments in
  `index.html`) is German. Keep new user-facing text in German; match the existing
  tone. `AGENTS.md` and `docs/adrs/` are the exception — write those in English.
- **Units**: all real-world dimensions are millimeters. `index.html` converts to
  Three.js scene units via a single scale constant `S = 0.01` (1 mm = 0.01 units).
  Don't introduce a second unit system or hardcode pre-scaled numbers — add new
  geometry in mm and let `box()` apply `S`.
- **Single file, no dependencies beyond the Three.js CDN script**. Don't split
  `index.html` into modules or add a bundler/framework unless explicitly asked —
  that would break the "just open it in a browser" workflow that's the whole point
  of this viewer.
- **Keep the three files in sync.** A dimension, part, or hardware change made in
  one of `index.html`, `List_of_Materials.md`, or `README.md` usually needs to be
  reflected in the other two (e.g. section widths, rail specs, board thicknesses
  appear in all three).
- **Scene graph**: all geometry lives permanently in the static group `sg`; mode
  switching (`setMode`) only moves the Z position of the 6 movable elements (3
  drawers + 2 seat boards + 1 table board) and their paired rail inner-members.
  See [docs/adrs/0004-static-scene-graph-with-z-position-toggle.md](docs/adrs/0004-static-scene-graph-with-z-position-toggle.md)
  before changing how modes are represented.
- When a change reflects a real architectural or build decision (not just a tweak),
  add or update an ADR in `docs/adrs/` rather than only explaining it in a commit
  message.

## Features & Future Work

### Implemented

- 3D viewer with orbit (drag), zoom (scroll), and camera reset, mouse + touch.
- Three modes — Schlafmodus / Bankmodus / Packmodus — toggling the extension of
  3 drawers and 2 seat boards + 1 table board along the rails.
- Full corpus geometry (side walls, back wall, floor, two dividers) at real
  dimensions, plus the three-piece sleeping platform and a mattress outline.
- Rail visualization (inner/moving member only, see
  [ADR 0005](docs/adrs/0005-simplified-rail-visualization.md)).
- Mobile support: pinch-zoom, controls clear of the phone's system navigation
  (`100dvh` + safe-area inset).
- Toggleable translucent Caddy shell (60 % opacity, open rear) in its own group
  `caddyG`, see [ADR 0009](docs/adrs/0009-translucent-caddy-shell-overlay.md).
  Its dimensions are unverified placeholders.
- Full bill of materials with cut list, hardware options and links, and a
  documented joinery method ([List_of_Materials.md](List_of_Materials.md) §H).

### Open / planned (tracked informally in README "Weiterführende Planung")

- Drawer details: runner mounting, front panel reveal/gap, handles.
- Under-floor unit tie-down to the vehicle (L-brackets, lashing eyes).
- Fastening of sleeping board 2 (B2/A3) to the front-seat headrests.
- Mattress spec finalization (1,100 × 2,000 × 80 mm cold foam assumed).
- Ventilation / moisture protection for the enclosed under-floor volume.
- 12V wiring / lighting.

### TODOs

- Replace the placeholder Caddy shell dimensions (`CW`, `CAW`, `CH`, `CL`, wheel
  arches, seats in `index.html`) with measured values from the real vehicle.
- Mobile: the legend (top right) is wide and overlaps the scene on phones.

### Possible viewer improvements (not requested yet — candidates only)

- Remove or actually use the empty `bankG` / `packG` groups in `index.html`
  (currently declared, toggled visible, but hold no geometry — see
  [ADR 0004](docs/adrs/0004-static-scene-graph-with-z-position-toggle.md)).
- Dimension/measurement overlay in the viewer (currently dimensions only live in
  code comments and `List_of_Materials.md`).
- Exportable cut list generated from the same geometry constants used to render
  the model, so `List_of_Materials.md` can't drift from `index.html`.

## Architecture decisions

See [docs/adrs/](docs/adrs/) for the reasoning behind non-obvious choices (scale
factor, scene graph shape, rail simplification, section layout, joinery method,
hardware selection). Read the relevant ADR before changing the thing it covers;
add a new ADR for any future decision with real trade-offs instead of only
noting it in a commit message.

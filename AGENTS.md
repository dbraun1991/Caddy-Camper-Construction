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
index.html                 — self-contained 3D viewer (Three.js r128 via CDN, inline CSS/JS)
List_of_Materials.md       — bill of materials, dimensions, hardware options, joinery (§H)
Einkaufsliste.md           — shopping list, current prices, total budget estimate
Hinweise-Sommernutzung.md  — legal (rasten vs. campen), payload, ventilation, privacy/
                              insect protection for summer-only use — not build-specific,
                              but references the build where it's affected (Bankmodus,
                              A3 headrest mounting, ADR 0010)
README.md                  — usage, controls, dimensions overview, render architecture notes
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
- **Keep the files in sync.** A dimension, part, or hardware change made in one of
  `index.html`, `List_of_Materials.md`, or `README.md` usually needs to be
  reflected in the others (e.g. section widths, rail specs, board thicknesses
  appear in all three), and a part or quantity change also affects
  `Einkaufsliste.md`.
- **Prices in `Einkaufsliste.md` are dated estimates**, not quotes. They carry a
  "Preisstand" line — when refreshing them, re-check the sources and move that
  date; don't edit individual numbers and leave a stale date behind.
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
- Translucent Caddy shell (60 % opacity, open rear, visible by default, toggle button) in its own group
  `caddyG`, see [ADR 0009](docs/adrs/0009-translucent-caddy-shell-overlay.md) and
  [ADR 0010](docs/adrs/0010-detailed-caddy-shell.md): door openings, front seats,
  rear bench (flipped flat / removed toggle), load-floor reference plane.
  Its dimensions are unverified placeholders.
- Full bill of materials with cut list, hardware options and links, and a
  documented joinery method for every junction in the build
  ([List_of_Materials.md](List_of_Materials.md) §H): corpus shell (ADR 0007),
  rail-to-wall attachment (§H1), drawer boxes and front panels (ADR 0009),
  sleeping-platform board joints (§H4), and vehicle tie-down (ADR 0010).
- Shopping list with dated price estimates, a three-tier total budget, and a
  buy order derived from the assembly order ([Einkaufsliste.md](Einkaufsliste.md)).
- Summer-use considerations beyond the physical build — legal distinction between
  resting and camping (directly relevant because Bankmodus extends furniture out
  the open tailgate), a rough build-weight estimate against vehicle payload,
  ventilation (both heat buildup *and* CO2 from breathing — the latter is not
  seasonal and is treated as in-scope, not deferred), privacy/insect protection
  ([Hinweise-Sommernutzung.md](Hinweise-Sommernutzung.md)). Standheizung and
  condensation/mould management (moisture settling on cold surfaces) are
  deliberately out of scope there — summer-only use was the stated assumption;
  revisit if the vehicle is ever used outside summer. Don't conflate that
  deferred condensation topic with the CO2/fresh-air one, which stays covered
  year-round.

### Open / planned (tracked in README "Weiterführende Planung")

- **[ADR 0011](docs/adrs/0011-rail-carrier-cheeks-for-seat-and-table-boards.md) is
  Proposed, not Accepted** — the seat/table boards are 32 mm thick but the runner
  inner members are 53/76 mm high, so there is no full-height face to screw them
  to. Deciding it changes `boardH` and the rail Y-bands in `index.html` plus the
  height tables in the other two files. Don't cut `C1`–`C3` or buy the board
  runners before it is resolved.
- `index.html` computes `drawerH = 260` mm; `List_of_Materials.md` §D says 268 mm.
  Same height chain as ADR 0011 — resolve both in one pass.
- Mattress spec: 1,100 mm is not a stock width; options are in
  [Einkaufsliste.md](Einkaufsliste.md) §4.
- Ventilation / moisture protection for the enclosed under-floor volume.
- 12V wiring / lighting.

### TODOs

- Replace the placeholder Caddy shell dimensions (`CW`, `CAW`, `CH`, `CL`, wheel
  arches, seats, `doorOpenings` in `index.html`) with measured values from the real vehicle.
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

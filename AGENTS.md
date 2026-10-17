# AGENTS.md

Guidance for AI coding agents (and humans) working in this repository.

## What this is

A planning project for converting a VW Caddy Mk3 (Kombi, 05/2012, usable load width 1,120 mm)
into a camper: a fixed under-floor storage unit with three pull-out sections
(2 drawers + a seat/table board each) and a stacked sleeping platform. The repo holds
both the physical build plan (materials, dimensions, joinery) and a browser-based
3D viewer used to check that plan visually before cutting any wood.

There is no application server, no package.json, and no build pipeline. Viewing
needs only static files (`index.html`, `modell/modell.js`, `docs/zeichnungen/`);
regenerating them after a dimension change runs two Python scripts (ADR 0015).

## Repo structure

```
index.html                 — viewer: tab "Dynamisch" (Three.js r128 via CDN) + tab "Statisch"
                              (workshop drawings); builds all parts from modell/modell.js
modell/parameter.json      — single source of all build dimensions (mm)
modell/modell.py           — derives every part as a box + overlap check → modell/modell.js
                              (stdlib only; generated file is committed)
modell/zeichnungen.py      — build123d: Draufsicht/Vorderansicht/Seitenansicht as A3 SVGs
                              per corner variant → docs/zeichnungen/ (committed)
modell/requirements.txt    — build123d for the drawings; install into .venv/ (gitignored)
List_of_Materials.md       — bill of materials, dimensions, hardware options, joinery (§H)
Einkaufsliste.md           — shopping list, current prices, total budget estimate
Hinweise-Sommernutzung.md  — legal (rasten vs. campen), payload, ventilation, privacy/
                              insect protection for summer-only use — not build-specific,
                              but references the build where it's affected (Bankmodus,
                              A3 headrest mounting, ADR 0012)
README.md                  — usage, controls, dimensions overview, render architecture notes
docs/adrs/                 — architecture decision records (see below)
docs/zeichnungen/          — generated drawings, one folder per `eckausbildung` variant
```

There are no tests or linter. "Running" the project means opening `index.html` in
a browser (internet connection required on first load for the Three.js CDN
script). After editing `modell/parameter.json` or `modell/modell.py`, regenerate:
`python3 modell/modell.py` and `.venv/bin/python modell/zeichnungen.py` (add
`--png` to also render PNGs for a visual check; PNGs are gitignored). The overlap
count printed by both scripts is the closest thing to a test — it should only go
down.

## Conventions to preserve

- **Language**: all user-facing content (UI strings, README, code comments in
  `index.html`) is German. Keep new user-facing text in German; match the existing
  tone. `AGENTS.md` and `docs/adrs/` are the exception — write those in English.
- **Units**: all real-world dimensions are millimeters. `index.html` converts to
  Three.js scene units via a single scale constant `S = 0.01` (1 mm = 0.01 units).
  Don't introduce a second unit system or hardcode pre-scaled numbers — add new
  geometry in mm and let `box()` apply `S`.
- **One source for build dimensions** ([ADR 0015](docs/adrs/0015-shared-model-data-for-viewer-and-drawings.md)).
  Build parts (corpus, platform, drawers, boards, rails, mattress) are defined
  only in `modell/parameter.json` + `modell/modell.py`. Never add a build part or
  a dimension directly in `index.html` or `zeichnungen.py` — add it to the model
  and regenerate. Only the Caddy shell (vehicle context, not built) lives in
  `index.html`.
- **No bundler, no framework, opens without a build step.** The viewer loads
  `modell/modell.js` via `<script src>` (not `fetch`, which fails on `file://`).
  Python is for generating, never needed to view.
- **Keep the files in sync.** A dimension, part, or hardware change in the model
  usually needs to be reflected in `List_of_Materials.md` and `README.md` (e.g.
  section widths, rail specs, board thicknesses), and a part or quantity change
  also affects `Einkaufsliste.md`.
- **Prices in `Einkaufsliste.md` are dated estimates**, not quotes. They carry a
  "Preisstand" line — when refreshing them, re-check the sources and move that
  date; don't edit individual numbers and leave a stale date behind.
- **Scene graph**: all geometry lives permanently in the static group `sg`; mode
  switching (`setMode`) only moves, along Z by the rail length, the parts whose
  model entry has `faehrt` set (drawer boxes + fronts, seat/table boards, and
  their rail inner-members).
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
  Tailgate shown permanently open (hinged at the roof edge). Load width, folded
  rear-seat height and length to the headrests come from the measured
  `fahrzeug` block in `modell/parameter.json`; everything else is a placeholder.
- Shared part model (`modell/`) driving both the 3D tab and build123d workshop
  drawings (Draufsicht / Vorderansicht / Seitenansicht, A3 1:5, hidden edges
  dashed, overlaps red) for three corner-construction variants, plus an overlap
  report in the "Statisch" tab and a collision toggle in the 3D tab
  ([ADR 0015](docs/adrs/0015-shared-model-data-for-viewer-and-drawings.md)).
- Full bill of materials with cut list, hardware options and links, and a
  documented joinery method for every junction in the build
  ([List_of_Materials.md](List_of_Materials.md) §H): corpus shell (ADR 0007),
  rail-to-wall attachment (§H1), drawer boxes and front panels (ADR 0011),
  sleeping-platform board joints (§H4), and vehicle tie-down (ADR 0012, amended by ADR 0016:
  rear lashing eyes beside the corpus, brackets on the outside of `B2`).
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

- **[ADR 0013](docs/adrs/0013-rail-carrier-cheeks-for-seat-and-table-boards.md) is
  Proposed, not Accepted** — the seat/table boards are 32 mm thick but the runner
  inner members are 76 mm high (AOLISHENG 850 mm at all six positions, ADR 0017), so there is no full-height face to screw them
  to. Deciding it changes `elemente.brett_hoehe` / the rail bands in `modell/`
  plus the height tables in `List_of_Materials.md` and `README.md`. Don't cut
  `C1`–`C3` before it is resolved (the runner itself is no longer blocked).
- **Open findings from the overlap check** (red in the drawings; details in the
  "Statisch" tab report). None is decided yet — don't silently "fix" them in the
  model; each is a build decision for the user:
  - Corner construction of the corpus is unspecified (`eckausbildung` parameter;
    `stueckliste` reproduces the current, overlapping cut list). Blocks cutting
    `B1`–`B4`.
  - ~~Clear depth 882 mm < 900 mm rail length~~ — resolved by
    [ADR 0017](docs/adrs/0017-850-mm-runners-in-900-mm-corpus.md): 850 mm
    runners, corpus stays 900 mm. Open: verify the 850 mm runner's thickness
    (19 mm assumed in `schienen.staerke`).
  - Full-section-width inset drawer fronts sit in front of the runners.
  - Drawer heights: box 260 (= 248 sides + 12 bottom) and front 268 in
    `List_of_Materials.md` §D are consistent with each other; the remaining
    conflict is `D3-F` vs `C3` (3 mm). Same height chain as ADR 0013.
  - Section "L" is at −x, which is the **passenger** side (+x = driver side,
    LHD); seen through the tailgate it appears on the right.
- Mattress spec: 1,100 mm is not a stock width; options are in
  [Einkaufsliste.md](Einkaufsliste.md) §4.
- Ventilation / moisture protection for the enclosed under-floor volume.
- 12V wiring / lighting.

### TODOs

- Vehicle measurements (2026-10-17) live in `modell/parameter.json` → `fahrzeug`
  and are checked by `modell.fahrzeug_pruefung()` (shown in the "Statisch" tab).
  The remaining shell placeholders (`CW`, `CH`, `CL`, wheel arches, seats,
  `doorOpenings`, tailgate length/angle) were explicitly **not** measured — the
  user chose to ignore them for now. Don't ask for them again unless a decision
  depends on one.
- A2 sits 10 mm above the folded seat backs (310 vs 320 mm); the shim is
  documented in §H4 (F16). A3 hangs from the headrests on two adjustable loops
  (F15); the user sets holes and loop length on the car — documented, otherwise
  out of scope.
- Mobile: the legend (top right) is wide and overlaps the scene on phones.

### Possible viewer improvements (not requested yet — candidates only)

- Remove or actually use the empty `bankG` / `packG` groups in `index.html`
  (currently declared, toggled visible, but hold no geometry — see
  [ADR 0004](docs/adrs/0004-static-scene-graph-with-z-position-toggle.md)).
- Dimension/measurement overlay in the 3D tab (dimensions are now in the
  "Statisch" drawings, not in the 3D view).
- Exportable cut list generated from `modell.teile()`, so `List_of_Materials.md`
  can't drift from the model (the shared model makes this a small step now).
- Drawings for the sleeping boards `A2`/`A3` and exploded/part drawings of the
  drawer boxes once ADR 0013 and the open findings are decided.

## Architecture decisions

See [docs/adrs/](docs/adrs/) for the reasoning behind non-obvious choices (scale
factor, scene graph shape, rail simplification, section layout, joinery method,
hardware selection). Read the relevant ADR before changing the thing it covers;
add a new ADR for any future decision with real trade-offs instead of only
noting it in a commit message.

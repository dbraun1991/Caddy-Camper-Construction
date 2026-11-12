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
index.html                 — viewer: tab "Dynamisch" (Three.js r128 via CDN), tab "Statisch"
                              (workshop drawings), tab "DXF · CNC" (docs/cnc/cnc.js);
                              builds all parts from modell/modell.js
modell/parameter.json      — single source of all build dimensions (mm)
modell/modell.py           — derives every part as a box + overlap check → modell/modell.js
                              (stdlib only; generated file is committed)
modell/zeichnungen.py      — build123d: 8 A3 sheets as SVG per corner variant plus
                              werkzeichnungen.pdf (all sheets, for printing)
                              → docs/zeichnungen/ (committed)
modell/cnc.py              — 2D DXF per board for a CNC routing service, dogbones +
                              slot clearance from `cnc` in parameter.json → docs/cnc/
                              (committed, ADR 0023)
modell/requirements.txt    — build123d (+ cairosvg, pypdf) for drawings and DXF; .venv/ (gitignored)
List_of_Materials.md       — bill of materials, dimensions, hardware options, joinery (§H)
Einkaufsliste.md           — shopping list, current prices, total budget estimate
Hinweise-Sommernutzung.md  — legal (rasten vs. campen), payload, ventilation, privacy/
                              insect protection for summer-only use — not build-specific,
                              but references the build where it's affected (Bankmodus,
                              F2 headrest mounting, ADR 0012)
README.md                  — usage, controls, dimensions overview, render architecture notes
docs/adrs/                 — architecture decision records (see below)
docs/zeichnungen/          — generated drawings, one folder per `eckausbildung` variant
docs/cnc/                  — generated DXF + AUFTRAG.md + vorschau/*.svg per variant and for the
                              drawer boxes (docs/cnc/schubladen/, ADR 0024),
                              cnc.js (parts + notes for the viewer tab, via <script src>)
```

There are no tests or linter. "Running" the project means opening `index.html` in
a browser (internet connection required on first load for the Three.js CDN
script). After editing `modell/parameter.json` or `modell/modell.py`, regenerate:
`python3 modell/modell.py`, `.venv/bin/python modell/zeichnungen.py` and
`.venv/bin/python modell/cnc.py` (add
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
- **Part codes + long names.** Codes (`T1`, `S1`, `C3`, …) are stable
  position numbers used by the model, drawings and ADRs — don't renumber them.
  User-facing German text pairs them with the long name from the glossary in
  `List_of_Materials.md` ("Bezeichnungen"), e.g. "Klappbrett Rücksitz (F1)";
  the model's `name` field holds the same long name (`GRUPPEN`, `ELEMENTE` in
  `modell/modell.py`). Keep the three in sync when adding a part. Board letters
  are English mnemonics ([ADR 0022](docs/adrs/0022-mnemonic-board-codes.md),
  2026-11-07): `B1` Bottom (Bodenplatte), `R1` Rear (Rückwand), `S1`/`S2` Side,
  `M1`/`M2` Mid (dividers), `T1` Top (Deckplatte), `F1`/`F2` Fold (hinged
  sleeping boards), hinges `H1-*`/`H2-*`. Before that the boards were
  `F1`, `B1`, `B2-F`/`B2-B`, `B3-1`/`B3-2`, `A1`–`A3` — the same codes now mean
  different parts, so read dated notes and old printouts with care.
  Fasteners/fittings are `V1`–`V17` (renamed from `F1`–`F17` on 2026-10-17).
- **Left/right means as seen from the driver's seat** (facing forward, LHD):
  left = driver side = +x, right = passenger side = −x. Section `L` (`C1`, `D1`,
  `S1`) is on the driver side. The Vorderansicht looks forward through the
  tailgate, so left in the drawing is left for the driver too.
- **Prices in `Einkaufsliste.md` are dated estimates**, not quotes. They carry a
  "Preisstand" line — when refreshing them, re-check the sources and move that
  date; don't edit individual numbers and leave a stale date behind.
- **Scene graph**: all geometry lives permanently in the static group `sg`; mode
  switching (`setMode`) moves, along Z by the rail length, the parts whose
  model entry has `faehrt` set (drawer boxes + fronts, seat/table boards, and
  their rail inner-members), and in the two driving modes rotates the pivot
  groups of the hinged boards `F1`/`F2` by 180° around the axes in
  `MODELL.klappachsen` ([ADR 0019](docs/adrs/0019-hinged-sleeping-boards-fold-onto-the-corpus.md)).
  Extension is tracked per element (`ausgefahren[C1…D3]`, each moving part
  mapped by `elementVon()` / `kasten`): the mode sets the defaults, then a click
  or tap on an element (raycast, not while dragging) toggles just that one in
  Schlaf-/Bank-/Packmodus — not in the driving modes.
  See [docs/adrs/0004-static-scene-graph-with-z-position-toggle.md](docs/adrs/0004-static-scene-graph-with-z-position-toggle.md)
  before changing how modes are represented.
- When a change reflects a real architectural or build decision (not just a tweak),
  add or update an ADR in `docs/adrs/` rather than only explaining it in a commit
  message.

## Features & Future Work

### Implemented

- 3D viewer with orbit (drag), pan (right-drag / Shift-drag / two fingers),
  zoom (scroll/pinch), double-click on a part to make that point the orbit
  centre, and camera reset (also resets the centre), mouse + touch. A single
  click on an element toggles it after ~260 ms so a double-click does not.
- Five modes — Schlafmodus / Bankmodus / Packmodus, plus Fahrmodus 1/2 (hinged
  boards `F1`/`F2` folded onto the box; in 2 also rear seats upright, 5 seats,
  ADR 0019) — toggling the extension of
  3 drawers and 2 seat boards + 1 table board along the rails; in Schlaf-,
  Bank- and Packmodus a click/tap on a drawer or board extends/retracts it
  individually.
- Full corpus geometry (side walls, back wall, floor, two dividers) at real
  dimensions, plus the three-piece sleeping platform and a mattress outline.
- Rail visualization as a telescope ([ADR 0030](docs/adrs/0030-telescopic-rail-visualization.md),
  replacing ADR 0005): wall housing stays, middle member travels
  `auszug_mitte`, inner member + lock lever travel with the element; silver
  grey, darker further in; dimensions from `schienen.typen.*` (80 kg values
  estimated). The model still has one box per runner side.
- Mobile support: pinch-zoom, controls clear of the phone's system navigation
  (`100dvh` + safe-area inset), legend toggle button ("Legende", hidden by
  default at ≤ 700 px width, on a dark backing when shown).
- Translucent Caddy shell (60 % opacity, open rear, visible by default, toggle button) in its own group
  `caddyG`, see [ADR 0009](docs/adrs/0009-translucent-caddy-shell-overlay.md) and
  [ADR 0010](docs/adrs/0010-detailed-caddy-shell.md): door openings, front seats,
  rear bench (flipped flat / removed toggle), load-floor reference plane.
  Tailgate shown permanently open (hinged at the roof edge). Load width, folded
  rear-seat height and length to the headrests come from the measured
  `fahrzeug` block in `modell/parameter.json`; everything else is a placeholder.
- Shared part model (`modell/`) driving both the 3D tab and build123d workshop
  drawings (Draufsicht / Vorderansicht / Seitenansicht, A3 1:5, hidden edges
  dashed, overlaps red, intended tenon overlaps green) for the two
  corner-construction variants (`gezapft`, `stumpf`), a fourth sheet
  "Box-Bretter" (every corpus/platform board flat at 1:10 with tenons, slots and a
  cut list, `zeichne_bretter()`), three single-board sheets at 1:5 (`brett-b1-t1`,
  `brett-s-m`, `brett-r1`, `zeichne_detail()`) with every tenon, slot and
  notch dimensioned from the board edge and the waste shaded, an overview sheet
  "Bezeichnungen" (sheet 1: isometric view with board codes + table of every
  code and long name, `zeichne_uebersicht()`), all sheets merged into
  `werkzeichnungen.pdf` per variant for printing on A3, DXF files for a CNC
  service (`modell/cnc.py`, [ADR 0023](docs/adrs/0023-cnc-dxf-export-with-dogbones.md):
  dogbones and slot clearance from the `cnc` parameters, which are still
  assumptions until a service confirms cutter Ø and fit; shown in the viewer tab
  "DXF · CNC" with previews, downloads and the same notes as `AUFTRAG.md`,
  generated from one list in `cnc.abschnitte()`); the drawer boxes are a second
  CNC job (`docs/cnc/schubladen/`, [ADR 0024](docs/adrs/0024-cnc-drawer-boxes-finger-joints-and-lightening-windows.md):
  finger-jointed corners, 12 mm bottom with tabs through slots in all four walls,
  lightening windows in the side walls of `D1/D2` (reach in while seated) and a
  Ø 25 mm hole grid in `D3` so nothing falls out (ADR 0026), both keeping the
  runner band solid; board
  geometry from `modell.schubladen_bretter()`, parts `D*-S`/`-E1`/`-E2`/`-B`; no front
  panels, the box front `-E1` is the visible front with a milled grip cut-out and
  every end wall gets the hole grid ([ADR 0027](docs/adrs/0027-no-drawer-front-panels-box-front-with-grip-cut-out.md),
  `D1-F`…`D3-F` retired); the 3D tab
  draws the drawers from these boards via `modell.schubladen_3d()` → `MODELL.schubladen_3d`,
  extruded `THREE.Shape`s, instead of the `D1`–`D3` blocks), plus an overlap
  report in the "Statisch" tab and a collision toggle in the 3D tab
  ([ADR 0015](docs/adrs/0015-shared-model-data-for-viewer-and-drawings.md)).
- Full bill of materials with cut list, hardware options and links, and a
  documented joinery method for every junction in the build
  ([List_of_Materials.md](List_of_Materials.md) §H): corpus shell (ADR 0007),
  rail-to-wall attachment (§H1), drawer boxes (ADR 0024, replacing ADR 0011's
  box joinery) and front panels (ADR 0011),
  sleeping-platform board joints (§H4), and vehicle tie-down (ADR 0012, amended by ADR 0016:
  rear lashing eyes beside the corpus, brackets on the outside of `S1/S2`).
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

- ~~ADR 0013~~ — decided by [ADR 0028](docs/adrs/0028-height-plan-board-on-cheeks-foolproof-runner-layout.md) (2026-11-12): seat/table element =
  18 mm board on top of two cheeks (inverted U), runner screwed to the cheek
  (holes are on the runner's centre line). Amended by [ADR 0029](docs/adrs/0029-cheeks-sized-to-the-moving-runner-member-flush-seat-taller-middle-drawer.md)
  (2026-11-12) and [ADR 0031](docs/adrs/0031-boards-flush-with-the-middle-runner-member-minimal-cheeks.md)
  (2026-11-13): extended, only the lock lever, a 30 mm and a 55 mm telescope
  member stand out of the corpus, so board tops are flush with the 55 mm
  middle member (`hoehe_auszug`, centred, confirmed; `ueberstand_mittelteil`
  = 0, 10.5 mm under the runner top); the cheek ends exactly `rand_lochreihe`
  = 15 mm below the hole line (cheek 24.5 mm, element 42.5 mm); cheeks joined
  to the board by 5 vertical through-tenons each + glue (`wangenzapfen`, the
  builder wants tenons for stability; tenon parts flagged as intended
  overlaps). Variants with the board between the cheeks or flush with the
  30 mm member were eliminated (tenons/screws collide, less bearing).
  `D1/D2` 226.5 mm, `D3` 229.5 mm (`kasten_mitte_hoehe`, capped 3 mm under the
  `C3` cheeks, max 238). Table runner 5 mm under `T1`, table board 15.5 mm
  under `T1`. Still open: who makes `C1`–`C3`
  (CNC job or plain cutting, deliberately left open).
- **CNC job not placed yet** ([ADR 0023](docs/adrs/0023-cnc-dxf-export-with-dogbones.md)).
  The `cnc` values in `modell/parameter.json` (cutter Ø 6 mm, clearance 0.2 mm)
  are assumptions until a service answers — don't present them as confirmed.
  The builder is near Duisburg and wants to pick the parts up in person; the
  provider search (2026-11-07, websites only, nobody contacted) is in
  `Einkaufsliste.md` §1 "Option: CNC-Fräsen statt Zuschnitt", first candidate
  Brockmann Holz, Krefeld. Next step the user named: a draft e-mail to providers.
- **Open findings from the overlap check** (red in the drawings; details in the
  "Statisch" tab report). Don't silently "fix" open ones in the model; each is
  a build decision for the user:
  - ~~Corner construction~~ — decided in
    [ADR 0018](docs/adrs/0018-continuous-bottom-and-lid-walls-in-grooves.md) and
    [ADR 0020](docs/adrs/0020-through-tenons-instead-of-routed-grooves.md):
    `B1` and `T1` continuous, walls join them with 18 × 50 mm through tenons
    (`eckausbildung: gezapft`, fallback `stumpf`; the routed grooves are gone,
    the builder has no router bit). Tenons are separate model boxes, flagged
    `gewollt` (green) and excluded from the problem count. Wall cut height is
    340 mm; `M1/M2` is cut to 900 mm including its rear tenon into `R1`. Assembly
    order is forced: `M1/M2`, then `R1` from behind, then `S1/S2`, then `T1`.
  - ~~Clear depth 882 mm < 900 mm rail length~~ — resolved by
    [ADR 0017](docs/adrs/0017-850-mm-runners-in-900-mm-corpus.md): 850 mm
    runners, corpus stays 900 mm. Runners ordered 2026-11-04 (2 × 170 kg + 4 × 80 kg; since ADR 0021 `C3` needs the 170 kg type → 3 + 3; the third 170 kg pair is ordered too, builder 2026-11-12). The 170 kg type is
    specified at 19.2 + 0.5 mm per side, which fits the planned 19 mm + 1 mm
    clearance. Delivered and measured 2026-11-12 ([ADR 0028](docs/adrs/0028-height-plan-board-on-cheeks-foolproof-runner-layout.md),
    datasheet `docs/runner-pdfs/heavy-runners.pdf`): both types 19 mm thick,
    heights 53 / 76 mm, lengths 850 mm (80 kg) and **870 mm** (170 kg), each
    plus a ~30 mm lock lever in front on the moving member; 170 kg holes are for
    **M6**, all holes on the runner's centre line. Hole spacing along the runner
    doesn't matter for the model (user, 2026-11-12). Runner length is per type
    (`schienen.typen.*.laenge`), the viewer extends each element by its own.
    Still open: lock levers (~30 mm proud) vs. the 20–30 mm room to the
    tailgate — the builder left ~10 mm behind the box, expects it to fit and
    will test it on the car before ordering the drawer wood (flagged in
    `fahrzeug_pruefung()`); hole size of the 80 kg runner. The 170 kg lock does
    hold when extended (builder, 2026-11-12).
    Drawer runners (user, 2026-11-12, "narrenkompatibel"): outer `D1/D2` runner
    as low as possible but ≥ 5 mm above the seat runner (99–152, windows
    above), middle `D3` as high as possible but ≥ 5 mm under the `C3` runner
    (181–234, hole grid below; `abstand_gleiche_seite`), whole mm. On `M1/M2`
    the outer-section face has every runner below 134 mm
    above `B1`, the middle face every runner above 163 mm; `modell.py` asserts ≥ 10 mm to the opposite face, so the M6
    through-bolts (V9, M6 × 30) land on bare wall. Mounting table in §H1.
  - ~~Drawer fronts (inset vs. overlay) and the front-panel overlaps~~ —
    resolved by [ADR 0027](docs/adrs/0027-no-drawer-front-panels-box-front-with-grip-cut-out.md)
    (2026-11-12): no front panels at all; full-width panels would have blocked
    the 76 mm seat/table runners. The model now has 0 open overlaps.
- **Deliberately left open by the user** (2026-10-17) — don't push for a
  decision or plan them unless asked: mattress spec (1,100 mm is not a stock
  width, options in [Einkaufsliste.md](Einkaufsliste.md) §4), payload check
  against the registration document, 12V wiring / lighting, and ventilation /
  moisture protection (only relevant outside summer).

### TODOs

- The load-floor height above the ground (`fahrzeug.ladekante_hoehe` = 580) is
  the Caddy 2K standard value, not measured; the builder said ±10 cm doesn't
  matter. The viewer uses it for the ground grid and placeholder underbody and
  wheels only.
- Vehicle measurements (2026-10-17) live in `modell/parameter.json` → `fahrzeug`
  and are checked by `modell.fahrzeug_pruefung()` (shown in the "Statisch" tab).
  The remaining shell placeholders (`CW`, `CH`, `CL`, wheel arches, seats,
  `doorOpenings`, tailgate length/angle) were explicitly **not** measured — the
  user chose to ignore them for now. Don't ask for them again unless a decision
  depends on one.
- F1 sits 10 mm above the folded seat backs (310 vs 320 mm); the shim is
  documented in §H4 (V16). F2 hangs from the headrests on two adjustable loops
  (V15); the user sets holes and loop length on the car — documented, otherwise
  out of scope.

### Possible viewer improvements (not requested yet — candidates only)

- Remove or actually use the empty `bankG` / `packG` groups in `index.html`
  (currently declared, toggled visible, but hold no geometry — see
  [ADR 0004](docs/adrs/0004-static-scene-graph-with-z-position-toggle.md)).
- Dimension/measurement overlay in the 3D tab (dimensions are now in the
  "Statisch" drawings, not in the 3D view).
- Exportable cut list generated from `modell.teile()`, so `List_of_Materials.md`
  can't drift from the model (the shared model makes this a small step now).
- Drawings for the sleeping boards `F1`/`F2` and exploded/part drawings of the
  drawer boxes once ADR 0013 and the open findings are decided.

## Architecture decisions

See [docs/adrs/](docs/adrs/) for the reasoning behind non-obvious choices (scale
factor, scene graph shape, rail simplification, section layout, joinery method,
hardware selection). Read the relevant ADR before changing the thing it covers;
add a new ADR for any future decision with real trade-offs instead of only
noting it in a commit message.

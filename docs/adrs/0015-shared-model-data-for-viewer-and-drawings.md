# 0015: Shared part model for the 3D viewer and build123d workshop drawings

Status: Accepted — amends [ADR 0001](0001-self-contained-single-file-viewer.md)

## Context

Before cutting wood, the builder wants static, dimensioned workshop drawings in
the standard three views — Draufsicht, Vorderansicht, Seitenansicht — next to the
interactive 3D viewer, to review the plan visually. The drawings must be
generated from a real CAD library, not drawn by hand, and must not be a second
place where dimensions live.

Until now every dimension sat as a JS constant inside `index.html`
(ADR 0001/0003), and the corpus parts were placed by hand-written `box()` calls,
partly with pre-computed numbers (`x1 = -386`, `d1x = -221`). A drawing
generator in another language would have had to repeat all of that.

Options considered:

- **Drawings inside the viewer** (SVG generated in JS from the same constants)
  — no install, but hidden lines, projection and dimensioning would be
  hand-written rather than coming from a library, which is what was asked for.
- **build123d with its own copy of the dimensions** — real projection with
  hidden edges, but two sources of truth: exactly the drift `AGENTS.md` warns
  about.
- **One part model, two consumers** — chosen.

## Decision

- `modell/parameter.json` holds the primary dimensions (mm). It is the only file
  a dimension change touches.
- `modell/modell.py` (standard library only) derives **every part** as an
  axis-aligned box `[[x0,x1],[y0,y1],[z0,z1]]` in the closed state (Schlafmodus):
  corpus, platform, mattress, drawer boxes and fronts, seat/table boards and the
  12 rail envelopes. It also computes all **volumetric overlaps** between parts
  and writes everything to `modell/modell.js` (`window.MODELL`).
- `index.html` loads `modell/modell.js` with a plain `<script src>` (works from
  `file://` and GitHub Pages, unlike `fetch` of a JSON file) and builds every
  build part from `MODELL.teile`. Mode switching still only moves the parts that
  have `faehrt` set, along z (ADR 0004). The Caddy shell stays in `index.html`;
  it is context, not something to be built.
- `modell/zeichnungen.py` imports the same `teile()` function, builds each part
  as a build123d solid, projects it orthographically (visible and hidden edges)
  and writes A3 sheets at 1:5 to `docs/zeichnungen/<corner variant>/`. Overlaps
  are shaded red. The viewer has a second tab ("Statisch") showing those SVGs and
  a check report from the same overlap list.
- The corner construction (`eckausbildung`) is a parameter, so all variants can be
  drawn side by side while the decision is open.

## Consequences

- Dimensions live in one place. The viewer, the drawings and the overlap check
  can no longer disagree.
- ADR 0001 is relaxed: the viewer is no longer a single file. It still needs no
  install and no build step to *open*; `index.html` + `modell/modell.js` +
  `docs/zeichnungen/` are static files. **Changing** a dimension now means
  editing `parameter.json` and running `python3 modell/modell.py` (no extra
  packages), plus `modell/zeichnungen.py` (needs build123d in `.venv`, see
  `modell/requirements.txt`) to refresh the drawings. Generated files are
  committed so the GitHub Pages demo works without any build step.
- The overlap check turned up conflicts that were invisible while the boxes
  only overlapped inside translucent meshes: the corner construction of the
  corpus is not specified, the 900 mm runners do not fit the 882 mm clear depth
  behind the back wall, and the full-width inset drawer fronts sit in front of
  the runners. They are listed in the README and resolved separately — this ADR
  only makes them visible.
- Part positions that were previously hard-coded in the viewer are now derived
  (section centres, divider positions, rail Y-bands). The rail bands are
  unchanged; the drawer is now modelled as box (260 mm) plus front panel
  (268 mm, per `List_of_Materials.md` §D) instead of one 260 mm block.

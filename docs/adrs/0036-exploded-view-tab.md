# 0036: Exploded view as its own tab, one assembly at a time

Status: **Accepted** (2026-11-17). Related: [ADR 0004](0004-static-scene-graph-with-z-position-toggle.md)
(scene graph of the 3D tab, unchanged), [ADR 0015](0015-shared-model-data-for-viewer-and-drawings.md)
(one model), [ADR 0024](0024-cnc-drawer-boxes-finger-joints-and-lightening-windows.md)
(drawer boards), [ADR 0030](0030-telescopic-rail-visualization.md) (runners).
Idea: [docs/ideas/05](../ideas/05-explosionsansicht.md).

## Context

The builder wants an exploded view like the one in the sister project
ideastorm. There, every board carries an `explode` unit vector in the model,
tenons follow their board (`zapfen_von`), and a slider "Auseinander"
(0–250 mm) moves every part by vector × value. It should get its own tab next
to the whole-car 3D view and show exactly **one** assembly, chosen from a
dropdown. Decisions by the builder (2026-11-17):

1. The dropdown lists **Box**, **D1/D2**, **D3**, **C1/C2** and **C3**.
   Identical assemblies are merged and show the first.
2. **Box** = the corpus with its tenons, the runner housings on the walls,
   plus `F1/F2` and the hinges `H1/H2`.
3. **Runners**: at a drawer or board, the complete runner of each side
   (retracted) moves out sideways beyond the wall or cheek it is screwed to.
   In the box only the housings are shown.
4. **Slider** 0–250 mm as in ideastorm, starting at 120 mm.
5. **Codes as labels** on every part, the long name on hover or tap. Tenons
   are green, as in the drawings.

## Decision

- **Directions live in the model.** `modell.explosion()` writes
  `MODELL.explosion`: per object `{id, name, teile: [{id, quelle, richtung,
  zapfen}]}`, where `quelle` is one of:
  - `teil`: a box, or the board with holes from `teile()`;
  - `brett3d`: a drawer board from `schubladen_3d()`;
  - `schiene`: the whole runner.

  `richtung` is in mm per mm of slider travel and need not be a unit vector:

  | Part | Direction |
  |---|---|
  | `S1` / `S2` | ±1 (x) |
  | `M1` / `M2` | ±0.45 (x), so they separate from the side walls |
  | Box runner housings | their wall's value + 0.2 inwards |
  | `B1` / `T1` | down / up |
  | `R1` | back (+z) |
  | `F1` / `F2` | up and forward 0.5 / 1 |
  | Hinges | `H1` above `T1`/`F1`, `H2` below `F1`/`F2` |
  | Drawer sides, ends, bottom | ±x, front −z / back +z, down |
  | Drawer/board runners | ±1.6 (x) |
  | Seat/table board, cheeks | board up, cheeks ±x |

  Tenons inherit the direction of their `zapfen_von`.
- **Separate scene, own tab "Explosion".** It has its own renderer, camera
  and orbit control (drag, right/shift-drag pan, wheel/pinch zoom, and
  orbiting below the horizon). It renders only while the tab is visible.
  The geometry is the 3D tab's own, exposed as `window.BAUTEILE3D`:
  - `teilBox`;
  - `lochBrett` (boards with vent holes, ADR 0035);
  - `kastenBrett` (extruded drawer boards);
  - `schieneTeleskop(t, g, frei)`, which builds the runner without
    registering it for modes or clicks.

  The 3D tab's static scene graph (ADR 0004) is untouched.
- The object is centred on the origin and the camera distance follows its
  size. Labels are HTML elements projected from each part's centre and can be
  switched off ("Kürzel"). Tenons get no label, only the hover name.
- Direct link: `index.html#explosion`.

## Consequences

- A new part needs an entry in `explosion()`. The function asserts that
  every listed part has a direction.
- Two WebGL contexts exist once the tab has been opened, which is fine on
  phones and desktops.
- The seat/table board is still a plain box with separate tenon boxes, as in
  the 3D tab. The notches show only in the drawings and DXF.

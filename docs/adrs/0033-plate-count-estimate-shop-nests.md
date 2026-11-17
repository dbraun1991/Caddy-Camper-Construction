# 0033: Estimate the plate count ourselves, let the shop do the nesting

Status: **Accepted** (2026-11-17). Related: [ADR 0023](0023-cnc-dxf-export-with-dogbones.md)
(CNC export), [ADR 0024](0024-cnc-drawer-boxes-finger-joints-and-lightening-windows.md)
(drawer job). Idea: [docs/ideas/01](../ideas/01-plattenbedarf-schubladen.md),
[02](../ideas/02-nesting-vorab.md).

## Context

The builder asked how many standard birch-ply sheets the drawer job (`D1`–`D3`
plus `C1`–`C3`) needs: 1, 2 or 3. They also asked whether we should nest the
DXF parts onto sheets ourselves, and whether shops expect that.

- Standard birch-ply formats are 2,500 × 1,250 mm (also 1,250 × 2,500 with the
  face grain the other way), 1,525 × 1,525 mm (BB/BB) and, less often,
  2,440 × 1,220 or 3,000 × 1,500 mm.
- Shops that cut panels on a CNC router use their own nesting software. Their
  nest depends on their cutter, their hold-down (vacuum table, tabs) and their
  offcuts. They usually want single-part DXFs.
- The earlier estimate ("~2.6 of 3.1 m², tight") only compared areas. It could
  not say whether the parts actually fit on one sheet.

## Decision

- `modell/cnc.py` places the bounding rectangles of all parts of each job onto
  standard sheets per thickness (`plattenbelegung()`, MaxRects, best short
  side). It uses `cnc.teileabstand` between parts and a `randstreifen` (10 mm)
  around the sheet. The sheet size is set in `cnc.platte`.
- It runs twice. The first run keeps the **grain along the length**: each part
  lies with its long side along the 2,500 mm edge. The second run lets parts
  **rotate freely**, because the job sheet allows that ("Faserrichtung egal").
  It reports both counts and writes `vorschau/platten-<t>mm.svg` and
  `…-gedreht.svg` for each job.
- The result goes to the console and the "DXF · CNC" tab only, **not** into
  `AUFTRAG.md`. It is our own check. The shop still gets single parts, and
  `alle-teile.dxf` stays un-nested.

## Result (2026-11-17)

| Job | 18 mm | 12 mm |
|---|---|---|
| Corpus + sleeping platform (`gezapft`) | 3 with grain along (50 %), **2** rotated (74 %) | — |
| Corpus (`stumpf`) | 2 (74 %) | — |
| Drawers + `C1`–`C3` | **2** (33 %; sheet 2 holds only the two `D3-S`) | 1 (23 %) |

- **The drawer job does not fit on one 18 mm sheet.** It overflows by the two
  side walls of `D3`, each 850 × 229.5 mm. The second sheet is almost empty.
  Options:
  - an offcut from the corpus sheets, which have about 1.6 m² left over, at
    least 870 × 250 mm;
  - a half sheet;
  - the shop's own offcuts.
- The corpus fits on 2 sheets only if parts may lie across the grain.
- Percentages are the wood area of the parts (windows and holes removed)
  divided by the sheet area.

## Consequences

- A conservative number to quote and buy against. A real nest by the shop can
  only need the same number of sheets or fewer.
- A parameter change (box sizes, number of parts) updates the count on the
  next `cnc.py` run.
- When contacting a shop, still ask whether they nest themselves (expected) and
  whether they have offcuts for the two `D3-S` boards.

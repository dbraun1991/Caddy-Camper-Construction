# 0034: Milled R2 edge break, top side only, joint faces stay sharp

Status: **Accepted** (2026-11-17). Related: [ADR 0023](0023-cnc-dxf-export-with-dogbones.md)
(DXF layers), [ADR 0024](0024-cnc-drawer-boxes-finger-joints-and-lightening-windows.md),
[ADR 0026](0026-windows-for-outer-drawers-hole-grid-for-middle-drawer.md),
[ADR 0027](0027-no-drawer-front-panels-box-front-with-grip-cut-out.md) (windows,
hole grid, grip). Idea: [docs/ideas/03](../ideas/03-kanten-abrunden.md).

## Context

Milled birch-ply edges are sharp and splinter-prone. The builder asked whether
the CNC shop can round them slightly, and what to call it. The shop terms are:

- *Kantenbruch*: edge break, the general term.
- *Fase*: a chamfer, e.g. 1 × 45°.
- *Radius / Abrundung*: a rounded edge, cut with an *Abrundfräser* or
  *Viertelstabfräser* (round-over bit).

Constraints:
- A router table works from above. The underside needs the part turned over and
  re-referenced, i.e. a second set-up and extra cost.
- Rounding a joint face leaves a visible gap at the joint. Joint faces are the
  finger joints, tenons, slots and the open notches for the cheek tenons.

## Decision

- **Radius R2** (builder's choice over R3 and a 1 mm chamfer), set in
  `cnc.kantenbruch.radius`. It applies only to the drawer/seat-board job
  (`cnc.kantenbruch.auftraege: ["schubladen"]`). The corpus boards are already
  cut to size on site.
- **Top side only, by the CNC.** The edges get their own DXF layer
  `KANTE_R2` (green). It holds the same lines as the cut contour below, for the
  shop to follow with the round-over bit. Layer contents:
  - drawer walls `-S`, `-E1`, `-E2`: the top rim, the grip cut-out (with its
    rounded upper corners), every window and every hole of the hole grid;
  - `C1`–`C3`: every outer edge that lies on the board's bounding rectangle,
    i.e. all round except the bottoms of the tenon notches;
  - not included: drawer bottoms `-B`, cheeks `-W*`, finger joints, tenons,
    slots, notches.
- **Underside by hand.** Before gluing up, the builder breaks the other side
  with a hand-held trimmer (R2) or a sanding block. When gluing, the
  CNC-rounded side of the drawer walls goes **inside**, where the hand reaches
  in. On `C1`–`C3` it goes **up**.
- `modell/cnc.py` selects the edges in `_kanten_r2()` from the finished face:
  - edges on the top line;
  - edges inside the grip area;
  - inner wires centred on a window or hole;
  - for the boards, outer edges on the bounding box.

  The text in `AUFTRAG.md` and the viewer tab comes from the same `abschnitte`
  list, so they cannot drift.

## Consequences

- One extra tool pass per part in the same set-up. The quote should still
  confirm the price.
- The model geometry, drawings and 3D viewer are unchanged. The rounding is a
  finish, not a dimension.
- Rounding the other side is not on the CNC. Asking the shop for two-sided
  machining instead is a price question for the quote.

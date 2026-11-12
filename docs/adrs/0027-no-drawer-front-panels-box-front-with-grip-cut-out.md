# 0027: No drawer front panels; the box front is the visible front, with a milled grip

Status: Accepted (2026-11-12). Supersedes the front-panel part of
[ADR 0011](0011-drawer-box-panel-shear-joinery.md) and resolves the deferred
"inset vs. overlay front" finding. Amends [ADR 0024](0024-cnc-drawer-boxes-finger-joints-and-lightening-windows.md)
(part codes) and [ADR 0026](0026-windows-for-outer-drawers-hole-grid-for-middle-drawer.md)
(hole grid also on the end walls).

## Context

Each drawer had a separate 18 mm front panel (`D1-F`…`D3-F`) spanning the full
section width, screwed on from inside last so the reveal could be adjusted
(ADR 0011). The inset/overlay decision had been deferred until the corpus was
built.

Once the drawers could be toggled individually in the viewer, the builder saw
that the front panels collide with the seat/table runners. The 170 kg runners
are 76 mm high but the boards only 32 mm, so the runner sticks 44 mm (`C1/C2`)
or 47 mm (`C3`) into the zone covered by the full-width front. With the
drawer closed, the seat or table board cannot extend: its runner would have to
pass through the front panel. That is true for inset and overlay fronts alike.
All 13 open overlaps in the model were front-panel overlaps.

The builder asked why front panels are needed at all. Their reasons no longer
hold for CNC boxes: the finger-jointed box is square and accurate to tenths of
a millimetre, so there is nothing to compensate, and hiding the runners is
exactly what causes the collision. They also cost ~3.4 kg of plywood, screws
and the handles.

## Decision

- **No front panels.** The box front wall is the visible front. `D1-F`…`D3-F`
  are retired (code not reused).
- The box is `kasten_tiefe` = 848 mm deep and flush with the seat/table boards
  at the front (1.5 mm proud of the corpus); the rear end stays where it was.
- Front and rear wall become separate parts: `-E1` box front with grip, `-E2`
  box rear (replacing `-E`, which was one part for both).
- **Grip: cut-out from the top edge** of `-E1`, 120 × 35 mm, R 15 at the bottom
  corners (`schubladen.griff`, `art: "ausschnitt"`). Chosen over a closed grip
  hole by the builder on Claude's recommendation: it can be grabbed from above
  and at an angle while seated, has no thin bridge above it carrying the pull,
  and gives a glimpse of the contents. `art: "loch"` switches to a closed
  grip hole if wanted. The sharp top corners of the cut-out are eased by hand.
- **Hole grid on all end walls**: the Ø 25 / 40 mm grid of ADR 0026 covers the
  whole free area of every `-E2`, and of every `-E1` except a 15 mm margin
  around the grip. The side walls keep their ADR 0026 assignment (windows on
  `D1/D2`, grid on `D3`).

## Consequences

- No more overlaps in the model (13 → 0). The seat and table boards extend
  with the drawers closed.
- About 20 mm gaps beside each drawer front show the runners; finger joints and
  bottom-tab ends are visible on the front. Reveals are no longer adjustable:
  they follow from the runner positions.
- Handles `V6` are dropped; `V7` is only needed for the corner brackets.
- The drawer box gains 18 mm of depth (848 instead of 830 mm).
- Drawer weight about 22.6 kg for all three boxes (the front panels would have
  added ~3.4 kg).

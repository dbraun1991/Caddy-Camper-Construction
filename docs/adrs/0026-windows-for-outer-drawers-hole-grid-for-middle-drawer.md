# 0026: Large windows in the outer drawers, a hole grid in the middle drawer

Status: Accepted (2026-11-12). Amends the lightening cut-outs of
[ADR 0024](0024-cnc-drawer-boxes-finger-joints-and-lightening-windows.md).
Extended by [ADR 0027](0027-no-drawer-front-panels-box-front-with-grip-cut-out.md):
the hole grid also covers every box front and rear wall.

## Context

ADR 0024 gave every drawer side wall four large windows. After the runner
layout of [ADR 0025](0025-drawer-runners-interleaved-between-seat-and-table-runners.md)
the windows of `D1/D2` sit above their runner and those of `D3` below it, so
the side walls come in two shapes. The builder asked whether identical parts
would be simpler, and then decided based on how the drawers are used:

- The outer drawers `D1/D2` are the ones opened a little while sitting or eating
  on the extended seat boards. Large windows let you reach in from the side and
  get at things without pulling the drawer all the way out. They are wanted.
- The middle drawer `D3` sits low (directly on `B1`) and does not need that.
  Large windows there would mainly let small items fall out, made worse by the
  low usable height. Ventilation and some weight saving are still welcome.

## Decision

- Per drawer, `schubladen.aussparung` in `modell/parameter.json` selects the
  side-wall cut-out: `fenster` (large windows, ADR 0024) for `D1`, `D2`;
  `lochraster` (hole grid) for `D3`; `keine` is also allowed.
- **Hole grid**: round holes Ø 25 mm on a 40 mm square grid (15 mm webs),
  `schubladen.lochraster`. It fills the same free bands as the windows, with
  the same margins (solid runner band ± 15 mm, top rim, web above the bottom
  slots, finger zone at the ends). On `D3` that is two rows of 17 holes below
  the runner.
- Holes are emitted as windows whose corner radius is half their side, so
  `cnc.py` cuts them as circles and the 3D viewer draws them as circles; no
  separate geometry path.

## Consequences

- The side walls stay two different parts (`D1-S/D2-S` with windows, `D3-S`
  with holes). They are easy to tell apart, so mixing them up at assembly is
  unlikely.
- Weight of the three boxes without front panels: about 23.0 kg instead of
  22.2 kg with windows everywhere, 26.4 kg with no cut-outs at all.
- Ø 25 mm is well above the assumed 6 mm cutter; the holes add machining time
  (34 per wall), which may show up in the CNC quote. Diameter and pitch are
  parameters if the service suggests otherwise.

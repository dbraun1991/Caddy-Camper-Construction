# 0029: Cheeks sized to the moving runner member, flush seat, through-tenoned cheeks, taller middle drawer

Status: Accepted (2026-11-12). Amends the element heights and the cheek rule of
[ADR 0028](0028-height-plan-board-on-cheeks-foolproof-runner-layout.md) (board
1.5 mm proud, cheeks ending 20 mm above the runner bottom, equal drawer boxes)
and decides its open "how are board and cheeks joined" question.

## Context

While checking leg room between the seat and the table, the builder pointed out
that the cheek rule of ADR 0028 measured the cheek against the wrong part.
When a 170 kg runner is extended, only three parts stand out of the corpus: the
lock lever (30 mm), the outermost telescope member (430 mm long, 30 mm high)
and the middle telescope member (430 mm long, 55 mm high). The rest stays in
the housing. So the 55 mm member is what the cheek sits beside outside the
box, not the full 76 mm runner body.

The builder also wants the seat planned exactly flush with the runner top.
Space is tight, and up to 1 mm of build deviation is absorbed by the cheek's
clearance, so no extra margin is needed.

Three related questions were answered in the same conversation:

- The middle drawer `D3` should get about 15 mm more height.
- Board and cheeks are joined by through-tenons and glue, the variant
  recommended by Claude. Who makes the parts (CNC or plain cutting) stays open.
- The load-floor height above the ground is not measured, and the Caddy's
  standard value is good enough (±10 cm doesn't matter).

## Decision

- **Cheek bottom = bottom of the 55 mm member + 2 mm**
  (`schienen.typen.schwer.hoehe_auszug` = 55, `elemente.wange_spiel` = 2). The
  member is centred in the runner (confirmed by the builder), so the cheek ends
  (76 − 55) / 2 + 2 = 12.5 mm above the runner bottom. The cheek is
  45.5 mm high, with 25.5 mm of wood below the hole line (≥ 15, still asserted).
  `wange_luft` is retired.
- **Board top flush with the runner top** (`ueberstand_brett` = 0). The
  element is 63.5 mm high.
- **Through-tenons + glue**: each cheek has 5 tenons, 50 mm long, through
  slots in the board (`elemente.wangenzapfen`). The tenons are board thickness
  + 1 mm high and are sanded flush after gluing; the cheek blank is
  870 × 64.5 mm. The slots fix the cheek spacing, which the runners need to
  run freely. The tenons are model parts flagged as intended overlaps, like the
  corpus tenons. `C1`–`C3` are still not in a CNC job.
- **`D3` is taller than `D1/D2`** by `kasten_mitte_plus` = 15 mm, capped at
  `boden_luft` (3 mm) below the `C3` cheeks. The new cheeks reach 6 mm lower
  than before, so the cap applies: `D3` is 227.5 mm high (21–248.5), i.e.
  13 mm more than the 214.5 mm of ADR 0028. The model records the shortfall
  (`gekappt`) instead of failing.
- **`D3` runner capped below the `C3` runner** on the same face of `M1/M2`
  (`abstand_tischschiene` = 5 mm, asserted). "As high as possible" now means
  181–234 instead of 5 mm under the box top.
- **Load floor 580 mm above the ground** (`fahrzeug.ladekante_hoehe`). This is
  the published value for the Caddy 2K panel van, and it is not measured. The
  viewer uses it only for the ground grid and placeholder underbody and wheels.

Resulting plan (mm above the load floor; `B1` top 18, `T1` underside 320):

| | sections L/R | middle section |
|---|---|---|
| lower | seat element 30.5–94 (runner 18–94) | drawer box `D3` 21–248.5 (runner 181–234) |
| upper | drawer box `D1/D2` 99–315 (runner 104–157) | table element 251.5–315 (runner 239–315) |

## Consequences

- **Box heights:**
  - `D1/D2` grow by 1.5 mm to 216 mm (inner 194 mm).
  - `D3` grows by 13 mm to 227.5 mm (inner 205.5 mm).
  - The drawer CNC job is regenerated, and `D3` boards now differ from
    `D1/D2` in height too.
- **Cheeks:** they are longer (45.5 mm instead of 39.5 mm, blank 64.5 mm with
  tenons). This costs a little material, but they no longer hang 7.5 mm lower
  than the steel they guard.
- **Leg room, seat top to the extended table:**

  | to | distance |
  |---|---|
  | runner body | 145 mm |
  | 55 mm member | 155.5 mm |
  | cheeks | 157.5 mm |
  | board underside | 203 mm |
  | table top | 221 mm |

  Knees under the table edge remain tight, as discussed with the builder.
- **Seat height above the ground:** the seat is about 674 mm up with the
  assumed 580 mm sill, roughly bar-stool height.
- **Runner faces on `M1/M2`:** the outer-section face stays below 139 mm above
  `B1`, and the middle face above 163 mm. The 150 mm pencil line still
  separates them. Mounting heights above `B1`:

  | runner | height |
  |---|---|
  | `C` | 0 |
  | `D1/D2` | 86 |
  | `D3` | 163 |
  | `C3` | 221 |


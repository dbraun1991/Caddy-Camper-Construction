# 0031: Seat and table boards flush with the middle runner member, minimal cheeks

Status: Accepted (2026-11-13). Amends [ADR 0029](0029-cheeks-sized-to-the-moving-runner-member-flush-seat-taller-middle-drawer.md)
(board flush with the runner top, cheek ending 2 mm above the 55 mm member,
`D3` +13 mm). The build-up of [ADR 0028](0028-height-plan-board-on-cheeks-foolproof-runner-layout.md)
stays: the board lies on two cheeks that are through-tenoned into it.

## Context

ADR 0029 placed the board tops flush with the top of the runner body (76 mm).
Once a runner is extended, though, only the 55 mm middle member and the 30 mm
inner member stand out of the corpus. The housing stays inside. The builder
called "flush with the housing top" nonsense for the table: outside the box
nothing would ever stand above a board that sits lower. Variants considered
for `C3` (2026-11-12/13):

- **Flush with the 30 mm inner member.** The hole line would sit 3 mm above the
  board underside. With the board on the cheeks, the screw would land in the
  glue joint. With the board between the cheeks, the tenon notches would reach
  below the hole line, so the screws would hit the tenons. **Eliminated.**
- **Flush with the 55 mm member, board between the cheeks.** Feasible, but a
  sitting load would bear only on 5 × 50 mm of tenon instead of the whole cheek
  top. **Eliminated.**
- **Cheek alternatives without tenons** (blocks, a thicker board, dowels only).
  **Eliminated:** the builder wants through-tenons for stability.
- **Flush with the 55 mm member, board on the cheeks.** **Chosen**, and the
  builder wants it for the seat boards too.

The cheek bottom also had to follow one rule for all three elements. The
choice was between "2 mm above the 55 mm member" (ADR 0029) and "only the
15 mm of wood the screw needs below the hole line" (`rand_lochreihe`). The
builder chose the second. Along its length the element is carried by the steel
runner, so more cheek adds no strength.

## Decision

- **Board top flush with the top of the 55 mm middle member**
  (`elemente.ueberstand_mittelteil` = 0). That is (76 − 55) / 2 = 10.5 mm below
  the runner top. Extended, nothing stands above the seat or the table outside
  the box.
- **Cheek bottom 15 mm below the hole line** (`rand_lochreihe`), i.e. 23 mm
  above the runner bottom.
  - The cheek is 24.5 mm high; its blank is 870 × 43.5 mm including the
    tenons.
  - The hole line sits 9.5 mm below the board underside, in solid cheek wood.
  - The element is 42.5 mm high.
  - `wange_spiel` is retired.
- **Joinery as in ADR 0029:** 5 through-tenons per cheek, glued and sanded
  flush on top. The board bears on the full cheek length.
- **The table runner stays 5 mm under `T1`** (239–315). The table board
  follows it: 286.5–304.5, 15.5 mm below `T1`.
- **`D3` is 229.5 mm high** (`kasten_mitte_hoehe`: 214.5 + the full 15 mm). It
  could grow to 238 mm (3 mm under the `C3` cheeks); it is capped there
  automatically.
- **Drawer runner vs. board runner on the same wall face:**
  - The rule is now general (`abstand_gleiche_seite` = 5 mm, replacing
    `abstand_tischschiene`).
  - `D1/D2` boxes start 5 mm above the lowered seat board.
  - Their runners must stay 5 mm above the seat runner, so they sit 99–152.

Resulting plan (mm above the load floor; `B1` top 18, `T1` underside 320):

| | sections L/R | middle section |
|---|---|---|
| lower | seat element 41–83.5 (runner 18–94) | `D3` 21–250.5 (runner 181–234) |
| upper | `D1/D2` 88.5–315 (runner 99–152) | table element 262–304.5 (runner 239–315) |

## Consequences

- **Distances from the seat top (83.5) to the extended table:**

  | to | distance |
  |---|---|
  | runner body | 155.5 mm |
  | 55 mm member | 166 mm |
  | cheeks and inner member | 178.5 mm |
  | board underside | 203 mm |
  | table top | 221 mm (unchanged) |

  Knee room in front of the box grows by 21 mm compared with ADR 0029.
- **Seat height:** the seat is 10.5 mm lower, about 66 cm above the ground with
  the assumed 580 mm load sill.
- **Box heights:**
  - `D1/D2` grow to 226.5 mm (inner 204.5).
  - `D3` grows to 229.5 mm (inner 207.5).
  - Window height in `D1/D2` is about 118 mm.
  - The three boxes weigh about 19.8 kg.
- **Material:** the six cheeks shrink from 870 × 64.5 to 870 × 43.5 mm.
- **Mounting heights above `B1`:**

  | runner | height |
  |---|---|
  | `C` | 0 |
  | `D1/D2` | 81 |
  | `D3` | 163 |
  | `C3` | 221 |

  On `M1/M2` the outer face stays below 134 mm and the middle face above
  163 mm, so the 150 mm pencil line still separates them.
- **Housing above the boards:** inside the corpus the runner housing stands
  10.5 mm above the board tops. That only shows when an element is retracted,
  where nobody sits.

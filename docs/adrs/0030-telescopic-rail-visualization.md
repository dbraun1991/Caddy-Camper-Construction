# 0030: Telescopic rail visualization (housing, middle and inner member)

Status: Accepted (2026-11-12). Supersedes [ADR 0005](0005-simplified-rail-visualization.md).

## Context

ADR 0005 drew only the inner, moving member of each runner, as one red box the
length of the whole runner that travelled with its element. It left out the
wall-fixed member so the render would not hide the clearance gap.

ADR 0029 sized the seat/table cheeks to what actually stands out of the corpus
when a 170 kg runner is extended. Measured by the builder, that is the lock
lever (30 mm), the outermost telescope member (430 mm visible, 30 mm high) and
the middle member (430 mm visible, 55 mm high, centred). The old render showed
a full 76 mm-high block 870 mm in front of the corpus. That was wrong, and it
made it impossible to judge leg room and clearance under the extended boards
by eye. The builder asked for the extended state to match the measured values,
for silver-grey runners, and for the members further inside to be darker.

## Decision

The viewer (`schieneTeleskop()` in `index.html`) draws every runner of the
model (`E-*` parts) as three nested members plus the lever:

| part | colour | height | travel when extended |
|---|---|---|---|
| housing, at the wall | light silver | `hoehe` | stays in place |
| middle member | mid grey | `hoehe_auszug` | `auszug_mitte` |
| inner member, at the element | dark grey | `hoehe_innen` | full runner length, with the element |
| lock lever, in front of the inner member | darkest | `hoehe_innen` | full runner length, with the element |

- **Heights** are centred on the runner's hole line.
- **Thickness:** the 19 mm runner thickness is split roughly 7/6/6 mm between
  the members for display only. A 0.5 mm gap toward the element keeps the old
  rule of not drawing into the clearance.
- **Source of the dimensions:** all of them come from
  `schienen.typen.*` in `modell/parameter.json`. The 170 kg values are
  measured.
- **80 kg runner:** `hoehe_auszug` 38, `hoehe_innen` 21 and `auszug_mitte` 425
  are estimates (the 170 kg runner's proportions, half the travel), marked as
  such in the parameter file.
- **Clicking:** the middle and inner members are clickable like their element,
  and both move with its toggle.
- **The model is unchanged:** the runner is still one box per side, so the
  overlap check, the drawings and the CNC output are not affected.

## Consequences

- **What the render shows now:** in Bank/Pack mode the extended runners look
  as they do on the car, a stepped steel profile under each board instead of
  a full-height bar. The housing is visible inside the corpus, which also shows
  the runner bands on the walls.
- **Placeholders:** if the 80 kg runner is measured, update its three values
  and regenerate `modell/modell.js`.
- **Cost:** about four meshes per runner instead of one (48 instead of 12). That
  is negligible.

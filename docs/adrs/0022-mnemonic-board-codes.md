# 0022: Mnemonic part codes for the boards (Bottom, Rear, Side, Mid, Top, Fold)

Status: Accepted (2026-11-07)

## Context

The board codes grouped parts by orientation: `A` horizontal top (`A1` lid,
`A2`/`A3` hinged sleeping boards), `B` vertical walls (`B1` back, `B2-F`/`B2-B`
side walls, `B3-1`/`B3-2` dividers), `F` floor (`F1`). The builder found them
hard to read: a code said where a board lies, not which board it is, and the
wall codes needed suffixes (`-F`/`-B` for driver/passenger side, `-1`/`-2`) to
tell the boards apart.

## Decision

Each board gets a letter that is an English mnemonic for the part. The long
German names stay unchanged.

| Part | Old | New | Mnemonic |
|---|---|---|---|
| Bodenplatte | `F1` | `B1` | Bottom |
| Rückwand | `B1` | `R1` | Rear |
| Seitenwand links / rechts | `B2-F` / `B2-B` | `S1` / `S2` | Side |
| Trennwand links / rechts | `B3-1` / `B3-2` | `M1` / `M2` | Mid |
| Deckplatte | `A1` | `T1` | Top |
| Klappbrett Rücksitz / Kopfende | `A2` / `A3` | `F1` / `F2` | Fold |
| Scharniere (model only) | `S1-1…3` / `S2-1…3` | `H1-1…3` / `H2-1…3` | Hinge |

- Tenon ids follow their wall (`S1-Z1u`, `M2-Zh`, `R1-Z3o`).
- The suggested alternatives clashed with existing codes and were rejected:
  `D1` for the lid (taken by the left drawer box), `B1` for both the back wall
  and the bottom ("Back" vs "Bottom"), so the back wall became `R1` (Rear).
  The side walls took `S`, so the model's hinges moved from `S` to `H`.
- `C` (seat/table boards), `D` (drawers), `E` (runners), `V` (fasteners) and
  `G` (equipment) keep their codes.
- Like the 2026-10-17 renaming (`B4`→`F1`, `F1`–`F17`→`V1`–`V17`), the existing
  ADRs, documents, model, drawings and viewer were all updated in place.
  Lowercase identifiers followed (`laenge_f1`/`laenge_f2`, `r1_mitten`,
  sheet files `brett-b1-t1`, `brett-s-m`, `brett-r1`).

## Consequences

- `F1` and `B1` now name different boards than before. That is the cost of
  this change: printouts, notes, messages or commits from before 2026-11-07
  mean the old parts. The glossary in `List_of_Materials.md` lists the old code
  next to each new one.
- The letter no longer tells the orientation. That information was never used
  in the build plan; the long name and the drawings carry it.
- The sections "A — Liegefläche" and "B — Unterbau-Korpus" in
  `List_of_Materials.md` are now "Liegefläche (T1, F1, F2)" and "Korpus —
  Unterbau"; references to `§B` became `§Korpus`.

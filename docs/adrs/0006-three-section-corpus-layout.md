# 0006: Three-section corpus layout (312 / 424 / 312 mm)

Status: Accepted

## Context

The Caddy Mk3's usable load-bay width is 1,120 mm. The build needs to fit, per
side, a drawer stacked under a seat board (or vice versa in the middle), all on
900 mm full-extension rails, while leaving a flat, continuous sitting/sleeping
surface on top. A single full-width unit would make each pull-out 1,048 mm wide
(after wall thickness) — too wide for one set of rails to support rigidly at
900 mm depth, and too heavy per drawer.

## Decision

Split the corpus into three sections with two internal dividers (`B3`, 18 mm
each): left and right sections at 312 mm clear interior width, a middle section
at 424 mm. Each section gets one drawer and one board (seat board L/R, table
board M), each independently mounted on its own rail pair. Section width is
derived, not arbitrary:

```
interior width − 2 × 19 mm rail thickness − 2 mm gap = element width
```

so that the corpus interior dimension is the single source of truth and element
widths fall out of it (see `index.html` comments around `x1`/`xM`/`x3`/`sw1`/
`swM`/`sw3`, and `List_of_Materials.md` §B/§C/§D).

## Consequences

- Three independent, lighter pull-outs instead of one wide one — each rail pair
  only has to carry one drawer or one board's worth of load.
- The middle section (424 mm) is wider than the two side sections (312 mm each)
  because it isn't constrained by matching an outer wall — this asymmetry is
  intentional, not a layout bug.
- Any change to `UW` (unit width), wall thickness (`TH`/`DW`), or rail thickness
  must flow through the width formula above in both `index.html` and
  `List_of_Materials.md` §B — the three section widths are derived values, not
  independently editable numbers.
- Two full-height dividers (`B3` × 2) are structural, not cosmetic: they carry
  rail mounting loads on both faces (see
  [ADR 0007](0007-dowel-screw-bracket-joinery.md) for how they're joined to the
  rest of the corpus).

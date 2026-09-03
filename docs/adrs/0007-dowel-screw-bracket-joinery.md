# 0007: Dowel + screw + corner-bracket joinery over glue-only or biscuits

Status: Accepted

## Context

The corpus is built from birch multiplex (Birke-Multiplex). This material holds
screws well face-on but poorly in end grain (Hirnholz) — and the sleeping
platform lid (`A1`) rests directly on the end grain of all four verticals
(`B2` × 2 side walls, `B3` × 2 dividers), which is exactly the weak orientation.
The unit lives in a vehicle and is subject to continuous driving vibration, so
the joint must survive cyclic loading, not just a static load test. Full
documented reasoning lives in `List_of_Materials.md` §H.

Options considered:
- **Screws only into end grain** — known to loosen under sustained vibration.
- **Glue only** — strong initially, but makes the corpus permanently
  non-disassemblable, which is impractical for a vehicle module that may need
  to come out for maintenance or a different vehicle, and multiplex expands/
  contracts with the temperature swings of an unheated vehicle interior.
- **Lamello/Domino biscuit joinery** — effective but disproportionate tooling
  investment for one vehicle module.

## Decision

Use three combined elements at every lid-to-vertical joint, applied in this
order: (1) 8×40 mm dowels every ~200 mm for alignment and shear strength, (2)
4×45 mm countersunk screws from above every 120–150 mm, offset from the dowels,
for tension across the joint, (3) 40×40×2 mm steel corner brackets at all 4
top corners for dynamic/vibration reserve. Dividers are glued and screwed from
outside through the side walls; the back wall (`B1`) is fully glued as the
main anti-racking (Verwindung) element, secured with ≥6 screws.

## Consequences

- The corpus is strong under vibration without being permanently glued shut —
  a deliberate middle ground for a vehicle-mounted, occasionally-removable
  module.
- Build order is constrained: back wall + side walls + dividers assembled and
  glued/screwed first, then corner brackets, then the lid doweled and screwed
  on, and only then are rails measured and mounted against the now-final
  interior dimension (`List_of_Materials.md` §H "Montagereihenfolge"). Don't
  cut rail-dependent parts before the corpus shell is physically assembled.
- This joinery method assumes birch multiplex specifically (chosen for its
  strong face-grain screw holding and dimensional stability); switching wood
  types would require revisiting this decision, not just substituting the
  material name.

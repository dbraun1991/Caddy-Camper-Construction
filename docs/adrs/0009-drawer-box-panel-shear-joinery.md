# 0009: Drawer boxes braced by their bottom panel, not by corner joints

Status: Accepted

## Context

`List_of_Materials.md` §D specifies the three drawer boxes as 18 mm multiplex
sides/front/back with a 12 mm bottom, but §H only covered the *corpus* joints
(lid-to-verticals, dividers, back wall). The drawer boxes themselves, the
visible front panels (`Frontblende`), and the rail attachment faces had no
documented joining method.

The drawer box geometry is hostile to simple screwing: the long sides
(18 × 880 × 248) meet the front and back panels (272/384 × 18 × 248) edge-on, so
every one of the four corner joints is a screw into end grain (Hirnholz) — the
same weak orientation ADR 0007 rejected for the corpus lid. Reproducing ADR
0007's full dowel + screw + bracket stack at 12 corner joints is a lot of work
for a box that only carries stored cargo.

Options considered:
- **Corner joints as the primary structure** (dowels/brackets at all 12 corners)
  — strong, but 12× the layout work and every bracket eats interior volume.
- **Rabbet/dado joinery** (Nut und Falz for the bottom and corners) — rigid and
  elegant, but needs a router table and exact fences for 3 boxes of 2 sizes.
- **Bottom panel as the shear web** — the 12 mm bottom is glued and screwed over
  the full 880 mm footprint, so it, not the corners, resists racking.

## Decision

Treat the 12 mm bottom panel as the drawer box's bracing element, exactly as
ADR 0007 treats the back wall (`B1`) as the corpus's anti-racking panel:

1. Corner joints are glue (D3) + 2× 4 × 40 mm countersunk screws through the
   front/back panel into the side's end grain — alignment and assembly only,
   not the load path.
2. The 12 mm bottom is glued over its whole contact area and screwed with
   3,5 × 30 mm screws every ~150 mm into the lower edge of all four walls. This
   is the joint that actually matters.
3. One 20 × 20 × 240 mm softwood cleat glued and screwed into each of the four
   inside vertical corners, for vibration reserve — the drawer-scale equivalent
   of ADR 0007's steel corner brackets.

The visible front panel (`Frontblende`) is **not** part of the box structure: it
is mounted last, from inside the box, with 4× 4 × 30 mm screws through the box
front panel, after the box runs on its rails and the reveal gap has been set
with two temporary screws. No fastener is ever visible from outside.

Rail inner members screw to the box side **faces**, not edges — 18 mm face grain
is the orientation multiplex holds best, and this is why the box sides are
18 mm rather than 12 mm. Screws into the sides are limited to 3,5 × 16 mm so
they cannot punch through an 18 mm panel.

## Consequences

- Build order inside the box is fixed: four walls dry-assembled, then glued and
  corner-screwed, then the bottom glued and screwed on (this squares the box —
  check the diagonals *before* the glue grabs), then the corner cleats, then the
  rails, and only then the front panel.
- The box is only as stiff as the bottom panel's screw line. Substituting a
  thinner bottom, or switching to a slide-in bottom in a groove, removes the
  bracing this decision relies on and would require revisiting it.
- The front panel being independently adjustable is deliberate: the reveal gap
  against the neighbouring section is set once on the vehicle, after the corpus
  and rails are final, and can be corrected without touching the box.

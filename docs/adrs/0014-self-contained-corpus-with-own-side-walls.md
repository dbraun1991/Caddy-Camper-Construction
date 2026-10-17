# 0014: Self-contained corpus with its own side walls (`B2`), removable as one unit

Status: Accepted

## Context

`List_of_Materials.md` §B listed the side walls `B2` with the note "ggf. entfällt
wenn Karosserie als Wand dient", leaving open whether the vehicle body could
replace them. That question has to be settled before cutting the corpus, because
it decides where the outer rails of the left and right sections are fastened.

Options:

- **Use the vehicle body / trim as the outer wall** — saves two 18 mm panels
  (~4 kg) and 36 mm of width. But the outer rail members would have to be
  screwed into the side trim or sheet metal. The trim is not a load-bearing
  surface for a 900 mm cantilever with a person sitting on it, and screwing
  into the body is exactly what [ADR 0012](0012-non-destructive-vehicle-tie-down.md)
  rules out. It would also tie the furniture permanently to the car.
- **Own side walls `B2`** — every rail is screwed into the face of 18 mm
  multiplex (`B2` or `B3`), as §H1 already assumes.

## Decision

Keep both side walls `B2` (18 × 900 × 320 mm, 2 pcs). **All rails are fastened
to the corpus's own wood only** — outer members on `B2` and `B3`, inner members
on the drawer boxes and seat/table boards. Nothing that moves or carries load is
attached to the vehicle; the only connection to the car is the tie-down from
ADR 0012 (four brackets on `B4` to the factory lashing eyes, plus straps).

This matches the geometry already in use: the section-width formula in
[ADR 0006](0006-three-section-corpus-layout.md) and `index.html`
(`bL`/`bR`, "B2 Innenfläche") already deduct the two 18 mm side walls from the
1,120 mm unit width, so no dimension changes.

## Consequences

- **The whole module is removable as one unit**: lift off the loose sleeping
  boards `A2`/`A3`, release the two straps and the four M8 nuts at the lashing
  eyes, and slide the corpus out — with `A1`, rails, drawers and boards still in
  place, aligned and working. No re-adjustment of the rails is needed when it
  goes back in. This extends the "removable with a socket wrench" property noted
  in ADR 0007 and ADR 0012 from the shell to the complete furniture.
- The corpus can be built, adjusted and tested entirely outside the vehicle
  (assembly steps 1–6 in `List_of_Materials.md` §H), which is easier than working
  inside the load bay.
- **Weight**: the complete module (corpus, `A1`, three drawers, three boards,
  twelve rail members) is well above the 40–55 kg quoted for the empty shell in
  ADR 0012. Lifting it out is a two-person job; empty the drawers first, and take
  the drawers off their rails if the runners have a release lever (to be checked
  on the delivered rails — not verified for the selected models).
- **Fit through the tailgate**: the module is 1,120 × 900 × 320 mm. Since the
  assembly order brings the finished corpus into the vehicle through the
  tailgate (step 7), whatever fits in also comes out — but the tailgate opening
  width has not been measured; the Caddy shell dimensions in `index.html` are
  placeholders. Measure it, together with the 1,120 mm between the wheel arches,
  before cutting `B1`, `B4` and `A1`.
- The 36 mm of width spent on the two side walls is not available to the
  sections; this was already the case in all published dimensions.

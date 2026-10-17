# 0012: Non-destructive tie-down via factory lashing eyes, no holes in the body

Status: Accepted

## Context

The under-floor corpus is roughly 40–55 kg empty and considerably more loaded.
In a frontal impact an unsecured load of that mass becomes a projectile into the
occupant cell, so the unit has to be positively located in the vehicle, not just
set down on the load floor. README's "Weiterführende Planung" tracked this as an
open point ("Befestigung Unterbau im Fahrzeug (L-Winkel, Zurrösen)") with no
decision recorded.

The Caddy Mk3 Kombi has four factory lashing eyes (Zurrösen) in the load floor,
anchored into the body structure and rated for load securing.

Options considered:
- **Bolting through the load floor into the body** — the strongest option, but it
  breaches the floor's corrosion protection and the underbody sealing. In an
  unheated vehicle with condensation under a closed box (the ventilation problem
  is still open) that is an invitation to rust from the inside out, it is
  irreversible, and it risks drilling into fuel, brake or wiring runs that are
  not visible from inside.
- **Friction and anti-slip matting alone** — fine against sliding in normal
  driving, worthless in a crash.
- **Factory lashing eyes as the sole anchor path** — reuses attachment points
  that are already engineered and corrosion-protected for exactly this load case.

## Decision

Secure the corpus exclusively through the four factory lashing eyes. No new hole
is drilled in the vehicle body, floor, or trim.

- Four 40 × 40 × 2 mm steel L-brackets screwed to the corpus bottom plate (`F1`)
  from inside with 4 × 30 mm screws, each bracket connected to one lashing eye
  with an M8 bolt, washer and self-locking nut.
- Two ratchet straps over the corpus as a redundant path, and as the only
  restraint while the bolted brackets are not yet fitted.
- A 1.120 × 900 mm anti-slip mat (`G3`) under the corpus — it takes out
  low-level movement and rattle, and protects the load floor, but is explicitly
  *not* counted as part of the restraint.

If the four eyes turn out to be positioned such that the brackets cannot reach
them, the fallback is an aftermarket airline/lashing rail that itself bolts into
the existing eyes — still no new holes.

## Consequences

- The whole module stays removable with a socket wrench, which is the same
  property ADR 0007 deliberately preserved for the corpus joinery; the two
  decisions are consistent on purpose.
- Bracket positions on `F1` cannot be laid out from the drawings. They have to be
  transferred from the actual eye positions in the vehicle, which means `F1` is
  drilled on the car, after the corpus shell is assembled — one more reason the
  assembly order in `List_of_Materials.md` §H ends with the vehicle, not starts
  with it.
- This is a load-securing measure, not a certified restraint. It is not a
  substitute for an engineering sign-off if the build is ever presented for a
  §19/§21 StVZO inspection, and nothing here makes the extended seat boards
  legal seating while driving.

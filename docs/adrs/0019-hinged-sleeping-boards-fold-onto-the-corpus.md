# 0019: Hinged sleeping boards fold back onto the corpus for driving

Status: Accepted — amends [ADR 0004](0004-static-scene-graph-with-z-position-toggle.md) (viewer modes)

## Context

The sleeping boards `A2` (700 mm, on the folded rear seat backs) and `A3`
(400 mm, towards the front headrests) were loose and joined to their
neighbours only by overlap battens (§H4). To drive with the rear seats in use,
both boards have to go somewhere. The builder wants them hinged to the corpus so
they fold back onto the box, using standard surface-mounted hinges.

## Decision

- **`A1`↔`A2`: hinges on top**, **`A2`↔`A3`: hinges underneath** — 3 standard
  folding hinges per joint (`modell/parameter.json` → `scharniere`).
- A surface-mounted hinge only opens towards the side its knuckle is on. On top
  of `A1`↔`A2`, `A2` can only swing up and over onto the box, never sag below
  the platform. Underneath `A2`↔`A3`, `A3` can only fold down while flat; once
  `A2` lies upside down on the box, "down" faces up and `A3` folds onto `A2`.
  Result: a stack `A1` / `A2` / `A3` on the box.
- The pivot axis sits ~3 mm above/below the board face, so the folded boards lie
  ~6 mm apart (the hinge leaves sit in between). Folded positions, computed and
  checked in the viewer: `A2` y 344–362, z 200–900; `A3` y 368–386, z 200–600
  — fully on the corpus; stack height 386 mm.
- The overlap battens `V13` between `A1`/`A2`/`A3` are dropped: the hinges
  locate the joints, and a batten under `A2`'s edge resting on `A1` would also
  block the fold.
- Viewer: two new modes. **Fahrmodus 1** folds both boards onto the box and
  hides the mattress (stowed). **Fahrmodus 2** additionally shows the rear seats
  upright (5 seats). The fold axes come from `modell.py` (`klappachsen`);
  `A2`/`A3` sit in pivot groups that are rotated by 180°.

## Consequences

- ADR 0004 said modes only move parts along Z. The fold modes also **rotate two
  pivot groups**; all geometry still lives permanently in the scene graph and
  nothing is created or removed per mode.
- **Load securing while driving:** the folded stack is held only by the three
  hinges at z = 900. Strap it down to the corpus (e.g. one of the ratchet
  straps `V11`) and stow the mattress securely — loose boards of this size are
  projectiles under hard braking.
- The upright rear seat geometry in the viewer is a placeholder; only the
  position of the seat back (at the measured 920 mm load depth) is grounded.
- The headrest loops of `A3` (§H4) are released before folding.

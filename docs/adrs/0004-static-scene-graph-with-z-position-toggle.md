# 0004: Static scene graph with Z-position toggling instead of per-mode subtrees

Status: Accepted

## Context

The build has three usage modes (Schlafmodus, Bankmodus, Packmodus) that differ
only in which movable elements are extended: 3 drawers, 2 seat boards, 1 table
board, each riding a pair of rails. An earlier version of `index.html` gave
`bankG` and `packG` groups their own geometry (dashed runner-line helpers) that
were shown/hidden by toggling `.visible` per mode, separately from the meshes
living in the static group `sg`. This duplicated position bookkeeping between
"the real geometry" and "the mode-specific hint lines" and was removed in the
"Imrpovements and transparent objects" commit.

## Decision

All 6 movable elements and their 12 paired rail inner-members live permanently
in the single static group `sg`, always fully rendered as real 3D bodies. Mode
switching (`window.setMode`) does exactly one thing: set `.position.z` on those
18 objects to either `zIn` (collapsed, flush with the unit body) or `zOut`
(extended 900 mm toward the vehicle rear), based on which mode is active.
`bankG` and `packG` remain declared as empty, `.visible`-toggled groups but hold
no geometry — see the note in
[AGENTS.md — Possible viewer improvements](../../AGENTS.md#possible-viewer-improvements-not-requested-yet--candidates-only).

## Consequences

- Every element is a complete, always-visible 3D body in every mode — there's
  no mode where a drawer or board "doesn't exist," only where it's positioned.
  This matches how someone reasons about the real object (nothing physically
  disappears when you push a drawer in).
- Mode switching is a single array-map over Z positions
  (`index.html`'s `setMode`), not a scene graph rebuild or subtree swap — cheap,
  and impossible to get out of sync between an element and its rail.
- `bankG` / `packG` are dead weight: declared, added to the scene, and their
  `.visible` flag is still set in `setMode`, but nothing is ever added to them.
  Removing them (or giving them a real purpose, e.g. mode-specific dimension
  callouts) is an open cleanup, not yet done because it's purely cosmetic to the
  codebase and has no effect on what's rendered.
- Any future per-mode-only visual (e.g. a callout that should only show in
  Bankmodus) should go through this pattern — a permanent object in `sg` toggled
  by state, not a duplicate subtree — to avoid re-introducing the bookkeeping
  problem this decision removed.

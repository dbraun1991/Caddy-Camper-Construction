# 0009: Translucent Caddy shell as a separate, toggled overlay group

Status: Accepted

## Context

The viewer showed only the built-in unit, so people seeing it for the first
time could not tell where it sits inside the vehicle. A see-through Caddy body
makes that obvious. [ADR 0004](0004-static-scene-graph-with-z-position-toggle.md)
keeps all build geometry permanently in the static group `sg` and switches modes
only by moving parts along Z; the shell is not build geometry and must combine
with every mode.

## Decision

- The shell lives in its own group `caddyG`, visible by default (default camera: rear right, radius 48), and is toggled
  only via `visible` by a "Caddy-Hülle" button. It is independent of the three
  modes and does not touch `sg`.
- It is built from simple box panels (side walls, roof, front wall, two
  wheel-arch boxes, two front-seat backrests incl. headrests) via `box()`, in mm.
  The rear (z = 0) is deliberately left open so extended drawers and boards stay
  visible.
- One shared material `mCaddy` with opacity 0.60, `depthWrite: false`,
  `DoubleSide` and a higher `renderOrder`, so it draws after the build parts
  without hiding them.
- Enabling the shell zooms the camera out to a radius of at least 48 so the
  ~2.4 m long body fits the view.
- The dimensions (1,500 mm wall width, 1,170 mm between arches, 1,200 mm height,
  2,400 mm length) are placeholders from public data sheets and are **not
  measured**. They are collected in one constants block in `index.html` and must
  be verified against the real vehicle.

## Consequences

- No change to how modes work; the shell adds one group and one button.
- At 60 % opacity the shell noticeably tints the build behind it. If that hurts
  readability, lower the opacity in `mCaddy` — a tweak, not a new decision.
- The shell is only as accurate as its placeholder dimensions; do not use it to
  derive cut dimensions.

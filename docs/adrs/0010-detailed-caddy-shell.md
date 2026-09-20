# 0010: More detailed Caddy shell — door openings, rear-seat states, load-floor plane

Status: Accepted (extends [ADR 0009](0009-translucent-caddy-shell-overlay.md))

## Context

The first shell (ADR 0009) was a closed box with wheel arches and two seat
backs. That made it hard to see how the unit and sleeping platform relate to the
real openings (where you can reach the drawers from the side, where the boards
sit relative to the seats), and it ignored the rear seats that board B1 rests on.

## Decision

Keep everything inside the toggled group `caddyG` and add:

- **Door openings** as real holes in both side walls: a sliding-door opening
  (z 850–1650 mm) and a front-door opening (z 1900–2850 mm). Walls are built from
  panels around the openings by `sideWall()`, driven by the `doorOpenings` table.
- **Front seats** with backrest and seat cushion, and the shell lengthened to
  3,000 mm so the cabin is included.
- **Rear bench** in its own subgroup `rearSeatsG`, shown flipped flat by default
  (base + folded backrest, top just below platform height 320 mm, where board B1
  rests) and hideable via a "Rücksitze" button to show the seats removed.
- **Load-floor reference plane** at y = 0 (light-green, 2 mm thick) from the
  tailgate to the front-seat backrest line, marking where the build starts.

All values are placeholders and unmeasured (see ADR 0009); they live in the
shell constants block and the `doorOpenings` table in `index.html`.

## Consequences

- The default camera radius grows to 56 because the shell is longer.
- Door positions and sill/top heights are estimates for a Caddy Mk3 Kombi and
  must be checked on the real vehicle; sliding doors on both sides are assumed.
- The rear-seat model is schematic (one slab pair, not the real split bench);
  it is meant to show the seat-vs-platform relationship, not the seat geometry.

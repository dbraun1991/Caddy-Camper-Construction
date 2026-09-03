# 0003: Model in real-world millimeters with a single scale constant

Status: Accepted

## Context

The viewer exists to validate a physical build before cutting wood. Every
dimension that matters (board widths, rail clearances, section widths) comes
from `List_of_Materials.md` and ultimately from the vehicle's real load-bay
measurements. If the 3D model used arbitrary scene units, keeping it in sync
with the materials list would require a manual, error-prone unit conversion
every time a dimension changed.

## Decision

All geometry constants in `index.html` (`UW`, `UD`, `UH`, `TH`, section widths,
rail thickness, etc.) are expressed directly in millimeters — the same numbers
that appear in `List_of_Materials.md`. A single constant,

```js
var S = 0.01; // 1 mm = 0.01 scene units
```

is applied inside the `box()` helper and camera/target math to convert to
Three.js scene units. Nothing else in the codebase does its own unit conversion.

## Consequences

- A dimension can be copy-pasted straight from `List_of_Materials.md` into
  `index.html` (or vice versa) with no mental conversion — this is the main
  mechanism keeping the two documents from drifting apart.
- The scale factor exists purely for renderer/camera numerical stability
  (clip planes, camera distance, floating point precision); it must never be
  baked into individual measurements. New geometry should always be added in mm
  and passed through `box()`, never pre-multiplied by `S` inline.
- Camera parameters (`radius`, near/far planes, orbit target) are tuned for
  this specific scale; changing `S` requires re-tuning all of them, not just
  the geometry.

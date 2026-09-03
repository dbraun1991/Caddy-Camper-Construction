# 0002: Pinned Three.js r128 via CDN

Status: Accepted

## Context

The viewer needs a 3D rendering library. Given [ADR 0001](0001-self-contained-single-file-viewer.md)
(no build step, no package manager), the library must be loadable as a plain
`<script>` tag rather than an npm dependency.

## Decision

Load Three.js r128 from `cdnjs.cloudflare.com`, pinned to that exact revision:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
```

Not `three@latest`, not a local copy.

## Consequences

- Reproducible behavior: the API surface used in `index.html` (`MeshLambertMaterial`,
  `THREE.Group`, `EdgesGeometry`, etc.) won't shift under later Three.js releases,
  which have made breaking changes to material and geometry APIs since r128.
- Upgrading Three.js is a deliberate, manual action (bump the version in the
  `<script src>` and re-verify the viewer), not something that happens silently.
- No offline fallback: if cdnjs is unreachable, the viewer fails to render. Given
  this is a planning tool used at a desk, not a production app, that trade-off is
  accepted rather than vendoring the library.

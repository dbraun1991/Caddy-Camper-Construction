# 0001: Self-contained single-file viewer, no build step

Status: Accepted

## Context

This is a hobby build-planning project for one person's vehicle conversion, not a
distributed application. The 3D viewer needs to be opened, checked, and reasoned
about quickly — including on a phone or a shared laptop in a hardware store — with
no setup friction.

## Decision

`index.html` is one self-contained HTML file with inline `<style>` and `<script>`.
The only external dependency is the Three.js library loaded from a CDN
([ADR 0002](0002-pinned-threejs-r128-via-cdn.md)). There is no `package.json`, no
bundler, no dev server, no framework.

## Consequences

- Zero install: `open index.html` (or double-click it) is the entire "getting
  started" flow, on any device with a browser.
- No module system: all viewer code lives in one closure at the bottom of the
  file. This is fine at the current size (~450 lines); it should not be split
  into multiple files or given a build step unless the viewer grows
  substantially or gains features (e.g. asset loading, multiple scenes) that
  make a single file genuinely hard to navigate.
- Requires an internet connection on first load (CDN fetch). Acceptable trade-off
  given the alternative (vendoring Three.js) adds file management for a project
  that otherwise has none.
- Editing the model means editing JS constants directly inside HTML — there is no
  separate config/data file. This is intentional (see
  [ADR 0003](0003-real-world-mm-scale-factor.md)) but means changes to dimensions
  must be manually kept in sync with `List_of_Materials.md`.

# 0016: The rear lashing eyes (at the rear seats) carry the hold-down, fastened to `B2`

Status: Accepted — amends [ADR 0012](0012-non-destructive-vehicle-tie-down.md)

## Context

ADR 0012 secures the corpus through the four factory lashing eyes with four
L-brackets screwed to the bottom plate `F1` from inside. It assumed all four eyes
lie under the corpus footprint.

Measured on the vehicle (2026-10-17):

- The two eyes **at the rear seats** (z ≈ 900, the far end of the corpus) sit
  **beside** the corpus, not under it — `F1` cannot reach them.
- The two eyes **at the tailgate** (z ≈ 0) are possibly under the corpus.

The load case that matters most is not sliding but **tipping in Bankmodus**: a
person sits on a board extended 900 mm out of the tailgate. The corpus then
pivots about its bottom edge at the tailgate (z = 0) and its far end (z = 900)
tries to lift. Rough check with 100 kg at the end of the extended board and
~60 kg of furniture centred in the box:

```
tipping:   1000 N × 0.90 m  ≈ 900 Nm
resisting:  600 N × 0.45 m  ≈ 270 Nm
hold-down at z = 900 m:  (900 − 270) / 0.90 ≈ 700 N  → ~350 N per rear eye
```

An anchor at the tailgate end sits on the pivot and contributes almost nothing
against tipping. The rear eyes have the full 900 mm lever arm. This matches the
builder's own assessment ("kritisch ist Sitzen und Hebeln — da sind die Ösen bei
den Rücksitzen wichtiger").

## Decision

- **Primary anchors: the two rear lashing eyes.** Each is connected to the
  **outer face of the side wall `B2`** at its rear end with a steel bracket
  (screwed into face grain, never end grain) and an M8 bolt, washer and
  self-locking nut into the eye. The exact bracket shape (angle, or flat bar
  bent to reach the eye) is taken from the eye position on the car.
- `B2` is the right place: it is the panel the outer rails are already screwed
  to (§H1, ADR 0014), so the hold-down force goes from the rails into the
  anchor through one panel instead of through a panel joint.
- **Tailgate eyes: optional.** If they turn out to be under the corpus, connect
  them to `F1` from inside as in ADR 0012 (location against sliding/rattle).
  They are not counted on for tipping.
- Unchanged from ADR 0012: no new holes in the body, two ratchet straps as a
  redundant path, anti-slip mat not counted as restraint.

## Consequences

- The four steel brackets and four M8 sets already on the shopping list stay;
  two of them move from `F1` (inside) to the outside of `B2` (rear end).
- The rear of each `B2` needs a clear outer face where the bracket sits. Between
  the wheel arches there are only 5–10 mm per side (1,130–1,140 mm measured vs.
  1,120 mm corpus) — too little for a bracket, so the brackets only work where
  the floor widens beyond the arches, i.e. behind them at the rear seats, which
  is where the eyes are.
- The corpus remains removable as one unit (ADR 0014): two nuts at the rear
  eyes, optionally two at the tailgate, plus the straps.
- The 700 N estimate is for sitting, not for a crash. As in ADR 0012, this is
  load securing, not a certified restraint.

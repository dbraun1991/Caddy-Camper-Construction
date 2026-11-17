# CNC-Auftrag — VW Caddy Mk3 Camper, Schubladenkästen D1–D3 + Sitz-/Tischbretter C1–C3

Erzeugt am 2026-11-17 von `modell/cnc.py` aus `modell/parameter.json` — nicht von Hand ändern, sondern Parameter anpassen und neu erzeugen. Entscheidung und Hintergrund: ADR 0023, ADR 0024, ADR 0031.

## Teile

Material: **Birke-Multiplex 18 mm** (Wände) und **12 mm** (Böden), 24 Teile in 11 unterschiedlichen Formen — die Wände und Böden der drei Schubladenkästen (Außenmaß B × T × H: D1 272 × 848 × 226,5, D2 272 × 848 × 226,5, D3 384 × 848 × 229,5 mm) und die Sitz-/Tischbretter C1–C3 mit ihren Wangen (alles 18 mm).

Gewicht aller Teile ca. **31,3 kg** (ohne Fenster, Löcher und Griffe wären es 35,6 kg, Dichte 680 kg/m³ angenommen).

| Datei | Kürzel | Langname | Material | Stk. | Außenmaß (mm) |
|---|---|---|---|---|---|
| `d1-s-d2-s.dxf` | D1-S / D2-S | Schublade links / rechts, Seitenwand | Birke-Multiplex 18 mm | 4 | 850 × 226,5 |
| `d1-e1-d2-e1.dxf` | D1-E1 / D2-E1 | Schublade links / rechts, Kastenfront mit Griff | Birke-Multiplex 18 mm | 2 | 274 × 226,5 |
| `d1-e2-d2-e2.dxf` | D1-E2 / D2-E2 | Schublade links / rechts, Kastenrückwand | Birke-Multiplex 18 mm | 2 | 274 × 226,5 |
| `d1-b-d2-b.dxf` | D1-B / D2-B | Schublade links / rechts, Boden | Birke-Multiplex 12 mm | 2 | 274 × 850 |
| `d3-s.dxf` | D3-S | Schublade Mitte, Seitenwand | Birke-Multiplex 18 mm | 2 | 850 × 229,5 |
| `d3-e1.dxf` | D3-E1 | Schublade Mitte, Kastenfront mit Griff | Birke-Multiplex 18 mm | 1 | 386 × 229,5 |
| `d3-e2.dxf` | D3-E2 | Schublade Mitte, Kastenrückwand | Birke-Multiplex 18 mm | 1 | 386 × 229,5 |
| `d3-b.dxf` | D3-B | Schublade Mitte, Boden | Birke-Multiplex 12 mm | 1 | 386 × 850 |
| `c1-c2.dxf` | C1 / C2 | Sitzbrett links (C1) / Sitzbrett rechts (C2) | Birke-Multiplex 18 mm | 2 | 272 × 870 |
| `c1-c2-c3-wangen.dxf` | C1-Wa/b / C2-Wa/b / C3-Wa/b | Wange Sitzbrett links (C1) / Sitzbrett rechts (C2) / Tischbrett Mitte (C3) | Birke-Multiplex 18 mm | 6 | 870 × 43,5 |
| `c3.dxf` | C3 | Tischbrett Mitte (C3) | Birke-Multiplex 18 mm | 1 | 384 × 870 |

## Dateien

- DXF (AutoCAD 2013, `AC1027`), Maßstab 1:1, Einheit **mm**, Ursprung links unten am Teil.
- Layer `AUSSENKONTUR` (rot): Außenkontur, durchfräsen, Fräser außen an der Linie.
- Layer `INNENKONTUR` (blau): geschlossene Schlitze, Fenster und Löcher der Seitenwände, durchfräsen, Fräser innen an der Linie.
- Layer `KANTE_R2` (grün): **Kantenbruch R2** an der Oberseite — dieselben Linien wie die Kontur darunter, dort mit Abrundfräser (Viertelstabfräser) R2 nachfahren. Keine Durchfräsung.
- Alle Konturen geschlossen. Nur Linien und Kreisbögen, keine Beschriftung, keine Bohrungen, keine Taschen — alles ist ein 2D-Durchschnitt außer dem Kantenbruch R2.
- `alle-teile.dxf` enthält jedes Teil in Auftragsstückzahl nebeneinander, mit 20 mm Abstand — nur zur Übersicht, **kein Nesting**. Die Verteilung auf die Platten macht der Dienstleister.

## Verbindungen

- **Ecken: Fingerzinken**, 7 Felder über die Kastenhöhe. Die Seitenwände (`-S`) haben oben und unten einen Zinken, Kastenfront (`-E1`) und -rückwand (`-E2`) die Lücken dazwischen.
- **Boden** (`-B`, 12 mm): Zapfen 50 mm breit, je 5 an den langen und 2 an den kurzen Kanten, durch Schlitze 50 × 12 mm in allen vier Wänden, 10 mm über der Wandunterkante.
- Lücken und Schlitze sind je Richtung **0,2 mm größer** als Zinken und Zapfen (die bleiben auf Nennmaß).
- Zinken und Bodenzapfen sind **19 mm lang** (18 mm Wandstärke + 1 mm Schleifzugabe): Sie stehen nach dem Verleimen 1 mm über und werden bündig geschliffen, bevor die Schienen angeschraubt werden. Gewollt, nicht korrigieren.
- **Sitz-/Tischbretter C1–C3**: Brett oben, darunter zwei Wangen (`-Wa`/`-Wb`, umgedrehtes U). Jede Wange greift mit 5 Zapfen 50 mm breit durch das Brett; die Wangen sitzen bündig mit den Brettkanten, deshalb sind es **offene Aussparungen am Brettrand**, keine geschlossenen Schlitze. Die Zapfen sind 19 mm lang (1 mm Schleifzugabe), werden verleimt und bündig geschliffen (ADR 0029, ADR 0031). Alle sechs Wangen sind gleich.
- Jede Innenecke hat einen **Dogbone**: Freischnitt Ø 6 mm über die Ecke hinaus, Kreis durch den Eckpunkt. Ohne ihn bliebe in jeder Ecke ein Radius stehen, und die eckigen Zapfen passten nicht in Schlitze und Aussparungen.
- **Fenster** in den Seitenwänden der äußeren Schubladen (D1, D2): Ecken mit Radius 20 mm, ohne Dogbone. **Lochraster** (runde Löcher Ø 25 mm im Abstand 40 mm) in den Seitenwänden der mittleren Schublade (D3) und in allen Kastenfronten und -rückwänden (ADR 0026, ADR 0027). Das Band der Schubladenschiene (± 15 mm) bleibt immer voll stehen — dort wird die Schiene angeschraubt.
- **Griff** in der Kastenfront (`-E1`): Ausschnitt von der Oberkante, 120 mm breit, 35 mm tief, unten Radius 15 mm, die beiden oberen Außenecken Radius 10 mm (ADR 0027).

## Annahmen (vor dem Auftrag klären)

1. **Kastenbreite** = Sektionsbreite − 2 × Schienenstärke − 2 mm Spiel. Die Stärke der gelieferten 80-kg-Schiene ist **gemessen** (19 mm je Seite, 2026-11-12). Die Lage der Schraublöcher steht noch aus — die Fenster lassen das Schienenband ± 15 mm frei, das sollte reichen; vor der Bestellung trotzdem gegen die Lochreihe prüfen.
2. **Fräserdurchmesser 6 mm** und **Passungsluft 0,2 mm** wie beim Korpus-Auftrag. Gilt auch für die 12-mm-Böden: „12 mm“-Multiplex ist real oft etwas dünner oder dicker — die Schlitzhöhe an der gelieferten Platte prüfen.
3. **Haltestege** (Tabs) und Fräsreihenfolge legt der Dienstleister fest; danach nur Stegreste verschleifen.
4. **Faserrichtung egal**: Die Teile dürfen beim Nesting beliebig gedreht werden. Wenden (Rückseite nach oben) ist ebenfalls erlaubt: Jedes Teil ist spiegelsymmetrisch (D1-S / D2-S links/rechts, D1-E1 / D2-E1 links/rechts, D1-E2 / D2-E2 links/rechts, D1-B / D2-B links/rechts + oben/unten, D3-S links/rechts, D3-E1 links/rechts, D3-E2 links/rechts, D3-B links/rechts + oben/unten, C1 / C2 links/rechts + oben/unten, C1-Wa/b / C2-Wa/b / C3-Wa/b links/rechts, C3 links/rechts + oben/unten), gewendet entsteht dasselbe Teil.
5. **Keine Bohrungen**: Die Schienen (auch die M6-Löcher der 170-kg-Schienen in den Wangen) werden beim Zusammenbau angerissen und gebohrt.
6. **Keine Frontblenden** (ADR 0027): Die Kastenfront `-E1` ist die sichtbare Front, mit gefrästem Griff.
7. **Kantenbruch R2** (Abrundfräser, nur von oben, eine Aufspannung) an allen Kanten auf Layer `KANTE_R2`: Oberkante der Kastenwände (`-S`, `-E1`, `-E2`), Griffausschnitt, Fenster und Löcher, die Sitz-/Tischbretter C1–C3 ringsum. **Nicht** an Zinken, Zapfen, Schlitzen, Aussparungen und Böden — Fügeflächen bleiben scharfkantig. Die Unterseite bricht der Bauherr von Hand (ADR 0034).

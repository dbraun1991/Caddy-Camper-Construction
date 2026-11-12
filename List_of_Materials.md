# Materialliste — VW Caddy Mk3 Camper Ausbau

Alle Maße in mm. Holz: **Birke-Multiplex**, verleimte Qualität (WISA oder gleichwertig).  
**Links/rechts** immer aus Sicht des Fahrers (Blick nach vorn): links = Fahrerseite, rechts = Beifahrerseite — gilt auch beim Blick durch die Heckklappe.  
Maße der Bauteile: gemeinsame Datenbasis [`modell/parameter.json`](modell/parameter.json) (3D-Viewer und Werkzeichnungen, [ADR 0015](docs/adrs/0015-shared-model-data-for-viewer-and-drawings.md)).

---

## Bezeichnungen

Die Kürzel sind feste Positionsnummern (Modell, Zeichnungen, ADRs). Der Buchstabe ist eine Eselsbrücke für das Teil, der Langname nennt Funktion und Lage — **links/rechts immer aus Fahrersicht**. Im Text steht der Langname, das Kürzel in Klammern oder in Tabellen.

Die Holzplatten von Box und Liegefläche tragen seit 2026-11-07 sprechende Buchstaben (englische Eselsbrücke, [ADR 0022](docs/adrs/0022-mnemonic-board-codes.md)); die alten Kürzel stehen in Klammern, weil ältere ADRs sie noch verwenden.

| Gruppe | Kürzel | Langname |
|---|---|---|
| **B — Bottom** | B1 | Bodenplatte *(bis 2026-11-07: F1)* |
| **R — Rear** | R1 | Rückwand, zu den Rücksitzen *(B1)* |
| **S — Side** | S1 / S2 | Seitenwand links (Fahrerseite) / Seitenwand rechts (Beifahrerseite) *(B2-F / B2-B)* |
| **M — Mid** | M1 / M2 | Trennwand links / Trennwand rechts *(B3-1 / B3-2)* |
| | M1-Z1u, R1-Z2o … | im Modell je Zapfen einer Wand: Nummer + u (in B1) / o (in T1), `Zh` = hinterer Zapfen von M1/M2 in R1 |
| **T — Top** | T1 | Deckplatte — Deckel der Box, zugleich hinterer Teil der Liegefläche *(A1)* |
| **F — Fold** | F1 | Klappbrett Rücksitz, liegt auf den umgeklappten Rücksitzlehnen *(A2)* |
| | F2 | Klappbrett Kopfende, zu den Kopfstützen der Vordersitze *(A3)* |
| **C — Auszugbretter** | C1 / C2 | Sitzbrett links / Sitzbrett rechts |
| | C3 | Tischbrett Mitte |
| **D — Schubladen** | D1 / D2 / D3 | Schubladenkasten links / rechts / Mitte |
| | D1-S, D1-E1, D1-E2, D1-B … | Teile eines Kastens: Seitenwand (Side), Kastenfront mit Griff (End 1), Kastenrückwand (End 2), Boden (Bottom) — [ADR 0024](docs/adrs/0024-cnc-drawer-boxes-finger-joints-and-lightening-windows.md), [ADR 0027](docs/adrs/0027-no-drawer-front-panels-box-front-with-grip-cut-out.md) |
| | ~~D1-F / D2-F / D3-F~~ | *entfallen (2026-11-12, ADR 0027): früher die Frontblenden — Kürzel nicht neu vergeben* |
| **E — Schienen** | E1 / E2 | Schwerlastschiene 170 kg (Sitz- und Tischbretter) / Schiene 80 kg (Schubladen) |
| | E-C1-a … | im Modell je Einzelschiene, z. B. „Schiene Sitzbrett links, an Seitenwand links“ |
| **V — Verbindungsmittel & Beschläge** | V1 … V17 | Schrauben, Winkel, Dübel, Leim, Gurte, Scharniere — Langnamen in §V |
| **G — Ausstattung** | G1 … G5 | Matratze, Bezug, Antirutschmatte, Kantenband, Öl |
| **H — Hinge (Scharniere, Modell)** | H1-1…3 / H2-1…3 | Scharnier Deckplatte ↔ Klappbrett Rücksitz (oben) / Klappbrett Rücksitz ↔ Kopfende (unten); Kaufposition V17 *(S1-1 … S2-3)* |

---

## Fahrzeugmaße (am eigenen Fahrzeug nachgemessen, 2026-10-17)

| Maß | Gemessen | Plan | Ergebnis |
|---|---|---|---|
| Breite zwischen den Radkästen | 1.130–1.140 mm | Korpus, T1, F1, F2: 1.120 mm | passt, 10–20 mm Spiel — **bewusst nicht genutzt**, Korpus bleibt 1.120 mm |
| Heckklappenöffnung | fertige Box 1.120 × 900 × 338 mm passt durch | — | passt; Klappe öffnet nach oben |
| Ladekante / Stufe | keine, Ladeboden eben | — | passt |
| Ladetiefe Heckklappe (geschlossen, innen) → Rücksitze | 920–930 mm | Korpus 900 mm | 20–30 mm Luft |
| Ladeboden | eben, Reserverad unter dem Fahrzeug | — | passt |
| Oberkante umgeklappte Rücksitzlehnen | 310 mm | Unterkante F1: 320 mm | **10 mm Spalt** → Ausgleich unter F1 (§H4) |
| Länge Heck → Vordersitz-Kopfstützen (Schlafposition) | 2.000 mm | T1 + F1 + F2 = 2.000 mm | passt, kein Spiel |
| Zurrösen an den Rücksitzen | seitlich **neben** dem Korpus | — | Anbindung außen an S1/S2 ([ADR 0016](docs/adrs/0016-rear-lashing-eyes-carry-the-hold-down.md)) |
| Zurrösen an der Heckklappe | evtl. unter dem Korpus | — | optional, für Kippen unwichtig |

Radkasten-Länge/-Höhe, Wandbreite oberhalb der Radkästen und Innenhöhe sind nicht gemessen; die Caddy-Hülle im Viewer verwendet dafür weiter Platzhalter.

---

## Liegefläche (T1, F1, F2)

Alle drei Bretter gleich stark (18 mm), bündig auf Plattformhöhe 320 mm.

| Pos | Bezeichnung | Maß (B × T × H) | Menge | Hinweis |
|---|---|---|---|---|
| T1 | Deckplatte | 1.120 × 900 × 18 | 1 | Fest, über Kofferraum-Korpus; durchgehend, Schlitze und Aussparungen für die Wandzapfen (§Korpus) |
| F1 | Klappbrett Rücksitz | 1.120 × 700 × 18 | 1 | Liegt auf umgeklappten Rücksitzlehnen auf (Lehnen bei 310 mm → 10 mm Ausgleich, §H4) |
| F2 | Klappbrett Kopfende | 1.120 × 400 × 18 | 1 | Wenig Last, mit 2 Gurtschlaufen an den Vordersitz-Kopfstützen (§H4) |

---

## Korpus — Unterbau (900 mm tief, 320 mm hoch, 1.120 mm breit)

Eckausbildung ([ADR 0018](docs/adrs/0018-continuous-bottom-and-lid-walls-in-grooves.md), [ADR 0020](docs/adrs/0020-through-tenons-instead-of-routed-grooves.md)): **Bodenplatte B1 und Deckel T1 laufen durch** (1.120 × 900 mm), alle Wände stehen dazwischen und greifen mit **Zapfen 18 × 50 mm** durch B1 und T1. Werkzeug: Handkreissäge und Stichsäge, keine Oberfräse nötig.

Nutzbare Innenhöhe: 320 mm − 18 mm (Bodenplatte) = **302 mm** (Sektion L/R: Sitzbrett-Oberkante 65,5 mm über B1, bündig mit dem 55-mm-Schienenteil + 226,5 mm Schubladenkasten + 2 × 5 mm Spalt; Mitte: D3 229,5 mm mit 3 mm Luft zu B1, Tischschiene 5 mm unter T1; Wangen enden 15 mm unter der Lochreihe = 23 mm über der Schienen-Unterkante, [ADR 0028](docs/adrs/0028-height-plan-board-on-cheeks-foolproof-runner-layout.md), [ADR 0029](docs/adrs/0029-cheeks-sized-to-the-moving-runner-member-flush-seat-taller-middle-drawer.md), [ADR 0031](docs/adrs/0031-boards-flush-with-the-middle-runner-member-minimal-cheeks.md)); **Wandhöhe im Zuschnitt = 340 mm** (302 + 2 × 19 mm Zapfen, je Kante 1 mm zum Bündigschleifen).  
Nutzbare Innenbreite L/R: 1.120 mm − 2 × 18 mm (S1/S2 Seitenwand) − 2 × 18 mm (M1/M2 Trennwand) = 1.048 mm → **312 mm** je Sektion L/R + **424 mm** Mitte.

| Pos | Bezeichnung | Zuschnitt (Länge × Höhe × Stärke) | Menge | Hinweis |
|---|---|---|---|---|
| R1 | Rückwand | 1.084 × 340 × 18 | 1 | Zur Rücksitz-Seite hin, zwischen den Seitenwänden; 4 Zapfen je Kante, 2 Schlitze für M1/M2 |
| S1 / S2 | Seitenwand links / rechts | 900 × 340 × 18 | 2 | Links + rechts — erforderlich: trägt die äußeren Schienen, Korpus bleibt als Ganzes ausbaubar ([ADR 0014](docs/adrs/0014-self-contained-corpus-with-own-side-walls.md)); 3 Zapfen je Kante |
| M1 / M2 | Trennwand links / rechts | 900 × 340 × 18 | 2 | Zwischen den 3 Sektionen; 3 Zapfen je Kante + 1 Zapfen hinten in R1. Wandkörper bleibt 882 lang, die übrigen 18 sind der hintere Zapfen |
| B1 | Bodenplatte | 1.120 × 900 × 18 | 1 | Durchgehend, Schlitze und Aussparungen wie T1 |

**Bestellung beim Zuschnitt:** T1, B1, F1, F2 und die Wände oben, alle in 18 mm. Das sind 9 Teile und passt rechnerisch auf 2 Platten 2.500 × 1.250 mm.

### Zapfen, Schlitze und Aussparungen

**Zapfen** stehen an der Wand über. Ein **Schlitz** ist ein geschlossenes Loch, eine **Aussparung** ist zum Plattenrand offen. Alle sind 18 × 50 mm und gehen ganz durch die Platte. 18 mm ist der Nennwert: echte Plattenstärke messen und Schlitze und Aussparungen daran anpassen.

| Wand | Zapfen beginnen bei (Länge je 50 mm) | Gegenstück |
|---|---|---|
| S1/S2 | 50 · 425 · 800 ab Vorderkante | Aussparungen am Seitenrand von B1 und T1 |
| M1/M2 | 50 · 416 · 782 ab Vorderkante | Schlitze in B1 und T1, von der Fahrerseite gemessen 330–348 (M1) und 772–790 (M2) |
| M1/M2, hinten | 126–176 über dem unteren Absatz (mittig), 18 mm lang | Schlitze in R1, ab der Fahrerseiten-Kante von R1 312–330 (M1) und 754–772 (M2) |
| R1 | 42 · 362 · 672 · 992 ab Wandkante | Aussparungen am Hinterrand von B1 und T1, ab Fahrerseite 60 · 380 · 690 · 1.010 |

Die Lage von R1 ist so gewählt, dass die Scharniere V17 auf T1 keinen Zapfen treffen. Beim Anreißen die Lage direkt vom fertigen Zapfen übertragen. Das Muster ist links/rechts symmetrisch, aber nicht vorne/hinten: Vorderkante auf B1 und T1 markieren. Blatt „Box-Bretter“ zeigt die Lage auch zeichnerisch.

Rückfallvariante „stumpf“, falls das Sägen am Probestück nicht gelingt: Die 340 mm hohen Wände auf 302 mm kürzen, M1/M2 zusätzlich auf 882 mm (→ §H).

---

## C — Sitz- und Tischbretter (auf Vollauszug-Schienen)

Aufbau ([ADR 0028](docs/adrs/0028-height-plan-board-on-cheeks-foolproof-runner-layout.md), entscheidet [ADR 0013](docs/adrs/0013-rail-carrier-cheeks-for-seat-and-table-boards.md)): **Brett oben, zwei Wangen darunter** (umgedrehtes U). Die 170-kg-Schiene ist 76 mm hoch, ihre Schraubenlöcher liegen mittig (38 mm); das Innenteil wird an die Außenseite der Wange geschraubt. Die Brettoberkante ist **bündig mit dem 55-mm-Mittelteil** der Schiene, 10,5 mm unter der Schienenoberkante ([ADR 0031](docs/adrs/0031-boards-flush-with-the-middle-runner-member-minimal-cheeks.md)): ausgefahren steht nichts über Sitz- und Tischfläche, das Gehäuse bleibt im Korpus. Keine seitlichen Wülste.  
Alle drei fahren **870 mm** auf Vollauszug-Schienen aus — **kein Klappen**, reine Zugbewegung.

| Pos | Bezeichnung | Maß (B × T × H) | Menge | Position im Korpus (y) |
|---|---|---|---|---|
| C1 / C2 | Sitzbrett links / rechts, je 10 Schlitze 50 × 18 mm | 272 × 870 × 18 | 2 | 65,5–83,5 mm; 312 mm Sektion − 2 × 19 mm Schiene − 2 mm Spiel |
| C1-Wa/Wb, C2-Wa/Wb | Wangen Sitzbrett, 5 Zapfen 50 mm | 18 × 870 × 24,5 (Rohteil 43,5 mit Zapfen) | 4 | 41–65,5 mm, unter den Brettkanten, 23 mm Luft zu B1 |
| C3 | Tischbrett Mitte, 10 Schlitze 50 × 18 mm | 384 × 870 × 18 | 1 | 286,5–304,5 mm; 424 mm Sektion − 2 × 19 mm Schiene − 2 mm Spiel |
| C3-Wa/Wb | Wangen Tischbrett, 5 Zapfen 50 mm | 18 × 870 × 24,5 (Rohteil 43,5 mit Zapfen) | 2 | 262–286,5 mm, 11,5 mm über D3 |

Das Element ist 42,5 mm hoch, Schiene C1/C2 bei 18–94 mm (steht auf B1), C3 bei 239–315 mm. Ausgefahren stehen nur Arretierungshebel (30 mm), äußeres Teleskopteil (430 × 30 mm) und mittleres Teleskopteil (430 × 55 mm) vor, der Rest bleibt im Gehäuse (gemessen 2026-11-12). Das Brett schließt bündig mit dem 55-mm-Teil ab (sitzt mittig in der Schiene, bestätigt); die Lochreihe liegt 9,5 mm unter der Brettunterseite in der Wange. Die Wange endet genau 15 mm unter der Lochmitte ([ADR 0031](docs/adrs/0031-boards-flush-with-the-middle-runner-member-minimal-cheeks.md)) — so viel Holz braucht die 5-mm-Schraube, mehr Wange trägt nichts, weil die Stahlschiene die Länge trägt. **Verbindung Brett ↔ Wangen** (gezapft, ausdrücklich gewünscht für die Stabilität; [ADR 0029](docs/adrs/0029-cheeks-sized-to-the-moving-runner-member-flush-seat-taller-middle-drawer.md)): je Wange **5 Durchzapfen 50 × 18 mm** durch Schlitze im Brett, verleimt, Zapfen 1 mm länger und bündig geschliffen — die Schlitze legen den Wangenabstand fest, damit die Schienen parallel laufen. Fertigung (CNC oder Zuschnitt + Stichsäge) noch offen.

> **Beinfreiheit Sitz ↔ ausgefahrener Tisch** (Sitzfläche 83,5 mm): bis Schienenkörper C3 155,5 mm, bis 55-mm-Teleskopteil 166 mm, bis Tischwangen und Innenteil 178,5 mm, bis Brettunterseite 203 mm, bis Tischoberkante 221 mm. Die Sitzfläche liegt bei 580 mm Ladekante (Standardwert, nicht gemessen) rund 66 cm über dem Boden.

> **Auf dem Tischbrett C3 darf auch jemand sitzen** — zumindest darf es dabei nicht brechen. Deshalb läuft C3 wie C1/C2 auf der 170-kg-Schiene ([ADR 0021](docs/adrs/0021-table-board-on-170-kg-runners.md)). Das Brett trägt nur noch quer zwischen den Wangen (348 mm bei C3, 236 mm bei C1/C2) — dafür reichen 18 mm; die Wangen tragen in der Länge.

> **Spalt zwischen Tischbrett C3 und Deckplatte T1:** laut Modell 15,5 mm (C3 oben bei y = 304,5, T1 unten bei y = 320; das Schienengehäuse bleibt 5 mm unter T1). Steht jemand auf T1, biegt sich die Platte über der Mittelsektion grob 3 mm durch, an der freien Vorderkante grob 6,5 mm (Überschlag: 150 kg auf einer Stelle, geschätzte Materialwerte) — seit [ADR 0031](docs/adrs/0031-boards-flush-with-the-middle-runner-member-minimal-cheeks.md) bleibt das Tischbrett frei; die Schiene selbst ist fest an den Wänden. Das Maß am fertigen Korpus prüfen.

---

## D — Schubladen (3 Stück)

Schubladenkästen als **CNC-Teile** ([ADR 0024](docs/adrs/0024-cnc-drawer-boxes-finger-joints-and-lightening-windows.md)): Wände 18 mm mit **Fingerzinken** an den Ecken, Boden 12 mm mit **Zapfen durch Schlitze** in allen vier Wänden. **Keine Frontblenden** — die Kastenfront ist die sichtbare Front, mit gefrästem Griffausschnitt ([ADR 0027](docs/adrs/0027-no-drawer-front-panels-box-front-with-grip-cut-out.md)). Seitenwände der äußeren Schubladen mit großen **Fenstern**, alle übrigen Wände mit **Lochraster** Ø 25 mm ([ADR 0026](docs/adrs/0026-windows-for-outer-drawers-hole-grid-for-middle-drawer.md)). DXF und Auftrag: [`docs/cnc/schubladen/`](docs/cnc/schubladen/) (im Viewer Reiter „DXF · CNC“ → „Schubladenkästen“).  
Kastentiefe 848 mm, vorn bündig mit den Sitz-/Tischbrettern, hinten 35,5 mm Luft bis zur Rückwand R1 ([ADR 0017](docs/adrs/0017-850-mm-runners-in-900-mm-corpus.md)); Kastenhöhe D1/D2 226,5 mm (innen 204,5 mm), D3 229,5 mm (innen 207,5 mm; Boden liegt 10 mm über der Wandunterkante; Höhenplan [ADR 0028](docs/adrs/0028-height-plan-board-on-cheeks-foolproof-runner-layout.md), [ADR 0031](docs/adrs/0031-boards-flush-with-the-middle-runner-member-minimal-cheeks.md)).

> **Kastenbreiten bestätigt** (2026-11-12): Sektionsbreite − 2 × Schienenstärke − 2 mm Spiel, die gelieferte 80-kg-Schiene ist wie geplant **19 mm** stark. Vor der Bestellung noch die Schraublöcher der Schiene gegen das volle Schienenband der Seitenwände prüfen.

Maße = fertiges Teil. Zinken und Bodenzapfen stehen je 1 mm über (Schleifzugabe), deshalb sind die Rohteile 2 mm länger bzw. breiter (Spalte „Rohteil“ = Maß in der DXF).

### D1 + D2 — Schublade links & rechts (je 1×, identische Teile)

y = 88,5–315 mm (über dem Sitzbrett-Element), Schiene 99–152 mm (5 mm über der Sitzschiene); 312 mm Sektion − 2 × 19 mm Schiene − 2 mm Spalt = **272 mm** Außenbreite.

| Kürzel | Bauteil | Fertig (mm) | Rohteil (mm) | Stärke | Menge |
|---|---|---|---|---|---|
| D1-S / D2-S | Seitenwand, Schiene unten, 4 Fenster ~118 mm hoch darüber | 848 × 226,5 | 850 × 226,5 | 18 mm | 4 |
| D1-E1 / D2-E1 | Kastenfront, Griffausschnitt 120 × 35 mm, 6 Löcher | 272 × 226,5 | 274 × 226,5 | 18 mm | 2 |
| D1-E2 / D2-E2 | Kastenrückwand, 9 Löcher | 272 × 226,5 | 274 × 226,5 | 18 mm | 2 |
| D1-B / D2-B | Boden, 14 Zapfen | 236 × 812 (+ Zapfen) | 274 × 850 | 12 mm | 2 |

### D3 — Schublade Mitte (1×)

y = 21–250,5 mm (3 mm über der Bodenplatte, 11,5 mm unter den Tischwangen), Schiene 181–234 mm (5 mm unter der Tischschiene); 424 mm Sektion − 2 × 19 mm Schiene − 2 mm Spalt = **384 mm** Außenbreite.

| Kürzel | Bauteil | Fertig (mm) | Rohteil (mm) | Stärke | Menge |
|---|---|---|---|---|---|
| D3-S | Seitenwand, Schiene oben, Lochraster 2 × 18 Löcher darunter | 848 × 229,5 | 850 × 229,5 | 18 mm | 2 |
| D3-E1 | Kastenfront, Griffausschnitt 120 × 35 mm, 20 Löcher | 384 × 229,5 | 386 × 229,5 | 18 mm | 1 |
| D3-E2 | Kastenrückwand, 24 Löcher | 384 × 229,5 | 386 × 229,5 | 18 mm | 1 |
| D3-B | Boden, 14 Zapfen | 348 × 812 (+ Zapfen) | 386 × 850 | 12 mm | 1 |

Gewicht der drei Kästen ca. **19,8 kg** — ohne Fenster, Löcher und Griffe wären es 24,2 kg (Dichte 680 kg/m³ angenommen, berechnet in `modell/cnc.py`).

---

## E — Vollauszug-Schienen (6 Paare gesamt)

> Auswahlbegründung: [ADR 0008](docs/adrs/0008-heavy-duty-full-extension-runners.md) (Schwerlast + Arretierung) · [ADR 0017](docs/adrs/0017-850-mm-runners-in-900-mm-corpus.md) (850 statt 900 mm: lichte Tiefe hinter R1 nur 882 mm) · Maße der gelieferten Schienen: [ADR 0028](docs/adrs/0028-height-plan-board-on-cheeks-foolproof-runner-layout.md)

**Gemessen 2026-11-12** (Datenblatt der 170-kg-Schiene: [`docs/runner-pdfs/heavy-runners.pdf`](docs/runner-pdfs/heavy-runners.pdf)):

| | 80 kg (Schubladen) | 170 kg (Sitz-/Tischbretter) |
|---|---|---|
| Länge eingefahren | 850 mm | **870 mm** |
| mit Arretierungshebel vorn | 880 mm | 900 mm |
| Höhe | 53 mm | 76 mm (Datenblatt 76,2 ± 0,5) |
| Stärke je Seite | 19 mm | 19 mm (Datenblatt 19,2 ± 0,3) |
| Schrauben | Lochgröße noch prüfen | **M6** laut Datenblatt |
| Löcher | mittig in der Höhe | mittig in der Höhe |

Beide Schienen werden bündig an der Korpusfront ausgerichtet (Datenblatt). Der Arretierungshebel sitzt vorn am beweglichen Teil und ragt eingefahren ~30 mm vor die Korpusfront — **am Auto prüfen, ob die Heckklappe schließt** (Luft laut Messung 20–30 mm); sonst den Korpus ganz an die Rücksitze schieben oder die Schienen bis 12 mm zurücksetzen.

**6 Paare** insgesamt: 3× für Schubladen + 3× für Sitz-/Tischbretter.  
Mindestanforderung: **850 mm Auszug**, **Schwerlast**, mit Arretierung (Lock). 900-mm-Schienen passen nicht: hinter der Rückwand bleiben nur 882 mm lichte Tiefe.

| # | Element | Schiene | Paare |
|---|---|---|---|
| 1 | Schublade Links (D1) | Option 2 · 80 kg · 53 mm | 1 |
| 2 | Schublade Mitte (D3) | Option 2 · 80 kg · 53 mm | 1 |
| 3 | Schublade Rechts (D2) | Option 2 · 80 kg · 53 mm | 1 |
| 4 | Sitzbrett Links (C1) | Option 1 · 170 kg · 76 mm | 1 |
| 5 | Sitzbrett Rechts (C2) | Option 1 · 170 kg · 76 mm | 1 |
| 6 | Tischbrett Mitte (C3) | Option 1 · 170 kg · 76 mm | 1 |
| | **Gesamt** | 3 × Option 1 + 3 × Option 2 | **6 Paare (12 Einzelschienen)** |

Zuordnung und Maße stehen in [`modell/parameter.json`](modell/parameter.json) (`schienen.typen` / `schienen.zuordnung`).

### Optionen

> Alle Angaben: 1 Paar = 2 Stück (linke + rechte Schiene).

---

#### Option 1 — AOLISHENG 850 mm · 170 kg ⭐ Gewählt für die Sitzbretter C1/C2 und das Tischbrett C3 (3 Paare) — dort sitzt eine Person
**170 kg Traglast** · 76 mm Höhe · mit Arretierung · 104,99 €/Paar · 2 Paare bestellt 2026-11-04, das 3. Paar (C3, ADR 0021) ist nachbestellt (2026-11-12) · [Amazon.de — B086JQXRR5](https://www.amazon.de/dp/B086JQXRR5)  
Einbaumaß laut Hersteller 19,2 + 0,5 mm je Seite: passt in die eingeplanten 20 mm (19 mm Schiene + 1 mm Spiel). **Gemessen 2026-11-12: 19 mm Stärke, 76 mm Höhe (nachgemessen), 870 mm Länge + Hebel.** Verarbeitung sehr gut.  
✓ **Arretierung** rastet auch im ausgezogenen Zustand ein (geprüft 2026-11-12).

```
Vollauszug 870 mm (Angebot: 850 mm) · Höhe 76 mm · Einbaumaß 19,2 + 0,5 mm je Seite · Stahl 2,5 mm · Schrauben M6 · Traglast 170 kg · Arretierung: Ja · nicht trennbar
Einbaumaß: Sektionsbreite − 2 × 19 mm − 2 mm Spalt = Elementbreite
Gelieferte Länge 870 mm (+ Hebel vorn): hinter der Schiene 882 − 870 = 12 mm Luft
```

---

#### Option 2 — AOLISHENG 850 mm · 80 kg ⭐ Gewählt für die Schubladen D1–D3 (3 Paare)
**80 kg Traglast** · 53 mm Höhe · mit Arretierung · 61,99 €/Paar · 4 Paare bestellt 2026-11-04, **1 Paar zu viel** (C3 jetzt auf Option 1) · Link/ASIN noch nachtragen  
**Gemessen 2026-11-12: 19 mm Stärke, 53 mm Höhe** — wie geplant, die Breiten von D1–D3 bleiben. Noch offen: Lage der Befestigungslöcher (am 830 mm langen Kasten, im vollen Schienenband der Seitenwände) und ob die Schiene trennbar ist.

```
Vollauszug 850 mm · Höhe 53 mm · Stärke 19 mm je Seite (gemessen) · Traglast 80 kg · Arretierung: Ja
Geeignet für: Gepäck in den Schubladen — nicht zum Draufsetzen
```

Bisherige Wahl, **verworfen** (passt nicht in 882 mm lichte Tiefe): AOLISHENG 900 mm · 150 kg · 19 mm Stärke  
→ [Amazon.de — B086JQLXRJ](https://www.amazon.de/dp/B086JQLXRJ?ref=cm_sw_r_mwn_dp_F4691SK4DH72WBHHXHVK&ref_=cm_sw_r_mwn_dp_F4691SK4DH72WBHHXHVK&social_share=cm_sw_r_mwn_dp_F4691SK4DH72WBHHXHVK&th=1)

---

#### Früher erwogen — Schwerlast 95 kg · 53 mm hoch ✗ Verworfen (nur als 900 mm gefunden)
**95 kg Traglast** · 53 mm Höhe · mit Arretierung · war für die Sitz-/Tischbretter vorgesehen  
→ [Amazon.de — B09XXDHW1C](https://www.amazon.de/dp/B09XXDHW1C/ref=sspa_dk_hqp_detail_aax_0?aref=gn8XpWgrVu&sp_csd=d2lkZ2V0TmFtZT1zcF9ocXBfc2hhcmVk&th=1)

```
Vollauszug 900 mm · Höhe 53 mm · Traglast 95 kg · Arretierung: Ja
Geeignet für: leichtere Elemente (Sitz- und Tischbretter)
```

---

#### Option 3 — VADANIA SoftClose 550 mm · 105 kg ⚠ Nicht geeignet für diesen Ausbau
**550 mm Auszug** — zu kurz für 850 mm Auszugstiefe.  
→ [Amazon.de — B08625F5G9](https://www.amazon.de/dp/B08625F5G9/ref=syn_sd_onsite_desktop_0?ie=UTF8&pd_rd_plhdr=t&aref=x4jkmhKkxO&th=1)

```
Vollauszug 550 mm · 3-teilig · SoftClose · Traglast 105 kg
⚠ Auszuglänge reicht nicht — nur nutzbar wenn Einbautiefe auf 550 mm reduziert wird.
```

---

## V — Verbindungsmittel & Beschläge

| Pos | Bezeichnung | Typ / Größe | Menge |
|---|---|---|---|
| V1 | Spanplattenschrauben (Korpus, Stirnkante) | Torx Senkkopf 4 × 45 mm | ~80 Stk. |
| V2 | Spanplattenschrauben (80-kg-Schienen an Wände und Schubladen) | Torx 3,5 × 16 mm, Flach-/Tellerkopf — Lochgröße der Schiene prüfen | ~70 Stk. |
| V18 | Spanplattenschrauben (170-kg-Schienen an Wände und Wangen, M6-Löcher) | Torx 5 × 16 mm, Flach-/Tellerkopf | ~60 Stk. |
| V3 | Stahlwinkel (Korpus 8× innen + Fahrzeug 4×: 2 außen an S1/S2 hinten, 2 optional auf B1 vorne, → §H5) | 40 × 40 × 2 mm | 12 Stk. |
| V4 | Holzdübel (nur für die Rückfallvariante „stumpf“ nötig) | Ø 8 × 40 mm | ~30 Stk. |
| V5 | Holzleim D3 (wasserfest) | 750 ml | 1 Flasche |
| V6 | ~~Schubladengriff~~ — entfällt, Griffausschnitt in der Kastenfront ([ADR 0027](docs/adrs/0027-no-drawer-front-panels-box-front-with-grip-cut-out.md)) | — | — |
| V7 | Spanplattenschrauben (Winkel) | Torx Senkkopf 4 × 30/40 mm | je ~100 Stk. |
| V8 | ~~Spanplattenschrauben Schubladenböden~~ — entfällt, Boden mit Zapfen ([ADR 0024](docs/adrs/0024-cnc-drawer-boxes-finger-joints-and-lightening-windows.md)) | — | — |
| V9 | Durchsteckschrauben Schienen-Vorderkante (→ §H1) | **M6** × 30 mm + U-Scheibe + Stoppmutter (Datenblatt M6, nicht länger, [ADR 0028](docs/adrs/0028-height-plan-board-on-cheeks-foolproof-runner-layout.md)) | 24 Sätze |
| V10 | Schrauben Zurrösen-Anbindung (→ §H5) | M8 × 30/40 mm + U-Scheibe + Stoppmutter | 4 Sätze |
| V11 | Spanngurt (Ratsche) | ≥ 1,5 m, 2-teilig | 2 Stk. |
| V12 | ~~Eckleiste Weichholz Schubladen-Innenecken~~ — entfällt, Fingerzinken ([ADR 0024](docs/adrs/0024-cnc-drawer-boxes-finger-joints-and-lightening-windows.md)) | — | — |
| V13 | ~~Überlappungsleisten Liegefläche~~ — entfällt, ersetzt durch Scharniere V17 ([ADR 0019](docs/adrs/0019-hinged-sleeping-boards-fold-onto-the-corpus.md)) | — | — |
| V14 | Wangen Sitz-/Tischbretter mit 5 Durchzapfen (→ §C, [ADR 0031](docs/adrs/0031-boards-flush-with-the-middle-runner-member-minimal-cheeks.md)) | 18 × 870 × 24,5 mm Multiplex (Rohteil 43,5 mit Zapfen) | 6 Stk. |
| V15 | Gurtschlaufe F2 ↔ Kopfstütze, verstellbar (→ §H4) | Gurtband ~25 mm mit Klemmschnalle | 2 Stk. |
| V17 | Klappscharnier, Standard, aufschraubbar, ~60 mm (→ §H4) — 3 × T1↔F1 oben, 3 × F1↔F2 unten | Schrauben max. 15 mm (Platte 18 mm) | 6 Stk. |
| V16 | Ausgleich unter F1 (→ §H4) | Leiste 10 × 40 × 1.000 mm oder 10-mm-Gummistreifen | 2 Stk. |

---

## G — Sonstiges / Ausbau

| Pos | Bezeichnung | Maß / Typ | Menge |
|---|---|---|---|
| G1 | Matratze | 1.100 × 2.000 × 80 mm, Kaltschaum | 1 |
| G2 | Matratzenbezug | wasserdampfdurchlässig | 1 |
| G3 | Gummimatte / Antirutsch-Folie | 1.120 × 900 mm | 1 |
| G4 | Kantenband Buche | 18 mm breit, selbstklebend | ~8 m |
| G5 | Holzöl oder -wachs | für Oberflächen | nach Bedarf |

---

## H — Verbindungstechnik

> Entscheidungsprotokolle: [ADR 0007 Korpus](docs/adrs/0007-dowel-screw-bracket-joinery.md) · [ADR 0011](docs/adrs/0011-drawer-box-panel-shear-joinery.md) + [ADR 0024 Schubladen](docs/adrs/0024-cnc-drawer-boxes-finger-joints-and-lightening-windows.md) · [ADR 0012 Fahrzeugbefestigung](docs/adrs/0012-non-destructive-vehicle-tie-down.md) · [ADR 0013](docs/adrs/0013-rail-carrier-cheeks-for-seat-and-table-boards.md) + [ADR 0028 Wangen](docs/adrs/0028-height-plan-board-on-cheeks-foolproof-runner-layout.md)

Abschnitte: Korpus (unten) · [H1 Schienen](#h1--schienenbefestigung-an-wänden-und-trennwänden) · [H2 Schubladenkästen](#h2--schubladenkästen-d1d3) · [H3 Front und Griff](#h3--front-und-griff) · [H4 Liegefläche](#h4--liegefläche-stöße-t1--f1--f2) · [H5 Fahrzeug](#h5--befestigung-des-korpus-im-fahrzeug)

### Ausgangslage

Birke-Multiplex hält Schrauben in der Fläche sehr gut, aber schlecht in der Stirnkante (Hirnholz). Boden B1 und Deckel T1 laufen durch; die Wände (R1, S1, S2, M1, M2) stehen dazwischen — ohne weitere Maßnahme stünden sie nur mit ihrer Stirnkante auf B1 bzw. unter T1. Schrauben allein würden bei Fahrvibrationen über Zeit ausreißen; Leim allein macht den Korpus unlösbar und ist für einen Fahrzeugausbau unpraktisch.

### Empfohlene Verbindung: Boden/Deckel → Wände

> Entscheidungsprotokolle: [ADR 0007](docs/adrs/0007-dowel-screw-bracket-joinery.md) · [ADR 0018](docs/adrs/0018-continuous-bottom-and-lid-walls-in-grooves.md) · [ADR 0020](docs/adrs/0020-through-tenons-instead-of-routed-grooves.md) (Zapfen)

| Reihenfolge | Mittel | Zweck |
|---|---|---|
| 1 | **Zapfen 18 × 50 mm** der Wände durch B1 und T1 (§Korpus), verleimt, danach bündig schleifen | Exakte Ausrichtung, Scherkräfte — ersetzt die Dübel |
| 2 | Schrauben 4 × 45 mm Senkkopf durch T1 von oben und durch B1 von unten in die Wandkanten, alle 120–150 mm, nahe an den Zapfen | Zugfestigkeit senkrecht zur Fuge |
| 3 | Innenwinkel 40 × 40 mm an den 4 Ecken Deckel ↔ Seitenwand | Vibrationsreserve, optional |

Ohne Zapfen (Rückfallvariante „stumpf“): statt Schritt 1 Holzdübel Ø 8 × 40 mm alle ~200 mm (V4), Winkel dann nicht optional.

Schlitze und Aussparungen an der **tatsächlichen** Plattenstärke ausrichten (Multiplex ist oft etwas dicker als 18 mm): erst einen Zapfen und einen Schlitz im Reststück probieren.

| Arbeit | Werkzeug |
|---|---|
| Wandkante von außen bis kurz vor den ersten Zapfen | Handkreissäge an Führungsschiene oder angezwungener Latte; das runde Blatt schneidet nicht bis in die Ecke, daher ~40 mm vorher stoppen |
| Wandkante zwischen zwei Zapfen | Stichsäge, ~1 mm neben der Linie, dann zur Linie feilen. **Handkreissäge nicht mitten in der Platte eintauchen** (Rückschlag) |
| Schlitze | In den Ecken bohren, Stichsäge, Ecken rechtwinklig feilen |
| Aussparungen | Stichsäge, feilen |

Die 302 mm zwischen den Absätzen müssen **direkt neben den Zapfen** an allen Wänden gleich sein, dort liegt die Wand auf. Dazwischen darf die Kante bis ~0,5 mm zurückstehen, aber nicht überstehen.

### Trennwände und Rückwand

Die Trennwände (M1/M2) stecken mit ihren Zapfen in den Schlitzen von B1 und T1 und mit dem hinteren Zapfen in R1. Sie werden durch B1 (von unten), T1 (von oben) und die Rückwand R1 (von hinten, je eine Schraube ober- und unterhalb des Zapfens) in ihre Stirnkanten verschraubt, Leim D3 an allen Zapfen. *(Früher stand hier „von außen durch die Seitenwände“ — das geht nicht: M1/M2 steht parallel zu S1/S2 und berührt sie nicht.)* Die **Rückwand (R1) ist die Aussteifungsscheibe** gegen Verwindung: sie sitzt zwischen den Seitenwänden in den hinteren Aussparungen, vollflächig verleimen und mit mindestens 6 Schrauben durch die Seitenwände sichern.

### H1 — Schienenbefestigung an Wänden und Trennwänden

> Entscheidungsprotokoll: [docs/adrs/0011-drawer-box-panel-shear-joinery.md](docs/adrs/0011-drawer-box-panel-shear-joinery.md)

Die Außenmember der Schienen werden auf die **Flächen** von Seitenwänden (S1/S2) und Trennwänden (M1/M2) geschraubt — nie auf Kanten. 18 mm Multiplex hält Schrauben in der Fläche sehr gut.

| Punkt | Vorgabe | Grund |
|---|---|---|
| Schraubenlänge | max. **16 mm** (V2 3,5 × 16 für die 80-kg-Schienen, V18 5 × 16 für die 170-kg-Schienen mit M6-Löchern), Flach- oder Tellerkopf | Trennwände tragen Schienen auf **beiden** Seiten; längere Schrauben durchstoßen die 18 mm Platte. Der Kopf darf nicht über die Schiene stehen, sonst schleift das bewegliche Teil |
| Höhen der Schienenbänder | aus `modell/modell.py` ([ADR 0028](docs/adrs/0028-height-plan-board-on-cheeks-foolproof-runner-layout.md)), Montagetabelle unten. **Außensektionen: Schienen unten, Mitte: Schienen oben** — an M1/M2 liegt die Außenseite ganz unter 134 mm über B1, die Mittelseite ganz über 163 mm | Durchsteckschrauben und Muttern landen auf der Gegenseite immer auf freier Wandfläche, 16-mm-Schrauben von beiden Seiten stehen sich nie gegenüber |
| Vorderste 2 Bohrungen je Schiene | **M6 × 30 Durchsteckschraube** (V9) mit U-Scheibe + Stoppmutter statt Holzschraube. Höchstens ~10 mm Überstand auf der Gegenseite: das Element der Nachbarsektion läuft 20 mm vor der Wand (19 mm Schiene + 1 mm Spiel) | Am Korpusvorderkant ist das Kippmoment bei 870 mm Auszug maximal — hier reißen Holzschrauben zuerst aus |
| Nicht trennbare Schiene (170 kg, „not separable“) | wird als Ganzes montiert, durch die Löcher der ausgezogenen Schiene; hinten nur mit langer Bit-Verlängerung oder Winkelaufsatz erreichbar. **Vor dem Verleimen an einer Wand trocken ausprobieren**, ggf. Schienen vor dem Aufsetzen von T1 montieren | Der Korpus ist sonst bei der Montage schon geschlossen |
| Verschrauben | von innen nach außen anreißen, Schienen **paarweise** auf gleiche Höhe lehren (Reststück Multiplex als Abstandslehre) | 1 mm Höhenversatz im Paar blockiert den Vollauszug |

**Montagetabelle** — Unterkante jeder Schiene, gemessen von der **Oberkante B1** (Abstandsklotz in dieser Höhe zuschneiden, Schiene daraufstellen, Vorderkante bündig zur Korpusfront):

| Wandseite | Schiene | Unterkante über B1 | Band über B1 |
|---|---|---|---|
| S1 innen, M1 links (Sektion L) · S2 innen, M2 rechts (Sektion R) | Sitzbrett C1 / C2 (170 kg) | **0** (steht auf B1) | 0–76 |
| | Schublade D1 / D2 (80 kg) | **81** | 81–134 |
| M1 rechts, M2 links (Sektion Mitte) | Schublade D3 (80 kg) | **163** | 163–216 |
| | Tischbrett C3 (170 kg) | **221** | 221–297 |

**Narrensicher an M1/M2:** einen Bleistiftstrich **150 mm über B1** auf beiden Seiten ziehen — auf der Seite zur Außensektion liegt alles darunter, auf der Seite zur Mitte alles darüber.

Die Innenmember der 170-kg-Schienen werden an die **Wangen** der Sitz-/Tischbretter geschraubt (§C, [ADR 0028](docs/adrs/0028-height-plan-board-on-cheeks-foolproof-runner-layout.md)) — Faserfläche statt Stirnkante; die Wange deckt das 55-mm-Teleskopteil ab, das ausgefahren vor dem Korpus steht.

### H2 — Schubladenkästen (D1–D3)

> Entscheidungsprotokoll: [ADR 0024](docs/adrs/0024-cnc-drawer-boxes-finger-joints-and-lightening-windows.md) (ersetzt den Kastenbau aus [ADR 0011](docs/adrs/0011-drawer-box-panel-shear-joinery.md)) · ohne Blenden: [ADR 0027](docs/adrs/0027-no-drawer-front-panels-box-front-with-grip-cut-out.md)

Alle Teile kommen fertig gefräst; verbunden wird nur mit **Leim**, ohne Schrauben und ohne Eckleisten.

| Verbindung | Ausführung | Zweck |
|---|---|---|
| Ecken | **Fingerzinken**, 7 Felder über die Kastenhöhe (226,5 / 229,5 mm); Seitenwände (-S) haben oben und unten einen Zinken | trägt den Zug am Griff und Verwindung, große Leimfläche in Langholz |
| Boden ↔ Wände | Boden 12 mm mit **Zapfen 50 mm** (5 je lange, 2 je kurze Kante) durch **Schlitze 50 × 12 mm** in allen vier Wänden, 10 mm über der Wandunterkante | trägt die Ladung, legt den Kasten rechtwinklig fest |
| Fenster (D1/D2) | 4 Durchbrüche je Seitenwand, Radius 20 mm; das **Schienenband ± 15 mm bleibt voll stehen** | Gewicht sparen; beim Sitzen auf den Sitzbrettern die leicht geöffnete Schublade von der Seite erreichen ([ADR 0026](docs/adrs/0026-windows-for-outer-drawers-hole-grid-for-middle-drawer.md)) |
| Lochraster (D3) | 2 × 18 Löcher je Seitenwand Ø 25 mm im 40-mm-Raster, gleiche Ränder wie die Fenster | Luft und etwas Gewicht sparen, ohne dass Kleinteile herausfallen |

**Zusammenbau** (ein Leimgang, vorher trocken zusammenstecken):

1. Boden auf die Werkbank, Leim in die Schlitze und auf die Zinken
2. Seitenwände (-S) seitlich auf die Bodenzapfen schieben
3. Kastenfront und -rückwand (-E) von vorn bzw. hinten aufschieben — dabei greifen Zinken und Bodenzapfen gleichzeitig
4. Zwingen, **Diagonalen messen**, bevor der Leim anzieht
5. Nach dem Trocknen überstehende Zinken und Zapfen (1 mm) **bündig schleifen**, dann erst die Schienen anschrauben (V2, 3,5 × 16 mm, nur im vollen Schienenband)

Durch die Fenster von D1/D2 können Kleinteile in den Korpus fallen — bei Bedarf eine Einlage oder Tasche in die Schublade. D3 hat deshalb nur kleine Löcher.

### H3 — Front und Griff

> Entscheidungsprotokoll: [ADR 0027](docs/adrs/0027-no-drawer-front-panels-box-front-with-grip-cut-out.md)

**Keine Frontblenden.** Die Kastenfront (-E1) ist die sichtbare Front und schließt bündig mit den Sitz- und Tischbrettern ab. Die Blenden hätten die 76 mm hohen Schienen der Sitz-/Tischbretter verdeckt — und genau dadurch blockiert: bei geschlossener Schublade hätte das Brett nicht ausfahren können.

- **Griff**: Ausschnitt von der Oberkante, 120 × 35 mm, unten Radius 15 mm, die beiden oberen Außenecken Radius 10 mm, alles mitgefräst. Alternativ in `modell/parameter.json` → `schubladen.griff.art: "loch"` ein geschlossenes Griffloch.
- Seitlich bleibt je ~20 mm Fuge, in der die Schiene zu sehen ist. Das Spaltmaß ergibt sich aus der Lage der Schienen und ist nicht einstellbar — die Schienen deshalb paarweise genau auf Höhe lehren (→ H1).

### H4 — Liegefläche: Stöße T1 / F1 / F2

Deckplatte (T1), Klappbrett Rücksitz (F1) und Klappbrett Kopfende (F2) sind mit **Klappscharnieren** verbunden ([ADR 0019](docs/adrs/0019-hinged-sleeping-boards-fold-onto-the-corpus.md)). Zum Fahren werden die beiden Klappbretter auf die Deckplatte zurückgeklappt (Viewer: Fahrmodus 1/2), dann lassen sich die Rücksitze hochklappen:

| Stoß | Verbindung |
|---|---|
| T1 ↔ F1 | **3 Scharniere oben** (V17) — F1 kann nur nach oben über die Box klappen, nicht durchhängen. Geklappt liegt F1 umgedreht auf T1 (z 200–900, ~6 mm Abstand durch die Scharnierblätter) |
| F1 ↔ F2 | **3 Scharniere unten** (V17) — flach klappt F2 nur nach unten; liegt F1 umgedreht auf der Box, zeigt „unten“ nach oben und F2 legt sich auf F1 (z 200–600). Stapelhöhe 386 mm |
| F1 ↔ Rücksitzlehnen | Lehnen liegen bei **310 mm**, Unterkante F1 bei 320 mm (gemessen) → **10 mm Ausgleich** (V16): 2 Leisten 10 × 40 mm quer unter F1 auf Höhe der Lehnen, oder 10-mm-Gummistreifen; sonst federt F1 durch und die Überlappungsleisten tragen allein |
| F2 ↔ Kopfstützen | **2 verstellbare Gurtschlaufen** (V15), je Seite eine: jede Schlaufe läuft durch **2 Bohrungen in F2** und um die Kopfstützenstangen; die Zuglast tragen die Kopfstützen. Bohrungen und Schlaufenlänge werden beim Einbau am Fahrzeug festgelegt |
| alle Auflageflächen | Antirutschmatte / Gummistreifen (G3-Reststücke) | 

F2 trägt wenig Last (Kopfbereich) — hier ist Sicherung gegen Verrutschen wichtiger als Tragfähigkeit. Vor dem Klappen die Kopfstützen-Schlaufen lösen.

**Beim Fahren:** Der geklappte Stapel hängt nur an den Scharnieren bei z = 900 — mit einem Spanngurt (V11) am Korpus sichern, Matratze separat verstaut und gesichert. Kopfstützen dabei nicht verstellen oder blockieren (→ [Hinweise-Sommernutzung.md](./Hinweise-Sommernutzung.md)).

### H5 — Befestigung des Korpus im Fahrzeug

> Entscheidungsprotokolle: [ADR 0012](docs/adrs/0012-non-destructive-vehicle-tie-down.md) (keine Bohrungen) · [ADR 0016](docs/adrs/0016-rear-lashing-eyes-carry-the-hold-down.md) (Rücksitz-Ösen tragen die Niederhaltung)

**Keine neue Bohrung in Karosserie, Ladeboden oder Verkleidung.** Befestigung ausschließlich über die werkseitigen Zurrösen.

Maßgeblicher Lastfall ist **Sitzen im Bankmodus**: Eine Person auf dem 850 mm ausgefahrenen Brett hebelt den Korpus um seine Unterkante an der Heckklappe; das Ende an den Rücksitzen will hoch. Grob (mit 900 mm gerechnet, also leicht konservativ): 100 kg am Brettende → **ca. 700 N Niederhaltekraft** am hinteren Ende (≈ 350 N je Öse). Da auch auf dem Tischbrett C3 jemand sitzen darf (ADR 0021), können bis zu drei Personen gleichzeitig hebeln — dann grob das Dreifache. Deshalb:

1. **Rücksitz-Ösen (wichtig):** liegen seitlich neben dem Korpus. Je Seite 1 Stahlwinkel (V3) **außen auf die Seitenwand S1/S2**, hinteres Ende, in die Fläche geschraubt (4 × 30 mm), M8-Schraube mit U-Scheibe und Stoppmutter (V10) in die Öse. Winkelform/Biegung nach der tatsächlichen Ösenlage.
2. **Heckklappen-Ösen (optional):** falls unter dem Korpus, je 1 Winkel von innen auf B1 — nur gegen Verrutschen/Klappern; gegen Kippen bringen sie fast nichts, weil sie am Drehpunkt sitzen.
3. 2 × Spanngurt (V11) als redundanter Pfad — und als einzige Sicherung, solange die Winkel noch nicht sitzen.
4. Antirutschmatte (G3) unter den Korpus — gegen Klappern, **nicht** als Sicherung gerechnet.

Die Winkelpositionen lassen sich nicht aus der Zeichnung ableiten: sie werden im Fahrzeug von den tatsächlichen Ösenpositionen abgenommen.

### Montagereihenfolge

1. Zapfen an den Wänden sägen, Schlitze und Aussparungen in B1, T1 und R1 anreißen und sägen (Probestück zuerst)
2. **Einmal ganz ohne Leim zusammenstecken.** Die Reihenfolge ist zwingend: M1/M2 von oben in B1 → R1 von hinten aufschieben (der hintere M1/M2-Zapfen geht durch R1, die unteren R1-Zapfen gleiten in die offenen Aussparungen) → S1 und S2 links und rechts → T1 von oben
3. In derselben Reihenfolge verleimen und von unten und oben verschrauben, Zapfen bündig schleifen; Innenwinkel optional
4. Schienen erst danach einmessen und montieren — der fertige Korpus gibt das verbindliche Innenmaß (→ H1)
5. Schubladenkästen bauen (→ H2), einhängen, Lauf prüfen
6. Korpus ins Fahrzeug, Positionen der Rücksitz-Ösen außen an S1/S2 anreißen (ggf. Heckklappen-Ösen auf B1), Winkel setzen (→ H5)
7. Klappbretter F1/F2 mit den Scharnieren V17 an der Deckplatte anschlagen, Ausgleich V16 und Kopfstützen-Schlaufen V15 anpassen (→ H4) — im Fahrzeug, bei umgeklappten Sitzen

### Was vermieden werden sollte

| Methode | Grund |
|---|---|
| Nur Schrauben in Stirnkante | Hält mittelfristig nicht unter Dauervibrationen |
| Nur Leim | Korpus nicht mehr lösbar; Multiplex arbeitet bei Temperaturwechseln im Auto |
| Lamellos / Domino | Aufwand unverhältnismäßig für ein Fahrzeugmodul |
| Schienen-Innenmember auf die 32 mm Brettkante schrauben | Nur die unterste Lochreihe greift, und das in Stirnkante — genau dort, wo eine Person sitzt (→ ADR 0013) |
| Schrauben > 16 mm in die Trennwände M1/M2 | Schienen auf beiden Seiten → Durchstoß / Schraubenkollision |
| Durch den Ladeboden in die Karosserie bohren | Zerstört Korrosionsschutz und Unterbodendichtung; Leitungen nicht einsehbar (→ ADR 0012) |

---

## Kommerzielle Alternative

Wer den Ausbau nicht selbst bauen möchte, kann auf fertige Systeme zurückgreifen:

### Moonbox 111
→ [moonbox.de/products/moonbox-111](https://www.moonbox.de/products/moonbox-111)

Fertig aufgebautes Schlafsystem speziell für den VW Caddy — inkl. Bettgestell, Stauraum und Lattenrost.  
Sinnvoll als Referenz für Maße, Verarbeitung und Preiseinschätzung auch wenn man selbst baut.

---

## Übersicht Holzbedarf (Birke-Multiplex)

| Stärke | Netto-Fläche (gerundet) |
|---|---|
| 18 mm | ca. 7,5 m² (inkl. Bodenplatte 1,0 m²) |
| 12 mm (Schubladenböden) | ca. 1,5 m² |

Standardformat Multiplex-Platte: 2.500 × 1.250 mm → **ca. 3 Platten à 18 mm** + **1 Platte à 12 mm**.

Zusätzliche Leisten entfallen: Eckleisten V12 (Fingerzinken, ADR 0024) und Leisten V13 (Scharniere V17). Die Trägerwangen (V14) lassen sich aus dem 18-mm-Verschnitt schneiden.

→ Preise und Gesamtbudget: **[Einkaufsliste.md](./Einkaufsliste.md)**
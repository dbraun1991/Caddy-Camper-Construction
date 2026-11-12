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
| | D1-F / D2-F / D3-F | Schubladenfront links / rechts / Mitte (sichtbare Blende) |
| | D1-S, D1-E, D1-B … | Teile eines Kastens: Seitenwand (Side), Kastenfront/-rückwand (End), Boden (Bottom) — [ADR 0024](docs/adrs/0024-cnc-drawer-boxes-finger-joints-and-lightening-windows.md) |
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

Nutzbare Innenhöhe: 320 mm − 18 mm (Bodenplatte) = **302 mm** (davon 32 mm Sitz/Tischbrett + 268 mm Schublade + 2 mm Spaltmaß oben); **Wandhöhe im Zuschnitt = 340 mm** (302 + 2 × 19 mm Zapfen, je Kante 1 mm zum Bündigschleifen).  
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

Untere 10 % der Sektionshöhe (32 mm) bei L/R, obere 10 % bei Mitte.  
Alle drei fahren 850 mm auf Vollauszug-Schienen aus — **kein Klappen**, reine Zugbewegung.

| Pos | Bezeichnung | Maß (B × T × H) | Menge | Position im Korpus |
|---|---|---|---|---|
| C1 | Sitzbrett Links | 272 × 850 × 32 | 1 | y 18–50 mm; 312 mm Innen − 38 mm Schienen − 2 mm Spalt |
| C2 | Sitzbrett Rechts | 272 × 850 × 32 | 1 | y 18–50 mm; 312 mm Innen − 38 mm Schienen − 2 mm Spalt |
| C3 | Tischbrett Mitte | 384 × 850 × 32 | 1 | y 283–315 mm; 424 mm Innen − 38 mm Schienen − 2 mm Spalt |

> **Hinweis:** 32 mm Brettstärke = 18 mm Multiplex + 14 mm Auflageleiste, oder direkt aus 32 mm Leimholz.

> **Auf dem Tischbrett C3 darf auch jemand sitzen** — zumindest darf es dabei nicht brechen. Deshalb läuft C3 wie C1/C2 auf der 170-kg-Schiene ([ADR 0021](docs/adrs/0021-table-board-on-170-kg-runners.md)). Auch das Brett selbst muss eine Person bei 850 mm Auszug tragen: das wird mit [ADR 0013](docs/adrs/0013-rail-carrier-cheeks-for-seat-and-table-boards.md) (Aufbau der Bretter) mitgeprüft.

> **Spalt zwischen Tischbrett C3 und Deckplatte T1:** laut Modell 5 mm (C3 oben bei y = 315, T1 unten bei y = 320). Steht jemand auf T1, biegt sich die Platte über der Mittelsektion grob 3 mm durch, an der freien Vorderkante grob 6,5 mm (Überschlag: 150 kg auf einer Stelle, geschätzte Materialwerte). T1 kann dann auf C3 aufliegen — **Auszüge nur ohne Last auf T1 bewegen.** Das Maß am fertigen Korpus prüfen.

---

## D — Schubladen (3 Stück)

Schubladenkästen als **CNC-Teile** ([ADR 0024](docs/adrs/0024-cnc-drawer-boxes-finger-joints-and-lightening-windows.md)): Wände 18 mm mit **Fingerzinken** an den Ecken, Boden 12 mm mit **Zapfen durch Schlitze** in allen vier Wänden, **Fenster** in den Seitenwänden zur Gewichtsersparnis. DXF und Auftrag: [`docs/cnc/schubladen/`](docs/cnc/schubladen/) (im Viewer Reiter „DXF · CNC“ → „Schubladenkästen“).  
Kastentiefe 830 mm (850-mm-Auszug, dahinter 32 mm Luft bis zur Rückwand R1, [ADR 0017](docs/adrs/0017-850-mm-runners-in-900-mm-corpus.md)), Kastenhöhe 260 mm, nutzbare Innenhöhe 238 mm (Boden liegt 10 mm über der Wandunterkante).

> **Kastenbreiten bestätigt** (2026-11-12): Sektionsbreite − 2 × Schienenstärke − 2 mm Spiel, die gelieferte 80-kg-Schiene ist wie geplant **19 mm** stark. Vor der Bestellung noch die Schraublöcher der Schiene gegen das volle Schienenband der Seitenwände prüfen.

Maße = fertiges Teil. Zinken und Bodenzapfen stehen je 1 mm über (Schleifzugabe), deshalb sind die Rohteile 2 mm länger bzw. breiter (Spalte „Rohteil“ = Maß in der DXF).

### D1 + D2 — Schublade links & rechts (je 1×, identische Teile)

y = 50–318 mm (Blende 268 mm hoch); 312 mm Sektion − 2 × 19 mm Schiene − 2 mm Spalt = **272 mm** Außenbreite.

| Kürzel | Bauteil | Fertig (mm) | Rohteil (mm) | Stärke | Menge |
|---|---|---|---|---|---|
| D1-S / D2-S | Seitenwand, 4 Fenster über dem Schienenband | 830 × 260 | 832 × 260 | 18 mm | 4 |
| D1-E / D2-E | Kastenfront und -rückwand | 272 × 260 | 274 × 260 | 18 mm | 4 |
| D1-B / D2-B | Boden, 14 Zapfen | 236 × 794 (+ Zapfen) | 274 × 832 | 12 mm | 2 |
| D1-F / D2-F | Frontblende (sichtbar, nicht im CNC-Auftrag, → §H3) | 312 × 268 | — | 18 mm | 2 |

### D3 — Schublade Mitte (1×)

y = 18–286 mm (Blende 268 mm hoch); 424 mm Sektion − 2 × 19 mm Schiene − 2 mm Spalt = **384 mm** Außenbreite.

| Kürzel | Bauteil | Fertig (mm) | Rohteil (mm) | Stärke | Menge |
|---|---|---|---|---|---|
| D3-S | Seitenwand, 4 Fenster unter dem Schienenband | 830 × 260 | 832 × 260 | 18 mm | 2 |
| D3-E | Kastenfront und -rückwand | 384 × 260 | 386 × 260 | 18 mm | 2 |
| D3-B | Boden, 14 Zapfen | 348 × 794 (+ Zapfen) | 386 × 832 | 12 mm | 1 |
| D3-F | Frontblende (sichtbar, nicht im CNC-Auftrag, → §H3) | 424 × 268 | — | 18 mm | 1 |

Gewicht der drei Kästen ohne Blenden ca. **22,2 kg** — ohne Fenster wären es 26,4 kg (Dichte 680 kg/m³ angenommen, berechnet in `modell/cnc.py`).

---

## E — Vollauszug-Schienen (6 Paare gesamt)

> Auswahlbegründung: [ADR 0008](docs/adrs/0008-heavy-duty-full-extension-runners.md) (Schwerlast + Arretierung) · [ADR 0017](docs/adrs/0017-850-mm-runners-in-900-mm-corpus.md) (850 statt 900 mm: lichte Tiefe hinter R1 nur 882 mm)

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
**170 kg Traglast** · 76 mm Höhe · mit Arretierung · 104,99 €/Paar · 2 Paare bestellt 2026-11-04, **1 Paar nachbestellen** (C3, ADR 0021) · [Amazon.de — B086JQXRR5](https://www.amazon.de/dp/B086JQXRR5)  
Einbaumaß laut Hersteller 19,2 + 0,5 mm je Seite: passt in die eingeplanten 20 mm (19 mm Schiene + 1 mm Spiel). **Gemessen 2026-11-12: 19 mm Stärke**, Höhe ~74 mm (Messung unsicher; im Modell bleibt bis zur Kontrolle der Datenblattwert 76 mm). Verarbeitung sehr gut.  
⚠ **Noch prüfen:** Rastet die Arretierung im ausgezogenen Zustand ein? Für die Sitz- und Tischbretter Pflicht, sonst zurückschicken.

```
Vollauszug 850 mm · Höhe 76 mm · Einbaumaß 19,2 + 0,5 mm je Seite · Stahl 2,5 mm · Traglast 170 kg · Arretierung: Ja · nicht trennbar
Einbaumaß: Sektionsbreite − 2 × 19 mm − 2 mm Spalt = Elementbreite
Hinter der Schiene: 882 mm lichte Tiefe − 850 mm = 32 mm Luft
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
| V2 | Spanplattenschrauben (Schienen) | Torx Senkkopf 3,5 × 16 mm | ~120 Stk. |
| V3 | Stahlwinkel (Korpus 8× innen + Fahrzeug 4×: 2 außen an S1/S2 hinten, 2 optional auf B1 vorne, → §H5) | 40 × 40 × 2 mm | 12 Stk. |
| V4 | Holzdübel (nur für die Rückfallvariante „stumpf“ nötig) | Ø 8 × 40 mm | ~30 Stk. |
| V5 | Holzleim D3 (wasserfest) | 750 ml | 1 Flasche |
| V6 | Schubladengriff | nach Wahl, mind. 64 mm Bohrung | 3 Stk. |
| V7 | Spanplattenschrauben (Blenden, Winkel) | Torx Senkkopf 4 × 30/40 mm | je ~100 Stk. |
| V8 | ~~Spanplattenschrauben Schubladenböden~~ — entfällt, Boden mit Zapfen ([ADR 0024](docs/adrs/0024-cnc-drawer-boxes-finger-joints-and-lightening-windows.md)) | — | — |
| V9 | Durchsteckschrauben Schienen-Vorderkante (→ §H1) | M5 × 30 mm + U-Scheibe + Stoppmutter (nicht länger, [ADR 0025](docs/adrs/0025-drawer-runners-interleaved-between-seat-and-table-runners.md)) | 24 Sätze |
| V10 | Schrauben Zurrösen-Anbindung (→ §H5) | M8 × 30/40 mm + U-Scheibe + Stoppmutter | 4 Sätze |
| V11 | Spanngurt (Ratsche) | ≥ 1,5 m, 2-teilig | 2 Stk. |
| V12 | ~~Eckleiste Weichholz Schubladen-Innenecken~~ — entfällt, Fingerzinken ([ADR 0024](docs/adrs/0024-cnc-drawer-boxes-finger-joints-and-lightening-windows.md)) | — | — |
| V13 | ~~Überlappungsleisten Liegefläche~~ — entfällt, ersetzt durch Scharniere V17 ([ADR 0019](docs/adrs/0019-hinged-sleeping-boards-fold-onto-the-corpus.md)) | — | — |
| V14 | Trägerwangen Sitz-/Tischbretter (→ §H1 / ADR 0013) | 18 mm × Schienenhöhe × 850 mm | 6 Stk. ⚠ erst nach ADR 0013 |
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

> Entscheidungsprotokolle: [ADR 0007 Korpus](docs/adrs/0007-dowel-screw-bracket-joinery.md) · [ADR 0011](docs/adrs/0011-drawer-box-panel-shear-joinery.md) + [ADR 0024 Schubladen](docs/adrs/0024-cnc-drawer-boxes-finger-joints-and-lightening-windows.md) · [ADR 0012 Fahrzeugbefestigung](docs/adrs/0012-non-destructive-vehicle-tie-down.md) · [ADR 0013 Trägerwangen (offen)](docs/adrs/0013-rail-carrier-cheeks-for-seat-and-table-boards.md)

Abschnitte: Korpus (unten) · [H1 Schienen](#h1--schienenbefestigung-an-wänden-und-trennwänden) · [H2 Schubladenkästen](#h2--schubladenkästen-d1d3) · [H3 Frontblenden](#h3--frontblenden) · [H4 Liegefläche](#h4--liegefläche-stöße-t1--f1--f2) · [H5 Fahrzeug](#h5--befestigung-des-korpus-im-fahrzeug)

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
| Schraubenlänge in M1/M2 | max. **3,5 × 16 mm** | Trennwände tragen Schienen auf **beiden** Seiten; längere Schrauben durchstoßen die 18 mm Platte |
| Höhen der Schienenbänder | aus `modell/modell.py` ([ADR 0025](docs/adrs/0025-drawer-runners-interleaved-between-seat-and-table-runners.md)): Sektion L/R Sitzbrett **18–94**, Schublade **107–160**; Mitte Schublade **173–226**, Tisch **239–315**. Die Schubladenschienen liegen im freien Streifen zwischen Sitz- und Tischbrett-Schiene, je 13 mm Luft — an M1/M2 überlappt sich **kein** Band mit dem der Gegenseite | Durchsteckschrauben und Muttern landen auf der Gegenseite immer auf freier Wandfläche; 16-mm-Schrauben von beiden Seiten stehen sich nie gegenüber |
| Vorderste 2 Bohrungen je Schiene | **M5 × 30 Durchsteckschraube** mit U-Scheibe + Stoppmutter statt Holzschraube. Höchstens ~10 mm Überstand auf der Gegenseite: das Element der Nachbarsektion läuft 20 mm vor der Wand (19 mm Schiene + 1 mm Spiel) | Am Korpusvorderkant ist das Kippmoment bei 850 mm Auszug maximal — hier reißen Holzschrauben zuerst aus |
| Nicht trennbare Schiene (170 kg, „not separable“) | wird als Ganzes montiert, durch die Löcher der ausgezogenen Schiene; hinten nur mit langer Bit-Verlängerung oder Winkelaufsatz erreichbar. **Vor dem Verleimen an einer Wand trocken ausprobieren**, ggf. Schienen vor dem Aufsetzen von T1 montieren | Der Korpus ist sonst bei der Montage schon geschlossen |
| Verschrauben | von innen nach außen anreißen, Schienen **paarweise** auf gleiche Höhe lehren (Reststück Multiplex als Abstandslehre) | 1 mm Höhenversatz im Paar blockiert den Vollauszug |

⚠ Zuerst ADR 0013 entscheiden: die Sitz-/Tischbretter (32 mm) sind niedriger als die Schienen-Innenmember (76 mm bei C1–C3) — siehe [docs/adrs/0013-rail-carrier-cheeks-for-seat-and-table-boards.md](docs/adrs/0013-rail-carrier-cheeks-for-seat-and-table-boards.md). Empfehlung: **Trägerwangen** 18 mm × Schienenhöhe × 850 mm, verleimt + verschraubt an beiden Längskanten; die Schiene greift dann in Faserfläche, nicht in Stirnkante.

### H2 — Schubladenkästen (D1–D3)

> Entscheidungsprotokoll: [ADR 0024](docs/adrs/0024-cnc-drawer-boxes-finger-joints-and-lightening-windows.md) (ersetzt den Kastenbau aus [ADR 0011](docs/adrs/0011-drawer-box-panel-shear-joinery.md); Blende und Schienenbefestigung bleiben wie dort)

Alle Teile kommen fertig gefräst; verbunden wird nur mit **Leim**, ohne Schrauben und ohne Eckleisten.

| Verbindung | Ausführung | Zweck |
|---|---|---|
| Ecken | **Fingerzinken**, 7 Felder über 260 mm Höhe; Seitenwände (-S) haben oben und unten einen Zinken | trägt Zug an der Blende und Verwindung, große Leimfläche in Langholz |
| Boden ↔ Wände | Boden 12 mm mit **Zapfen 50 mm** (5 je lange, 2 je kurze Kante) durch **Schlitze 50 × 12 mm** in allen vier Wänden, 10 mm über der Wandunterkante | trägt die Ladung, legt den Kasten rechtwinklig fest |
| Fenster | 4 Durchbrüche je Seitenwand, Radius 20 mm; das **Schienenband ± 15 mm bleibt voll stehen** | Gewicht sparen, ohne die Schienenbefestigung zu schwächen |

**Zusammenbau** (ein Leimgang, vorher trocken zusammenstecken):

1. Boden auf die Werkbank, Leim in die Schlitze und auf die Zinken
2. Seitenwände (-S) seitlich auf die Bodenzapfen schieben
3. Kastenfront und -rückwand (-E) von vorn bzw. hinten aufschieben — dabei greifen Zinken und Bodenzapfen gleichzeitig
4. Zwingen, **Diagonalen messen**, bevor der Leim anzieht
5. Nach dem Trocknen überstehende Zinken und Zapfen (1 mm) **bündig schleifen**, dann erst die Schienen anschrauben (V2, 3,5 × 16 mm, nur im vollen Schienenband)

Durch die Fenster können Kleinteile in den Korpus fallen — bei Bedarf eine Einlage oder Tasche in die Schublade.

### H3 — Frontblenden

Die Frontblende ist kein tragendes Teil und wird **zuletzt** montiert, erst wenn der Kasten auf den Schienen läuft. **Art und Maße der Blenden (einliegend/aufliegend, Spaltmaße) werden erst am fertigen Korpus festgelegt** — Schienen anhalten, messen, dann entscheiden; die Blendenmaße in §D sind bis dahin vorläufig.

1. Blende mit 2 Schrauben provisorisch von innen fixieren
2. Spaltmaß zur Nachbarsektion mit Pappstreifen (1–2 mm) einstellen, Schublade mehrfach auf- und zufahren
3. Erst dann 4 × Schrauben 4 × 30 mm **von innen** durch die Kastenfront in die Blende

Von außen ist nie eine Schraube sichtbar. Griffe (V6) erst nach Fixierung der Blende bohren.

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
6. Frontblenden einstellen und von innen festschrauben (→ H3), danach Griffe bohren
7. Korpus ins Fahrzeug, Positionen der Rücksitz-Ösen außen an S1/S2 anreißen (ggf. Heckklappen-Ösen auf B1), Winkel setzen (→ H5)
8. Klappbretter F1/F2 mit den Scharnieren V17 an der Deckplatte anschlagen, Ausgleich V16 und Kopfstützen-Schlaufen V15 anpassen (→ H4) — im Fahrzeug, bei umgeklappten Sitzen

### Was vermieden werden sollte

| Methode | Grund |
|---|---|
| Nur Schrauben in Stirnkante | Hält mittelfristig nicht unter Dauervibrationen |
| Nur Leim | Korpus nicht mehr lösbar; Multiplex arbeitet bei Temperaturwechseln im Auto |
| Lamellos / Domino | Aufwand unverhältnismäßig für ein Fahrzeugmodul |
| Schienen-Innenmember auf die 32 mm Brettkante schrauben | Nur die unterste Lochreihe greift, und das in Stirnkante — genau dort, wo eine Person sitzt (→ ADR 0013) |
| Schrauben > 16 mm in die Trennwände M1/M2 | Schienen auf beiden Seiten → Durchstoß / Schraubenkollision |
| Durch den Ladeboden in die Karosserie bohren | Zerstört Korrosionsschutz und Unterbodendichtung; Leitungen nicht einsehbar (→ ADR 0012) |
| Frontblende von außen verschrauben | Sichtbare Schraubenköpfe, und das Spaltmaß ist danach nicht mehr korrigierbar |

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
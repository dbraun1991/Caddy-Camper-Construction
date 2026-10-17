# Materialliste — VW Caddy Mk3 Camper Ausbau

Alle Maße in mm. Holz: **Birke-Multiplex**, verleimte Qualität (WISA oder gleichwertig).  
**Links/rechts** immer aus Sicht des Fahrers (Blick nach vorn): links = Fahrerseite, rechts = Beifahrerseite — gilt auch beim Blick durch die Heckklappe.  
Maße der Bauteile: gemeinsame Datenbasis [`modell/parameter.json`](modell/parameter.json) (3D-Viewer und Werkzeichnungen, [ADR 0015](docs/adrs/0015-shared-model-data-for-viewer-and-drawings.md)).

---

## Fahrzeugmaße (am eigenen Fahrzeug nachgemessen, 2026-10-17)

| Maß | Gemessen | Plan | Ergebnis |
|---|---|---|---|
| Breite zwischen den Radkästen | 1.130–1.140 mm | Korpus, A1–A3: 1.120 mm | passt, 10–20 mm Spiel — **bewusst nicht genutzt**, Korpus bleibt 1.120 mm |
| Heckklappenöffnung | fertige Box 1.120 × 900 × 338 mm passt durch | — | passt; Klappe öffnet nach oben |
| Ladekante / Stufe | keine, Ladeboden eben | — | passt |
| Ladetiefe Heckklappe (geschlossen, innen) → Rücksitze | 920–930 mm | Korpus 900 mm | 20–30 mm Luft |
| Ladeboden | eben, Reserverad unter dem Fahrzeug | — | passt |
| Oberkante umgeklappte Rücksitzlehnen | 310 mm | Unterkante A2: 320 mm | **10 mm Spalt** → Ausgleich unter A2 (§H4) |
| Länge Heck → Vordersitz-Kopfstützen (Schlafposition) | 2.000 mm | A1 + A2 + A3 = 2.000 mm | passt, kein Spiel |
| Zurrösen an den Rücksitzen | seitlich **neben** dem Korpus | — | Anbindung außen an B2 ([ADR 0016](docs/adrs/0016-rear-lashing-eyes-carry-the-hold-down.md)) |
| Zurrösen an der Heckklappe | evtl. unter dem Korpus | — | optional, für Kippen unwichtig |

Radkasten-Länge/-Höhe, Wandbreite oberhalb der Radkästen und Innenhöhe sind nicht gemessen; die Caddy-Hülle im Viewer verwendet dafür weiter Platzhalter.

---

## A — Liegefläche

Alle drei Bretter gleich stark (18 mm), bündig auf Plattformhöhe 320 mm.

| Pos | Bezeichnung | Maß (B × T × H) | Menge | Hinweis |
|---|---|---|---|---|
| A1 | Unterbau-Deckel | 1.120 × 900 × 18 | 1 | Fest, über Kofferraum-Korpus; durchgehend, Unterseite mit Falz/Nut für die Wände (§B) |
| A2 | Brett Sitzrücken | 1.120 × 700 × 18 | 1 | Liegt auf umgeklappten Rücksitzlehnen auf (Lehnen bei 310 mm → 10 mm Ausgleich, §H4) |
| A3 | Brett Kopfbereich | 1.120 × 400 × 18 | 1 | Wenig Last, mit 2 Gurtschlaufen an den Vordersitz-Kopfstützen (§H4) |

---

## B — Unterbau-Korpus (900 mm tief, 320 mm hoch, 1.120 mm breit)

Eckausbildung ([ADR 0018](docs/adrs/0018-continuous-bottom-and-lid-walls-in-grooves.md)): **Bodenplatte B4 und Deckel A1 laufen durch** (1.120 × 900 mm), alle Wände stehen dazwischen und stecken in Falz (Außenkanten) bzw. Nut (Trennwände) von B4 und A1 — **Nuttiefe t = 6–9 mm**, je nach Werkzeug (Zeichnungen mit 6 mm).

Nutzbare Innenhöhe: 320 mm − 18 mm (Bodenplatte) = **302 mm** (davon 32 mm Sitz/Tisch-Brett + 268 mm Schublade + 2 mm Spaltmaß oben); **Wandhöhe = 302 + 2 × t** (bei t = 6: 314 mm, bei t = 9: 320 mm).  
Nutzbare Innenbreite L/R: 1.120 mm − 2 × 18 mm (B2 Seitenwand) − 2 × 18 mm (B3 Trennwand) = 1.048 mm → **312 mm** je Sektion L/R + **424 mm** Mitte.

| Pos | Bezeichnung | Maß (B × T × H) | Menge | Hinweis |
|---|---|---|---|---|
| B1 | Rückwand | 1.084 × 18 × (302 + 2t) | 1 | Zur Rücksitz-Seite hin, zwischen den Seitenwänden; Falz hinten in B4/A1 |
| B2 | Seitenwand | 18 × 900 × (302 + 2t) | 2 | Links + rechts — erforderlich: trägt die äußeren Schienen, Korpus bleibt als Ganzes ausbaubar ([ADR 0014](docs/adrs/0014-self-contained-corpus-with-own-side-walls.md)) |
| B3 | Trennwand | 18 × 882 × (302 + 2t) | 2 | Zwischen den 3 Sektionen, bis zur Rückwand; Nut in B4/A1 |
| B4 | Bodenplatte | 1.120 × 900 × 18 | 1 | Durchgehend. Oberseite: Falz 18 × t links, rechts, hinten + 2 Nuten 18 × t für B3 |

Deckel **A1** (§A) erhält dieselben Falze/Nuten auf der Unterseite. Ohne Nuten (Rückfallvariante „stumpf“) sind alle Wände 302 mm hoch; B4 und A1 bleiben gleich — **B4 und A1 können daher schon zugeschnitten werden. Die Wände erst nach dem Fräsen: Nuttiefe t messen, dann auf 302 + 2t ablängen.**

**Nicht tiefer als ~9 mm (halbe Plattenstärke) und nie durchsägen:** Die Nuten laufen über die volle Tiefe — ein durchgesägter Falz nimmt B4/A1 den Rand (Platte faktisch nur noch 1.084 breit), eine durchgesägte Nut zerteilt die Platte.

---

## C — Sitz- und Tisch-Bretter (auf Vollauszug-Schienen)

Untere 10 % der Sektionshöhe (32 mm) bei L/R, obere 10 % bei Mitte.  
Alle drei fahren 850 mm auf Vollauszug-Schienen aus — **kein Klappen**, reine Zugbewegung.

| Pos | Bezeichnung | Maß (B × T × H) | Menge | Position im Korpus |
|---|---|---|---|---|
| C1 | Sitz-Brett Links | 272 × 850 × 32 | 1 | y 18–50 mm; 312 mm Innen − 38 mm Schienen − 2 mm Spalt |
| C2 | Sitz-Brett Rechts | 272 × 850 × 32 | 1 | y 18–50 mm; 312 mm Innen − 38 mm Schienen − 2 mm Spalt |
| C3 | Tisch-Brett Mitte | 384 × 850 × 32 | 1 | y 286–318 mm; 424 mm Innen − 38 mm Schienen − 2 mm Spalt |

> **Hinweis:** 32 mm Brettstärke = 18 mm Multiplex + 14 mm Auflageleiste, oder direkt aus 32 mm Leimholz.

---

## D — Schubladen (3 Stück)

Schubladen-Boxen aus 18 mm Korpus + 12 mm Boden.  
Innentiefe folgt der Schienen-Länge (850 mm Auszug → Kastentiefe 830 mm; dahinter 32 mm Luft bis zur Rückwand B1, [ADR 0017](docs/adrs/0017-850-mm-runners-in-900-mm-corpus.md)).

### D1 + D2 — Schublade Links & Rechts (je 1×)

y = 50–318 mm = 268 mm hoch; 312 mm Innen − 2 × 19 mm Schiene − 2 mm Spalt = **272 mm** Außenbreite.

| Bauteil | Maß (B × T × H) | Stärke | Menge |
|---|---|---|---|
| Boden | 272 × 830 | 12 mm | 2 |
| Seitenwand lang | 12 × 830 × 248 | 18 mm | 4 |
| Front + Rück | 272 × 18 × 248 | 18 mm | 4 |
| Frontblende (sichtbar) | 312 × 18 × 268 | 18 mm | 2 |

### D3 — Schublade Mitte (1×)

y = 18–286 mm = 268 mm hoch; 424 mm Innen − 2 × 19 mm Schiene − 2 mm Spalt = **384 mm** Außenbreite.

| Bauteil | Maß (B × T × H) | Stärke | Menge |
|---|---|---|---|
| Boden | 384 × 830 | 12 mm | 1 |
| Seitenwand lang | 12 × 830 × 248 | 18 mm | 2 |
| Front + Rück | 384 × 18 × 248 | 18 mm | 2 |
| Frontblende (sichtbar) | 424 × 18 × 268 | 18 mm | 1 |

---

## E — Vollauszug-Schienen (6 Paare gesamt)

> Auswahlbegründung: [ADR 0008](docs/adrs/0008-heavy-duty-full-extension-runners.md) (Schwerlast + Arretierung) · [ADR 0017](docs/adrs/0017-850-mm-runners-in-900-mm-corpus.md) (850 statt 900 mm: lichte Tiefe hinter B1 nur 882 mm)

**6 Paare** insgesamt: 3× für Schubladen + 3× für Sitz-/Tisch-Bretter.  
Mindestanforderung: **850 mm Auszug**, **Schwerlast**, mit Arretierung (Lock). 900-mm-Schienen passen nicht: hinter der Rückwand bleiben nur 882 mm lichte Tiefe.

| # | Element | Schiene | Paare |
|---|---|---|---|
| 1 | Schublade Links (D1) | Option 2 · 80 kg · 53 mm | 1 |
| 2 | Schublade Mitte (D3) | Option 2 · 80 kg · 53 mm | 1 |
| 3 | Schublade Rechts (D2) | Option 2 · 80 kg · 53 mm | 1 |
| 4 | Sitz-Brett Links (C1) | Option 1 · 170 kg · 76 mm | 1 |
| 5 | Sitz-Brett Rechts (C2) | Option 1 · 170 kg · 76 mm | 1 |
| 6 | Tisch-Brett Mitte (C3) | Option 2 · 80 kg · 53 mm | 1 |
| | **Gesamt** | 2 × Option 1 + 4 × Option 2 | **6 Paare (12 Einzelschienen)** |

Zuordnung und Maße stehen in [`modell/parameter.json`](modell/parameter.json) (`schienen.typen` / `schienen.zuordnung`).

### Optionen

> Alle Angaben: 1 Paar = 2 Stück (linke + rechte Schiene).

---

#### Option 1 — AOLISHENG 850 mm · 170 kg ⭐ Gewählt für die Sitz-Bretter C1/C2 (2 Paare) — dort sitzt eine Person
**170 kg Traglast** · 76 mm Höhe · mit Arretierung · 104,99 €/Paar (gesehen 2026-10-17) · Link/ASIN noch nachtragen  
⚠ **Stärke je Seite vor Bestellung prüfen** — die Elementbreiten rechnen mit 19 mm (wie die 900-mm-Variante).

```
Vollauszug 850 mm · Höhe 76 mm · Stärke 19 mm je Seite (zu prüfen) · Traglast 170 kg · Arretierung: Ja
Einbaumaß: Sektionsbreite − 2 × 19 mm − 2 mm Spalt = Elementbreite
Hinter der Schiene: 882 mm lichte Tiefe − 850 mm = 32 mm Luft
```

---

#### Option 2 — AOLISHENG 850 mm · 80 kg ⭐ Gewählt für Schubladen D1–D3 + Tisch-Brett C3 (4 Paare)
**80 kg Traglast** · 53 mm Höhe · mit Arretierung · 61,99 €/Paar (gesehen 2026-10-17) · Link/ASIN noch nachtragen  
⚠ **Stärke je Seite vor Bestellung prüfen** — geplant sind 19 mm; ist sie anders, ändern sich die Breiten von D1–D3 und C3.

```
Vollauszug 850 mm · Höhe 53 mm · Stärke 19 mm je Seite (zu prüfen) · Traglast 80 kg · Arretierung: Ja
Geeignet für: Gepäck in den Schubladen, Tisch — nicht zum Draufsetzen
```

Bisherige Wahl, **verworfen** (passt nicht in 882 mm lichte Tiefe): AOLISHENG 900 mm · 150 kg · 19 mm Stärke  
→ [Amazon.de — B086JQLXRJ](https://www.amazon.de/dp/B086JQLXRJ?ref=cm_sw_r_mwn_dp_F4691SK4DH72WBHHXHVK&ref_=cm_sw_r_mwn_dp_F4691SK4DH72WBHHXHVK&social_share=cm_sw_r_mwn_dp_F4691SK4DH72WBHHXHVK&th=1)

---

#### Früher erwogen — Schwerlast 95 kg · 53 mm hoch ✗ Verworfen (nur als 900 mm gefunden)
**95 kg Traglast** · 53 mm Höhe · mit Arretierung · war für die Sitz-/Tisch-Bretter vorgesehen  
→ [Amazon.de — B09XXDHW1C](https://www.amazon.de/dp/B09XXDHW1C/ref=sspa_dk_hqp_detail_aax_0?aref=gn8XpWgrVu&sp_csd=d2lkZ2V0TmFtZT1zcF9ocXBfc2hhcmVk&th=1)

```
Vollauszug 900 mm · Höhe 53 mm · Traglast 95 kg · Arretierung: Ja
Geeignet für: leichtere Elemente (Sitz- und Tisch-Bretter)
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

## F — Befestigungsmaterial

| Pos | Bezeichnung | Typ / Größe | Menge |
|---|---|---|---|
| F1 | Spanplattenschrauben (Korpus, Stirnkante) | Torx Senkkopf 4 × 45 mm | ~80 Stk. |
| F2 | Spanplattenschrauben (Schienen) | Torx Senkkopf 3,5 × 16 mm | ~120 Stk. |
| F3 | Stahlwinkel (Korpus 8× innen + Fahrzeug 4×: 2 außen an B2 hinten, 2 optional auf B4 vorne, → §H5) | 40 × 40 × 2 mm | 12 Stk. |
| F4 | Holzdübel (nur ohne Nut nötig, ADR 0018) | Ø 8 × 40 mm | ~30 Stk. |
| F5 | Holzleim D3 (wasserfest) | 750 ml | 1 Flasche |
| F6 | Schubladengriff | nach Wahl, mind. 64 mm Bohrung | 3 Stk. |
| F7 | Spanplattenschrauben (Schubladen-Ecken, Blenden, Winkel) | Torx Senkkopf 4 × 30/40 mm | je ~100 Stk. |
| F8 | Spanplattenschrauben (Schubladenböden) | Torx Senkkopf 3,5 × 30 mm | ~120 Stk. |
| F9 | Durchsteckschrauben Schienen-Vorderkante (→ §H1) | M5 × 40 mm + U-Scheibe + Stoppmutter | 24 Sätze |
| F10 | Schrauben Zurrösen-Anbindung (→ §H5) | M8 × 30/40 mm + U-Scheibe + Stoppmutter | 4 Sätze |
| F11 | Spanngurt (Ratsche) | ≥ 1,5 m, 2-teilig | 2 Stk. |
| F12 | Eckleiste Weichholz (Schubladen-Innenecken, → §H2) | 20 × 20 mm, Länge ~3,0 m gesamt | 12 Stk. à 240 mm |
| F13 | ~~Überlappungsleisten Liegefläche~~ — entfällt, ersetzt durch Scharniere F17 ([ADR 0019](docs/adrs/0019-hinged-sleeping-boards-fold-onto-the-corpus.md)) | — | — |
| F14 | Trägerwangen Sitz-/Tisch-Bretter (→ §H1 / ADR 0013) | 18 mm × Schienenhöhe × 850 mm | 6 Stk. ⚠ erst nach ADR 0013 |
| F15 | Gurtschlaufe A3 ↔ Kopfstütze, verstellbar (→ §H4) | Gurtband ~25 mm mit Klemmschnalle | 2 Stk. |
| F17 | Klappscharnier, Standard, aufschraubbar, ~60 mm (→ §H4) — 3 × A1↔A2 oben, 3 × A2↔A3 unten | Schrauben max. 15 mm (Platte 18 mm) | 6 Stk. |
| F16 | Ausgleich unter A2 (→ §H4) | Leiste 10 × 40 × 1.000 mm oder 10-mm-Gummistreifen | 2 Stk. |

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

> Entscheidungsprotokolle: [ADR 0007 Korpus](docs/adrs/0007-dowel-screw-bracket-joinery.md) · [ADR 0011 Schubladen](docs/adrs/0011-drawer-box-panel-shear-joinery.md) · [ADR 0012 Fahrzeugbefestigung](docs/adrs/0012-non-destructive-vehicle-tie-down.md) · [ADR 0013 Trägerwangen (offen)](docs/adrs/0013-rail-carrier-cheeks-for-seat-and-table-boards.md)

Abschnitte: Korpus (unten) · [H1 Schienen](#h1--schienenbefestigung-an-wänden-und-trennwänden) · [H2 Schubladenkästen](#h2--schubladenkästen-d1d3) · [H3 Frontblenden](#h3--frontblenden) · [H4 Liegefläche](#h4--liegefläche-stöße-a1--a2--a3) · [H5 Fahrzeug](#h5--befestigung-des-korpus-im-fahrzeug)

### Ausgangslage

Birke-Multiplex hält Schrauben in der Fläche sehr gut, aber schlecht in der Stirnkante (Hirnholz). Boden B4 und Deckel A1 laufen durch; die Wände (B1, B2 × 2, B3 × 2) stehen dazwischen — ohne weitere Maßnahme stünden sie nur mit ihrer Stirnkante auf B4 bzw. unter A1. Schrauben allein würden bei Fahrvibrationen über Zeit ausreißen; Leim allein macht den Korpus unlösbar und ist für einen Fahrzeugausbau unpraktisch.

### Empfohlene Verbindung: Boden/Deckel → Wände

> Entscheidungsprotokolle: [ADR 0007](docs/adrs/0007-dowel-screw-bracket-joinery.md) · [ADR 0018](docs/adrs/0018-continuous-bottom-and-lid-walls-in-grooves.md) (Nut/Falz)

| Reihenfolge | Mittel | Zweck |
|---|---|---|
| 1 | **Falz/Nut 18 × t (6–9 mm)** in B4 (oben) und A1 (unten), Wände stecken darin | Exakte Ausrichtung, Scherkräfte — ersetzt die Dübel |
| 2 | Schrauben 4 × 45 mm Senkkopf durch A1 von oben und durch B4 von unten in die Wandkanten, alle 120–150 mm | Zugfestigkeit senkrecht zur Fuge |
| 3 | Innenwinkel 40 × 40 mm an den 4 Ecken Deckel ↔ Seitenwand | Vibrationsreserve, optional |

Ohne Nut (Rückfallvariante „stumpf“): statt Schritt 1 Holzdübel Ø 8 × 40 mm alle ~200 mm (F4), Winkel dann nicht optional.

Nutbreite an der **tatsächlichen** Plattenstärke einstellen (Multiplex ist oft etwas dicker als 18 mm): erst eine Probenut im Reststück fräsen. Werkzeug: Oberfräse mit 18-mm-Nutfräser oder Kreissäge in mehreren Durchgängen — die meisten Zuschnittservices fräsen keine Nuten.

### Trennwände und Rückwand

Die Trennwände (B3) stecken in den Nuten von B4 und A1 und werden durch B4 (von unten), A1 (von oben) und die Rückwand B1 (von hinten) in ihre Stirnkanten verschraubt, Leim D3 in der Nut. *(Früher stand hier „von außen durch die Seitenwände“ — das geht nicht: B3 steht parallel zu B2 und berührt sie nicht.)* Die **Rückwand (B1) ist die Aussteifungsscheibe** gegen Verwindung: sie sitzt zwischen den Seitenwänden im hinteren Falz, vollflächig verleimen und mit mindestens 6 Schrauben durch die Seitenwände sichern.

### H1 — Schienenbefestigung an Wänden und Trennwänden

> Entscheidungsprotokoll: [docs/adrs/0011-drawer-box-panel-shear-joinery.md](docs/adrs/0011-drawer-box-panel-shear-joinery.md)

Die Außenmember der Schienen werden auf die **Flächen** von Seitenwänden (B2) und Trennwänden (B3) geschraubt — nie auf Kanten. 18 mm Multiplex hält Schrauben in der Fläche sehr gut.

| Punkt | Vorgabe | Grund |
|---|---|---|
| Schraubenlänge in B3 | max. **3,5 × 16 mm** | Trennwände tragen Schienen auf **beiden** Seiten; längere Schrauben durchstoßen die 18 mm Platte |
| Höhenversatz der Schienenbänder | aus `modell/modell.py`: Sektion L/R Sitz-Brett 18–94 (76 mm), Schublade ≈ 202–255 (53 mm); Mitte Schublade ≈ 78–131, Tisch 262–315 (je 53 mm) | Kein Überlapp → keine Schraubenkollision in der Trennwand |
| Vorderste 2 Bohrungen je Schiene | **M5 Durchsteckschraube** mit U-Scheibe + Stoppmutter statt Holzschraube | Am Korpusvorderkant ist das Kippmoment bei 850 mm Auszug maximal — hier reißen Holzschrauben zuerst aus |
| Verschrauben | von innen nach außen anreißen, Schienen **paarweise** auf gleiche Höhe lehren (Reststück Multiplex als Abstandslehre) | 1 mm Höhenversatz im Paar blockiert den Vollauszug |

⚠ Zuerst ADR 0013 entscheiden: die Sitz-/Tisch-Bretter (32 mm) sind niedriger als die Schienen-Innenmember (76 mm bei C1/C2, 53 mm bei C3) — siehe [docs/adrs/0013-rail-carrier-cheeks-for-seat-and-table-boards.md](docs/adrs/0013-rail-carrier-cheeks-for-seat-and-table-boards.md). Empfehlung: **Trägerwangen** 18 mm × Schienenhöhe × 850 mm, verleimt + verschraubt an beiden Längskanten; die Schiene greift dann in Faserfläche, nicht in Stirnkante.

### H2 — Schubladenkästen (D1–D3)

> Entscheidungsprotokoll: [docs/adrs/0011-drawer-box-panel-shear-joinery.md](docs/adrs/0011-drawer-box-panel-shear-joinery.md)

Tragendes Element ist **nicht** die Eckverbindung, sondern der **12 mm Boden** — analog zur Rückwand B1 beim Korpus.

| Reihenfolge | Mittel | Zweck |
|---|---|---|
| 1 | Leim D3 + 2 × Schrauben 4 × 40 mm je Ecke, durch Front-/Rückwand in die Stirnkante der Seitenwand | Montage und Ausrichtung (nicht der Lastpfad) |
| 2 | Boden 12 mm vollflächig verleimt, Schrauben 3,5 × 30 mm alle ~150 mm in alle vier Wandunterkanten | **Aussteifungsscheibe** gegen Verwindung |
| 3 | Eckleiste Weichholz 20 × 20 × 240 mm in alle 4 Innenecken, verleimt + verschraubt | Vibrationsreserve |

Nach dem Verschrauben des Bodens und **vor** dem Abbinden des Leims die Diagonalen messen — der Boden legt den Kasten rechtwinklig fest.

### H3 — Frontblenden

Die Frontblende ist kein tragendes Teil und wird **zuletzt** montiert, erst wenn der Kasten auf den Schienen läuft. **Art und Maße der Blenden (einliegend/aufliegend, Spaltmaße) werden erst am fertigen Korpus festgelegt** — Schienen anhalten, messen, dann entscheiden; die Blendenmaße in §D sind bis dahin vorläufig.

1. Blende mit 2 Schrauben provisorisch von innen fixieren
2. Spaltmaß zur Nachbarsektion mit Pappstreifen (1–2 mm) einstellen, Schublade mehrfach auf- und zufahren
3. Erst dann 4 × Schrauben 4 × 30 mm **von innen** durch die Kastenfront in die Blende

Von außen ist nie eine Schraube sichtbar. Griffe (F6) erst nach Fixierung der Blende bohren.

### H4 — Liegefläche: Stöße A1 / A2 / A3

Die drei Liegebretter sind mit **Klappscharnieren** verbunden ([ADR 0019](docs/adrs/0019-hinged-sleeping-boards-fold-onto-the-corpus.md)). Zum Fahren werden A2 und A3 auf die Box zurückgeklappt (Viewer: Fahrmodus 1/2), dann lassen sich die Rücksitze hochklappen:

| Stoß | Verbindung |
|---|---|
| A1 ↔ A2 | **3 Scharniere oben** (F17) — A2 kann nur nach oben über die Box klappen, nicht durchhängen. Geklappt liegt A2 umgedreht auf A1 (z 200–900, ~6 mm Abstand durch die Scharnierblätter) |
| A2 ↔ A3 | **3 Scharniere unten** (F17) — flach klappt A3 nur nach unten; liegt A2 umgedreht auf der Box, zeigt „unten“ nach oben und A3 legt sich auf A2 (z 200–600). Stapelhöhe 386 mm |
| A2 ↔ Rücksitzlehnen | Lehnen liegen bei **310 mm**, Unterkante A2 bei 320 mm (gemessen) → **10 mm Ausgleich** (F16): 2 Leisten 10 × 40 mm quer unter A2 auf Höhe der Lehnen, oder 10-mm-Gummistreifen; sonst federt A2 durch und die Überlappungsleisten tragen allein |
| A3 ↔ Kopfstützen | **2 verstellbare Gurtschlaufen** (F15), je Seite eine: jede Schlaufe läuft durch **2 Bohrungen in A3** und um die Kopfstützenstangen; die Zuglast tragen die Kopfstützen. Bohrungen und Schlaufenlänge werden beim Einbau am Fahrzeug festgelegt |
| alle Auflageflächen | Antirutschmatte / Gummistreifen (G3-Reststücke) | 

A3 trägt wenig Last (Kopfbereich) — hier ist Sicherung gegen Verrutschen wichtiger als Tragfähigkeit. Vor dem Klappen die Kopfstützen-Schlaufen lösen.

**Beim Fahren:** Der geklappte Stapel hängt nur an den Scharnieren bei z = 900 — mit einem Spanngurt (F11) am Korpus sichern, Matratze separat verstaut und gesichert. Kopfstützen dabei nicht verstellen oder blockieren (→ [Hinweise-Sommernutzung.md](./Hinweise-Sommernutzung.md)).

### H5 — Befestigung des Korpus im Fahrzeug

> Entscheidungsprotokolle: [ADR 0012](docs/adrs/0012-non-destructive-vehicle-tie-down.md) (keine Bohrungen) · [ADR 0016](docs/adrs/0016-rear-lashing-eyes-carry-the-hold-down.md) (Rücksitz-Ösen tragen die Niederhaltung)

**Keine neue Bohrung in Karosserie, Ladeboden oder Verkleidung.** Befestigung ausschließlich über die werkseitigen Zurrösen.

Maßgeblicher Lastfall ist **Sitzen im Bankmodus**: Eine Person auf dem 850 mm ausgefahrenen Brett hebelt den Korpus um seine Unterkante an der Heckklappe; das Ende an den Rücksitzen will hoch. Grob (mit 900 mm gerechnet, also leicht konservativ): 100 kg am Brettende → **ca. 700 N Niederhaltekraft** am hinteren Ende (≈ 350 N je Öse). Deshalb:

1. **Rücksitz-Ösen (wichtig):** liegen seitlich neben dem Korpus. Je Seite 1 Stahlwinkel (F3) **außen auf die Seitenwand B2**, hinteres Ende, in die Fläche geschraubt (4 × 30 mm), M8-Schraube mit U-Scheibe und Stoppmutter (F10) in die Öse. Winkelform/Biegung nach der tatsächlichen Ösenlage.
2. **Heckklappen-Ösen (optional):** falls unter dem Korpus, je 1 Winkel von innen auf B4 — nur gegen Verrutschen/Klappern; gegen Kippen bringen sie fast nichts, weil sie am Drehpunkt sitzen.
3. 2 × Spanngurt (F11) als redundanter Pfad — und als einzige Sicherung, solange die Winkel noch nicht sitzen.
4. Antirutschmatte (G3) unter den Korpus — gegen Klappern, **nicht** als Sicherung gerechnet.

Die Winkelpositionen lassen sich nicht aus der Zeichnung ableiten: sie werden im Fahrzeug von den tatsächlichen Ösenpositionen abgenommen.

### Montagereihenfolge

1. Falze und Nuten in B4 und A1 fräsen (Probenut zuerst), tatsächliche Nuttiefe t messen, Wände auf 302 + 2t ablängen
2. Seitenwände, Rückwand und Trennwände in B4 stecken, verleimen, von unten verschrauben
3. A1 aufsetzen (Wände greifen in Falz/Nut), von oben einschrauben; Innenwinkel optional
4. Schienen erst danach einmessen und montieren — der fertige Korpus gibt das verbindliche Innenmaß (→ H1)
5. Schubladenkästen bauen (→ H2), einhängen, Lauf prüfen
6. Frontblenden einstellen und von innen festschrauben (→ H3), danach Griffe bohren
7. Korpus ins Fahrzeug, Positionen der Rücksitz-Ösen außen an B2 anreißen (ggf. Heckklappen-Ösen auf B4), Winkel setzen (→ H5)
8. Liegebretter A2/A3 mit Überlappungsleisten anpassen (→ H4) — im Fahrzeug, bei umgeklappten Sitzen

### Was vermieden werden sollte

| Methode | Grund |
|---|---|
| Nur Schrauben in Stirnkante | Hält mittelfristig nicht unter Dauervibrationen |
| Nur Leim | Korpus nicht mehr lösbar; Multiplex arbeitet bei Temperaturwechseln im Auto |
| Lamellos / Domino | Aufwand unverhältnismäßig für ein Fahrzeugmodul |
| Schienen-Innenmember auf die 32 mm Brettkante schrauben | Nur die unterste Lochreihe greift, und das in Stirnkante — genau dort, wo eine Person sitzt (→ ADR 0013) |
| Schrauben > 16 mm in die Trennwände B3 | Schienen auf beiden Seiten → Durchstoß / Schraubenkollision |
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

Zusätzlich Leisten (Weichholz/Multiplex-Reste): ca. 3,0 m Eckleiste 20 × 20 mm (F12), Leisten F13 entfallen (Scharniere F17). Die Trägerwangen (F14) lassen sich aus dem 18-mm-Verschnitt schneiden.

→ Preise und Gesamtbudget: **[Einkaufsliste.md](./Einkaufsliste.md)**
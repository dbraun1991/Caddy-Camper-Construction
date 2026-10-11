# VW Caddy Mk3 — Camper Aufbau 3D Viewer

Interaktiver 3D-Viewer zur Planung des Camper-Ausbaus eines VW Caddy Mk3 (2010–2015).  
Gebaut mit [Three.js r128](https://threejs.org) — keine Installation, kein Build-Tool, direkt im Browser öffnen.

**Live-Demo: [dbraun1991.github.io/Caddy-Camper-Construction](https://dbraun1991.github.io/Caddy-Camper-Construction/)**

---

## Dateien

```
index.html                  — vollständiger 3D-Viewer (self-contained)
List_of_Materials.md        — Holzteile, Schienen, Befestigungsmaterial, Verbindungstechnik
Einkaufsliste.md            — Einkaufsliste, Preise und Gesamtbudget
Hinweise-Sommernutzung.md   — Rechtliches, Zuladung, Lüftung, Sicht-/Insektenschutz (Sommerbetrieb)
README.md
docs/adrs/                   — Architecture Decision Records
docs/pics/                   — Screenshots des Viewers
```

→ Vollständige Stückliste, Maßtabellen, Schienen-Optionen und **Verbindungstechnik**: **[List_of_Materials.md](./List_of_Materials.md)**

---

## Starten

```bash
# einfach im Browser öffnen
open index.html
```

Einzige Voraussetzung: Internetverbindung beim ersten Öffnen (Three.js wird per CDN geladen).

---

## Bedienung

| Aktion | Steuerung |
|---|---|
| Drehen | Linksklick + Ziehen |
| Zoomen | Scrollrad · Touch: Pinch (zwei Finger) |
| Drehen (Touch) | Ein Finger ziehen |
| Caddy-Hülle ein-/ausblenden | Button „Caddy-Hülle“ (transparente Fahrzeugkarosserie, Heck offen) |
| Rücksitze umgeklappt / ausgebaut | Button „Rücksitze“ |
| Ansicht zurücksetzen | Reset-Button (Standardansicht: von hinten rechts, Caddy-Hülle sichtbar) |

### Modi

Alle 6 beweglichen Elemente (3 Schubladen + 2 Sitz-Bretter + 1 Tisch-Brett) sind in jedem Modus als vollständige 3D-Körper sichtbar. Der Modus bestimmt ihre Position — eingeklappt (im Korpus) oder ausgefahren (in −z-Richtung vor dem Fahrzeugheck).

| Modus | Schubladen | Sitz-Bretter L/R + Tisch-Brett M |
|---|---|---|
| **Schlafmodus** | eingeklappt | eingeklappt |
| **Bankmodus** | eingeklappt | 900 mm ausgefahren |
| **Packmodus** | 900 mm ausgefahren | eingeklappt |

Die Führungsschienen-Innenmember (rot) sind immer Teil der 3D-Geometrie und fahren mit ihrem Element mit — im eingeklappten Zustand liegen sie verdeckt im Korpus, im ausgefahrenen Zustand werden sie sichtbar.

---

## Screenshots

| Schlafmodus | Bankmodus | Packmodus |
|---|---|---|
| [![Schlafmodus](docs/pics/schlafmodus.jpg)](docs/pics/schlafmodus.jpg) | [![Bankmodus](docs/pics/bankmodus.jpg)](docs/pics/bankmodus.jpg) | [![Packmodus](docs/pics/packmodus.jpg)](docs/pics/packmodus.jpg) |
| alles eingeklappt | Sitz-/Tisch-Bretter 900 mm ausgefahren | Schubladen 900 mm ausgefahren |

---

## Aufbau / Maße

Basis: VW Caddy Mk3 Kombi, Erstzulassung 05/2012, Laderaumbreite nutzbar **1.120 mm**.

### Unterbau (Kofferraum)

| Maß | Wert |
|---|---|
| Breite | 1.120 mm |
| Tiefe | 900 mm |
| Höhe | 320 mm (= Ladebodenhöhe → Plattform) |
| Wandstärke | 18 mm Birke-Multiplex |

### 3 Sektionen (Breite)

Nutzbare Innenhöhe: 320 mm − 18 mm Bodenplatte = **302 mm**.

Sektionsbreiten nach Abzug B2-Seitenwände (18 mm innen): **312 mm** L/R · **424 mm** Mitte.

| Sektion | Innenbreite | Element oben | Element unten |
|---|---|---|---|
| Links | 312 mm | Schublade 268 mm hoch · 272 mm breit | Sitz-Brett 32 mm hoch · 272 mm breit |
| Mitte | 424 mm | Tisch-Brett 32 mm hoch · 384 mm breit | Schublade 268 mm hoch · 384 mm breit |
| Rechts | 312 mm | Schublade 268 mm hoch · 272 mm breit | Sitz-Brett 32 mm hoch · 272 mm breit |

Breitenformel: Innenbreite − 2 × 19 mm Schiene − 2 mm Spalt = Elementbreite.  
Schienenstärke (AOLISHENG B086JQLXRJ): 19 mm je Seite. Im Render dunkelgrau dargestellt.

Alle Elemente fahren auf **Vollauszug-Schienen 900 mm Schwerlast** aus.

### Liegefläche (gesamt ~2.000 mm)

| Segment | Länge | Funktion |
|---|---|---|
| Unterbau-Deckel | 900 mm | Fest, über Kofferraum |
| Brett 1 | 700 mm | Auf umgeklappten Rücksitzlehnen |
| Brett 2 | 400 mm | Kopfbereich, an Vordersitz-Kopfstützen |

Matratzenbreite: **1.100 mm** (passt in 1.120 mm Innenbreite).

---

## Farblegende

| Farbe | Bedeutung |
|---|---|
| Dunkelbraun (transparent) | Holz / Korpus + Liegefläche (B1, B2, B3, B4, A1–A3 · Birke-Multiplex) |
| Türkis (transparent) | Sitz-Brett L/R (C1, C2) |
| Orange (transparent) | Tisch-Brett Mitte (C3) |
| Blau (transparent) | Schubladen × 3 |
| Rot (transparent) | Führungsschienen-Innenmember — fahren mit Element aus |
| Weiß (transparent) | Matratzenumriss |
| Hellblau-grau (60 % deckend) | Caddy-Hülle mit Türöffnungen (Platzhaltermaße, nicht nachgemessen) |
| Hellgrün (transparent) | Lade-Referenzebene im Kofferraum (y = 0) |
| Schiefergrau (transparent) | Rücksitzbank (umgeklappt oder ausgebaut) |

---

## Technologie

- [Three.js r128](https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js) via CDN
- Kein Framework, kein Build-Schritt
- Funktioniert in jedem modernen Browser (Chrome, Firefox, Safari, Edge)
- Touch-Steuerung für mobile Geräte unterstützt

### Render-Architektur

> Entscheidungsprotokolle: [ADR 0004](docs/adrs/0004-static-scene-graph-with-z-position-toggle.md) (Szenengraph), [ADR 0009](docs/adrs/0009-translucent-caddy-shell-overlay.md) (Caddy-Hülle)

Alle Elemente — Korpusbretter, Liegefläche, Schubladen, Sitz-/Tischbretter und Führungsschienen — leben permanent in der statischen Szenengruppe `sg`. Beim Moduswechsel wird nur die Z-Position der 6 Elemente plus ihrer jeweils zugehörigen Schienen-Innenmember verschoben.

```
sg    — Korpus (B1, B2, B3, B4), Liegefläche (A1–A3), Matratze,
        alle 6 Elemente + 12 Führungsschienen-Innenmember (immer sichtbar)
bankG — (leer, reserviert)
packG — (leer, reserviert)
caddyG — transparente Caddy-Hülle (Wände mit Türöffnungen, Dach, Radkästen, Vordersitze, Lade-Referenzebene, Rücksitzbank), per Button ausblendbar
```

Der Korpus besteht aus Einzelbrettern (keine Vollbox): B2 links/rechts, B1 Rückwand, B4 Boden, B3 × 2 Trennwände. Die Vorderseite ist offen.

---

## Weiterführende Planung

- [x] Verbindungstechnik Korpus — [List_of_Materials.md §H](./List_of_Materials.md#h--verbindungstechnik) · [ADR 0007](docs/adrs/0007-dowel-screw-bracket-joinery.md)
- [x] Schubladendetails (Kastenbau, Frontblende, Griffe) — [§H2/§H3](./List_of_Materials.md#h2--schubladenkästen-d1d3) · [ADR 0009](docs/adrs/0009-drawer-box-panel-shear-joinery.md)
- [x] Schienenbefestigung an Wänden und Trennwänden — [§H1](./List_of_Materials.md#h1--schienenbefestigung-an-wänden-und-trennwänden)
- [x] Befestigung Unterbau im Fahrzeug (L-Winkel, Zurrösen) — [§H5](./List_of_Materials.md#h5--befestigung-des-korpus-im-fahrzeug) · [ADR 0010](docs/adrs/0010-non-destructive-vehicle-tie-down.md)
- [x] Brett 2/3 Befestigung an Vordersitz-Kopfstützen — [§H4](./List_of_Materials.md#h4--liegefläche-stöße-a1--a2--a3)
- [x] Budget und Kaufreihenfolge — [Einkaufsliste.md](./Einkaufsliste.md)
- [x] Rechtliches (Rasten vs. Campen), Zuladung, Lüftung (CO₂ + Hitze), Sicht-/Insektenschutz für Sommerbetrieb — [Hinweise-Sommernutzung.md](./Hinweise-Sommernutzung.md)

Offen:

- [ ] **Entscheidung ADR 0011** — Schienenhöhe (53/76 mm) vs. Brettstärke (32 mm) bei C1–C3: [docs/adrs/0011-rail-carrier-cheeks-for-seat-and-table-boards.md](docs/adrs/0011-rail-carrier-cheeks-for-seat-and-table-boards.md). Blockiert den Kauf der Brett-Schienen.
- [ ] Abweichung Schubladenhöhe: `index.html` rechnet 260 mm, `List_of_Materials.md` §D nennt 268 mm
- [ ] Matratze (1.100 mm ist kein Handelsmaß — Varianten in [Einkaufsliste.md §4](./Einkaufsliste.md#4--ausbau--sonstiges))
- [ ] Zuladung im Zulassungsschein prüfen (Feld F.1 − Leergewicht) — siehe [Hinweise-Sommernutzung.md §2](./Hinweise-Sommernutzung.md#2--zulassung--stvzo-serienfahrzeug-bleibt-verkehrssicher)
- [ ] Belüftung / Feuchteschutz Unterbau — **nur für Nutzung außerhalb des Sommers relevant**, siehe [Hinweise-Sommernutzung.md](./Hinweise-Sommernutzung.md) (dort bewusst ausgeklammert)
- [ ] 12V-Anschluss / Beleuchtung

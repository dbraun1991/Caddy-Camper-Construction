# VW Caddy Mk3 — Camper Aufbau 3D Viewer

Interaktiver 3D-Viewer zur Planung des Camper-Ausbaus eines VW Caddy Mk3 (2010–2015).  
Gebaut mit [Three.js r128](https://threejs.org) — keine Installation, kein Build-Tool, direkt im Browser öffnen.

---

## Dateien

```
index.html            — vollständiger 3D-Viewer (self-contained)
List_of_Materials.md  — Holzteile, Schienen, Befestigungsmaterial, Produktlinks
README.md
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
| Zoomen | Scrollrad |
| Ansicht zurücksetzen | Reset-Button |

### Modi

Alle 6 beweglichen Elemente (3 Schubladen + 2 Sitz-Bretter + 1 Tisch-Brett) sind in jedem Modus als vollständige 3D-Körper sichtbar. Der Modus bestimmt ihre Position — eingeklappt (im Korpus) oder ausgefahren (in −z-Richtung vor dem Fahrzeugheck).

| Modus | Schubladen | Sitz-Bretter L/R + Tisch-Brett M |
|---|---|---|
| **Schlafmodus** | eingeklappt | eingeklappt |
| **Bankmodus** | eingeklappt | 900 mm ausgefahren |
| **Packmodus** | 900 mm ausgefahren | eingeklappt |

Im ausgefahrenen Zustand werden die Führungsschienen als Linien eingeblendet.

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

---

## Technologie

- [Three.js r128](https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js) via CDN
- Kein Framework, kein Build-Schritt
- Funktioniert in jedem modernen Browser (Chrome, Firefox, Safari, Edge)
- Touch-Steuerung für mobile Geräte unterstützt

### Render-Architektur

Alle Elemente — Korpusbretter, Liegefläche, Schubladen, Sitz-/Tischbretter und Führungsschienen — leben permanent in der statischen Szenengruppe `sg`. Beim Moduswechsel wird nur die Z-Position der 6 Elemente plus ihrer jeweils zugehörigen Schienen-Innenmember verschoben.

```
sg    — Korpus (B1, B2, B3, B4), Liegefläche (A1–A3), Matratze,
        alle 6 Elemente + 12 Führungsschienen-Innenmember (immer sichtbar)
bankG — (leer, reserviert)
packG — (leer, reserviert)
```

Der Korpus besteht aus Einzelbrettern (keine Vollbox): B2 links/rechts, B1 Rückwand, B4 Boden, B3 × 2 Trennwände. Die Vorderseite ist offen.

---

## Weiterführende Planung

Offene Punkte für den realen Ausbau:

- [ ] Schubladendetails (Führungsschienen, Frontblende, Griffe)
- [ ] Befestigung Unterbau im Fahrzeug (L-Winkel, Zurrösen)
- [ ] Brett 2 Befestigung an Vordersitz-Kopfstützen
- [ ] Matratze (z.B. 1.100 × 2.000 × 80 mm Kaltschaum)
- [ ] Belüftung / Feuchteschutz Unterbau
- [ ] 12V-Anschluss / Beleuchtung

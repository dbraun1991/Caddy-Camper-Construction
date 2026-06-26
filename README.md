# VW Caddy Mk3 — Camper Aufbau 3D Viewer

Interaktiver 3D-Viewer zur Planung des Camper-Ausbaus eines VW Caddy Mk3 (2010–2015).  
Gebaut mit [Three.js r128](https://threejs.org) — keine Installation, kein Build-Tool, direkt im Browser öffnen.

---

## Dateien

```
index.html        — vollständiger 3D-Viewer (self-contained)
Materialliste.md  — Holzteile, Schienen, Befestigungsmaterial, Produktlinks
README.md
```

→ Vollständige Stückliste, Maßtabellen und Schienen-Optionen: **[Materialliste.md](./Materialliste.md)**

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

| Modus | Beschreibung |
|---|---|
| **Schlafmodus** | Alles eingeklappt, Liegefläche auf Oberkante |
| **Bankmodus** | Sitz-Bretter L/R + Tisch-Brett Mitte 900 mm ausgefahren |
| **Packmodus** | Alle 3 Schubladen 900 mm ausgefahren |

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

| Sektion | Breite | Inhalt oben (90%) | Inhalt unten (10%) |
|---|---|---|---|
| Links | 330 mm | Schublade 288 mm | Sitz-Brett 32 mm |
| Mitte | 424 mm | Tisch-Brett 32 mm | Schublade 288 mm |
| Rechts | 330 mm | Schublade 288 mm | Sitz-Brett 32 mm |

Alle Elemente (Bretter + Schubladen) fahren auf **Vollauszug-Schienen 900 mm Schwerlast** aus.

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
| Hellbraun | Holz / Liegefläche (Birke-Multiplex) |
| Türkis | Sitz-Brett L/R |
| Orange | Tisch-Brett Mitte |
| Blau | Schubladen |

---

## Technologie

- [Three.js r128](https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js) via CDN
- Kein Framework, kein Build-Schritt
- Funktioniert in jedem modernen Browser (Chrome, Firefox, Safari, Edge)
- Touch-Steuerung für mobile Geräte unterstützt

---

## Weiterführende Planung

Offene Punkte für den realen Ausbau:

- [ ] Schubladendetails (Führungsschienen, Frontblende, Griffe)
- [ ] Befestigung Unterbau im Fahrzeug (L-Winkel, Zurrösen)
- [ ] Brett 2 Befestigung an Vordersitz-Kopfstützen
- [ ] Matratze (z.B. 1.100 × 2.000 × 80 mm Kaltschaum)
- [ ] Belüftung / Feuchteschutz Unterbau
- [ ] 12V-Anschluss / Beleuchtung
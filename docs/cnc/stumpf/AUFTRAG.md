# CNC-Auftrag — VW Caddy Mk3 Camper, Box + Liegefläche (stumpf)

Erzeugt am 2026-11-07 von `modell/cnc.py` aus `modell/parameter.json` — nicht von Hand ändern,
sondern Parameter anpassen und neu erzeugen. Entscheidung und Hintergrund: ADR 0023.

## Teile

Material: **Birke-Multiplex 18 mm**, 9 Teile in 6 unterschiedlichen Formen.

| Datei | Kürzel | Langname | Stk. | Außenmaß (mm) |
|---|---|---|---|---|
| `b1-t1.dxf` | B1 / T1 | Bodenplatte / Deckplatte | 2 | 1120 × 900 |
| `s1-s2.dxf` | S1 / S2 | Seitenwand links / rechts | 2 | 900 × 302 |
| `m1-m2.dxf` | M1 / M2 | Trennwand links / rechts | 2 | 882 × 302 |
| `r1.dxf` | R1 | Rückwand | 1 | 1084 × 302 |
| `f1.dxf` | F1 | Klappbrett Rücksitz | 1 | 1120 × 700 |
| `f2.dxf` | F2 | Klappbrett Kopfende | 1 | 1120 × 400 |

`alle-teile.dxf` enthält jedes Teil in Auftragsstückzahl nebeneinander, mit 20 mm Abstand — nur zur
Übersicht, **kein Nesting**. Die Verteilung auf die Platten macht der Dienstleister.

## Dateien

- DXF (AutoCAD 2013, `AC1027`), Maßstab 1:1, Einheit **mm**, Ursprung links unten am Teil.
- Layer `AUSSENKONTUR` (rot): Außenkontur, durchfräsen, Fräser außen an der Linie.
- Layer `INNENKONTUR` (blau): geschlossene Schlitze, durchfräsen, Fräser innen an der Linie.
- Alle Konturen geschlossen. Nur Linien und Kreisbögen, keine Beschriftung, keine Bohrungen,
  keine Taschen — alles ist ein 2D-Durchschnitt.

## Eckausbildung „stumpf“

Rückfallvariante ohne Zapfen: alle Bretter sind reine Rechtecke, die Wände stehen stumpf zwischen
Boden- und Deckplatte. Dafür braucht es eigentlich keine CNC — ein Plattenzuschnitt genügt.

## Annahmen (vor dem Auftrag mit dem Dienstleister klären)

1. **Fräserdurchmesser 6 mm.** Bestimmt die Dogbones. Fräst der Dienstleister mit
   einem anderen Durchmesser, `cnc.fraeser_durchmesser` ändern und neu erzeugen — oder `cnc.innenecken: "keine"`,
   wenn er die Freischnitte selbst setzt.
2. **Passungsluft 0,2 mm** bei Plattenstärke 18 mm. „18 mm“-Multiplex ist real
   oft 17,6–18,3 mm. Ist die Platte dicker als 18,0, die Luft um die Differenz erhöhen. Ein Probestück
   (ein Schlitz + ein Zapfen) vor dem ganzen Auftrag ist sinnvoll.
3. **Haltestege** (Tabs) und Fräsreihenfolge legt der Dienstleister fest; danach nur Stegreste verschleifen.
4. **Faserrichtung egal**: Die Teile dürfen beim Nesting beliebig gedreht werden. Wenden (Rückseite nach oben) ist ebenfalls erlaubt: Jedes Teil ist spiegelsymmetrisch (B1 / T1 links/rechts + oben/unten, S1 / S2 links/rechts + oben/unten, M1 / M2 links/rechts + oben/unten, R1 links/rechts + oben/unten, F1 links/rechts + oben/unten, F2 links/rechts + oben/unten), gewendet entsteht dasselbe Teil.
5. **Keine Bohrungen**: Scharniere (V17), Gurtschlaufen (F2) und Schrauben werden beim Zusammenbau
   angerissen und gebohrt.
6. **Nicht enthalten**: Schubladen, Sitz- und Tischbretter (C1–C3, D1–D3) — deren Maße werden erst am fertigen
   Korpus festgelegt (zweiter Auftrag).
7. **Kanten**: keine Fase, kein Radius an den Außenkanten.

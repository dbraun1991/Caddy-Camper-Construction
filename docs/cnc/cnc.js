// Generiert von modell/cnc.py — nicht von Hand ändern (ADR 0023)
window.CNC = {
 "stand": "2026-11-12",
 "varianten": {
  "gezapft": {
   "teile": [
    {
     "datei": "docs/cnc/gezapft/b1-t1.dxf",
     "vorschau": "docs/cnc/gezapft/vorschau/b1-t1.svg",
     "kuerzel": "B1 / T1",
     "name": "Bodenplatte (Bottom_1) und Deckplatte (Top_1)",
     "stk": 2,
     "mass": "1120 × 900",
     "schlitze": 6,
     "fenster": 0,
     "material": "Birke-Multiplex 18 mm"
    },
    {
     "datei": "docs/cnc/gezapft/s1-s2.dxf",
     "vorschau": "docs/cnc/gezapft/vorschau/s1-s2.svg",
     "kuerzel": "S1 / S2",
     "name": "Seitenwände links (Side_1) und rechts (Side_2)",
     "stk": 2,
     "mass": "900 × 340",
     "schlitze": 0,
     "fenster": 0,
     "material": "Birke-Multiplex 18 mm"
    },
    {
     "datei": "docs/cnc/gezapft/m1-m2.dxf",
     "vorschau": "docs/cnc/gezapft/vorschau/m1-m2.svg",
     "kuerzel": "M1 / M2",
     "name": "Trennwand links (Mid_1) / rechts (Mid_2)",
     "stk": 2,
     "mass": "900 × 340",
     "schlitze": 0,
     "fenster": 0,
     "material": "Birke-Multiplex 18 mm"
    },
    {
     "datei": "docs/cnc/gezapft/r1.dxf",
     "vorschau": "docs/cnc/gezapft/vorschau/r1.svg",
     "kuerzel": "R1",
     "name": "Rückwand (Rear_1)",
     "stk": 1,
     "mass": "1084 × 340",
     "schlitze": 2,
     "fenster": 0,
     "material": "Birke-Multiplex 18 mm"
    },
    {
     "datei": "docs/cnc/gezapft/f1.dxf",
     "vorschau": "docs/cnc/gezapft/vorschau/f1.svg",
     "kuerzel": "F1",
     "name": "Klappbrett Rücksitz (Fold_1)",
     "stk": 1,
     "mass": "1120 × 700",
     "schlitze": 0,
     "fenster": 0,
     "material": "Birke-Multiplex 18 mm"
    },
    {
     "datei": "docs/cnc/gezapft/f2.dxf",
     "vorschau": "docs/cnc/gezapft/vorschau/f2.svg",
     "kuerzel": "F2",
     "name": "Klappbrett Kopfende (Fold_2)",
     "stk": 1,
     "mass": "1120 × 400",
     "schlitze": 0,
     "fenster": 0,
     "material": "Birke-Multiplex 18 mm"
    }
   ],
   "alle_dxf": "docs/cnc/gezapft/alle-teile.dxf",
   "alle_vorschau": "docs/cnc/gezapft/vorschau/alle-teile.svg",
   "auftrag": "docs/cnc/gezapft/AUFTRAG.md",
   "abschnitte": [
    {
     "titel": "Teile",
     "art": "absatz",
     "texte": [
      "Material: **Birke-Multiplex 18 mm**, 9 Teile in 6 unterschiedlichen Formen."
     ]
    },
    {
     "titel": "Dateien",
     "art": "liste",
     "texte": [
      "DXF (AutoCAD 2013, `AC1027`), Maßstab 1:1, Einheit **mm**, Ursprung links unten am Teil.",
      "Layer `AUSSENKONTUR` (rot): Außenkontur, durchfräsen, Fräser außen an der Linie.",
      "Layer `INNENKONTUR` (blau): geschlossene Schlitze, durchfräsen, Fräser innen an der Linie.",
      "Alle Konturen geschlossen. Nur Linien und Kreisbögen, keine Beschriftung, keine Bohrungen, keine Taschen — alles ist ein 2D-Durchschnitt.",
      "`alle-teile.dxf` enthält jedes Teil in Auftragsstückzahl nebeneinander, mit 20 mm Abstand — nur zur Übersicht, **kein Nesting**. Die Verteilung auf die Platten macht der Dienstleister."
     ]
    },
    {
     "titel": "Passung Zapfen ↔ Schlitz",
     "art": "liste",
     "texte": [
      "Die Wände (S1/S2, M1/M2, R1) tragen Zapfen 50 × 18 mm, B1/T1 und R1 die passenden Schlitze und Aussparungen — alles ganz durch die Platte.",
      "Schlitze und Aussparungen sind je Richtung **0,2 mm größer** als der Zapfen (Zapfen bleiben auf Nennmaß).",
      "Zapfen sind **19 mm lang** (18 mm Plattenstärke + 1 mm Schleifzugabe): Sie stehen nach dem Zusammenbau 1 mm über und werden bündig geschliffen. Gewollt, nicht korrigieren.",
      "Jede Innenecke hat einen **Dogbone**: Freischnitt Ø 6 mm über die Ecke hinaus, Kreis durch den Eckpunkt. Ohne ihn bliebe in jeder Ecke ein Radius stehen, und die eckigen Zapfen passten nicht in Schlitze und Aussparungen."
     ]
    },
    {
     "titel": "Annahmen (vor dem Auftrag mit dem Dienstleister klären)",
     "art": "nummeriert",
     "texte": [
      "**Fräserdurchmesser 6 mm.** Bestimmt die Dogbones. Fräst der Dienstleister mit einem anderen Durchmesser, `cnc.fraeser_durchmesser` ändern und neu erzeugen — oder `cnc.innenecken: \"keine\"`, wenn er die Freischnitte selbst setzt.",
      "**Passungsluft 0,2 mm** bei Plattenstärke 18 mm. „18 mm“-Multiplex ist real oft 17,6–18,3 mm. Ist die Platte dicker als 18,0, die Luft um die Differenz erhöhen. Ein Probestück (ein Schlitz + ein Zapfen) vor dem ganzen Auftrag ist sinnvoll.",
      "**Haltestege** (Tabs) und Fräsreihenfolge legt der Dienstleister fest; danach nur Stegreste verschleifen.",
      "**Faserrichtung egal**: Die Teile dürfen beim Nesting beliebig gedreht werden. Wenden (Rückseite nach oben) ist ebenfalls erlaubt: Jedes Teil ist spiegelsymmetrisch (B1 / T1 links/rechts, S1 / S2 links/rechts + oben/unten, M1 / M2 oben/unten, R1 links/rechts + oben/unten, F1 links/rechts + oben/unten, F2 links/rechts + oben/unten), gewendet entsteht dasselbe Teil.",
      "**Keine Bohrungen**: Scharniere (V17), Gurtschlaufen (F2) und Schrauben werden beim Zusammenbau angerissen und gebohrt.",
      "**Nicht enthalten**: Sitz- und Tischbretter (C1–C3) — deren Aufbau hängt an ADR 0013. Die Schubladenkästen D1–D3 sind ein eigener Auftrag (`docs/cnc/schubladen/`, ADR 0024).",
      "**Kanten**: keine Fase, kein Radius an den Außenkanten."
     ]
    }
   ]
  },
  "stumpf": {
   "teile": [
    {
     "datei": "docs/cnc/stumpf/b1-t1.dxf",
     "vorschau": "docs/cnc/stumpf/vorschau/b1-t1.svg",
     "kuerzel": "B1 / T1",
     "name": "Bodenplatte (Bottom_1) und Deckplatte (Top_1)",
     "stk": 2,
     "mass": "1120 × 900",
     "schlitze": 0,
     "fenster": 0,
     "material": "Birke-Multiplex 18 mm"
    },
    {
     "datei": "docs/cnc/stumpf/s1-s2.dxf",
     "vorschau": "docs/cnc/stumpf/vorschau/s1-s2.svg",
     "kuerzel": "S1 / S2",
     "name": "Seitenwände links (Side_1) und rechts (Side_2)",
     "stk": 2,
     "mass": "900 × 302",
     "schlitze": 0,
     "fenster": 0,
     "material": "Birke-Multiplex 18 mm"
    },
    {
     "datei": "docs/cnc/stumpf/m1-m2.dxf",
     "vorschau": "docs/cnc/stumpf/vorschau/m1-m2.svg",
     "kuerzel": "M1 / M2",
     "name": "Trennwand links (Mid_1) / rechts (Mid_2)",
     "stk": 2,
     "mass": "882 × 302",
     "schlitze": 0,
     "fenster": 0,
     "material": "Birke-Multiplex 18 mm"
    },
    {
     "datei": "docs/cnc/stumpf/r1.dxf",
     "vorschau": "docs/cnc/stumpf/vorschau/r1.svg",
     "kuerzel": "R1",
     "name": "Rückwand (Rear_1)",
     "stk": 1,
     "mass": "1084 × 302",
     "schlitze": 0,
     "fenster": 0,
     "material": "Birke-Multiplex 18 mm"
    },
    {
     "datei": "docs/cnc/stumpf/f1.dxf",
     "vorschau": "docs/cnc/stumpf/vorschau/f1.svg",
     "kuerzel": "F1",
     "name": "Klappbrett Rücksitz (Fold_1)",
     "stk": 1,
     "mass": "1120 × 700",
     "schlitze": 0,
     "fenster": 0,
     "material": "Birke-Multiplex 18 mm"
    },
    {
     "datei": "docs/cnc/stumpf/f2.dxf",
     "vorschau": "docs/cnc/stumpf/vorschau/f2.svg",
     "kuerzel": "F2",
     "name": "Klappbrett Kopfende (Fold_2)",
     "stk": 1,
     "mass": "1120 × 400",
     "schlitze": 0,
     "fenster": 0,
     "material": "Birke-Multiplex 18 mm"
    }
   ],
   "alle_dxf": "docs/cnc/stumpf/alle-teile.dxf",
   "alle_vorschau": "docs/cnc/stumpf/vorschau/alle-teile.svg",
   "auftrag": "docs/cnc/stumpf/AUFTRAG.md",
   "abschnitte": [
    {
     "titel": "Teile",
     "art": "absatz",
     "texte": [
      "Material: **Birke-Multiplex 18 mm**, 9 Teile in 6 unterschiedlichen Formen."
     ]
    },
    {
     "titel": "Dateien",
     "art": "liste",
     "texte": [
      "DXF (AutoCAD 2013, `AC1027`), Maßstab 1:1, Einheit **mm**, Ursprung links unten am Teil.",
      "Layer `AUSSENKONTUR` (rot): Außenkontur, durchfräsen, Fräser außen an der Linie.",
      "Layer `INNENKONTUR` (blau): geschlossene Schlitze, durchfräsen, Fräser innen an der Linie.",
      "Alle Konturen geschlossen. Nur Linien und Kreisbögen, keine Beschriftung, keine Bohrungen, keine Taschen — alles ist ein 2D-Durchschnitt.",
      "`alle-teile.dxf` enthält jedes Teil in Auftragsstückzahl nebeneinander, mit 20 mm Abstand — nur zur Übersicht, **kein Nesting**. Die Verteilung auf die Platten macht der Dienstleister."
     ]
    },
    {
     "titel": "Eckausbildung „stumpf“",
     "art": "absatz",
     "texte": [
      "Rückfallvariante ohne Zapfen: alle Bretter sind reine Rechtecke, die Wände stehen stumpf zwischen Boden- und Deckplatte. Dafür braucht es eigentlich keine CNC — ein Plattenzuschnitt genügt."
     ]
    },
    {
     "titel": "Annahmen (vor dem Auftrag mit dem Dienstleister klären)",
     "art": "nummeriert",
     "texte": [
      "**Fräserdurchmesser 6 mm.** Bestimmt die Dogbones. Fräst der Dienstleister mit einem anderen Durchmesser, `cnc.fraeser_durchmesser` ändern und neu erzeugen — oder `cnc.innenecken: \"keine\"`, wenn er die Freischnitte selbst setzt.",
      "**Passungsluft 0,2 mm** bei Plattenstärke 18 mm. „18 mm“-Multiplex ist real oft 17,6–18,3 mm. Ist die Platte dicker als 18,0, die Luft um die Differenz erhöhen. Ein Probestück (ein Schlitz + ein Zapfen) vor dem ganzen Auftrag ist sinnvoll.",
      "**Haltestege** (Tabs) und Fräsreihenfolge legt der Dienstleister fest; danach nur Stegreste verschleifen.",
      "**Faserrichtung egal**: Die Teile dürfen beim Nesting beliebig gedreht werden. Wenden (Rückseite nach oben) ist ebenfalls erlaubt: Jedes Teil ist spiegelsymmetrisch (B1 / T1 links/rechts + oben/unten, S1 / S2 links/rechts + oben/unten, M1 / M2 links/rechts + oben/unten, R1 links/rechts + oben/unten, F1 links/rechts + oben/unten, F2 links/rechts + oben/unten), gewendet entsteht dasselbe Teil.",
      "**Keine Bohrungen**: Scharniere (V17), Gurtschlaufen (F2) und Schrauben werden beim Zusammenbau angerissen und gebohrt.",
      "**Nicht enthalten**: Sitz- und Tischbretter (C1–C3) — deren Aufbau hängt an ADR 0013. Die Schubladenkästen D1–D3 sind ein eigener Auftrag (`docs/cnc/schubladen/`, ADR 0024).",
      "**Kanten**: keine Fase, kein Radius an den Außenkanten."
     ]
    }
   ]
  },
  "schubladen": {
   "teile": [
    {
     "datei": "docs/cnc/schubladen/d1-s-d2-s.dxf",
     "vorschau": "docs/cnc/schubladen/vorschau/d1-s-d2-s.svg",
     "kuerzel": "D1-S / D2-S",
     "name": "Schublade links / rechts, Seitenwand",
     "stk": 4,
     "mass": "832 × 260",
     "schlitze": 5,
     "fenster": 4,
     "material": "Birke-Multiplex 18 mm"
    },
    {
     "datei": "docs/cnc/schubladen/d1-e-d2-e.dxf",
     "vorschau": "docs/cnc/schubladen/vorschau/d1-e-d2-e.svg",
     "kuerzel": "D1-E / D2-E",
     "name": "Schublade links / rechts, Kastenfront und -rückwand",
     "stk": 4,
     "mass": "274 × 260",
     "schlitze": 2,
     "fenster": 0,
     "material": "Birke-Multiplex 18 mm"
    },
    {
     "datei": "docs/cnc/schubladen/d1-b-d2-b.dxf",
     "vorschau": "docs/cnc/schubladen/vorschau/d1-b-d2-b.svg",
     "kuerzel": "D1-B / D2-B",
     "name": "Schublade links / rechts, Boden",
     "stk": 2,
     "mass": "274 × 832",
     "schlitze": 0,
     "fenster": 0,
     "material": "Birke-Multiplex 12 mm"
    },
    {
     "datei": "docs/cnc/schubladen/d3-s.dxf",
     "vorschau": "docs/cnc/schubladen/vorschau/d3-s.svg",
     "kuerzel": "D3-S",
     "name": "Schublade Mitte, Seitenwand",
     "stk": 2,
     "mass": "832 × 260",
     "schlitze": 5,
     "fenster": 4,
     "material": "Birke-Multiplex 18 mm"
    },
    {
     "datei": "docs/cnc/schubladen/d3-e.dxf",
     "vorschau": "docs/cnc/schubladen/vorschau/d3-e.svg",
     "kuerzel": "D3-E",
     "name": "Schublade Mitte, Kastenfront und -rückwand",
     "stk": 2,
     "mass": "386 × 260",
     "schlitze": 2,
     "fenster": 0,
     "material": "Birke-Multiplex 18 mm"
    },
    {
     "datei": "docs/cnc/schubladen/d3-b.dxf",
     "vorschau": "docs/cnc/schubladen/vorschau/d3-b.svg",
     "kuerzel": "D3-B",
     "name": "Schublade Mitte, Boden",
     "stk": 1,
     "mass": "386 × 832",
     "schlitze": 0,
     "fenster": 0,
     "material": "Birke-Multiplex 12 mm"
    }
   ],
   "alle_dxf": "docs/cnc/schubladen/alle-teile.dxf",
   "alle_vorschau": "docs/cnc/schubladen/vorschau/alle-teile.svg",
   "auftrag": "docs/cnc/schubladen/AUFTRAG.md",
   "abschnitte": [
    {
     "titel": "Teile",
     "art": "absatz",
     "texte": [
      "Material: **Birke-Multiplex 18 mm** (Wände) und **12 mm** (Böden), 15 Teile in 6 unterschiedlichen Formen — die Wände und Böden der drei Schubladenkästen (Außenmaß B × T × H: D1 272 × 830 × 260, D2 272 × 830 × 260, D3 384 × 830 × 260 mm).",
      "Gewicht aller Kästen ohne Blenden ca. **22,2 kg** (ohne Fenster in den Seitenwänden wären es 26,4 kg, Dichte 680 kg/m³ angenommen)."
     ]
    },
    {
     "titel": "Dateien",
     "art": "liste",
     "texte": [
      "DXF (AutoCAD 2013, `AC1027`), Maßstab 1:1, Einheit **mm**, Ursprung links unten am Teil.",
      "Layer `AUSSENKONTUR` (rot): Außenkontur, durchfräsen, Fräser außen an der Linie.",
      "Layer `INNENKONTUR` (blau): geschlossene Schlitze und die Fenster der Seitenwände, durchfräsen, Fräser innen an der Linie.",
      "Alle Konturen geschlossen. Nur Linien und Kreisbögen, keine Beschriftung, keine Bohrungen, keine Taschen — alles ist ein 2D-Durchschnitt.",
      "`alle-teile.dxf` enthält jedes Teil in Auftragsstückzahl nebeneinander, mit 20 mm Abstand — nur zur Übersicht, **kein Nesting**. Die Verteilung auf die Platten macht der Dienstleister."
     ]
    },
    {
     "titel": "Verbindungen",
     "art": "liste",
     "texte": [
      "**Ecken: Fingerzinken**, 7 Felder über die Kastenhöhe. Die Seitenwände (`-S`) haben oben und unten einen Zinken, Kastenfront und -rückwand (`-E`) die Lücken dazwischen.",
      "**Boden** (`-B`, 12 mm): Zapfen 50 mm breit, je 5 an den langen und 2 an den kurzen Kanten, durch Schlitze 50 × 12 mm in allen vier Wänden, 10 mm über der Wandunterkante.",
      "Lücken und Schlitze sind je Richtung **0,2 mm größer** als Zinken und Zapfen (die bleiben auf Nennmaß).",
      "Zinken und Bodenzapfen sind **19 mm lang** (18 mm Wandstärke + 1 mm Schleifzugabe): Sie stehen nach dem Verleimen 1 mm über und werden bündig geschliffen, bevor die Schienen angeschraubt werden. Gewollt, nicht korrigieren.",
      "Jede Innenecke hat einen **Dogbone**: Freischnitt Ø 6 mm über die Ecke hinaus, Kreis durch den Eckpunkt. Ohne ihn bliebe in jeder Ecke ein Radius stehen, und die eckigen Zapfen passten nicht in Schlitze und Aussparungen.",
      "**Fenster** in den Seitenwänden: Ecken mit Radius 20 mm, ohne Dogbone. Das Band der Schubladenschiene (± 15 mm) bleibt voll stehen — dort wird die Schiene angeschraubt."
     ]
    },
    {
     "titel": "Annahmen (vor dem Auftrag klären)",
     "art": "nummeriert",
     "texte": [
      "**Kastenbreite** = Sektionsbreite − 2 × Schienenstärke − 2 mm Spiel. Die Stärke der gelieferten 80-kg-Schiene ist **gemessen** (19 mm je Seite, 2026-11-12). Die Lage der Schraublöcher steht noch aus — die Fenster lassen das Schienenband ± 15 mm frei, das sollte reichen; vor der Bestellung trotzdem gegen die Lochreihe prüfen.",
      "**Fräserdurchmesser 6 mm** und **Passungsluft 0,2 mm** wie beim Korpus-Auftrag. Gilt auch für die 12-mm-Böden: „12 mm“-Multiplex ist real oft etwas dünner oder dicker — die Schlitzhöhe an der gelieferten Platte prüfen.",
      "**Haltestege** (Tabs) und Fräsreihenfolge legt der Dienstleister fest; danach nur Stegreste verschleifen.",
      "**Faserrichtung egal**: Die Teile dürfen beim Nesting beliebig gedreht werden. Wenden (Rückseite nach oben) ist ebenfalls erlaubt: Jedes Teil ist spiegelsymmetrisch (D1-S / D2-S links/rechts, D1-E / D2-E links/rechts, D1-B / D2-B links/rechts + oben/unten, D3-S links/rechts, D3-E links/rechts, D3-B links/rechts + oben/unten), gewendet entsteht dasselbe Teil.",
      "**Keine Bohrungen**: Schienen, Frontblende und Griffe werden beim Zusammenbau angerissen und gebohrt.",
      "**Nicht enthalten**: Frontblenden D1-F–D3-F (einliegend oder aufliegend wird erst am fertigen Korpus entschieden) und die Sitz- und Tischbretter C1–C3 (ADR 0013).",
      "**Kanten**: keine Fase, kein Radius an den Außenkanten."
     ]
    }
   ]
  }
 }
};

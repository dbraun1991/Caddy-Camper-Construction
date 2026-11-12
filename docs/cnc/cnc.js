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
     "fenster_art": "Fenster",
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
     "fenster_art": "Fenster",
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
     "fenster_art": "Fenster",
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
     "fenster_art": "Fenster",
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
     "fenster_art": "Fenster",
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
     "fenster_art": "Fenster",
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
     "fenster_art": "Fenster",
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
     "fenster_art": "Fenster",
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
     "fenster_art": "Fenster",
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
     "fenster_art": "Fenster",
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
     "fenster_art": "Fenster",
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
     "fenster_art": "Fenster",
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
     "mass": "850 × 216",
     "schlitze": 5,
     "fenster": 4,
     "fenster_art": "Fenster",
     "material": "Birke-Multiplex 18 mm"
    },
    {
     "datei": "docs/cnc/schubladen/d1-e1-d2-e1.dxf",
     "vorschau": "docs/cnc/schubladen/vorschau/d1-e1-d2-e1.svg",
     "kuerzel": "D1-E1 / D2-E1",
     "name": "Schublade links / rechts, Kastenfront mit Griff",
     "stk": 2,
     "mass": "274 × 216",
     "schlitze": 2,
     "fenster": 6,
     "fenster_art": "Löcher + Griff",
     "material": "Birke-Multiplex 18 mm"
    },
    {
     "datei": "docs/cnc/schubladen/d1-e2-d2-e2.dxf",
     "vorschau": "docs/cnc/schubladen/vorschau/d1-e2-d2-e2.svg",
     "kuerzel": "D1-E2 / D2-E2",
     "name": "Schublade links / rechts, Kastenrückwand",
     "stk": 2,
     "mass": "274 × 216",
     "schlitze": 2,
     "fenster": 9,
     "fenster_art": "Löcher",
     "material": "Birke-Multiplex 18 mm"
    },
    {
     "datei": "docs/cnc/schubladen/d1-b-d2-b.dxf",
     "vorschau": "docs/cnc/schubladen/vorschau/d1-b-d2-b.svg",
     "kuerzel": "D1-B / D2-B",
     "name": "Schublade links / rechts, Boden",
     "stk": 2,
     "mass": "274 × 850",
     "schlitze": 0,
     "fenster": 0,
     "fenster_art": "Fenster",
     "material": "Birke-Multiplex 12 mm"
    },
    {
     "datei": "docs/cnc/schubladen/d3-s.dxf",
     "vorschau": "docs/cnc/schubladen/vorschau/d3-s.svg",
     "kuerzel": "D3-S",
     "name": "Schublade Mitte, Seitenwand",
     "stk": 2,
     "mass": "850 × 227,5",
     "schlitze": 5,
     "fenster": 36,
     "fenster_art": "Löcher",
     "material": "Birke-Multiplex 18 mm"
    },
    {
     "datei": "docs/cnc/schubladen/d3-e1.dxf",
     "vorschau": "docs/cnc/schubladen/vorschau/d3-e1.svg",
     "kuerzel": "D3-E1",
     "name": "Schublade Mitte, Kastenfront mit Griff",
     "stk": 1,
     "mass": "386 × 227,5",
     "schlitze": 2,
     "fenster": 20,
     "fenster_art": "Löcher + Griff",
     "material": "Birke-Multiplex 18 mm"
    },
    {
     "datei": "docs/cnc/schubladen/d3-e2.dxf",
     "vorschau": "docs/cnc/schubladen/vorschau/d3-e2.svg",
     "kuerzel": "D3-E2",
     "name": "Schublade Mitte, Kastenrückwand",
     "stk": 1,
     "mass": "386 × 227,5",
     "schlitze": 2,
     "fenster": 24,
     "fenster_art": "Löcher",
     "material": "Birke-Multiplex 18 mm"
    },
    {
     "datei": "docs/cnc/schubladen/d3-b.dxf",
     "vorschau": "docs/cnc/schubladen/vorschau/d3-b.svg",
     "kuerzel": "D3-B",
     "name": "Schublade Mitte, Boden",
     "stk": 1,
     "mass": "386 × 850",
     "schlitze": 0,
     "fenster": 0,
     "fenster_art": "Fenster",
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
      "Material: **Birke-Multiplex 18 mm** (Wände) und **12 mm** (Böden), 15 Teile in 8 unterschiedlichen Formen — die Wände und Böden der drei Schubladenkästen (Außenmaß B × T × H: D1 272 × 848 × 216, D2 272 × 848 × 216, D3 384 × 848 × 227,5 mm).",
      "Gewicht aller drei Kästen ca. **19,3 kg** (ohne Fenster, Löcher und Griffe wären es 23,6 kg, Dichte 680 kg/m³ angenommen)."
     ]
    },
    {
     "titel": "Dateien",
     "art": "liste",
     "texte": [
      "DXF (AutoCAD 2013, `AC1027`), Maßstab 1:1, Einheit **mm**, Ursprung links unten am Teil.",
      "Layer `AUSSENKONTUR` (rot): Außenkontur, durchfräsen, Fräser außen an der Linie.",
      "Layer `INNENKONTUR` (blau): geschlossene Schlitze, Fenster und Löcher der Seitenwände, durchfräsen, Fräser innen an der Linie.",
      "Alle Konturen geschlossen. Nur Linien und Kreisbögen, keine Beschriftung, keine Bohrungen, keine Taschen — alles ist ein 2D-Durchschnitt.",
      "`alle-teile.dxf` enthält jedes Teil in Auftragsstückzahl nebeneinander, mit 20 mm Abstand — nur zur Übersicht, **kein Nesting**. Die Verteilung auf die Platten macht der Dienstleister."
     ]
    },
    {
     "titel": "Verbindungen",
     "art": "liste",
     "texte": [
      "**Ecken: Fingerzinken**, 7 Felder über die Kastenhöhe. Die Seitenwände (`-S`) haben oben und unten einen Zinken, Kastenfront (`-E1`) und -rückwand (`-E2`) die Lücken dazwischen.",
      "**Boden** (`-B`, 12 mm): Zapfen 50 mm breit, je 5 an den langen und 2 an den kurzen Kanten, durch Schlitze 50 × 12 mm in allen vier Wänden, 10 mm über der Wandunterkante.",
      "Lücken und Schlitze sind je Richtung **0,2 mm größer** als Zinken und Zapfen (die bleiben auf Nennmaß).",
      "Zinken und Bodenzapfen sind **19 mm lang** (18 mm Wandstärke + 1 mm Schleifzugabe): Sie stehen nach dem Verleimen 1 mm über und werden bündig geschliffen, bevor die Schienen angeschraubt werden. Gewollt, nicht korrigieren.",
      "Jede Innenecke hat einen **Dogbone**: Freischnitt Ø 6 mm über die Ecke hinaus, Kreis durch den Eckpunkt. Ohne ihn bliebe in jeder Ecke ein Radius stehen, und die eckigen Zapfen passten nicht in Schlitze und Aussparungen.",
      "**Fenster** in den Seitenwänden der äußeren Schubladen (D1, D2): Ecken mit Radius 20 mm, ohne Dogbone. **Lochraster** (runde Löcher Ø 25 mm im Abstand 40 mm) in den Seitenwänden der mittleren Schublade (D3) und in allen Kastenfronten und -rückwänden (ADR 0026, ADR 0027). Das Band der Schubladenschiene (± 15 mm) bleibt immer voll stehen — dort wird die Schiene angeschraubt.",
      "**Griff** in der Kastenfront (`-E1`): Ausschnitt von der Oberkante, 120 mm breit, 35 mm tief, unten Radius 15 mm (ADR 0027)."
     ]
    },
    {
     "titel": "Annahmen (vor dem Auftrag klären)",
     "art": "nummeriert",
     "texte": [
      "**Kastenbreite** = Sektionsbreite − 2 × Schienenstärke − 2 mm Spiel. Die Stärke der gelieferten 80-kg-Schiene ist **gemessen** (19 mm je Seite, 2026-11-12). Die Lage der Schraublöcher steht noch aus — die Fenster lassen das Schienenband ± 15 mm frei, das sollte reichen; vor der Bestellung trotzdem gegen die Lochreihe prüfen.",
      "**Fräserdurchmesser 6 mm** und **Passungsluft 0,2 mm** wie beim Korpus-Auftrag. Gilt auch für die 12-mm-Böden: „12 mm“-Multiplex ist real oft etwas dünner oder dicker — die Schlitzhöhe an der gelieferten Platte prüfen.",
      "**Haltestege** (Tabs) und Fräsreihenfolge legt der Dienstleister fest; danach nur Stegreste verschleifen.",
      "**Faserrichtung egal**: Die Teile dürfen beim Nesting beliebig gedreht werden. Wenden (Rückseite nach oben) ist ebenfalls erlaubt: Jedes Teil ist spiegelsymmetrisch (D1-S / D2-S links/rechts, D1-E1 / D2-E1 links/rechts, D1-E2 / D2-E2 links/rechts, D1-B / D2-B links/rechts + oben/unten, D3-S links/rechts, D3-E1 links/rechts, D3-E2 links/rechts, D3-B links/rechts + oben/unten), gewendet entsteht dasselbe Teil.",
      "**Keine Bohrungen**: Die Schienen werden beim Zusammenbau angerissen und gebohrt.",
      "**Keine Frontblenden** (ADR 0027): Die Kastenfront `-E1` ist die sichtbare Front, mit gefrästem Griff. Sitz- und Tischbretter C1–C3 sind nicht enthalten (ADR 0013).",
      "**Kanten**: keine Fase, kein Radius an den Außenkanten. Die Kanten am Griff werden von Hand gebrochen."
     ]
    }
   ]
  }
 }
};

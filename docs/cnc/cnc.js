// Generiert von modell/cnc.py — nicht von Hand ändern (ADR 0023)
window.CNC = {
 "stand": "2026-11-07",
 "varianten": {
  "gezapft": {
   "teile": [
    {
     "datei": "docs/cnc/gezapft/b1-t1.dxf",
     "vorschau": "docs/cnc/gezapft/vorschau/b1-t1.svg",
     "kuerzel": "B1 / T1",
     "name": "Bodenplatte / Deckplatte",
     "stk": 2,
     "mass": "1120 × 900",
     "schlitze": 6
    },
    {
     "datei": "docs/cnc/gezapft/s1-s2.dxf",
     "vorschau": "docs/cnc/gezapft/vorschau/s1-s2.svg",
     "kuerzel": "S1 / S2",
     "name": "Seitenwand links / rechts",
     "stk": 2,
     "mass": "900 × 340",
     "schlitze": 0
    },
    {
     "datei": "docs/cnc/gezapft/m1-m2.dxf",
     "vorschau": "docs/cnc/gezapft/vorschau/m1-m2.svg",
     "kuerzel": "M1 / M2",
     "name": "Trennwand links / rechts",
     "stk": 2,
     "mass": "900 × 340",
     "schlitze": 0
    },
    {
     "datei": "docs/cnc/gezapft/r1.dxf",
     "vorschau": "docs/cnc/gezapft/vorschau/r1.svg",
     "kuerzel": "R1",
     "name": "Rückwand",
     "stk": 1,
     "mass": "1084 × 340",
     "schlitze": 2
    },
    {
     "datei": "docs/cnc/gezapft/f1.dxf",
     "vorschau": "docs/cnc/gezapft/vorschau/f1.svg",
     "kuerzel": "F1",
     "name": "Klappbrett Rücksitz",
     "stk": 1,
     "mass": "1120 × 700",
     "schlitze": 0
    },
    {
     "datei": "docs/cnc/gezapft/f2.dxf",
     "vorschau": "docs/cnc/gezapft/vorschau/f2.svg",
     "kuerzel": "F2",
     "name": "Klappbrett Kopfende",
     "stk": 1,
     "mass": "1120 × 400",
     "schlitze": 0
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
      "**Nicht enthalten**: Schubladen, Sitz- und Tischbretter (C1–C3, D1–D3) — deren Maße werden erst am fertigen Korpus festgelegt (zweiter Auftrag).",
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
     "name": "Bodenplatte / Deckplatte",
     "stk": 2,
     "mass": "1120 × 900",
     "schlitze": 0
    },
    {
     "datei": "docs/cnc/stumpf/s1-s2.dxf",
     "vorschau": "docs/cnc/stumpf/vorschau/s1-s2.svg",
     "kuerzel": "S1 / S2",
     "name": "Seitenwand links / rechts",
     "stk": 2,
     "mass": "900 × 302",
     "schlitze": 0
    },
    {
     "datei": "docs/cnc/stumpf/m1-m2.dxf",
     "vorschau": "docs/cnc/stumpf/vorschau/m1-m2.svg",
     "kuerzel": "M1 / M2",
     "name": "Trennwand links / rechts",
     "stk": 2,
     "mass": "882 × 302",
     "schlitze": 0
    },
    {
     "datei": "docs/cnc/stumpf/r1.dxf",
     "vorschau": "docs/cnc/stumpf/vorschau/r1.svg",
     "kuerzel": "R1",
     "name": "Rückwand",
     "stk": 1,
     "mass": "1084 × 302",
     "schlitze": 0
    },
    {
     "datei": "docs/cnc/stumpf/f1.dxf",
     "vorschau": "docs/cnc/stumpf/vorschau/f1.svg",
     "kuerzel": "F1",
     "name": "Klappbrett Rücksitz",
     "stk": 1,
     "mass": "1120 × 700",
     "schlitze": 0
    },
    {
     "datei": "docs/cnc/stumpf/f2.dxf",
     "vorschau": "docs/cnc/stumpf/vorschau/f2.svg",
     "kuerzel": "F2",
     "name": "Klappbrett Kopfende",
     "stk": 1,
     "mass": "1120 × 400",
     "schlitze": 0
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
      "**Nicht enthalten**: Schubladen, Sitz- und Tischbretter (C1–C3, D1–D3) — deren Maße werden erst am fertigen Korpus festgelegt (zweiter Auftrag).",
      "**Kanten**: keine Fase, kein Radius an den Außenkanten."
     ]
    }
   ]
  }
 }
};

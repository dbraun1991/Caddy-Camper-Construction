// GENERIERT von modell/modell.py aus modell/parameter.json — nicht von Hand bearbeiten.
window.MODELL = {
 "parameter": {
  "_hinweis": "Gemeinsame Datenbasis für 3D-Viewer und Werkzeichnungen. Alle Maße in mm. Nach jeder Änderung: python modell/modell.py (Viewer) und python modell/zeichnungen.py (Zeichnungen). Siehe docs/adrs/0015-shared-model-data-for-viewer-and-drawings.md",
  "korpus": {
   "breite": 1120,
   "tiefe": 900,
   "hoehe": 320,
   "plattenstaerke": 18,
   "trennwandstaerke": 18,
   "sektion_mitte_innen": 424
  },
  "zapfen": {
   "_hinweis": "Wände greifen mit Zapfen durch B1/T1 (ADR 0020). Querschnitt = laenge × Plattenstärke. An S1/S2/M1/M2 gleichmäßig verteilt; an R1 feste Mitten (x), damit die Scharniere V17 auf T1 keinen Zapfen treffen",
   "laenge": 50,
   "anzahl_je_kante": 3,
   "abstand_rand": 50,
   "r1_mitten": [
    -475,
    -155,
    155,
    475
   ],
   "schleifzugabe": 1,
   "_schleifzugabe": "Zuschnitt je Wandkante länger als die Plattenstärke, Zapfen werden nach dem Verleimen bündig geschliffen (Wandhöhe 302 + 2 × 19 = 340). Der hintere M1/M2-Zapfen in R1 hat keine Zugabe."
  },
  "liegeflaeche": {
   "laenge_f1": 700,
   "laenge_f2": 400
  },
  "matratze": {
   "breite": 1100,
   "laenge": 1980,
   "hoehe": 80
  },
  "scharniere": {
   "_hinweis": "Standard-Klappscharniere (aufgeschraubt). T1↔F1 oben, F1↔F2 unten — so klappen F1 und F2 als Stapel auf die Box (ADR 0019)",
   "je_fuge": 3,
   "blatt_breite": 60,
   "laenge_offen": 60,
   "achse_ueber_flaeche": 3,
   "abstand_rand": 150
  },
  "schienen": {
   "laenge": 850,
   "typen": {
    "schwer": {
     "name": "AOLISHENG 850 mm · 170 kg",
     "staerke": 19,
     "hoehe": 76,
     "traglast": 170
    },
    "leicht": {
     "name": "AOLISHENG 850 mm · 80 kg",
     "staerke": 19,
     "hoehe": 53,
     "traglast": 80
    }
   },
   "_staerke": "Am 2026-11-12 an den gelieferten Schienen gemessen: Stärke je Seite bei beiden Typen exakt 19 mm (die Elementbreiten hängen davon ab). Höhe 80 kg: 53 mm bestätigt. Höhe 170 kg: gemessen ~74 mm, Messung unsicher — bis zur Kontrolle bleibt der Datenblattwert 76 mm (größeres Band, sichere Seite für die Schraubenbänder an M1/M2 und ADR 0013)",
   "zuordnung": {
    "C1": "schwer",
    "C2": "schwer",
    "C3": "schwer",
    "D1": "leicht",
    "D2": "leicht",
    "D3": "leicht"
   }
  },
  "elemente": {
   "brett_hoehe": 32,
   "spalt_hoehe": 5,
   "spiel_seitlich": 1,
   "vorstand_front": 1.5,
   "kasten_tiefe": 830,
   "brett_tiefe": 850,
   "blende_staerke": 18,
   "blende_hoehe": 268
  },
  "schubladen": {
   "_hinweis": "Kastenbau D1–D3 aus CNC-Teilen (ADR 0024): Ecken mit Fingerzinken, Boden mit Zapfen durch Schlitze in allen vier Wänden, Fenster in den Seitenwänden. Außenmaße der Kästen kommen aus dem Modell (Schienenstärke!), hier nur der Aufbau.",
   "wandstaerke": 18,
   "bodenstaerke": 12,
   "boden_abstand_unten": 10,
   "_boden_abstand_unten": "Unterkante Boden über der Wandunterkante — so viel Holz bleibt unter den Bodenschlitzen stehen",
   "zinken_anzahl": 7,
   "_zinken_anzahl": "Ungerade: die Seitenwände haben oben und unten einen Zinken, Kastenfront und -rückwand die Lücken dazwischen",
   "bodenzapfen": {
    "laenge": 50,
    "anzahl_lang": 5,
    "anzahl_kurz": 2,
    "abstand_rand": 40
   },
   "fenster": {
    "_hinweis": "Durchbrüche in den Seitenwänden zur Gewichtsersparnis. Das Schienenband (± abstand_schiene) bleibt immer voll stehen, ebenso ein Rand oben, ein Steg über dem Boden und die Zinkenzone an den Enden",
    "anzahl": 4,
    "steg": 40,
    "rand_ende": 50,
    "rand_oben": 30,
    "steg_boden": 30,
    "abstand_schiene": 15,
    "radius": 20,
    "min_hoehe": 60
   },
   "dichte_kg_m3": 680,
   "_dichte": "Birke-Multiplex, nur für die Gewichtsangabe im CNC-Auftrag"
  },
  "fahrzeug": {
   "_stand": "Am eigenen Fahrzeug nachgemessen am 2026-10-17. Alles andere an der Caddy-Hülle in index.html bleibt Platzhalter.",
   "ladebreite_radkaesten_min": 1130,
   "ladebreite_radkaesten_max": 1140,
   "_ladebreite": "10–20 mm seitliches Spiel zum Korpus (1.120) — bewusst nicht genutzt, der Korpus bleibt 1.120 breit",
   "ladetiefe_min": 920,
   "ladetiefe_max": 930,
   "ruecksitzlehne_hoehe": 310,
   "laenge_heck_bis_kopfstuetzen": 2000,
   "heckklappe_passt": true,
   "ladekante": 0
  },
  "cnc": {
   "_hinweis": "DXF-Export für den CNC-Dienstleister (modell/cnc.py, ADR 0023). Alle Werte sind ANNAHMEN, bis der Dienstleister geantwortet hat — dann hier anpassen und neu erzeugen.",
   "fraeser_durchmesser": 6,
   "_fraeser_durchmesser": "Annahme: Schaftfräser Ø 6 mm (üblich für 18-mm-Platten). Bestimmt den Radius der Dogbones in den Innenecken.",
   "innenecken": "dogbone",
   "_innenecken": "dogbone = Freischnitt Ø Fräser in jeder Innenecke, damit eckige Zapfen in die Schlitze passen · keine = Dienstleister setzt die Freischnitte selbst",
   "passungsluft": 0.2,
   "_passungsluft": "Annahme: Schlitze und Aussparungen je Richtung 0,2 mm größer als der Zapfen (je Seite 0,1). Bei gemessener Plattenstärke über 18,0 mm entsprechend erhöhen.",
   "plattenstaerke": 18,
   "material": "Birke-Multiplex 18 mm",
   "teileabstand": 20
  },
  "eckausbildung": "gezapft",
  "_eckausbildung_werte": "Boden B1 und Deckel T1 laufen immer durch (ADR 0018). gezapft = Wände greifen mit Zapfen in Schlitze/Aussparungen von B1, T1 und R1 (ADR 0020) · stumpf = Wände 302 mm, stumpf zwischen B1 und T1"
 },
 "eckausbildung": "gezapft",
 "teile": [
  {
   "id": "S1",
   "name": "Seitenwand links (Fahrerseite)",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     542.0,
     560.0
    ],
    [
     18,
     320
    ],
    [
     0,
     900
    ]
   ],
   "zuschnitt": [
    900,
    340
   ]
  },
  {
   "id": "S2",
   "name": "Seitenwand rechts (Beifahrerseite)",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     -560.0,
     -542.0
    ],
    [
     18,
     320
    ],
    [
     0,
     900
    ]
   ],
   "zuschnitt": [
    900,
    340
   ]
  },
  {
   "id": "R1",
   "name": "Rückwand",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     -542.0,
     542.0
    ],
    [
     18,
     320
    ],
    [
     882,
     900
    ]
   ],
   "zuschnitt": [
    1084,
    340
   ]
  },
  {
   "id": "B1",
   "name": "Bodenplatte",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     -560.0,
     560.0
    ],
    [
     0,
     18
    ],
    [
     0,
     900
    ]
   ]
  },
  {
   "id": "M1",
   "name": "Trennwand links",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     212.0,
     230.0
    ],
    [
     18,
     320
    ],
    [
     0,
     882
    ]
   ],
   "zuschnitt": [
    900,
    340
   ]
  },
  {
   "id": "M2",
   "name": "Trennwand rechts",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     -230.0,
     -212.0
    ],
    [
     18,
     320
    ],
    [
     0,
     882
    ]
   ],
   "zuschnitt": [
    900,
    340
   ]
  },
  {
   "id": "T1",
   "name": "Deckplatte",
   "gruppe": "liegeflaeche",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     -560.0,
     560.0
    ],
    [
     320,
     338
    ],
    [
     0,
     900
    ]
   ]
  },
  {
   "id": "S1-Z1u",
   "name": "Zapfen Seitenwand links in B1",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     542.0,
     560.0
    ],
    [
     0,
     18
    ],
    [
     50.0,
     100.0
    ]
   ],
   "steckt_in": [
    "B1"
   ],
   "zapfen_von": "S1"
  },
  {
   "id": "S1-Z1o",
   "name": "Zapfen Seitenwand links in T1",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     542.0,
     560.0
    ],
    [
     320,
     338
    ],
    [
     50.0,
     100.0
    ]
   ],
   "steckt_in": [
    "T1"
   ],
   "zapfen_von": "S1"
  },
  {
   "id": "S1-Z2u",
   "name": "Zapfen Seitenwand links in B1",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     542.0,
     560.0
    ],
    [
     0,
     18
    ],
    [
     425.0,
     475.0
    ]
   ],
   "steckt_in": [
    "B1"
   ],
   "zapfen_von": "S1"
  },
  {
   "id": "S1-Z2o",
   "name": "Zapfen Seitenwand links in T1",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     542.0,
     560.0
    ],
    [
     320,
     338
    ],
    [
     425.0,
     475.0
    ]
   ],
   "steckt_in": [
    "T1"
   ],
   "zapfen_von": "S1"
  },
  {
   "id": "S1-Z3u",
   "name": "Zapfen Seitenwand links in B1",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     542.0,
     560.0
    ],
    [
     0,
     18
    ],
    [
     800.0,
     850.0
    ]
   ],
   "steckt_in": [
    "B1"
   ],
   "zapfen_von": "S1"
  },
  {
   "id": "S1-Z3o",
   "name": "Zapfen Seitenwand links in T1",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     542.0,
     560.0
    ],
    [
     320,
     338
    ],
    [
     800.0,
     850.0
    ]
   ],
   "steckt_in": [
    "T1"
   ],
   "zapfen_von": "S1"
  },
  {
   "id": "S2-Z1u",
   "name": "Zapfen Seitenwand rechts in B1",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     -560.0,
     -542.0
    ],
    [
     0,
     18
    ],
    [
     50.0,
     100.0
    ]
   ],
   "steckt_in": [
    "B1"
   ],
   "zapfen_von": "S2"
  },
  {
   "id": "S2-Z1o",
   "name": "Zapfen Seitenwand rechts in T1",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     -560.0,
     -542.0
    ],
    [
     320,
     338
    ],
    [
     50.0,
     100.0
    ]
   ],
   "steckt_in": [
    "T1"
   ],
   "zapfen_von": "S2"
  },
  {
   "id": "S2-Z2u",
   "name": "Zapfen Seitenwand rechts in B1",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     -560.0,
     -542.0
    ],
    [
     0,
     18
    ],
    [
     425.0,
     475.0
    ]
   ],
   "steckt_in": [
    "B1"
   ],
   "zapfen_von": "S2"
  },
  {
   "id": "S2-Z2o",
   "name": "Zapfen Seitenwand rechts in T1",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     -560.0,
     -542.0
    ],
    [
     320,
     338
    ],
    [
     425.0,
     475.0
    ]
   ],
   "steckt_in": [
    "T1"
   ],
   "zapfen_von": "S2"
  },
  {
   "id": "S2-Z3u",
   "name": "Zapfen Seitenwand rechts in B1",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     -560.0,
     -542.0
    ],
    [
     0,
     18
    ],
    [
     800.0,
     850.0
    ]
   ],
   "steckt_in": [
    "B1"
   ],
   "zapfen_von": "S2"
  },
  {
   "id": "S2-Z3o",
   "name": "Zapfen Seitenwand rechts in T1",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     -560.0,
     -542.0
    ],
    [
     320,
     338
    ],
    [
     800.0,
     850.0
    ]
   ],
   "steckt_in": [
    "T1"
   ],
   "zapfen_von": "S2"
  },
  {
   "id": "R1-Z1u",
   "name": "Zapfen Rückwand in B1",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     -500.0,
     -450.0
    ],
    [
     0,
     18
    ],
    [
     882,
     900
    ]
   ],
   "steckt_in": [
    "B1"
   ],
   "zapfen_von": "R1"
  },
  {
   "id": "R1-Z1o",
   "name": "Zapfen Rückwand in T1",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     -500.0,
     -450.0
    ],
    [
     320,
     338
    ],
    [
     882,
     900
    ]
   ],
   "steckt_in": [
    "T1"
   ],
   "zapfen_von": "R1"
  },
  {
   "id": "R1-Z2u",
   "name": "Zapfen Rückwand in B1",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     -180.0,
     -130.0
    ],
    [
     0,
     18
    ],
    [
     882,
     900
    ]
   ],
   "steckt_in": [
    "B1"
   ],
   "zapfen_von": "R1"
  },
  {
   "id": "R1-Z2o",
   "name": "Zapfen Rückwand in T1",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     -180.0,
     -130.0
    ],
    [
     320,
     338
    ],
    [
     882,
     900
    ]
   ],
   "steckt_in": [
    "T1"
   ],
   "zapfen_von": "R1"
  },
  {
   "id": "R1-Z3u",
   "name": "Zapfen Rückwand in B1",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     130.0,
     180.0
    ],
    [
     0,
     18
    ],
    [
     882,
     900
    ]
   ],
   "steckt_in": [
    "B1"
   ],
   "zapfen_von": "R1"
  },
  {
   "id": "R1-Z3o",
   "name": "Zapfen Rückwand in T1",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     130.0,
     180.0
    ],
    [
     320,
     338
    ],
    [
     882,
     900
    ]
   ],
   "steckt_in": [
    "T1"
   ],
   "zapfen_von": "R1"
  },
  {
   "id": "R1-Z4u",
   "name": "Zapfen Rückwand in B1",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     450.0,
     500.0
    ],
    [
     0,
     18
    ],
    [
     882,
     900
    ]
   ],
   "steckt_in": [
    "B1"
   ],
   "zapfen_von": "R1"
  },
  {
   "id": "R1-Z4o",
   "name": "Zapfen Rückwand in T1",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     450.0,
     500.0
    ],
    [
     320,
     338
    ],
    [
     882,
     900
    ]
   ],
   "steckt_in": [
    "T1"
   ],
   "zapfen_von": "R1"
  },
  {
   "id": "M1-Z1u",
   "name": "Zapfen Trennwand links in B1",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     212.0,
     230.0
    ],
    [
     0,
     18
    ],
    [
     50.0,
     100.0
    ]
   ],
   "steckt_in": [
    "B1"
   ],
   "zapfen_von": "M1"
  },
  {
   "id": "M1-Z1o",
   "name": "Zapfen Trennwand links in T1",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     212.0,
     230.0
    ],
    [
     320,
     338
    ],
    [
     50.0,
     100.0
    ]
   ],
   "steckt_in": [
    "T1"
   ],
   "zapfen_von": "M1"
  },
  {
   "id": "M1-Z2u",
   "name": "Zapfen Trennwand links in B1",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     212.0,
     230.0
    ],
    [
     0,
     18
    ],
    [
     416.0,
     466.0
    ]
   ],
   "steckt_in": [
    "B1"
   ],
   "zapfen_von": "M1"
  },
  {
   "id": "M1-Z2o",
   "name": "Zapfen Trennwand links in T1",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     212.0,
     230.0
    ],
    [
     320,
     338
    ],
    [
     416.0,
     466.0
    ]
   ],
   "steckt_in": [
    "T1"
   ],
   "zapfen_von": "M1"
  },
  {
   "id": "M1-Z3u",
   "name": "Zapfen Trennwand links in B1",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     212.0,
     230.0
    ],
    [
     0,
     18
    ],
    [
     782.0,
     832.0
    ]
   ],
   "steckt_in": [
    "B1"
   ],
   "zapfen_von": "M1"
  },
  {
   "id": "M1-Z3o",
   "name": "Zapfen Trennwand links in T1",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     212.0,
     230.0
    ],
    [
     320,
     338
    ],
    [
     782.0,
     832.0
    ]
   ],
   "steckt_in": [
    "T1"
   ],
   "zapfen_von": "M1"
  },
  {
   "id": "M1-Zh",
   "name": "Zapfen Trennwand links in R1",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     212.0,
     230.0
    ],
    [
     144.0,
     194.0
    ],
    [
     882,
     900
    ]
   ],
   "steckt_in": [
    "R1"
   ],
   "zapfen_von": "M1"
  },
  {
   "id": "M2-Z1u",
   "name": "Zapfen Trennwand rechts in B1",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     -230.0,
     -212.0
    ],
    [
     0,
     18
    ],
    [
     50.0,
     100.0
    ]
   ],
   "steckt_in": [
    "B1"
   ],
   "zapfen_von": "M2"
  },
  {
   "id": "M2-Z1o",
   "name": "Zapfen Trennwand rechts in T1",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     -230.0,
     -212.0
    ],
    [
     320,
     338
    ],
    [
     50.0,
     100.0
    ]
   ],
   "steckt_in": [
    "T1"
   ],
   "zapfen_von": "M2"
  },
  {
   "id": "M2-Z2u",
   "name": "Zapfen Trennwand rechts in B1",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     -230.0,
     -212.0
    ],
    [
     0,
     18
    ],
    [
     416.0,
     466.0
    ]
   ],
   "steckt_in": [
    "B1"
   ],
   "zapfen_von": "M2"
  },
  {
   "id": "M2-Z2o",
   "name": "Zapfen Trennwand rechts in T1",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     -230.0,
     -212.0
    ],
    [
     320,
     338
    ],
    [
     416.0,
     466.0
    ]
   ],
   "steckt_in": [
    "T1"
   ],
   "zapfen_von": "M2"
  },
  {
   "id": "M2-Z3u",
   "name": "Zapfen Trennwand rechts in B1",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     -230.0,
     -212.0
    ],
    [
     0,
     18
    ],
    [
     782.0,
     832.0
    ]
   ],
   "steckt_in": [
    "B1"
   ],
   "zapfen_von": "M2"
  },
  {
   "id": "M2-Z3o",
   "name": "Zapfen Trennwand rechts in T1",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     -230.0,
     -212.0
    ],
    [
     320,
     338
    ],
    [
     782.0,
     832.0
    ]
   ],
   "steckt_in": [
    "T1"
   ],
   "zapfen_von": "M2"
  },
  {
   "id": "M2-Zh",
   "name": "Zapfen Trennwand rechts in R1",
   "gruppe": "korpus",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     -230.0,
     -212.0
    ],
    [
     144.0,
     194.0
    ],
    [
     882,
     900
    ]
   ],
   "steckt_in": [
    "R1"
   ],
   "zapfen_von": "M2"
  },
  {
   "id": "C1",
   "name": "Sitzbrett links",
   "gruppe": "brett",
   "material": "sitz",
   "faehrt": "bretter",
   "box": [
    [
     250.0,
     522.0
    ],
    [
     18,
     50
    ],
    [
     -1.5,
     848.5
    ]
   ]
  },
  {
   "id": "D1",
   "name": "Schubladenkasten links",
   "gruppe": "schublade",
   "material": "schublade",
   "faehrt": "schubladen",
   "box": [
    [
     250.0,
     522.0
    ],
    [
     55,
     315
    ],
    [
     16.5,
     846.5
    ]
   ]
  },
  {
   "id": "D1-F",
   "name": "Schubladenfront links",
   "gruppe": "schublade",
   "material": "blende",
   "faehrt": "schubladen",
   "box": [
    [
     230.0,
     542.0
    ],
    [
     50,
     318
    ],
    [
     -1.5,
     16.5
    ]
   ]
  },
  {
   "id": "E-C1-a",
   "name": "Schiene Sitzbrett links, an Trennwand links · AOLISHENG 850 mm · 170 kg",
   "gruppe": "schiene",
   "material": "schiene",
   "faehrt": "bretter",
   "box": [
    [
     230.0,
     249.0
    ],
    [
     18,
     94
    ],
    [
     0,
     850
    ]
   ],
   "richtung": 1
  },
  {
   "id": "E-C1-b",
   "name": "Schiene Sitzbrett links, an Seitenwand links · AOLISHENG 850 mm · 170 kg",
   "gruppe": "schiene",
   "material": "schiene",
   "faehrt": "bretter",
   "box": [
    [
     523.0,
     542.0
    ],
    [
     18,
     94
    ],
    [
     0,
     850
    ]
   ],
   "richtung": -1
  },
  {
   "id": "E-D1-a",
   "name": "Schiene Schublade links, an Trennwand links · AOLISHENG 850 mm · 80 kg",
   "gruppe": "schiene",
   "material": "schiene",
   "faehrt": "schubladen",
   "box": [
    [
     230.0,
     249.0
    ],
    [
     201.83,
     254.83
    ],
    [
     0,
     850
    ]
   ],
   "richtung": 1
  },
  {
   "id": "E-D1-b",
   "name": "Schiene Schublade links, an Seitenwand links · AOLISHENG 850 mm · 80 kg",
   "gruppe": "schiene",
   "material": "schiene",
   "faehrt": "schubladen",
   "box": [
    [
     523.0,
     542.0
    ],
    [
     201.83,
     254.83
    ],
    [
     0,
     850
    ]
   ],
   "richtung": -1
  },
  {
   "id": "C2",
   "name": "Sitzbrett rechts",
   "gruppe": "brett",
   "material": "sitz",
   "faehrt": "bretter",
   "box": [
    [
     -522.0,
     -250.0
    ],
    [
     18,
     50
    ],
    [
     -1.5,
     848.5
    ]
   ]
  },
  {
   "id": "D2",
   "name": "Schubladenkasten rechts",
   "gruppe": "schublade",
   "material": "schublade",
   "faehrt": "schubladen",
   "box": [
    [
     -522.0,
     -250.0
    ],
    [
     55,
     315
    ],
    [
     16.5,
     846.5
    ]
   ]
  },
  {
   "id": "D2-F",
   "name": "Schubladenfront rechts",
   "gruppe": "schublade",
   "material": "blende",
   "faehrt": "schubladen",
   "box": [
    [
     -542.0,
     -230.0
    ],
    [
     50,
     318
    ],
    [
     -1.5,
     16.5
    ]
   ]
  },
  {
   "id": "E-C2-a",
   "name": "Schiene Sitzbrett rechts, an Seitenwand rechts · AOLISHENG 850 mm · 170 kg",
   "gruppe": "schiene",
   "material": "schiene",
   "faehrt": "bretter",
   "box": [
    [
     -542.0,
     -523.0
    ],
    [
     18,
     94
    ],
    [
     0,
     850
    ]
   ],
   "richtung": 1
  },
  {
   "id": "E-C2-b",
   "name": "Schiene Sitzbrett rechts, an Trennwand rechts · AOLISHENG 850 mm · 170 kg",
   "gruppe": "schiene",
   "material": "schiene",
   "faehrt": "bretter",
   "box": [
    [
     -249.0,
     -230.0
    ],
    [
     18,
     94
    ],
    [
     0,
     850
    ]
   ],
   "richtung": -1
  },
  {
   "id": "E-D2-a",
   "name": "Schiene Schublade rechts, an Seitenwand rechts · AOLISHENG 850 mm · 80 kg",
   "gruppe": "schiene",
   "material": "schiene",
   "faehrt": "schubladen",
   "box": [
    [
     -542.0,
     -523.0
    ],
    [
     201.83,
     254.83
    ],
    [
     0,
     850
    ]
   ],
   "richtung": 1
  },
  {
   "id": "E-D2-b",
   "name": "Schiene Schublade rechts, an Trennwand rechts · AOLISHENG 850 mm · 80 kg",
   "gruppe": "schiene",
   "material": "schiene",
   "faehrt": "schubladen",
   "box": [
    [
     -249.0,
     -230.0
    ],
    [
     201.83,
     254.83
    ],
    [
     0,
     850
    ]
   ],
   "richtung": -1
  },
  {
   "id": "D3",
   "name": "Schubladenkasten Mitte",
   "gruppe": "schublade",
   "material": "schublade",
   "faehrt": "schubladen",
   "box": [
    [
     -192.0,
     192.0
    ],
    [
     18,
     278
    ],
    [
     16.5,
     846.5
    ]
   ]
  },
  {
   "id": "D3-F",
   "name": "Schubladenfront Mitte",
   "gruppe": "schublade",
   "material": "blende",
   "faehrt": "schubladen",
   "box": [
    [
     -212.0,
     212.0
    ],
    [
     18,
     286
    ],
    [
     -1.5,
     16.5
    ]
   ]
  },
  {
   "id": "C3",
   "name": "Tischbrett Mitte",
   "gruppe": "brett",
   "material": "tisch",
   "faehrt": "bretter",
   "box": [
    [
     -192.0,
     192.0
    ],
    [
     283,
     315
    ],
    [
     -1.5,
     848.5
    ]
   ]
  },
  {
   "id": "E-D3-a",
   "name": "Schiene Schublade Mitte, an Trennwand rechts · AOLISHENG 850 mm · 80 kg",
   "gruppe": "schiene",
   "material": "schiene",
   "faehrt": "schubladen",
   "box": [
    [
     -212.0,
     -193.0
    ],
    [
     78.17,
     131.17
    ],
    [
     0,
     850
    ]
   ],
   "richtung": 1
  },
  {
   "id": "E-D3-b",
   "name": "Schiene Schublade Mitte, an Trennwand links · AOLISHENG 850 mm · 80 kg",
   "gruppe": "schiene",
   "material": "schiene",
   "faehrt": "schubladen",
   "box": [
    [
     193.0,
     212.0
    ],
    [
     78.17,
     131.17
    ],
    [
     0,
     850
    ]
   ],
   "richtung": -1
  },
  {
   "id": "E-C3-a",
   "name": "Schiene Tischbrett Mitte, an Trennwand rechts · AOLISHENG 850 mm · 170 kg",
   "gruppe": "schiene",
   "material": "schiene",
   "faehrt": "bretter",
   "box": [
    [
     -212.0,
     -193.0
    ],
    [
     239,
     315
    ],
    [
     0,
     850
    ]
   ],
   "richtung": 1
  },
  {
   "id": "E-C3-b",
   "name": "Schiene Tischbrett Mitte, an Trennwand links · AOLISHENG 850 mm · 170 kg",
   "gruppe": "schiene",
   "material": "schiene",
   "faehrt": "bretter",
   "box": [
    [
     193.0,
     212.0
    ],
    [
     239,
     315
    ],
    [
     0,
     850
    ]
   ],
   "richtung": -1
  },
  {
   "id": "H1-1",
   "name": "Scharnier Deckplatte ↔ Klappbrett Rücksitz (oben)",
   "gruppe": "scharnier",
   "material": "scharnier",
   "faehrt": null,
   "box": [
    [
     -440.0,
     -380.0
    ],
    [
     338,
     344
    ],
    [
     870.0,
     930.0
    ]
   ]
  },
  {
   "id": "H2-1",
   "name": "Scharnier Klappbrett Rücksitz ↔ Kopfende (unten)",
   "gruppe": "scharnier",
   "material": "scharnier",
   "faehrt": null,
   "box": [
    [
     -440.0,
     -380.0
    ],
    [
     314,
     320
    ],
    [
     1570.0,
     1630.0
    ]
   ],
   "klappt_mit": "F1"
  },
  {
   "id": "H1-2",
   "name": "Scharnier Deckplatte ↔ Klappbrett Rücksitz (oben)",
   "gruppe": "scharnier",
   "material": "scharnier",
   "faehrt": null,
   "box": [
    [
     -30.0,
     30.0
    ],
    [
     338,
     344
    ],
    [
     870.0,
     930.0
    ]
   ]
  },
  {
   "id": "H2-2",
   "name": "Scharnier Klappbrett Rücksitz ↔ Kopfende (unten)",
   "gruppe": "scharnier",
   "material": "scharnier",
   "faehrt": null,
   "box": [
    [
     -30.0,
     30.0
    ],
    [
     314,
     320
    ],
    [
     1570.0,
     1630.0
    ]
   ],
   "klappt_mit": "F1"
  },
  {
   "id": "H1-3",
   "name": "Scharnier Deckplatte ↔ Klappbrett Rücksitz (oben)",
   "gruppe": "scharnier",
   "material": "scharnier",
   "faehrt": null,
   "box": [
    [
     380.0,
     440.0
    ],
    [
     338,
     344
    ],
    [
     870.0,
     930.0
    ]
   ]
  },
  {
   "id": "H2-3",
   "name": "Scharnier Klappbrett Rücksitz ↔ Kopfende (unten)",
   "gruppe": "scharnier",
   "material": "scharnier",
   "faehrt": null,
   "box": [
    [
     380.0,
     440.0
    ],
    [
     314,
     320
    ],
    [
     1570.0,
     1630.0
    ]
   ],
   "klappt_mit": "F1"
  },
  {
   "id": "F1",
   "name": "Klappbrett Rücksitz",
   "gruppe": "liegeflaeche",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     -560.0,
     560.0
    ],
    [
     320,
     338
    ],
    [
     900,
     1600
    ]
   ]
  },
  {
   "id": "F2",
   "name": "Klappbrett Kopfende",
   "gruppe": "liegeflaeche",
   "material": "holz",
   "faehrt": null,
   "box": [
    [
     -560.0,
     560.0
    ],
    [
     320,
     338
    ],
    [
     1600,
     2000
    ]
   ]
  },
  {
   "id": "G1",
   "name": "Matratze",
   "gruppe": "matratze",
   "material": "matratze",
   "faehrt": null,
   "box": [
    [
     -550.0,
     550.0
    ],
    [
     338,
     418
    ],
    [
     0,
     1980
    ]
   ]
  }
 ],
 "kategorien": {
  "zapfen": "Zapfen steckt in Schlitz/Aussparung (gewollt)",
  "eckverbindung": "Eckausbildung Korpus — welche Platte läuft durch?",
  "rueckwand": "Rückwand R1 ragt in Schienen/Elemente (lichte Tiefe < Schienenlänge)",
  "frontblende": "Schubladenfront überdeckt Schienen bzw. Nachbarelement",
  "auflage": "Matratze liegt auf den Scharnieren (weich, unkritisch)",
  "sonstige": "Sonstige Überschneidung"
 },
 "gruppen": {
  "B": "Bodenplatte (Bottom)",
  "R": "Rückwand (Rear)",
  "S": "Seitenwände (Side)",
  "M": "Trennwände (Mid)",
  "T": "Deckplatte (Top)",
  "F": "Klappbretter (Fold)",
  "C": "Auszugbretter",
  "D": "Schubladen",
  "E": "Schienen",
  "V": "Verbindungsmittel & Beschläge",
  "G": "Ausstattung",
  "H": "Scharniere (Hinge)"
 },
 "varianten": {
  "gezapft": [
   {
    "a": "R1",
    "b": "M1-Zh",
    "box": [
     [
      212.0,
      230.0
     ],
     [
      144.0,
      194.0
     ],
     [
      882,
      900
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     50.0,
     18
    ]
   },
   {
    "a": "R1",
    "b": "M2-Zh",
    "box": [
     [
      -230.0,
      -212.0
     ],
     [
      144.0,
      194.0
     ],
     [
      882,
      900
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     50.0,
     18
    ]
   },
   {
    "a": "B1",
    "b": "S1-Z1u",
    "box": [
     [
      542.0,
      560.0
     ],
     [
      0,
      18
     ],
     [
      50.0,
      100.0
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18,
     50.0
    ]
   },
   {
    "a": "B1",
    "b": "S1-Z2u",
    "box": [
     [
      542.0,
      560.0
     ],
     [
      0,
      18
     ],
     [
      425.0,
      475.0
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18,
     50.0
    ]
   },
   {
    "a": "B1",
    "b": "S1-Z3u",
    "box": [
     [
      542.0,
      560.0
     ],
     [
      0,
      18
     ],
     [
      800.0,
      850.0
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18,
     50.0
    ]
   },
   {
    "a": "B1",
    "b": "S2-Z1u",
    "box": [
     [
      -560.0,
      -542.0
     ],
     [
      0,
      18
     ],
     [
      50.0,
      100.0
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18,
     50.0
    ]
   },
   {
    "a": "B1",
    "b": "S2-Z2u",
    "box": [
     [
      -560.0,
      -542.0
     ],
     [
      0,
      18
     ],
     [
      425.0,
      475.0
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18,
     50.0
    ]
   },
   {
    "a": "B1",
    "b": "S2-Z3u",
    "box": [
     [
      -560.0,
      -542.0
     ],
     [
      0,
      18
     ],
     [
      800.0,
      850.0
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18,
     50.0
    ]
   },
   {
    "a": "B1",
    "b": "R1-Z1u",
    "box": [
     [
      -500.0,
      -450.0
     ],
     [
      0,
      18
     ],
     [
      882,
      900
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     50.0,
     18,
     18
    ]
   },
   {
    "a": "B1",
    "b": "R1-Z2u",
    "box": [
     [
      -180.0,
      -130.0
     ],
     [
      0,
      18
     ],
     [
      882,
      900
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     50.0,
     18,
     18
    ]
   },
   {
    "a": "B1",
    "b": "R1-Z3u",
    "box": [
     [
      130.0,
      180.0
     ],
     [
      0,
      18
     ],
     [
      882,
      900
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     50.0,
     18,
     18
    ]
   },
   {
    "a": "B1",
    "b": "R1-Z4u",
    "box": [
     [
      450.0,
      500.0
     ],
     [
      0,
      18
     ],
     [
      882,
      900
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     50.0,
     18,
     18
    ]
   },
   {
    "a": "B1",
    "b": "M1-Z1u",
    "box": [
     [
      212.0,
      230.0
     ],
     [
      0,
      18
     ],
     [
      50.0,
      100.0
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18,
     50.0
    ]
   },
   {
    "a": "B1",
    "b": "M1-Z2u",
    "box": [
     [
      212.0,
      230.0
     ],
     [
      0,
      18
     ],
     [
      416.0,
      466.0
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18,
     50.0
    ]
   },
   {
    "a": "B1",
    "b": "M1-Z3u",
    "box": [
     [
      212.0,
      230.0
     ],
     [
      0,
      18
     ],
     [
      782.0,
      832.0
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18,
     50.0
    ]
   },
   {
    "a": "B1",
    "b": "M2-Z1u",
    "box": [
     [
      -230.0,
      -212.0
     ],
     [
      0,
      18
     ],
     [
      50.0,
      100.0
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18,
     50.0
    ]
   },
   {
    "a": "B1",
    "b": "M2-Z2u",
    "box": [
     [
      -230.0,
      -212.0
     ],
     [
      0,
      18
     ],
     [
      416.0,
      466.0
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18,
     50.0
    ]
   },
   {
    "a": "B1",
    "b": "M2-Z3u",
    "box": [
     [
      -230.0,
      -212.0
     ],
     [
      0,
      18
     ],
     [
      782.0,
      832.0
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18,
     50.0
    ]
   },
   {
    "a": "T1",
    "b": "S1-Z1o",
    "box": [
     [
      542.0,
      560.0
     ],
     [
      320,
      338
     ],
     [
      50.0,
      100.0
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18,
     50.0
    ]
   },
   {
    "a": "T1",
    "b": "S1-Z2o",
    "box": [
     [
      542.0,
      560.0
     ],
     [
      320,
      338
     ],
     [
      425.0,
      475.0
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18,
     50.0
    ]
   },
   {
    "a": "T1",
    "b": "S1-Z3o",
    "box": [
     [
      542.0,
      560.0
     ],
     [
      320,
      338
     ],
     [
      800.0,
      850.0
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18,
     50.0
    ]
   },
   {
    "a": "T1",
    "b": "S2-Z1o",
    "box": [
     [
      -560.0,
      -542.0
     ],
     [
      320,
      338
     ],
     [
      50.0,
      100.0
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18,
     50.0
    ]
   },
   {
    "a": "T1",
    "b": "S2-Z2o",
    "box": [
     [
      -560.0,
      -542.0
     ],
     [
      320,
      338
     ],
     [
      425.0,
      475.0
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18,
     50.0
    ]
   },
   {
    "a": "T1",
    "b": "S2-Z3o",
    "box": [
     [
      -560.0,
      -542.0
     ],
     [
      320,
      338
     ],
     [
      800.0,
      850.0
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18,
     50.0
    ]
   },
   {
    "a": "T1",
    "b": "R1-Z1o",
    "box": [
     [
      -500.0,
      -450.0
     ],
     [
      320,
      338
     ],
     [
      882,
      900
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     50.0,
     18,
     18
    ]
   },
   {
    "a": "T1",
    "b": "R1-Z2o",
    "box": [
     [
      -180.0,
      -130.0
     ],
     [
      320,
      338
     ],
     [
      882,
      900
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     50.0,
     18,
     18
    ]
   },
   {
    "a": "T1",
    "b": "R1-Z3o",
    "box": [
     [
      130.0,
      180.0
     ],
     [
      320,
      338
     ],
     [
      882,
      900
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     50.0,
     18,
     18
    ]
   },
   {
    "a": "T1",
    "b": "R1-Z4o",
    "box": [
     [
      450.0,
      500.0
     ],
     [
      320,
      338
     ],
     [
      882,
      900
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     50.0,
     18,
     18
    ]
   },
   {
    "a": "T1",
    "b": "M1-Z1o",
    "box": [
     [
      212.0,
      230.0
     ],
     [
      320,
      338
     ],
     [
      50.0,
      100.0
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18,
     50.0
    ]
   },
   {
    "a": "T1",
    "b": "M1-Z2o",
    "box": [
     [
      212.0,
      230.0
     ],
     [
      320,
      338
     ],
     [
      416.0,
      466.0
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18,
     50.0
    ]
   },
   {
    "a": "T1",
    "b": "M1-Z3o",
    "box": [
     [
      212.0,
      230.0
     ],
     [
      320,
      338
     ],
     [
      782.0,
      832.0
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18,
     50.0
    ]
   },
   {
    "a": "T1",
    "b": "M2-Z1o",
    "box": [
     [
      -230.0,
      -212.0
     ],
     [
      320,
      338
     ],
     [
      50.0,
      100.0
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18,
     50.0
    ]
   },
   {
    "a": "T1",
    "b": "M2-Z2o",
    "box": [
     [
      -230.0,
      -212.0
     ],
     [
      320,
      338
     ],
     [
      416.0,
      466.0
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18,
     50.0
    ]
   },
   {
    "a": "T1",
    "b": "M2-Z3o",
    "box": [
     [
      -230.0,
      -212.0
     ],
     [
      320,
      338
     ],
     [
      782.0,
      832.0
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18,
     50.0
    ]
   },
   {
    "a": "D1-F",
    "b": "E-C1-a",
    "box": [
     [
      230.0,
      249.0
     ],
     [
      50,
      94
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "gewollt": false,
    "mass": [
     19.0,
     44,
     16.5
    ]
   },
   {
    "a": "D1-F",
    "b": "E-C1-b",
    "box": [
     [
      523.0,
      542.0
     ],
     [
      50,
      94
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "gewollt": false,
    "mass": [
     19.0,
     44,
     16.5
    ]
   },
   {
    "a": "D1-F",
    "b": "E-D1-a",
    "box": [
     [
      230.0,
      249.0
     ],
     [
      201.83,
      254.83
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "gewollt": false,
    "mass": [
     19.0,
     53.0,
     16.5
    ]
   },
   {
    "a": "D1-F",
    "b": "E-D1-b",
    "box": [
     [
      523.0,
      542.0
     ],
     [
      201.83,
      254.83
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "gewollt": false,
    "mass": [
     19.0,
     53.0,
     16.5
    ]
   },
   {
    "a": "D2-F",
    "b": "E-C2-a",
    "box": [
     [
      -542.0,
      -523.0
     ],
     [
      50,
      94
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "gewollt": false,
    "mass": [
     19.0,
     44,
     16.5
    ]
   },
   {
    "a": "D2-F",
    "b": "E-C2-b",
    "box": [
     [
      -249.0,
      -230.0
     ],
     [
      50,
      94
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "gewollt": false,
    "mass": [
     19.0,
     44,
     16.5
    ]
   },
   {
    "a": "D2-F",
    "b": "E-D2-a",
    "box": [
     [
      -542.0,
      -523.0
     ],
     [
      201.83,
      254.83
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "gewollt": false,
    "mass": [
     19.0,
     53.0,
     16.5
    ]
   },
   {
    "a": "D2-F",
    "b": "E-D2-b",
    "box": [
     [
      -249.0,
      -230.0
     ],
     [
      201.83,
      254.83
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "gewollt": false,
    "mass": [
     19.0,
     53.0,
     16.5
    ]
   },
   {
    "a": "D3-F",
    "b": "C3",
    "box": [
     [
      -192.0,
      192.0
     ],
     [
      283,
      286
     ],
     [
      -1.5,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "gewollt": false,
    "mass": [
     384.0,
     3,
     18.0
    ]
   },
   {
    "a": "D3-F",
    "b": "E-D3-a",
    "box": [
     [
      -212.0,
      -193.0
     ],
     [
      78.17,
      131.17
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "gewollt": false,
    "mass": [
     19.0,
     53.0,
     16.5
    ]
   },
   {
    "a": "D3-F",
    "b": "E-D3-b",
    "box": [
     [
      193.0,
      212.0
     ],
     [
      78.17,
      131.17
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "gewollt": false,
    "mass": [
     19.0,
     53.0,
     16.5
    ]
   },
   {
    "a": "D3-F",
    "b": "E-C3-a",
    "box": [
     [
      -212.0,
      -193.0
     ],
     [
      239,
      286
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "gewollt": false,
    "mass": [
     19.0,
     47,
     16.5
    ]
   },
   {
    "a": "D3-F",
    "b": "E-C3-b",
    "box": [
     [
      193.0,
      212.0
     ],
     [
      239,
      286
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "gewollt": false,
    "mass": [
     19.0,
     47,
     16.5
    ]
   },
   {
    "a": "H1-1",
    "b": "G1",
    "box": [
     [
      -440.0,
      -380.0
     ],
     [
      338,
      344
     ],
     [
      870.0,
      930.0
     ]
    ],
    "kategorie": "auflage",
    "gewollt": true,
    "mass": [
     60.0,
     6,
     60.0
    ]
   },
   {
    "a": "H1-2",
    "b": "G1",
    "box": [
     [
      -30.0,
      30.0
     ],
     [
      338,
      344
     ],
     [
      870.0,
      930.0
     ]
    ],
    "kategorie": "auflage",
    "gewollt": true,
    "mass": [
     60.0,
     6,
     60.0
    ]
   },
   {
    "a": "H1-3",
    "b": "G1",
    "box": [
     [
      380.0,
      440.0
     ],
     [
      338,
      344
     ],
     [
      870.0,
      930.0
     ]
    ],
    "kategorie": "auflage",
    "gewollt": true,
    "mass": [
     60.0,
     6,
     60.0
    ]
   }
  ],
  "stumpf": [
   {
    "a": "D1-F",
    "b": "E-C1-a",
    "box": [
     [
      230.0,
      249.0
     ],
     [
      50,
      94
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "gewollt": false,
    "mass": [
     19.0,
     44,
     16.5
    ]
   },
   {
    "a": "D1-F",
    "b": "E-C1-b",
    "box": [
     [
      523.0,
      542.0
     ],
     [
      50,
      94
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "gewollt": false,
    "mass": [
     19.0,
     44,
     16.5
    ]
   },
   {
    "a": "D1-F",
    "b": "E-D1-a",
    "box": [
     [
      230.0,
      249.0
     ],
     [
      201.83,
      254.83
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "gewollt": false,
    "mass": [
     19.0,
     53.0,
     16.5
    ]
   },
   {
    "a": "D1-F",
    "b": "E-D1-b",
    "box": [
     [
      523.0,
      542.0
     ],
     [
      201.83,
      254.83
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "gewollt": false,
    "mass": [
     19.0,
     53.0,
     16.5
    ]
   },
   {
    "a": "D2-F",
    "b": "E-C2-a",
    "box": [
     [
      -542.0,
      -523.0
     ],
     [
      50,
      94
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "gewollt": false,
    "mass": [
     19.0,
     44,
     16.5
    ]
   },
   {
    "a": "D2-F",
    "b": "E-C2-b",
    "box": [
     [
      -249.0,
      -230.0
     ],
     [
      50,
      94
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "gewollt": false,
    "mass": [
     19.0,
     44,
     16.5
    ]
   },
   {
    "a": "D2-F",
    "b": "E-D2-a",
    "box": [
     [
      -542.0,
      -523.0
     ],
     [
      201.83,
      254.83
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "gewollt": false,
    "mass": [
     19.0,
     53.0,
     16.5
    ]
   },
   {
    "a": "D2-F",
    "b": "E-D2-b",
    "box": [
     [
      -249.0,
      -230.0
     ],
     [
      201.83,
      254.83
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "gewollt": false,
    "mass": [
     19.0,
     53.0,
     16.5
    ]
   },
   {
    "a": "D3-F",
    "b": "C3",
    "box": [
     [
      -192.0,
      192.0
     ],
     [
      283,
      286
     ],
     [
      -1.5,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "gewollt": false,
    "mass": [
     384.0,
     3,
     18.0
    ]
   },
   {
    "a": "D3-F",
    "b": "E-D3-a",
    "box": [
     [
      -212.0,
      -193.0
     ],
     [
      78.17,
      131.17
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "gewollt": false,
    "mass": [
     19.0,
     53.0,
     16.5
    ]
   },
   {
    "a": "D3-F",
    "b": "E-D3-b",
    "box": [
     [
      193.0,
      212.0
     ],
     [
      78.17,
      131.17
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "gewollt": false,
    "mass": [
     19.0,
     53.0,
     16.5
    ]
   },
   {
    "a": "D3-F",
    "b": "E-C3-a",
    "box": [
     [
      -212.0,
      -193.0
     ],
     [
      239,
      286
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "gewollt": false,
    "mass": [
     19.0,
     47,
     16.5
    ]
   },
   {
    "a": "D3-F",
    "b": "E-C3-b",
    "box": [
     [
      193.0,
      212.0
     ],
     [
      239,
      286
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "gewollt": false,
    "mass": [
     19.0,
     47,
     16.5
    ]
   },
   {
    "a": "H1-1",
    "b": "G1",
    "box": [
     [
      -440.0,
      -380.0
     ],
     [
      338,
      344
     ],
     [
      870.0,
      930.0
     ]
    ],
    "kategorie": "auflage",
    "gewollt": true,
    "mass": [
     60.0,
     6,
     60.0
    ]
   },
   {
    "a": "H1-2",
    "b": "G1",
    "box": [
     [
      -30.0,
      30.0
     ],
     [
      338,
      344
     ],
     [
      870.0,
      930.0
     ]
    ],
    "kategorie": "auflage",
    "gewollt": true,
    "mass": [
     60.0,
     6,
     60.0
    ]
   },
   {
    "a": "H1-3",
    "b": "G1",
    "box": [
     [
      380.0,
      440.0
     ],
     [
      338,
      344
     ],
     [
      870.0,
      930.0
     ]
    ],
    "kategorie": "auflage",
    "gewollt": true,
    "mass": [
     60.0,
     6,
     60.0
    ]
   }
  ]
 },
 "kollisionen": [
  {
   "a": "R1",
   "b": "M1-Zh",
   "box": [
    [
     212.0,
     230.0
    ],
    [
     144.0,
     194.0
    ],
    [
     882,
     900
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    50.0,
    18
   ]
  },
  {
   "a": "R1",
   "b": "M2-Zh",
   "box": [
    [
     -230.0,
     -212.0
    ],
    [
     144.0,
     194.0
    ],
    [
     882,
     900
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    50.0,
    18
   ]
  },
  {
   "a": "B1",
   "b": "S1-Z1u",
   "box": [
    [
     542.0,
     560.0
    ],
    [
     0,
     18
    ],
    [
     50.0,
     100.0
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18,
    50.0
   ]
  },
  {
   "a": "B1",
   "b": "S1-Z2u",
   "box": [
    [
     542.0,
     560.0
    ],
    [
     0,
     18
    ],
    [
     425.0,
     475.0
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18,
    50.0
   ]
  },
  {
   "a": "B1",
   "b": "S1-Z3u",
   "box": [
    [
     542.0,
     560.0
    ],
    [
     0,
     18
    ],
    [
     800.0,
     850.0
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18,
    50.0
   ]
  },
  {
   "a": "B1",
   "b": "S2-Z1u",
   "box": [
    [
     -560.0,
     -542.0
    ],
    [
     0,
     18
    ],
    [
     50.0,
     100.0
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18,
    50.0
   ]
  },
  {
   "a": "B1",
   "b": "S2-Z2u",
   "box": [
    [
     -560.0,
     -542.0
    ],
    [
     0,
     18
    ],
    [
     425.0,
     475.0
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18,
    50.0
   ]
  },
  {
   "a": "B1",
   "b": "S2-Z3u",
   "box": [
    [
     -560.0,
     -542.0
    ],
    [
     0,
     18
    ],
    [
     800.0,
     850.0
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18,
    50.0
   ]
  },
  {
   "a": "B1",
   "b": "R1-Z1u",
   "box": [
    [
     -500.0,
     -450.0
    ],
    [
     0,
     18
    ],
    [
     882,
     900
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    50.0,
    18,
    18
   ]
  },
  {
   "a": "B1",
   "b": "R1-Z2u",
   "box": [
    [
     -180.0,
     -130.0
    ],
    [
     0,
     18
    ],
    [
     882,
     900
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    50.0,
    18,
    18
   ]
  },
  {
   "a": "B1",
   "b": "R1-Z3u",
   "box": [
    [
     130.0,
     180.0
    ],
    [
     0,
     18
    ],
    [
     882,
     900
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    50.0,
    18,
    18
   ]
  },
  {
   "a": "B1",
   "b": "R1-Z4u",
   "box": [
    [
     450.0,
     500.0
    ],
    [
     0,
     18
    ],
    [
     882,
     900
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    50.0,
    18,
    18
   ]
  },
  {
   "a": "B1",
   "b": "M1-Z1u",
   "box": [
    [
     212.0,
     230.0
    ],
    [
     0,
     18
    ],
    [
     50.0,
     100.0
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18,
    50.0
   ]
  },
  {
   "a": "B1",
   "b": "M1-Z2u",
   "box": [
    [
     212.0,
     230.0
    ],
    [
     0,
     18
    ],
    [
     416.0,
     466.0
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18,
    50.0
   ]
  },
  {
   "a": "B1",
   "b": "M1-Z3u",
   "box": [
    [
     212.0,
     230.0
    ],
    [
     0,
     18
    ],
    [
     782.0,
     832.0
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18,
    50.0
   ]
  },
  {
   "a": "B1",
   "b": "M2-Z1u",
   "box": [
    [
     -230.0,
     -212.0
    ],
    [
     0,
     18
    ],
    [
     50.0,
     100.0
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18,
    50.0
   ]
  },
  {
   "a": "B1",
   "b": "M2-Z2u",
   "box": [
    [
     -230.0,
     -212.0
    ],
    [
     0,
     18
    ],
    [
     416.0,
     466.0
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18,
    50.0
   ]
  },
  {
   "a": "B1",
   "b": "M2-Z3u",
   "box": [
    [
     -230.0,
     -212.0
    ],
    [
     0,
     18
    ],
    [
     782.0,
     832.0
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18,
    50.0
   ]
  },
  {
   "a": "T1",
   "b": "S1-Z1o",
   "box": [
    [
     542.0,
     560.0
    ],
    [
     320,
     338
    ],
    [
     50.0,
     100.0
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18,
    50.0
   ]
  },
  {
   "a": "T1",
   "b": "S1-Z2o",
   "box": [
    [
     542.0,
     560.0
    ],
    [
     320,
     338
    ],
    [
     425.0,
     475.0
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18,
    50.0
   ]
  },
  {
   "a": "T1",
   "b": "S1-Z3o",
   "box": [
    [
     542.0,
     560.0
    ],
    [
     320,
     338
    ],
    [
     800.0,
     850.0
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18,
    50.0
   ]
  },
  {
   "a": "T1",
   "b": "S2-Z1o",
   "box": [
    [
     -560.0,
     -542.0
    ],
    [
     320,
     338
    ],
    [
     50.0,
     100.0
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18,
    50.0
   ]
  },
  {
   "a": "T1",
   "b": "S2-Z2o",
   "box": [
    [
     -560.0,
     -542.0
    ],
    [
     320,
     338
    ],
    [
     425.0,
     475.0
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18,
    50.0
   ]
  },
  {
   "a": "T1",
   "b": "S2-Z3o",
   "box": [
    [
     -560.0,
     -542.0
    ],
    [
     320,
     338
    ],
    [
     800.0,
     850.0
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18,
    50.0
   ]
  },
  {
   "a": "T1",
   "b": "R1-Z1o",
   "box": [
    [
     -500.0,
     -450.0
    ],
    [
     320,
     338
    ],
    [
     882,
     900
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    50.0,
    18,
    18
   ]
  },
  {
   "a": "T1",
   "b": "R1-Z2o",
   "box": [
    [
     -180.0,
     -130.0
    ],
    [
     320,
     338
    ],
    [
     882,
     900
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    50.0,
    18,
    18
   ]
  },
  {
   "a": "T1",
   "b": "R1-Z3o",
   "box": [
    [
     130.0,
     180.0
    ],
    [
     320,
     338
    ],
    [
     882,
     900
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    50.0,
    18,
    18
   ]
  },
  {
   "a": "T1",
   "b": "R1-Z4o",
   "box": [
    [
     450.0,
     500.0
    ],
    [
     320,
     338
    ],
    [
     882,
     900
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    50.0,
    18,
    18
   ]
  },
  {
   "a": "T1",
   "b": "M1-Z1o",
   "box": [
    [
     212.0,
     230.0
    ],
    [
     320,
     338
    ],
    [
     50.0,
     100.0
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18,
    50.0
   ]
  },
  {
   "a": "T1",
   "b": "M1-Z2o",
   "box": [
    [
     212.0,
     230.0
    ],
    [
     320,
     338
    ],
    [
     416.0,
     466.0
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18,
    50.0
   ]
  },
  {
   "a": "T1",
   "b": "M1-Z3o",
   "box": [
    [
     212.0,
     230.0
    ],
    [
     320,
     338
    ],
    [
     782.0,
     832.0
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18,
    50.0
   ]
  },
  {
   "a": "T1",
   "b": "M2-Z1o",
   "box": [
    [
     -230.0,
     -212.0
    ],
    [
     320,
     338
    ],
    [
     50.0,
     100.0
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18,
    50.0
   ]
  },
  {
   "a": "T1",
   "b": "M2-Z2o",
   "box": [
    [
     -230.0,
     -212.0
    ],
    [
     320,
     338
    ],
    [
     416.0,
     466.0
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18,
    50.0
   ]
  },
  {
   "a": "T1",
   "b": "M2-Z3o",
   "box": [
    [
     -230.0,
     -212.0
    ],
    [
     320,
     338
    ],
    [
     782.0,
     832.0
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18,
    50.0
   ]
  },
  {
   "a": "D1-F",
   "b": "E-C1-a",
   "box": [
    [
     230.0,
     249.0
    ],
    [
     50,
     94
    ],
    [
     0,
     16.5
    ]
   ],
   "kategorie": "frontblende",
   "gewollt": false,
   "mass": [
    19.0,
    44,
    16.5
   ]
  },
  {
   "a": "D1-F",
   "b": "E-C1-b",
   "box": [
    [
     523.0,
     542.0
    ],
    [
     50,
     94
    ],
    [
     0,
     16.5
    ]
   ],
   "kategorie": "frontblende",
   "gewollt": false,
   "mass": [
    19.0,
    44,
    16.5
   ]
  },
  {
   "a": "D1-F",
   "b": "E-D1-a",
   "box": [
    [
     230.0,
     249.0
    ],
    [
     201.83,
     254.83
    ],
    [
     0,
     16.5
    ]
   ],
   "kategorie": "frontblende",
   "gewollt": false,
   "mass": [
    19.0,
    53.0,
    16.5
   ]
  },
  {
   "a": "D1-F",
   "b": "E-D1-b",
   "box": [
    [
     523.0,
     542.0
    ],
    [
     201.83,
     254.83
    ],
    [
     0,
     16.5
    ]
   ],
   "kategorie": "frontblende",
   "gewollt": false,
   "mass": [
    19.0,
    53.0,
    16.5
   ]
  },
  {
   "a": "D2-F",
   "b": "E-C2-a",
   "box": [
    [
     -542.0,
     -523.0
    ],
    [
     50,
     94
    ],
    [
     0,
     16.5
    ]
   ],
   "kategorie": "frontblende",
   "gewollt": false,
   "mass": [
    19.0,
    44,
    16.5
   ]
  },
  {
   "a": "D2-F",
   "b": "E-C2-b",
   "box": [
    [
     -249.0,
     -230.0
    ],
    [
     50,
     94
    ],
    [
     0,
     16.5
    ]
   ],
   "kategorie": "frontblende",
   "gewollt": false,
   "mass": [
    19.0,
    44,
    16.5
   ]
  },
  {
   "a": "D2-F",
   "b": "E-D2-a",
   "box": [
    [
     -542.0,
     -523.0
    ],
    [
     201.83,
     254.83
    ],
    [
     0,
     16.5
    ]
   ],
   "kategorie": "frontblende",
   "gewollt": false,
   "mass": [
    19.0,
    53.0,
    16.5
   ]
  },
  {
   "a": "D2-F",
   "b": "E-D2-b",
   "box": [
    [
     -249.0,
     -230.0
    ],
    [
     201.83,
     254.83
    ],
    [
     0,
     16.5
    ]
   ],
   "kategorie": "frontblende",
   "gewollt": false,
   "mass": [
    19.0,
    53.0,
    16.5
   ]
  },
  {
   "a": "D3-F",
   "b": "C3",
   "box": [
    [
     -192.0,
     192.0
    ],
    [
     283,
     286
    ],
    [
     -1.5,
     16.5
    ]
   ],
   "kategorie": "frontblende",
   "gewollt": false,
   "mass": [
    384.0,
    3,
    18.0
   ]
  },
  {
   "a": "D3-F",
   "b": "E-D3-a",
   "box": [
    [
     -212.0,
     -193.0
    ],
    [
     78.17,
     131.17
    ],
    [
     0,
     16.5
    ]
   ],
   "kategorie": "frontblende",
   "gewollt": false,
   "mass": [
    19.0,
    53.0,
    16.5
   ]
  },
  {
   "a": "D3-F",
   "b": "E-D3-b",
   "box": [
    [
     193.0,
     212.0
    ],
    [
     78.17,
     131.17
    ],
    [
     0,
     16.5
    ]
   ],
   "kategorie": "frontblende",
   "gewollt": false,
   "mass": [
    19.0,
    53.0,
    16.5
   ]
  },
  {
   "a": "D3-F",
   "b": "E-C3-a",
   "box": [
    [
     -212.0,
     -193.0
    ],
    [
     239,
     286
    ],
    [
     0,
     16.5
    ]
   ],
   "kategorie": "frontblende",
   "gewollt": false,
   "mass": [
    19.0,
    47,
    16.5
   ]
  },
  {
   "a": "D3-F",
   "b": "E-C3-b",
   "box": [
    [
     193.0,
     212.0
    ],
    [
     239,
     286
    ],
    [
     0,
     16.5
    ]
   ],
   "kategorie": "frontblende",
   "gewollt": false,
   "mass": [
    19.0,
    47,
    16.5
   ]
  },
  {
   "a": "H1-1",
   "b": "G1",
   "box": [
    [
     -440.0,
     -380.0
    ],
    [
     338,
     344
    ],
    [
     870.0,
     930.0
    ]
   ],
   "kategorie": "auflage",
   "gewollt": true,
   "mass": [
    60.0,
    6,
    60.0
   ]
  },
  {
   "a": "H1-2",
   "b": "G1",
   "box": [
    [
     -30.0,
     30.0
    ],
    [
     338,
     344
    ],
    [
     870.0,
     930.0
    ]
   ],
   "kategorie": "auflage",
   "gewollt": true,
   "mass": [
    60.0,
    6,
    60.0
   ]
  },
  {
   "a": "H1-3",
   "b": "G1",
   "box": [
    [
     380.0,
     440.0
    ],
    [
     338,
     344
    ],
    [
     870.0,
     930.0
    ]
   ],
   "kategorie": "auflage",
   "gewollt": true,
   "mass": [
    60.0,
    6,
    60.0
   ]
  }
 ],
 "fahrzeug_pruefung": [
  {
   "was": "Korpusbreite zwischen den Radkästen",
   "plan": 1120,
   "fahrzeug": "1130–1140",
   "ergebnis": "10–20 mm Spiel (bewusst nicht genutzt)",
   "status": "ok"
  },
  {
   "was": "Korpustiefe Heckklappe → Rücksitze",
   "plan": 900,
   "fahrzeug": "920–930",
   "ergebnis": "20–30 mm Luft zu den Rücksitzen",
   "status": "ok"
  },
  {
   "was": "Liegefläche T1 + F1 + F2 bis zu den Kopfstützen",
   "plan": 2000,
   "fahrzeug": 2000,
   "ergebnis": "0 mm Luft",
   "status": "knapp"
  },
  {
   "was": "Unterkante F1 über umgeklappten Rücksitzlehnen",
   "plan": 320,
   "fahrzeug": 310,
   "ergebnis": "10 mm Spalt — unter F1 ausgleichen (§H4)",
   "status": "anpassen"
  }
 ],
 "klappachsen": {
  "F1": {
   "y": 341,
   "z": 900,
   "winkel": -180
  },
  "F2": {
   "y": 317,
   "z": 1600,
   "winkel": 180,
   "an": "F1"
  }
 }
};

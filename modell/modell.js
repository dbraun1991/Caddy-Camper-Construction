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
   "sektion_mitte_innen": 424,
   "nut_tiefe": 6,
   "_nut_tiefe": "Nennwert für Modell und Zeichnungen. Real 6–9 mm je nach Werkzeug (max. halbe Plattenstärke, nie durch); Wände nach dem Fräsen auf 302 + 2 × gemessene Nuttiefe ablängen"
  },
  "liegeflaeche": {
   "laenge_a2": 700,
   "laenge_a3": 400
  },
  "matratze": {
   "breite": 1100,
   "laenge": 1980,
   "hoehe": 80
  },
  "scharniere": {
   "_hinweis": "Standard-Klappscharniere (aufgeschraubt). A1↔A2 oben, A2↔A3 unten — so klappen A2 und A3 als Stapel auf die Box (ADR 0019)",
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
   "_staerke": "Stärke je Seite bei beiden Typen noch am Produkt prüfen — die Elementbreiten hängen davon ab",
   "zuordnung": {
    "C1": "schwer",
    "C2": "schwer",
    "C3": "leicht",
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
  "eckausbildung": "genutet",
  "_eckausbildung_werte": "Boden F1 und Deckel A1 laufen immer durch (ADR 0018). genutet = Wände stecken nut_tiefe in Falz/Nut von F1 und A1 · stumpf = Wände 302 mm, stumpf zwischen F1 und A1"
 },
 "eckausbildung": "genutet",
 "teile": [
  {
   "id": "B2-F",
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
     12,
     326
    ],
    [
     0,
     900
    ]
   ],
   "steckt_in": [
    "F1",
    "A1"
   ]
  },
  {
   "id": "B2-B",
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
     12,
     326
    ],
    [
     0,
     900
    ]
   ],
   "steckt_in": [
    "F1",
    "A1"
   ]
  },
  {
   "id": "B1",
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
     12,
     326
    ],
    [
     882,
     900
    ]
   ],
   "steckt_in": [
    "F1",
    "A1"
   ]
  },
  {
   "id": "F1",
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
   "id": "B3-1",
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
     12,
     326
    ],
    [
     0,
     882
    ]
   ],
   "steckt_in": [
    "F1",
    "A1"
   ]
  },
  {
   "id": "B3-2",
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
     12,
     326
    ],
    [
     0,
     882
    ]
   ],
   "steckt_in": [
    "F1",
    "A1"
   ]
  },
  {
   "id": "A1",
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
   "name": "Schiene Tischbrett Mitte, an Trennwand rechts · AOLISHENG 850 mm · 80 kg",
   "gruppe": "schiene",
   "material": "schiene",
   "faehrt": "bretter",
   "box": [
    [
     -212.0,
     -193.0
    ],
    [
     262,
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
   "name": "Schiene Tischbrett Mitte, an Trennwand links · AOLISHENG 850 mm · 80 kg",
   "gruppe": "schiene",
   "material": "schiene",
   "faehrt": "bretter",
   "box": [
    [
     193.0,
     212.0
    ],
    [
     262,
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
   "id": "S1-1",
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
   "id": "S2-1",
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
   "klappt_mit": "A2"
  },
  {
   "id": "S1-2",
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
   "id": "S2-2",
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
   "klappt_mit": "A2"
  },
  {
   "id": "S1-3",
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
   "id": "S2-3",
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
   "klappt_mit": "A2"
  },
  {
   "id": "A2",
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
   "id": "A3",
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
  "nut": "Nut/Falz: Wand in Bodenplatte F1 / Deckplatte A1 (gewollt)",
  "eckverbindung": "Eckausbildung Korpus — welche Platte läuft durch?",
  "rueckwand": "Rückwand B1 ragt in Schienen/Elemente (lichte Tiefe < Schienenlänge)",
  "frontblende": "Schubladenfront überdeckt Schienen bzw. Nachbarelement",
  "auflage": "Matratze liegt auf den Scharnieren (weich, unkritisch)",
  "sonstige": "Sonstige Überschneidung"
 },
 "gruppen": {
  "A": "Liegefläche (waagerecht oben)",
  "B": "Wände (senkrecht)",
  "F": "Fußboden (waagerecht unten)",
  "C": "Auszugbretter",
  "D": "Schubladen",
  "E": "Schienen",
  "V": "Verbindungsmittel & Beschläge",
  "G": "Ausstattung",
  "S": "Scharniere"
 },
 "varianten": {
  "genutet": [
   {
    "a": "B2-F",
    "b": "F1",
    "box": [
     [
      542.0,
      560.0
     ],
     [
      12,
      18
     ],
     [
      0,
      900
     ]
    ],
    "kategorie": "nut",
    "gewollt": true,
    "mass": [
     18.0,
     6,
     900
    ]
   },
   {
    "a": "B2-F",
    "b": "A1",
    "box": [
     [
      542.0,
      560.0
     ],
     [
      320,
      326
     ],
     [
      0,
      900
     ]
    ],
    "kategorie": "nut",
    "gewollt": true,
    "mass": [
     18.0,
     6,
     900
    ]
   },
   {
    "a": "B2-B",
    "b": "F1",
    "box": [
     [
      -560.0,
      -542.0
     ],
     [
      12,
      18
     ],
     [
      0,
      900
     ]
    ],
    "kategorie": "nut",
    "gewollt": true,
    "mass": [
     18.0,
     6,
     900
    ]
   },
   {
    "a": "B2-B",
    "b": "A1",
    "box": [
     [
      -560.0,
      -542.0
     ],
     [
      320,
      326
     ],
     [
      0,
      900
     ]
    ],
    "kategorie": "nut",
    "gewollt": true,
    "mass": [
     18.0,
     6,
     900
    ]
   },
   {
    "a": "B1",
    "b": "F1",
    "box": [
     [
      -542.0,
      542.0
     ],
     [
      12,
      18
     ],
     [
      882,
      900
     ]
    ],
    "kategorie": "nut",
    "gewollt": true,
    "mass": [
     1084.0,
     6,
     18
    ]
   },
   {
    "a": "B1",
    "b": "A1",
    "box": [
     [
      -542.0,
      542.0
     ],
     [
      320,
      326
     ],
     [
      882,
      900
     ]
    ],
    "kategorie": "nut",
    "gewollt": true,
    "mass": [
     1084.0,
     6,
     18
    ]
   },
   {
    "a": "F1",
    "b": "B3-1",
    "box": [
     [
      212.0,
      230.0
     ],
     [
      12,
      18
     ],
     [
      0,
      882
     ]
    ],
    "kategorie": "nut",
    "gewollt": true,
    "mass": [
     18.0,
     6,
     882
    ]
   },
   {
    "a": "F1",
    "b": "B3-2",
    "box": [
     [
      -230.0,
      -212.0
     ],
     [
      12,
      18
     ],
     [
      0,
      882
     ]
    ],
    "kategorie": "nut",
    "gewollt": true,
    "mass": [
     18.0,
     6,
     882
    ]
   },
   {
    "a": "B3-1",
    "b": "A1",
    "box": [
     [
      212.0,
      230.0
     ],
     [
      320,
      326
     ],
     [
      0,
      882
     ]
    ],
    "kategorie": "nut",
    "gewollt": true,
    "mass": [
     18.0,
     6,
     882
    ]
   },
   {
    "a": "B3-2",
    "b": "A1",
    "box": [
     [
      -230.0,
      -212.0
     ],
     [
      320,
      326
     ],
     [
      0,
      882
     ]
    ],
    "kategorie": "nut",
    "gewollt": true,
    "mass": [
     18.0,
     6,
     882
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
      262,
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
     24,
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
      262,
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
     24,
     16.5
    ]
   },
   {
    "a": "S1-1",
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
    "a": "S1-2",
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
    "a": "S1-3",
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
      262,
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
     24,
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
      262,
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
     24,
     16.5
    ]
   },
   {
    "a": "S1-1",
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
    "a": "S1-2",
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
    "a": "S1-3",
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
   "a": "B2-F",
   "b": "F1",
   "box": [
    [
     542.0,
     560.0
    ],
    [
     12,
     18
    ],
    [
     0,
     900
    ]
   ],
   "kategorie": "nut",
   "gewollt": true,
   "mass": [
    18.0,
    6,
    900
   ]
  },
  {
   "a": "B2-F",
   "b": "A1",
   "box": [
    [
     542.0,
     560.0
    ],
    [
     320,
     326
    ],
    [
     0,
     900
    ]
   ],
   "kategorie": "nut",
   "gewollt": true,
   "mass": [
    18.0,
    6,
    900
   ]
  },
  {
   "a": "B2-B",
   "b": "F1",
   "box": [
    [
     -560.0,
     -542.0
    ],
    [
     12,
     18
    ],
    [
     0,
     900
    ]
   ],
   "kategorie": "nut",
   "gewollt": true,
   "mass": [
    18.0,
    6,
    900
   ]
  },
  {
   "a": "B2-B",
   "b": "A1",
   "box": [
    [
     -560.0,
     -542.0
    ],
    [
     320,
     326
    ],
    [
     0,
     900
    ]
   ],
   "kategorie": "nut",
   "gewollt": true,
   "mass": [
    18.0,
    6,
    900
   ]
  },
  {
   "a": "B1",
   "b": "F1",
   "box": [
    [
     -542.0,
     542.0
    ],
    [
     12,
     18
    ],
    [
     882,
     900
    ]
   ],
   "kategorie": "nut",
   "gewollt": true,
   "mass": [
    1084.0,
    6,
    18
   ]
  },
  {
   "a": "B1",
   "b": "A1",
   "box": [
    [
     -542.0,
     542.0
    ],
    [
     320,
     326
    ],
    [
     882,
     900
    ]
   ],
   "kategorie": "nut",
   "gewollt": true,
   "mass": [
    1084.0,
    6,
    18
   ]
  },
  {
   "a": "F1",
   "b": "B3-1",
   "box": [
    [
     212.0,
     230.0
    ],
    [
     12,
     18
    ],
    [
     0,
     882
    ]
   ],
   "kategorie": "nut",
   "gewollt": true,
   "mass": [
    18.0,
    6,
    882
   ]
  },
  {
   "a": "F1",
   "b": "B3-2",
   "box": [
    [
     -230.0,
     -212.0
    ],
    [
     12,
     18
    ],
    [
     0,
     882
    ]
   ],
   "kategorie": "nut",
   "gewollt": true,
   "mass": [
    18.0,
    6,
    882
   ]
  },
  {
   "a": "B3-1",
   "b": "A1",
   "box": [
    [
     212.0,
     230.0
    ],
    [
     320,
     326
    ],
    [
     0,
     882
    ]
   ],
   "kategorie": "nut",
   "gewollt": true,
   "mass": [
    18.0,
    6,
    882
   ]
  },
  {
   "a": "B3-2",
   "b": "A1",
   "box": [
    [
     -230.0,
     -212.0
    ],
    [
     320,
     326
    ],
    [
     0,
     882
    ]
   ],
   "kategorie": "nut",
   "gewollt": true,
   "mass": [
    18.0,
    6,
    882
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
     262,
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
    24,
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
     262,
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
    24,
    16.5
   ]
  },
  {
   "a": "S1-1",
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
   "a": "S1-2",
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
   "a": "S1-3",
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
   "was": "Liegefläche A1 + A2 + A3 bis zu den Kopfstützen",
   "plan": 2000,
   "fahrzeug": 2000,
   "ergebnis": "0 mm Luft",
   "status": "knapp"
  },
  {
   "was": "Unterkante A2 über umgeklappten Rücksitzlehnen",
   "plan": 320,
   "fahrzeug": 310,
   "ergebnis": "10 mm Spalt — unter A2 ausgleichen (§H4)",
   "status": "anpassen"
  }
 ],
 "klappachsen": {
  "A2": {
   "y": 341,
   "z": 900,
   "winkel": -180
  },
  "A3": {
   "y": 317,
   "z": 1600,
   "winkel": 180,
   "an": "A2"
  }
 }
};

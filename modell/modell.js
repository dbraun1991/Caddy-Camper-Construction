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
  "liegeflaeche": {
   "laenge_a2": 700,
   "laenge_a3": 400
  },
  "matratze": {
   "breite": 1100,
   "laenge": 1980,
   "hoehe": 80
  },
  "schienen": {
   "staerke": 19,
   "hoehe": 76,
   "laenge": 900
  },
  "elemente": {
   "brett_hoehe": 32,
   "spalt_hoehe": 5,
   "spiel_seitlich": 1,
   "vorstand_front": 1.5,
   "kasten_tiefe": 880,
   "blende_staerke": 18,
   "blende_hoehe": 268
  },
  "fahrzeug": {
   "_stand": "Am eigenen Fahrzeug nachgemessen am 2026-10-17. Alles andere an der Caddy-Hülle in index.html bleibt Platzhalter.",
   "ladebreite_radkaesten": 1120,
   "ladetiefe_min": 920,
   "ladetiefe_max": 930,
   "ruecksitzlehne_hoehe": 310,
   "laenge_heck_bis_kopfstuetzen": 2000,
   "heckklappe_passt": true,
   "ladekante": 0
  },
  "eckausbildung": "stueckliste",
  "_eckausbildung_werte": "stueckliste = Maße wie in List_of_Materials.md (B2/B3 320 hoch, B1/B4 1.120 breit, ungeklärte Überschneidung) · boden_durchlaufend = B4 durchgehend, Wände stehen darauf · seiten_durchlaufend = B2 bis zum Ladeboden, B4 und B1 dazwischen"
 },
 "eckausbildung": "stueckliste",
 "teile": [
  {
   "id": "B2-F",
   "name": "Seitenwand Fahrerseite",
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
     320
    ],
    [
     0,
     900
    ]
   ]
  },
  {
   "id": "B2-B",
   "name": "Seitenwand Beifahrerseite",
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
     320
    ],
    [
     0,
     900
    ]
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
     -560.0,
     560.0
    ],
    [
     0,
     320
    ],
    [
     882,
     900
    ]
   ]
  },
  {
   "id": "B4",
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
   "name": "Trennwand 1",
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
     320
    ],
    [
     0,
     900
    ]
   ]
  },
  {
   "id": "B3-2",
   "name": "Trennwand 2",
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
     320
    ],
    [
     0,
     900
    ]
   ]
  },
  {
   "id": "A1",
   "name": "Unterbau-Deckel",
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
   "name": "Sitz-Brett L",
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
     898.5
    ]
   ]
  },
  {
   "id": "D1",
   "name": "Schublade L — Kasten",
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
     896.5
    ]
   ]
  },
  {
   "id": "D1-F",
   "name": "Schublade L — Frontblende",
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
   "id": "E-C1-a",
   "name": "Schiene C1 (−x)",
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
     900
    ]
   ],
   "richtung": 1
  },
  {
   "id": "E-C1-b",
   "name": "Schiene C1 (+x)",
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
     900
    ]
   ],
   "richtung": -1
  },
  {
   "id": "E-D1-a",
   "name": "Schiene D1 (−x)",
   "gruppe": "schiene",
   "material": "schiene",
   "faehrt": "schubladen",
   "box": [
    [
     -542.0,
     -523.0
    ],
    [
     190.33,
     266.33
    ],
    [
     0,
     900
    ]
   ],
   "richtung": 1
  },
  {
   "id": "E-D1-b",
   "name": "Schiene D1 (+x)",
   "gruppe": "schiene",
   "material": "schiene",
   "faehrt": "schubladen",
   "box": [
    [
     -249.0,
     -230.0
    ],
    [
     190.33,
     266.33
    ],
    [
     0,
     900
    ]
   ],
   "richtung": -1
  },
  {
   "id": "C2",
   "name": "Sitz-Brett R",
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
     898.5
    ]
   ]
  },
  {
   "id": "D2",
   "name": "Schublade R — Kasten",
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
     896.5
    ]
   ]
  },
  {
   "id": "D2-F",
   "name": "Schublade R — Frontblende",
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
   "id": "E-C2-a",
   "name": "Schiene C2 (−x)",
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
     900
    ]
   ],
   "richtung": 1
  },
  {
   "id": "E-C2-b",
   "name": "Schiene C2 (+x)",
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
     900
    ]
   ],
   "richtung": -1
  },
  {
   "id": "E-D2-a",
   "name": "Schiene D2 (−x)",
   "gruppe": "schiene",
   "material": "schiene",
   "faehrt": "schubladen",
   "box": [
    [
     230.0,
     249.0
    ],
    [
     190.33,
     266.33
    ],
    [
     0,
     900
    ]
   ],
   "richtung": 1
  },
  {
   "id": "E-D2-b",
   "name": "Schiene D2 (+x)",
   "gruppe": "schiene",
   "material": "schiene",
   "faehrt": "schubladen",
   "box": [
    [
     523.0,
     542.0
    ],
    [
     190.33,
     266.33
    ],
    [
     0,
     900
    ]
   ],
   "richtung": -1
  },
  {
   "id": "D3",
   "name": "Schublade M — Kasten",
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
     896.5
    ]
   ]
  },
  {
   "id": "D3-F",
   "name": "Schublade M — Frontblende",
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
   "name": "Tisch-Brett M",
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
     898.5
    ]
   ]
  },
  {
   "id": "E-D3-a",
   "name": "Schiene D3 (−x)",
   "gruppe": "schiene",
   "material": "schiene",
   "faehrt": "schubladen",
   "box": [
    [
     -212.0,
     -193.0
    ],
    [
     66.67,
     142.67
    ],
    [
     0,
     900
    ]
   ],
   "richtung": 1
  },
  {
   "id": "E-D3-b",
   "name": "Schiene D3 (+x)",
   "gruppe": "schiene",
   "material": "schiene",
   "faehrt": "schubladen",
   "box": [
    [
     193.0,
     212.0
    ],
    [
     66.67,
     142.67
    ],
    [
     0,
     900
    ]
   ],
   "richtung": -1
  },
  {
   "id": "E-C3-a",
   "name": "Schiene C3 (−x)",
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
     900
    ]
   ],
   "richtung": 1
  },
  {
   "id": "E-C3-b",
   "name": "Schiene C3 (+x)",
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
     900
    ]
   ],
   "richtung": -1
  },
  {
   "id": "A2",
   "name": "Brett Sitzrücken",
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
   "name": "Brett Kopfbereich",
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
  "eckverbindung": "Eckausbildung Korpus — welche Platte läuft durch?",
  "rueckwand": "Rückwand B1 ragt in Schienen/Elemente (lichte Tiefe < Schienenlänge)",
  "frontblende": "Frontblende überdeckt Schienen bzw. Nachbarelement",
  "sonstige": "Sonstige Überschneidung"
 },
 "varianten": {
  "stueckliste": [
   {
    "a": "B2-F",
    "b": "B1",
    "box": [
     [
      542.0,
      560.0
     ],
     [
      0,
      320
     ],
     [
      882,
      900
     ]
    ],
    "kategorie": "eckverbindung",
    "mass": [
     18.0,
     320,
     18
    ]
   },
   {
    "a": "B2-F",
    "b": "B4",
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
      0,
      900
     ]
    ],
    "kategorie": "eckverbindung",
    "mass": [
     18.0,
     18,
     900
    ]
   },
   {
    "a": "B2-B",
    "b": "B1",
    "box": [
     [
      -560.0,
      -542.0
     ],
     [
      0,
      320
     ],
     [
      882,
      900
     ]
    ],
    "kategorie": "eckverbindung",
    "mass": [
     18.0,
     320,
     18
    ]
   },
   {
    "a": "B2-B",
    "b": "B4",
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
      0,
      900
     ]
    ],
    "kategorie": "eckverbindung",
    "mass": [
     18.0,
     18,
     900
    ]
   },
   {
    "a": "B1",
    "b": "B4",
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
      882,
      900
     ]
    ],
    "kategorie": "eckverbindung",
    "mass": [
     1120.0,
     18,
     18
    ]
   },
   {
    "a": "B1",
    "b": "B3-1",
    "box": [
     [
      -230.0,
      -212.0
     ],
     [
      0,
      320
     ],
     [
      882,
      900
     ]
    ],
    "kategorie": "eckverbindung",
    "mass": [
     18.0,
     320,
     18
    ]
   },
   {
    "a": "B1",
    "b": "B3-2",
    "box": [
     [
      212.0,
      230.0
     ],
     [
      0,
      320
     ],
     [
      882,
      900
     ]
    ],
    "kategorie": "eckverbindung",
    "mass": [
     18.0,
     320,
     18
    ]
   },
   {
    "a": "B1",
    "b": "C1",
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
      882,
      898.5
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     272.0,
     32,
     16.5
    ]
   },
   {
    "a": "B1",
    "b": "D1",
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
      882,
      896.5
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     272.0,
     260,
     14.5
    ]
   },
   {
    "a": "B1",
    "b": "E-C1-a",
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
      882,
      900
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     19.0,
     76,
     18
    ]
   },
   {
    "a": "B1",
    "b": "E-C1-b",
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
      882,
      900
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     19.0,
     76,
     18
    ]
   },
   {
    "a": "B1",
    "b": "E-D1-a",
    "box": [
     [
      -542.0,
      -523.0
     ],
     [
      190.33,
      266.33
     ],
     [
      882,
      900
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     19.0,
     76.0,
     18
    ]
   },
   {
    "a": "B1",
    "b": "E-D1-b",
    "box": [
     [
      -249.0,
      -230.0
     ],
     [
      190.33,
      266.33
     ],
     [
      882,
      900
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     19.0,
     76.0,
     18
    ]
   },
   {
    "a": "B1",
    "b": "C2",
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
      882,
      898.5
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     272.0,
     32,
     16.5
    ]
   },
   {
    "a": "B1",
    "b": "D2",
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
      882,
      896.5
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     272.0,
     260,
     14.5
    ]
   },
   {
    "a": "B1",
    "b": "E-C2-a",
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
      882,
      900
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     19.0,
     76,
     18
    ]
   },
   {
    "a": "B1",
    "b": "E-C2-b",
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
      882,
      900
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     19.0,
     76,
     18
    ]
   },
   {
    "a": "B1",
    "b": "E-D2-a",
    "box": [
     [
      230.0,
      249.0
     ],
     [
      190.33,
      266.33
     ],
     [
      882,
      900
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     19.0,
     76.0,
     18
    ]
   },
   {
    "a": "B1",
    "b": "E-D2-b",
    "box": [
     [
      523.0,
      542.0
     ],
     [
      190.33,
      266.33
     ],
     [
      882,
      900
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     19.0,
     76.0,
     18
    ]
   },
   {
    "a": "B1",
    "b": "D3",
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
      882,
      896.5
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     384.0,
     260,
     14.5
    ]
   },
   {
    "a": "B1",
    "b": "C3",
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
      882,
      898.5
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     384.0,
     32,
     16.5
    ]
   },
   {
    "a": "B1",
    "b": "E-D3-a",
    "box": [
     [
      -212.0,
      -193.0
     ],
     [
      66.67,
      142.67
     ],
     [
      882,
      900
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     19.0,
     76.0,
     18
    ]
   },
   {
    "a": "B1",
    "b": "E-D3-b",
    "box": [
     [
      193.0,
      212.0
     ],
     [
      66.67,
      142.67
     ],
     [
      882,
      900
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     19.0,
     76.0,
     18
    ]
   },
   {
    "a": "B1",
    "b": "E-C3-a",
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
      882,
      900
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     19.0,
     76,
     18
    ]
   },
   {
    "a": "B1",
    "b": "E-C3-b",
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
      882,
      900
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     19.0,
     76,
     18
    ]
   },
   {
    "a": "B4",
    "b": "B3-1",
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
      0,
      900
     ]
    ],
    "kategorie": "eckverbindung",
    "mass": [
     18.0,
     18,
     900
    ]
   },
   {
    "a": "B4",
    "b": "B3-2",
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
      0,
      900
     ]
    ],
    "kategorie": "eckverbindung",
    "mass": [
     18.0,
     18,
     900
    ]
   },
   {
    "a": "D1-F",
    "b": "E-C1-a",
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
      -542.0,
      -523.0
     ],
     [
      190.33,
      266.33
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "mass": [
     19.0,
     76.0,
     16.5
    ]
   },
   {
    "a": "D1-F",
    "b": "E-D1-b",
    "box": [
     [
      -249.0,
      -230.0
     ],
     [
      190.33,
      266.33
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "mass": [
     19.0,
     76.0,
     16.5
    ]
   },
   {
    "a": "D2-F",
    "b": "E-C2-a",
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
      230.0,
      249.0
     ],
     [
      190.33,
      266.33
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "mass": [
     19.0,
     76.0,
     16.5
    ]
   },
   {
    "a": "D2-F",
    "b": "E-D2-b",
    "box": [
     [
      523.0,
      542.0
     ],
     [
      190.33,
      266.33
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "mass": [
     19.0,
     76.0,
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
      66.67,
      142.67
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "mass": [
     19.0,
     76.0,
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
      66.67,
      142.67
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "mass": [
     19.0,
     76.0,
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
    "mass": [
     19.0,
     47,
     16.5
    ]
   }
  ],
  "boden_durchlaufend": [
   {
    "a": "B1",
    "b": "C1",
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
      882,
      898.5
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     272.0,
     32,
     16.5
    ]
   },
   {
    "a": "B1",
    "b": "D1",
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
      882,
      896.5
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     272.0,
     260,
     14.5
    ]
   },
   {
    "a": "B1",
    "b": "E-C1-a",
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
      882,
      900
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     19.0,
     76,
     18
    ]
   },
   {
    "a": "B1",
    "b": "E-C1-b",
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
      882,
      900
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     19.0,
     76,
     18
    ]
   },
   {
    "a": "B1",
    "b": "E-D1-a",
    "box": [
     [
      -542.0,
      -523.0
     ],
     [
      190.33,
      266.33
     ],
     [
      882,
      900
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     19.0,
     76.0,
     18
    ]
   },
   {
    "a": "B1",
    "b": "E-D1-b",
    "box": [
     [
      -249.0,
      -230.0
     ],
     [
      190.33,
      266.33
     ],
     [
      882,
      900
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     19.0,
     76.0,
     18
    ]
   },
   {
    "a": "B1",
    "b": "C2",
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
      882,
      898.5
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     272.0,
     32,
     16.5
    ]
   },
   {
    "a": "B1",
    "b": "D2",
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
      882,
      896.5
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     272.0,
     260,
     14.5
    ]
   },
   {
    "a": "B1",
    "b": "E-C2-a",
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
      882,
      900
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     19.0,
     76,
     18
    ]
   },
   {
    "a": "B1",
    "b": "E-C2-b",
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
      882,
      900
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     19.0,
     76,
     18
    ]
   },
   {
    "a": "B1",
    "b": "E-D2-a",
    "box": [
     [
      230.0,
      249.0
     ],
     [
      190.33,
      266.33
     ],
     [
      882,
      900
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     19.0,
     76.0,
     18
    ]
   },
   {
    "a": "B1",
    "b": "E-D2-b",
    "box": [
     [
      523.0,
      542.0
     ],
     [
      190.33,
      266.33
     ],
     [
      882,
      900
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     19.0,
     76.0,
     18
    ]
   },
   {
    "a": "B1",
    "b": "D3",
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
      882,
      896.5
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     384.0,
     260,
     14.5
    ]
   },
   {
    "a": "B1",
    "b": "C3",
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
      882,
      898.5
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     384.0,
     32,
     16.5
    ]
   },
   {
    "a": "B1",
    "b": "E-D3-a",
    "box": [
     [
      -212.0,
      -193.0
     ],
     [
      66.67,
      142.67
     ],
     [
      882,
      900
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     19.0,
     76.0,
     18
    ]
   },
   {
    "a": "B1",
    "b": "E-D3-b",
    "box": [
     [
      193.0,
      212.0
     ],
     [
      66.67,
      142.67
     ],
     [
      882,
      900
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     19.0,
     76.0,
     18
    ]
   },
   {
    "a": "B1",
    "b": "E-C3-a",
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
      882,
      900
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     19.0,
     76,
     18
    ]
   },
   {
    "a": "B1",
    "b": "E-C3-b",
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
      882,
      900
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     19.0,
     76,
     18
    ]
   },
   {
    "a": "D1-F",
    "b": "E-C1-a",
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
      -542.0,
      -523.0
     ],
     [
      190.33,
      266.33
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "mass": [
     19.0,
     76.0,
     16.5
    ]
   },
   {
    "a": "D1-F",
    "b": "E-D1-b",
    "box": [
     [
      -249.0,
      -230.0
     ],
     [
      190.33,
      266.33
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "mass": [
     19.0,
     76.0,
     16.5
    ]
   },
   {
    "a": "D2-F",
    "b": "E-C2-a",
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
      230.0,
      249.0
     ],
     [
      190.33,
      266.33
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "mass": [
     19.0,
     76.0,
     16.5
    ]
   },
   {
    "a": "D2-F",
    "b": "E-D2-b",
    "box": [
     [
      523.0,
      542.0
     ],
     [
      190.33,
      266.33
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "mass": [
     19.0,
     76.0,
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
      66.67,
      142.67
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "mass": [
     19.0,
     76.0,
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
      66.67,
      142.67
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "mass": [
     19.0,
     76.0,
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
    "mass": [
     19.0,
     47,
     16.5
    ]
   }
  ],
  "seiten_durchlaufend": [
   {
    "a": "B1",
    "b": "C1",
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
      882,
      898.5
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     272.0,
     32,
     16.5
    ]
   },
   {
    "a": "B1",
    "b": "D1",
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
      882,
      896.5
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     272.0,
     260,
     14.5
    ]
   },
   {
    "a": "B1",
    "b": "E-C1-a",
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
      882,
      900
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     19.0,
     76,
     18
    ]
   },
   {
    "a": "B1",
    "b": "E-C1-b",
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
      882,
      900
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     19.0,
     76,
     18
    ]
   },
   {
    "a": "B1",
    "b": "E-D1-a",
    "box": [
     [
      -542.0,
      -523.0
     ],
     [
      190.33,
      266.33
     ],
     [
      882,
      900
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     19.0,
     76.0,
     18
    ]
   },
   {
    "a": "B1",
    "b": "E-D1-b",
    "box": [
     [
      -249.0,
      -230.0
     ],
     [
      190.33,
      266.33
     ],
     [
      882,
      900
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     19.0,
     76.0,
     18
    ]
   },
   {
    "a": "B1",
    "b": "C2",
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
      882,
      898.5
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     272.0,
     32,
     16.5
    ]
   },
   {
    "a": "B1",
    "b": "D2",
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
      882,
      896.5
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     272.0,
     260,
     14.5
    ]
   },
   {
    "a": "B1",
    "b": "E-C2-a",
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
      882,
      900
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     19.0,
     76,
     18
    ]
   },
   {
    "a": "B1",
    "b": "E-C2-b",
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
      882,
      900
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     19.0,
     76,
     18
    ]
   },
   {
    "a": "B1",
    "b": "E-D2-a",
    "box": [
     [
      230.0,
      249.0
     ],
     [
      190.33,
      266.33
     ],
     [
      882,
      900
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     19.0,
     76.0,
     18
    ]
   },
   {
    "a": "B1",
    "b": "E-D2-b",
    "box": [
     [
      523.0,
      542.0
     ],
     [
      190.33,
      266.33
     ],
     [
      882,
      900
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     19.0,
     76.0,
     18
    ]
   },
   {
    "a": "B1",
    "b": "D3",
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
      882,
      896.5
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     384.0,
     260,
     14.5
    ]
   },
   {
    "a": "B1",
    "b": "C3",
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
      882,
      898.5
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     384.0,
     32,
     16.5
    ]
   },
   {
    "a": "B1",
    "b": "E-D3-a",
    "box": [
     [
      -212.0,
      -193.0
     ],
     [
      66.67,
      142.67
     ],
     [
      882,
      900
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     19.0,
     76.0,
     18
    ]
   },
   {
    "a": "B1",
    "b": "E-D3-b",
    "box": [
     [
      193.0,
      212.0
     ],
     [
      66.67,
      142.67
     ],
     [
      882,
      900
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     19.0,
     76.0,
     18
    ]
   },
   {
    "a": "B1",
    "b": "E-C3-a",
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
      882,
      900
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     19.0,
     76,
     18
    ]
   },
   {
    "a": "B1",
    "b": "E-C3-b",
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
      882,
      900
     ]
    ],
    "kategorie": "rueckwand",
    "mass": [
     19.0,
     76,
     18
    ]
   },
   {
    "a": "D1-F",
    "b": "E-C1-a",
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
      -542.0,
      -523.0
     ],
     [
      190.33,
      266.33
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "mass": [
     19.0,
     76.0,
     16.5
    ]
   },
   {
    "a": "D1-F",
    "b": "E-D1-b",
    "box": [
     [
      -249.0,
      -230.0
     ],
     [
      190.33,
      266.33
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "mass": [
     19.0,
     76.0,
     16.5
    ]
   },
   {
    "a": "D2-F",
    "b": "E-C2-a",
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
      230.0,
      249.0
     ],
     [
      190.33,
      266.33
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "mass": [
     19.0,
     76.0,
     16.5
    ]
   },
   {
    "a": "D2-F",
    "b": "E-D2-b",
    "box": [
     [
      523.0,
      542.0
     ],
     [
      190.33,
      266.33
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "mass": [
     19.0,
     76.0,
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
      66.67,
      142.67
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "mass": [
     19.0,
     76.0,
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
      66.67,
      142.67
     ],
     [
      0,
      16.5
     ]
    ],
    "kategorie": "frontblende",
    "mass": [
     19.0,
     76.0,
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
    "mass": [
     19.0,
     47,
     16.5
    ]
   }
  ]
 },
 "kollisionen": [
  {
   "a": "B2-F",
   "b": "B1",
   "box": [
    [
     542.0,
     560.0
    ],
    [
     0,
     320
    ],
    [
     882,
     900
    ]
   ],
   "kategorie": "eckverbindung",
   "mass": [
    18.0,
    320,
    18
   ]
  },
  {
   "a": "B2-F",
   "b": "B4",
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
     0,
     900
    ]
   ],
   "kategorie": "eckverbindung",
   "mass": [
    18.0,
    18,
    900
   ]
  },
  {
   "a": "B2-B",
   "b": "B1",
   "box": [
    [
     -560.0,
     -542.0
    ],
    [
     0,
     320
    ],
    [
     882,
     900
    ]
   ],
   "kategorie": "eckverbindung",
   "mass": [
    18.0,
    320,
    18
   ]
  },
  {
   "a": "B2-B",
   "b": "B4",
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
     0,
     900
    ]
   ],
   "kategorie": "eckverbindung",
   "mass": [
    18.0,
    18,
    900
   ]
  },
  {
   "a": "B1",
   "b": "B4",
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
     882,
     900
    ]
   ],
   "kategorie": "eckverbindung",
   "mass": [
    1120.0,
    18,
    18
   ]
  },
  {
   "a": "B1",
   "b": "B3-1",
   "box": [
    [
     -230.0,
     -212.0
    ],
    [
     0,
     320
    ],
    [
     882,
     900
    ]
   ],
   "kategorie": "eckverbindung",
   "mass": [
    18.0,
    320,
    18
   ]
  },
  {
   "a": "B1",
   "b": "B3-2",
   "box": [
    [
     212.0,
     230.0
    ],
    [
     0,
     320
    ],
    [
     882,
     900
    ]
   ],
   "kategorie": "eckverbindung",
   "mass": [
    18.0,
    320,
    18
   ]
  },
  {
   "a": "B1",
   "b": "C1",
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
     882,
     898.5
    ]
   ],
   "kategorie": "rueckwand",
   "mass": [
    272.0,
    32,
    16.5
   ]
  },
  {
   "a": "B1",
   "b": "D1",
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
     882,
     896.5
    ]
   ],
   "kategorie": "rueckwand",
   "mass": [
    272.0,
    260,
    14.5
   ]
  },
  {
   "a": "B1",
   "b": "E-C1-a",
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
     882,
     900
    ]
   ],
   "kategorie": "rueckwand",
   "mass": [
    19.0,
    76,
    18
   ]
  },
  {
   "a": "B1",
   "b": "E-C1-b",
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
     882,
     900
    ]
   ],
   "kategorie": "rueckwand",
   "mass": [
    19.0,
    76,
    18
   ]
  },
  {
   "a": "B1",
   "b": "E-D1-a",
   "box": [
    [
     -542.0,
     -523.0
    ],
    [
     190.33,
     266.33
    ],
    [
     882,
     900
    ]
   ],
   "kategorie": "rueckwand",
   "mass": [
    19.0,
    76.0,
    18
   ]
  },
  {
   "a": "B1",
   "b": "E-D1-b",
   "box": [
    [
     -249.0,
     -230.0
    ],
    [
     190.33,
     266.33
    ],
    [
     882,
     900
    ]
   ],
   "kategorie": "rueckwand",
   "mass": [
    19.0,
    76.0,
    18
   ]
  },
  {
   "a": "B1",
   "b": "C2",
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
     882,
     898.5
    ]
   ],
   "kategorie": "rueckwand",
   "mass": [
    272.0,
    32,
    16.5
   ]
  },
  {
   "a": "B1",
   "b": "D2",
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
     882,
     896.5
    ]
   ],
   "kategorie": "rueckwand",
   "mass": [
    272.0,
    260,
    14.5
   ]
  },
  {
   "a": "B1",
   "b": "E-C2-a",
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
     882,
     900
    ]
   ],
   "kategorie": "rueckwand",
   "mass": [
    19.0,
    76,
    18
   ]
  },
  {
   "a": "B1",
   "b": "E-C2-b",
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
     882,
     900
    ]
   ],
   "kategorie": "rueckwand",
   "mass": [
    19.0,
    76,
    18
   ]
  },
  {
   "a": "B1",
   "b": "E-D2-a",
   "box": [
    [
     230.0,
     249.0
    ],
    [
     190.33,
     266.33
    ],
    [
     882,
     900
    ]
   ],
   "kategorie": "rueckwand",
   "mass": [
    19.0,
    76.0,
    18
   ]
  },
  {
   "a": "B1",
   "b": "E-D2-b",
   "box": [
    [
     523.0,
     542.0
    ],
    [
     190.33,
     266.33
    ],
    [
     882,
     900
    ]
   ],
   "kategorie": "rueckwand",
   "mass": [
    19.0,
    76.0,
    18
   ]
  },
  {
   "a": "B1",
   "b": "D3",
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
     882,
     896.5
    ]
   ],
   "kategorie": "rueckwand",
   "mass": [
    384.0,
    260,
    14.5
   ]
  },
  {
   "a": "B1",
   "b": "C3",
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
     882,
     898.5
    ]
   ],
   "kategorie": "rueckwand",
   "mass": [
    384.0,
    32,
    16.5
   ]
  },
  {
   "a": "B1",
   "b": "E-D3-a",
   "box": [
    [
     -212.0,
     -193.0
    ],
    [
     66.67,
     142.67
    ],
    [
     882,
     900
    ]
   ],
   "kategorie": "rueckwand",
   "mass": [
    19.0,
    76.0,
    18
   ]
  },
  {
   "a": "B1",
   "b": "E-D3-b",
   "box": [
    [
     193.0,
     212.0
    ],
    [
     66.67,
     142.67
    ],
    [
     882,
     900
    ]
   ],
   "kategorie": "rueckwand",
   "mass": [
    19.0,
    76.0,
    18
   ]
  },
  {
   "a": "B1",
   "b": "E-C3-a",
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
     882,
     900
    ]
   ],
   "kategorie": "rueckwand",
   "mass": [
    19.0,
    76,
    18
   ]
  },
  {
   "a": "B1",
   "b": "E-C3-b",
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
     882,
     900
    ]
   ],
   "kategorie": "rueckwand",
   "mass": [
    19.0,
    76,
    18
   ]
  },
  {
   "a": "B4",
   "b": "B3-1",
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
     0,
     900
    ]
   ],
   "kategorie": "eckverbindung",
   "mass": [
    18.0,
    18,
    900
   ]
  },
  {
   "a": "B4",
   "b": "B3-2",
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
     0,
     900
    ]
   ],
   "kategorie": "eckverbindung",
   "mass": [
    18.0,
    18,
    900
   ]
  },
  {
   "a": "D1-F",
   "b": "E-C1-a",
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
     -542.0,
     -523.0
    ],
    [
     190.33,
     266.33
    ],
    [
     0,
     16.5
    ]
   ],
   "kategorie": "frontblende",
   "mass": [
    19.0,
    76.0,
    16.5
   ]
  },
  {
   "a": "D1-F",
   "b": "E-D1-b",
   "box": [
    [
     -249.0,
     -230.0
    ],
    [
     190.33,
     266.33
    ],
    [
     0,
     16.5
    ]
   ],
   "kategorie": "frontblende",
   "mass": [
    19.0,
    76.0,
    16.5
   ]
  },
  {
   "a": "D2-F",
   "b": "E-C2-a",
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
     230.0,
     249.0
    ],
    [
     190.33,
     266.33
    ],
    [
     0,
     16.5
    ]
   ],
   "kategorie": "frontblende",
   "mass": [
    19.0,
    76.0,
    16.5
   ]
  },
  {
   "a": "D2-F",
   "b": "E-D2-b",
   "box": [
    [
     523.0,
     542.0
    ],
    [
     190.33,
     266.33
    ],
    [
     0,
     16.5
    ]
   ],
   "kategorie": "frontblende",
   "mass": [
    19.0,
    76.0,
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
     66.67,
     142.67
    ],
    [
     0,
     16.5
    ]
   ],
   "kategorie": "frontblende",
   "mass": [
    19.0,
    76.0,
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
     66.67,
     142.67
    ],
    [
     0,
     16.5
    ]
   ],
   "kategorie": "frontblende",
   "mass": [
    19.0,
    76.0,
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
   "mass": [
    19.0,
    47,
    16.5
   ]
  }
 ],
 "fahrzeug_pruefung": [
  {
   "was": "Korpusbreite zwischen den Radkästen",
   "plan": 1120,
   "fahrzeug": 1120,
   "ergebnis": "0 mm Spiel",
   "status": "knapp"
  },
  {
   "was": "Korpustiefe Heckklappe → Rücksitze",
   "plan": 900,
   "fahrzeug": "920–930",
   "ergebnis": "20–30 mm Luft; mit Rückwand hinter 900 mm lichter Tiefe (918 mm) noch 2–12 mm",
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
 ]
};

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
   "_hinweis": "Je Typ: Stärke je Seite, Höhe und Länge des Schienenkörpers (eingefahren). Die Löcher liegen mittig in der Höhe. Ausgerichtet bündig an der Korpusfront (Datenblatt). ADR 0028",
   "typen": {
    "schwer": {
     "name": "AOLISHENG 870 mm · 170 kg",
     "staerke": 19,
     "hoehe": 76,
     "laenge": 870,
     "traglast": 170
    },
    "leicht": {
     "name": "AOLISHENG 850 mm · 80 kg",
     "staerke": 19,
     "hoehe": 53,
     "laenge": 850,
     "traglast": 80
    }
   },
   "_staerke": "Gemessen 2026-11-12: Stärke je Seite bei beiden Typen 19 mm, Höhe 53 mm (80 kg) und 76 mm (170 kg, nachgemessen). Datenblatt 170 kg (docs/runner-pdfs/heavy-runners.pdf): Stärke 19,2 ± 0,3, Höhe 76,2 ± 0,5, Schrauben M6. Mit 19 mm + 1 mm Spiel je Seite ist bis 20 mm Schienenstärke Platz",
   "_laenge": "Gemessen 2026-11-12: 80 kg 850 mm, 170 kg 870 mm Schienenkörper, jeweils + Arretierungshebel vorn (bis 880 bzw. 900 mm)",
   "hebel_vorn": 30,
   "_hebel_vorn": "Arretierungshebel am beweglichen Teil, ragt eingefahren so weit vor das vordere Schienenende (= Korpusfront) — gegen die Luft zur Heckklappe prüfen (fahrzeug_pruefung)",
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
   "_hinweis": "Höhenplan ADR 0028: Sitz-/Tischbrett-Element = Brett oben + zwei Wangen darunter (umgedrehtes U), so hoch wie die Schiene + Überstand. Kästen bekommen den Rest, Schubladenschiene mittig am Kasten",
   "brett_staerke": 18,
   "wange_staerke": 18,
   "ueberstand_brett": 1.5,
   "_ueberstand_brett": "Brettoberkante über der Schienenoberkante — 1–2 mm erlaubt, damit nie die Schiene als Kante über die Sitzfläche steht (Datenblatt: Höhe bis 76,7 mm)",
   "boden_luft": 3,
   "_boden_luft": "Luft des Kastens D3 über der Bodenplatte (Durchhang unter Last, Toleranzen, Krümel). Kostet keine Kastenhöhe, D3 rückt nur hoch",
   "wange_luft": 20,
   "_wange_luft": "Abstand der Wangen-Unterkante zur Schienen-Unterkante (C1/C2: zu B1). Größer = kürzere Wangen, weniger Material. Unter der mittigen Lochreihe müssen mindestens `rand_lochreihe` mm Holz bleiben. Die Schiene C1/C2 selbst steht auf B1 (bewegliche Teile ~10 mm frei, gemessen 2026-11-12)",
   "rand_lochreihe": 15,
   "_rand_lochreihe": "Mindest-Holz unter der Lochmitte der 170-kg-Schiene in der Wange: ~3 × Schraubendurchmesser (5 mm, V18), damit die Schraube nicht zum Rand ausbricht",
   "spalt_hoehe": 5,
   "schubladenschiene": {
    "_hinweis": "Lage der Schubladenschiene am Kasten (ADR 0028): Außenschubladen D1/D2 so tief wie möglich (Platz für Fenster darüber), Mitte D3 so hoch wie möglich (Lochraster darunter). An M1/M2 liegen so alle Schienen der Außensektion unten, alle der Mitte oben. Höhen auf ganze mm gerundet (Abstandsklötze)",
    "aussen": "unten",
    "mitte": "oben",
    "abstand_kasten": 5,
    "mindestabstand_gegenseite": 10
   },
   "spiel_seitlich": 1,
   "vorstand_front": 1.5,
   "kasten_tiefe": 848,
   "_kasten_tiefe": "Ohne Frontblende (ADR 0027): Kastenfront bündig mit den Sitz-/Tischbrettern (1,5 mm vor der Korpusfront), hinten 35,5 mm Luft bis R1",
   "brett_tiefe": 870,
   "_brett_tiefe": "So lang wie die 170-kg-Schiene, hinten 13,5 mm Luft bis R1"
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
   "aussparung": {
    "D1": "fenster",
    "D2": "fenster",
    "D3": "lochraster"
   },
   "_aussparung": "Seitenwände je Kasten: fenster = große Durchbrüche (äußere Schubladen, beim Sitzen leicht geöffnet hineingreifen) · lochraster = viele kleine Löcher (Mitte: Luft und Material sparen, nichts fällt durch) · keine. ADR 0026. Kastenfront und -rückwand bekommen immer das Lochraster (ADR 0027)",
   "griff": {
    "_hinweis": "Griff in der Kastenfront (-E1), die ohne Blende die sichtbare Front ist (ADR 0027). ausschnitt = von der Oberkante her ausgefräst · loch = geschlossenes Griffloch (Langloch)",
    "art": "ausschnitt",
    "breite": 120,
    "tiefe": 35,
    "radius": 15,
    "abstand_oben": 25,
    "_abstand_oben": "nur bei art = loch: Steg über dem Griffloch"
   },
   "lochraster": {
    "_hinweis": "Runde Löcher im Quadratraster, in denselben freien Bändern wie die Fenster (gleiche Ränder und Stege aus `fenster`)",
    "durchmesser": 25,
    "abstand": 40
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
   "id": "E-C1-a",
   "name": "Schiene Sitzbrett links, an Trennwand links · AOLISHENG 870 mm · 170 kg",
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
     870
    ]
   ],
   "richtung": 1,
   "auszug": 870
  },
  {
   "id": "E-C1-b",
   "name": "Schiene Sitzbrett links, an Seitenwand links · AOLISHENG 870 mm · 170 kg",
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
     870
    ]
   ],
   "richtung": -1,
   "auszug": 870
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
     77.5,
     95.5
    ],
    [
     -1.5,
     868.5
    ]
   ],
   "auszug": 870
  },
  {
   "id": "C1-Wa",
   "name": "Sitzbrett links, Wange",
   "gruppe": "brett",
   "material": "sitz",
   "faehrt": "bretter",
   "box": [
    [
     250.0,
     268.0
    ],
    [
     38,
     77.5
    ],
    [
     -1.5,
     868.5
    ]
   ],
   "auszug": 870
  },
  {
   "id": "C1-Wb",
   "name": "Sitzbrett links, Wange",
   "gruppe": "brett",
   "material": "sitz",
   "faehrt": "bretter",
   "box": [
    [
     504.0,
     522.0
    ],
    [
     38,
     77.5
    ],
    [
     -1.5,
     868.5
    ]
   ],
   "auszug": 870
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
     100.5,
     315.0
    ],
    [
     -1.5,
     846.5
    ]
   ],
   "auszug": 850
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
     106,
     159
    ],
    [
     0,
     850
    ]
   ],
   "richtung": 1,
   "auszug": 850
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
     106,
     159
    ],
    [
     0,
     850
    ]
   ],
   "richtung": -1,
   "auszug": 850
  },
  {
   "id": "E-C2-a",
   "name": "Schiene Sitzbrett rechts, an Seitenwand rechts · AOLISHENG 870 mm · 170 kg",
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
     870
    ]
   ],
   "richtung": 1,
   "auszug": 870
  },
  {
   "id": "E-C2-b",
   "name": "Schiene Sitzbrett rechts, an Trennwand rechts · AOLISHENG 870 mm · 170 kg",
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
     870
    ]
   ],
   "richtung": -1,
   "auszug": 870
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
     77.5,
     95.5
    ],
    [
     -1.5,
     868.5
    ]
   ],
   "auszug": 870
  },
  {
   "id": "C2-Wa",
   "name": "Sitzbrett rechts, Wange",
   "gruppe": "brett",
   "material": "sitz",
   "faehrt": "bretter",
   "box": [
    [
     -522.0,
     -504.0
    ],
    [
     38,
     77.5
    ],
    [
     -1.5,
     868.5
    ]
   ],
   "auszug": 870
  },
  {
   "id": "C2-Wb",
   "name": "Sitzbrett rechts, Wange",
   "gruppe": "brett",
   "material": "sitz",
   "faehrt": "bretter",
   "box": [
    [
     -268.0,
     -250.0
    ],
    [
     38,
     77.5
    ],
    [
     -1.5,
     868.5
    ]
   ],
   "auszug": 870
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
     100.5,
     315.0
    ],
    [
     -1.5,
     846.5
    ]
   ],
   "auszug": 850
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
     106,
     159
    ],
    [
     0,
     850
    ]
   ],
   "richtung": 1,
   "auszug": 850
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
     106,
     159
    ],
    [
     0,
     850
    ]
   ],
   "richtung": -1,
   "auszug": 850
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
     21,
     235.5
    ],
    [
     -1.5,
     846.5
    ]
   ],
   "auszug": 850
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
     177,
     230
    ],
    [
     0,
     850
    ]
   ],
   "richtung": 1,
   "auszug": 850
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
     177,
     230
    ],
    [
     0,
     850
    ]
   ],
   "richtung": -1,
   "auszug": 850
  },
  {
   "id": "E-C3-a",
   "name": "Schiene Tischbrett Mitte, an Trennwand rechts · AOLISHENG 870 mm · 170 kg",
   "gruppe": "schiene",
   "material": "schiene",
   "faehrt": "bretter",
   "box": [
    [
     -212.0,
     -193.0
    ],
    [
     237.5,
     313.5
    ],
    [
     0,
     870
    ]
   ],
   "richtung": 1,
   "auszug": 870
  },
  {
   "id": "E-C3-b",
   "name": "Schiene Tischbrett Mitte, an Trennwand links · AOLISHENG 870 mm · 170 kg",
   "gruppe": "schiene",
   "material": "schiene",
   "faehrt": "bretter",
   "box": [
    [
     193.0,
     212.0
    ],
    [
     237.5,
     313.5
    ],
    [
     0,
     870
    ]
   ],
   "richtung": -1,
   "auszug": 870
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
     297.0,
     315.0
    ],
    [
     -1.5,
     868.5
    ]
   ],
   "auszug": 870
  },
  {
   "id": "C3-Wa",
   "name": "Tischbrett Mitte, Wange",
   "gruppe": "brett",
   "material": "tisch",
   "faehrt": "bretter",
   "box": [
    [
     -192.0,
     -174.0
    ],
    [
     257.5,
     297.0
    ],
    [
     -1.5,
     868.5
    ]
   ],
   "auszug": 870
  },
  {
   "id": "C3-Wb",
   "name": "Tischbrett Mitte, Wange",
   "gruppe": "brett",
   "material": "tisch",
   "faehrt": "bretter",
   "box": [
    [
     174.0,
     192.0
    ],
    [
     257.5,
     297.0
    ],
    [
     -1.5,
     868.5
    ]
   ],
   "auszug": 870
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
   "was": "Arretierungshebel der Schienen vor der Korpusfront",
   "plan": 30,
   "fahrzeug": "20–30 mm Luft (Ladetiefe − Korpus)",
   "ergebnis": "Hebel ragen 30 mm vor — am Auto prüfen, ob die Heckklappe schließt; sonst Korpus ganz an die Rücksitze schieben oder die Schienen bis 12 mm zurücksetzen (ADR 0028)",
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
 },
 "schubladen_3d": [
  {
   "id": "D1-Sa",
   "name": "Schublade links, Seitenwand",
   "kasten": "D1",
   "faehrt": "schubladen",
   "auszug": 850,
   "staerke": 18,
   "ursprung": [
    268.0,
    100.5,
    -2.5
   ],
   "u": [
    0,
    0,
    1
   ],
   "v": [
    0,
    1,
    0
   ],
   "aussen": [
    [
     850.0,
     0
    ],
    [
     850.0,
     30.64
    ],
    [
     831.0,
     30.64
    ],
    [
     831.0,
     61.29
    ],
    [
     850.0,
     61.29
    ],
    [
     850.0,
     91.93
    ],
    [
     831.0,
     91.93
    ],
    [
     831.0,
     122.57
    ],
    [
     850.0,
     122.57
    ],
    [
     850.0,
     153.21
    ],
    [
     831.0,
     153.21
    ],
    [
     831.0,
     183.86
    ],
    [
     850.0,
     183.86
    ],
    [
     850.0,
     214.5
    ],
    [
     0,
     214.5
    ],
    [
     0,
     183.86
    ],
    [
     19,
     183.86
    ],
    [
     19,
     153.21
    ],
    [
     0,
     153.21
    ],
    [
     0,
     122.57
    ],
    [
     19,
     122.57
    ],
    [
     19,
     91.93
    ],
    [
     0,
     91.93
    ],
    [
     0,
     61.29
    ],
    [
     19,
     61.29
    ],
    [
     19,
     30.64
    ],
    [
     0,
     30.64
    ],
    [
     0,
     0
    ]
   ],
   "loecher": [
    [
     [
      791.0,
      10
     ],
     [
      741.0,
      10
     ],
     [
      741.0,
      22
     ],
     [
      791.0,
      22
     ]
    ],
    [
     [
      279.5,
      10
     ],
     [
      229.5,
      10
     ],
     [
      229.5,
      22
     ],
     [
      279.5,
      22
     ]
    ],
    [
     [
      400.0,
      10
     ],
     [
      400.0,
      22
     ],
     [
      450.0,
      22
     ],
     [
      450.0,
      10
     ]
    ],
    [
     [
      620.5,
      10
     ],
     [
      570.5,
      10
     ],
     [
      570.5,
      22
     ],
     [
      620.5,
      22
     ]
    ],
    [
     [
      109.0,
      10
     ],
     [
      59.0,
      10
     ],
     [
      59.0,
      22
     ],
     [
      109.0,
      22
     ]
    ]
   ],
   "fenster": [
    [
     69.0,
     73.5,
     217.0,
     184.5,
     20
    ],
    [
     257.0,
     73.5,
     405.0,
     184.5,
     20
    ],
    [
     445.0,
     73.5,
     593.0,
     184.5,
     20
    ],
    [
     633.0,
     73.5,
     781.0,
     184.5,
     20
    ]
   ]
  },
  {
   "id": "D1-Sb",
   "name": "Schublade links, Seitenwand",
   "kasten": "D1",
   "faehrt": "schubladen",
   "auszug": 850,
   "staerke": 18,
   "ursprung": [
    522.0,
    100.5,
    -2.5
   ],
   "u": [
    0,
    0,
    1
   ],
   "v": [
    0,
    1,
    0
   ],
   "aussen": [
    [
     850.0,
     0
    ],
    [
     850.0,
     30.64
    ],
    [
     831.0,
     30.64
    ],
    [
     831.0,
     61.29
    ],
    [
     850.0,
     61.29
    ],
    [
     850.0,
     91.93
    ],
    [
     831.0,
     91.93
    ],
    [
     831.0,
     122.57
    ],
    [
     850.0,
     122.57
    ],
    [
     850.0,
     153.21
    ],
    [
     831.0,
     153.21
    ],
    [
     831.0,
     183.86
    ],
    [
     850.0,
     183.86
    ],
    [
     850.0,
     214.5
    ],
    [
     0,
     214.5
    ],
    [
     0,
     183.86
    ],
    [
     19,
     183.86
    ],
    [
     19,
     153.21
    ],
    [
     0,
     153.21
    ],
    [
     0,
     122.57
    ],
    [
     19,
     122.57
    ],
    [
     19,
     91.93
    ],
    [
     0,
     91.93
    ],
    [
     0,
     61.29
    ],
    [
     19,
     61.29
    ],
    [
     19,
     30.64
    ],
    [
     0,
     30.64
    ],
    [
     0,
     0
    ]
   ],
   "loecher": [
    [
     [
      791.0,
      10
     ],
     [
      741.0,
      10
     ],
     [
      741.0,
      22
     ],
     [
      791.0,
      22
     ]
    ],
    [
     [
      279.5,
      10
     ],
     [
      229.5,
      10
     ],
     [
      229.5,
      22
     ],
     [
      279.5,
      22
     ]
    ],
    [
     [
      400.0,
      10
     ],
     [
      400.0,
      22
     ],
     [
      450.0,
      22
     ],
     [
      450.0,
      10
     ]
    ],
    [
     [
      620.5,
      10
     ],
     [
      570.5,
      10
     ],
     [
      570.5,
      22
     ],
     [
      620.5,
      22
     ]
    ],
    [
     [
      109.0,
      10
     ],
     [
      59.0,
      10
     ],
     [
      59.0,
      22
     ],
     [
      109.0,
      22
     ]
    ]
   ],
   "fenster": [
    [
     69.0,
     73.5,
     217.0,
     184.5,
     20
    ],
    [
     257.0,
     73.5,
     405.0,
     184.5,
     20
    ],
    [
     445.0,
     73.5,
     593.0,
     184.5,
     20
    ],
    [
     633.0,
     73.5,
     781.0,
     184.5,
     20
    ]
   ]
  },
  {
   "id": "D1-E1",
   "name": "Schublade links, Kastenfront mit Griff",
   "kasten": "D1",
   "faehrt": "schubladen",
   "auszug": 850,
   "staerke": 18,
   "ursprung": [
    249.0,
    100.5,
    -1.5
   ],
   "u": [
    1,
    0,
    0
   ],
   "v": [
    0,
    1,
    0
   ],
   "aussen": [
    [
     255.0,
     0
    ],
    [
     255.0,
     30.64
    ],
    [
     274.0,
     30.64
    ],
    [
     274.0,
     61.29
    ],
    [
     255.0,
     61.29
    ],
    [
     255.0,
     91.93
    ],
    [
     274.0,
     91.93
    ],
    [
     274.0,
     122.57
    ],
    [
     255.0,
     122.57
    ],
    [
     255.0,
     153.21
    ],
    [
     274.0,
     153.21
    ],
    [
     274.0,
     183.86
    ],
    [
     255.0,
     183.86
    ],
    [
     255.0,
     214.5
    ],
    [
     197.0,
     214.5
    ],
    [
     197.0,
     179.5
    ],
    [
     77.0,
     179.5
    ],
    [
     77.0,
     214.5
    ],
    [
     19,
     214.5
    ],
    [
     19,
     183.86
    ],
    [
     0,
     183.86
    ],
    [
     0,
     153.21
    ],
    [
     19,
     153.21
    ],
    [
     19,
     122.57
    ],
    [
     0,
     122.57
    ],
    [
     0,
     91.93
    ],
    [
     19,
     91.93
    ],
    [
     19,
     61.29
    ],
    [
     0,
     61.29
    ],
    [
     0,
     30.64
    ],
    [
     19,
     30.64
    ],
    [
     19,
     0
    ]
   ],
   "loecher": [
    [
     [
      109.0,
      22
     ],
     [
      109.0,
      10
     ],
     [
      59.0,
      10
     ],
     [
      59.0,
      22
     ]
    ],
    [
     [
      215.0,
      10
     ],
     [
      165.0,
      10
     ],
     [
      165.0,
      22
     ],
     [
      215.0,
      22
     ]
    ]
   ],
   "fenster": [
    [
     84.5,
     65.75,
     109.5,
     90.75,
     12.5
    ],
    [
     124.5,
     65.75,
     149.5,
     90.75,
     12.5
    ],
    [
     164.5,
     65.75,
     189.5,
     90.75,
     12.5
    ],
    [
     84.5,
     105.75,
     109.5,
     130.75,
     12.5
    ],
    [
     124.5,
     105.75,
     149.5,
     130.75,
     12.5
    ],
    [
     164.5,
     105.75,
     189.5,
     130.75,
     12.5
    ]
   ]
  },
  {
   "id": "D1-E2",
   "name": "Schublade links, Kastenrückwand",
   "kasten": "D1",
   "faehrt": "schubladen",
   "auszug": 850,
   "staerke": 18,
   "ursprung": [
    249.0,
    100.5,
    828.5
   ],
   "u": [
    1,
    0,
    0
   ],
   "v": [
    0,
    1,
    0
   ],
   "aussen": [
    [
     255.0,
     0
    ],
    [
     255.0,
     30.64
    ],
    [
     274.0,
     30.64
    ],
    [
     274.0,
     61.29
    ],
    [
     255.0,
     61.29
    ],
    [
     255.0,
     91.93
    ],
    [
     274.0,
     91.93
    ],
    [
     274.0,
     122.57
    ],
    [
     255.0,
     122.57
    ],
    [
     255.0,
     153.21
    ],
    [
     274.0,
     153.21
    ],
    [
     274.0,
     183.86
    ],
    [
     255.0,
     183.86
    ],
    [
     255.0,
     214.5
    ],
    [
     19,
     214.5
    ],
    [
     19,
     183.86
    ],
    [
     0,
     183.86
    ],
    [
     0,
     153.21
    ],
    [
     19,
     153.21
    ],
    [
     19,
     122.57
    ],
    [
     0,
     122.57
    ],
    [
     0,
     91.93
    ],
    [
     19,
     91.93
    ],
    [
     19,
     61.29
    ],
    [
     0,
     61.29
    ],
    [
     0,
     30.64
    ],
    [
     19,
     30.64
    ],
    [
     19,
     0
    ]
   ],
   "loecher": [
    [
     [
      109.0,
      10
     ],
     [
      59.0,
      10
     ],
     [
      59.0,
      22
     ],
     [
      109.0,
      22
     ]
    ],
    [
     [
      215.0,
      10
     ],
     [
      165.0,
      10
     ],
     [
      165.0,
      22
     ],
     [
      215.0,
      22
     ]
    ]
   ],
   "fenster": [
    [
     84.5,
     65.75,
     109.5,
     90.75,
     12.5
    ],
    [
     124.5,
     65.75,
     149.5,
     90.75,
     12.5
    ],
    [
     164.5,
     65.75,
     189.5,
     90.75,
     12.5
    ],
    [
     84.5,
     105.75,
     109.5,
     130.75,
     12.5
    ],
    [
     124.5,
     105.75,
     149.5,
     130.75,
     12.5
    ],
    [
     164.5,
     105.75,
     189.5,
     130.75,
     12.5
    ],
    [
     84.5,
     145.75,
     109.5,
     170.75,
     12.5
    ],
    [
     124.5,
     145.75,
     149.5,
     170.75,
     12.5
    ],
    [
     164.5,
     145.75,
     189.5,
     170.75,
     12.5
    ]
   ]
  },
  {
   "id": "D1-B",
   "name": "Schublade links, Boden",
   "kasten": "D1",
   "faehrt": "schubladen",
   "auszug": 850,
   "staerke": 12,
   "ursprung": [
    249.0,
    122.5,
    -2.5
   ],
   "u": [
    1,
    0,
    0
   ],
   "v": [
    0,
    0,
    1
   ],
   "aussen": [
    [
     165.0,
     0
    ],
    [
     215.0,
     0
    ],
    [
     215.0,
     19
    ],
    [
     255.0,
     19
    ],
    [
     255.0,
     59.0
    ],
    [
     274.0,
     59.0
    ],
    [
     274.0,
     109.0
    ],
    [
     255.0,
     109.0
    ],
    [
     255.0,
     229.5
    ],
    [
     274.0,
     229.5
    ],
    [
     274.0,
     279.5
    ],
    [
     255.0,
     279.5
    ],
    [
     255.0,
     400.0
    ],
    [
     274.0,
     400.0
    ],
    [
     274.0,
     450.0
    ],
    [
     255.0,
     450.0
    ],
    [
     255.0,
     570.5
    ],
    [
     274.0,
     570.5
    ],
    [
     274.0,
     620.5
    ],
    [
     255.0,
     620.5
    ],
    [
     255.0,
     741.0
    ],
    [
     274.0,
     741.0
    ],
    [
     274.0,
     791.0
    ],
    [
     255.0,
     791.0
    ],
    [
     255.0,
     831.0
    ],
    [
     215.0,
     831.0
    ],
    [
     215.0,
     850.0
    ],
    [
     165.0,
     850.0
    ],
    [
     165.0,
     831.0
    ],
    [
     109.0,
     831.0
    ],
    [
     109.0,
     850.0
    ],
    [
     59.0,
     850.0
    ],
    [
     59.0,
     831.0
    ],
    [
     19,
     831.0
    ],
    [
     19,
     791.0
    ],
    [
     0,
     791.0
    ],
    [
     0,
     741.0
    ],
    [
     19,
     741.0
    ],
    [
     19,
     620.5
    ],
    [
     0,
     620.5
    ],
    [
     0,
     570.5
    ],
    [
     19,
     570.5
    ],
    [
     19,
     450.0
    ],
    [
     0,
     450.0
    ],
    [
     0,
     400.0
    ],
    [
     19,
     400.0
    ],
    [
     19,
     279.5
    ],
    [
     0,
     279.5
    ],
    [
     0,
     229.5
    ],
    [
     19,
     229.5
    ],
    [
     19,
     109.0
    ],
    [
     0,
     109.0
    ],
    [
     0,
     59.0
    ],
    [
     19,
     59.0
    ],
    [
     19,
     19
    ],
    [
     59.0,
     19
    ],
    [
     59.0,
     0
    ],
    [
     109.0,
     0
    ],
    [
     109.0,
     19
    ],
    [
     165.0,
     19
    ]
   ],
   "loecher": [],
   "fenster": []
  },
  {
   "id": "D2-Sa",
   "name": "Schublade rechts, Seitenwand",
   "kasten": "D2",
   "faehrt": "schubladen",
   "auszug": 850,
   "staerke": 18,
   "ursprung": [
    -504.0,
    100.5,
    -2.5
   ],
   "u": [
    0,
    0,
    1
   ],
   "v": [
    0,
    1,
    0
   ],
   "aussen": [
    [
     850.0,
     0
    ],
    [
     850.0,
     30.64
    ],
    [
     831.0,
     30.64
    ],
    [
     831.0,
     61.29
    ],
    [
     850.0,
     61.29
    ],
    [
     850.0,
     91.93
    ],
    [
     831.0,
     91.93
    ],
    [
     831.0,
     122.57
    ],
    [
     850.0,
     122.57
    ],
    [
     850.0,
     153.21
    ],
    [
     831.0,
     153.21
    ],
    [
     831.0,
     183.86
    ],
    [
     850.0,
     183.86
    ],
    [
     850.0,
     214.5
    ],
    [
     0,
     214.5
    ],
    [
     0,
     183.86
    ],
    [
     19,
     183.86
    ],
    [
     19,
     153.21
    ],
    [
     0,
     153.21
    ],
    [
     0,
     122.57
    ],
    [
     19,
     122.57
    ],
    [
     19,
     91.93
    ],
    [
     0,
     91.93
    ],
    [
     0,
     61.29
    ],
    [
     19,
     61.29
    ],
    [
     19,
     30.64
    ],
    [
     0,
     30.64
    ],
    [
     0,
     0
    ]
   ],
   "loecher": [
    [
     [
      791.0,
      10
     ],
     [
      741.0,
      10
     ],
     [
      741.0,
      22
     ],
     [
      791.0,
      22
     ]
    ],
    [
     [
      279.5,
      10
     ],
     [
      229.5,
      10
     ],
     [
      229.5,
      22
     ],
     [
      279.5,
      22
     ]
    ],
    [
     [
      400.0,
      10
     ],
     [
      400.0,
      22
     ],
     [
      450.0,
      22
     ],
     [
      450.0,
      10
     ]
    ],
    [
     [
      620.5,
      10
     ],
     [
      570.5,
      10
     ],
     [
      570.5,
      22
     ],
     [
      620.5,
      22
     ]
    ],
    [
     [
      109.0,
      10
     ],
     [
      59.0,
      10
     ],
     [
      59.0,
      22
     ],
     [
      109.0,
      22
     ]
    ]
   ],
   "fenster": [
    [
     69.0,
     73.5,
     217.0,
     184.5,
     20
    ],
    [
     257.0,
     73.5,
     405.0,
     184.5,
     20
    ],
    [
     445.0,
     73.5,
     593.0,
     184.5,
     20
    ],
    [
     633.0,
     73.5,
     781.0,
     184.5,
     20
    ]
   ]
  },
  {
   "id": "D2-Sb",
   "name": "Schublade rechts, Seitenwand",
   "kasten": "D2",
   "faehrt": "schubladen",
   "auszug": 850,
   "staerke": 18,
   "ursprung": [
    -250.0,
    100.5,
    -2.5
   ],
   "u": [
    0,
    0,
    1
   ],
   "v": [
    0,
    1,
    0
   ],
   "aussen": [
    [
     850.0,
     0
    ],
    [
     850.0,
     30.64
    ],
    [
     831.0,
     30.64
    ],
    [
     831.0,
     61.29
    ],
    [
     850.0,
     61.29
    ],
    [
     850.0,
     91.93
    ],
    [
     831.0,
     91.93
    ],
    [
     831.0,
     122.57
    ],
    [
     850.0,
     122.57
    ],
    [
     850.0,
     153.21
    ],
    [
     831.0,
     153.21
    ],
    [
     831.0,
     183.86
    ],
    [
     850.0,
     183.86
    ],
    [
     850.0,
     214.5
    ],
    [
     0,
     214.5
    ],
    [
     0,
     183.86
    ],
    [
     19,
     183.86
    ],
    [
     19,
     153.21
    ],
    [
     0,
     153.21
    ],
    [
     0,
     122.57
    ],
    [
     19,
     122.57
    ],
    [
     19,
     91.93
    ],
    [
     0,
     91.93
    ],
    [
     0,
     61.29
    ],
    [
     19,
     61.29
    ],
    [
     19,
     30.64
    ],
    [
     0,
     30.64
    ],
    [
     0,
     0
    ]
   ],
   "loecher": [
    [
     [
      791.0,
      10
     ],
     [
      741.0,
      10
     ],
     [
      741.0,
      22
     ],
     [
      791.0,
      22
     ]
    ],
    [
     [
      279.5,
      10
     ],
     [
      229.5,
      10
     ],
     [
      229.5,
      22
     ],
     [
      279.5,
      22
     ]
    ],
    [
     [
      400.0,
      10
     ],
     [
      400.0,
      22
     ],
     [
      450.0,
      22
     ],
     [
      450.0,
      10
     ]
    ],
    [
     [
      620.5,
      10
     ],
     [
      570.5,
      10
     ],
     [
      570.5,
      22
     ],
     [
      620.5,
      22
     ]
    ],
    [
     [
      109.0,
      10
     ],
     [
      59.0,
      10
     ],
     [
      59.0,
      22
     ],
     [
      109.0,
      22
     ]
    ]
   ],
   "fenster": [
    [
     69.0,
     73.5,
     217.0,
     184.5,
     20
    ],
    [
     257.0,
     73.5,
     405.0,
     184.5,
     20
    ],
    [
     445.0,
     73.5,
     593.0,
     184.5,
     20
    ],
    [
     633.0,
     73.5,
     781.0,
     184.5,
     20
    ]
   ]
  },
  {
   "id": "D2-E1",
   "name": "Schublade rechts, Kastenfront mit Griff",
   "kasten": "D2",
   "faehrt": "schubladen",
   "auszug": 850,
   "staerke": 18,
   "ursprung": [
    -523.0,
    100.5,
    -1.5
   ],
   "u": [
    1,
    0,
    0
   ],
   "v": [
    0,
    1,
    0
   ],
   "aussen": [
    [
     255.0,
     0
    ],
    [
     255.0,
     30.64
    ],
    [
     274.0,
     30.64
    ],
    [
     274.0,
     61.29
    ],
    [
     255.0,
     61.29
    ],
    [
     255.0,
     91.93
    ],
    [
     274.0,
     91.93
    ],
    [
     274.0,
     122.57
    ],
    [
     255.0,
     122.57
    ],
    [
     255.0,
     153.21
    ],
    [
     274.0,
     153.21
    ],
    [
     274.0,
     183.86
    ],
    [
     255.0,
     183.86
    ],
    [
     255.0,
     214.5
    ],
    [
     197.0,
     214.5
    ],
    [
     197.0,
     179.5
    ],
    [
     77.0,
     179.5
    ],
    [
     77.0,
     214.5
    ],
    [
     19,
     214.5
    ],
    [
     19,
     183.86
    ],
    [
     0,
     183.86
    ],
    [
     0,
     153.21
    ],
    [
     19,
     153.21
    ],
    [
     19,
     122.57
    ],
    [
     0,
     122.57
    ],
    [
     0,
     91.93
    ],
    [
     19,
     91.93
    ],
    [
     19,
     61.29
    ],
    [
     0,
     61.29
    ],
    [
     0,
     30.64
    ],
    [
     19,
     30.64
    ],
    [
     19,
     0
    ]
   ],
   "loecher": [
    [
     [
      109.0,
      22
     ],
     [
      109.0,
      10
     ],
     [
      59.0,
      10
     ],
     [
      59.0,
      22
     ]
    ],
    [
     [
      215.0,
      10
     ],
     [
      165.0,
      10
     ],
     [
      165.0,
      22
     ],
     [
      215.0,
      22
     ]
    ]
   ],
   "fenster": [
    [
     84.5,
     65.75,
     109.5,
     90.75,
     12.5
    ],
    [
     124.5,
     65.75,
     149.5,
     90.75,
     12.5
    ],
    [
     164.5,
     65.75,
     189.5,
     90.75,
     12.5
    ],
    [
     84.5,
     105.75,
     109.5,
     130.75,
     12.5
    ],
    [
     124.5,
     105.75,
     149.5,
     130.75,
     12.5
    ],
    [
     164.5,
     105.75,
     189.5,
     130.75,
     12.5
    ]
   ]
  },
  {
   "id": "D2-E2",
   "name": "Schublade rechts, Kastenrückwand",
   "kasten": "D2",
   "faehrt": "schubladen",
   "auszug": 850,
   "staerke": 18,
   "ursprung": [
    -523.0,
    100.5,
    828.5
   ],
   "u": [
    1,
    0,
    0
   ],
   "v": [
    0,
    1,
    0
   ],
   "aussen": [
    [
     255.0,
     0
    ],
    [
     255.0,
     30.64
    ],
    [
     274.0,
     30.64
    ],
    [
     274.0,
     61.29
    ],
    [
     255.0,
     61.29
    ],
    [
     255.0,
     91.93
    ],
    [
     274.0,
     91.93
    ],
    [
     274.0,
     122.57
    ],
    [
     255.0,
     122.57
    ],
    [
     255.0,
     153.21
    ],
    [
     274.0,
     153.21
    ],
    [
     274.0,
     183.86
    ],
    [
     255.0,
     183.86
    ],
    [
     255.0,
     214.5
    ],
    [
     19,
     214.5
    ],
    [
     19,
     183.86
    ],
    [
     0,
     183.86
    ],
    [
     0,
     153.21
    ],
    [
     19,
     153.21
    ],
    [
     19,
     122.57
    ],
    [
     0,
     122.57
    ],
    [
     0,
     91.93
    ],
    [
     19,
     91.93
    ],
    [
     19,
     61.29
    ],
    [
     0,
     61.29
    ],
    [
     0,
     30.64
    ],
    [
     19,
     30.64
    ],
    [
     19,
     0
    ]
   ],
   "loecher": [
    [
     [
      109.0,
      10
     ],
     [
      59.0,
      10
     ],
     [
      59.0,
      22
     ],
     [
      109.0,
      22
     ]
    ],
    [
     [
      215.0,
      10
     ],
     [
      165.0,
      10
     ],
     [
      165.0,
      22
     ],
     [
      215.0,
      22
     ]
    ]
   ],
   "fenster": [
    [
     84.5,
     65.75,
     109.5,
     90.75,
     12.5
    ],
    [
     124.5,
     65.75,
     149.5,
     90.75,
     12.5
    ],
    [
     164.5,
     65.75,
     189.5,
     90.75,
     12.5
    ],
    [
     84.5,
     105.75,
     109.5,
     130.75,
     12.5
    ],
    [
     124.5,
     105.75,
     149.5,
     130.75,
     12.5
    ],
    [
     164.5,
     105.75,
     189.5,
     130.75,
     12.5
    ],
    [
     84.5,
     145.75,
     109.5,
     170.75,
     12.5
    ],
    [
     124.5,
     145.75,
     149.5,
     170.75,
     12.5
    ],
    [
     164.5,
     145.75,
     189.5,
     170.75,
     12.5
    ]
   ]
  },
  {
   "id": "D2-B",
   "name": "Schublade rechts, Boden",
   "kasten": "D2",
   "faehrt": "schubladen",
   "auszug": 850,
   "staerke": 12,
   "ursprung": [
    -523.0,
    122.5,
    -2.5
   ],
   "u": [
    1,
    0,
    0
   ],
   "v": [
    0,
    0,
    1
   ],
   "aussen": [
    [
     165.0,
     0
    ],
    [
     215.0,
     0
    ],
    [
     215.0,
     19
    ],
    [
     255.0,
     19
    ],
    [
     255.0,
     59.0
    ],
    [
     274.0,
     59.0
    ],
    [
     274.0,
     109.0
    ],
    [
     255.0,
     109.0
    ],
    [
     255.0,
     229.5
    ],
    [
     274.0,
     229.5
    ],
    [
     274.0,
     279.5
    ],
    [
     255.0,
     279.5
    ],
    [
     255.0,
     400.0
    ],
    [
     274.0,
     400.0
    ],
    [
     274.0,
     450.0
    ],
    [
     255.0,
     450.0
    ],
    [
     255.0,
     570.5
    ],
    [
     274.0,
     570.5
    ],
    [
     274.0,
     620.5
    ],
    [
     255.0,
     620.5
    ],
    [
     255.0,
     741.0
    ],
    [
     274.0,
     741.0
    ],
    [
     274.0,
     791.0
    ],
    [
     255.0,
     791.0
    ],
    [
     255.0,
     831.0
    ],
    [
     215.0,
     831.0
    ],
    [
     215.0,
     850.0
    ],
    [
     165.0,
     850.0
    ],
    [
     165.0,
     831.0
    ],
    [
     109.0,
     831.0
    ],
    [
     109.0,
     850.0
    ],
    [
     59.0,
     850.0
    ],
    [
     59.0,
     831.0
    ],
    [
     19,
     831.0
    ],
    [
     19,
     791.0
    ],
    [
     0,
     791.0
    ],
    [
     0,
     741.0
    ],
    [
     19,
     741.0
    ],
    [
     19,
     620.5
    ],
    [
     0,
     620.5
    ],
    [
     0,
     570.5
    ],
    [
     19,
     570.5
    ],
    [
     19,
     450.0
    ],
    [
     0,
     450.0
    ],
    [
     0,
     400.0
    ],
    [
     19,
     400.0
    ],
    [
     19,
     279.5
    ],
    [
     0,
     279.5
    ],
    [
     0,
     229.5
    ],
    [
     19,
     229.5
    ],
    [
     19,
     109.0
    ],
    [
     0,
     109.0
    ],
    [
     0,
     59.0
    ],
    [
     19,
     59.0
    ],
    [
     19,
     19
    ],
    [
     59.0,
     19
    ],
    [
     59.0,
     0
    ],
    [
     109.0,
     0
    ],
    [
     109.0,
     19
    ],
    [
     165.0,
     19
    ]
   ],
   "loecher": [],
   "fenster": []
  },
  {
   "id": "D3-Sa",
   "name": "Schublade Mitte, Seitenwand",
   "kasten": "D3",
   "faehrt": "schubladen",
   "auszug": 850,
   "staerke": 18,
   "ursprung": [
    -174.0,
    21,
    -2.5
   ],
   "u": [
    0,
    0,
    1
   ],
   "v": [
    0,
    1,
    0
   ],
   "aussen": [
    [
     850.0,
     0
    ],
    [
     850.0,
     30.64
    ],
    [
     831.0,
     30.64
    ],
    [
     831.0,
     61.29
    ],
    [
     850.0,
     61.29
    ],
    [
     850.0,
     91.93
    ],
    [
     831.0,
     91.93
    ],
    [
     831.0,
     122.57
    ],
    [
     850.0,
     122.57
    ],
    [
     850.0,
     153.21
    ],
    [
     831.0,
     153.21
    ],
    [
     831.0,
     183.86
    ],
    [
     850.0,
     183.86
    ],
    [
     850.0,
     214.5
    ],
    [
     0,
     214.5
    ],
    [
     0,
     183.86
    ],
    [
     19,
     183.86
    ],
    [
     19,
     153.21
    ],
    [
     0,
     153.21
    ],
    [
     0,
     122.57
    ],
    [
     19,
     122.57
    ],
    [
     19,
     91.93
    ],
    [
     0,
     91.93
    ],
    [
     0,
     61.29
    ],
    [
     19,
     61.29
    ],
    [
     19,
     30.64
    ],
    [
     0,
     30.64
    ],
    [
     0,
     0
    ]
   ],
   "loecher": [
    [
     [
      791.0,
      10
     ],
     [
      741.0,
      10
     ],
     [
      741.0,
      22
     ],
     [
      791.0,
      22
     ]
    ],
    [
     [
      279.5,
      10
     ],
     [
      229.5,
      10
     ],
     [
      229.5,
      22
     ],
     [
      279.5,
      22
     ]
    ],
    [
     [
      400.0,
      10
     ],
     [
      400.0,
      22
     ],
     [
      450.0,
      22
     ],
     [
      450.0,
      10
     ]
    ],
    [
     [
      620.5,
      10
     ],
     [
      570.5,
      10
     ],
     [
      570.5,
      22
     ],
     [
      620.5,
      22
     ]
    ],
    [
     [
      109.0,
      10
     ],
     [
      59.0,
      10
     ],
     [
      59.0,
      22
     ],
     [
      109.0,
      22
     ]
    ]
   ],
   "fenster": [
    [
     72.5,
     64.0,
     97.5,
     89.0,
     12.5
    ],
    [
     112.5,
     64.0,
     137.5,
     89.0,
     12.5
    ],
    [
     152.5,
     64.0,
     177.5,
     89.0,
     12.5
    ],
    [
     192.5,
     64.0,
     217.5,
     89.0,
     12.5
    ],
    [
     232.5,
     64.0,
     257.5,
     89.0,
     12.5
    ],
    [
     272.5,
     64.0,
     297.5,
     89.0,
     12.5
    ],
    [
     312.5,
     64.0,
     337.5,
     89.0,
     12.5
    ],
    [
     352.5,
     64.0,
     377.5,
     89.0,
     12.5
    ],
    [
     392.5,
     64.0,
     417.5,
     89.0,
     12.5
    ],
    [
     432.5,
     64.0,
     457.5,
     89.0,
     12.5
    ],
    [
     472.5,
     64.0,
     497.5,
     89.0,
     12.5
    ],
    [
     512.5,
     64.0,
     537.5,
     89.0,
     12.5
    ],
    [
     552.5,
     64.0,
     577.5,
     89.0,
     12.5
    ],
    [
     592.5,
     64.0,
     617.5,
     89.0,
     12.5
    ],
    [
     632.5,
     64.0,
     657.5,
     89.0,
     12.5
    ],
    [
     672.5,
     64.0,
     697.5,
     89.0,
     12.5
    ],
    [
     712.5,
     64.0,
     737.5,
     89.0,
     12.5
    ],
    [
     752.5,
     64.0,
     777.5,
     89.0,
     12.5
    ],
    [
     72.5,
     104.0,
     97.5,
     129.0,
     12.5
    ],
    [
     112.5,
     104.0,
     137.5,
     129.0,
     12.5
    ],
    [
     152.5,
     104.0,
     177.5,
     129.0,
     12.5
    ],
    [
     192.5,
     104.0,
     217.5,
     129.0,
     12.5
    ],
    [
     232.5,
     104.0,
     257.5,
     129.0,
     12.5
    ],
    [
     272.5,
     104.0,
     297.5,
     129.0,
     12.5
    ],
    [
     312.5,
     104.0,
     337.5,
     129.0,
     12.5
    ],
    [
     352.5,
     104.0,
     377.5,
     129.0,
     12.5
    ],
    [
     392.5,
     104.0,
     417.5,
     129.0,
     12.5
    ],
    [
     432.5,
     104.0,
     457.5,
     129.0,
     12.5
    ],
    [
     472.5,
     104.0,
     497.5,
     129.0,
     12.5
    ],
    [
     512.5,
     104.0,
     537.5,
     129.0,
     12.5
    ],
    [
     552.5,
     104.0,
     577.5,
     129.0,
     12.5
    ],
    [
     592.5,
     104.0,
     617.5,
     129.0,
     12.5
    ],
    [
     632.5,
     104.0,
     657.5,
     129.0,
     12.5
    ],
    [
     672.5,
     104.0,
     697.5,
     129.0,
     12.5
    ],
    [
     712.5,
     104.0,
     737.5,
     129.0,
     12.5
    ],
    [
     752.5,
     104.0,
     777.5,
     129.0,
     12.5
    ]
   ]
  },
  {
   "id": "D3-Sb",
   "name": "Schublade Mitte, Seitenwand",
   "kasten": "D3",
   "faehrt": "schubladen",
   "auszug": 850,
   "staerke": 18,
   "ursprung": [
    192.0,
    21,
    -2.5
   ],
   "u": [
    0,
    0,
    1
   ],
   "v": [
    0,
    1,
    0
   ],
   "aussen": [
    [
     850.0,
     0
    ],
    [
     850.0,
     30.64
    ],
    [
     831.0,
     30.64
    ],
    [
     831.0,
     61.29
    ],
    [
     850.0,
     61.29
    ],
    [
     850.0,
     91.93
    ],
    [
     831.0,
     91.93
    ],
    [
     831.0,
     122.57
    ],
    [
     850.0,
     122.57
    ],
    [
     850.0,
     153.21
    ],
    [
     831.0,
     153.21
    ],
    [
     831.0,
     183.86
    ],
    [
     850.0,
     183.86
    ],
    [
     850.0,
     214.5
    ],
    [
     0,
     214.5
    ],
    [
     0,
     183.86
    ],
    [
     19,
     183.86
    ],
    [
     19,
     153.21
    ],
    [
     0,
     153.21
    ],
    [
     0,
     122.57
    ],
    [
     19,
     122.57
    ],
    [
     19,
     91.93
    ],
    [
     0,
     91.93
    ],
    [
     0,
     61.29
    ],
    [
     19,
     61.29
    ],
    [
     19,
     30.64
    ],
    [
     0,
     30.64
    ],
    [
     0,
     0
    ]
   ],
   "loecher": [
    [
     [
      791.0,
      10
     ],
     [
      741.0,
      10
     ],
     [
      741.0,
      22
     ],
     [
      791.0,
      22
     ]
    ],
    [
     [
      279.5,
      10
     ],
     [
      229.5,
      10
     ],
     [
      229.5,
      22
     ],
     [
      279.5,
      22
     ]
    ],
    [
     [
      400.0,
      10
     ],
     [
      400.0,
      22
     ],
     [
      450.0,
      22
     ],
     [
      450.0,
      10
     ]
    ],
    [
     [
      620.5,
      10
     ],
     [
      570.5,
      10
     ],
     [
      570.5,
      22
     ],
     [
      620.5,
      22
     ]
    ],
    [
     [
      109.0,
      10
     ],
     [
      59.0,
      10
     ],
     [
      59.0,
      22
     ],
     [
      109.0,
      22
     ]
    ]
   ],
   "fenster": [
    [
     72.5,
     64.0,
     97.5,
     89.0,
     12.5
    ],
    [
     112.5,
     64.0,
     137.5,
     89.0,
     12.5
    ],
    [
     152.5,
     64.0,
     177.5,
     89.0,
     12.5
    ],
    [
     192.5,
     64.0,
     217.5,
     89.0,
     12.5
    ],
    [
     232.5,
     64.0,
     257.5,
     89.0,
     12.5
    ],
    [
     272.5,
     64.0,
     297.5,
     89.0,
     12.5
    ],
    [
     312.5,
     64.0,
     337.5,
     89.0,
     12.5
    ],
    [
     352.5,
     64.0,
     377.5,
     89.0,
     12.5
    ],
    [
     392.5,
     64.0,
     417.5,
     89.0,
     12.5
    ],
    [
     432.5,
     64.0,
     457.5,
     89.0,
     12.5
    ],
    [
     472.5,
     64.0,
     497.5,
     89.0,
     12.5
    ],
    [
     512.5,
     64.0,
     537.5,
     89.0,
     12.5
    ],
    [
     552.5,
     64.0,
     577.5,
     89.0,
     12.5
    ],
    [
     592.5,
     64.0,
     617.5,
     89.0,
     12.5
    ],
    [
     632.5,
     64.0,
     657.5,
     89.0,
     12.5
    ],
    [
     672.5,
     64.0,
     697.5,
     89.0,
     12.5
    ],
    [
     712.5,
     64.0,
     737.5,
     89.0,
     12.5
    ],
    [
     752.5,
     64.0,
     777.5,
     89.0,
     12.5
    ],
    [
     72.5,
     104.0,
     97.5,
     129.0,
     12.5
    ],
    [
     112.5,
     104.0,
     137.5,
     129.0,
     12.5
    ],
    [
     152.5,
     104.0,
     177.5,
     129.0,
     12.5
    ],
    [
     192.5,
     104.0,
     217.5,
     129.0,
     12.5
    ],
    [
     232.5,
     104.0,
     257.5,
     129.0,
     12.5
    ],
    [
     272.5,
     104.0,
     297.5,
     129.0,
     12.5
    ],
    [
     312.5,
     104.0,
     337.5,
     129.0,
     12.5
    ],
    [
     352.5,
     104.0,
     377.5,
     129.0,
     12.5
    ],
    [
     392.5,
     104.0,
     417.5,
     129.0,
     12.5
    ],
    [
     432.5,
     104.0,
     457.5,
     129.0,
     12.5
    ],
    [
     472.5,
     104.0,
     497.5,
     129.0,
     12.5
    ],
    [
     512.5,
     104.0,
     537.5,
     129.0,
     12.5
    ],
    [
     552.5,
     104.0,
     577.5,
     129.0,
     12.5
    ],
    [
     592.5,
     104.0,
     617.5,
     129.0,
     12.5
    ],
    [
     632.5,
     104.0,
     657.5,
     129.0,
     12.5
    ],
    [
     672.5,
     104.0,
     697.5,
     129.0,
     12.5
    ],
    [
     712.5,
     104.0,
     737.5,
     129.0,
     12.5
    ],
    [
     752.5,
     104.0,
     777.5,
     129.0,
     12.5
    ]
   ]
  },
  {
   "id": "D3-E1",
   "name": "Schublade Mitte, Kastenfront mit Griff",
   "kasten": "D3",
   "faehrt": "schubladen",
   "auszug": 850,
   "staerke": 18,
   "ursprung": [
    -193.0,
    21,
    -1.5
   ],
   "u": [
    1,
    0,
    0
   ],
   "v": [
    0,
    1,
    0
   ],
   "aussen": [
    [
     367.0,
     0
    ],
    [
     367.0,
     30.64
    ],
    [
     386.0,
     30.64
    ],
    [
     386.0,
     61.29
    ],
    [
     367.0,
     61.29
    ],
    [
     367.0,
     91.93
    ],
    [
     386.0,
     91.93
    ],
    [
     386.0,
     122.57
    ],
    [
     367.0,
     122.57
    ],
    [
     367.0,
     153.21
    ],
    [
     386.0,
     153.21
    ],
    [
     386.0,
     183.86
    ],
    [
     367.0,
     183.86
    ],
    [
     367.0,
     214.5
    ],
    [
     253.0,
     214.5
    ],
    [
     253.0,
     179.5
    ],
    [
     133.0,
     179.5
    ],
    [
     133.0,
     214.5
    ],
    [
     19,
     214.5
    ],
    [
     19,
     183.86
    ],
    [
     0,
     183.86
    ],
    [
     0,
     153.21
    ],
    [
     19,
     153.21
    ],
    [
     19,
     122.57
    ],
    [
     0,
     122.57
    ],
    [
     0,
     91.93
    ],
    [
     19,
     91.93
    ],
    [
     19,
     61.29
    ],
    [
     0,
     61.29
    ],
    [
     0,
     30.64
    ],
    [
     19,
     30.64
    ],
    [
     19,
     0
    ]
   ],
   "loecher": [
    [
     [
      109.0,
      10
     ],
     [
      59.0,
      10
     ],
     [
      59.0,
      22
     ],
     [
      109.0,
      22
     ]
    ],
    [
     [
      277.0,
      10
     ],
     [
      277.0,
      22
     ],
     [
      327.0,
      22
     ],
     [
      327.0,
      10
     ]
    ]
   ],
   "fenster": [
    [
     80.5,
     65.75,
     105.5,
     90.75,
     12.5
    ],
    [
     120.5,
     65.75,
     145.5,
     90.75,
     12.5
    ],
    [
     160.5,
     65.75,
     185.5,
     90.75,
     12.5
    ],
    [
     200.5,
     65.75,
     225.5,
     90.75,
     12.5
    ],
    [
     240.5,
     65.75,
     265.5,
     90.75,
     12.5
    ],
    [
     280.5,
     65.75,
     305.5,
     90.75,
     12.5
    ],
    [
     80.5,
     105.75,
     105.5,
     130.75,
     12.5
    ],
    [
     120.5,
     105.75,
     145.5,
     130.75,
     12.5
    ],
    [
     160.5,
     105.75,
     185.5,
     130.75,
     12.5
    ],
    [
     200.5,
     105.75,
     225.5,
     130.75,
     12.5
    ],
    [
     240.5,
     105.75,
     265.5,
     130.75,
     12.5
    ],
    [
     280.5,
     105.75,
     305.5,
     130.75,
     12.5
    ],
    [
     80.5,
     145.75,
     105.5,
     170.75,
     12.5
    ],
    [
     280.5,
     145.75,
     305.5,
     170.75,
     12.5
    ]
   ]
  },
  {
   "id": "D3-E2",
   "name": "Schublade Mitte, Kastenrückwand",
   "kasten": "D3",
   "faehrt": "schubladen",
   "auszug": 850,
   "staerke": 18,
   "ursprung": [
    -193.0,
    21,
    828.5
   ],
   "u": [
    1,
    0,
    0
   ],
   "v": [
    0,
    1,
    0
   ],
   "aussen": [
    [
     367.0,
     0
    ],
    [
     367.0,
     30.64
    ],
    [
     386.0,
     30.64
    ],
    [
     386.0,
     61.29
    ],
    [
     367.0,
     61.29
    ],
    [
     367.0,
     91.93
    ],
    [
     386.0,
     91.93
    ],
    [
     386.0,
     122.57
    ],
    [
     367.0,
     122.57
    ],
    [
     367.0,
     153.21
    ],
    [
     386.0,
     153.21
    ],
    [
     386.0,
     183.86
    ],
    [
     367.0,
     183.86
    ],
    [
     367.0,
     214.5
    ],
    [
     19,
     214.5
    ],
    [
     19,
     183.86
    ],
    [
     0,
     183.86
    ],
    [
     0,
     153.21
    ],
    [
     19,
     153.21
    ],
    [
     19,
     122.57
    ],
    [
     0,
     122.57
    ],
    [
     0,
     91.93
    ],
    [
     19,
     91.93
    ],
    [
     19,
     61.29
    ],
    [
     0,
     61.29
    ],
    [
     0,
     30.64
    ],
    [
     19,
     30.64
    ],
    [
     19,
     0
    ]
   ],
   "loecher": [
    [
     [
      109.0,
      10
     ],
     [
      59.0,
      10
     ],
     [
      59.0,
      22
     ],
     [
      109.0,
      22
     ]
    ],
    [
     [
      327.0,
      10
     ],
     [
      277.0,
      10
     ],
     [
      277.0,
      22
     ],
     [
      327.0,
      22
     ]
    ]
   ],
   "fenster": [
    [
     80.5,
     65.75,
     105.5,
     90.75,
     12.5
    ],
    [
     120.5,
     65.75,
     145.5,
     90.75,
     12.5
    ],
    [
     160.5,
     65.75,
     185.5,
     90.75,
     12.5
    ],
    [
     200.5,
     65.75,
     225.5,
     90.75,
     12.5
    ],
    [
     240.5,
     65.75,
     265.5,
     90.75,
     12.5
    ],
    [
     280.5,
     65.75,
     305.5,
     90.75,
     12.5
    ],
    [
     80.5,
     105.75,
     105.5,
     130.75,
     12.5
    ],
    [
     120.5,
     105.75,
     145.5,
     130.75,
     12.5
    ],
    [
     160.5,
     105.75,
     185.5,
     130.75,
     12.5
    ],
    [
     200.5,
     105.75,
     225.5,
     130.75,
     12.5
    ],
    [
     240.5,
     105.75,
     265.5,
     130.75,
     12.5
    ],
    [
     280.5,
     105.75,
     305.5,
     130.75,
     12.5
    ],
    [
     80.5,
     145.75,
     105.5,
     170.75,
     12.5
    ],
    [
     120.5,
     145.75,
     145.5,
     170.75,
     12.5
    ],
    [
     160.5,
     145.75,
     185.5,
     170.75,
     12.5
    ],
    [
     200.5,
     145.75,
     225.5,
     170.75,
     12.5
    ],
    [
     240.5,
     145.75,
     265.5,
     170.75,
     12.5
    ],
    [
     280.5,
     145.75,
     305.5,
     170.75,
     12.5
    ]
   ]
  },
  {
   "id": "D3-B",
   "name": "Schublade Mitte, Boden",
   "kasten": "D3",
   "faehrt": "schubladen",
   "auszug": 850,
   "staerke": 12,
   "ursprung": [
    -193.0,
    43,
    -2.5
   ],
   "u": [
    1,
    0,
    0
   ],
   "v": [
    0,
    0,
    1
   ],
   "aussen": [
    [
     277.0,
     0
    ],
    [
     327.0,
     0
    ],
    [
     327.0,
     19
    ],
    [
     367.0,
     19
    ],
    [
     367.0,
     59.0
    ],
    [
     386.0,
     59.0
    ],
    [
     386.0,
     109.0
    ],
    [
     367.0,
     109.0
    ],
    [
     367.0,
     229.5
    ],
    [
     386.0,
     229.5
    ],
    [
     386.0,
     279.5
    ],
    [
     367.0,
     279.5
    ],
    [
     367.0,
     400.0
    ],
    [
     386.0,
     400.0
    ],
    [
     386.0,
     450.0
    ],
    [
     367.0,
     450.0
    ],
    [
     367.0,
     570.5
    ],
    [
     386.0,
     570.5
    ],
    [
     386.0,
     620.5
    ],
    [
     367.0,
     620.5
    ],
    [
     367.0,
     741.0
    ],
    [
     386.0,
     741.0
    ],
    [
     386.0,
     791.0
    ],
    [
     367.0,
     791.0
    ],
    [
     367.0,
     831.0
    ],
    [
     327.0,
     831.0
    ],
    [
     327.0,
     850.0
    ],
    [
     277.0,
     850.0
    ],
    [
     277.0,
     831.0
    ],
    [
     109.0,
     831.0
    ],
    [
     109.0,
     850.0
    ],
    [
     59.0,
     850.0
    ],
    [
     59.0,
     831.0
    ],
    [
     19,
     831.0
    ],
    [
     19,
     791.0
    ],
    [
     0,
     791.0
    ],
    [
     0,
     741.0
    ],
    [
     19,
     741.0
    ],
    [
     19,
     620.5
    ],
    [
     0,
     620.5
    ],
    [
     0,
     570.5
    ],
    [
     19,
     570.5
    ],
    [
     19,
     450.0
    ],
    [
     0,
     450.0
    ],
    [
     0,
     400.0
    ],
    [
     19,
     400.0
    ],
    [
     19,
     279.5
    ],
    [
     0,
     279.5
    ],
    [
     0,
     229.5
    ],
    [
     19,
     229.5
    ],
    [
     19,
     109.0
    ],
    [
     0,
     109.0
    ],
    [
     0,
     59.0
    ],
    [
     19,
     59.0
    ],
    [
     19,
     19
    ],
    [
     59.0,
     19
    ],
    [
     59.0,
     0
    ],
    [
     109.0,
     0
    ],
    [
     109.0,
     19
    ],
    [
     277.0,
     19
    ]
   ],
   "loecher": [],
   "fenster": []
  }
 ]
};

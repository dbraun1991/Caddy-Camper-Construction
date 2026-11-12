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
     "hoehe_auszug": 55,
     "hoehe_innen": 30,
     "auszug_mitte": 430,
     "laenge": 870,
     "traglast": 170
    },
    "leicht": {
     "name": "AOLISHENG 850 mm · 80 kg",
     "staerke": 19,
     "hoehe": 53,
     "hoehe_auszug": 38,
     "hoehe_innen": 21,
     "auszug_mitte": 425,
     "laenge": 850,
     "traglast": 80
    }
   },
   "_staerke": "Gemessen 2026-11-12: Stärke je Seite bei beiden Typen 19 mm, Höhe 53 mm (80 kg) und 76 mm (170 kg, nachgemessen). Datenblatt 170 kg (docs/runner-pdfs/heavy-runners.pdf): Stärke 19,2 ± 0,3, Höhe 76,2 ± 0,5, Schrauben M6. Mit 19 mm + 1 mm Spiel je Seite ist bis 20 mm Schienenstärke Platz",
   "_laenge": "Gemessen 2026-11-12: 80 kg 850 mm, 170 kg 870 mm Schienenkörper, jeweils + Arretierungshebel vorn (bis 880 bzw. 900 mm)",
   "_hoehe_auszug": "Gemessen 2026-11-12 (170 kg): ausgefahren ragen nur der Arretierungshebel (30 mm), das äußerste Teleskopteil (430 mm lang, 30 mm hoch) und das mittlere (430 mm lang, 55 mm hoch) aus dem Korpus, der Rest bleibt im Gehäuse. Sitzt mittig in der Schiene (bestätigt 2026-11-12). Die Wangen richten sich nach diesen 55 mm (ADR 0029)",
   "_teleskop": "Für den Viewer (ADR 0030): Gehäuse (fest, `hoehe`), Mittelteil (`hoehe_auszug`, fährt `auszug_mitte` aus), Innenteil (`hoehe_innen`, fährt mit dem Element die volle `laenge` aus, Hebel vorn). 170 kg gemessen 2026-11-12; 80 kg-Werte nur geschätzt (Verhältnis der 170-kg-Schiene, halber Auszug)",
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
   "ueberstand_mittelteil": 0,
   "_ueberstand_mittelteil": "Brettoberkante über der Oberkante des 55-mm-Mittelteils (`hoehe_auszug`). ADR 0031: bündig — ausgefahren steht nichts über Sitz- und Tischfläche, das Gehäuse (10,5 mm höher) bleibt im Korpus. Bis 1 mm Fertigungsabweichung ist unkritisch",
   "boden_luft": 3,
   "kasten_mitte_hoehe": 229.5,
   "_kasten_mitte_hoehe": "Höhe D3 = 214,5 (ADR 0028) + 15 mm (Wunsch 2026-11-12/13), höchstens bis `boden_luft` unter die Wangen von C3 (derzeit 238) — das Modell kappt und meldet es",
   "_boden_luft": "Luft des Kastens D3 über der Bodenplatte (Durchhang unter Last, Toleranzen, Krümel). Kostet keine Kastenhöhe, D3 rückt nur hoch",
   "wangenzapfen": {
    "laenge": 50,
    "anzahl": 5,
    "abstand_rand": 50,
    "schleifzugabe": 1
   },
   "_wangenzapfen": "Wangen greifen mit Zapfen durch Schlitze im Brett und werden verleimt (ADR 0029). Zapfen = Brettstärke + Schleifzugabe hoch, bündig geschliffen. Fertigung (CNC oder Zuschnitt) noch offen",
   "rand_lochreihe": 15,
   "_rand_lochreihe": "Holz unter der Lochmitte der 170-kg-Schiene in der Wange: ~3 × Schraubendurchmesser (5 mm, V18), damit die Schraube nicht zum Rand ausbricht. Seit ADR 0031 endet die Wange genau hier (23 mm über der Schienen-Unterkante, Wange 24,5 mm)",
   "spalt_hoehe": 5,
   "schubladenschiene": {
    "_hinweis": "Lage der Schubladenschiene am Kasten (ADR 0028): Außenschubladen D1/D2 so tief wie möglich (Platz für Fenster darüber), Mitte D3 so hoch wie möglich (Lochraster darunter). An M1/M2 liegen so alle Schienen der Außensektion unten, alle der Mitte oben. Höhen auf ganze mm gerundet (Abstandsklötze)",
    "aussen": "unten",
    "mitte": "oben",
    "abstand_kasten": 5,
    "mindestabstand_gegenseite": 10,
    "abstand_gleiche_seite": 5,
    "_abstand_gleiche_seite": "Schubladenschiene mindestens so weit von der Brettschiene an derselben Wandseite (D1/D2 über C1/C2, D3 unter C3)"
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
    "radius_oben": 10,
    "_radius_oben": "nur bei art = ausschnitt: die beiden oberen (äußeren) Ecken, wo der Ausschnitt in die Oberkante läuft, mitgefräst gerundet statt von Hand gebrochen (2026-11-12). Höchstens tiefe − radius",
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
   "ladekante": 0,
   "ladekante_hoehe": 580,
   "_ladekante_hoehe": "Ladeboden über der Straße, NICHT gemessen: Standardwert Caddy 2K (580 mm, cars-data.com für den Kastenwagen), ±10 cm reichen laut Bauherr. Nur für den Viewer (Boden, Räder)"
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
     65.5,
     83.5
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
     41.0,
     65.5
    ],
    [
     -1.5,
     868.5
    ]
   ],
   "auszug": 870,
   "rohmass": [
    870.0,
    43.5
   ]
  },
  {
   "id": "C1-Wa-Z1",
   "name": "Zapfen Wange in Sitzbrett links",
   "gruppe": "brett",
   "material": "sitz",
   "faehrt": "bretter",
   "box": [
    [
     250.0,
     268.0
    ],
    [
     65.5,
     83.5
    ],
    [
     48.5,
     98.5
    ]
   ],
   "auszug": 870,
   "steckt_in": [
    "C1"
   ],
   "zapfen_von": "C1-Wa"
  },
  {
   "id": "C1-Wa-Z2",
   "name": "Zapfen Wange in Sitzbrett links",
   "gruppe": "brett",
   "material": "sitz",
   "faehrt": "bretter",
   "box": [
    [
     250.0,
     268.0
    ],
    [
     65.5,
     83.5
    ],
    [
     228.5,
     278.5
    ]
   ],
   "auszug": 870,
   "steckt_in": [
    "C1"
   ],
   "zapfen_von": "C1-Wa"
  },
  {
   "id": "C1-Wa-Z3",
   "name": "Zapfen Wange in Sitzbrett links",
   "gruppe": "brett",
   "material": "sitz",
   "faehrt": "bretter",
   "box": [
    [
     250.0,
     268.0
    ],
    [
     65.5,
     83.5
    ],
    [
     408.5,
     458.5
    ]
   ],
   "auszug": 870,
   "steckt_in": [
    "C1"
   ],
   "zapfen_von": "C1-Wa"
  },
  {
   "id": "C1-Wa-Z4",
   "name": "Zapfen Wange in Sitzbrett links",
   "gruppe": "brett",
   "material": "sitz",
   "faehrt": "bretter",
   "box": [
    [
     250.0,
     268.0
    ],
    [
     65.5,
     83.5
    ],
    [
     588.5,
     638.5
    ]
   ],
   "auszug": 870,
   "steckt_in": [
    "C1"
   ],
   "zapfen_von": "C1-Wa"
  },
  {
   "id": "C1-Wa-Z5",
   "name": "Zapfen Wange in Sitzbrett links",
   "gruppe": "brett",
   "material": "sitz",
   "faehrt": "bretter",
   "box": [
    [
     250.0,
     268.0
    ],
    [
     65.5,
     83.5
    ],
    [
     768.5,
     818.5
    ]
   ],
   "auszug": 870,
   "steckt_in": [
    "C1"
   ],
   "zapfen_von": "C1-Wa"
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
     41.0,
     65.5
    ],
    [
     -1.5,
     868.5
    ]
   ],
   "auszug": 870,
   "rohmass": [
    870.0,
    43.5
   ]
  },
  {
   "id": "C1-Wb-Z1",
   "name": "Zapfen Wange in Sitzbrett links",
   "gruppe": "brett",
   "material": "sitz",
   "faehrt": "bretter",
   "box": [
    [
     504.0,
     522.0
    ],
    [
     65.5,
     83.5
    ],
    [
     48.5,
     98.5
    ]
   ],
   "auszug": 870,
   "steckt_in": [
    "C1"
   ],
   "zapfen_von": "C1-Wb"
  },
  {
   "id": "C1-Wb-Z2",
   "name": "Zapfen Wange in Sitzbrett links",
   "gruppe": "brett",
   "material": "sitz",
   "faehrt": "bretter",
   "box": [
    [
     504.0,
     522.0
    ],
    [
     65.5,
     83.5
    ],
    [
     228.5,
     278.5
    ]
   ],
   "auszug": 870,
   "steckt_in": [
    "C1"
   ],
   "zapfen_von": "C1-Wb"
  },
  {
   "id": "C1-Wb-Z3",
   "name": "Zapfen Wange in Sitzbrett links",
   "gruppe": "brett",
   "material": "sitz",
   "faehrt": "bretter",
   "box": [
    [
     504.0,
     522.0
    ],
    [
     65.5,
     83.5
    ],
    [
     408.5,
     458.5
    ]
   ],
   "auszug": 870,
   "steckt_in": [
    "C1"
   ],
   "zapfen_von": "C1-Wb"
  },
  {
   "id": "C1-Wb-Z4",
   "name": "Zapfen Wange in Sitzbrett links",
   "gruppe": "brett",
   "material": "sitz",
   "faehrt": "bretter",
   "box": [
    [
     504.0,
     522.0
    ],
    [
     65.5,
     83.5
    ],
    [
     588.5,
     638.5
    ]
   ],
   "auszug": 870,
   "steckt_in": [
    "C1"
   ],
   "zapfen_von": "C1-Wb"
  },
  {
   "id": "C1-Wb-Z5",
   "name": "Zapfen Wange in Sitzbrett links",
   "gruppe": "brett",
   "material": "sitz",
   "faehrt": "bretter",
   "box": [
    [
     504.0,
     522.0
    ],
    [
     65.5,
     83.5
    ],
    [
     768.5,
     818.5
    ]
   ],
   "auszug": 870,
   "steckt_in": [
    "C1"
   ],
   "zapfen_von": "C1-Wb"
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
     88.5,
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
     99,
     152
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
     99,
     152
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
     65.5,
     83.5
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
     41.0,
     65.5
    ],
    [
     -1.5,
     868.5
    ]
   ],
   "auszug": 870,
   "rohmass": [
    870.0,
    43.5
   ]
  },
  {
   "id": "C2-Wa-Z1",
   "name": "Zapfen Wange in Sitzbrett rechts",
   "gruppe": "brett",
   "material": "sitz",
   "faehrt": "bretter",
   "box": [
    [
     -522.0,
     -504.0
    ],
    [
     65.5,
     83.5
    ],
    [
     48.5,
     98.5
    ]
   ],
   "auszug": 870,
   "steckt_in": [
    "C2"
   ],
   "zapfen_von": "C2-Wa"
  },
  {
   "id": "C2-Wa-Z2",
   "name": "Zapfen Wange in Sitzbrett rechts",
   "gruppe": "brett",
   "material": "sitz",
   "faehrt": "bretter",
   "box": [
    [
     -522.0,
     -504.0
    ],
    [
     65.5,
     83.5
    ],
    [
     228.5,
     278.5
    ]
   ],
   "auszug": 870,
   "steckt_in": [
    "C2"
   ],
   "zapfen_von": "C2-Wa"
  },
  {
   "id": "C2-Wa-Z3",
   "name": "Zapfen Wange in Sitzbrett rechts",
   "gruppe": "brett",
   "material": "sitz",
   "faehrt": "bretter",
   "box": [
    [
     -522.0,
     -504.0
    ],
    [
     65.5,
     83.5
    ],
    [
     408.5,
     458.5
    ]
   ],
   "auszug": 870,
   "steckt_in": [
    "C2"
   ],
   "zapfen_von": "C2-Wa"
  },
  {
   "id": "C2-Wa-Z4",
   "name": "Zapfen Wange in Sitzbrett rechts",
   "gruppe": "brett",
   "material": "sitz",
   "faehrt": "bretter",
   "box": [
    [
     -522.0,
     -504.0
    ],
    [
     65.5,
     83.5
    ],
    [
     588.5,
     638.5
    ]
   ],
   "auszug": 870,
   "steckt_in": [
    "C2"
   ],
   "zapfen_von": "C2-Wa"
  },
  {
   "id": "C2-Wa-Z5",
   "name": "Zapfen Wange in Sitzbrett rechts",
   "gruppe": "brett",
   "material": "sitz",
   "faehrt": "bretter",
   "box": [
    [
     -522.0,
     -504.0
    ],
    [
     65.5,
     83.5
    ],
    [
     768.5,
     818.5
    ]
   ],
   "auszug": 870,
   "steckt_in": [
    "C2"
   ],
   "zapfen_von": "C2-Wa"
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
     41.0,
     65.5
    ],
    [
     -1.5,
     868.5
    ]
   ],
   "auszug": 870,
   "rohmass": [
    870.0,
    43.5
   ]
  },
  {
   "id": "C2-Wb-Z1",
   "name": "Zapfen Wange in Sitzbrett rechts",
   "gruppe": "brett",
   "material": "sitz",
   "faehrt": "bretter",
   "box": [
    [
     -268.0,
     -250.0
    ],
    [
     65.5,
     83.5
    ],
    [
     48.5,
     98.5
    ]
   ],
   "auszug": 870,
   "steckt_in": [
    "C2"
   ],
   "zapfen_von": "C2-Wb"
  },
  {
   "id": "C2-Wb-Z2",
   "name": "Zapfen Wange in Sitzbrett rechts",
   "gruppe": "brett",
   "material": "sitz",
   "faehrt": "bretter",
   "box": [
    [
     -268.0,
     -250.0
    ],
    [
     65.5,
     83.5
    ],
    [
     228.5,
     278.5
    ]
   ],
   "auszug": 870,
   "steckt_in": [
    "C2"
   ],
   "zapfen_von": "C2-Wb"
  },
  {
   "id": "C2-Wb-Z3",
   "name": "Zapfen Wange in Sitzbrett rechts",
   "gruppe": "brett",
   "material": "sitz",
   "faehrt": "bretter",
   "box": [
    [
     -268.0,
     -250.0
    ],
    [
     65.5,
     83.5
    ],
    [
     408.5,
     458.5
    ]
   ],
   "auszug": 870,
   "steckt_in": [
    "C2"
   ],
   "zapfen_von": "C2-Wb"
  },
  {
   "id": "C2-Wb-Z4",
   "name": "Zapfen Wange in Sitzbrett rechts",
   "gruppe": "brett",
   "material": "sitz",
   "faehrt": "bretter",
   "box": [
    [
     -268.0,
     -250.0
    ],
    [
     65.5,
     83.5
    ],
    [
     588.5,
     638.5
    ]
   ],
   "auszug": 870,
   "steckt_in": [
    "C2"
   ],
   "zapfen_von": "C2-Wb"
  },
  {
   "id": "C2-Wb-Z5",
   "name": "Zapfen Wange in Sitzbrett rechts",
   "gruppe": "brett",
   "material": "sitz",
   "faehrt": "bretter",
   "box": [
    [
     -268.0,
     -250.0
    ],
    [
     65.5,
     83.5
    ],
    [
     768.5,
     818.5
    ]
   ],
   "auszug": 870,
   "steckt_in": [
    "C2"
   ],
   "zapfen_von": "C2-Wb"
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
     88.5,
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
     99,
     152
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
     99,
     152
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
     250.5
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
     181,
     234
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
     181,
     234
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
     239,
     315
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
     239,
     315
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
     286.5,
     304.5
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
     262.0,
     286.5
    ],
    [
     -1.5,
     868.5
    ]
   ],
   "auszug": 870,
   "rohmass": [
    870.0,
    43.5
   ]
  },
  {
   "id": "C3-Wa-Z1",
   "name": "Zapfen Wange in Tischbrett Mitte",
   "gruppe": "brett",
   "material": "tisch",
   "faehrt": "bretter",
   "box": [
    [
     -192.0,
     -174.0
    ],
    [
     286.5,
     304.5
    ],
    [
     48.5,
     98.5
    ]
   ],
   "auszug": 870,
   "steckt_in": [
    "C3"
   ],
   "zapfen_von": "C3-Wa"
  },
  {
   "id": "C3-Wa-Z2",
   "name": "Zapfen Wange in Tischbrett Mitte",
   "gruppe": "brett",
   "material": "tisch",
   "faehrt": "bretter",
   "box": [
    [
     -192.0,
     -174.0
    ],
    [
     286.5,
     304.5
    ],
    [
     228.5,
     278.5
    ]
   ],
   "auszug": 870,
   "steckt_in": [
    "C3"
   ],
   "zapfen_von": "C3-Wa"
  },
  {
   "id": "C3-Wa-Z3",
   "name": "Zapfen Wange in Tischbrett Mitte",
   "gruppe": "brett",
   "material": "tisch",
   "faehrt": "bretter",
   "box": [
    [
     -192.0,
     -174.0
    ],
    [
     286.5,
     304.5
    ],
    [
     408.5,
     458.5
    ]
   ],
   "auszug": 870,
   "steckt_in": [
    "C3"
   ],
   "zapfen_von": "C3-Wa"
  },
  {
   "id": "C3-Wa-Z4",
   "name": "Zapfen Wange in Tischbrett Mitte",
   "gruppe": "brett",
   "material": "tisch",
   "faehrt": "bretter",
   "box": [
    [
     -192.0,
     -174.0
    ],
    [
     286.5,
     304.5
    ],
    [
     588.5,
     638.5
    ]
   ],
   "auszug": 870,
   "steckt_in": [
    "C3"
   ],
   "zapfen_von": "C3-Wa"
  },
  {
   "id": "C3-Wa-Z5",
   "name": "Zapfen Wange in Tischbrett Mitte",
   "gruppe": "brett",
   "material": "tisch",
   "faehrt": "bretter",
   "box": [
    [
     -192.0,
     -174.0
    ],
    [
     286.5,
     304.5
    ],
    [
     768.5,
     818.5
    ]
   ],
   "auszug": 870,
   "steckt_in": [
    "C3"
   ],
   "zapfen_von": "C3-Wa"
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
     262.0,
     286.5
    ],
    [
     -1.5,
     868.5
    ]
   ],
   "auszug": 870,
   "rohmass": [
    870.0,
    43.5
   ]
  },
  {
   "id": "C3-Wb-Z1",
   "name": "Zapfen Wange in Tischbrett Mitte",
   "gruppe": "brett",
   "material": "tisch",
   "faehrt": "bretter",
   "box": [
    [
     174.0,
     192.0
    ],
    [
     286.5,
     304.5
    ],
    [
     48.5,
     98.5
    ]
   ],
   "auszug": 870,
   "steckt_in": [
    "C3"
   ],
   "zapfen_von": "C3-Wb"
  },
  {
   "id": "C3-Wb-Z2",
   "name": "Zapfen Wange in Tischbrett Mitte",
   "gruppe": "brett",
   "material": "tisch",
   "faehrt": "bretter",
   "box": [
    [
     174.0,
     192.0
    ],
    [
     286.5,
     304.5
    ],
    [
     228.5,
     278.5
    ]
   ],
   "auszug": 870,
   "steckt_in": [
    "C3"
   ],
   "zapfen_von": "C3-Wb"
  },
  {
   "id": "C3-Wb-Z3",
   "name": "Zapfen Wange in Tischbrett Mitte",
   "gruppe": "brett",
   "material": "tisch",
   "faehrt": "bretter",
   "box": [
    [
     174.0,
     192.0
    ],
    [
     286.5,
     304.5
    ],
    [
     408.5,
     458.5
    ]
   ],
   "auszug": 870,
   "steckt_in": [
    "C3"
   ],
   "zapfen_von": "C3-Wb"
  },
  {
   "id": "C3-Wb-Z4",
   "name": "Zapfen Wange in Tischbrett Mitte",
   "gruppe": "brett",
   "material": "tisch",
   "faehrt": "bretter",
   "box": [
    [
     174.0,
     192.0
    ],
    [
     286.5,
     304.5
    ],
    [
     588.5,
     638.5
    ]
   ],
   "auszug": 870,
   "steckt_in": [
    "C3"
   ],
   "zapfen_von": "C3-Wb"
  },
  {
   "id": "C3-Wb-Z5",
   "name": "Zapfen Wange in Tischbrett Mitte",
   "gruppe": "brett",
   "material": "tisch",
   "faehrt": "bretter",
   "box": [
    [
     174.0,
     192.0
    ],
    [
     286.5,
     304.5
    ],
    [
     768.5,
     818.5
    ]
   ],
   "auszug": 870,
   "steckt_in": [
    "C3"
   ],
   "zapfen_von": "C3-Wb"
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
    "a": "C1",
    "b": "C1-Wa-Z1",
    "box": [
     [
      250.0,
      268.0
     ],
     [
      65.5,
      83.5
     ],
     [
      48.5,
      98.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C1",
    "b": "C1-Wa-Z2",
    "box": [
     [
      250.0,
      268.0
     ],
     [
      65.5,
      83.5
     ],
     [
      228.5,
      278.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C1",
    "b": "C1-Wa-Z3",
    "box": [
     [
      250.0,
      268.0
     ],
     [
      65.5,
      83.5
     ],
     [
      408.5,
      458.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C1",
    "b": "C1-Wa-Z4",
    "box": [
     [
      250.0,
      268.0
     ],
     [
      65.5,
      83.5
     ],
     [
      588.5,
      638.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C1",
    "b": "C1-Wa-Z5",
    "box": [
     [
      250.0,
      268.0
     ],
     [
      65.5,
      83.5
     ],
     [
      768.5,
      818.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C1",
    "b": "C1-Wb-Z1",
    "box": [
     [
      504.0,
      522.0
     ],
     [
      65.5,
      83.5
     ],
     [
      48.5,
      98.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C1",
    "b": "C1-Wb-Z2",
    "box": [
     [
      504.0,
      522.0
     ],
     [
      65.5,
      83.5
     ],
     [
      228.5,
      278.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C1",
    "b": "C1-Wb-Z3",
    "box": [
     [
      504.0,
      522.0
     ],
     [
      65.5,
      83.5
     ],
     [
      408.5,
      458.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C1",
    "b": "C1-Wb-Z4",
    "box": [
     [
      504.0,
      522.0
     ],
     [
      65.5,
      83.5
     ],
     [
      588.5,
      638.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C1",
    "b": "C1-Wb-Z5",
    "box": [
     [
      504.0,
      522.0
     ],
     [
      65.5,
      83.5
     ],
     [
      768.5,
      818.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C2",
    "b": "C2-Wa-Z1",
    "box": [
     [
      -522.0,
      -504.0
     ],
     [
      65.5,
      83.5
     ],
     [
      48.5,
      98.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C2",
    "b": "C2-Wa-Z2",
    "box": [
     [
      -522.0,
      -504.0
     ],
     [
      65.5,
      83.5
     ],
     [
      228.5,
      278.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C2",
    "b": "C2-Wa-Z3",
    "box": [
     [
      -522.0,
      -504.0
     ],
     [
      65.5,
      83.5
     ],
     [
      408.5,
      458.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C2",
    "b": "C2-Wa-Z4",
    "box": [
     [
      -522.0,
      -504.0
     ],
     [
      65.5,
      83.5
     ],
     [
      588.5,
      638.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C2",
    "b": "C2-Wa-Z5",
    "box": [
     [
      -522.0,
      -504.0
     ],
     [
      65.5,
      83.5
     ],
     [
      768.5,
      818.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C2",
    "b": "C2-Wb-Z1",
    "box": [
     [
      -268.0,
      -250.0
     ],
     [
      65.5,
      83.5
     ],
     [
      48.5,
      98.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C2",
    "b": "C2-Wb-Z2",
    "box": [
     [
      -268.0,
      -250.0
     ],
     [
      65.5,
      83.5
     ],
     [
      228.5,
      278.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C2",
    "b": "C2-Wb-Z3",
    "box": [
     [
      -268.0,
      -250.0
     ],
     [
      65.5,
      83.5
     ],
     [
      408.5,
      458.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C2",
    "b": "C2-Wb-Z4",
    "box": [
     [
      -268.0,
      -250.0
     ],
     [
      65.5,
      83.5
     ],
     [
      588.5,
      638.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C2",
    "b": "C2-Wb-Z5",
    "box": [
     [
      -268.0,
      -250.0
     ],
     [
      65.5,
      83.5
     ],
     [
      768.5,
      818.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C3",
    "b": "C3-Wa-Z1",
    "box": [
     [
      -192.0,
      -174.0
     ],
     [
      286.5,
      304.5
     ],
     [
      48.5,
      98.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C3",
    "b": "C3-Wa-Z2",
    "box": [
     [
      -192.0,
      -174.0
     ],
     [
      286.5,
      304.5
     ],
     [
      228.5,
      278.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C3",
    "b": "C3-Wa-Z3",
    "box": [
     [
      -192.0,
      -174.0
     ],
     [
      286.5,
      304.5
     ],
     [
      408.5,
      458.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C3",
    "b": "C3-Wa-Z4",
    "box": [
     [
      -192.0,
      -174.0
     ],
     [
      286.5,
      304.5
     ],
     [
      588.5,
      638.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C3",
    "b": "C3-Wa-Z5",
    "box": [
     [
      -192.0,
      -174.0
     ],
     [
      286.5,
      304.5
     ],
     [
      768.5,
      818.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C3",
    "b": "C3-Wb-Z1",
    "box": [
     [
      174.0,
      192.0
     ],
     [
      286.5,
      304.5
     ],
     [
      48.5,
      98.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C3",
    "b": "C3-Wb-Z2",
    "box": [
     [
      174.0,
      192.0
     ],
     [
      286.5,
      304.5
     ],
     [
      228.5,
      278.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C3",
    "b": "C3-Wb-Z3",
    "box": [
     [
      174.0,
      192.0
     ],
     [
      286.5,
      304.5
     ],
     [
      408.5,
      458.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C3",
    "b": "C3-Wb-Z4",
    "box": [
     [
      174.0,
      192.0
     ],
     [
      286.5,
      304.5
     ],
     [
      588.5,
      638.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C3",
    "b": "C3-Wb-Z5",
    "box": [
     [
      174.0,
      192.0
     ],
     [
      286.5,
      304.5
     ],
     [
      768.5,
      818.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
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
    "a": "C1",
    "b": "C1-Wa-Z1",
    "box": [
     [
      250.0,
      268.0
     ],
     [
      65.5,
      83.5
     ],
     [
      48.5,
      98.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C1",
    "b": "C1-Wa-Z2",
    "box": [
     [
      250.0,
      268.0
     ],
     [
      65.5,
      83.5
     ],
     [
      228.5,
      278.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C1",
    "b": "C1-Wa-Z3",
    "box": [
     [
      250.0,
      268.0
     ],
     [
      65.5,
      83.5
     ],
     [
      408.5,
      458.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C1",
    "b": "C1-Wa-Z4",
    "box": [
     [
      250.0,
      268.0
     ],
     [
      65.5,
      83.5
     ],
     [
      588.5,
      638.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C1",
    "b": "C1-Wa-Z5",
    "box": [
     [
      250.0,
      268.0
     ],
     [
      65.5,
      83.5
     ],
     [
      768.5,
      818.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C1",
    "b": "C1-Wb-Z1",
    "box": [
     [
      504.0,
      522.0
     ],
     [
      65.5,
      83.5
     ],
     [
      48.5,
      98.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C1",
    "b": "C1-Wb-Z2",
    "box": [
     [
      504.0,
      522.0
     ],
     [
      65.5,
      83.5
     ],
     [
      228.5,
      278.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C1",
    "b": "C1-Wb-Z3",
    "box": [
     [
      504.0,
      522.0
     ],
     [
      65.5,
      83.5
     ],
     [
      408.5,
      458.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C1",
    "b": "C1-Wb-Z4",
    "box": [
     [
      504.0,
      522.0
     ],
     [
      65.5,
      83.5
     ],
     [
      588.5,
      638.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C1",
    "b": "C1-Wb-Z5",
    "box": [
     [
      504.0,
      522.0
     ],
     [
      65.5,
      83.5
     ],
     [
      768.5,
      818.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C2",
    "b": "C2-Wa-Z1",
    "box": [
     [
      -522.0,
      -504.0
     ],
     [
      65.5,
      83.5
     ],
     [
      48.5,
      98.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C2",
    "b": "C2-Wa-Z2",
    "box": [
     [
      -522.0,
      -504.0
     ],
     [
      65.5,
      83.5
     ],
     [
      228.5,
      278.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C2",
    "b": "C2-Wa-Z3",
    "box": [
     [
      -522.0,
      -504.0
     ],
     [
      65.5,
      83.5
     ],
     [
      408.5,
      458.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C2",
    "b": "C2-Wa-Z4",
    "box": [
     [
      -522.0,
      -504.0
     ],
     [
      65.5,
      83.5
     ],
     [
      588.5,
      638.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C2",
    "b": "C2-Wa-Z5",
    "box": [
     [
      -522.0,
      -504.0
     ],
     [
      65.5,
      83.5
     ],
     [
      768.5,
      818.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C2",
    "b": "C2-Wb-Z1",
    "box": [
     [
      -268.0,
      -250.0
     ],
     [
      65.5,
      83.5
     ],
     [
      48.5,
      98.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C2",
    "b": "C2-Wb-Z2",
    "box": [
     [
      -268.0,
      -250.0
     ],
     [
      65.5,
      83.5
     ],
     [
      228.5,
      278.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C2",
    "b": "C2-Wb-Z3",
    "box": [
     [
      -268.0,
      -250.0
     ],
     [
      65.5,
      83.5
     ],
     [
      408.5,
      458.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C2",
    "b": "C2-Wb-Z4",
    "box": [
     [
      -268.0,
      -250.0
     ],
     [
      65.5,
      83.5
     ],
     [
      588.5,
      638.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C2",
    "b": "C2-Wb-Z5",
    "box": [
     [
      -268.0,
      -250.0
     ],
     [
      65.5,
      83.5
     ],
     [
      768.5,
      818.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C3",
    "b": "C3-Wa-Z1",
    "box": [
     [
      -192.0,
      -174.0
     ],
     [
      286.5,
      304.5
     ],
     [
      48.5,
      98.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C3",
    "b": "C3-Wa-Z2",
    "box": [
     [
      -192.0,
      -174.0
     ],
     [
      286.5,
      304.5
     ],
     [
      228.5,
      278.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C3",
    "b": "C3-Wa-Z3",
    "box": [
     [
      -192.0,
      -174.0
     ],
     [
      286.5,
      304.5
     ],
     [
      408.5,
      458.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C3",
    "b": "C3-Wa-Z4",
    "box": [
     [
      -192.0,
      -174.0
     ],
     [
      286.5,
      304.5
     ],
     [
      588.5,
      638.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C3",
    "b": "C3-Wa-Z5",
    "box": [
     [
      -192.0,
      -174.0
     ],
     [
      286.5,
      304.5
     ],
     [
      768.5,
      818.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C3",
    "b": "C3-Wb-Z1",
    "box": [
     [
      174.0,
      192.0
     ],
     [
      286.5,
      304.5
     ],
     [
      48.5,
      98.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C3",
    "b": "C3-Wb-Z2",
    "box": [
     [
      174.0,
      192.0
     ],
     [
      286.5,
      304.5
     ],
     [
      228.5,
      278.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C3",
    "b": "C3-Wb-Z3",
    "box": [
     [
      174.0,
      192.0
     ],
     [
      286.5,
      304.5
     ],
     [
      408.5,
      458.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C3",
    "b": "C3-Wb-Z4",
    "box": [
     [
      174.0,
      192.0
     ],
     [
      286.5,
      304.5
     ],
     [
      588.5,
      638.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
     50.0
    ]
   },
   {
    "a": "C3",
    "b": "C3-Wb-Z5",
    "box": [
     [
      174.0,
      192.0
     ],
     [
      286.5,
      304.5
     ],
     [
      768.5,
      818.5
     ]
    ],
    "kategorie": "zapfen",
    "gewollt": true,
    "mass": [
     18.0,
     18.0,
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
   "a": "C1",
   "b": "C1-Wa-Z1",
   "box": [
    [
     250.0,
     268.0
    ],
    [
     65.5,
     83.5
    ],
    [
     48.5,
     98.5
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18.0,
    50.0
   ]
  },
  {
   "a": "C1",
   "b": "C1-Wa-Z2",
   "box": [
    [
     250.0,
     268.0
    ],
    [
     65.5,
     83.5
    ],
    [
     228.5,
     278.5
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18.0,
    50.0
   ]
  },
  {
   "a": "C1",
   "b": "C1-Wa-Z3",
   "box": [
    [
     250.0,
     268.0
    ],
    [
     65.5,
     83.5
    ],
    [
     408.5,
     458.5
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18.0,
    50.0
   ]
  },
  {
   "a": "C1",
   "b": "C1-Wa-Z4",
   "box": [
    [
     250.0,
     268.0
    ],
    [
     65.5,
     83.5
    ],
    [
     588.5,
     638.5
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18.0,
    50.0
   ]
  },
  {
   "a": "C1",
   "b": "C1-Wa-Z5",
   "box": [
    [
     250.0,
     268.0
    ],
    [
     65.5,
     83.5
    ],
    [
     768.5,
     818.5
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18.0,
    50.0
   ]
  },
  {
   "a": "C1",
   "b": "C1-Wb-Z1",
   "box": [
    [
     504.0,
     522.0
    ],
    [
     65.5,
     83.5
    ],
    [
     48.5,
     98.5
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18.0,
    50.0
   ]
  },
  {
   "a": "C1",
   "b": "C1-Wb-Z2",
   "box": [
    [
     504.0,
     522.0
    ],
    [
     65.5,
     83.5
    ],
    [
     228.5,
     278.5
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18.0,
    50.0
   ]
  },
  {
   "a": "C1",
   "b": "C1-Wb-Z3",
   "box": [
    [
     504.0,
     522.0
    ],
    [
     65.5,
     83.5
    ],
    [
     408.5,
     458.5
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18.0,
    50.0
   ]
  },
  {
   "a": "C1",
   "b": "C1-Wb-Z4",
   "box": [
    [
     504.0,
     522.0
    ],
    [
     65.5,
     83.5
    ],
    [
     588.5,
     638.5
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18.0,
    50.0
   ]
  },
  {
   "a": "C1",
   "b": "C1-Wb-Z5",
   "box": [
    [
     504.0,
     522.0
    ],
    [
     65.5,
     83.5
    ],
    [
     768.5,
     818.5
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18.0,
    50.0
   ]
  },
  {
   "a": "C2",
   "b": "C2-Wa-Z1",
   "box": [
    [
     -522.0,
     -504.0
    ],
    [
     65.5,
     83.5
    ],
    [
     48.5,
     98.5
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18.0,
    50.0
   ]
  },
  {
   "a": "C2",
   "b": "C2-Wa-Z2",
   "box": [
    [
     -522.0,
     -504.0
    ],
    [
     65.5,
     83.5
    ],
    [
     228.5,
     278.5
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18.0,
    50.0
   ]
  },
  {
   "a": "C2",
   "b": "C2-Wa-Z3",
   "box": [
    [
     -522.0,
     -504.0
    ],
    [
     65.5,
     83.5
    ],
    [
     408.5,
     458.5
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18.0,
    50.0
   ]
  },
  {
   "a": "C2",
   "b": "C2-Wa-Z4",
   "box": [
    [
     -522.0,
     -504.0
    ],
    [
     65.5,
     83.5
    ],
    [
     588.5,
     638.5
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18.0,
    50.0
   ]
  },
  {
   "a": "C2",
   "b": "C2-Wa-Z5",
   "box": [
    [
     -522.0,
     -504.0
    ],
    [
     65.5,
     83.5
    ],
    [
     768.5,
     818.5
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18.0,
    50.0
   ]
  },
  {
   "a": "C2",
   "b": "C2-Wb-Z1",
   "box": [
    [
     -268.0,
     -250.0
    ],
    [
     65.5,
     83.5
    ],
    [
     48.5,
     98.5
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18.0,
    50.0
   ]
  },
  {
   "a": "C2",
   "b": "C2-Wb-Z2",
   "box": [
    [
     -268.0,
     -250.0
    ],
    [
     65.5,
     83.5
    ],
    [
     228.5,
     278.5
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18.0,
    50.0
   ]
  },
  {
   "a": "C2",
   "b": "C2-Wb-Z3",
   "box": [
    [
     -268.0,
     -250.0
    ],
    [
     65.5,
     83.5
    ],
    [
     408.5,
     458.5
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18.0,
    50.0
   ]
  },
  {
   "a": "C2",
   "b": "C2-Wb-Z4",
   "box": [
    [
     -268.0,
     -250.0
    ],
    [
     65.5,
     83.5
    ],
    [
     588.5,
     638.5
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18.0,
    50.0
   ]
  },
  {
   "a": "C2",
   "b": "C2-Wb-Z5",
   "box": [
    [
     -268.0,
     -250.0
    ],
    [
     65.5,
     83.5
    ],
    [
     768.5,
     818.5
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18.0,
    50.0
   ]
  },
  {
   "a": "C3",
   "b": "C3-Wa-Z1",
   "box": [
    [
     -192.0,
     -174.0
    ],
    [
     286.5,
     304.5
    ],
    [
     48.5,
     98.5
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18.0,
    50.0
   ]
  },
  {
   "a": "C3",
   "b": "C3-Wa-Z2",
   "box": [
    [
     -192.0,
     -174.0
    ],
    [
     286.5,
     304.5
    ],
    [
     228.5,
     278.5
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18.0,
    50.0
   ]
  },
  {
   "a": "C3",
   "b": "C3-Wa-Z3",
   "box": [
    [
     -192.0,
     -174.0
    ],
    [
     286.5,
     304.5
    ],
    [
     408.5,
     458.5
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18.0,
    50.0
   ]
  },
  {
   "a": "C3",
   "b": "C3-Wa-Z4",
   "box": [
    [
     -192.0,
     -174.0
    ],
    [
     286.5,
     304.5
    ],
    [
     588.5,
     638.5
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18.0,
    50.0
   ]
  },
  {
   "a": "C3",
   "b": "C3-Wa-Z5",
   "box": [
    [
     -192.0,
     -174.0
    ],
    [
     286.5,
     304.5
    ],
    [
     768.5,
     818.5
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18.0,
    50.0
   ]
  },
  {
   "a": "C3",
   "b": "C3-Wb-Z1",
   "box": [
    [
     174.0,
     192.0
    ],
    [
     286.5,
     304.5
    ],
    [
     48.5,
     98.5
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18.0,
    50.0
   ]
  },
  {
   "a": "C3",
   "b": "C3-Wb-Z2",
   "box": [
    [
     174.0,
     192.0
    ],
    [
     286.5,
     304.5
    ],
    [
     228.5,
     278.5
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18.0,
    50.0
   ]
  },
  {
   "a": "C3",
   "b": "C3-Wb-Z3",
   "box": [
    [
     174.0,
     192.0
    ],
    [
     286.5,
     304.5
    ],
    [
     408.5,
     458.5
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18.0,
    50.0
   ]
  },
  {
   "a": "C3",
   "b": "C3-Wb-Z4",
   "box": [
    [
     174.0,
     192.0
    ],
    [
     286.5,
     304.5
    ],
    [
     588.5,
     638.5
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18.0,
    50.0
   ]
  },
  {
   "a": "C3",
   "b": "C3-Wb-Z5",
   "box": [
    [
     174.0,
     192.0
    ],
    [
     286.5,
     304.5
    ],
    [
     768.5,
     818.5
    ]
   ],
   "kategorie": "zapfen",
   "gewollt": true,
   "mass": [
    18.0,
    18.0,
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
    88.5,
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
     32.36
    ],
    [
     831.0,
     32.36
    ],
    [
     831.0,
     64.71
    ],
    [
     850.0,
     64.71
    ],
    [
     850.0,
     97.07
    ],
    [
     831.0,
     97.07
    ],
    [
     831.0,
     129.43
    ],
    [
     850.0,
     129.43
    ],
    [
     850.0,
     161.79
    ],
    [
     831.0,
     161.79
    ],
    [
     831.0,
     194.14
    ],
    [
     850.0,
     194.14
    ],
    [
     850.0,
     226.5
    ],
    [
     0,
     226.5
    ],
    [
     0,
     194.14
    ],
    [
     19,
     194.14
    ],
    [
     19,
     161.79
    ],
    [
     0,
     161.79
    ],
    [
     0,
     129.43
    ],
    [
     19,
     129.43
    ],
    [
     19,
     97.07
    ],
    [
     0,
     97.07
    ],
    [
     0,
     64.71
    ],
    [
     19,
     64.71
    ],
    [
     19,
     32.36
    ],
    [
     0,
     32.36
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
     78.5,
     217.0,
     196.5,
     20
    ],
    [
     257.0,
     78.5,
     405.0,
     196.5,
     20
    ],
    [
     445.0,
     78.5,
     593.0,
     196.5,
     20
    ],
    [
     633.0,
     78.5,
     781.0,
     196.5,
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
    88.5,
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
     32.36
    ],
    [
     831.0,
     32.36
    ],
    [
     831.0,
     64.71
    ],
    [
     850.0,
     64.71
    ],
    [
     850.0,
     97.07
    ],
    [
     831.0,
     97.07
    ],
    [
     831.0,
     129.43
    ],
    [
     850.0,
     129.43
    ],
    [
     850.0,
     161.79
    ],
    [
     831.0,
     161.79
    ],
    [
     831.0,
     194.14
    ],
    [
     850.0,
     194.14
    ],
    [
     850.0,
     226.5
    ],
    [
     0,
     226.5
    ],
    [
     0,
     194.14
    ],
    [
     19,
     194.14
    ],
    [
     19,
     161.79
    ],
    [
     0,
     161.79
    ],
    [
     0,
     129.43
    ],
    [
     19,
     129.43
    ],
    [
     19,
     97.07
    ],
    [
     0,
     97.07
    ],
    [
     0,
     64.71
    ],
    [
     19,
     64.71
    ],
    [
     19,
     32.36
    ],
    [
     0,
     32.36
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
     78.5,
     217.0,
     196.5,
     20
    ],
    [
     257.0,
     78.5,
     405.0,
     196.5,
     20
    ],
    [
     445.0,
     78.5,
     593.0,
     196.5,
     20
    ],
    [
     633.0,
     78.5,
     781.0,
     196.5,
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
    88.5,
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
     32.36
    ],
    [
     274.0,
     32.36
    ],
    [
     274.0,
     64.71
    ],
    [
     255.0,
     64.71
    ],
    [
     255.0,
     97.07
    ],
    [
     274.0,
     97.07
    ],
    [
     274.0,
     129.43
    ],
    [
     255.0,
     129.43
    ],
    [
     255.0,
     161.79
    ],
    [
     274.0,
     161.79
    ],
    [
     274.0,
     194.14
    ],
    [
     255.0,
     194.14
    ],
    [
     255.0,
     226.5
    ],
    [
     207.0,
     226.5
    ],
    [
     205.049,
     226.308
    ],
    [
     203.173,
     225.739
    ],
    [
     201.444,
     224.815
    ],
    [
     199.929,
     223.571
    ],
    [
     198.685,
     222.056
    ],
    [
     197.761,
     220.327
    ],
    [
     197.192,
     218.451
    ],
    [
     197.0,
     216.5
    ],
    [
     197.0,
     206.5
    ],
    [
     196.712,
     203.574
    ],
    [
     195.858,
     200.76
    ],
    [
     194.472,
     198.166
    ],
    [
     192.607,
     195.893
    ],
    [
     190.334,
     194.028
    ],
    [
     187.74,
     192.642
    ],
    [
     184.926,
     191.788
    ],
    [
     182.0,
     191.5
    ],
    [
     92.0,
     191.5
    ],
    [
     89.074,
     191.788
    ],
    [
     86.26,
     192.642
    ],
    [
     83.666,
     194.028
    ],
    [
     81.393,
     195.893
    ],
    [
     79.528,
     198.166
    ],
    [
     78.142,
     200.76
    ],
    [
     77.288,
     203.574
    ],
    [
     77.0,
     206.5
    ],
    [
     77.0,
     216.5
    ],
    [
     76.808,
     218.451
    ],
    [
     76.239,
     220.327
    ],
    [
     75.315,
     222.056
    ],
    [
     74.071,
     223.571
    ],
    [
     72.556,
     224.815
    ],
    [
     70.827,
     225.739
    ],
    [
     68.951,
     226.308
    ],
    [
     67.0,
     226.5
    ],
    [
     19,
     226.5
    ],
    [
     19,
     194.14
    ],
    [
     0,
     194.14
    ],
    [
     0,
     161.79
    ],
    [
     19,
     161.79
    ],
    [
     19,
     129.43
    ],
    [
     0,
     129.43
    ],
    [
     0,
     97.07
    ],
    [
     19,
     97.07
    ],
    [
     19,
     64.71
    ],
    [
     0,
     64.71
    ],
    [
     0,
     32.36
    ],
    [
     19,
     32.36
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
     71.75,
     109.5,
     96.75,
     12.5
    ],
    [
     124.5,
     71.75,
     149.5,
     96.75,
     12.5
    ],
    [
     164.5,
     71.75,
     189.5,
     96.75,
     12.5
    ],
    [
     84.5,
     111.75,
     109.5,
     136.75,
     12.5
    ],
    [
     124.5,
     111.75,
     149.5,
     136.75,
     12.5
    ],
    [
     164.5,
     111.75,
     189.5,
     136.75,
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
    88.5,
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
     32.36
    ],
    [
     274.0,
     32.36
    ],
    [
     274.0,
     64.71
    ],
    [
     255.0,
     64.71
    ],
    [
     255.0,
     97.07
    ],
    [
     274.0,
     97.07
    ],
    [
     274.0,
     129.43
    ],
    [
     255.0,
     129.43
    ],
    [
     255.0,
     161.79
    ],
    [
     274.0,
     161.79
    ],
    [
     274.0,
     194.14
    ],
    [
     255.0,
     194.14
    ],
    [
     255.0,
     226.5
    ],
    [
     19,
     226.5
    ],
    [
     19,
     194.14
    ],
    [
     0,
     194.14
    ],
    [
     0,
     161.79
    ],
    [
     19,
     161.79
    ],
    [
     19,
     129.43
    ],
    [
     0,
     129.43
    ],
    [
     0,
     97.07
    ],
    [
     19,
     97.07
    ],
    [
     19,
     64.71
    ],
    [
     0,
     64.71
    ],
    [
     0,
     32.36
    ],
    [
     19,
     32.36
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
     71.75,
     109.5,
     96.75,
     12.5
    ],
    [
     124.5,
     71.75,
     149.5,
     96.75,
     12.5
    ],
    [
     164.5,
     71.75,
     189.5,
     96.75,
     12.5
    ],
    [
     84.5,
     111.75,
     109.5,
     136.75,
     12.5
    ],
    [
     124.5,
     111.75,
     149.5,
     136.75,
     12.5
    ],
    [
     164.5,
     111.75,
     189.5,
     136.75,
     12.5
    ],
    [
     84.5,
     151.75,
     109.5,
     176.75,
     12.5
    ],
    [
     124.5,
     151.75,
     149.5,
     176.75,
     12.5
    ],
    [
     164.5,
     151.75,
     189.5,
     176.75,
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
    110.5,
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
    88.5,
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
     32.36
    ],
    [
     831.0,
     32.36
    ],
    [
     831.0,
     64.71
    ],
    [
     850.0,
     64.71
    ],
    [
     850.0,
     97.07
    ],
    [
     831.0,
     97.07
    ],
    [
     831.0,
     129.43
    ],
    [
     850.0,
     129.43
    ],
    [
     850.0,
     161.79
    ],
    [
     831.0,
     161.79
    ],
    [
     831.0,
     194.14
    ],
    [
     850.0,
     194.14
    ],
    [
     850.0,
     226.5
    ],
    [
     0,
     226.5
    ],
    [
     0,
     194.14
    ],
    [
     19,
     194.14
    ],
    [
     19,
     161.79
    ],
    [
     0,
     161.79
    ],
    [
     0,
     129.43
    ],
    [
     19,
     129.43
    ],
    [
     19,
     97.07
    ],
    [
     0,
     97.07
    ],
    [
     0,
     64.71
    ],
    [
     19,
     64.71
    ],
    [
     19,
     32.36
    ],
    [
     0,
     32.36
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
     78.5,
     217.0,
     196.5,
     20
    ],
    [
     257.0,
     78.5,
     405.0,
     196.5,
     20
    ],
    [
     445.0,
     78.5,
     593.0,
     196.5,
     20
    ],
    [
     633.0,
     78.5,
     781.0,
     196.5,
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
    88.5,
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
     32.36
    ],
    [
     831.0,
     32.36
    ],
    [
     831.0,
     64.71
    ],
    [
     850.0,
     64.71
    ],
    [
     850.0,
     97.07
    ],
    [
     831.0,
     97.07
    ],
    [
     831.0,
     129.43
    ],
    [
     850.0,
     129.43
    ],
    [
     850.0,
     161.79
    ],
    [
     831.0,
     161.79
    ],
    [
     831.0,
     194.14
    ],
    [
     850.0,
     194.14
    ],
    [
     850.0,
     226.5
    ],
    [
     0,
     226.5
    ],
    [
     0,
     194.14
    ],
    [
     19,
     194.14
    ],
    [
     19,
     161.79
    ],
    [
     0,
     161.79
    ],
    [
     0,
     129.43
    ],
    [
     19,
     129.43
    ],
    [
     19,
     97.07
    ],
    [
     0,
     97.07
    ],
    [
     0,
     64.71
    ],
    [
     19,
     64.71
    ],
    [
     19,
     32.36
    ],
    [
     0,
     32.36
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
     78.5,
     217.0,
     196.5,
     20
    ],
    [
     257.0,
     78.5,
     405.0,
     196.5,
     20
    ],
    [
     445.0,
     78.5,
     593.0,
     196.5,
     20
    ],
    [
     633.0,
     78.5,
     781.0,
     196.5,
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
    88.5,
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
     32.36
    ],
    [
     274.0,
     32.36
    ],
    [
     274.0,
     64.71
    ],
    [
     255.0,
     64.71
    ],
    [
     255.0,
     97.07
    ],
    [
     274.0,
     97.07
    ],
    [
     274.0,
     129.43
    ],
    [
     255.0,
     129.43
    ],
    [
     255.0,
     161.79
    ],
    [
     274.0,
     161.79
    ],
    [
     274.0,
     194.14
    ],
    [
     255.0,
     194.14
    ],
    [
     255.0,
     226.5
    ],
    [
     207.0,
     226.5
    ],
    [
     205.049,
     226.308
    ],
    [
     203.173,
     225.739
    ],
    [
     201.444,
     224.815
    ],
    [
     199.929,
     223.571
    ],
    [
     198.685,
     222.056
    ],
    [
     197.761,
     220.327
    ],
    [
     197.192,
     218.451
    ],
    [
     197.0,
     216.5
    ],
    [
     197.0,
     206.5
    ],
    [
     196.712,
     203.574
    ],
    [
     195.858,
     200.76
    ],
    [
     194.472,
     198.166
    ],
    [
     192.607,
     195.893
    ],
    [
     190.334,
     194.028
    ],
    [
     187.74,
     192.642
    ],
    [
     184.926,
     191.788
    ],
    [
     182.0,
     191.5
    ],
    [
     92.0,
     191.5
    ],
    [
     89.074,
     191.788
    ],
    [
     86.26,
     192.642
    ],
    [
     83.666,
     194.028
    ],
    [
     81.393,
     195.893
    ],
    [
     79.528,
     198.166
    ],
    [
     78.142,
     200.76
    ],
    [
     77.288,
     203.574
    ],
    [
     77.0,
     206.5
    ],
    [
     77.0,
     216.5
    ],
    [
     76.808,
     218.451
    ],
    [
     76.239,
     220.327
    ],
    [
     75.315,
     222.056
    ],
    [
     74.071,
     223.571
    ],
    [
     72.556,
     224.815
    ],
    [
     70.827,
     225.739
    ],
    [
     68.951,
     226.308
    ],
    [
     67.0,
     226.5
    ],
    [
     19,
     226.5
    ],
    [
     19,
     194.14
    ],
    [
     0,
     194.14
    ],
    [
     0,
     161.79
    ],
    [
     19,
     161.79
    ],
    [
     19,
     129.43
    ],
    [
     0,
     129.43
    ],
    [
     0,
     97.07
    ],
    [
     19,
     97.07
    ],
    [
     19,
     64.71
    ],
    [
     0,
     64.71
    ],
    [
     0,
     32.36
    ],
    [
     19,
     32.36
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
     71.75,
     109.5,
     96.75,
     12.5
    ],
    [
     124.5,
     71.75,
     149.5,
     96.75,
     12.5
    ],
    [
     164.5,
     71.75,
     189.5,
     96.75,
     12.5
    ],
    [
     84.5,
     111.75,
     109.5,
     136.75,
     12.5
    ],
    [
     124.5,
     111.75,
     149.5,
     136.75,
     12.5
    ],
    [
     164.5,
     111.75,
     189.5,
     136.75,
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
    88.5,
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
     32.36
    ],
    [
     274.0,
     32.36
    ],
    [
     274.0,
     64.71
    ],
    [
     255.0,
     64.71
    ],
    [
     255.0,
     97.07
    ],
    [
     274.0,
     97.07
    ],
    [
     274.0,
     129.43
    ],
    [
     255.0,
     129.43
    ],
    [
     255.0,
     161.79
    ],
    [
     274.0,
     161.79
    ],
    [
     274.0,
     194.14
    ],
    [
     255.0,
     194.14
    ],
    [
     255.0,
     226.5
    ],
    [
     19,
     226.5
    ],
    [
     19,
     194.14
    ],
    [
     0,
     194.14
    ],
    [
     0,
     161.79
    ],
    [
     19,
     161.79
    ],
    [
     19,
     129.43
    ],
    [
     0,
     129.43
    ],
    [
     0,
     97.07
    ],
    [
     19,
     97.07
    ],
    [
     19,
     64.71
    ],
    [
     0,
     64.71
    ],
    [
     0,
     32.36
    ],
    [
     19,
     32.36
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
     71.75,
     109.5,
     96.75,
     12.5
    ],
    [
     124.5,
     71.75,
     149.5,
     96.75,
     12.5
    ],
    [
     164.5,
     71.75,
     189.5,
     96.75,
     12.5
    ],
    [
     84.5,
     111.75,
     109.5,
     136.75,
     12.5
    ],
    [
     124.5,
     111.75,
     149.5,
     136.75,
     12.5
    ],
    [
     164.5,
     111.75,
     189.5,
     136.75,
     12.5
    ],
    [
     84.5,
     151.75,
     109.5,
     176.75,
     12.5
    ],
    [
     124.5,
     151.75,
     149.5,
     176.75,
     12.5
    ],
    [
     164.5,
     151.75,
     189.5,
     176.75,
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
    110.5,
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
     32.79
    ],
    [
     831.0,
     32.79
    ],
    [
     831.0,
     65.57
    ],
    [
     850.0,
     65.57
    ],
    [
     850.0,
     98.36
    ],
    [
     831.0,
     98.36
    ],
    [
     831.0,
     131.14
    ],
    [
     850.0,
     131.14
    ],
    [
     850.0,
     163.93
    ],
    [
     831.0,
     163.93
    ],
    [
     831.0,
     196.71
    ],
    [
     850.0,
     196.71
    ],
    [
     850.0,
     229.5
    ],
    [
     0,
     229.5
    ],
    [
     0,
     196.71
    ],
    [
     19,
     196.71
    ],
    [
     19,
     163.93
    ],
    [
     0,
     163.93
    ],
    [
     0,
     131.14
    ],
    [
     19,
     131.14
    ],
    [
     19,
     98.36
    ],
    [
     0,
     98.36
    ],
    [
     0,
     65.57
    ],
    [
     19,
     65.57
    ],
    [
     19,
     32.79
    ],
    [
     0,
     32.79
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
     66.0,
     97.5,
     91.0,
     12.5
    ],
    [
     112.5,
     66.0,
     137.5,
     91.0,
     12.5
    ],
    [
     152.5,
     66.0,
     177.5,
     91.0,
     12.5
    ],
    [
     192.5,
     66.0,
     217.5,
     91.0,
     12.5
    ],
    [
     232.5,
     66.0,
     257.5,
     91.0,
     12.5
    ],
    [
     272.5,
     66.0,
     297.5,
     91.0,
     12.5
    ],
    [
     312.5,
     66.0,
     337.5,
     91.0,
     12.5
    ],
    [
     352.5,
     66.0,
     377.5,
     91.0,
     12.5
    ],
    [
     392.5,
     66.0,
     417.5,
     91.0,
     12.5
    ],
    [
     432.5,
     66.0,
     457.5,
     91.0,
     12.5
    ],
    [
     472.5,
     66.0,
     497.5,
     91.0,
     12.5
    ],
    [
     512.5,
     66.0,
     537.5,
     91.0,
     12.5
    ],
    [
     552.5,
     66.0,
     577.5,
     91.0,
     12.5
    ],
    [
     592.5,
     66.0,
     617.5,
     91.0,
     12.5
    ],
    [
     632.5,
     66.0,
     657.5,
     91.0,
     12.5
    ],
    [
     672.5,
     66.0,
     697.5,
     91.0,
     12.5
    ],
    [
     712.5,
     66.0,
     737.5,
     91.0,
     12.5
    ],
    [
     752.5,
     66.0,
     777.5,
     91.0,
     12.5
    ],
    [
     72.5,
     106.0,
     97.5,
     131.0,
     12.5
    ],
    [
     112.5,
     106.0,
     137.5,
     131.0,
     12.5
    ],
    [
     152.5,
     106.0,
     177.5,
     131.0,
     12.5
    ],
    [
     192.5,
     106.0,
     217.5,
     131.0,
     12.5
    ],
    [
     232.5,
     106.0,
     257.5,
     131.0,
     12.5
    ],
    [
     272.5,
     106.0,
     297.5,
     131.0,
     12.5
    ],
    [
     312.5,
     106.0,
     337.5,
     131.0,
     12.5
    ],
    [
     352.5,
     106.0,
     377.5,
     131.0,
     12.5
    ],
    [
     392.5,
     106.0,
     417.5,
     131.0,
     12.5
    ],
    [
     432.5,
     106.0,
     457.5,
     131.0,
     12.5
    ],
    [
     472.5,
     106.0,
     497.5,
     131.0,
     12.5
    ],
    [
     512.5,
     106.0,
     537.5,
     131.0,
     12.5
    ],
    [
     552.5,
     106.0,
     577.5,
     131.0,
     12.5
    ],
    [
     592.5,
     106.0,
     617.5,
     131.0,
     12.5
    ],
    [
     632.5,
     106.0,
     657.5,
     131.0,
     12.5
    ],
    [
     672.5,
     106.0,
     697.5,
     131.0,
     12.5
    ],
    [
     712.5,
     106.0,
     737.5,
     131.0,
     12.5
    ],
    [
     752.5,
     106.0,
     777.5,
     131.0,
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
     32.79
    ],
    [
     831.0,
     32.79
    ],
    [
     831.0,
     65.57
    ],
    [
     850.0,
     65.57
    ],
    [
     850.0,
     98.36
    ],
    [
     831.0,
     98.36
    ],
    [
     831.0,
     131.14
    ],
    [
     850.0,
     131.14
    ],
    [
     850.0,
     163.93
    ],
    [
     831.0,
     163.93
    ],
    [
     831.0,
     196.71
    ],
    [
     850.0,
     196.71
    ],
    [
     850.0,
     229.5
    ],
    [
     0,
     229.5
    ],
    [
     0,
     196.71
    ],
    [
     19,
     196.71
    ],
    [
     19,
     163.93
    ],
    [
     0,
     163.93
    ],
    [
     0,
     131.14
    ],
    [
     19,
     131.14
    ],
    [
     19,
     98.36
    ],
    [
     0,
     98.36
    ],
    [
     0,
     65.57
    ],
    [
     19,
     65.57
    ],
    [
     19,
     32.79
    ],
    [
     0,
     32.79
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
     66.0,
     97.5,
     91.0,
     12.5
    ],
    [
     112.5,
     66.0,
     137.5,
     91.0,
     12.5
    ],
    [
     152.5,
     66.0,
     177.5,
     91.0,
     12.5
    ],
    [
     192.5,
     66.0,
     217.5,
     91.0,
     12.5
    ],
    [
     232.5,
     66.0,
     257.5,
     91.0,
     12.5
    ],
    [
     272.5,
     66.0,
     297.5,
     91.0,
     12.5
    ],
    [
     312.5,
     66.0,
     337.5,
     91.0,
     12.5
    ],
    [
     352.5,
     66.0,
     377.5,
     91.0,
     12.5
    ],
    [
     392.5,
     66.0,
     417.5,
     91.0,
     12.5
    ],
    [
     432.5,
     66.0,
     457.5,
     91.0,
     12.5
    ],
    [
     472.5,
     66.0,
     497.5,
     91.0,
     12.5
    ],
    [
     512.5,
     66.0,
     537.5,
     91.0,
     12.5
    ],
    [
     552.5,
     66.0,
     577.5,
     91.0,
     12.5
    ],
    [
     592.5,
     66.0,
     617.5,
     91.0,
     12.5
    ],
    [
     632.5,
     66.0,
     657.5,
     91.0,
     12.5
    ],
    [
     672.5,
     66.0,
     697.5,
     91.0,
     12.5
    ],
    [
     712.5,
     66.0,
     737.5,
     91.0,
     12.5
    ],
    [
     752.5,
     66.0,
     777.5,
     91.0,
     12.5
    ],
    [
     72.5,
     106.0,
     97.5,
     131.0,
     12.5
    ],
    [
     112.5,
     106.0,
     137.5,
     131.0,
     12.5
    ],
    [
     152.5,
     106.0,
     177.5,
     131.0,
     12.5
    ],
    [
     192.5,
     106.0,
     217.5,
     131.0,
     12.5
    ],
    [
     232.5,
     106.0,
     257.5,
     131.0,
     12.5
    ],
    [
     272.5,
     106.0,
     297.5,
     131.0,
     12.5
    ],
    [
     312.5,
     106.0,
     337.5,
     131.0,
     12.5
    ],
    [
     352.5,
     106.0,
     377.5,
     131.0,
     12.5
    ],
    [
     392.5,
     106.0,
     417.5,
     131.0,
     12.5
    ],
    [
     432.5,
     106.0,
     457.5,
     131.0,
     12.5
    ],
    [
     472.5,
     106.0,
     497.5,
     131.0,
     12.5
    ],
    [
     512.5,
     106.0,
     537.5,
     131.0,
     12.5
    ],
    [
     552.5,
     106.0,
     577.5,
     131.0,
     12.5
    ],
    [
     592.5,
     106.0,
     617.5,
     131.0,
     12.5
    ],
    [
     632.5,
     106.0,
     657.5,
     131.0,
     12.5
    ],
    [
     672.5,
     106.0,
     697.5,
     131.0,
     12.5
    ],
    [
     712.5,
     106.0,
     737.5,
     131.0,
     12.5
    ],
    [
     752.5,
     106.0,
     777.5,
     131.0,
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
     32.79
    ],
    [
     386.0,
     32.79
    ],
    [
     386.0,
     65.57
    ],
    [
     367.0,
     65.57
    ],
    [
     367.0,
     98.36
    ],
    [
     386.0,
     98.36
    ],
    [
     386.0,
     131.14
    ],
    [
     367.0,
     131.14
    ],
    [
     367.0,
     163.93
    ],
    [
     386.0,
     163.93
    ],
    [
     386.0,
     196.71
    ],
    [
     367.0,
     196.71
    ],
    [
     367.0,
     229.5
    ],
    [
     263.0,
     229.5
    ],
    [
     261.049,
     229.308
    ],
    [
     259.173,
     228.739
    ],
    [
     257.444,
     227.815
    ],
    [
     255.929,
     226.571
    ],
    [
     254.685,
     225.056
    ],
    [
     253.761,
     223.327
    ],
    [
     253.192,
     221.451
    ],
    [
     253.0,
     219.5
    ],
    [
     253.0,
     209.5
    ],
    [
     252.712,
     206.574
    ],
    [
     251.858,
     203.76
    ],
    [
     250.472,
     201.166
    ],
    [
     248.607,
     198.893
    ],
    [
     246.334,
     197.028
    ],
    [
     243.74,
     195.642
    ],
    [
     240.926,
     194.788
    ],
    [
     238.0,
     194.5
    ],
    [
     148.0,
     194.5
    ],
    [
     145.074,
     194.788
    ],
    [
     142.26,
     195.642
    ],
    [
     139.666,
     197.028
    ],
    [
     137.393,
     198.893
    ],
    [
     135.528,
     201.166
    ],
    [
     134.142,
     203.76
    ],
    [
     133.288,
     206.574
    ],
    [
     133.0,
     209.5
    ],
    [
     133.0,
     219.5
    ],
    [
     132.808,
     221.451
    ],
    [
     132.239,
     223.327
    ],
    [
     131.315,
     225.056
    ],
    [
     130.071,
     226.571
    ],
    [
     128.556,
     227.815
    ],
    [
     126.827,
     228.739
    ],
    [
     124.951,
     229.308
    ],
    [
     123.0,
     229.5
    ],
    [
     19,
     229.5
    ],
    [
     19,
     196.71
    ],
    [
     0,
     196.71
    ],
    [
     0,
     163.93
    ],
    [
     19,
     163.93
    ],
    [
     19,
     131.14
    ],
    [
     0,
     131.14
    ],
    [
     0,
     98.36
    ],
    [
     19,
     98.36
    ],
    [
     19,
     65.57
    ],
    [
     0,
     65.57
    ],
    [
     0,
     32.79
    ],
    [
     19,
     32.79
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
     53.25,
     105.5,
     78.25,
     12.5
    ],
    [
     120.5,
     53.25,
     145.5,
     78.25,
     12.5
    ],
    [
     160.5,
     53.25,
     185.5,
     78.25,
     12.5
    ],
    [
     200.5,
     53.25,
     225.5,
     78.25,
     12.5
    ],
    [
     240.5,
     53.25,
     265.5,
     78.25,
     12.5
    ],
    [
     280.5,
     53.25,
     305.5,
     78.25,
     12.5
    ],
    [
     80.5,
     93.25,
     105.5,
     118.25,
     12.5
    ],
    [
     120.5,
     93.25,
     145.5,
     118.25,
     12.5
    ],
    [
     160.5,
     93.25,
     185.5,
     118.25,
     12.5
    ],
    [
     200.5,
     93.25,
     225.5,
     118.25,
     12.5
    ],
    [
     240.5,
     93.25,
     265.5,
     118.25,
     12.5
    ],
    [
     280.5,
     93.25,
     305.5,
     118.25,
     12.5
    ],
    [
     80.5,
     133.25,
     105.5,
     158.25,
     12.5
    ],
    [
     120.5,
     133.25,
     145.5,
     158.25,
     12.5
    ],
    [
     160.5,
     133.25,
     185.5,
     158.25,
     12.5
    ],
    [
     200.5,
     133.25,
     225.5,
     158.25,
     12.5
    ],
    [
     240.5,
     133.25,
     265.5,
     158.25,
     12.5
    ],
    [
     280.5,
     133.25,
     305.5,
     158.25,
     12.5
    ],
    [
     80.5,
     173.25,
     105.5,
     198.25,
     12.5
    ],
    [
     280.5,
     173.25,
     305.5,
     198.25,
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
     32.79
    ],
    [
     386.0,
     32.79
    ],
    [
     386.0,
     65.57
    ],
    [
     367.0,
     65.57
    ],
    [
     367.0,
     98.36
    ],
    [
     386.0,
     98.36
    ],
    [
     386.0,
     131.14
    ],
    [
     367.0,
     131.14
    ],
    [
     367.0,
     163.93
    ],
    [
     386.0,
     163.93
    ],
    [
     386.0,
     196.71
    ],
    [
     367.0,
     196.71
    ],
    [
     367.0,
     229.5
    ],
    [
     19,
     229.5
    ],
    [
     19,
     196.71
    ],
    [
     0,
     196.71
    ],
    [
     0,
     163.93
    ],
    [
     19,
     163.93
    ],
    [
     19,
     131.14
    ],
    [
     0,
     131.14
    ],
    [
     0,
     98.36
    ],
    [
     19,
     98.36
    ],
    [
     19,
     65.57
    ],
    [
     0,
     65.57
    ],
    [
     0,
     32.79
    ],
    [
     19,
     32.79
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
     53.25,
     105.5,
     78.25,
     12.5
    ],
    [
     120.5,
     53.25,
     145.5,
     78.25,
     12.5
    ],
    [
     160.5,
     53.25,
     185.5,
     78.25,
     12.5
    ],
    [
     200.5,
     53.25,
     225.5,
     78.25,
     12.5
    ],
    [
     240.5,
     53.25,
     265.5,
     78.25,
     12.5
    ],
    [
     280.5,
     53.25,
     305.5,
     78.25,
     12.5
    ],
    [
     80.5,
     93.25,
     105.5,
     118.25,
     12.5
    ],
    [
     120.5,
     93.25,
     145.5,
     118.25,
     12.5
    ],
    [
     160.5,
     93.25,
     185.5,
     118.25,
     12.5
    ],
    [
     200.5,
     93.25,
     225.5,
     118.25,
     12.5
    ],
    [
     240.5,
     93.25,
     265.5,
     118.25,
     12.5
    ],
    [
     280.5,
     93.25,
     305.5,
     118.25,
     12.5
    ],
    [
     80.5,
     133.25,
     105.5,
     158.25,
     12.5
    ],
    [
     120.5,
     133.25,
     145.5,
     158.25,
     12.5
    ],
    [
     160.5,
     133.25,
     185.5,
     158.25,
     12.5
    ],
    [
     200.5,
     133.25,
     225.5,
     158.25,
     12.5
    ],
    [
     240.5,
     133.25,
     265.5,
     158.25,
     12.5
    ],
    [
     280.5,
     133.25,
     305.5,
     158.25,
     12.5
    ],
    [
     80.5,
     173.25,
     105.5,
     198.25,
     12.5
    ],
    [
     120.5,
     173.25,
     145.5,
     198.25,
     12.5
    ],
    [
     160.5,
     173.25,
     185.5,
     198.25,
     12.5
    ],
    [
     200.5,
     173.25,
     225.5,
     198.25,
     12.5
    ],
    [
     240.5,
     173.25,
     265.5,
     198.25,
     12.5
    ],
    [
     280.5,
     173.25,
     305.5,
     198.25,
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

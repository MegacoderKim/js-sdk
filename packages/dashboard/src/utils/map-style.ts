import {environment} from "../environments/environment";

export const LeafletStyle = {
  water: {
    fill: true,
    weight: 1,
    fillColor: '#06cccc',
    color: '#06cccc',
    fillOpacity: 0.2,
    opacity: 0.4,
  },
  admin: {
    weight: 1,
    fillColor: 'pink',
    color: 'pink',
    fillOpacity: 0.2,
    opacity: 0.4
  },
  waterway: {
    weight: 1,
    fillColor: '#2375e0',
    color: '#2375e0',
    fillOpacity: 0.2,
    opacity: 0.4
  },
  landcover: {
    fill: true,
    weight: 1,
    fillColor: '#53e033',
    color: '#53e033',
    fillOpacity: 0.2,
    opacity: 0.4,
  },
  landuse: {
    fill: true,
    weight: 1,
    fillColor: '#e5b404',
    color: '#e5b404',
    fillOpacity: 0.2,
    opacity: 0.4
  },
  park: {
    fill: true,
    weight: 1,
    fillColor: '#84ea5b',
    color: '#84ea5b',
    fillOpacity: 0.2,
    opacity: 0.4
  },
  boundary: {
    weight: 1,
    fillColor: '#c545d3',
    color: '#c545d3',
    fillOpacity: 0.2,
    opacity: 0.4
  },
  aeroway: {
    weight: 1,
    fillColor: '#51aeb5',
    color: '#51aeb5',
    fillOpacity: 0.2,
    opacity: 0.4
  },
  road: {	// mapbox & mapzen only
    weight: 1,
    fillColor: '#f2b648',
    color: '#f2b648',
    fillOpacity: 0.2,
    opacity: 0.4
  },
  tunnel: {	// mapbox only
    weight: 0.5,
    fillColor: '#f2b648',
    color: '#f2b648',
    fillOpacity: 0.2,
    opacity: 0.4,
// 					dashArray: [4, 4]
  },
  bridge: {	// mapbox only
    weight: 0.5,
    fillColor: '#f2b648',
    color: '#f2b648',
    fillOpacity: 0.2,
    opacity: 0.4,
// 					dashArray: [4, 4]
  },
  transportation: {	// openmaptiles only
    weight: 0.5,
    fillColor: '#f2b648',
    color: '#f2b648',
    fillOpacity: 0.2,
    opacity: 0.4,
// 					dashArray: [4, 4]
  },
  transit: {	// mapzen only
    weight: 0.5,
    fillColor: '#f2b648',
    color: '#f2b648',
    fillOpacity: 0.2,
    opacity: 0.4,
// 					dashArray: [4, 4]
  },
  building: {
    fill: true,
    weight: 1,
    fillColor: '#2b2b2b',
    color: '#2b2b2b',
    fillOpacity: 0.2,
    opacity: 0.4
  },
  water_name: {
    weight: 1,
    fillColor: '#022c5b',
    color: '#022c5b',
    fillOpacity: 0.2,
    opacity: 0.4
  },
  transportation_name: {
    weight: 1,
    fillColor: '#bc6b38',
    color: '#bc6b38',
    fillOpacity: 0.2,
    opacity: 0.4
  },
  place: {
    weight: 1,
    fillColor: '#f20e93',
    color: '#f20e93',
    fillOpacity: 0.2,
    opacity: 0.4
  },
  housenumber: {
    weight: 1,
    fillColor: '#ef4c8b',
    color: '#ef4c8b',
    fillOpacity: 0.2,
    opacity: 0.4
  },
  poi: {
    weight: 1,
    fillColor: '#3bb50a',
    color: '#3bb50a',
    fillOpacity: 0.2,
    opacity: 0.4
  },
  earth: {	// mapzen only
    fill: true,
    weight: 1,
    fillColor: '#c0c0c0',
    color: '#c0c0c0',
    fillOpacity: 0.2,
    opacity: 0.4
  },
  // Do not symbolize some stuff for mapbox
  country_label: [],
  marine_label: [],
  state_label: [],
  place_label: [],
  waterway_label: [],
  poi_label: [],
  road_label: [],
  housenum_label: [],
  // Do not symbolize some stuff for openmaptiles
  country_name: [],
  marine_name: [],
  state_name: [],
  place_name: [],
  waterway_name: [],
  poi_name: [],
  road_name: [],
  housenum_name: [],
};
export const mapboxStudio = {
  "version": 8,
  "name": "Dashboard Major v2-copy",
  "metadata": {
    "mapbox:autocomposite": true,
    "mapbox:groups": {
      "433e1b690178cccbd16e5d1c3a1eddf8": {
        "name": "Group"
      }
    }
  },
  "center": [
    437.19584158898886,
    28.527384628173365
  ],
  "zoom": 13.85954827590236,
  "bearing": 0,
  "pitch": 0,
  "sources": {
    "osm": {
      "type": "vector",
      "tiles": ["https://tile.mapzen.com/mapzen/vector/v1/all/{z}/{x}/{y}.mvt?api_key=" + environment.mapzenKey]
    }
  },
  "sprite": "mapbox://sprites/devopshypertrack/cix0ofof8002f2pnwhwfzpco4",
  "glyphs": "mapbox://fonts/devopshypertrack/{fontstack}/{range}.pbf",
  "layers": [
    {
      "id": "background",
      "type": "background",
      "paint": {
        "background-color": "hsl(0, 0%, 93%)"
      }
    },
    {
      "id": "landuse_overlay_national_park",
      "type": "fill",
      "source": "composite",
      "source-layer": "landuse_overlay",
      "filter": [
        "==",
        "class",
        "national_park"
      ],
      "paint": {
        "fill-color": "hsl(86, 14%, 79%)",
        "fill-opacity": 0.75
      }
    },
    {
      "id": "landuse_park",
      "type": "fill",
      "source": "composite",
      "source-layer": "landuse",
      "filter": [
        "==",
        "class",
        "park"
      ],
      "paint": {
        "fill-color": "hsl(96, 4%, 90%)"
      }
    },
    {
      "id": "waterway",
      "type": "line",
      "source": "composite",
      "source-layer": "waterway",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "in",
          "class",
          "canal",
          "river"
        ]
      ],
      "paint": {
        "line-color": "hsl(0, 0%, 77%)",
        "line-width": {
          "base": 1.4,
          "stops": [
            [
              8,
              0.5
            ],
            [
              20,
              15
            ]
          ]
        }
      }
    },
    {
      "id": "water",
      "type": "fill",
      "source": "composite",
      "source-layer": "water",
      "paint": {
        "fill-color": "hsl(206, 23%, 84%)"
      }
    },
    {
      "id": "building",
      "type": "fill",
      "source": "composite",
      "source-layer": "building",
      "paint": {
        "fill-color": "hsl(0, 4%, 88%)"
      }
    },
    {
      "id": "tunnel_minor",
      "type": "line",
      "source": "composite",
      "source-layer": "road",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "==",
            "structure",
            "tunnel"
          ],
          [
            "in",
            "class",
            "link",
            "motorway_link",
            "path",
            "pedestrian",
            "service",
            "street",
            "street_limited",
            "track"
          ]
        ]
      ],
      "layout": {
        "line-cap": "butt",
        "line-join": "miter"
      },
      "paint": {
        "line-color": "#efefef",
        "line-width": {
          "base": 1.55,
          "stops": [
            [
              4,
              0.25
            ],
            [
              20,
              30
            ]
          ]
        },
        "line-dasharray": [
          0.36,
          0.18
        ]
      }
    },
    {
      "id": "tunnel_major",
      "type": "line",
      "source": "composite",
      "source-layer": "road",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "==",
            "structure",
            "tunnel"
          ],
          [
            "in",
            "class",
            "motorway",
            "primary",
            "secondary",
            "tertiary",
            "trunk"
          ]
        ]
      ],
      "layout": {
        "line-cap": "butt",
        "line-join": "miter"
      },
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.4,
          "stops": [
            [
              6,
              0.5
            ],
            [
              20,
              30
            ]
          ]
        },
        "line-dasharray": [
          0.28,
          0.14
        ]
      }
    },
    {
      "id": "road_minor",
      "type": "line",
      "source": "composite",
      "source-layer": "road",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "in",
            "class",
            "link",
            "motorway_link",
            "path",
            "pedestrian",
            "service",
            "street",
            "street_limited",
            "track"
          ],
          [
            "in",
            "structure",
            "ford",
            "none"
          ]
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "hsl(0, 0%, 90%)",
        "line-width": {
          "base": 1.55,
          "stops": [
            [
              4,
              0.25
            ],
            [
              20,
              30
            ]
          ]
        },
        "line-opacity": {
          "base": 1,
          "stops": [
            [
              11,
              0
            ],
            [
              14,
              1
            ]
          ]
        }
      }
    },
    {
      "id": "road_major",
      "type": "line",
      "source": "composite",
      "source-layer": "road",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "in",
            "class",
            "motorway",
            "primary",
            "secondary",
            "tertiary",
            "trunk"
          ],
          [
            "in",
            "structure",
            "ford",
            "none"
          ]
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "hsl(0, 0%, 86%)",
        "line-width": {
          "base": 1.4,
          "stops": [
            [
              6,
              0.5
            ],
            [
              20,
              30
            ]
          ]
        }
      }
    },
    {
      "id": "bridge_minor case",
      "type": "line",
      "source": "composite",
      "source-layer": "road",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "==",
            "structure",
            "bridge"
          ],
          [
            "in",
            "class",
            "link",
            "motorway_link",
            "path",
            "pedestrian",
            "service",
            "street",
            "street_limited",
            "track"
          ]
        ]
      ],
      "layout": {
        "line-cap": "butt",
        "line-join": "miter"
      },
      "paint": {
        "line-color": "#dedede",
        "line-width": {
          "base": 1.6,
          "stops": [
            [
              12,
              0.5
            ],
            [
              20,
              10
            ]
          ]
        },
        "line-gap-width": {
          "base": 1.55,
          "stops": [
            [
              4,
              0.25
            ],
            [
              20,
              30
            ]
          ]
        }
      }
    },
    {
      "id": "bridge_major case",
      "type": "line",
      "source": "composite",
      "source-layer": "road",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "==",
            "structure",
            "bridge"
          ],
          [
            "in",
            "class",
            "motorway",
            "primary",
            "secondary",
            "tertiary",
            "trunk"
          ]
        ]
      ],
      "layout": {
        "line-cap": "butt",
        "line-join": "miter"
      },
      "paint": {
        "line-color": "#dedede",
        "line-width": {
          "base": 1.6,
          "stops": [
            [
              12,
              0.5
            ],
            [
              20,
              10
            ]
          ]
        },
        "line-gap-width": {
          "base": 1.55,
          "stops": [
            [
              4,
              0.25
            ],
            [
              20,
              30
            ]
          ]
        }
      }
    },
    {
      "id": "bridge_minor",
      "type": "line",
      "source": "composite",
      "source-layer": "road",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "==",
            "structure",
            "bridge"
          ],
          [
            "in",
            "class",
            "link",
            "motorway_link",
            "path",
            "pedestrian",
            "service",
            "street",
            "street_limited",
            "track"
          ]
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#efefef",
        "line-width": {
          "base": 1.55,
          "stops": [
            [
              4,
              0.25
            ],
            [
              20,
              30
            ]
          ]
        }
      }
    },
    {
      "id": "bridge_major",
      "type": "line",
      "source": "composite",
      "source-layer": "road",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "==",
            "structure",
            "bridge"
          ],
          [
            "in",
            "class",
            "motorway",
            "primary",
            "secondary",
            "tertiary",
            "trunk"
          ]
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.4,
          "stops": [
            [
              6,
              0.5
            ],
            [
              20,
              30
            ]
          ]
        }
      }
    },
    {
      "id": "admin_country",
      "type": "line",
      "source": "composite",
      "source-layer": "admin",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "<=",
            "admin_level",
            2
          ],
          [
            "==",
            "maritime",
            0
          ]
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "hsl(0, 0%, 52%)",
        "line-width": {
          "base": 1.3,
          "stops": [
            [
              3,
              0.5
            ],
            [
              16,
              15
            ]
          ]
        },
        "line-opacity": {
          "base": 1,
          "stops": [
            [
              1,
              0.4
            ],
            [
              3,
              1
            ]
          ]
        }
      }
    },
    {
      "id": "road_major_label",
      "type": "symbol",
      "source": "composite",
      "source-layer": "road_label",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "in",
          "class",
          "motorway",
          "primary",
          "secondary",
          "tertiary",
          "trunk"
        ]
      ],
      "layout": {
        "symbol-placement": "line",
        "text-field": "{name_en}",
        "text-font": [
          "Open Sans Semibold",
          "Arial Unicode MS Bold"
        ],
        "text-transform": "uppercase",
        "text-letter-spacing": 0.1,
        "text-size": {
          "base": 1.4,
          "stops": [
            [
              10,
              8
            ],
            [
              20,
              14
            ]
          ]
        }
      },
      "paint": {
        "text-color": "#666",
        "text-halo-color": "rgba(255,255,255,0.75)",
        "text-halo-width": 2
      }
    },
    {
      "id": "place_label_other",
      "type": "symbol",
      "source": "composite",
      "source-layer": "place_label",
      "minzoom": 8,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "in",
          "type",
          "hamlet",
          "island",
          "neighbourhood",
          "suburb",
          "town",
          "village"
        ]
      ],
      "layout": {
        "text-field": "{name_en}",
        "text-font": [
          "Open Sans Semibold",
          "Arial Unicode MS Bold"
        ],
        "text-max-width": 6,
        "text-size": {
          "stops": [
            [
              6,
              12
            ],
            [
              12,
              16
            ]
          ]
        }
      },
      "paint": {
        "text-color": "#666",
        "text-halo-color": "rgba(255,255,255,0.75)",
        "text-halo-width": 1,
        "text-halo-blur": 1
      }
    },
    {
      "id": "place_label_city",
      "type": "symbol",
      "source": "composite",
      "source-layer": "place_label",
      "maxzoom": 16,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "==",
          "type",
          "city"
        ]
      ],
      "layout": {
        "text-field": "{name_en}",
        "text-font": [
          "Open Sans Bold",
          "Arial Unicode MS Bold"
        ],
        "text-max-width": 10,
        "text-size": {
          "stops": [
            [
              3,
              12
            ],
            [
              8,
              16
            ]
          ]
        }
      },
      "paint": {
        "text-color": "#666",
        "text-halo-color": "rgba(255,255,255,0.75)",
        "text-halo-width": 1,
        "text-halo-blur": 1
      }
    },
    {
      "id": "country_label",
      "type": "symbol",
      "source": "composite",
      "source-layer": "country_label",
      "maxzoom": 12,
      "filter": [
        "==",
        "$type",
        "Point"
      ],
      "layout": {
        "text-field": "{name_en}",
        "text-font": [
          "Open Sans Regular",
          "Arial Unicode MS Regular"
        ],
        "text-max-width": 10,
        "text-size": {
          "stops": [
            [
              3,
              10
            ],
            [
              8,
              22
            ]
          ]
        }
      },
      "paint": {
        "text-color": "hsl(0, 1%, 19%)",
        "text-halo-color": "rgba(255,255,255,0.75)",
        "text-halo-width": 0,
        "text-halo-blur": 1
      }
    },
    {
      "id": "road-label",
      "type": "symbol",
      "source": "composite",
      "source-layer": "road_label",
      "filter": [
        "==",
        "$type",
        "LineString"
      ],
      "layout": {
        "visibility": "visible",
        "text-field": "{name_en}",
        "text-size": 12,
        "symbol-placement": "line",
        "text-rotation-alignment": "map",
        "text-padding": 1
      },
      "paint": {
        "text-opacity": 1,
        "text-color": "hsl(0, 1%, 34%)"
      }
    },
    {
      "id": "poi-label",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "433e1b690178cccbd16e5d1c3a1eddf8"
      },
      "source": "composite",
      "source-layer": "poi_label",
      "filter": [
        "in",
        "maki",
        "campsite",
        "cemetery",
        "college",
        "dog-park",
        "fire-station",
        "golf",
        "monument",
        "park",
        "picnic-site",
        "school",
        "stadium",
        "zoo"
      ],
      "layout": {
        "visibility": "visible",
        "text-field": "{name_en}",
        "text-size": 12.19,
        "icon-image": "{maki}-11",
        "text-anchor": "top",
        "text-offset": [
          0,
          0.65
        ]
      },
      "paint": {
        "text-color": "hsl(0, 1%, 42%)",
        "icon-opacity": 0.25
      }
    },
    {
      "id": "place-label (1)",
      "type": "symbol",
      "source": "composite",
      "source-layer": "place_label",
      "layout": {
        "visibility": "visible",
        "text-field": "{name_en}",
        "text-size": 14
      },
      "paint": {
        "text-color": "hsl(0, 0%, 10%)"
      }
    },
    {
      "id": "airport-label",
      "type": "symbol",
      "source": "composite",
      "source-layer": "airport_label",
      "layout": {
        "visibility": "visible",
        "text-field": "{name_en}",
        "text-size": 14.07,
        "text-anchor": "top"
      },
      "paint": {
        "text-color": "hsl(0, 3%, 43%)"
      }
    },
    {
      "id": "place-label",
      "type": "symbol",
      "source": "composite",
      "source-layer": "place_label",
      "minzoom": 8,
      "maxzoom": 15,
      "filter": [
        "in",
        "type",
        "",
        "village"
      ],
      "layout": {
        "visibility": "visible",
        "text-field": "{name_en}",
        "text-size": 11.5
      },
      "paint": {
        "text-color": "hsl(0, 1%, 51%)",
        "text-opacity": {
          "base": 1,
          "stops": [
            [
              11,
              0
            ],
            [
              12,
              1
            ]
          ]
        }
      }
    },
    {
      "id": "rail-station-label",
      "type": "symbol",
      "source": "composite",
      "source-layer": "rail_station_label",
      "layout": {
        "visibility": "visible",
        "text-field": "{name_en}",
        "text-size": 12.07
      },
      "paint": {
        "text-color": "hsl(0, 2%, 46%)"
      }
    },
    {
      "id": "state-label",
      "type": "symbol",
      "source": "composite",
      "source-layer": "state_label",
      "layout": {
        "visibility": "visible",
        "text-field": "{name_en}",
        "text-size": 12.3
      },
      "paint": {
        "text-color": "hsl(0, 3%, 46%)"
      }
    },
    {
      "id": "admin",
      "type": "line",
      "source": "composite",
      "source-layer": "admin",
      "filter": [
        "==",
        "admin_level",
        4
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "line-color": "hsl(0, 1%, 59%)",
        "line-opacity": {
          "base": 1,
          "stops": [
            [
              3,
              0
            ],
            [
              6,
              0.56
            ]
          ]
        }
      }
    }
  ],
  "created": "2016-12-22T18:03:33.098Z",
  "id": "cix0ofof8002f2pnwhwfzpco4",
  "modified": "2016-12-22T18:03:33.098Z",
  "owner": "devopshypertrack",
  "visibility": "private",
  "draft": false
}

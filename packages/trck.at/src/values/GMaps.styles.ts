/* Snazzy Maps - https://snazzymaps.com/style/151/ultra-light-with-labels*/
import MapTypeStyle = google.maps.MapTypeStyle;

export const ultraLightWithLabel: MapTypeStyle[] = [
  {
    'featureType': 'water',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#e9e9e9'
      },
      {
        'lightness': 17
      }
    ]
  },
  {
    'featureType': 'landscape',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#f5f5f5'
      },
      {
        'lightness': 20
      }
    ]
  },
  {
    'featureType': 'road.highway',
    'elementType': 'geometry.fill',
    'stylers': [
      {
        'color': '#ffffff'
      },
      {
        'lightness': 17
      }
    ]
  },
  {
    'featureType': 'road.highway',
    'elementType': 'geometry.stroke',
    'stylers': [
      {
        'color': '#ffffff'
      },
      {
        'lightness': 29
      },
      {
        'weight': 0.2
      }
    ]
  },
  {
    'featureType': 'road.arterial',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#ffffff'
      },
      {
        'lightness': 18
      }
    ]
  },
  {
    'featureType': 'road.local',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#ffffff'
      },
      {
        'lightness': 16
      }
    ]
  },
  {
    'featureType': 'poi',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#f5f5f5'
      },
      {
        'lightness': 21
      }
    ]
  },
  {
    'featureType': 'poi.park',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#dedede'
      },
      {
        'lightness': 21
      }
    ]
  },
  {
    'elementType': 'labels.text.stroke',
    'stylers': [
      {
        'visibility': 'on'
      },
      {
        'color': '#ffffff'
      },
      {
        'lightness': 16
      }
    ]
  },
  {
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'saturation': 36
      },
      {
        'color': '#333333'
      },
      {
        'lightness': 40
      }
    ]
  },
  {
    'elementType': 'labels.icon',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'featureType': 'transit',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#f2f2f2'
      },
      {
        'lightness': 19
      }
    ]
  },
  {
    'featureType': 'administrative',
    'elementType': 'geometry.fill',
    'stylers': [
      {
        'color': '#fefefe'
      },
      {
        'lightness': 20
      }
    ]
  },
  {
    'featureType': 'administrative',
    'elementType': 'geometry.stroke',
    'stylers': [
      {
        'color': '#fefefe'
      },
      {
        'lightness': 17
      },
      {
        'weight': 1.2
      }
    ]
  }
];

/* Snazzy maps - https://snazzymaps.com/style/84/pastel-tones */
export const pastelTones = [
  {
    'featureType': 'landscape',
    'stylers': [
      {
        'saturation': -100
      },
      {
        'lightness': 60
      }
    ]
  },
  {
    'featureType': 'road.local',
    'stylers': [
      {
        'saturation': -100
      },
      {
        'lightness': 40
      },
      {
        'visibility': 'on'
      }
    ]
  },
  {
    'featureType': 'transit',
    'stylers': [
      {
        'saturation': -100
      },
      {
        'visibility': 'simplified'
      }
    ]
  },
  {
    'featureType': 'administrative.province',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'featureType': 'water',
    'stylers': [
      {
        'visibility': 'on'
      },
      {
        'lightness': 30
      }
    ]
  },
  {
    'featureType': 'road.highway',
    'elementType': 'geometry.fill',
    'stylers': [
      {
        'color': '#ef8c25'
      },
      {
        'lightness': 40
      }
    ]
  },
  {
    'featureType': 'road.highway',
    'elementType': 'geometry.stroke',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'featureType': 'poi.park',
    'elementType': 'geometry.fill',
    'stylers': [
      {
        'color': '#b6c54c'
      },
      {
        'lightness': 40
      },
      {
        'saturation': -40
      }
    ]
  },
  {}
];
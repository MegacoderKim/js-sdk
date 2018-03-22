import {environment} from "../environments/environment";
// import {LeafletStyle, mapboxStudio} from "./map-style";
// var mapboxgl = require('mapbox-gl');
// require('leaflet.vectorgrid');
// require('mapzen.js')
require('../assets/mapzen-standalone.js');
export function setMapzen(id: string | Element, options) {
  var mapboxStyleUrl = "mapbox://styles/devopshypertrack/cj1g6pagz000v2rmt1rl4itrf"
  // mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2b3BzaHlwZXJ0cmFjayIsImEiOiJjaXZ3Mjh2YnAwMHQ3MnpvdXgxa3ZoNTZwIn0.Vn-Pr8mFaHy3pxQjG29DNA';

  // var map = L.map(id, options);
  // var mapzenTilesUrl = "https://tile.mapzen.com/mapzen/vector/v1/all/{z}/{x}/{y}.mvt?api_key=" + environment.mapzenKey;
  // var mapzenVectorTileOptions = {
  //   rendererFactory: L.canvas.tile,
  //   vectorTileLayerStyles: mapboxStudio,
  //   apikey: environment.mapzenKey,
  // };
  // var mapzenTilesPbfLayer = L.mapbox.vectorGrid.protobuf(mapzenTilesUrl, mapzenVectorTileOptions);
  // mapzenTilesPbfLayer.addTo(map);

  L.Mapzen.apiKey = environment.mapzenKey;
  var map = L.Mapzen.map(id as string, {
    ...options,
    tangramOptions: {
      // scene: L.Mapzen.BasemapStyles.ZincMoreLabels,
      // scene: 'https://mapzen.com/api/scenes/50214/611/resources/bubble-wrap.yaml'
      scene: 'https://mapzen.com/api/scenes/50214/612/resources/cinnabar-style.yaml'
    }
  });

  // var map = new mapboxgl.Map({
  //   container: id,
  //   style: mapboxStudio,
  //   ...options
  // });

  // var map = L.mapbox.map(id, {
  //   ...options,
  //   featureLayer: "https://tile.mapzen.com/mapzen/vector/v1/all/{z}/{x}/{y}.geojson?api_key=" + environment.mapzenKey
  // });


  return map;
}

declare namespace L {
  namespace mapbox {
    export function map(id: string, options?: any): any
    namespace vectorGrid {
      export function slicer(data: any, options?: any): any;
      export function protobuf(data: any, options?: any): any;
    }
  }
  export function map(id: string, options?: any): any
  namespace Mapzen {
    export let apiKey: string;
    export function map(id: string, options?: any): any;
    export const BasemapStyles: {CinnabarMoreLabels, BubbleWrapMoreLabels,ZincMoreLabels}
  }
  namespace vectorGrid {
    export function slicer(data: any, options?: any): any;
    export function protobuf(data: any, options?: any): any;
  }
  namespace canvas {
    export const tile: any
  }
}


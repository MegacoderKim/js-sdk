declare const RichMarker: any | google.maps.Marker;
declare const RichMarkerPosition: any;

export function Richmarker(options, position?) {
    require('../lib/richmarker');
    options = position ? {...options, anchor: RichMarkerPosition[position]} : options;
    return new RichMarker(options)
}
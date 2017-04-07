declare const RichMarker: any | google.maps.Marker;
declare const RichMarkerPosition: any;

export function Richmarker(options, isMid?) {
    require('../lib/richmarker');
    options = isMid ? {...options, anchor: RichMarkerPosition.MIDDLE} : options;
    return new RichMarker(options)
}
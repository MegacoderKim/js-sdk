import MapTypeStyle = google.maps.MapTypeStyle;
import {Assets} from "./assets";
import {CustomVehicleIcon} from "./model";
import GestureHandlingOptions = google.maps.GestureHandlingOptions;

export const DefaultGMapsStyle: MapTypeStyle[] = [
  {
    "stylers": [
      {
        "saturation": -100
      }
    ]
  }
];
let gestureHandling: GestureHandlingOptions = 'greedy';
export const DefaultGoogleMapOptions = {
  zoom: 14,
  disableDefaultUI: true,
  scrollwheel: true,
  scaleControl: false,
  clickableIcons: false,
  gestureHandling: gestureHandling,
  center: new google.maps.LatLng(37.370641488030245, -122.07498079040533),
  styles: DefaultGMapsStyle
};

export const DefaultPolylineOptions = {
  strokeColor: "rgb(223, 92, 193)",
  strokeOpacity: 1,
  strokeWeight: 3,
  icons: []
};

export const DefaultVehicleIcon: CustomVehicleIcon = {
  src: Assets.defaultHeroMarker,
  height: '30px'
};
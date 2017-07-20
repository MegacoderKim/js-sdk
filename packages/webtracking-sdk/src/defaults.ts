import MapTypeStyle = google.maps.MapTypeStyle;

export const DefaultGMapsStyle: MapTypeStyle[] = [
  {
    "stylers": [
      {
        "saturation": -100
      }
    ]
  }
];

export const DefaultGoogleMapOptions = {
  zoom: 14,
  disableDefaultUI:true,
  scrollwheel: true,
  scaleControl: false,
  clickableIcons: false,
  center: new google.maps.LatLng(37.370641488030245, -122.07498079040533),
  styles: DefaultGMapsStyle
};
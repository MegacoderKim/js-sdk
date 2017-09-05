Javascript library to render a map with live tracking view on any web page. Its written in Typescript and ships with the typing information.

## Web-tracking SDK
The SDK takes location data as input and renders it on a Google Maps view. Furthermore, it continuously takes new data as input and animates them on the map. The core features of this library are:
* Initialize and render map in your DOM container
* Initialize and render markers for start location, current location, end location, destination and trailing polyline
* Handle multiple simultaneous trips on the map maintaining separate markers and polylines
* Smooth animation for user marker on data update
* Customizations with full access and control over map object
 
### Installation

***npm***

```sh
npm install ht-webtracking-sdk --save
```

***Or Script Tag***

Add ‘dist/track.js’ as a script tag between <head> and </head> of your html. It exposes global ht object on window.

### Prerequisites

1. Load the Google Maps JavaScript API with API key by adding a script tag like the one in the following example in the <head> of your html:

```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>
```

2. Create Map DOM container: In the html file, create a DOM which would contain the map. Give it a unique id. Example:
```html
<div id="map" style="height: 300px; width: 500px"></div>
```

### Usage
The SDK exposes a global variable ht with the trackByData method. Call this method with the `TrackingData` object(s) to instantiate the class and render location data on the map. Furthermore, pass the `TrackingDataOptions` object to specify the map container, callbacks and customizations.
New location data for the trip(s) is passed on to the `track()` method in a similar format. Pass the data to the instantiated class with the id for which you wish to update the tracking experience and animate the marker to its new location.

```js
var ht = require('ht-webtracking-sdk');
var trackedData = ht.trackByData([{
  "id": "",
  "encodedTimeAwarePolyline": "spxsBsdb|LymoqvAx@TKvAr@K",
  "destination": {}
  }],
  {
    "mapId": "map",
    "mapOptions": {},
    "onReady": handleOnReady,
    "onError": handleOnError  }
);
```

### Customization

The SDK follows a default color scheme with its own custom icons and map polyline color. You may pass custom base64 images and polyline options through MapOptions within TrackingOptions to override these defaults. The SDK also exposes the map object via callbacks for full control and access of the tracking experience to the developer. For example, use this to customize the user marker
```js
var trackingOptions = {
  "mapId": "map",
  "mapOptions": {
    "vehicleIcon": {
        src: "data:image/png;base64,iVBORw0KGgoAAA....",
        height: "60px"
    }
  },
  ...
}
```

### References 
#### Interfaces

1. `ITrackingData`: Tracking data
2. `ITrackingDataOptions`: Options that are passed to the sdk to customize the tracking.
3. `IAction`: HyperTrack Action object. This is passed to `onReady` and `onUpdate` callbacks.
4. `ITrackedData`: Object with keys as id of each data object and value as TrackData class.

##### Tracking Data
```js
interface ITrackingData {
    id?: string,
    encodedTimeAwarePolyline: string;
    destination?: IPlace;
    isLive: boolean;
    vehicleType?: string;
}
```
##### Tracking options
```js
interface ITrackingDataOptions {
    mapId: string; //id of DOM where map is to be rendered
    mapOptions?: IMapOptions;
    onError?: (error: any) => void;
    onReady?: (trackedData: ITrackedData, dataArray: ITrackingData[], map: google.maps.Map) => void;
}
```
```js
interface IMapOptions {
    gMapsStyle?: MapTypeStyle[] | null;
    bottomPadding?: number;
    topPadding?: number;
    vehicleIcon?: CustomVehicleIcon;
}
```
```js
interface CustomVehicleIcon {
    src: string;
    height: string;
}
```
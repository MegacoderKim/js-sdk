# Webtracking SDK

Javascript library to power live tracking experience of HyperTrack actions. This library is written in Typescript and ships with the typing information. This Doc is written in typescript style to highlight the interfaces and types of each entity, functions and argument
 
### How to install

***npm***

`npm install ht-webtracking-sdk --save`

***Bower***

`bower install ht-webtracking-sdk --save`

### Setup
Add `dist/track.js` as a script tag in the html

`ht` is global object exposed by the library.

`ht` exposes 3 ways to track an action

**`ht.trackShortCode(shortCode: string, pk: string, trackingOptions: ITrackOption)`:** 
To be used when short code of the action is known. The first argument is the `action.short_code`, this code is also part of `action.tracking_url` generated for each action, which is a default tracking link for the action.

**`ht.trackActionId(actionId: string, pk: string, trackingOptions: ITrackOption)`:**
To be used when `action.id`, i.e. ID of the action is known.

**`ht.trackAction(action: IAction, pk: string, trackingOptions: ITrackOption)`:**
To be used when `action` object is known.

#### Other Entities

1. pk: Publishable key
2. trackingOptions: Options that can be passed to customize tracking experience


***HINT:*** `function example(a: string, b: number, c: IAction) => void` means example function takes 3 arguments of type string, number and `action` object respectively and returns `void`. `IAction` is an interface for `action` object, which defines the key and value types of the object. Refer interfaces definitions in the end`.

### How to use

#####Tracking using shortCode #####

****1. Create Map DOM container:****
In the html file create a DOM which would contain the map. Give it a unique id. 

E.g. `<div id="map" style="height: 300px; width: 500px"></div>`

****2. Create onActionReady callback:****
Create a `onActionReady` which will take `action` object as an argument. This is a callback which is fired when tracking it initialized. 

E.g `var onActionReady =  function(action) { //do anything with action here}`

****3. Create onActionUpdate callback:****
Create a `onActionUpdate` which will take `action` object as an argument. This is a callback fired when the `action` object gets updated. Use this to update ETA, etc. 

E.g. `var onActionUpdate = function(action) { //do anything with updated action here}`

****4. Call `trackShortCode` function:****
Call `var track = ht.trackShortCode(shortCode: string, pk: string, trackingOptions: ITrackOption)`. `trackingOptions` is an object with `mapId` as a required field. There are other optional fields for customizing the tracking experience. `track` object is of type `TrackAction` (detail in reference section). This provides additional functionality like obtaining map object, reseting bounds function, etc.

E.g `var tracking  = ht.trackShortCode("xdBtyxs", "pk_xxxxxxxxxxxxxxxxx", {mapId: "map", onActionReady: onActionReady, onActionUpdate: onActionUpdate})`, where `"xdBtyxs"` is the shortCode, `"pk_xxxxxxxxxxxxxxxxx"` is HyperTrack public key and `onActionReady` and `onActionUpdate` are callbacks for `ready` and `update` events.

###References ###
#### Interfaces

1. `ITrackingOption`: Options that is passed to the sdk to customize the tracking.
2. `IAction`: HyperTrack Action object. This is passed as `onActionReady` callback passed in the options.
3. `TrackAction`: Class which exposes methods to tracking action. It also exposes map object and action object.

##### Tracking options

```
interface ITrackOption {
    originLatLng?: [number, number], //optional, to set default map center
    mapId: string, //id of DOM where map is to be rendered
    onError?: (any) => void,
    onActionReady?: (IAction) => void,
    onActionUpdate?: (IAction) => void,
    onReady?: (TrackAction) => void
}
//parameters with `?` are optional
```

##### Action

```
interface IAction {
    assigned_at: string | null,
    canceled_at: string | null,
    completed_at: string | null,
    completed_place: IPlace | null,
    created_at: string | null,
    display: {
        duration_remaining: number | null,
        show_summary: boolean,
        status_text: string,
        sub_status_text: string
    },
    distance: number,
    encoded_polyline: string,
    eta: string | null,
    expected_place: IPlace,
    id: string,
    initial_eta: string | null,
    lookup_id: string,
    short_code: string
    started_at: string | null,
    started_place: IPlace | null,
    status: string,
    suspended_at: string | null,
    time_aware_polyline: string,
    tracking_url: string,
    type: string,
    user: IUser,
    vehicle_type: string
}
```

##### TrackAction

```
interface TrackAction {
    action: IAction;
    map: google.maps.Map;
    resetBounds: () => void;
    setOptions: (options: ITrackOption) => void;
}
```

#### Example

```
var shortCode = "q0oxyWr";
var actionId = "1735bd06-db99-4acf-be3b-a9f17cc0a262";

var pk = pk_xxxxxxxxxxxxxxx;

var trackOptions = {
  mapId: 'map',
  onReady: function(trackAction){ 
     console.log(trackAction)
     trackAction.map // map object
     trackAction.action //action
     trackAction.resetBounds() //to reset bounds
     trackAction.setOptions(newTrackOptions) //override trackOptions params
  },
  onActionReady: function(action) {
    console.log(action)
  }
}

var track = ht.trackShortCode(shortCode, pk, trackOptions)
//or
var track = ht.trackActionId(actionId, pk, trackOptions)

var map = track.map //google map object
track.resetBounds() //to reset bounds to bring all map items in view
var action = track.action //get action object in sync. 

```

Note: Map object and action object is available in `track` object only after `onActionReady` callback is fired.

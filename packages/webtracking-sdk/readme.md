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

**`ht.trackShortCode(shortCode: string, pk: string, trackingOptions: ITrackingOptions)`:** 
To be used when short code of the action is known. The first argument is the `action.short_code`, this code is also part of `action.tracking_url` generated for each action, which is a default tracking link for the action.

**`ht.trackActionId(actionId: string, pk: string, trackingOptions: ITrackingOptions)`:**
To be used when `action.id`, i.e. ID of the action is known.

**`ht.trackLookupId(lookupId: string, pk: string, trackingOptions: ITrackingOptions)`:**
To be used when `action.lookup_id` i.e. lookup id of the action is known. Useful for tracking multiple actions.

#### Other Entities

1. pk: Publishable key
2. trackingOptions: Options that can be passed to customize tracking experience


***HINT:*** `function example(a: string, b: number, c: IAction) => void` means example function takes 3 arguments of type string, number and `action` object respectively and returns `void`. `IAction` is an interface for `action` object, which defines the key and value types of the object. Refer interfaces definitions in the end`.

### How to use

##### Tracking using shortCode 

****1. Create Map DOM container:****
In the html file create a DOM which would contain the map. Give it a unique id. 

E.g. `<div id="map" style="height: 300px; width: 500px"></div>`

****2. Create onReady callback:****
Create a `onReady` which will take `trackedActions` object, `action` array and `map` object as arguments. This is a callback which is fired when tracking is initialized.

E.g `var onReady =  function(trackedActions, actions, map) { //Setup with actions, trackedActions and map here}`

****3. Create onUpdate callback:****
Create a `onUpdate` which will take `trackedActions` object and `action` array  as arguments. This is a callback fired when the `action` object gets updated. Use this to update ETA, etc. 

E.g. `var onUpdate = function(trackedActions, actions) { //do anything with updated action here}`

****4. Call `trackShortCode` function:****
Call `var track = ht.trackShortCode(shortCode: string, pk: string, trackingOptions: ITrackingOptions)`. `trackingOptions` is an object with `mapId` as a required field. There are other optional fields for customizing the tracking experience. `track` object is of type `TrackedAction` (detail in reference section). This provides additional functionality like obtaining map object, reseting bounds function, etc.

E.g `var tracking  = ht.trackShortCode("xdBtyxs", "pk_xxxxxxxxxxxxxxxxx", {mapId: "map", onReady: handleOnReady, onUpdate: handleOnUpdate})`, where `"xdBtyxs"` is the shortCode, `"pk_xxxxxxxxxxxxxxxxx"` is HyperTrack public key and `handleOnReady` and `handleOnUpdate` are callbacks for `ready` and `update` events.

### References 
#### Interfaces

1. `ITrackingOption`: Options that is passed to the sdk to customize the tracking.
2. `IAction`: HyperTrack Action object. This is passed to `onReady` and `onUpdate` callbacks.
3. `TrackedAction`: Class which exposes methods to tracking action. It also exposes map object and action object.

##### Tracking options
```
interface ITrackingOptions {
    mapId: string, //id of DOM where map is to be rendered
    mapOptions?: IMapOptions,
    onError?: (error: any) => void,
    onReady?: (trackedActions: ITrackedActions, actions: IAction[], map: google.maps.Map) => void,
    onUpdate?: (trackedActions: ITrackedActions, actions: IAction[]) => void,
    onAccountReady?: (subAccount: ISubAccount, actions: IAction[]) => void
}
```
```
interface IMapOptions {
    gMapsStyle?: MapTypeStyle[],
    bottomPadding?: number,
    topPadding?: number,
    vehicleIcon?: CustomVehicleIcon,
    originLatLng?: [number, number], //optional, to set default map center
}
```
```
interface GMapsPolyLineOptions {
    strokeColor?: string,
    strokeOpacity?: number,
    strokeWeight?: number,
    visible?: boolean
}
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
        duration_elapsed: number | null,
        distance_remaining: number | null,
        show_summary: boolean,
        status_text: string,
        distance_unit: string,
        isLate: boolean,
        sub_status_text: string
    },
    distance: number | null,
    encoded_polyline: string,
    eta: string | null,
    expected_place: IPlace,
    id: string,
    initial_eta: string | null,
    lookup_id: string,
    short_code: string
    started_at: string | null,
    started_place: IPlace | null,
    ended_at: string | null,
    status: string,
    suspended_at: string | null,
    time_aware_polyline: string,
    tracking_url: string,
    type: string,
    user: IUser,
    vehicle_type: string,
    metadata?: any
}
```

##### TrackedAction

```
interface TrackedAction {
    startMarker: CustomRichMarker;
    endMarker: CustomRichMarker;
    destinationMarker: CustomRichMarker;
    mapPolyline: google.maps.Polyline;
    userMarker: CustomRichMarker;
    resetBounds: () => void;
}
```
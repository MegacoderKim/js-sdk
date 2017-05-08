# Webtracking SDK

Javascript library to power live tracking experience of HyperTrack actions.
 
### How to install

***npm***

`npm install ht-webtracking-sdk --save`

then `require('ht-webtracking-sdk')`
or

use `dist/track.js` in `node_module` folder

***Bower***

`bower install ht-webtracking-sdk --save`

### How to use
Add `dist/track.js` as a script tag in the html

`ht` is global object exposed by the library

### Usage

1. `ht.trackShortCode(shortCode, pk, trackingOptions)`

2. `ht.trackActionId(actionId, pk, trackingOptions)`

3. `ht.trackAction(action, pk, trackingOptions)`

#### Entities

1. shortCode: `action.short_code`
2. pk: Publishable key
3. trackingOptions: Options that can be passed to customize tracking experience

#### Interfaces

1. `ITrackingOption`: Options that is passed to the sdk to customize the tracking.
2. `IAction`: HyperTrack Action object. This is passed as `onActionReady` callback passed in the options.
3. `TrackAction`: Class which exposes methods to tracking action. It also exposes map object and action object.

##### Tracking options

```
interface ITrackOption {
    originLatLng?: [number, number], //optional, to set default map center
    mapId: string, //id of DOM where map is to be rendered
    bottomPadding?: number, //keep it 50 for current like web tracking interface
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

```

Note: `track` has ITrackAction interface, but before onReady event, map object and action object is not be available.

# Webtracking SDK

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

##### Tracking options interface

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

parameters with `?` are optional


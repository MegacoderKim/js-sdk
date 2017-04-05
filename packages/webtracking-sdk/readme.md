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

#### Tracking Options

```
interface ITrackOption {
    originLatLng?: [number, number], //optional, to set default map center
    mapId: string, //id of DOM where map is to be rendered
    bottomPadding?: number, //keep it 50 for current like web tracking interface
    onError?: (any) => void,
    onActionReady?: (action: IAction) => void,
    onActionUpdate?: (action: IAction) => void
}
```

parameters with `?` are optional


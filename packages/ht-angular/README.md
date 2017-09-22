# ht-angular

This is a client side Angular library to visualize and fetch HyperTrack entities. This library can be used to replicated any view available on HyperTrack dashboard, or create a new view. 

### Installation

We recommend using `@angular/cli`, official Angular CLI tool for scaffolding angular app. We are including this as a prerequisite. But this library can be used without Angluar cli too.

#### Prerequisites
```shell
npm i @angular/cli -g #install angular cli
ng new ht-app #create new app called ht-app
cd ht-app
npm install  #install dependencies
```

#### Map prerequisits

This library supports rendering both google maps and open-street maps using leaflet.js. Based on the map type of your choice appropriate libraries needs to be loaded

```
npm i @types/googlemaps # for google maps
npm i @types/leaflet leaflet #for leaflet
``` 

In `index.html` you also need to add the following scripts

```html
<!--google map scripts-->
<script src="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=<KEY>&libraries=geometry"></script>
<!--google maps script end-->
<!--leaflet stylesheet-->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css"
        integrity="sha512-M2wvCLH6DSRazYeZRIm1JnYyh22purTM+FDB5CsyxtQJYeKq83arPe5wgbNmcFXGqiSH2XR8dT/fJISVA1r/zQ=="
        crossorigin=""/>
<!--leaflet stylesheet end-->
```

In you `app.module.ts` add `require("leaflet)` to import leaflet.

#### Dependencies
Install ht-angular packages
```
npm i ht-angular
```
Import `HtMddule` in the `AppModule` and initiate with HyperTrack token and other options.
Also import `HttpClientModule` and `BrowserAnimationsModule`.

```typescript
import {HtModule} from "ht-angular-client";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HtModule.forRoot({token: 'sk_xxxxxxxxxxxxxxxx', mapType: 'google'}) //importing HtModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
````

#### Setting up map

`ht-angular` supports Leaflet.js and Google map js to render the map. One of these needs to be setup to use map feature. Argument of `HtModule.forRoot({})` takes `mapType` as a parameter. It's value can be `"google""` or `"leaflet"`.

### Usage
To use any of the provided module, it needs to be imported in the `@NgModule` class where the component will be used. Then add the html-tag of the component where it needs to be rendered.

#### Presentation Module
These modules contain dumb components which do not have any HyperTrack client login. The are presentation component helpful in rendering already available HyperTrack entities

|Module   |  html tag |  input  |
|---------|-----------|---------|
|PlaclineModule  | ht-placeline  | userData: IUserData  |
|UserCardModule | ht-user-card   | user   |
|UsersModule   | ht-users   | users   |
|MapModule   | ht-map   | NA   |

#### Container Module
These module contain components which fetches the data based on the input parameter, updates the them and render it on the presentational component. 

|Module   |  html tag |  input  |
|---------|-----------|---------|
|PlacelineContainerModule  | ht-placeline-container  | `userId: string`  |
|UsersContainerModule | ht-users-continer   | NA   |
|MapContainer   | ht-map-container   | userId: string   |
|PlacelineMapModule   | ht-placeline-map-container   | userId: string   |
|UsersMapModule   | ht-users-map-container   | query: object   |


#### Example
```html
<!--test.component.html-->
<ht-users [users]="users"></ht-users>
```
```typescript
//test.module.ts
import { TestComponent } from './test.component';
import {UsersContainerModule} from "ht-angular";

@NgModule({
  imports: [
    CommonModule,
    UsersContainerModule
  ],
  declarations: [TestComponent]
})
export class TestModule { }
```

```typescript
//test.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ht-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.less']
})
export class TestComponent implements OnInit {

  /**
  * this userId is passed as an input to users container
  */
  userId = "<USER_ID>";

  constructor() { }

  ngOnInit() {
  }
}
```

```html
<ht-users-container [userId]="userId"></ht-users-container>
```

### Service

The library provides injectable services which provides additional functionality.

#### 1. MapService
extends `map-class` from `ht-map` library

#### 2. HtUsersClientService
extend  `HtUsersClientService` from `ht-client` library

#### 3. HtActionsClientService
extends `HtActionsClientService` from `ht-client` library

### Helper Libraries

`ht-angular` library is a wrapper around bunch of other framework agnostic library. These libraries can be used to create similar library for any other framework. These are:
1. `ht-models`: Contains HyperTrack entity interfaces
2. `ht-utils`: Contains generic HyperTrack independent functions
3. `ht-data`: Contains HyperTrack specific functions to process entities. Has `ht-utils` as dependency.
4. `ht-map`: Contains helper functions to render HyperTrack specific or other map entities. Supports both google map and leaflet. Has `ht-utils` as dependency.
5. `ht-client`: Contains api information of HyperTrack entities and provides function to fetch and update data. Has `ht-utils`, `ht-data` as dependencies.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.


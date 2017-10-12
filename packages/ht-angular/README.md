# ht-angular

This is a client side Angular library to visualize and fetch HyperTrack entities. This library can be used to replicated any view available on HyperTrack dashboard, or create a new view. Example implimentation using this library is [here](https://github.com/hypertrack/angular-dashboard-demo)

## Steps to build your dashboard

### 1. Create angular app using angular cli
##### - Prerequisite
Install `@angular/cli` globally 
````bash
npm install @angular/cli -g
````
##### - Scaffolding the app
````bash
ng new angular-dashboard --routing --style=less
````
change `angular-dashboard` to the app name you want to create. We currently ship with less global styling. So we recommend scaffolding the all using less for styling.

### 2. Install dependencies
Install HyperTrack helper libraries
````bash
cd angular-dashboard #go to the app folder
npm i ht-angular ht-angular-client ht-js-data ht-js-client ht-js-map ht-js-utils
````
install extra dependencies which are used to the helper libraries
```bash
npm i underscore moment-mini font-awesome leaflet
```

install typings as dev-dependencies required for the app
```bash
npm i @types/googlemaps @types/leaflet ht-models -D
```

helper libraries leverage the latest features of typescript. Install typescript >= 2.5.x 
```bash
npm i typescript@2.5.x -D
```
### 3. Setting up the app
##### - Import modules and setup `HtMddule`
navigate to `src/app/app.module.ts` and make the following edits
````typescript
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HtModule} from "ht-angular-client";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HtModule.forRoot({token: 'sk_xxxxxxxxxxxxx', mapType: 'google'}) // demo
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

````
Add HyperTrack key in place of `'sk_xxxxxxxxxxxxx'`

##### - Import google map and other dependencies

In `src/index.html` you also need to add the following scripts

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
Add your google map key in place of `<KEY>` in the script tag.
No need to import leaflet stylesheet if leaflet is not used in the map.

##### - Import global styles
in `src/styles.less` add the global stylesheet
```less
@import "../node_modules/ht-angular/src/styles/global";
```
### 4. Add view
##### - Clean placeholder html
go to `src/app/app.component.html` and clear placeholder html. Finally it should look like the following
````html
<router-outlet></router-outlet>
````
##### - Add home route and page
Use cli to generate a module and component
````bash
ng g module home --routing
ng g component home
````
Add a route to home module. go to `src/app/home/home-routing.module.ts` and a path like the following
```typescript
import {HomeComponent} from "./home.component";

const routes: Routes = [
  { path: "", component: HomeComponent}
];
````

Add the following route in app route. go to `src/app/app-routing.module.ts` and `home-module` as a lazy loaded route.
````typescript
const routes: Routes = [
  { path: '', loadChildren: "./home/home.module#HomeModule"},
];
````
Serve the app locally to check if home component is correctly being displayed.
```bash
npm start #go to localhost:4200 after compilation
```
##### - Add view to a page
Go to `src/home/home.module.ts` and add `UsersMapContainerModule` in import array of the module
````typescript
...
import {UsersMapContainerModule} from "ht-angular";

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    UsersMapContainerModule //imports UsersMapContainerComponent
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
````
go to `src/home/home.component.html`, and add the html corresponding to `UsersMapContainerComponent`

````html
<ht-users-map-container></ht-users-map-container>
````
close the local serve and restart using `npm start`. The home page now should show `UsersMapContainerComponent`

### 5. Create prod build
```bash
ng build -prod
```
This is create a dist folder with `html`, `css` and `js` file which is ready to be served.

**Note:** If you are serving the app with different base url, e.g. `www.abc.com/mydashboard`, edit the `<base href="/">` to `<base href="/mydashboard">` in `src/index.html`.
## Detailed Usage
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


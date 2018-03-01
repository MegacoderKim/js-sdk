import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {HtModule, TrackingModule} from "../ht-angular";
import {TrackActionComponent} from "./track-action/track-action.component";

export const customElements = [
  TrackActionComponent,
];

@NgModule({
  imports: [
    BrowserModule,
    HtModule.forRoot({config: "", mapType: 'leaflet'}),
    TrackingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    ...customElements,
  ],
  entryComponents: [
    ...customElements
  ]
})
export class AppModule {
  ngDoBootstrap() { }
}

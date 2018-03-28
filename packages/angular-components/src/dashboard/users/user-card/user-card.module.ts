import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserCardComponent} from "./user-card.component";
import {InnerSharedModule} from "../../shared/shared.module";
import {SharedModule} from "ht-angular";

@NgModule({
  imports: [
    CommonModule,
      InnerSharedModule,
    SharedModule
  ],
  declarations: [
      UserCardComponent
  ],
  exports: [
      UserCardComponent
  ]
})
export class UserCardModule { }

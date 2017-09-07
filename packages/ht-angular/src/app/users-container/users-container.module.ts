import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersContainerComponent } from './users-container.component';
import {UsersModule} from "../users/users.module";
import {PlacelineModule} from "../placeline/placeline.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    UsersModule,
    PlacelineModule,
    SharedModule
  ],
  declarations: [UsersContainerComponent],
  exports: [UsersContainerComponent]
})
export class UsersContainerModule { }

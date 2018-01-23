import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListContainerComponent } from './users-list-container.component';
import {DateRangePickerModule} from "../date-range-picker/date-range-picker.module";

@NgModule({
  imports: [
    CommonModule,
    DateRangePickerModule
  ],
  declarations: [UsersListContainerComponent],
  exports: [UsersListContainerComponent]
})
export class UsersListContainerModule { }

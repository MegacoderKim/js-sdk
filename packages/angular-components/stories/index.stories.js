import { storiesOf } from '@storybook/angular';
import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';

import { DateRangePickerModule} from "../src/ht-angular/date-range-picker/date-range-picker.module"
import { DateRangePickerComponent} from "../src/ht-angular/date-range-picker/date-range-picker.component"
import {PaginationModule} from "../src/ht-angular/pagination/pagination.module"
import {SharedModule} from "../src/ht-angular/shared/shared.module"
import {DateRangeMap} from "ht-data";
import {object, date, boolean, number} from '@storybook/addon-knobs/angular';

storiesOf('Date range picker', module).add('Basic', () => ({
  template: `
    <ht-date-range-picker (onRangeChange)="rangeChange($event)" [options]="options" [dateRange]="dateRange"></ht-date-range-picker>
  `,
  // component: DateRangePickerComponent,
  props: {
    dateRange: DateRangeMap.today,
    options: object('options', {
      isRight: true,
      hideCalender: false,
      datePicker: false,
    }),
    rangeChange (e, a) {
      this.dateRange = e;
      action('range change')(e)
    }
  },
  moduleMetadata: {
    imports: [DateRangePickerModule, SharedModule],
  }
}));
storiesOf('Pagination', module).add('Basic', () => ({
  template: `
    <ht-pagination [pageDate]="data" [pageSize]="pageSize" (fetchPage)="pageChange($event)"></ht-pagination>
  `,
  props: {
    data: object('data', {
      count: 14,
    }),
    pageSize: number('size', 10),
    pageChange(page) {
      console.log(page);
      action('page change')(page);
      this.data = {
        ...this.data,
        previous: page ? `?page=${page - 1}` : null
      }
    }
  },
  moduleMetadata: {
    imports: [PaginationModule]
  }
}))

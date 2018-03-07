import { storiesOf } from '@storybook/angular';
import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';

import { DateRangePickerModule} from "../libs/ht-angular/date-range-picker/date-range-picker.module"
import {PaginationModule} from "../libs/ht-angular/pagination/pagination.module"
import {ActionSummaryModule} from "../libs/ht-angular/action-summary/action-summary.module"
import {ActionStatusModule} from "../libs/ht-angular/action-status/action-status.module"
import {DestinationPopupModule} from "../libs/ht-angular/destination-popup/destination-popup.module"
import {StartPopupModule} from "../libs/ht-angular/start-popup/start-popup.module"
import {SharedModule} from "../libs/ht-angular/shared/shared.module"
import {DateRangeMap} from "ht-data";
import {object, date, boolean, number} from '@storybook/addon-knobs/angular';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import "../src/assets/css/ionicons/ionicons.css"
import "../libs/styles/placeholder-tracking.scss"

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
}));

storiesOf('Action summary', module).add('Basic', () => ({
  template: `
    <app-action-summary [action]="action"></app-action-summary>
  `,
  props: {
    action: {
      type: 'task',
      distance: 3000,
      duration: 3000,
      user: {
        name: "Sunil"
      }
    },
  },
  moduleMetadata: {
    imports: [ActionSummaryModule, BrowserAnimationsModule, SharedModule]
  }
}))

storiesOf('Action status', module).add('Basic', () => ({
  template: `
    <app-action-status [action]="action"></app-action-status>
  `,
  props: {
    action: {
      type: 'task',
      distance: 3000,
      duration: 3000,
      user: {
        name: "Sunil asdasdasdasdasdsdasdasd asdas dasda asd",
        photo: "https://hypertrack-api-v2-prod.s3.amazonaws.com/default_drivers/v2/b11.png"
      }
    },
  },
  moduleMetadata: {
    imports: [ActionStatusModule, SharedModule]
  }
}));

storiesOf('Infobox', module).add('Destination ongoing', () => ({
  template: `
    <app-destination-popup [action]="action"></app-destination-popup>
  `,
  props: {
    action: {
      type: 'task',
      distance: 3000,
      duration: 3000,
      eta: new Date(new Date().getTime() + 30000).toISOString(),
      user: {
        name: "Sunil"
      },
      expected_place: {
        name: "Kormangala"
      }
    },
  },
  moduleMetadata: {
    imports: [DestinationPopupModule, SharedModule]
  }
})).add('Destination completed', () => ({
  template: `
    <app-destination-popup [action]="action"></app-destination-popup>
  `,
  props: {
    action: {
      type: 'task',
      distance: 3000,
      duration: 3000,
      completed_at: new Date(new Date().getTime() - 30000).toISOString(),
      user: {
        name: "Sunil"
      },
      completed_place: {
        name: "Kormangala"
      }
    },
  },
  moduleMetadata: {
    imports: [DestinationPopupModule, SharedModule]
  }
})).add('Start', () => ({
  template: `
    <app-start-popup [action]="action"></app-start-popup>
  `,
  props: {
    action: {
      type: 'task',
      distance: 3000,
      duration: 3000,
      started_at: new Date(new Date().getTime() - 30000).toISOString(),
      completed_at: new Date(new Date().getTime() - 30000).toISOString(),
      user: {
        name: "Sunil"
      },
      started_place: {
        name: "Kormangala"
      }
    },
  },
  moduleMetadata: {
    imports: [StartPopupModule, SharedModule]
  }
}))


import { storiesOf, moduleMetadata } from '@storybook/angular';
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
import { UserPopupModule } from "../libs/ht-angular/user-popup/user-popup.module"
/*
* Custom webpack config breaks less
*/
import "!style-loader!css-loader!sass-loader!../src/assets/css/ionicons/ionicons.css"
import "!style-loader!css-loader!sass-loader!../libs/styles/placeholder.scss"
import "!style-loader!css-loader!sass-loader!../libs/styles/hypertrack-theme.scss"
import "!style-loader!css-loader!sass-loader!../libs/styles/placeholder-tracking.scss"

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
    <ht-action-status [action]="action"></ht-action-status>
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
    <ht-destination-popup [action]="action"></ht-destination-popup>
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
    <ht-destination-popup [action]="action"></ht-destination-popup>
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
    <ht-start-popup [action]="action"></ht-start-popup>
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

const trackAction = {
  type: 'task',
  distance: 3000,
  duration: 3000,
  started_at: new Date(new Date().getTime() - 30000).toISOString(),
  completed_at: new Date(new Date().getTime() - 30000).toISOString(),
  place: {
    display_text: "Kormangala"
  },
  health: {
    battery_percentage: 45
  },
  activity: {
    duration: 1000,
    steps: 30,
    type: "stop"
  },
  user: {
    name: "Sunil",
    display: {
      status_text: "Walking"
    }
  },
  started_place: {
    name: "Kormangala"
  }
};

storiesOf("User popup", module)
.addDecorator(
  moduleMetadata({
    imports: [UserPopupModule, SharedModule]
  })
)
.add('Live', () => {

  return {
    template: `
    <div class="flex-row">
      <ht-user-popup [action]="action"></ht-user-popup>
    </div>`,
    props: {
      action: {
        ...trackAction
      },
    }
  }
})
.add("Without address", () => {
  return {
    template: `
    <div class="flex-row">
      <ht-user-popup [action]="action"></ht-user-popup>
    </div>`,
    props: {
      action: {
        ...trackAction,
        place: {
          display_text: null
        }
      },
    }
  }
})
.add("Error", () => {
  return {
    template: `
    <div class="flex-row">
      <ht-user-popup [action]="action"></ht-user-popup>
    </div>`,
    props: {
      action: {
        ...trackAction
      },
    }
  }
})


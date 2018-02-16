import { storiesOf } from '@storybook/angular';
import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import {ActionSummaryModule} from "../src/app/action-summary/action-summary.module"
import {ActionStatusModule} from "../src/app/action-status/action-status.module"
import {SharedModule} from "ht-angular"
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import '../src/styles.scss';
import {CommonModule} from "@angular/common";

storiesOf('Actions Summary', module).add('Basic', () => ({
  template: `
        <app-action-summary [action]="action"></app-action-summary>
  `,
  props: {
    action: {
      type: 'visit',
      distance: 3000,
      id: 1231241,
      duration: 400,
      user: {
        name: "Gaurav"
      }
    }
  },
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      ActionSummaryModule,
      SharedModule
    ]
  }
}));

storiesOf('Action status', module).add('Basic', () => {
  return {
    template: `
        <app-action-status [action]="action"></app-action-status>
  `,
    props: {
      action: {
        type: 'visit',
        distance: 3000,
        id: 1231241,
        duration: 400,
        user: {
          name: "Gaurav",
          photo: "asd"
        }
      }
    },
    moduleMetadata: {
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        ActionStatusModule,
      ]
    }
  }
});

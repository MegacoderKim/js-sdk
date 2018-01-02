import { Injectable } from '@angular/core';
import {IAnalyticsItem} from "../interfaces/analytics-item";
import { UsersAnalyticsListService} from "../users-analytics-list/users-analytics-list.service";
import {ActionsStatusGraphService} from "../actions-status-graph/actions-status-graph.service";
import {usersAnalyticsListPresets} from "./analytics-presets/users-list-preset";
import {actionsConfigPreset} from "./analytics-presets/actions-status-graph-preset";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {map, take} from "rxjs/operators";
import {combineLatest} from "rxjs/observable/combineLatest";
import {Observable} from "rxjs/Observable";
import {usersClientFactory, dateRangeFactory} from "ht-client";
import {DateRangeMap} from "ht-data";
import {HtUsersService} from "../ht/ht-users.service";
import {actionsClientFactory} from "ht-client";

@Injectable()
export class AnalyticsItemsService {

  presets;
  chosenItemCreater = [];
  items$: BehaviorSubject<IAnalyticsItem[]>;
  // items$: BehaviorSubject<IAnalyticsItem[]> = new BehaviorSubject([]);
  filteredItems$: Observable<IAnalyticsItem[]>;
  allTags$: Observable<string[]>;
  tags$: Observable<ISelectedTag[]>;
  selectedTags$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  totalTags: number;
  // selectedTags$: BehaviorSubject<string[]>;
  constructor(usersService: HtUsersService) {
    const usersClient = usersClientFactory({dateRange$: dateRangeFactory(DateRangeMap.today).data$});
    const activityQueryLabel = usersClient.filterClass.activityQueryArray;
    const actionDateRangeService = dateRangeFactory(DateRangeMap.today);
    const actionsClient = actionsClientFactory({dateRange$: actionDateRangeService.data$});
    const actionsStatusQueryLabel = [];
    this.presets = [
      // actionsConfigPreset.max_distance(),
      // actionsConfigPreset.max_duration(),
      actionsConfigPreset.summary(actionsClient, actionDateRangeService),
      // usersAnalyticsListPresets.users_summary(usersClient),
      usersAnalyticsListPresets.users_summary(usersClient, 'Users activity summary', activityQueryLabel),
      actionsConfigPreset.status(),
      actionsConfigPreset.recently_assigned(),
      actionsConfigPreset.recently_completed(),
      actionsConfigPreset.users_on_action(),
      usersAnalyticsListPresets.last_recorded(),
      usersAnalyticsListPresets.users_actions(),
      usersAnalyticsListPresets.max_location_disabled_duration(),
      usersAnalyticsListPresets.max_stop_duration(),
      usersAnalyticsListPresets.max_network_offline(),
      usersAnalyticsListPresets.max_distance(),
    ];
    this.chosenItemCreater = this.presets;
    this.items$ = new BehaviorSubject(this.getItems(this.presets));
    this.allTags$ = this.items$.pipe(
      map(items => {
        this.totalTags = items.length;
        return items.reduce((tags, item) => {
          const itemTags = item.tags;
          return itemTags.reduce((currentTags: string[], tag) => {
            return currentTags.includes(tag) ? currentTags : [...currentTags, tag]
          }, tags)
          // return tags.includes()
        }, ['users', 'actions'])
      })
    );

    this.tags$ = combineLatest(
      this.allTags$,
      this.selectedTags$,
      (allTags, selectedTags) => {
        // console.log("eit tags", allTags, selectedTags);
        // if (selectedTags.length === 0) {
        //   return allTags.map(tag => {
        //     return {key: tag, isActive: true}
        //   })
        // } else {
        //   return allTags.map(tag => {
        //     const isActive = selectedTags.includes(tag);
        //     return {key: tag, isActive}
        //   })
        // }
        return allTags.map(tag => {
          const isActive = selectedTags.includes(tag);
          return {key: tag, isActive}
        })
      }
    );

    this.filteredItems$ = combineLatest(
      this.items$,
      this.selectedTags$,
      (items, tags) => {
        return tags.length ? items.filter((item) => {
          return tags.reduce((pass, selectedTag) => {
            return pass && item.tags.includes(selectedTag)
          }, true);
          // return tags.reduce((pass, existingTag) => {
          //   return pass || item.tags.includes(existingTag)
          // }, false)
        }) : items;
      }
    )
  };

  // toggleItemCreator(preset) {
  //   if (this.isItemCreatorActive(preset)) {
  //     const index = this.choosenPreset.indexOf(preset);
  //     this.choosenPreset.splice(index, 1)
  //   } else {
  //     this.choosenPreset.push(preset)
  //   }
  // };

  private isItemCreatorActive(itemCreator) {
    return this.chosenItemCreater.includes(itemCreator)
  }

  toggleTag(tag: string) {
    this.selectedTags$.pipe(
      take(1)
    )
      .subscribe((tags) => {

        if (tags.includes(tag)) {
          tags.splice(tags.indexOf(tag), 1)
        } else {
          tags.push(tag)
        }
        // if (tags.includes(tag)) {
        //   tags = []
        // } else {
        //   tags = [tag]
        // }
        // if (tags.length === this.totalTags) {
        //   tags = [];
        // }
      this.selectedTags$.next([...tags])
    })
  };

  selectTag(tag: string) {
    this.selectedTags$.pipe(
      take(1)
    )
      .subscribe((tags) => {

        if (tags.includes(tag)) {
          tags.splice(tags.indexOf(tag), 1)
        } else {
          tags = [tag]
        }
        // if (tags.length === this.totalTags) {
        //   tags = [];
        // }
        this.selectedTags$.next([...tags])
      })
  }

  setPreset(choosenPreset) {
    this.items$.next(this.getItems(choosenPreset));
  }

  getItems(itemsConfigs) {
    return itemsConfigs.map(preset => {
      return new preset.service(preset.initialConfig)
    })
  }

}

export interface ISelectedTag {
  key: string,
  isActive: boolean,
}

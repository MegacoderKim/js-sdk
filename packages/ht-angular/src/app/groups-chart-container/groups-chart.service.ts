import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {filter, map, switchMap, take, withLatestFrom} from "rxjs/operators";
import {HtGroupsService} from "../ht/ht-groups.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {IGroup} from "ht-models";
import {Subscription} from "rxjs/Subscription";
import {Page} from "ht-models";
import {combineLatest} from "rxjs/observable/combineLatest";
import {of} from "rxjs/observable/of";

@Injectable()
export class GroupsChartService {
  // groupsLevels = [];
  // selectedGroups = [];
  // selectedGroup$: Observable<any>;
  error;
  selectedGroups$: BehaviorSubject<Array<IGroup | null>> = new BehaviorSubject([]);
  groupsLevelsEntity$: BehaviorSubject<IGroupsLevelEntity> = new BehaviorSubject({});
  groupsLevels$: Observable<any[]>;
  groupsSub: Subscription;
  constructor(
    private groupsService: HtGroupsService
  ) {
    this.setGroupsLevels();
    this.groupsLevels$ = combineLatest(
      this.selectedGroups$,
      this.groupsLevelsEntity$,
      (selectedGroups, groupslevelsEntity) => {
        return selectedGroups.map((group) => {
          const id = group ? group.id : null;
          return groupslevelsEntity[id] ? groupslevelsEntity[id] : null
        })
      }
    )

  }

  setRootGroupId(groupId: string | null) {
    this.selectedGroups$.pipe(
      take(1),
      filter(groups => {
        const id = groups[0] ? groups[0].id : null;
        return id !== groupId || (groupId == null && !groups.length);
      }),
      switchMap(() => {
        return groupId ? this.groupsService.item.api$(groupId) : of(null)
      })
    ).subscribe((group: IGroup | null) => {
      this.setSelectedGroup(group, 0)
    })
  };

  setSelectedGroup(group: IGroup | null, level: number) {
    this.selectedGroups$.asObservable().pipe(
      take(1),
      map((selectedGroups: Array<IGroup | null>) => {
        selectedGroups.splice(level);
        selectedGroups.push(group);
        return selectedGroups
      })
    ).subscribe((selectedGroups) => {
      this.selectedGroups$.next(selectedGroups)
    })
  };


  setGroupsLevels() {
    if (this.groupsSub) return false;

    this.groupsSub = this.selectedGroups$.pipe(
      withLatestFrom(this.groupsLevelsEntity$),
      switchMap(([selectedGroups, groupsLevels]) => {
        const level = selectedGroups.length;
        const lastId = selectedGroups[level - 1] ? selectedGroups[level - 1].id : null;
        // groupsLevels.splice(length);
        groupsLevels = selectedGroups.reduce((acc, group) => {
          const groupId = group ? group.id : null;
          return groupsLevels[groupId] ? {...acc, [groupId]: groupsLevels[groupId]} : acc
        }, {});

        if (groupsLevels[lastId]) {
          return of(groupsLevels)
        } else {
          return this.getGroups(lastId).pipe(
            map((groupsPage: Page<IGroup>) => {
              return {...groupsLevels, [lastId]: groupsPage.results}
            })
          )
        }

        // return of(groupsLevels)
      })
    ).subscribe((data: IGroupsLevelEntity) => {
      this.groupsLevelsEntity$.next(data)
    })
  };

  getGroups(parentId: string | null) {
    return parentId ? this.groupsService.getChildren(parentId) : this.groupsService.getRoot();
  }

  setLevel(level: number) {
    this.selectedGroups$.asObservable().pipe(
      take(1),
      map((selectedGroups: Array<IGroup | null>) => {
        selectedGroups.splice(level + 1);
        return selectedGroups
      })
    ).subscribe((selectedGroups) => {
      this.selectedGroups$.next(selectedGroups)
    });
    // this.setSelectedGroup(group, level + 1)
  }

};

export interface IGroupsLevelEntity {
  [groupId: string]: IGroup[]
}

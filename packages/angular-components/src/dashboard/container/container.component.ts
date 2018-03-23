import { Component, OnInit } from '@angular/core';
import * as fromRoot from "../reducers";
import {Store} from "@ngrx/store";
import {FilterCommonComponent} from "./filter-common/filter-common.component";
import {ActivatedRoute} from "@angular/router";
import {config} from "../config";
import {Subscription} from "rxjs/Subscription";
import * as _ from "underscore";
import {InnerMapService} from "../map-container/map.service";
import {SnackbarService} from "../shared/snackbar/snackbar.service";
import {animate, query, style, trigger, group, transition, state} from "@angular/animations";

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.less'],
  animations: [
    // trigger('routerTransition', [
    //   transition('AnalyticsUsersComponent <=> LiveComponent', [
    //     query(':enter', [
    //       style({ position: 'absolute', width: '100vw', top: 0, left: 0, height: '100%' }),
    //       animate('0.5s ease-in-out', style({ position: '*' }))
    //     ], { optional: true }),
    //     query(':leave', [
    //       style({ opacity: '1', width: '100vw', top: 0, left: 0, height: '100%' }),
    //       animate('0.5s ease-in-out', style({ opacity: '0', width: '100vw', top: 0, left: 0, height: '100%' }))
    //     ], { optional: true }),
    //   ]),
    //     transition('LiveComponent <=> AnalyticsUsersComponent', [
    //       query('app-users-analytics', [
    //         style({ position: 'absolute', width: '100vw', top: 0, left: 0, height: '100%' }),
    //         animate('0.5s ease-in-out', style({ position: '*' }))
    //       ], { optional: true }),
    //       query('app-map-container', [
    //         style({ opacity: '1', width: '100vw', top: 0, left: 0, height: '100%' }),
    //         animate('0.5s ease-in-out', style({ opacity: '0', width: '100vw', top: 0, left: 0, height: '100%' }))
    //       ], { optional: true }),
    //     ])
    // ]),
    // trigger('routerTransition', [
    //   transition('* <=> *', [
    //     query(':enter', [
    //       style({ opacity: 0, transform: 'scaleX(0)' }),
    //       animate('0.5s ease-in-out', style({ opacity: 1, transform: 'scaleX(1)' }))
    //     ], { optional: true }),
    //     query(':leave', [
    //       style({ opacity: '1', transform: 'scaleX(1)' }),
    //       animate('0.5s ease-in-out', style({ opacity: '0', transform: 'scaleX(0)' }))
    //     ], { optional: true }),
    //   ])
    // ]),
    trigger('routerTransition', [
      transition('* <=> *', [
        // query(':enter', [
        //   style({ transform: 'translateY(100%)' }),
        //   animate('0.5s ease-out', style({ transform: 'translateY(0%)' }))
        // ], { optional: true, limit: 1 }),
        query(':enter', [
          style({ opacity: '0' }),
          animate('0.3s ease-out', style({ opacity: 1 }))
        ], { optional: true }),
        query(':leave', [
          style({ opacity: 1}),
          animate('0.3s ease-in', style({ opacity: 0}))
        ], { optional: true}),
        // query(':leave', [
        //   style({ opacity: 1, transform: 'translateY(0%)' }),
        //   animate('0.5s ease-in-out', style({ opacity: 0, transform: 'translateY(100%)' }))
        // ], { optional: true, limit: 0 }),

      ])
    ]),

    // trigger('routerTransition', [
    //   transition('* <=> *', [
    //     query(':enter', [
    //       style({ opacity: 0 }),
    //       animate('0.5s ease-out', style({ opacity: 1}))
    //     ], { optional: true, limit: 0 }),
    //     query(':leave', [
    //       style({ opacity: 1 }),
    //       animate('0.5s ease-in-out', style({ opacity: 0 }))
    //     ], { optional: true, limit: 0 }),
    //   ])
    // ]),

  ],
})
export class ContainerComponent implements OnInit{
  showFilter = true;
  view;
  isWidget;
  subs: Subscription[] = [];
  isMobile = config.isMobile;

  constructor(
      public store: Store<fromRoot.State>,
      private mapService: InnerMapService,
      public snackbarService: SnackbarService

  ) {

  }

  getState(outlet) {
    // console.log(outlet.activated.componentType.name);
    return outlet.activated.componentType.name;
  }

  ngOnInit() {
    this.isWidget = config.isWidget;
    let sub = this.store.select(fromRoot.getUiShowFilter).subscribe((showFilter) => {
      setTimeout(() => {
        this.showFilter = showFilter;
        this.mapService.invalidate()
      })
    });
    let sub2 = this.store.select(fromRoot.getQueryEntity).subscribe((view: string) => {
      setTimeout(() => {
        this.view = view
      })

    });
    let loading$ = this.store.select(fromRoot.getQueryLoading);

    // let sub3 = loading$.subscribe((loading) => {
    //   if(loading) {
    //     console.log("loading");
    //     this.snackbarService.displayLoadingToast()
    //   } else {
    //     this.snackbarService.hideLoadingToastList();
    //     if(!config.isMobile) this.snackbarService.hideLoadingToast()
    //   }
    // });

    this.subs.push(sub, sub2)
  }

  ngOnDestroy() {
    this.snackbarService.hideLoadingToast();
    _.each(this.subs, sub => sub.unsubscribe())
  }

}

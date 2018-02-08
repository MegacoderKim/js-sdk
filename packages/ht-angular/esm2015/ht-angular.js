import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output, Pipe, Directive, HostBinding, NgModule, InjectionToken, ChangeDetectorRef, Injectable, ElementRef, ViewChild, Optional, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { last, reduce, reject, sortBy, map } from 'underscore';
import { TimeString, DateString, NameCase, DotString, DateHumanize, DistanceLocale, HMString, Color, GetUrlParam, dateRangeDisplay } from 'ht-utility';
import { htAction, listwithSelectedId$, listWithItem$, HtPlaceline, isSameDateRange, DateRangeLabelMap, tableFormat, userTableFormat, DateRangeMap, actionTableFormat } from 'ht-data';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { animate, keyframes, query, style, transition, trigger, state } from '@angular/animations';
import { HtMapClass, MapInstance, StopsHeatmapTrace, mapTypeService, ActionsHeatmapTrace } from 'ht-maps';
import { HtUsersClient, ApiType, HtGroupsClient, htClientService, dateRangeService, HtClient, dateRangeFactory, usersClientFactory, actionsClientFactory, HtRequest, AccountsClient, HtActionsClient, groupsClientFactory, htRequestService } from 'ht-client';
import { distinctUntilChanged, map as map$1, filter, switchMap, take, withLatestFrom, skip, takeUntil, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { of } from 'rxjs/observable/of';
import { merge } from 'rxjs/observable/merge';
import { Subject } from 'rxjs/Subject';
import { addDays, addMonths, addWeeks, endOfDay, format, isBefore, isFuture, isSameDay, isSameMonth, isToday, isWithinRange, startOfMonth, startOfWeek } from 'date-fns';
import { Observable } from 'rxjs/Observable';
import Chart from 'frappe-charts/dist/frappe-charts.min.esm';
import { HttpClient, HttpClientModule } from '@angular/common/http';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UserCardComponent {
    constructor() {
        this.selectedUserId = null;
        this.action = 'default';
        this.onAction = new EventEmitter();
        this.showStatus = true;
        this.hovered = false;
    }
    /**
     * @return {?}
     */
    hoverIn() {
        this.hovered = true;
    }
    /**
     * @return {?}
     */
    hoverOut() {
        this.hovered = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} user
     * @return {?}
     */
    getShowStatus(user) {
        if (user.segments) {
            return !!user.segments.length && !last(user.segments)['ended_at'];
        }
        return !!user;
    }
    /**
     * @return {?}
     */
    fireAction() {
        this.onAction.next({ user: this.user, action: this.action });
        event.stopPropagation();
    }
    /**
     * @param {?} a
     * @return {?}
     */
    ngOnChanges(a) {
        // console.log(a, "change");
        this.showStatus = a.user ? this.getShowStatus(a.user.currentValue) : this.showStatus;
    }
    /**
     * @return {?}
     */
    getActionText() {
        switch (this.action) {
            case "close":
                return "Close";
            case "detail":
                return "";
            case "loading":
                return "loading";
            default:
                return "View on Map";
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    debug(e) {
        console.log(e);
    }
}
UserCardComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-user-card',
                template: `<div class="ht-card-content flex-row flex">
  <div class="text-left flex-row row-gap-10 flex">
    <ht-profile [height]="35" [url]="user.photo"></ht-profile>
    <div class="">
      <div class="flex-row">
        {{user.name | nameCase | dot: 'Unknown users'}}
      </div>
      <ng-template [ngIf]="showStatus">
        <div class="user-status-display" [ngClass]="user.status + '-color'">
          <div [class.text-warning]="user.display.is_warning">{{user.display.status_text}}</div>
        </div>
        <div class="flex-row user-status">
          <div>{{user.display.sub_status_text}}<span *ngIf="user.display.battery">&nbsp; &bull; &nbsp;</span></div>
          <ht-battery-icon *ngIf="user.display.battery" [battery]="user.display.battery"></ht-battery-icon>
        </div>
      </ng-template>
      <div class="flex-row" *ngIf="!user['segments'] && user['total_distance']">
        <div>{{user['total_distance'] | distanceLocale}}</div>
        <div>&nbsp; &bull; &nbsp;</div>
        <div>{{user['total_duration'] | hmString:60}}</div>
      </div>
      <div class="">
        {{user['phone']}}
      </div>
    </div>
  </div>
  <!--<div *ngIf="action !== 'loading'; else loading" [@cardAction]="action == 'close' ? 'active' : 'inactive'" class="flex-row">-->
    <!--<button class="auto ht-btn ht-btn-card text-uppercase" (click)="fireAction()" *ngIf="getActionText()">-->
      <!--{{getActionText()}}-->
    <!--</button>-->
  <!--</div>-->
  <ng-template #loading>
    <div class="text-1 flex-row">
      <ht-loading-dots class="auto"></ht-loading-dots>
    </div>
  </ng-template>
</div>
<ng-content></ng-content>
<!--<div class="card-quick-action" *ngIf="action == 'default'">-->
  <!--<div class="flex-row align-center">-->
    <!--<span class="element">View on map &nbsp;</span>-->
    <!--<i class="fa fa-map-o"></i>-->
  <!--</div>-->
<!--</div>-->
`,
                styles: [`.ht-card-content{
  padding:5px 10px;
}
`],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
UserCardComponent.ctorParameters = () => [];
UserCardComponent.propDecorators = {
    "user": [{ type: Input },],
    "selectedUserId": [{ type: Input },],
    "action": [{ type: Input },],
    "onAction": [{ type: Output },],
    "hoverIn": [{ type: HostListener, args: ['mouseenter',] },],
    "hoverOut": [{ type: HostListener, args: ['mouseleave',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ProfileComponent {
    constructor() {
        this.height = 30;
        this.defaultUrl = "";
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // this.url = this.url || "images/missing.png"
    }
}
ProfileComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-profile',
                template: `<div [style.height.px]="height" [style.width.px]="height" class="profile-img" [ngStyle]="{ 'background-image': 'url(' + (url || defaultUrl) + ')'}">
</div>
`,
                styles: [`:host .profile-img{
  background-repeat:no-repeat;
  background-size:cover;
  background-position:center;
  border-radius:50%;
}
`],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
ProfileComponent.ctorParameters = () => [];
ProfileComponent.propDecorators = {
    "url": [{ type: Input },],
    "height": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class BatteryIconComponent {
    constructor() {
        this.battery = 0;
        this.layout = 'row';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} level
     * @return {?}
     */
    batteryClass(level) {
        let /** @type {?} */ className = '';
        if (level > 90) {
            className = 'fa-battery-4';
        }
        else if (level > 70) {
            className = 'fa-battery-3';
        }
        else if (level > 25) {
            className = 'fa-battery-2';
        }
        else if (level > 5) {
            className = 'fa-battery-1 text-red';
        }
        else {
            className = 'fa-battery-0 text-red';
        }
        
        return className;
    }
}
BatteryIconComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-battery-icon',
                template: `<div *ngIf="battery" [ngClass]="layout == 'column' ? 'flex-column column-gap-4 justify-center' : 'flex-row row-gap-4 align-center'" class="">
  <div>
    {{battery}}%
  </div>
  <i class="fa" [ngClass]="batteryClass(battery)"></i>
</div>
`,
                styles: [`.text-center{
  text-align:center;
}
.text-muted{
  color:#798E9B;
}
.text-right{
  text-align:right;
}
.text-left{
  text-align:left;
}
.text-1{
  font-size:2em;
}
.text-4{
  font-size:0.8em;
}
.text-capitalize{
  text-transform:capitalize;
}
.text-uppercase{
  text-transform:uppercase;
}
.text-ontime{
  color:#58ae5b;
}
.text-late{
  color:#E6413E;
}
.text-warning{
  color:#E6413E !important;
}
.text-red{
  color:#E6413E;
}
.text-blue{
  color:#5496F8;
}
.truncate{
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.flex-row{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:horizontal;
  -webkit-box-direction:normal;
      -ms-flex-direction:row;
          flex-direction:row;
}
.flex-column{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:vertical;
  -webkit-box-direction:normal;
      -ms-flex-direction:column;
          flex-direction:column;
}
.column-gap-4 > :not(:last-child){
  margin-bottom:4px;
}
.row-gap-4 > :not(:last-child){
  margin-right:4px;
}
.column-gap-7 > :not(:last-child){
  margin-bottom:7px;
}
.row-gap-7 > :not(:last-child){
  margin-right:7px;
}
.column-gap-10 > :not(:last-child){
  margin-bottom:10px;
}
.row-gap-10 > :not(:last-child){
  margin-right:10px;
}
.column-gap-20 > :not(:last-child){
  margin-bottom:20px;
}
.row-gap-20 > :not(:last-child){
  margin-right:20px;
}
.wrap{
  -ms-flex-wrap:wrap;
      flex-wrap:wrap;
}
.flex{
  -webkit-box-flex:1;
      -ms-flex:1;
          flex:1;
}
.auto{
  margin:auto;
}
.relative{
  position:relative;
}
.space-between{
  -webkit-box-pack:justify;
      -ms-flex-pack:justify;
          justify-content:space-between;
}
.space-around{
  -ms-flex-pack:distribute;
      justify-content:space-around;
}
.justify-center{
  -webkit-box-pack:center;
      -ms-flex-pack:center;
          justify-content:center;
}
.flex-center{
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
}
.align-center{
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
}
.clickable{
  cursor:pointer;
}
.round-icon{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  width:23px;
  height:23px;
  background:#315790;
  border-radius:50%;
}
.flex-half{
  -ms-flex-preferred-size:50%;
      flex-basis:50%;
}
.link-unstyled{
  color:inherit;
}
.link-unstyled:hover{
  text-decoration:none;
}
.half{
  width:50%;
}
.noselect{
  -webkit-touch-callout:none;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
.hover-shadow:hover{
  -webkit-box-shadow:0px 0px 4px 2px rgba(0, 0, 0, 0.16);
          box-shadow:0px 0px 4px 2px rgba(0, 0, 0, 0.16);
}
.marker-transparent{
  opacity:0.4;
}
.marker-fade{
  -webkit-filter:contrast(16%) brightness(160%) blur(0.6px);
          filter:contrast(16%) brightness(160%) blur(0.6px);
}
.tooltip-warning{
  background:#e04745;
  color:#fff;
}
.tooltip-warning-arrow{
  border-right-color:#e04745 !important;
}
.tooltip-info{
  background:#5496F8;
  color:#fff;
}
.tooltip-info-arrow{
  border-right-color:#5496F8 !important;
}
a{
  color:inherit;
  text-decoration:none;
}
a:hover{
  color:inherit;
  text-decoration:none;
}
a:active{
  color:inherit;
  text-decoration:none;
}
a:focus{
  outline:none;
  color:inherit;
  text-decoration:none;
}
.spinner-wave{
  margin:0 auto;
  width:100px;
  height:20px;
  text-align:center;
}
.spinner-wave > div{
  background-color:#5496F8;
  height:100%;
  width:6px;
  display:inline-block;
  -webkit-animation:wave 1.2s infinite ease-in-out;
  animation:wave 1.2s infinite ease-in-out;
}
.spinner-wave div:nth-child(2){
  -webkit-animation-delay:-1.1s;
  animation-delay:-1.1s;
}
.spinner-wave div:nth-child(3){
  -webkit-animation-delay:-1s;
  animation-delay:-1s;
}
.spinner-wave div:nth-child(4){
  -webkit-animation-delay:-0.9s;
  animation-delay:-0.9s;
}
.spinner-wave div:nth-child(5){
  -webkit-animation-delay:-0.8s;
  animation-delay:-0.8s;
}
@-webkit-keyframes wave{
  0%,
  40%,
  100%{
    -webkit-transform:scaleY(0.4);
  }
  20%{
    -webkit-transform:scaleY(1);
  }
}
@keyframes wave{
  0%,
  40%,
  100%{
    -webkit-transform:scaleY(0.4);
            transform:scaleY(0.4);
  }
  20%{
    -webkit-transform:scaleY(1);
            transform:scaleY(1);
  }
}
@media screen and (max-width: 480px){
  .hide-xs{
    display:none !important;
  }
}
@media screen and (min-width: 480px){
  .show-xs{
    display:none !important;
  }
}
.ht-btn{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
  padding:5px 13px;
  border:0;
  background:#ffffff;
  color:#52616A;
  -webkit-box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
          box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.ht-btn:focus{
  background:#fcfcfc;
  outline:0;
}
.ht-btn-card:hover{
  background:#5496F8;
  color:rgba(255, 255, 255, 0.96);
  -webkit-box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
          box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.stopped-color{
  color:#FFBB44;
}
.drive-color{
  color:#5496F8;
}
.walk-color{
  color:#5496F8;
}
.moving-color{
  color:#5496F8;
}
.logged_off-color{
  color:#A9BAC4;
}
.network_offline-color{
  color:#d19191;
}
.location_disabled-color{
  color:#d19191;
}
.location_low_accuracy-color{
  color:#d19191;
}
.stopped-bg{
  background:#FFBB44;
}
.drive-bg{
  background:#5496F8;
}
.walk-bg{
  background:#5496F8;
}
.moving-bg{
  background:#5496F8;
}
.logged_off-bg{
  background:#A9BAC4;
}
.network_offline-bg{
  background:#d19191;
}
.location_disabled-bg{
  background-color:#d19191;
}
.location_low_accuracy-bg{
  background-color:#d19191;
}
`],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
BatteryIconComponent.ctorParameters = () => [];
BatteryIconComponent.propDecorators = {
    "battery": [{ type: Input },],
    "layout": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TimeStringPipe {
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    transform(value, args) {
        return TimeString(value, args);
    }
}
TimeStringPipe.decorators = [
    { type: Pipe, args: [{
                name: 'timeString'
            },] },
];
/** @nocollapse */
TimeStringPipe.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DateStringPipe {
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    transform(value, args) {
        return DateString(value, args);
    }
}
DateStringPipe.decorators = [
    { type: Pipe, args: [{
                name: 'dateString'
            },] },
];
/** @nocollapse */
DateStringPipe.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NameCasePipe {
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    transform(value, args) {
        return NameCase(value);
    }
}
NameCasePipe.decorators = [
    { type: Pipe, args: [{
                name: 'nameCase'
            },] },
];
/** @nocollapse */
NameCasePipe.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DotPipe {
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    transform(value, args) {
        return DotString(value, args);
    }
}
DotPipe.decorators = [
    { type: Pipe, args: [{
                name: 'dot'
            },] },
];
/** @nocollapse */
DotPipe.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class LoadingDotsComponent {
    constructor() {
        this.show = true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
LoadingDotsComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-loading-dots',
                template: `<ng-content></ng-content>
<span [style.fontSize.px]="size || 'inherit'" class="loading-dots"><span> &bull;</span><span> &bull;</span><span> &bull;</span></span>
`,
                styles: [`.loading-dots{
  font-size:inherit;
  margin:auto;
}
.loading-dots span{
  -webkit-animation-name:blink;
          animation-name:blink;
  -webkit-animation-duration:1.4s;
          animation-duration:1.4s;
  -webkit-animation-iteration-count:infinite;
          animation-iteration-count:infinite;
  -webkit-animation-fill-mode:both;
          animation-fill-mode:both;
}
.loading-dots span:nth-child(2){
  -webkit-animation-delay:.2s;
          animation-delay:.2s;
}
.loading-dots span:nth-child(3){
  -webkit-animation-delay:.4s;
          animation-delay:.4s;
}
@-webkit-keyframes blink{
  0%{
    opacity:.2;
  }
  20%{
    opacity:1;
  }
  100%{
    opacity:.2;
  }
}
@keyframes blink{
  0%{
    opacity:.2;
  }
  20%{
    opacity:1;
  }
  100%{
    opacity:.2;
  }
}
`],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
LoadingDotsComponent.ctorParameters = () => [];
LoadingDotsComponent.propDecorators = {
    "show": [{ type: Input },],
    "size": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class LoadingDataComponent {
    constructor() {
        this.message = "";
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
LoadingDataComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-loading-data',
                template: `<div [style.fontSize.px]="size || 'inherit'" loading-dots><span>{{customMessage || message}}</span></div>
`,
                styles: [`:host{
  color:#798E9B;
  text-align:center;
}
`],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
LoadingDataComponent.ctorParameters = () => [];
LoadingDataComponent.propDecorators = {
    "size": [{ type: Input },],
    "message": [{ type: Input },],
    "customMessage": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DateHumanizePipe {
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    transform(value, args) {
        return DateHumanize(value);
    }
}
DateHumanizePipe.decorators = [
    { type: Pipe, args: [{
                name: 'dateHumanize'
            },] },
];
/** @nocollapse */
DateHumanizePipe.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DistanceLocalePipe {
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    transform(value, args) {
        return DistanceLocale(value);
    }
}
DistanceLocalePipe.decorators = [
    { type: Pipe, args: [{
                name: 'distanceLocale'
            },] },
];
/** @nocollapse */
DistanceLocalePipe.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class HmStringPipe {
    /**
     * @param {?} value
     * @param {?=} args
     * @param {?=} args2
     * @return {?}
     */
    transform(value, args, args2) {
        return HMString(value, args);
    }
}
HmStringPipe.decorators = [
    { type: Pipe, args: [{
                name: 'hmString'
            },] },
];
/** @nocollapse */
HmStringPipe.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UsersStatusStringPipe {
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    transform(value, args) {
        if (status.split(',').length === 4)
            return 'Fit to map';
        // return GetUserStatusString(value)
    }
}
UsersStatusStringPipe.decorators = [
    { type: Pipe, args: [{
                name: 'usersStatusString'
            },] },
];
/** @nocollapse */
UsersStatusStringPipe.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ActionStatusStringPipe {
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    transform(value, args) {
        return htAction().getFilterString(value);
    }
}
ActionStatusStringPipe.decorators = [
    { type: Pipe, args: [{
                name: 'actionStatusString'
            },] },
];
/** @nocollapse */
ActionStatusStringPipe.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UserSortingStringPipe {
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    transform(value, args) {
        return value;
        // return GetUserSortingString(value);
    }
}
UserSortingStringPipe.decorators = [
    { type: Pipe, args: [{
                name: 'userSortingString'
            },] },
];
/** @nocollapse */
UserSortingStringPipe.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ActionSortingStringPipe {
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    transform(value, args) {
        return htAction().getSortingString(value);
    }
}
ActionSortingStringPipe.decorators = [
    { type: Pipe, args: [{
                name: 'actionSortingString'
            },] },
];
/** @nocollapse */
ActionSortingStringPipe.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SafeUrlPipe {
    constructor() { }
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    transform(value, args) {
        // return this.sanitizer.bypassSecurityTrustResourceUrl(value);
    }
}
SafeUrlPipe.decorators = [
    { type: Pipe, args: [{ name: 'safeUrl' },] },
];
/** @nocollapse */
SafeUrlPipe.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PluralizePipe {
    /**
     * @param {?} value
     * @param {?} args
     * @param {?=} suffix
     * @param {?=} singularSuffix
     * @return {?}
     */
    transform(value, args, suffix = 's', singularSuffix = '') {
        if (args && typeof args === 'number') {
            return args > 1 ? value + suffix : value + singularSuffix;
        }
        return value;
    }
}
PluralizePipe.decorators = [
    { type: Pipe, args: [{
                name: 'pluralize'
            },] },
];
/** @nocollapse */
PluralizePipe.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ButtonComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
ButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-button',
                template: `<p>
  button works!
</p>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
ButtonComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class LoadingBarComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
LoadingBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-loading-bar',
                template: `<div class="relative">
  <div class="load-bar">
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
  </div>
</div>
`,
                styles: [`.text-center{
  text-align:center;
}
.text-muted{
  color:#798E9B;
}
.text-right{
  text-align:right;
}
.text-left{
  text-align:left;
}
.text-1{
  font-size:2em;
}
.text-4{
  font-size:0.8em;
}
.text-capitalize{
  text-transform:capitalize;
}
.text-uppercase{
  text-transform:uppercase;
}
.text-ontime{
  color:#58ae5b;
}
.text-late{
  color:#E6413E;
}
.text-warning{
  color:#E6413E !important;
}
.text-red{
  color:#E6413E;
}
.text-blue{
  color:#5496F8;
}
.truncate{
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.flex-row{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:horizontal;
  -webkit-box-direction:normal;
      -ms-flex-direction:row;
          flex-direction:row;
}
.flex-column{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:vertical;
  -webkit-box-direction:normal;
      -ms-flex-direction:column;
          flex-direction:column;
}
.column-gap-4 > :not(:last-child){
  margin-bottom:4px;
}
.row-gap-4 > :not(:last-child){
  margin-right:4px;
}
.column-gap-7 > :not(:last-child){
  margin-bottom:7px;
}
.row-gap-7 > :not(:last-child){
  margin-right:7px;
}
.column-gap-10 > :not(:last-child){
  margin-bottom:10px;
}
.row-gap-10 > :not(:last-child){
  margin-right:10px;
}
.column-gap-20 > :not(:last-child){
  margin-bottom:20px;
}
.row-gap-20 > :not(:last-child){
  margin-right:20px;
}
.wrap{
  -ms-flex-wrap:wrap;
      flex-wrap:wrap;
}
.flex{
  -webkit-box-flex:1;
      -ms-flex:1;
          flex:1;
}
.auto{
  margin:auto;
}
.relative{
  position:relative;
}
.space-between{
  -webkit-box-pack:justify;
      -ms-flex-pack:justify;
          justify-content:space-between;
}
.space-around{
  -ms-flex-pack:distribute;
      justify-content:space-around;
}
.justify-center{
  -webkit-box-pack:center;
      -ms-flex-pack:center;
          justify-content:center;
}
.flex-center{
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
}
.align-center{
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
}
.clickable{
  cursor:pointer;
}
.round-icon{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  width:23px;
  height:23px;
  background:#315790;
  border-radius:50%;
}
.flex-half{
  -ms-flex-preferred-size:50%;
      flex-basis:50%;
}
.link-unstyled{
  color:inherit;
}
.link-unstyled:hover{
  text-decoration:none;
}
.half{
  width:50%;
}
.noselect{
  -webkit-touch-callout:none;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
.hover-shadow:hover{
  -webkit-box-shadow:0px 0px 4px 2px rgba(0, 0, 0, 0.16);
          box-shadow:0px 0px 4px 2px rgba(0, 0, 0, 0.16);
}
.marker-transparent{
  opacity:0.4;
}
.marker-fade{
  -webkit-filter:contrast(16%) brightness(160%) blur(0.6px);
          filter:contrast(16%) brightness(160%) blur(0.6px);
}
.tooltip-warning{
  background:#e04745;
  color:#fff;
}
.tooltip-warning-arrow{
  border-right-color:#e04745 !important;
}
.tooltip-info{
  background:#5496F8;
  color:#fff;
}
.tooltip-info-arrow{
  border-right-color:#5496F8 !important;
}
a{
  color:inherit;
  text-decoration:none;
}
a:hover{
  color:inherit;
  text-decoration:none;
}
a:active{
  color:inherit;
  text-decoration:none;
}
a:focus{
  outline:none;
  color:inherit;
  text-decoration:none;
}
.spinner-wave{
  margin:0 auto;
  width:100px;
  height:20px;
  text-align:center;
}
.spinner-wave > div{
  background-color:#5496F8;
  height:100%;
  width:6px;
  display:inline-block;
  -webkit-animation:wave 1.2s infinite ease-in-out;
  animation:wave 1.2s infinite ease-in-out;
}
.spinner-wave div:nth-child(2){
  -webkit-animation-delay:-1.1s;
  animation-delay:-1.1s;
}
.spinner-wave div:nth-child(3){
  -webkit-animation-delay:-1s;
  animation-delay:-1s;
}
.spinner-wave div:nth-child(4){
  -webkit-animation-delay:-0.9s;
  animation-delay:-0.9s;
}
.spinner-wave div:nth-child(5){
  -webkit-animation-delay:-0.8s;
  animation-delay:-0.8s;
}
@-webkit-keyframes wave{
  0%,
  40%,
  100%{
    -webkit-transform:scaleY(0.4);
  }
  20%{
    -webkit-transform:scaleY(1);
  }
}
@keyframes wave{
  0%,
  40%,
  100%{
    -webkit-transform:scaleY(0.4);
            transform:scaleY(0.4);
  }
  20%{
    -webkit-transform:scaleY(1);
            transform:scaleY(1);
  }
}
@media screen and (max-width: 480px){
  .hide-xs{
    display:none !important;
  }
}
@media screen and (min-width: 480px){
  .show-xs{
    display:none !important;
  }
}
.ht-btn{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
  padding:5px 13px;
  border:0;
  background:#ffffff;
  color:#52616A;
  -webkit-box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
          box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.ht-btn:focus{
  background:#fcfcfc;
  outline:0;
}
.ht-btn-card:hover{
  background:#5496F8;
  color:rgba(255, 255, 255, 0.96);
  -webkit-box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
          box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.stopped-color{
  color:#FFBB44;
}
.drive-color{
  color:#5496F8;
}
.walk-color{
  color:#5496F8;
}
.moving-color{
  color:#5496F8;
}
.logged_off-color{
  color:#A9BAC4;
}
.network_offline-color{
  color:#d19191;
}
.location_disabled-color{
  color:#d19191;
}
.location_low_accuracy-color{
  color:#d19191;
}
.stopped-bg{
  background:#FFBB44;
}
.drive-bg{
  background:#5496F8;
}
.walk-bg{
  background:#5496F8;
}
.moving-bg{
  background:#5496F8;
}
.logged_off-bg{
  background:#A9BAC4;
}
.network_offline-bg{
  background:#d19191;
}
.location_disabled-bg{
  background-color:#d19191;
}
.location_low_accuracy-bg{
  background-color:#d19191;
}
.load-bar{
  position:absolute;
  width:100%;
  height:3px;
  top:0;
  background-color:#fdba2c;
  z-index:10000;
}
.bar{
  content:"";
  display:inline;
  position:absolute;
  width:0;
  height:100%;
  left:50%;
  text-align:center;
}
.bar:nth-child(1){
  background-color:#da4733;
  -webkit-animation:loading 3s linear infinite;
          animation:loading 3s linear infinite;
}
.bar:nth-child(2){
  background-color:#3b78e7;
  -webkit-animation:loading 3s linear 1s infinite;
          animation:loading 3s linear 1s infinite;
}
.bar:nth-child(3){
  background-color:#fdba2c;
  -webkit-animation:loading 3s linear 2s infinite;
          animation:loading 3s linear 2s infinite;
}
@-webkit-keyframes loading{
  from{
    left:50%;
    width:0;
    z-index:100;
  }
  33.3333%{
    left:0;
    width:100%;
    z-index:10;
  }
  to{
    left:0;
    width:100%;
  }
}
@keyframes loading{
  from{
    left:50%;
    width:0;
    z-index:100;
  }
  33.3333%{
    left:0;
    width:100%;
    z-index:10;
  }
  to{
    left:0;
    width:100%;
  }
}
`]
            },] },
];
/** @nocollapse */
LoadingBarComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DropdownDirective {
    constructor() {
        this.show = false;
        this.appDropdown = 'onHover';
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseEnter(event) {
        if (!this.appDropdown || this.appDropdown === 'onHover') {
            this.show = true;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseLeave(event) {
        if (!this.appDropdown || this.appDropdown === 'onHover') {
            this.show = false;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onClick(event) {
        if (this.appDropdown == 'onClick') {
            this.show = !this.show;
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
DropdownDirective.decorators = [
    { type: Directive, args: [{
                selector: '[htDropdown]'
            },] },
];
/** @nocollapse */
DropdownDirective.ctorParameters = () => [];
DropdownDirective.propDecorators = {
    "show": [{ type: HostBinding, args: ['class.is-active',] },],
    "appDropdown": [{ type: Input },],
    "hover": [{ type: Input },],
    "onMouseEnter": [{ type: HostListener, args: ['mouseenter', ['$event'],] },],
    "onMouseLeave": [{ type: HostListener, args: ['mouseleave', ['$event'],] },],
    "onClick": [{ type: HostListener, args: ['click', ['$event'],] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SharedModule {
}
SharedModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    RouterModule
                ],
                declarations: [
                    ProfileComponent,
                    BatteryIconComponent,
                    DateStringPipe,
                    TimeStringPipe,
                    DotPipe,
                    NameCasePipe,
                    LoadingDotsComponent,
                    LoadingDataComponent,
                    DateHumanizePipe,
                    DistanceLocalePipe,
                    HmStringPipe,
                    UsersStatusStringPipe,
                    ActionStatusStringPipe,
                    SafeUrlPipe,
                    UserSortingStringPipe,
                    ActionSortingStringPipe,
                    PluralizePipe,
                    ButtonComponent,
                    LoadingBarComponent,
                    DropdownDirective,
                ],
                exports: [
                    ProfileComponent,
                    BatteryIconComponent,
                    DateStringPipe,
                    TimeStringPipe,
                    DotPipe,
                    NameCasePipe,
                    LoadingDotsComponent,
                    LoadingDataComponent,
                    DateHumanizePipe,
                    DistanceLocalePipe,
                    HmStringPipe,
                    UsersStatusStringPipe,
                    ActionStatusStringPipe,
                    SafeUrlPipe,
                    UserSortingStringPipe,
                    ActionSortingStringPipe,
                    PluralizePipe,
                    LoadingBarComponent,
                    DropdownDirective,
                ]
            },] },
];
/** @nocollapse */
SharedModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UserCardModule {
}
UserCardModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    SharedModule
                ],
                declarations: [UserCardComponent],
                exports: [UserCardComponent]
            },] },
];
/** @nocollapse */
UserCardModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UsersComponent {
    constructor() {
        this.hasMap = false;
        this.showExtraBtn = true;
        this.onSelectUser = new EventEmitter();
        this.onAction = new EventEmitter();
        this.onHover = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} user
     * @return {?}
     */
    getAction(user) {
        // console.log("action", this.loadingUserDataId, this.loadingUserId);
        const /** @type {?} */ id = user.id;
        if (!this.hasMap)
            return 'detail';
        if (this.selectedUserId === user.id) {
            return "close";
        }
        else if (id === this.loadingUserDataId && (!this.selectedUserId || !user.segments)) {
            return 'loading';
        }
        else if (this.selectedUserDataId === user.id) {
            return 'detail';
        }
        else {
            return "default";
        }
    }
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    indexId(index, item) {
        return item.id;
    }
    /**
     * @param {?} user
     * @return {?}
     */
    selectUser(user) {
        this.onSelectUser.next(user);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    hover(id) {
        this.onHover.next(id);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
    }
}
UsersComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-users',
                template: `<div class="card-stack" *ngIf="users" [@cardStack]="users.length">
  <ht-user-card
    [@sort]="i"
    class="flex-row card card-clickable is-marginless"
    [class.card-selected]="selectedUserDataId == user.id"
    (mouseenter)="hover(user.id)"
    (mouseleave)="hover(null)"
    (click)="selectUser(user)"
    [user]="user" *ngFor="let user of users; let i = index; trackBy:indexId">
    <div *ngIf="selectedUserId" class="card-content-mid card-action flex-row align-center" (click)="onAction.next({event: $event, action: 'close'})">
      <a class="delete is-medium"></a>
    </div>
    <ht-loading-dots
      *ngIf="user.id === loadingUserDataId && !selectedUserId" class="card-content-mid text-1 card-action flex-row align-center">
    </ht-loading-dots>
  </ht-user-card>
</div>
`,
                styles: [`.card-action-clicked{
  color:white;
}
.card-action{
  font-size:1.3em;
  font-weight:bold;
  min-width:46px;
}
.card-action.clickable:hover{
  background:#e6e6e6;
}
`],
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [
                    trigger('card', [
                        transition(':enter', [
                            style({ transform: 'translateX(-100px)', height: 0, opacity: 0 }),
                            animate('0.3s' + ' ease-out')
                        ]),
                        transition(':leave', [
                            style({ transform: 'translateX(0px)', height: '*', opacity: 1 }),
                            animate('0.3s' + ' ease-in', style({ transform: 'translateX(-100px)', height: 0, opacity: 0 }))
                        ])
                    ]),
                    trigger('image', []),
                    trigger('sort', [
                        transition('* => *', animate(500, keyframes([
                            style('*'),
                            style({ opacity: 0.1 }),
                            style('*'),
                        ]))),
                    ]),
                    trigger('cardStack', [
                        transition('* => *', [
                            query('.card:enter', [
                                style({ transform: 'translateX(-100px)', height: 0, opacity: 0 }),
                                animate('0.3s' + ' ease-out')
                            ], { optional: true }),
                            query('.card:leave', [
                                style({ transform: 'translateX(0px)', height: '*', opacity: 1 }),
                                animate('0.3s' + ' ease-in', style({ transform: 'translateX(-100px)', height: 0, opacity: 0 }))
                            ], { optional: true })
                        ])
                    ])
                ]
            },] },
];
/** @nocollapse */
UsersComponent.ctorParameters = () => [];
UsersComponent.propDecorators = {
    "users": [{ type: Input },],
    "selectedUserId": [{ type: Input },],
    "selectedUserDataId": [{ type: Input },],
    "loadingUserDataId": [{ type: Input },],
    "hasMap": [{ type: Input },],
    "showExtraBtn": [{ type: Input },],
    "onSelectUser": [{ type: Output },],
    "onAction": [{ type: Output },],
    "onHover": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UsersModule {
}
UsersModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    SharedModule,
                    UserCardModule
                ],
                declarations: [UsersComponent],
                exports: [UsersComponent]
            },] },
];
/** @nocollapse */
UsersModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class HtMapService extends HtMapClass {
}
var MAP_TYPE = new InjectionToken('app.mapType');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class HtUsersService extends HtUsersClient {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UsersContainerComponent {
    /**
     * @param {?} userService
     * @param {?} mapService
     */
    constructor(userService, mapService) {
        this.userService = userService;
        this.mapService = mapService;
        this.hasPlaceline = true;
        this.hasMap = false;
        this.showStatusSummary = true;
        this.showActiveSummary = true;
        this.apiType = ApiType.analytics;
        this.showAll = false;
        this._queryMap = [
            {
                label: 'Logged in',
                values: ['stopped', 'on_trip', 'network_offline'],
                color: Color.blue
            },
            {
                label: 'Logged off',
                values: ['logged_off'],
                color: '#a8a8a8',
            },
            {
                label: 'Location disabled',
                values: ['location_disabled'],
                color: Color.red
            },
        ];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.userService.list.setActive();
        if (this.hasPlaceline) {
            const /** @type {?} */ selectedUser$ = listwithSelectedId$(this.userService.list.data$, this.userService.list.id$);
            this.user$ = this.userService.placeline.data$;
            this.usersPage$ = listWithItem$(selectedUser$, this.user$);
            this.mapService.usersCluster.onClick = (entity) => {
                this.selectUserCard(entity.data);
            };
        }
        else {
            this.usersPage$ = this.userService.list.data$;
        }
        this.users$ = this.usersPage$.pipe(map$1((pageData) => {
            return pageData ? pageData.results : pageData;
        }));
        this.loadingUsers$ = this.userService.getLoading$();
        this.loadingUserDataId$ = this.userService.placeline.loading$
            .pipe(map$1(data => !!data), distinctUntilChanged());
        this.selectedUserDataId$ = this.userService.placeline.id$;
        this.selectedUserId$ = this.userService.list.id$;
        this.showSummary$ = this.selectedUserId$.pipe(map$1(id => {
            return id ? false : true;
        }), distinctUntilChanged());
    }
    /**
     * @return {?}
     */
    get queryMap() {
        const /** @type {?} */ showAllLabel = this.userService.filterClass.showAllQueryArray;
        return this.showAll ? [...this._queryMap, ...showAllLabel] : this._queryMap;
    }
    /**
     * @return {?}
     */
    clear() {
        this.mapService.segmentTrace.trace(null);
    }
    /**
     * @param {?} user
     * @return {?}
     */
    selectUserMarker(user) {
        this.mapService.usersCluster.highlight(user);
    }
    /**
     * @param {?} payload
     * @return {?}
     */
    onAction(payload) {
        // console.log(payload, payload['action']);
        switch (payload['action']) {
            case "close":
                this.closeUser(payload.event);
                break;
            case "detail": {
                this.selectUserCard(payload.user);
                // this.selectUserMarker(payload.user);
                // this.selectUser(payload.user);
                break;
            }
            case "default": {
                this.selectUserCardAction(payload.user, payload.event);
                // this.selectUserData(payload.user, payload.event);
                break;
            }
            default: 
        }
    }
    ;
    /**
     * @param {?} user
     * @return {?}
     */
    selectUserCard(user) {
        if (this.hasPlaceline) {
            this.selectUser(user);
        }
        else {
            this.selectUserMarker(user);
        }
    }
    /**
     * @param {?} user
     * @param {?} event
     * @return {?}
     */
    selectUserCardAction(user, event) {
        if (this.hasPlaceline) {
            this.selectUserData(user, event);
        }
        else {
            this.selectUserMarker(user);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    closeUser(event) {
        event.stopPropagation();
        this.userService.list.setId(null);
        this.userService.placeline.setId(null);
    }
    /**
     * @param {?} user
     * @return {?}
     */
    selectUser(user) {
        const /** @type {?} */ id = user.id;
        this.userService.list.toggleId(id);
        this.userService.placeline.toggleId(id);
        // this.userService.placeline.setId(id);
    }
    ;
    /**
     * @param {?} userData
     * @param {?} event
     * @return {?}
     */
    selectUserData(userData, event) {
        const /** @type {?} */ id = userData.id;
        event.stopPropagation();
        this.userService.placeline.toggleId(id);
    }
    /**
     * @param {?} number
     * @return {?}
     */
    fetchPage(number) {
        this.userService.list.addQuery({ page: number });
    }
    /**
     * @param {?} userId
     * @return {?}
     */
    hoverUser(userId) {
        this.mapService.usersCluster.setPopup(userId);
    }
    /**
     * @return {?}
     */
    closeHoverUser() {
        this.hoverUser(null);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.userService.list.clearData();
        this.userService.list.setId(null);
    }
}
UsersContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-users-container',
                template: `<div class="flex-column relative">
  <ng-container *ngIf="showSummary$ | async">
    <ht-users-summary-container *ngIf="showStatusSummary" [selectable]="true"></ht-users-summary-container>
    <ht-users-summary-container *ngIf="showActiveSummary" [selectable]="true" [hideTotal]="true" [queryLabels]="queryMap"></ht-users-summary-container>
  </ng-container>
  <ht-users
    [selectedUserDataId]="selectedUserDataId$ | async"
    [selectedUserId]="selectedUserId$ | async"
    [loadingUserDataId]="loadingUserDataId$ | async"
    [hasMap]="hasMap"
    (onHover)="hoverUser($event)"
    (onAction)="onAction($event)"
    (onSelectUser)="selectUserCard($event)"
    [showExtraBtn]="hasPlaceline"
    [users]="users$ | async"></ht-users>
  <ht-placeline-container [showUserCard]="false" *ngIf="(selectedUserId$ | async)"></ht-placeline-container>
  <!--<div *ngIf="(selectedUserId$ | async) && user$ | async as userData">-->
    <!--&lt;!&ndash;<ht-user-card [user]="userData"></ht-user-card>&ndash;&gt;-->
    <!--<ht-placeline [userData]="userData"></ht-placeline>-->
  <!--</div>-->
  <div class="loading-box" *ngIf="loadingUsers$ | async"></div>
  <ng-container *ngIf="usersPage$ | async as usersPage">
    <ht-pagination (fetchPage)="fetchPage($event)" [pageDate]="usersPage"></ht-pagination>
  </ng-container>
</div>
`,
                styles: [`.text-center{
  text-align:center;
}
.text-muted{
  color:#798E9B;
}
.text-right{
  text-align:right;
}
.text-left{
  text-align:left;
}
.text-1{
  font-size:2em;
}
.text-4{
  font-size:0.8em;
}
.text-capitalize{
  text-transform:capitalize;
}
.text-uppercase{
  text-transform:uppercase;
}
.text-ontime{
  color:#58ae5b;
}
.text-late{
  color:#E6413E;
}
.text-warning{
  color:#E6413E !important;
}
.text-red{
  color:#E6413E;
}
.text-blue{
  color:#5496F8;
}
.truncate{
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.flex-row{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:horizontal;
  -webkit-box-direction:normal;
      -ms-flex-direction:row;
          flex-direction:row;
}
.flex-column{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:vertical;
  -webkit-box-direction:normal;
      -ms-flex-direction:column;
          flex-direction:column;
}
.column-gap-4 > :not(:last-child){
  margin-bottom:4px;
}
.row-gap-4 > :not(:last-child){
  margin-right:4px;
}
.column-gap-7 > :not(:last-child){
  margin-bottom:7px;
}
.row-gap-7 > :not(:last-child){
  margin-right:7px;
}
.column-gap-10 > :not(:last-child){
  margin-bottom:10px;
}
.row-gap-10 > :not(:last-child){
  margin-right:10px;
}
.column-gap-20 > :not(:last-child){
  margin-bottom:20px;
}
.row-gap-20 > :not(:last-child){
  margin-right:20px;
}
.wrap{
  -ms-flex-wrap:wrap;
      flex-wrap:wrap;
}
.flex{
  -webkit-box-flex:1;
      -ms-flex:1;
          flex:1;
}
.auto{
  margin:auto;
}
.relative{
  position:relative;
}
.space-between{
  -webkit-box-pack:justify;
      -ms-flex-pack:justify;
          justify-content:space-between;
}
.space-around{
  -ms-flex-pack:distribute;
      justify-content:space-around;
}
.justify-center{
  -webkit-box-pack:center;
      -ms-flex-pack:center;
          justify-content:center;
}
.flex-center{
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
}
.align-center{
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
}
.clickable{
  cursor:pointer;
}
.round-icon{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  width:23px;
  height:23px;
  background:#315790;
  border-radius:50%;
}
.flex-half{
  -ms-flex-preferred-size:50%;
      flex-basis:50%;
}
.link-unstyled{
  color:inherit;
}
.link-unstyled:hover{
  text-decoration:none;
}
.half{
  width:50%;
}
.noselect{
  -webkit-touch-callout:none;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
.hover-shadow:hover{
  -webkit-box-shadow:0px 0px 4px 2px rgba(0, 0, 0, 0.16);
          box-shadow:0px 0px 4px 2px rgba(0, 0, 0, 0.16);
}
.marker-transparent{
  opacity:0.4;
}
.marker-fade{
  -webkit-filter:contrast(16%) brightness(160%) blur(0.6px);
          filter:contrast(16%) brightness(160%) blur(0.6px);
}
.tooltip-warning{
  background:#e04745;
  color:#fff;
}
.tooltip-warning-arrow{
  border-right-color:#e04745 !important;
}
.tooltip-info{
  background:#5496F8;
  color:#fff;
}
.tooltip-info-arrow{
  border-right-color:#5496F8 !important;
}
a{
  color:inherit;
  text-decoration:none;
}
a:hover{
  color:inherit;
  text-decoration:none;
}
a:active{
  color:inherit;
  text-decoration:none;
}
a:focus{
  outline:none;
  color:inherit;
  text-decoration:none;
}
.spinner-wave{
  margin:0 auto;
  width:100px;
  height:20px;
  text-align:center;
}
.spinner-wave > div{
  background-color:#5496F8;
  height:100%;
  width:6px;
  display:inline-block;
  -webkit-animation:wave 1.2s infinite ease-in-out;
  animation:wave 1.2s infinite ease-in-out;
}
.spinner-wave div:nth-child(2){
  -webkit-animation-delay:-1.1s;
  animation-delay:-1.1s;
}
.spinner-wave div:nth-child(3){
  -webkit-animation-delay:-1s;
  animation-delay:-1s;
}
.spinner-wave div:nth-child(4){
  -webkit-animation-delay:-0.9s;
  animation-delay:-0.9s;
}
.spinner-wave div:nth-child(5){
  -webkit-animation-delay:-0.8s;
  animation-delay:-0.8s;
}
@-webkit-keyframes wave{
  0%,
  40%,
  100%{
    -webkit-transform:scaleY(0.4);
  }
  20%{
    -webkit-transform:scaleY(1);
  }
}
@keyframes wave{
  0%,
  40%,
  100%{
    -webkit-transform:scaleY(0.4);
            transform:scaleY(0.4);
  }
  20%{
    -webkit-transform:scaleY(1);
            transform:scaleY(1);
  }
}
@media screen and (max-width: 480px){
  .hide-xs{
    display:none !important;
  }
}
@media screen and (min-width: 480px){
  .show-xs{
    display:none !important;
  }
}
.ht-btn{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
  padding:5px 13px;
  border:0;
  background:#ffffff;
  color:#52616A;
  -webkit-box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
          box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.ht-btn:focus{
  background:#fcfcfc;
  outline:0;
}
.ht-btn-card:hover{
  background:#5496F8;
  color:rgba(255, 255, 255, 0.96);
  -webkit-box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
          box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.stopped-color{
  color:#FFBB44;
}
.drive-color{
  color:#5496F8;
}
.walk-color{
  color:#5496F8;
}
.moving-color{
  color:#5496F8;
}
.logged_off-color{
  color:#A9BAC4;
}
.network_offline-color{
  color:#d19191;
}
.location_disabled-color{
  color:#d19191;
}
.location_low_accuracy-color{
  color:#d19191;
}
.stopped-bg{
  background:#FFBB44;
}
.drive-bg{
  background:#5496F8;
}
.walk-bg{
  background:#5496F8;
}
.moving-bg{
  background:#5496F8;
}
.logged_off-bg{
  background:#A9BAC4;
}
.network_offline-bg{
  background:#d19191;
}
.location_disabled-bg{
  background-color:#d19191;
}
.location_low_accuracy-bg{
  background-color:#d19191;
}
.loading-box{
  position:absolute;
  background:rgba(255, 255, 255, 0.7);
  top:0;
  left:0;
  width:100%;
  height:100%;
  -webkit-transition:background 0.5s;
  transition:background 0.5s;
  pointer-events:none;
}
.loading-box-active{
  background:rgba(255, 255, 255, 0.7);
}
`]
            },] },
];
/** @nocollapse */
UsersContainerComponent.ctorParameters = () => [
    { type: HtUsersService, },
    { type: HtMapService, },
];
UsersContainerComponent.propDecorators = {
    "hasPlaceline": [{ type: Input },],
    "hasMap": [{ type: Input },],
    "showStatusSummary": [{ type: Input },],
    "showActiveSummary": [{ type: Input },],
    "apiType": [{ type: Input },],
    "showAll": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PlacelineComponent {
    /**
     * @param {?} ref
     */
    constructor(ref) {
        this.ref = ref;
        this.highlightedSegmentId = new EventEmitter();
        this.hoveredAction = new EventEmitter();
        this.selectedSegment = new EventEmitter();
        this.selectedSegmentId = "__";
        this.isMobile = false;
        this.selectedAction = null;
        this.selectedActivity = "";
        this.hardSelectedActivity = "";
        // icons = TaskCardIcon;
        this.actionMap = {};
    }
    /**
     * @param {?} segment
     * @param {?=} event
     * @return {?}
     */
    selectInUserData(segment, event) {
        if (segment && (segment.type === 'trip' || segment.type === 'stop')) {
            const /** @type {?} */ id = segment.id;
            let /** @type {?} */ hardSelectedActivity = this.selectedSegmentId === id ? null : segment.id;
            console.log("emit", this.hardSelectedActivity);
            this.selectedSegment.next(hardSelectedActivity);
        }
        else {
            this.hardSelectedActivity = "";
            this.selectedSegment.next(null);
            if (event)
                event.stopPropagation();
        }
    }
    /**
     * @param {?} segment
     * @param {?=} toShow
     * @return {?}
     */
    selectSegment(segment, toShow = true) {
        if (segment.actionText) {
            const /** @type {?} */ actionId = toShow ? segment.action_id : null;
            this.selectAction(actionId);
        }
        else {
            const /** @type {?} */ userId = toShow ? segment.id : null;
            this.highlightActivity(userId);
        }
    }
    /**
     * @param {?} activityId
     * @return {?}
     */
    hoverActivity(activityId) {
        this.selectedActivity = activityId;
        this.ref.detectChanges();
    }
    /**
     * @param {?} activityId
     * @return {?}
     */
    highlightActivity(activityId) {
        if (this.selectedSegmentId)
            return false;
        this.highlightedSegmentId.next(activityId);
        this.hoverActivity(activityId);
        // console.log(this.selectedActivity, "sele");
    }
    /**
     * @param {?} actionId
     * @return {?}
     */
    selectAction(actionId) {
        this.selectedAction = actionId;
        this.hoveredAction.next(actionId);
        this.ref.detectChanges();
    }
    /**
     * @return {?}
     */
    get placelineMod() {
        const /** @type {?} */ placeline = this.userData;
        if (this.userData.segments.length === 0)
            return [];
        const /** @type {?} */ actions = placeline.actions;
        this.actionMap = {};
        const { currentActions, expActions } = this.currentExpActions(actions);
        const /** @type {?} */ allEvents = this.userData.events;
        let { activitySegments } = reduce(this.userData.segments, (acc, segment) => {
            const /** @type {?} */ time = segment.started_at;
            const /** @type {?} */ activityText = this.getActivityText(segment);
            const /** @type {?} */ activityClass = this.getActivityClass(segment);
            const /** @type {?} */ placeAddress = this.getActivityPlaceAddress(segment);
            const /** @type {?} */ lastSeg = segment;
            const /** @type {?} */ gapSegment = this.getGapSegment(segment, acc.lastSeg);
            // let lastSeg = _.last(acc.activitySegments);
            const /** @type {?} */ currentActivitySegment = Object.assign({}, segment, { time, events: [] }, this.getSegmentStyle(activityClass), { activityText, placeAddress });
            const /** @type {?} */ events = reject(acc.events, (event) => {
                if (this.isEventInSegment(segment, event)) {
                    // event = {...event, ...this.getEventDisplay(event)};
                    const /** @type {?} */ eventDisplay = this.getEventDisplay(event);
                    if (eventDisplay)
                        currentActivitySegment.events.push(Object.assign({}, event, eventDisplay));
                    return true;
                }
                return false;
            });
            // console.log(gapSegment, "gap");
            let /** @type {?} */ activitySegments = [...acc.activitySegments, ...gapSegment, currentActivitySegment];
            // let activitySegments =  [...acc.activitySegments, currentActivitySegment];
            return { activitySegments, events, lastSeg };
        }, { activitySegments: [], events: allEvents, lastSeg: null });
        const /** @type {?} */ lastSeg = this.lastSeg(placeline);
        // activitySegments.push(lastSeg);
        // return activitySegments
        let { actionSegments, actionEvents } = reduce([...activitySegments, lastSeg], (acc, segment, i, placelineM) => {
            activitySegments = acc.activitySegments;
            let /** @type {?} */ lastSeg = segment;
            let /** @type {?} */ activityClass = acc.lastSeg ? acc.lastSeg.activityClass : 'no-info';
            let /** @type {?} */ actionSegments = acc.actionSegments;
            let /** @type {?} */ actionEvents = reject(acc.actionEvents, (actionEvent) => {
                let /** @type {?} */ actionMin = this.getMinute(actionEvent.actionTime);
                let /** @type {?} */ segTime = this.getMinute(segment.time);
                if (actionMin == segTime && !segment.ended && !segment.actionText) {
                    // if(actionEvent.actionTime == segment.time) {
                    let /** @type {?} */ actionSegment = this.createActionSegment(actionEvent, activityClass, acc.lastSeg);
                    segment = Object.assign({}, actionSegment, segment);
                    return true;
                }
                else if (actionEvent.actionTime <= segment.time) {
                    // console.log("np match");
                    let /** @type {?} */ actionSegment = this.createActionSegment(actionEvent, activityClass, acc.lastSeg);
                    actionSegments.push(actionSegment);
                    return true;
                }
                else {
                }
                return false;
            });
            if (segment.ended && !segment.actionText) {
            }
            else if (segment.ended) {
                activitySegments.push(Object.assign({}, segment, { ended: false }));
            }
            else {
                activitySegments.push(segment);
            }
            // activitySegments.push(segment);
            return { activitySegments, actionEvents, lastSeg, actionSegments };
        }, { activitySegments: [], actionEvents: currentActions, lastSeg: null, actionSegments: [] });
        // activitySegments.pop();
        let /** @type {?} */ unsortedCurrentSegment = [...activitySegments, ...actionSegments];
        let /** @type {?} */ currentSegment = sortBy(unsortedCurrentSegment, (segment) => {
            return segment.time;
        });
        let /** @type {?} */ restActiviySegments = map(actionEvents, (actionEvent, i) => {
            lastSeg['activityBorder'] = 'no-info-border';
            lastSeg['activityText'] = 'No information';
            // let activityClass = i < actionEvents.length - 2 ? 'no-info' : 'line';
            return this.createActionSegment(actionEvent, 'no-info');
        });
        let /** @type {?} */ expActionSegments = map(expActions, (actionEvent, i, expEvents) => {
            if (actionEvents.length === 0) {
                lastSeg['activityBorder'] = 'line-border';
            }
            const /** @type {?} */ activityClass = i < expEvents.length - 2 ? 'line' : '';
            return this.createActionSegment(actionEvent, activityClass);
        });
        // console.log(actionSegments, expActionSegments, "ac");
        // console.log("last seeg", lastSeg);
        // console.log(activitySegments.length,actionSegments.length , expActionSegments.length);
        // console.log(this.userData.segments.length, this.userData.actions.length);
        /*
            Handles specific case when action gets completed exactly at the end of last segment
            and no information segment is getting created
             */
        if (restActiviySegments.length == 1 && restActiviySegments[0].actionText && lastSeg['time']) {
            const /** @type {?} */ actionTime = this.getMinute(restActiviySegments[0].time);
            const /** @type {?} */ lastTime = this.getMinute(lastSeg['time']);
            if (actionTime == lastTime) {
                return lastSeg['time'] ?
                    [...currentSegment, ...restActiviySegments, ...expActionSegments] : [...currentSegment, ...expActionSegments];
            }
        }
        return lastSeg['time'] ?
            [...currentSegment, lastSeg, ...restActiviySegments, ...expActionSegments] : [...currentSegment, ...expActionSegments];
    }
    /**
     * @param {?} actionEvent
     * @param {?=} activityClass
     * @param {?=} seg
     * @return {?}
     */
    createActionSegment(actionEvent, activityClass = 'no-info', seg = {}) {
        let /** @type {?} */ id = seg ? seg['id'] : '';
        return Object.assign({}, actionEvent, { time: actionEvent.actionTime }, this.getSegmentStyle(activityClass), { ended: false, isLive: false, id });
    }
    /**
     * @param {?=} activityClass
     * @return {?}
     */
    getSegmentStyle(activityClass = 'no-info') {
        return activityClass ?
            {
                activityBg: `${activityClass}-bg`,
                activityBorder: `${activityClass}-border`,
                activityClass,
                activityColor: `${activityClass}-color`
            } : {};
    }
    /**
     * @param {?} segment
     * @param {?} event
     * @return {?}
     */
    isEventInSegment(segment, event) {
        if (!!segment.ended_at && !!event.recorded_at) {
            const /** @type {?} */ eventMin = this.getMinute(event.recorded_at);
            const /** @type {?} */ segEndMin = this.getMinute(segment.ended_at);
            const /** @type {?} */ segStartMin = this.getMinute(segment.started_at);
            return eventMin >= segStartMin && eventMin <= segEndMin;
        }
        return false;
    }
    /**
     * @param {?} time
     * @return {?}
     */
    getMinute(time) {
        const /** @type {?} */ timeStamp = new Date(time).getTime();
        return Math.round(timeStamp - timeStamp % 60000);
    }
    /**
     * @param {?} actions
     * @return {?}
     */
    currentExpActions(actions) {
        return reduce(actions, (acc, action) => {
            let /** @type {?} */ expActions = [];
            this.actionMap = this.setActionMap(action);
            const /** @type {?} */ assign = Object.assign({ actionText: `${NameCase(action.type)} assigned`, actionTime: action.assigned_at, actionD: NameCase(action.type[0]) + this.actionMap[action.id], action_id: action.id, actionLookupId: action.lookup_id }, action);
            let /** @type {?} */ currentActions = (assign.actionTime) ? [...acc.currentActions, assign] : acc.currentActions;
            if (action.display.ended_at) {
                const /** @type {?} */ end = Object.assign({ actionText: `${NameCase(action.type)} ${action.status}`, actionTime: action.display.ended_at, actionD: NameCase(action.type[0]) + this.actionMap[action.id], actionEnd: true, action_id: action.id, action_distance: action.distance, action_duration: action.duration, actionEnded: true, actionLookupId: action.lookup_id }, action);
                currentActions = [...currentActions, end];
            }
            else {
                const /** @type {?} */ end = Object.assign({ actionText: `${NameCase(action.type)} scheduled`, actionTime: action.eta || null, actionD: NameCase(action.type[0]) + this.actionMap[action.id], actionEnd: true, action_id: action.id, action_distance: action.distance, action_duration: action.duration, actionLookupId: action.lookup_id }, action);
                expActions.push(end);
            }
            return { currentActions, expActions };
        }, { currentActions: [], expActions: [] });
    }
    /**
     * @param {?} placeline
     * @return {?}
     */
    lastSeg(placeline) {
        let /** @type {?} */ lastSeg = last(placeline.segments);
        if (!lastSeg)
            return {};
        // let last = {time: lastSeg['last_heartbeat_at']};
        let /** @type {?} */ pipeClass = "";
        let /** @type {?} */ time;
        let /** @type {?} */ isLive = new HtPlaceline().isLive(placeline);
        if (!isLive) {
            time = lastSeg.ended_at;
        }
        else {
            isLive = true;
            time = placeline.last_heartbeat_at;
        }
        const /** @type {?} */ activityClass = this.getActivityClass(lastSeg);
        return { time, pipeClass, id: '..', lastSeg: true, isLive, ended: true, activityClass, activityBg: `${this.getActivityClass(lastSeg)}-bg` };
    }
    /**
     * @param {?} placeline
     * @return {?}
     */
    isSegmentLive(placeline) {
        let /** @type {?} */ old = placeline.display.seconds_elapsed_since_last_heartbeat;
        let /** @type {?} */ status = placeline.display.status_text;
        return status !== 'Logged off' && old < 15 * 60;
    }
    /**
     * @param {?} segment
     * @return {?}
     */
    getActivityClass(segment) {
        const /** @type {?} */ type = segment.type;
        if (type === 'location_void') {
            return 'warning';
        }
        return type === 'stop' ? 'stop' : 'trip';
    }
    /**
     * @param {?} status
     * @return {?}
     */
    getPipeClass(status) {
        return status === 'stop' ? 'stop solid' : 'trip solid';
    }
    /**
     * @param {?} segment
     * @return {?}
     */
    getActivityText(segment) {
        if (segment.type === 'stop') {
            return segment.place && segment.place.display_text ? segment.place.display_text : 'Stop';
        }
        else if (segment.activity) {
            return segment.activity;
        }
        else if (segment.reason) {
            return this.getLocationVoidText(segment);
        }
        else {
            return NameCase(segment.type);
        }
    }
    /**
     * @param {?} segment
     * @return {?}
     */
    getActivityPlaceAddress(segment) {
        if (segment.type === 'stop' && segment.place && segment.place.locality) {
            return segment.place.locality;
        }
        return "";
    }
    /**
     * @param {?} segment
     * @return {?}
     */
    getLocationVoidText(segment) {
        switch (segment.reason) {
            case 'disabled':
                return "Location disabled";
            case 'no_permission':
                return "Location permission unavailable";
            case 'unknown':
                return "Location unavailable";
            case 'sdk_inactive': {
                return "SDK inactive";
            }
            case "no_activity_permission": {
                return "No activity permission";
            }
            case "device_off": {
                return "Device off";
            }
            default:
                return "Location unavailable";
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    getEventDisplay(event) {
        switch (event.type) {
            case 'tracking.started':
                return {
                    text: 'Tracking started',
                    subtext: ''
                };
            case 'tracking.ended':
                return {
                    text: 'Tracking ended',
                    subtext: ''
                };
            // case 'device.location.disabled':
            //   return {
            //     text: 'Location disabled',
            //     subtext: ''
            //   };
            // case 'device.location.enabled':
            //   return {
            //     text: 'Location enabled',
            //     subtext: ''
            //   };
            // case 'device.location_permission.disabled':
            //   return {
            //     text: 'Location permission disabled',
            //     subtext: ''
            //   };
            // case 'device.location_permission.enabled':
            //   return {
            //     text: 'Location permission enabled',
            //     subtext: ''
            //   };
            case 'device.secondary.ignored':
                return {
                    text: 'Secondary device ignored',
                    subtext: ''
                };
        }
    }
    /**
     * @param {?} segment
     * @param {?} lastSeg
     * @return {?}
     */
    getGapSegment(segment, lastSeg) {
        let /** @type {?} */ gaps = [];
        if (!lastSeg)
            return [];
        if (segment.started_at && lastSeg.ended_at) {
            const /** @type {?} */ endMin = this.getMinute(segment.started_at);
            const /** @type {?} */ startMin = this.getMinute(lastSeg.ended_at);
            const /** @type {?} */ duration = (new Date(segment.started_at).getTime() - new Date(lastSeg.ended_at).getTime()) / 1000;
            if (endMin !== startMin && startMin < endMin) {
                const /** @type {?} */ gap = Object.assign({}, this.getSegmentStyle('no-info'), { time: lastSeg.ended_at, activityText: 'No information', events: [], id: '...', duration });
                gaps.push(gap);
            }
        }
        return gaps;
    }
    /**
     * @param {?} action
     * @return {?}
     */
    setActionMap(action) {
        const /** @type {?} */ actionMap = this.actionMap;
        const /** @type {?} */ type = action.type;
        const /** @type {?} */ id = action.id;
        const /** @type {?} */ typeCount = this.actionMap[type];
        const /** @type {?} */ actionShort = this.actionMap[id];
        if (typeCount) {
            if (!actionShort) {
                actionMap[type] = this.actionMap[type] + 1;
                actionMap[id] = '' + this.actionMap[type];
            }
        }
        else {
            actionMap[type] = 1;
            actionMap[id] = '';
        }
        // console.log(actionMap, "map");
        return Object.assign({}, actionMap);
    }
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    indexId(index, item) {
        return item.id;
    }
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    indexPlaceline(index, item) {
        return item.time || "";
    }
    /**
     * @param {?} a
     * @return {?}
     */
    log(a) {
        console.log(a);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
PlacelineComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-placeline',
                template: `<div class="flex-column">
  <div
    class="flex-row segment"
    (click)="selectInUserData(segment)"
    [class.active-segment]="(selectedActivity == segment.id && segment.activityBorder && !selectedSegmentId) || selectedSegmentId === segment.id"
    (mouseenter)="highlightActivity(segment.id)"
    (mouseleave)="highlightActivity(null)"
    *ngFor="let segment of placelineMod; trackBy:indexPlaceline; let last = last">
    <div class="time-container action-time">
      <div class="target-status text-muted">
      </div>
      <div class="timestamp">
        {{segment.time | timeString | dot: 'Unknown ETA'}}
      </div>
      <div class="text-muted">
        {{segment.time | dateString: 'short'}}
      </div>
      <!--<div class="time-container-mid text-muted" *ngIf="!segment.actionD">-->
        <!--<span>{{segment.duration / 60 | hmString}}</span>-->
      <!--</div>-->
    </div>
    <div class="pipe">
      <div class="bar" *ngIf="!last" [class.big]="(selectedActivity == segment.id && segment.activityBorder && !selectedSegmentId) || selectedSegmentId === segment.id" [class.solid]="segment.activityBorder" [ngClass]="segment.activityBorder"></div>
    </div>
    <div class="flex-column flex timeline-detail">
      <div class="activity-dot segment-dot" [class.activity-dot-ended]="segment.actionEnded" *ngIf="segment.actionD"><div class="auto">{{segment.actionD}} </div></div>
      <div *ngIf="segment.isLive" [ngClass]="segment.activityBg" class="segment-dot"><div *ngIf="segment.isLive" [ngClass]="segment.activityBg" class="pulse"></div></div>
      <div *ngIf="!segment.isLive && !segment.actionD" class="a-dot" [ngClass]="segment.activityBorder"></div>
      <div class="flex-column column-gap-10">
        <div (mouseenter)="selectAction(segment.action_id)" (mouseleave)="selectAction(null)" class="action-card" *ngIf="segment.actionText">
          <div class="flex-column column-gap-4">
            <div class="title">
              {{segment.actionText}}
            </div>
            <div class="lookup" *ngIf="segment.actionLookupId">{{segment.actionLookupId}}</div>
            <div *ngIf="segment.expected_at && segment.actionEnd">Scheduled at {{segment.expected_at | timeString}}</div>
            <div *ngIf="segment.action_duration" class="flex-row row-gap-4">
              <span>{{segment.action_duration / 60 | hmString}}</span>
              <ng-template [ngIf]="(segment.action_distance || segment.action_distance == 0)">
                <span>&bull;</span>
                <span>{{segment.action_distance | distanceLocale}}</span>
              </ng-template>
            </div>
          </div>
        </div>
        <!--<pre>-->
        <!--{{segment | json}}-->
        <!--</pre>-->
        <div class="activity-card flex-column" *ngIf="segment.activityText">
          <div [ngClass]="segment.activityColor" class="truncate" style="max-width: 128px;">
            {{segment.activityText | nameCase}}
          </div>
          <div class="flex-row row-gap-4 activity-stats align-center" *ngIf="segment.duration">
            <span>{{segment.duration / 60 | hmString}}</span>
            <ng-template [ngIf]="(segment.distance || segment.distance == 0) && segment.type == 'trip'">
              <span>&bull;</span>
              <span>{{segment.distance | distanceLocale}}</span>
            </ng-template>
            <ng-container *ngIf="segment.step_count">
              <span>&bull;</span>
              <span>{{segment.step_count}} {{'step' | pluralize: segment.step_count}}</span>
            </ng-container>
          </div>
          <!--<div>-->
            <!--{{segment.placeAddress}}-->
          <!--</div>-->
          <table class="table table-bordered table-condensed" *ngIf="segment.events && segment.events.length">
            <tbody>
            <tr *ngFor="let event of segment.events; trackBy:indexId">
              <td>{{event.recorded_at | timeString}}</td>
              <td>{{event.text}}</td>
            </tr>
            </tbody>
          </table>
          <div class="text-muted" *ngIf="selectedSegmentId == segment.id && segment.place">
            {{segment.place.address}}
          </div>
          <div class="close-card" *ngIf="selectedSegmentId == segment.id && !isMobile" (click)="selectInUserData(null, $event)">
            <i class="fa fa-times-circle fa-2x"></i>
          </div>
        </div>
        <div *ngIf="segment.isLive" class="text-muted heatbeat">
          Last heartbeat
        </div>
      </div>
    </div>
  </div>
</div>
<div class="card" *ngIf="placelineMod && placelineMod.length == 0">
  <div class="card-content-mid text-center"><strong>No Placeline</strong></div>
</div>
`,
                styles: [`.text-center{
  text-align:center;
}
.text-muted{
  color:#798E9B;
}
.text-right{
  text-align:right;
}
.text-left{
  text-align:left;
}
.text-1{
  font-size:2em;
}
.text-4{
  font-size:0.8em;
}
.text-capitalize{
  text-transform:capitalize;
}
.text-uppercase{
  text-transform:uppercase;
}
.text-ontime{
  color:#58ae5b;
}
.text-late{
  color:#E6413E;
}
.text-warning{
  color:#E6413E !important;
}
.text-red{
  color:#E6413E;
}
.text-blue{
  color:#5496F8;
}
.truncate{
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.flex-row{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:horizontal;
  -webkit-box-direction:normal;
      -ms-flex-direction:row;
          flex-direction:row;
}
.flex-column{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:vertical;
  -webkit-box-direction:normal;
      -ms-flex-direction:column;
          flex-direction:column;
}
.column-gap-4 > :not(:last-child){
  margin-bottom:4px;
}
.row-gap-4 > :not(:last-child){
  margin-right:4px;
}
.column-gap-7 > :not(:last-child){
  margin-bottom:7px;
}
.row-gap-7 > :not(:last-child){
  margin-right:7px;
}
.column-gap-10 > :not(:last-child){
  margin-bottom:10px;
}
.row-gap-10 > :not(:last-child){
  margin-right:10px;
}
.column-gap-20 > :not(:last-child){
  margin-bottom:20px;
}
.row-gap-20 > :not(:last-child){
  margin-right:20px;
}
.wrap{
  -ms-flex-wrap:wrap;
      flex-wrap:wrap;
}
.flex{
  -webkit-box-flex:1;
      -ms-flex:1;
          flex:1;
}
.auto{
  margin:auto;
}
.relative{
  position:relative;
}
.space-between{
  -webkit-box-pack:justify;
      -ms-flex-pack:justify;
          justify-content:space-between;
}
.space-around{
  -ms-flex-pack:distribute;
      justify-content:space-around;
}
.justify-center{
  -webkit-box-pack:center;
      -ms-flex-pack:center;
          justify-content:center;
}
.flex-center{
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
}
.align-center{
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
}
.clickable{
  cursor:pointer;
}
.round-icon{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  width:23px;
  height:23px;
  background:#315790;
  border-radius:50%;
}
.flex-half{
  -ms-flex-preferred-size:50%;
      flex-basis:50%;
}
.link-unstyled{
  color:inherit;
}
.link-unstyled:hover{
  text-decoration:none;
}
.half{
  width:50%;
}
.noselect{
  -webkit-touch-callout:none;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
.hover-shadow:hover{
  -webkit-box-shadow:0px 0px 4px 2px rgba(0, 0, 0, 0.16);
          box-shadow:0px 0px 4px 2px rgba(0, 0, 0, 0.16);
}
.marker-transparent{
  opacity:0.4;
}
.marker-fade{
  -webkit-filter:contrast(16%) brightness(160%) blur(0.6px);
          filter:contrast(16%) brightness(160%) blur(0.6px);
}
.tooltip-warning{
  background:#e04745;
  color:#fff;
}
.tooltip-warning-arrow{
  border-right-color:#e04745 !important;
}
.tooltip-info{
  background:#5496F8;
  color:#fff;
}
.tooltip-info-arrow{
  border-right-color:#5496F8 !important;
}
a{
  color:inherit;
  text-decoration:none;
}
a:hover{
  color:inherit;
  text-decoration:none;
}
a:active{
  color:inherit;
  text-decoration:none;
}
a:focus{
  outline:none;
  color:inherit;
  text-decoration:none;
}
.spinner-wave{
  margin:0 auto;
  width:100px;
  height:20px;
  text-align:center;
}
.spinner-wave > div{
  background-color:#5496F8;
  height:100%;
  width:6px;
  display:inline-block;
  -webkit-animation:wave 1.2s infinite ease-in-out;
  animation:wave 1.2s infinite ease-in-out;
}
.spinner-wave div:nth-child(2){
  -webkit-animation-delay:-1.1s;
  animation-delay:-1.1s;
}
.spinner-wave div:nth-child(3){
  -webkit-animation-delay:-1s;
  animation-delay:-1s;
}
.spinner-wave div:nth-child(4){
  -webkit-animation-delay:-0.9s;
  animation-delay:-0.9s;
}
.spinner-wave div:nth-child(5){
  -webkit-animation-delay:-0.8s;
  animation-delay:-0.8s;
}
@-webkit-keyframes wave{
  0%,
  40%,
  100%{
    -webkit-transform:scaleY(0.4);
  }
  20%{
    -webkit-transform:scaleY(1);
  }
}
@keyframes wave{
  0%,
  40%,
  100%{
    -webkit-transform:scaleY(0.4);
            transform:scaleY(0.4);
  }
  20%{
    -webkit-transform:scaleY(1);
            transform:scaleY(1);
  }
}
@media screen and (max-width: 480px){
  .hide-xs{
    display:none !important;
  }
}
@media screen and (min-width: 480px){
  .show-xs{
    display:none !important;
  }
}
.ht-btn{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
  padding:5px 13px;
  border:0;
  background:#ffffff;
  color:#52616A;
  -webkit-box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
          box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.ht-btn:focus{
  background:#fcfcfc;
  outline:0;
}
.ht-btn-card:hover{
  background:#5496F8;
  color:rgba(255, 255, 255, 0.96);
  -webkit-box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
          box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.stopped-color{
  color:#FFBB44;
}
.drive-color{
  color:#5496F8;
}
.walk-color{
  color:#5496F8;
}
.moving-color{
  color:#5496F8;
}
.logged_off-color{
  color:#A9BAC4;
}
.network_offline-color{
  color:#d19191;
}
.location_disabled-color{
  color:#d19191;
}
.location_low_accuracy-color{
  color:#d19191;
}
.stopped-bg{
  background:#FFBB44;
}
.drive-bg{
  background:#5496F8;
}
.walk-bg{
  background:#5496F8;
}
.moving-bg{
  background:#5496F8;
}
.logged_off-bg{
  background:#A9BAC4;
}
.network_offline-bg{
  background:#d19191;
}
.location_disabled-bg{
  background-color:#d19191;
}
.location_low_accuracy-bg{
  background-color:#d19191;
}
:host{
  margin:30px 0;
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:vertical;
  -webkit-box-direction:normal;
      -ms-flex-direction:column;
          flex-direction:column;
}
.segment{
  border-radius:4px;
  padding-right:18px;
}
.active-segment{
  background:rgba(255, 255, 255, 0.75);
}
.trip-status{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:vertical;
  -webkit-box-direction:normal;
      -ms-flex-direction:column;
          flex-direction:column;
  text-align:center;
  color:#52616A;
  margin-bottom:20px;
  position:relative;
}
.trip-status .status-main{
  font-size:31px;
  font-weight:600;
}
.trip-status .status-sub{
  color:#798E9B;
  font-size:12px;
}
.ht-breadcrumb{
  padding-bottom:19px;
}
.card{
  margin-bottom:9px;
}
.card .action-img{
  margin:0 auto;
}
.card .content-right{
  -ms-flex-pack:distribute;
      justify-content:space-around;
  position:relative;
  text-align:center;
}
.driver-container{
  margin-bottom:20px;
  border-bottom:1px solid #C9D6DE;
  padding-bottom:16px;
}
.driver-container .text-muted{
  color:#A9BAC4;
}
.task-status{
  padding-bottom:20px;
  text-align:center;
  color:#52616A;
}
.time-container{
  width:84px;
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:vertical;
  -webkit-box-direction:normal;
      -ms-flex-direction:column;
          flex-direction:column;
  text-align:right;
  padding-right:20px;
  padding-bottom:16px;
  z-index:5;
  color:#52616A;
}
.time-container .target-status{
  font-size:10px;
}
.time-container .timestamp{
  font-size:14px;
  color:#52616A;
}
.time-container .text-muted{
  color:#A9BAC4;
  font-size:12px;
}
.time-container .timestamp-text{
  font-size:12px;
  color:#52616A;
  font-weight:700;
}
.time-container-mid{
  height:100%;
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-pack:end;
      -ms-flex-pack:end;
          justify-content:flex-end;
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
}
.pipe{
  width:20px;
  min-width:20px;
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:vertical;
  -webkit-box-direction:normal;
      -ms-flex-direction:column;
          flex-direction:column;
  -webkit-box-pack:center;
      -ms-flex-pack:center;
          justify-content:center;
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
  z-index:1;
}
.pipe .bar{
  height:100%;
  -webkit-box-flex:1;
      -ms-flex:1;
          flex:1;
}
.pipe .big{
  outline:2px solid;
}
.pipe .solid{
  border-right:3px solid #798E9B;
}
.pipe .line{
  border-right:3px dotted #798E9B;
}
.pipe .line-border{
  border-right:3px dotted #798E9B;
  outline:0;
}
.pipe .light{
  border-right:3px dashed rgba(121, 142, 155, 0.4);
}
.pipe .fade{
  border-right:3px solid rgba(121, 142, 155, 0.14);
}
.timeline-detail{
  padding-bottom:22px;
  position:relative;
  padding-left:16px;
  min-height:66px;
}
.timeline-detail .task-action{
  font-size:16px;
  color:#52616A;
  text-transform:capitalize;
  margin-bottom:4px;
  -webkit-transition:font-size 0.4s;
  transition:font-size 0.4s;
}
.timeline-detail .action-title{
  font-size:16px;
  color:#52616A;
  text-transform:capitalize;
  -webkit-transition:font-size 0.4s;
  transition:font-size 0.4s;
  font-weight:700;
}
.timeline-detail .task-detail{
  background:#fff;
  padding:6px 10px;
  color:#52616A;
  -webkit-transition:font-size 0.4s;
  transition:font-size 0.4s;
}
.timeline-detail .task-icon{
  position:absolute;
  left:-23px;
  top:-2px;
}
.timeline-detail .task-ontime-status{
  color:#55ad58;
  padding-bottom:4px;
  font-size:11px;
  -webkit-transition:font-size 0.4s;
  transition:font-size 0.4s;
}
.timeline-detail .text-late{
  color:#E6413E;
}
.selected-task .task-action{
  font-size:18px;
}
.selected-task .task-detail{
  font-size:13px;
}
.selected-task .task-ontime-status{
  font-size:13px;
}
.trip-event .pipe{
  padding-top:7px;
}
.trip-event .time-container{
  padding-bottom:24px;
}
.segment-dot{
  width:25px;
  height:25px;
  border-radius:50%;
  background:#fff;
  position:absolute;
  top:-1px;
  left:-23px;
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  z-index:2;
}
.a-dot{
  width:9px;
  height:9px;
  border-radius:50%;
  background:#fff;
  border:2px solid #798E9B;
  position:absolute;
  top:-4px;
  left:-14px;
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  background-color:white;
  z-index:2;
}
.activity-dot{
  border:1px solid #798E9B;
  font-size:10px;
}
.activity-dot-ended{
  background:#798E9B;
  color:#fff;
}
.trip-dot{
  border:0px solid #5496F8;
  background:#5496F8;
}
.trip-dot .pulse{
  background:#5496F8;
}
.stop-dot{
  border:0px solid #5496F8;
  background:#5496F8;
}
.stop-dot .pulse{
  background:#5496F8;
}
@-webkit-keyframes pulse{
  0%{
    -webkit-transform:scale(0.3, 0.3);
            transform:scale(0.3, 0.3);
    opacity:0.9;
  }
  100%{
    -webkit-transform:scale(3, 3);
            transform:scale(3, 3);
    opacity:0;
  }
}
@keyframes pulse{
  0%{
    -webkit-transform:scale(0.3, 0.3);
            transform:scale(0.3, 0.3);
    opacity:0.9;
  }
  100%{
    -webkit-transform:scale(3, 3);
            transform:scale(3, 3);
    opacity:0;
  }
}
.ranges li.active{
  background:#52616A;
  border-color:#52616A;
}
.ranges li{
  color:#52616A;
}
.ranges li:hover{
  background:#52616A;
  border-color:#52616A;
}
.pulse{
  border-radius:50%;
  height:25px;
  width:25px;
  -webkit-animation:pulse 3s ease-out;
          animation:pulse 3s ease-out;
  -webkit-animation-iteration-count:infinite;
          animation-iteration-count:infinite;
  position:absolute;
  z-index:10;
  opacity:1;
  margin:auto;
}
.trip{
  color:#5496F8;
  border-color:#5496F8 !important;
}
.stop{
  color:#FFBB44;
  border-color:#FFBB44 !important;
}
.no-info{
  color:#FFBB44;
  border-color:#A9BAC4 !important;
}
.ht-faded{
  opacity:0.4;
}
.action{
  position:absolute;
  top:6px;
  padding:3px;
  font-size:19px;
  color:#798E9B;
}
.action-left{
  left:11px;
  font-size:35px;
  color:#A9BAC4;
}
.action-left:hover{
  color:#798E9B;
}
.text-sm{
  font-size:11px;
  color:#52616A;
  padding-bottom:7px;
}
.title{
  font-size:13px;
  font-weight:bold;
}
.activity-card{
  padding:6px 10px;
  color:#52616A;
  -webkit-transition:font-size 0.4s;
  transition:font-size 0.4s;
  font-size:13px;
  position:relative;
  cursor:pointer;
}
.activity-card-selected{
  background:#fff;
}
.activity-card-selected:hover{
  background:#fff;
}
.activity-card .close-card{
  position:absolute;
  top:-3px;
  right:-3px;
  color:#52616A;
  height:14px;
  width:14px;
  border-radius:50%;
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
}
.activity-card .close-card .fa{
  margin:auto;
}
.action-card{
  background:#fff;
  padding:3px 11px;
  border:1px solid #C9D6DE;
  font-size:11px;
  cursor:pointer;
  color:#52616A;
  margin-left:-127px;
  padding-left:134px;
  margin-top:-9px;
  min-height:50px;
  -webkit-box-shadow:1px 2px 2px 0px rgba(0, 0, 0, 0.07);
          box-shadow:1px 2px 2px 0px rgba(0, 0, 0, 0.07);
}
.action-card:hover{
  border:1px solid #798E9B;
}
.action-card-active{
  border:1px solid #798E9B;
}
.trip-border{
  border-color:#5496F8 !important;
  outline-color:#5496F8 !important;
}
.stop-border{
  border-color:#FFBB44 !important;
  outline-color:#FFBB44 !important;
}
.no-info-border{
  border-color:#A9BAC4 !important;
  outline-color:#A9BAC4 !important;
}
.warning-border{
  border-color:#d19191 !important;
  outline-color:#d19191 !important;
}
.trip-bg{
  background:#5496F8;
}
.stop-bg{
  background:#FFBB44;
}
.no-info-bg{
  background:#A9BAC4;
}
.warning-bg{
  background:#d19191;
}
.trip-color{
  color:#5496F8;
}
.stop-color{
  color:#ffb025;
}
.no-info-color{
  color:#A9BAC4;
}
.warning-color{
  color:#d19191;
}
.table{
  margin:7px 0;
  font-size:11px;
}
.activity-stats{
  font-size:12px;
  font-weight:bold;
}
.heatbeat{
  padding-left:12px;
  font-size:13px;
}
`],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
PlacelineComponent.ctorParameters = () => [
    { type: ChangeDetectorRef, },
];
PlacelineComponent.propDecorators = {
    "highlightedSegmentId": [{ type: Output },],
    "hoveredAction": [{ type: Output },],
    "selectedSegment": [{ type: Output },],
    "userData": [{ type: Input },],
    "selectedSegmentId": [{ type: Input },],
    "isMobile": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PlacelineModule {
}
PlacelineModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    SharedModule
                ],
                declarations: [PlacelineComponent],
                exports: [PlacelineComponent]
            },] },
];
/** @nocollapse */
PlacelineModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PlacelineContainerComponent {
    /**
     * @param {?} userClientService
     */
    constructor(userClientService) {
        this.userClientService = userClientService;
        this.showUserCard = true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.selectedSegmentId$ = this.userClientService.placeline.segmentResetId$;
        this.userData$ = this.userClientService.placeline.data$;
        if (this.userId) {
            this.userClientService.placeline.setId(this.userId);
        }
    }
    /**
     * @param {?} segmentId
     * @return {?}
     */
    onHighlightSegment(segmentId) {
        this.userClientService.placeline.setSegmentSelectedId(segmentId);
    }
    /**
     * @param {?} segmentId
     * @return {?}
     */
    onSelectSegmentId(segmentId) {
        this.userClientService.placeline.setSegmentResetMapId(segmentId);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.userClientService.placeline.setId(null);
        this.userClientService.placeline.clearData();
    }
}
PlacelineContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-placeline-container',
                template: `<div class="flex-column column-gap-10" *ngIf="userData$ | async as userData; else loading">
  <ht-user-card *ngIf="showUserCard" [user]="userData"></ht-user-card>
  <ht-placeline [selectedSegmentId]="selectedSegmentId$ | async" (selectedSegment)="onSelectSegmentId($event)" (highlightedSegmentId)="onHighlightSegment($event)" [userData]="userData"></ht-placeline>
</div>
<ng-template #loading>
  <ht-loading-dots class="text-1 text-center flex-row"></ht-loading-dots>
</ng-template>
`,
                styles: [`.text-center{
  text-align:center;
}
.text-muted{
  color:#798E9B;
}
.text-right{
  text-align:right;
}
.text-left{
  text-align:left;
}
.text-1{
  font-size:2em;
}
.text-4{
  font-size:0.8em;
}
.text-capitalize{
  text-transform:capitalize;
}
.text-uppercase{
  text-transform:uppercase;
}
.text-ontime{
  color:#58ae5b;
}
.text-late{
  color:#E6413E;
}
.text-warning{
  color:#E6413E !important;
}
.text-red{
  color:#E6413E;
}
.text-blue{
  color:#5496F8;
}
.truncate{
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.flex-row{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:horizontal;
  -webkit-box-direction:normal;
      -ms-flex-direction:row;
          flex-direction:row;
}
.flex-column{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:vertical;
  -webkit-box-direction:normal;
      -ms-flex-direction:column;
          flex-direction:column;
}
.column-gap-4 > :not(:last-child){
  margin-bottom:4px;
}
.row-gap-4 > :not(:last-child){
  margin-right:4px;
}
.column-gap-7 > :not(:last-child){
  margin-bottom:7px;
}
.row-gap-7 > :not(:last-child){
  margin-right:7px;
}
.column-gap-10 > :not(:last-child){
  margin-bottom:10px;
}
.row-gap-10 > :not(:last-child){
  margin-right:10px;
}
.column-gap-20 > :not(:last-child){
  margin-bottom:20px;
}
.row-gap-20 > :not(:last-child){
  margin-right:20px;
}
.wrap{
  -ms-flex-wrap:wrap;
      flex-wrap:wrap;
}
.flex{
  -webkit-box-flex:1;
      -ms-flex:1;
          flex:1;
}
.auto{
  margin:auto;
}
.relative{
  position:relative;
}
.space-between{
  -webkit-box-pack:justify;
      -ms-flex-pack:justify;
          justify-content:space-between;
}
.space-around{
  -ms-flex-pack:distribute;
      justify-content:space-around;
}
.justify-center{
  -webkit-box-pack:center;
      -ms-flex-pack:center;
          justify-content:center;
}
.flex-center{
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
}
.align-center{
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
}
.clickable{
  cursor:pointer;
}
.round-icon{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  width:23px;
  height:23px;
  background:#315790;
  border-radius:50%;
}
.flex-half{
  -ms-flex-preferred-size:50%;
      flex-basis:50%;
}
.link-unstyled{
  color:inherit;
}
.link-unstyled:hover{
  text-decoration:none;
}
.half{
  width:50%;
}
.noselect{
  -webkit-touch-callout:none;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
.hover-shadow:hover{
  -webkit-box-shadow:0px 0px 4px 2px rgba(0, 0, 0, 0.16);
          box-shadow:0px 0px 4px 2px rgba(0, 0, 0, 0.16);
}
.marker-transparent{
  opacity:0.4;
}
.marker-fade{
  -webkit-filter:contrast(16%) brightness(160%) blur(0.6px);
          filter:contrast(16%) brightness(160%) blur(0.6px);
}
.tooltip-warning{
  background:#e04745;
  color:#fff;
}
.tooltip-warning-arrow{
  border-right-color:#e04745 !important;
}
.tooltip-info{
  background:#5496F8;
  color:#fff;
}
.tooltip-info-arrow{
  border-right-color:#5496F8 !important;
}
a{
  color:inherit;
  text-decoration:none;
}
a:hover{
  color:inherit;
  text-decoration:none;
}
a:active{
  color:inherit;
  text-decoration:none;
}
a:focus{
  outline:none;
  color:inherit;
  text-decoration:none;
}
.spinner-wave{
  margin:0 auto;
  width:100px;
  height:20px;
  text-align:center;
}
.spinner-wave > div{
  background-color:#5496F8;
  height:100%;
  width:6px;
  display:inline-block;
  -webkit-animation:wave 1.2s infinite ease-in-out;
  animation:wave 1.2s infinite ease-in-out;
}
.spinner-wave div:nth-child(2){
  -webkit-animation-delay:-1.1s;
  animation-delay:-1.1s;
}
.spinner-wave div:nth-child(3){
  -webkit-animation-delay:-1s;
  animation-delay:-1s;
}
.spinner-wave div:nth-child(4){
  -webkit-animation-delay:-0.9s;
  animation-delay:-0.9s;
}
.spinner-wave div:nth-child(5){
  -webkit-animation-delay:-0.8s;
  animation-delay:-0.8s;
}
@-webkit-keyframes wave{
  0%,
  40%,
  100%{
    -webkit-transform:scaleY(0.4);
  }
  20%{
    -webkit-transform:scaleY(1);
  }
}
@keyframes wave{
  0%,
  40%,
  100%{
    -webkit-transform:scaleY(0.4);
            transform:scaleY(0.4);
  }
  20%{
    -webkit-transform:scaleY(1);
            transform:scaleY(1);
  }
}
@media screen and (max-width: 480px){
  .hide-xs{
    display:none !important;
  }
}
@media screen and (min-width: 480px){
  .show-xs{
    display:none !important;
  }
}
.ht-btn{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
  padding:5px 13px;
  border:0;
  background:#ffffff;
  color:#52616A;
  -webkit-box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
          box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.ht-btn:focus{
  background:#fcfcfc;
  outline:0;
}
.ht-btn-card:hover{
  background:#5496F8;
  color:rgba(255, 255, 255, 0.96);
  -webkit-box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
          box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.stopped-color{
  color:#FFBB44;
}
.drive-color{
  color:#5496F8;
}
.walk-color{
  color:#5496F8;
}
.moving-color{
  color:#5496F8;
}
.logged_off-color{
  color:#A9BAC4;
}
.network_offline-color{
  color:#d19191;
}
.location_disabled-color{
  color:#d19191;
}
.location_low_accuracy-color{
  color:#d19191;
}
.stopped-bg{
  background:#FFBB44;
}
.drive-bg{
  background:#5496F8;
}
.walk-bg{
  background:#5496F8;
}
.moving-bg{
  background:#5496F8;
}
.logged_off-bg{
  background:#A9BAC4;
}
.network_offline-bg{
  background:#d19191;
}
.location_disabled-bg{
  background-color:#d19191;
}
.location_low_accuracy-bg{
  background-color:#d19191;
}
:host{
  max-width:500px;
}
ht-loading-dots{
  width:100%;
  margin-top:20%;
}
`],
            },] },
];
/** @nocollapse */
PlacelineContainerComponent.ctorParameters = () => [
    { type: HtUsersService, },
];
PlacelineContainerComponent.propDecorators = {
    "userId": [{ type: Input },],
    "showUserCard": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PlacelineContainerModule {
}
PlacelineContainerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    PlacelineModule,
                    UserCardModule,
                    SharedModule
                ],
                declarations: [PlacelineContainerComponent],
                exports: [PlacelineContainerComponent]
            },] },
];
/** @nocollapse */
PlacelineContainerModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UsersSummaryContainerComponent {
    /**
     * @param {?} usersClientService
     */
    constructor(usersClientService) {
        this.usersClientService = usersClientService;
        this.hideTotal = false;
        this.selectable = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.usersClientService.summary.setActive();
        this.summary$ = this.usersClientService.listStatusChart$(this.queryLabels);
        // this.summary$ = this.usersClientService.summary.data$
    }
    /**
     * @param {?} key
     * @return {?}
     */
    onClearQueryKey(key) {
        this.usersClientService.list.clearQueryKey(key);
    }
    /**
     * @param {?} query
     * @return {?}
     */
    setQuery(query$$1) {
        this.usersClientService.list.setQueryReset(query$$1);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.usersClientService.summary.clearData();
    }
}
UsersSummaryContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-users-summary-container',
                template: `<div [@summaryAnim] *ngIf="summary$ | async as summary">
  <ht-users-summary
    [hideTotal]="hideTotal"
    (clearQueryKey)="onClearQueryKey($event)"
    (setQuery)="setQuery($event)"
    [selectable]="selectable"
    [summary]="summary"></ht-users-summary>
</div>
`,
                styles: [`ht-users-summary{
  padding:10px 20px;
}
`],
                animations: [
                    trigger('summaryAnim', [
                        transition(':enter', [
                            style({ transform: 'translateX(-100px) scaleY(0)', height: 0, opacity: 0 }),
                            animate('0.3s' + ' ease-out')
                        ]),
                        transition(':leave', [
                            animate('0.3s' + ' ease-in', style({ transform: 'translateX(-100px)', height: 0, opacity: 0 }))
                        ])
                    ])
                ]
            },] },
];
/** @nocollapse */
UsersSummaryContainerComponent.ctorParameters = () => [
    { type: HtUsersService, },
];
UsersSummaryContainerComponent.propDecorators = {
    "queryLabels": [{ type: Input },],
    "hideTotal": [{ type: Input },],
    "selectable": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UsersSummaryComponent {
    constructor() {
        this.setQuery = new EventEmitter();
        this.clearQueryKey = new EventEmitter();
        this.selectable = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} query
     * @return {?}
     */
    onHoverQuery(query$$1) {
        this.hoveredQuery = query$$1.label;
    }
    /**
     * @return {?}
     */
    onHoveroutQuery() {
        this.hoveredQuery = "";
    }
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    indexId(index, item) {
        return item.label;
    }
    /**
     * @param {?} datum
     * @return {?}
     */
    setFilter(datum) {
        const /** @type {?} */ query$$1 = { status: datum.values.toString() };
        this.setQuery.next(query$$1);
    }
    /**
     * @param {?} datum
     * @return {?}
     */
    clearFilter(datum) {
        this.clearQueryKey.next('status');
    }
    /**
     * @param {?} datum
     * @return {?}
     */
    selectLabel(datum) {
        if (!this.selectable)
            return false;
        if (datum.selected) {
            this.clearFilter(datum);
        }
        else {
            this.setFilter(datum);
        }
    }
}
UsersSummaryComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-users-summary',
                template: `<div class="flex-column justify-center label-container has-text-grey">
  <div *ngIf="!hideTotal" class="count text-center">{{summary.totalUsers}} {{'user' | pluralize: summary.totalUsers}}</div>
  <div class="flex-row" *ngIf="summary.totalUsers">
    <ng-container *ngFor="let datum of summary.chart; trackBy:indexId; let i = index">
      <div
        class="bar"
        [style.flex-basis.%]="datum.value/summary.totalUsers * 100"
        [style.background-color]="datum.color"
        [class.faded]="hoveredQuery && hoveredQuery !== datum.label"
        [class.bar-selected]="hoveredQuery && hoveredQuery === datum.label"
      *ngIf="datum.value"></div>
    </ng-container>
  </div>
  <div *ngIf="summary.totalUsers == 0" class="bar" style="width: 100%; background: #ccc"></div>
  <div class="flex-row row-gap-4">
    <!--<div class="box" [style.background-color]="datum.color"></div>-->
    <div
      class="graph-label flex-column"
      [class.graph-active]="datum.selected"
      [class.graph-label-selectable]="selectable"
      (click)="selectLabel(datum)"
      (mouseenter)="onHoverQuery(datum)"
      (mouseleave)="onHoveroutQuery()"
      *ngFor="let datum of summary.chart; trackBy:indexId; let i = index">
      <strong class="text-center is-size-4" [style.color]="datum.color">
        {{datum.value}}
      </strong>
      <span class="text-center">{{datum.label}}</span>
    </div>
    <!--<div class="box" style="background-color: #ccc;"></div>-->
  </div>
</div>
<!--{{summary | json}}-->
`,
                styles: [`.text-center{
  text-align:center;
}
.text-muted{
  color:#798E9B;
}
.text-right{
  text-align:right;
}
.text-left{
  text-align:left;
}
.text-1{
  font-size:2em;
}
.text-4{
  font-size:0.8em;
}
.text-capitalize{
  text-transform:capitalize;
}
.text-uppercase{
  text-transform:uppercase;
}
.text-ontime{
  color:#58ae5b;
}
.text-late{
  color:#E6413E;
}
.text-warning{
  color:#E6413E !important;
}
.text-red{
  color:#E6413E;
}
.text-blue{
  color:#5496F8;
}
.truncate{
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.flex-row{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:horizontal;
  -webkit-box-direction:normal;
      -ms-flex-direction:row;
          flex-direction:row;
}
.flex-column{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:vertical;
  -webkit-box-direction:normal;
      -ms-flex-direction:column;
          flex-direction:column;
}
.column-gap-4 > :not(:last-child){
  margin-bottom:4px;
}
.row-gap-4 > :not(:last-child){
  margin-right:4px;
}
.column-gap-7 > :not(:last-child){
  margin-bottom:7px;
}
.row-gap-7 > :not(:last-child){
  margin-right:7px;
}
.column-gap-10 > :not(:last-child){
  margin-bottom:10px;
}
.row-gap-10 > :not(:last-child){
  margin-right:10px;
}
.column-gap-20 > :not(:last-child){
  margin-bottom:20px;
}
.row-gap-20 > :not(:last-child){
  margin-right:20px;
}
.wrap{
  -ms-flex-wrap:wrap;
      flex-wrap:wrap;
}
.flex{
  -webkit-box-flex:1;
      -ms-flex:1;
          flex:1;
}
.auto{
  margin:auto;
}
.relative{
  position:relative;
}
.space-between{
  -webkit-box-pack:justify;
      -ms-flex-pack:justify;
          justify-content:space-between;
}
.space-around{
  -ms-flex-pack:distribute;
      justify-content:space-around;
}
.justify-center{
  -webkit-box-pack:center;
      -ms-flex-pack:center;
          justify-content:center;
}
.flex-center{
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
}
.align-center{
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
}
.clickable{
  cursor:pointer;
}
.round-icon{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  width:23px;
  height:23px;
  background:#315790;
  border-radius:50%;
}
.flex-half{
  -ms-flex-preferred-size:50%;
      flex-basis:50%;
}
.link-unstyled{
  color:inherit;
}
.link-unstyled:hover{
  text-decoration:none;
}
.half{
  width:50%;
}
.noselect{
  -webkit-touch-callout:none;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
.hover-shadow:hover{
  -webkit-box-shadow:0px 0px 4px 2px rgba(0, 0, 0, 0.16);
          box-shadow:0px 0px 4px 2px rgba(0, 0, 0, 0.16);
}
.marker-transparent{
  opacity:0.4;
}
.marker-fade{
  -webkit-filter:contrast(16%) brightness(160%) blur(0.6px);
          filter:contrast(16%) brightness(160%) blur(0.6px);
}
.tooltip-warning{
  background:#e04745;
  color:#fff;
}
.tooltip-warning-arrow{
  border-right-color:#e04745 !important;
}
.tooltip-info{
  background:#5496F8;
  color:#fff;
}
.tooltip-info-arrow{
  border-right-color:#5496F8 !important;
}
a{
  color:inherit;
  text-decoration:none;
}
a:hover{
  color:inherit;
  text-decoration:none;
}
a:active{
  color:inherit;
  text-decoration:none;
}
a:focus{
  outline:none;
  color:inherit;
  text-decoration:none;
}
.spinner-wave{
  margin:0 auto;
  width:100px;
  height:20px;
  text-align:center;
}
.spinner-wave > div{
  background-color:#5496F8;
  height:100%;
  width:6px;
  display:inline-block;
  -webkit-animation:wave 1.2s infinite ease-in-out;
  animation:wave 1.2s infinite ease-in-out;
}
.spinner-wave div:nth-child(2){
  -webkit-animation-delay:-1.1s;
  animation-delay:-1.1s;
}
.spinner-wave div:nth-child(3){
  -webkit-animation-delay:-1s;
  animation-delay:-1s;
}
.spinner-wave div:nth-child(4){
  -webkit-animation-delay:-0.9s;
  animation-delay:-0.9s;
}
.spinner-wave div:nth-child(5){
  -webkit-animation-delay:-0.8s;
  animation-delay:-0.8s;
}
@-webkit-keyframes wave{
  0%,
  40%,
  100%{
    -webkit-transform:scaleY(0.4);
  }
  20%{
    -webkit-transform:scaleY(1);
  }
}
@keyframes wave{
  0%,
  40%,
  100%{
    -webkit-transform:scaleY(0.4);
            transform:scaleY(0.4);
  }
  20%{
    -webkit-transform:scaleY(1);
            transform:scaleY(1);
  }
}
@media screen and (max-width: 480px){
  .hide-xs{
    display:none !important;
  }
}
@media screen and (min-width: 480px){
  .show-xs{
    display:none !important;
  }
}
.ht-btn{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
  padding:5px 13px;
  border:0;
  background:#ffffff;
  color:#52616A;
  -webkit-box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
          box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.ht-btn:focus{
  background:#fcfcfc;
  outline:0;
}
.ht-btn-card:hover{
  background:#5496F8;
  color:rgba(255, 255, 255, 0.96);
  -webkit-box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
          box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.stopped-color{
  color:#FFBB44;
}
.drive-color{
  color:#5496F8;
}
.walk-color{
  color:#5496F8;
}
.moving-color{
  color:#5496F8;
}
.logged_off-color{
  color:#A9BAC4;
}
.network_offline-color{
  color:#d19191;
}
.location_disabled-color{
  color:#d19191;
}
.location_low_accuracy-color{
  color:#d19191;
}
.stopped-bg{
  background:#FFBB44;
}
.drive-bg{
  background:#5496F8;
}
.walk-bg{
  background:#5496F8;
}
.moving-bg{
  background:#5496F8;
}
.logged_off-bg{
  background:#A9BAC4;
}
.network_offline-bg{
  background:#d19191;
}
.location_disabled-bg{
  background-color:#d19191;
}
.location_low_accuracy-bg{
  background-color:#d19191;
}
.ht-box{
  height:20px;
  min-width:20px;
  border-radius:50%;
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  color:white;
  text-shadow:0px 0.5px 1px #ffffff;
  font-weight:bold;
}
.label-container{
  min-width:170px;
}
.graph-label{
  -webkit-transition:color 0.2s;
  transition:color 0.2s;
  padding:1px 5px;
  color:#52616A;
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
  border-radius:4px;
  font-size:14px;
  margin-top:5px;
}
.graph-label:hover{
  outline:1px solid #d6d6d6;
}
.graph-label-selectable{
  cursor:pointer;
}
.bar{
  height:10px;
  -webkit-transition:width 1s ease-in-out;
  transition:width 1s ease-in-out;
  -webkit-transition:opacity 0.3s ease-in-out;
  transition:opacity 0.3s ease-in-out;
  float:right;
}
.bar:first-child{
  border-bottom-left-radius:3px;
  border-top-left-radius:3px;
}
.bar:last-child{
  border-bottom-right-radius:3px;
  border-top-right-radius:3px;
}
.graph-active{
  background:#e2e2e2;
}
.count{
  font-size:21px;
  color:#52616A;
  padding-bottom:18px;
}
:host{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:vertical;
  -webkit-box-direction:normal;
      -ms-flex-direction:column;
          flex-direction:column;
}
.faded{
  opacity:0.4;
}
.bar-selected{
  outline:1px solid;
}
`]
            },] },
];
/** @nocollapse */
UsersSummaryComponent.ctorParameters = () => [];
UsersSummaryComponent.propDecorators = {
    "setQuery": [{ type: Output },],
    "clearQueryKey": [{ type: Output },],
    "summary": [{ type: Input },],
    "hideTotal": [{ type: Input },],
    "selectable": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UsersSummaryModule {
}
UsersSummaryModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    SharedModule
                ],
                declarations: [UsersSummaryComponent],
                exports: [UsersSummaryComponent]
            },] },
];
/** @nocollapse */
UsersSummaryModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UsersSummaryContainerModule {
}
UsersSummaryContainerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    UsersSummaryModule
                ],
                declarations: [UsersSummaryContainerComponent],
                exports: [UsersSummaryContainerComponent]
            },] },
];
/** @nocollapse */
UsersSummaryContainerModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PaginationComponent {
    constructor() {
        this.pageSize = 10;
        this.fetchPage = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    get currentPage() {
        const /** @type {?} */ preUrl = this.pageDate.previous;
        let /** @type {?} */ page = 1;
        if (preUrl) {
            const /** @type {?} */ prevPage = GetUrlParam('page', this.pageDate.previous) || 1;
            // console.log(prevPage);
            page = +prevPage + 1;
        }
        return page;
    }
    /**
     * @return {?}
     */
    get pagesCount() {
        const /** @type {?} */ count = this.pageDate.count;
        // let rem = count % this.pageSize;
        return Math.ceil(count / this.pageSize);
    }
    /**
     * @return {?}
     */
    get visiblePages() {
        return Array(this.pagesCount).fill(1).map((n, i) => n + i).filter((i) => {
            if (this.currentPage === 1) {
                return (this.currentPage - i >= -2);
            }
            else if (this.currentPage + 1 === i) {
                return true;
            }
            else if (this.currentPage + 2 === i) {
                return true;
            }
            else if (this.currentPage === i) {
                return true;
            }
            else if (this.currentPage === this.pagesCount) {
                return (this.currentPage - i <= 2);
            }
            return false;
        });
    }
    /**
     * @param {?} pageNumber
     * @return {?}
     */
    onFetchPage(pageNumber) {
        // console.log(pageNumber);
        if (pageNumber < 1 || pageNumber > this.pagesCount)
            return;
        this.fetchPage.next(pageNumber);
        // this.fetchPage.emit(pageNumber);
        // this.currentPage = pageNumber;
        // this.hasNextPage = (this.currentPage < this.numberOfPages);
        // this.hasPreviousPage = (this.currentPage > 1);
        // this.pages = this.getVisiblePages();
    }
}
PaginationComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-pagination',
                template: `<!--<p>-->
  <!--pagination works!-->
<!--</p>-->
<!--<p>Count: {{pageDate.count}}</p>-->
<!--<p>Page: {{currentPage}}</p>-->
<!--<p>Pages: {{pagesCount}}</p>-->
<!--<div class="pagination-container columns" *ngIf="pagesCount > 1">-->
  <!--<div [class.disabled]="!pageDate.previous" (click)="onFetchPage(currentPage - 1)" class="pagination-element">-->
    <!--<i class="fa fa-angle-left" aria-hidden="true"></i>-->
  <!--</div>-->
  <!--<ng-container *ngIf="currentPage - 1 > 1">-->
    <!--<div (click)="onFetchPage(1)" class="">-->
      <!--<span class="pagination-number">1</span>-->
    <!--</div>-->
    <!--<span>&hellip;</span>-->
    <!--&lt;!&ndash;<div>.</div>&ndash;&gt;-->
    <!--&lt;!&ndash;<div>.</div>&ndash;&gt;-->
    <!--&lt;!&ndash;<div>.</div>&ndash;&gt;-->
  <!--</ng-container>-->
  <!--<div (click)="onFetchPage(page)" class="" *ngFor="let page of visiblePages" [ngClass]="currentPage === page ? 'is-current' : ''">-->
    <!--<span class="pagination-number">{{page}}</span>-->
  <!--</div>-->
  <!--<ng-container *ngIf="pagesCount - currentPage > 2">-->
    <!--<span>&hellip;</span>-->
    <!--&lt;!&ndash;<div>.</div>&ndash;&gt;-->
    <!--&lt;!&ndash;<div>.</div>&ndash;&gt;-->
    <!--&lt;!&ndash;<div>.</div>&ndash;&gt;-->
    <!--<div (click)="onFetchPage(pagesCount)" class="">-->
      <!--<span class="pagination-number">{{pagesCount}}</span>-->
    <!--</div>-->
  <!--</ng-container>-->
  <!--&lt;!&ndash;<div [class.disabled]="currentPage == pagesCount" (click)="onFetchPage(pagesCount)" class="pagination-element">&ndash;&gt;-->
  <!--&lt;!&ndash;<i class="fa fa-angle-double-right" aria-hidden="true"></i>&ndash;&gt;-->
  <!--&lt;!&ndash;</div>&ndash;&gt;-->
  <!--<div [attr.disabled]="!pageDate.next" (click)="onFetchPage(currentPage + 1)" class="">-->
    <!--<i class="fa fa-angle-right" aria-hidden="true"></i>-->
  <!--</div>-->
<!--</div>-->
<nav class="pagination is-small is-centered" role="navigation" aria-label="pagination" *ngIf="pagesCount > 1">
  <ul class="pagination-list">
    <li>
      <a class="pagination-link" [attr.disabled]="!pageDate.previous ? true : null"  (click)="onFetchPage(currentPage - 1)" aria-label="Goto page 1">
        <i class="fa fa-angle-left" aria-hidden="true"></i>
      </a>
    </li>
    <ng-container *ngIf="currentPage - 1 > 1">
      <li (click)="onFetchPage(1)" class="">
        <a class="pagination-link">1</a>
      </li>
      <li>
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
    </ng-container>
    <li (click)="onFetchPage(page)" class="" *ngFor="let page of visiblePages">
      <a class="pagination-link" [ngClass]="currentPage === page ? 'is-current' : ''">{{page}}</a>
    </li>
    <ng-container *ngIf="pagesCount - currentPage > 2">
      <li>
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
      <li (click)="onFetchPage(pagesCount)" class="">
        <a class="pagination-link">{{pagesCount}}</a>
      </li>
    </ng-container>
    <li [attr.disabled]="!pageDate.next ? true : null" (click)="onFetchPage(currentPage + 1)" class="">
      <a class="pagination-link">
        <i class="fa fa-angle-right" aria-hidden="true"></i>
      </a>
    </li>
    <!--<li>-->
      <!--<span class="pagination-ellipsis">&hellip;</span>-->
    <!--</li>-->
    <!--<li>-->
      <!--<a class="pagination-link" aria-label="Goto page 45">45</a>-->
    <!--</li>-->
    <!--<li>-->
      <!--<a class="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a>-->
    <!--</li>-->
    <!--<li>-->
      <!--<a class="pagination-link" aria-label="Goto page 47">47</a>-->
    <!--</li>-->
    <!--<li>-->
      <!--<span class="pagination-ellipsis">&hellip;</span>-->
    <!--</li>-->
    <!--<li>-->
      <!--<a class="pagination-link" aria-label="Goto page 86">86</a>-->
    <!--</li>-->
  </ul>
</nav>
`,
                styles: [`.text-center{
  text-align:center;
}
.text-muted{
  color:#798E9B;
}
.text-right{
  text-align:right;
}
.text-left{
  text-align:left;
}
.text-1{
  font-size:2em;
}
.text-4{
  font-size:0.8em;
}
.text-capitalize{
  text-transform:capitalize;
}
.text-uppercase{
  text-transform:uppercase;
}
.text-ontime{
  color:#58ae5b;
}
.text-late{
  color:#E6413E;
}
.text-warning{
  color:#E6413E !important;
}
.text-red{
  color:#E6413E;
}
.text-blue{
  color:#5496F8;
}
.truncate{
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.flex-row{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:horizontal;
  -webkit-box-direction:normal;
      -ms-flex-direction:row;
          flex-direction:row;
}
.flex-column{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:vertical;
  -webkit-box-direction:normal;
      -ms-flex-direction:column;
          flex-direction:column;
}
.column-gap-4 > :not(:last-child){
  margin-bottom:4px;
}
.row-gap-4 > :not(:last-child){
  margin-right:4px;
}
.column-gap-7 > :not(:last-child){
  margin-bottom:7px;
}
.row-gap-7 > :not(:last-child){
  margin-right:7px;
}
.column-gap-10 > :not(:last-child){
  margin-bottom:10px;
}
.row-gap-10 > :not(:last-child){
  margin-right:10px;
}
.column-gap-20 > :not(:last-child){
  margin-bottom:20px;
}
.row-gap-20 > :not(:last-child){
  margin-right:20px;
}
.wrap{
  -ms-flex-wrap:wrap;
      flex-wrap:wrap;
}
.flex{
  -webkit-box-flex:1;
      -ms-flex:1;
          flex:1;
}
.auto{
  margin:auto;
}
.relative{
  position:relative;
}
.space-between{
  -webkit-box-pack:justify;
      -ms-flex-pack:justify;
          justify-content:space-between;
}
.space-around{
  -ms-flex-pack:distribute;
      justify-content:space-around;
}
.justify-center{
  -webkit-box-pack:center;
      -ms-flex-pack:center;
          justify-content:center;
}
.flex-center{
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
}
.align-center{
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
}
.clickable{
  cursor:pointer;
}
.round-icon{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  width:23px;
  height:23px;
  background:#315790;
  border-radius:50%;
}
.flex-half{
  -ms-flex-preferred-size:50%;
      flex-basis:50%;
}
.link-unstyled{
  color:inherit;
}
.link-unstyled:hover{
  text-decoration:none;
}
.half{
  width:50%;
}
.noselect{
  -webkit-touch-callout:none;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
.hover-shadow:hover{
  -webkit-box-shadow:0px 0px 4px 2px rgba(0, 0, 0, 0.16);
          box-shadow:0px 0px 4px 2px rgba(0, 0, 0, 0.16);
}
.marker-transparent{
  opacity:0.4;
}
.marker-fade{
  -webkit-filter:contrast(16%) brightness(160%) blur(0.6px);
          filter:contrast(16%) brightness(160%) blur(0.6px);
}
.tooltip-warning{
  background:#e04745;
  color:#fff;
}
.tooltip-warning-arrow{
  border-right-color:#e04745 !important;
}
.tooltip-info{
  background:#5496F8;
  color:#fff;
}
.tooltip-info-arrow{
  border-right-color:#5496F8 !important;
}
a{
  color:inherit;
  text-decoration:none;
}
a:hover{
  color:inherit;
  text-decoration:none;
}
a:active{
  color:inherit;
  text-decoration:none;
}
a:focus{
  outline:none;
  color:inherit;
  text-decoration:none;
}
.spinner-wave{
  margin:0 auto;
  width:100px;
  height:20px;
  text-align:center;
}
.spinner-wave > div{
  background-color:#5496F8;
  height:100%;
  width:6px;
  display:inline-block;
  -webkit-animation:wave 1.2s infinite ease-in-out;
  animation:wave 1.2s infinite ease-in-out;
}
.spinner-wave div:nth-child(2){
  -webkit-animation-delay:-1.1s;
  animation-delay:-1.1s;
}
.spinner-wave div:nth-child(3){
  -webkit-animation-delay:-1s;
  animation-delay:-1s;
}
.spinner-wave div:nth-child(4){
  -webkit-animation-delay:-0.9s;
  animation-delay:-0.9s;
}
.spinner-wave div:nth-child(5){
  -webkit-animation-delay:-0.8s;
  animation-delay:-0.8s;
}
@-webkit-keyframes wave{
  0%,
  40%,
  100%{
    -webkit-transform:scaleY(0.4);
  }
  20%{
    -webkit-transform:scaleY(1);
  }
}
@keyframes wave{
  0%,
  40%,
  100%{
    -webkit-transform:scaleY(0.4);
            transform:scaleY(0.4);
  }
  20%{
    -webkit-transform:scaleY(1);
            transform:scaleY(1);
  }
}
@media screen and (max-width: 480px){
  .hide-xs{
    display:none !important;
  }
}
@media screen and (min-width: 480px){
  .show-xs{
    display:none !important;
  }
}
.ht-btn{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
  padding:5px 13px;
  border:0;
  background:#ffffff;
  color:#52616A;
  -webkit-box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
          box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.ht-btn:focus{
  background:#fcfcfc;
  outline:0;
}
.ht-btn-card:hover{
  background:#5496F8;
  color:rgba(255, 255, 255, 0.96);
  -webkit-box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
          box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.stopped-color{
  color:#FFBB44;
}
.drive-color{
  color:#5496F8;
}
.walk-color{
  color:#5496F8;
}
.moving-color{
  color:#5496F8;
}
.logged_off-color{
  color:#A9BAC4;
}
.network_offline-color{
  color:#d19191;
}
.location_disabled-color{
  color:#d19191;
}
.location_low_accuracy-color{
  color:#d19191;
}
.stopped-bg{
  background:#FFBB44;
}
.drive-bg{
  background:#5496F8;
}
.walk-bg{
  background:#5496F8;
}
.moving-bg{
  background:#5496F8;
}
.logged_off-bg{
  background:#A9BAC4;
}
.network_offline-bg{
  background:#d19191;
}
.location_disabled-bg{
  background-color:#d19191;
}
.location_low_accuracy-bg{
  background-color:#d19191;
}
.pagination{
  padding:20px 0;
  width:100%;
}
.pagination-container{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  padding:30px 10px;
}
.pagination-container > :not(:last-child){
  margin-right:7px;
}
.pagination-element{
  border:1px solid #D9D9D9;
  width:28px;
  height:28px;
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-pack:center;
      -ms-flex-pack:center;
          justify-content:center;
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
  background:white;
  border-radius:3px;
  cursor:pointer;
  color:#666666;
}
.pagination-element.disabled{
  cursor:not-allowed;
  pointer-events:none;
}
.pagination-element.disabled i{
  color:#CCCCCC;
}
.pagination-element i{
  color:#666666;
}
.pagination-element .pagination-number{
  font-size:12px;
  color:#666666;
  line-height:18px;
}
.pagination-element.selected{
  background:#108EE9;
}
.pagination-element.selected .pagination-number{
  color:#ffffff;
}
.disabled{
  cursor:not-allowed;
  pointer-events:none;
  color:#CCCCCC;
}
.fa{
  font-size:1.3em;
}
`],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
PaginationComponent.ctorParameters = () => [];
PaginationComponent.propDecorators = {
    "pageDate": [{ type: Input },],
    "pageSize": [{ type: Input },],
    "fetchPage": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PaginationModule {
}
PaginationModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [PaginationComponent],
                exports: [PaginationComponent]
            },] },
];
/** @nocollapse */
PaginationModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UsersContainerModule {
}
UsersContainerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    UsersModule,
                    PlacelineModule,
                    PlacelineContainerModule,
                    SharedModule,
                    UsersSummaryContainerModule,
                    PaginationModule
                ],
                declarations: [UsersContainerComponent],
                exports: [UsersContainerComponent]
            },] },
];
/** @nocollapse */
UsersContainerModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class GroupsComponent {
    constructor() {
        this.groupIdParam = 'id';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
GroupsComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-groups',
                template: `<div class="card-stack">
  <a [routerLink]="['/groups', group[groupIdParam]]" class="card" *ngFor="let group of groups">
    <div class="card-content-mid">
      {{group.name}}
    </div>
  </a>
</div>
`,
                styles: [`.text-center{
  text-align:center;
}
.text-muted{
  color:#798E9B;
}
.text-right{
  text-align:right;
}
.text-left{
  text-align:left;
}
.text-1{
  font-size:2em;
}
.text-4{
  font-size:0.8em;
}
.text-capitalize{
  text-transform:capitalize;
}
.text-uppercase{
  text-transform:uppercase;
}
.text-ontime{
  color:#58ae5b;
}
.text-late{
  color:#E6413E;
}
.text-warning{
  color:#E6413E !important;
}
.text-red{
  color:#E6413E;
}
.text-blue{
  color:#5496F8;
}
.truncate{
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.flex-row{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:horizontal;
  -webkit-box-direction:normal;
      -ms-flex-direction:row;
          flex-direction:row;
}
.flex-column{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:vertical;
  -webkit-box-direction:normal;
      -ms-flex-direction:column;
          flex-direction:column;
}
.column-gap-4 > :not(:last-child){
  margin-bottom:4px;
}
.row-gap-4 > :not(:last-child){
  margin-right:4px;
}
.column-gap-7 > :not(:last-child){
  margin-bottom:7px;
}
.row-gap-7 > :not(:last-child){
  margin-right:7px;
}
.column-gap-10 > :not(:last-child){
  margin-bottom:10px;
}
.row-gap-10 > :not(:last-child){
  margin-right:10px;
}
.column-gap-20 > :not(:last-child){
  margin-bottom:20px;
}
.row-gap-20 > :not(:last-child){
  margin-right:20px;
}
.wrap{
  -ms-flex-wrap:wrap;
      flex-wrap:wrap;
}
.flex{
  -webkit-box-flex:1;
      -ms-flex:1;
          flex:1;
}
.auto{
  margin:auto;
}
.relative{
  position:relative;
}
.space-between{
  -webkit-box-pack:justify;
      -ms-flex-pack:justify;
          justify-content:space-between;
}
.space-around{
  -ms-flex-pack:distribute;
      justify-content:space-around;
}
.justify-center{
  -webkit-box-pack:center;
      -ms-flex-pack:center;
          justify-content:center;
}
.flex-center{
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
}
.align-center{
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
}
.clickable{
  cursor:pointer;
}
.round-icon{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  width:23px;
  height:23px;
  background:#315790;
  border-radius:50%;
}
.flex-half{
  -ms-flex-preferred-size:50%;
      flex-basis:50%;
}
.link-unstyled{
  color:inherit;
}
.link-unstyled:hover{
  text-decoration:none;
}
.half{
  width:50%;
}
.noselect{
  -webkit-touch-callout:none;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
.hover-shadow:hover{
  -webkit-box-shadow:0px 0px 4px 2px rgba(0, 0, 0, 0.16);
          box-shadow:0px 0px 4px 2px rgba(0, 0, 0, 0.16);
}
.marker-transparent{
  opacity:0.4;
}
.marker-fade{
  -webkit-filter:contrast(16%) brightness(160%) blur(0.6px);
          filter:contrast(16%) brightness(160%) blur(0.6px);
}
.tooltip-warning{
  background:#e04745;
  color:#fff;
}
.tooltip-warning-arrow{
  border-right-color:#e04745 !important;
}
.tooltip-info{
  background:#5496F8;
  color:#fff;
}
.tooltip-info-arrow{
  border-right-color:#5496F8 !important;
}
a{
  color:inherit;
  text-decoration:none;
}
a:hover{
  color:inherit;
  text-decoration:none;
}
a:active{
  color:inherit;
  text-decoration:none;
}
a:focus{
  outline:none;
  color:inherit;
  text-decoration:none;
}
.spinner-wave{
  margin:0 auto;
  width:100px;
  height:20px;
  text-align:center;
}
.spinner-wave > div{
  background-color:#5496F8;
  height:100%;
  width:6px;
  display:inline-block;
  -webkit-animation:wave 1.2s infinite ease-in-out;
  animation:wave 1.2s infinite ease-in-out;
}
.spinner-wave div:nth-child(2){
  -webkit-animation-delay:-1.1s;
  animation-delay:-1.1s;
}
.spinner-wave div:nth-child(3){
  -webkit-animation-delay:-1s;
  animation-delay:-1s;
}
.spinner-wave div:nth-child(4){
  -webkit-animation-delay:-0.9s;
  animation-delay:-0.9s;
}
.spinner-wave div:nth-child(5){
  -webkit-animation-delay:-0.8s;
  animation-delay:-0.8s;
}
@-webkit-keyframes wave{
  0%,
  40%,
  100%{
    -webkit-transform:scaleY(0.4);
  }
  20%{
    -webkit-transform:scaleY(1);
  }
}
@keyframes wave{
  0%,
  40%,
  100%{
    -webkit-transform:scaleY(0.4);
            transform:scaleY(0.4);
  }
  20%{
    -webkit-transform:scaleY(1);
            transform:scaleY(1);
  }
}
@media screen and (max-width: 480px){
  .hide-xs{
    display:none !important;
  }
}
@media screen and (min-width: 480px){
  .show-xs{
    display:none !important;
  }
}
.ht-btn{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
  padding:5px 13px;
  border:0;
  background:#ffffff;
  color:#52616A;
  -webkit-box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
          box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.ht-btn:focus{
  background:#fcfcfc;
  outline:0;
}
.ht-btn-card:hover{
  background:#5496F8;
  color:rgba(255, 255, 255, 0.96);
  -webkit-box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
          box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.stopped-color{
  color:#FFBB44;
}
.drive-color{
  color:#5496F8;
}
.walk-color{
  color:#5496F8;
}
.moving-color{
  color:#5496F8;
}
.logged_off-color{
  color:#A9BAC4;
}
.network_offline-color{
  color:#d19191;
}
.location_disabled-color{
  color:#d19191;
}
.location_low_accuracy-color{
  color:#d19191;
}
.stopped-bg{
  background:#FFBB44;
}
.drive-bg{
  background:#5496F8;
}
.walk-bg{
  background:#5496F8;
}
.moving-bg{
  background:#5496F8;
}
.logged_off-bg{
  background:#A9BAC4;
}
.network_offline-bg{
  background:#d19191;
}
.location_disabled-bg{
  background-color:#d19191;
}
.location_low_accuracy-bg{
  background-color:#d19191;
}
.card-stack{
  max-width:500px;
  margin:auto;
}
`]
            },] },
];
/** @nocollapse */
GroupsComponent.ctorParameters = () => [];
GroupsComponent.propDecorators = {
    "groups": [{ type: Input },],
    "groupIdParam": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class GroupsModule {
}
GroupsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    RouterModule
                ],
                declarations: [GroupsComponent],
                exports: [GroupsComponent]
            },] },
];
/** @nocollapse */
GroupsModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class HtGroupsService extends HtGroupsClient {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class GroupsContainerComponent {
    /**
     * @param {?} groupsClient
     */
    constructor(groupsClient) {
        this.groupsClient = groupsClient;
        this.groupIdParam = 'id';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.groupsClient.list.setActive();
        this.groups$ = this.groupsClient.list.dataArray$;
        // this.clientService.groups.list.setOptions({query: {}});
        // this.clientService.groups.list.initListener();
        // this.groups$ = this.clientService.groups.list.dataArray$.map((groups) => {
        //   return _.filter(groups, (group: IGroup) => !!group[this.groupIdParam])
        // })
    }
}
GroupsContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-groups-container',
                template: `<div class="container" *ngIf="groups$ | async as groups">
  <ht-groups [groupIdParam]="groupIdParam" [groups]="groups"></ht-groups>
</div>
`,
                styles: [`.container{
  width:100%;
}
`]
            },] },
];
/** @nocollapse */
GroupsContainerComponent.ctorParameters = () => [
    { type: HtGroupsService, },
];
GroupsContainerComponent.propDecorators = {
    "groupIdParam": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class GroupsContainerModule {
}
GroupsContainerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    GroupsModule
                ],
                declarations: [GroupsContainerComponent],
                exports: [GroupsContainerComponent]
            },] },
];
/** @nocollapse */
GroupsContainerModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class GroupsChartService {
    /**
     * @param {?} groupsService
     */
    constructor(groupsService) {
        this.groupsService = groupsService;
        this.selectedGroups$ = new BehaviorSubject([]);
        this.groupsLevelsEntity$ = new BehaviorSubject({});
        this.setGroupsLevels();
        this.groupsLevels$ = combineLatest(this.selectedGroups$, this.groupsLevelsEntity$, (selectedGroups, groupslevelsEntity) => {
            return selectedGroups.map((group) => {
                const /** @type {?} */ id = group ? group.id : null;
                return groupslevelsEntity[id] ? groupslevelsEntity[id] : null;
            });
        });
    }
    /**
     * @param {?} groupId
     * @return {?}
     */
    setRootGroupId(groupId) {
        this.selectedGroups$.pipe(take(1), filter(groups => {
            const /** @type {?} */ id = groups[0] ? groups[0].id : null;
            return id !== groupId || (groupId == null && !groups.length);
        }), switchMap(() => {
            return groupId ? this.groupsService.item.api$(groupId) : of(null);
        })).subscribe((group) => {
            this.setSelectedGroup(group, 0);
        });
    }
    ;
    /**
     * @param {?} group
     * @param {?} level
     * @return {?}
     */
    setSelectedGroup(group, level) {
        this.selectedGroups$.asObservable().pipe(take(1), map$1((selectedGroups) => {
            selectedGroups.splice(level);
            selectedGroups.push(group);
            return selectedGroups;
        })).subscribe((selectedGroups) => {
            this.selectedGroups$.next(selectedGroups);
        });
    }
    ;
    /**
     * @return {?}
     */
    setGroupsLevels() {
        if (this.groupsSub)
            return false;
        this.groupsSub = this.selectedGroups$.pipe(filter(data => !!data.length), withLatestFrom(this.groupsLevelsEntity$), switchMap(([selectedGroups, groupsLevels]) => {
            const /** @type {?} */ level = selectedGroups.length;
            const /** @type {?} */ lastId = selectedGroups[level - 1] ? selectedGroups[level - 1].id : null;
            // groupsLevels.splice(length);
            groupsLevels = selectedGroups.reduce((acc, group) => {
                const /** @type {?} */ groupId = group ? group.id : null;
                return groupsLevels[groupId] ? Object.assign({}, acc, { [groupId]: groupsLevels[groupId] }) : acc;
            }, {});
            if (groupsLevels[lastId]) {
                return of(groupsLevels);
            }
            else {
                return this.getGroups(lastId).pipe(map$1((groupsPage) => {
                    return Object.assign({}, groupsLevels, { [lastId]: groupsPage.results });
                }));
            }
            // return of(groupsLevels)
        })).subscribe((data) => {
            this.groupsLevelsEntity$.next(data);
        });
    }
    ;
    /**
     * @param {?} parentId
     * @return {?}
     */
    getGroups(parentId) {
        return parentId ? this.groupsService.getChildren(parentId) : this.groupsService.getRoot();
    }
    /**
     * @param {?} level
     * @return {?}
     */
    setLevel(level) {
        this.selectedGroups$.asObservable().pipe(take(1), map$1((selectedGroups) => {
            selectedGroups.splice(level + 1);
            return selectedGroups;
        })).subscribe((selectedGroups) => {
            this.selectedGroups$.next(selectedGroups);
        });
        // this.setSelectedGroup(group, level + 1)
    }
}
GroupsChartService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GroupsChartService.ctorParameters = () => [
    { type: HtGroupsService, },
];

/**
 * @record
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class GroupsChartContainerComponent {
    /**
     * @param {?} groupsChartService
     */
    constructor(groupsChartService) {
        this.groupsChartService = groupsChartService;
        this.loading = false;
        this.onGroup = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        const /** @type {?} */ groupId = this.groupId ? this.groupId : null;
        this.groupsChartService.setRootGroupId(groupId);
    }
    /**
     * @return {?}
     */
    get selectedGroups$() {
        return this.groupsChartService.selectedGroups$;
    }
    /**
     * @return {?}
     */
    get groupsLevels$() {
        return this.groupsChartService.groupsLevels$;
    }
    /**
     * @param {?} group
     * @return {?}
     */
    setGroup(group) {
        this.onGroup.next(group);
    }
    /**
     * @param {?} group
     * @param {?} level
     * @param {?} event
     * @return {?}
     */
    selectGroup(group, level, event) {
        const /** @type {?} */ id = group.id;
        event.stopPropagation();
        event.preventDefault();
        this.groupsChartService.setSelectedGroup(group, level + 1);
    }
}
GroupsChartContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-groups-chart-container',
                template: `<ng-container *ngIf="selectedGroups$ | async as selectedGroups">
  <nav class="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
    <ul>
      <li [class.is-active]="l" (click)="groupsChartService.setLevel(i)" *ngFor="let group of selectedGroups; let l = last; let i = index">
        <a *ngIf="group; else root">
          <span>{{group.name}}</span>
        </a>
        <ng-template #root>
          <a>
            <span class="icon is-small"><i class="fa fa-home"></i></span>
            <span>Root groups</span>
          </a>
        </ng-template>
      </li>
    </ul>
  </nav>
  <div class="container">
    <ng-template #notFound>
      <div>
        No Group found
      </div>
    </ng-template>
    <div class="flex-row wrap group-container" *ngIf="!error">
      <div class="flex-column group-container-list bar card-stack" *ngFor="let groups of groupsLevels$ | async; let i = index">
        <div class="text-center ht-level">
          <span class="">Level {{i + 1}}</span>
        </div>
        <div class="flex-column" *ngIf="groups; else empty">
          <div (click)="setGroup(group)" class="card card-clickable is-primary" [class.card-active]="selectedGroups[i + 1] && selectedGroups[i + 1].id == group.id" *ngFor="let group of groups">
            <div class="card-content is-primary flex-row">
              <div class="flex">
                {{group.name}}
              </div>
              <div (click)="selectGroup(group, i, $event)" class="button is-small is-primary">
                <div class="icon">
                  <i class="fa fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="card card-content has-text-grey-light has-text-centered" *ngIf="groups.length == 0">
            No Sub-group
          </div>
        </div>
        <ng-template #empty>
          <h3 class="text-center msg bar has-text-grey-light has-text-centered">
            Loading
          </h3>
        </ng-template>
      </div>
    </div>
  </div>
</ng-container>
`,
                styles: [`.bar{
  width:200px;
  min-width:200px;
}
.card-content{
  padding:10px 13px;
}
.card-active{
  background-color:#5496F8;
  color:white !important;
}
.card-active .button{
  display:none;
}
.action{
  background:#798E9B;
  color:white;
  padding:0 8px;
  border-radius:3px;
}
.action:hover{
  background-color:#52616A;
}
.group-container{
  margin:20px 0;
}
.group-container-list{
  margin:20px 0;
}
.msg{
  margin-top:60px;
}
.ht-level{
  padding:8px 16px;
  background-color:#52616A;
  color:white;
}
a:focus{
  color:initial;
}
.breadcrumb{
  padding:0 30px;
  background-color:#fff;
  border-bottom:1px solid #C9D6DE;
}
.groups-list{
  max-height:400px;
  overflow:auto;
}
`]
            },] },
];
/** @nocollapse */
GroupsChartContainerComponent.ctorParameters = () => [
    { type: GroupsChartService, },
];
GroupsChartContainerComponent.propDecorators = {
    "groupId": [{ type: Input },],
    "onGroup": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class GroupsChartContainerModule {
}
GroupsChartContainerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    SharedModule,
                    RouterModule
                ],
                declarations: [GroupsChartContainerComponent],
                exports: [GroupsChartContainerComponent],
                providers: [GroupsChartService]
            },] },
];
/** @nocollapse */
GroupsChartContainerModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MapComponent {
    /**
     * @param {?} elRef
     * @param {?} htMapService
     */
    constructor(elRef, htMapService) {
        this.elRef = elRef;
        this.loading = false;
        this.showReset = true;
        this.onReady = new EventEmitter();
        this.onMapReset = new EventEmitter();
        if (htMapService)
            this.mapInstance = htMapService.mapInstance;
    }
    /**
     * @return {?}
     */
    onMapResize() {
        this.mapInstance.inValidateSize();
        // todo this.mapService.map.resize();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.mapInstance = this.mapInstance;
        // const user$ = this.userService.placeline.getListener({id: "1f33d4cb-49e9-49b9-ad52-19f732ee55d8"});
        // // const user$ = this.userService.placeline.e("1f33d4cb-49e9-49b9-ad52-19f732ee55d8");
        // user$.subscribe((userData) => {
        //   // console.log("ise", userData);
        // });
        //
        // setTimeout(() => {
        //   this.userService.placeline.setId("75db8dcb-6fc3-44d7-8533-e40c7ebb0a1f")
        // }, 12000)
        // this.userService.placeline.initListener();
        // this.userService.placeline.data$.subscribe((userData: IUserData) => {
        //   // console.log(userData, "user Data map");
        //   if (userData) {
        //     this.mapService.tracePlaceline(userData);
        //     this.mapService.resetBounds()
        //   } else {
        //     this.mapService.segmentTrace.trace(null, this.mapService.map)
        //   }
        //
        // });
    }
    /**
     * @return {?}
     */
    resetMap() {
        this.mapInstance.resetBounds(this.setBoundsOptions);
        this.onMapReset.next(true);
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        const /** @type {?} */ el = this.mapElem.nativeElement;
        this.mapInstance.renderMap(el, this.options);
        this.onReady.next(this.mapInstance.map);
        // window['ht-map'] = this.mapService.map;
        // this.mapService.resetBounds()
    }
}
MapComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-map',
                template: `<div #map style="width: 100%; height: 100%;"></div>
<div class="map-label map-label-bottom">
  <ht-loading-dots *ngIf="loading" class="text-1"></ht-loading-dots>
</div>
<div class="map-label map-label-top">
  <button class="button is-primary" *ngIf="showReset" (click)="resetMap()">Fit in view</button>
</div>
`,
                styles: [`.text-center{
  text-align:center;
}
.text-muted{
  color:#798E9B;
}
.text-right{
  text-align:right;
}
.text-left{
  text-align:left;
}
.text-1{
  font-size:2em;
}
.text-4{
  font-size:0.8em;
}
.text-capitalize{
  text-transform:capitalize;
}
.text-uppercase{
  text-transform:uppercase;
}
.text-ontime{
  color:#58ae5b;
}
.text-late{
  color:#E6413E;
}
.text-warning{
  color:#E6413E !important;
}
.text-red{
  color:#E6413E;
}
.text-blue{
  color:#5496F8;
}
.truncate{
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.flex-row{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:horizontal;
  -webkit-box-direction:normal;
      -ms-flex-direction:row;
          flex-direction:row;
}
.flex-column{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:vertical;
  -webkit-box-direction:normal;
      -ms-flex-direction:column;
          flex-direction:column;
}
.column-gap-4 > :not(:last-child){
  margin-bottom:4px;
}
.row-gap-4 > :not(:last-child){
  margin-right:4px;
}
.column-gap-7 > :not(:last-child){
  margin-bottom:7px;
}
.row-gap-7 > :not(:last-child){
  margin-right:7px;
}
.column-gap-10 > :not(:last-child){
  margin-bottom:10px;
}
.row-gap-10 > :not(:last-child){
  margin-right:10px;
}
.column-gap-20 > :not(:last-child){
  margin-bottom:20px;
}
.row-gap-20 > :not(:last-child){
  margin-right:20px;
}
.wrap{
  -ms-flex-wrap:wrap;
      flex-wrap:wrap;
}
.flex{
  -webkit-box-flex:1;
      -ms-flex:1;
          flex:1;
}
.auto{
  margin:auto;
}
.relative{
  position:relative;
}
.space-between{
  -webkit-box-pack:justify;
      -ms-flex-pack:justify;
          justify-content:space-between;
}
.space-around{
  -ms-flex-pack:distribute;
      justify-content:space-around;
}
.justify-center{
  -webkit-box-pack:center;
      -ms-flex-pack:center;
          justify-content:center;
}
.flex-center{
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
}
.align-center{
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
}
.clickable{
  cursor:pointer;
}
.round-icon{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  width:23px;
  height:23px;
  background:#315790;
  border-radius:50%;
}
.flex-half{
  -ms-flex-preferred-size:50%;
      flex-basis:50%;
}
.link-unstyled{
  color:inherit;
}
.link-unstyled:hover{
  text-decoration:none;
}
.half{
  width:50%;
}
.noselect{
  -webkit-touch-callout:none;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
.hover-shadow:hover{
  -webkit-box-shadow:0px 0px 4px 2px rgba(0, 0, 0, 0.16);
          box-shadow:0px 0px 4px 2px rgba(0, 0, 0, 0.16);
}
.marker-transparent{
  opacity:0.4;
}
.marker-fade{
  -webkit-filter:contrast(16%) brightness(160%) blur(0.6px);
          filter:contrast(16%) brightness(160%) blur(0.6px);
}
.tooltip-warning{
  background:#e04745;
  color:#fff;
}
.tooltip-warning-arrow{
  border-right-color:#e04745 !important;
}
.tooltip-info{
  background:#5496F8;
  color:#fff;
}
.tooltip-info-arrow{
  border-right-color:#5496F8 !important;
}
a{
  color:inherit;
  text-decoration:none;
}
a:hover{
  color:inherit;
  text-decoration:none;
}
a:active{
  color:inherit;
  text-decoration:none;
}
a:focus{
  outline:none;
  color:inherit;
  text-decoration:none;
}
.spinner-wave{
  margin:0 auto;
  width:100px;
  height:20px;
  text-align:center;
}
.spinner-wave > div{
  background-color:#5496F8;
  height:100%;
  width:6px;
  display:inline-block;
  -webkit-animation:wave 1.2s infinite ease-in-out;
  animation:wave 1.2s infinite ease-in-out;
}
.spinner-wave div:nth-child(2){
  -webkit-animation-delay:-1.1s;
  animation-delay:-1.1s;
}
.spinner-wave div:nth-child(3){
  -webkit-animation-delay:-1s;
  animation-delay:-1s;
}
.spinner-wave div:nth-child(4){
  -webkit-animation-delay:-0.9s;
  animation-delay:-0.9s;
}
.spinner-wave div:nth-child(5){
  -webkit-animation-delay:-0.8s;
  animation-delay:-0.8s;
}
@-webkit-keyframes wave{
  0%,
  40%,
  100%{
    -webkit-transform:scaleY(0.4);
  }
  20%{
    -webkit-transform:scaleY(1);
  }
}
@keyframes wave{
  0%,
  40%,
  100%{
    -webkit-transform:scaleY(0.4);
            transform:scaleY(0.4);
  }
  20%{
    -webkit-transform:scaleY(1);
            transform:scaleY(1);
  }
}
@media screen and (max-width: 480px){
  .hide-xs{
    display:none !important;
  }
}
@media screen and (min-width: 480px){
  .show-xs{
    display:none !important;
  }
}
.ht-btn{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
  padding:5px 13px;
  border:0;
  background:#ffffff;
  color:#52616A;
  -webkit-box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
          box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.ht-btn:focus{
  background:#fcfcfc;
  outline:0;
}
.ht-btn-card:hover{
  background:#5496F8;
  color:rgba(255, 255, 255, 0.96);
  -webkit-box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
          box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.stopped-color{
  color:#FFBB44;
}
.drive-color{
  color:#5496F8;
}
.walk-color{
  color:#5496F8;
}
.moving-color{
  color:#5496F8;
}
.logged_off-color{
  color:#A9BAC4;
}
.network_offline-color{
  color:#d19191;
}
.location_disabled-color{
  color:#d19191;
}
.location_low_accuracy-color{
  color:#d19191;
}
.stopped-bg{
  background:#FFBB44;
}
.drive-bg{
  background:#5496F8;
}
.walk-bg{
  background:#5496F8;
}
.moving-bg{
  background:#5496F8;
}
.logged_off-bg{
  background:#A9BAC4;
}
.network_offline-bg{
  background:#d19191;
}
.location_disabled-bg{
  background-color:#d19191;
}
.location_low_accuracy-bg{
  background-color:#d19191;
}
:host{
  height:100%;
  width:100%;
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  position:relative;
}
.map-label{
  position:absolute;
  z-index:400;
  text-align:center;
}
.map-label-bottom{
  bottom:20px;
  right:0;
  left:0;
  width:100%;
}
.map-label-top{
  top:10px;
  right:20px;
}
`]
            },] },
];
/** @nocollapse */
MapComponent.ctorParameters = () => [
    { type: ElementRef, },
    { type: HtMapService, decorators: [{ type: Optional },] },
];
MapComponent.propDecorators = {
    "options": [{ type: Input },],
    "setBoundsOptions": [{ type: Input },],
    "mapInstance": [{ type: Input },],
    "loading": [{ type: Input },],
    "showReset": [{ type: Input },],
    "onReady": [{ type: Output },],
    "onMapReset": [{ type: Output },],
    "mapElem": [{ type: ViewChild, args: ['map',] },],
    "onMapResize": [{ type: HostListener, args: ['resize', ['$event'],] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MapModule {
}
MapModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    SharedModule
                ],
                declarations: [MapComponent],
                exports: [MapComponent]
            },] },
];
/** @nocollapse */
MapModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MapContainerComponent {
    /**
     * @param {?} userClientService
     * @param {?} mapService
     */
    constructor(userClientService, mapService) {
        this.userClientService = userClientService;
        this.mapService = mapService;
        this.showLoading = true;
        this.subs = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.mapService.usersCluster.setPageData$(this.userClientService.listAll.data$, {
            hide$: this.userClientService.placeline.id$
        });
        // this.mapService.placeline.userMarker = new User(this.mapService.mapInstance);
        // this.mapService.placeline.userMarker.setTimeAwareAnimation(this.mapService.placeline.anim);
        this.mapService.placeline.setCompoundData$(this.userClientService.placeline.data$, {
            roots: ['segments', 'actions'],
            highlighted$: this.userClientService.placeline.segmentSelectedId$,
            filter$: this.userClientService.placeline.segmentResetId$,
            resetMap$: this.userClientService.placeline.segmentResetId$
        });
        const /** @type {?} */ loading$1 = this.userClientService.placeline.loading$
            .pipe(map$1((data) => !!data && this.showLoading), distinctUntilChanged());
        const /** @type {?} */ loading$2 = this.userClientService.listAll.loading$
            .pipe(map$1((data) => !!data), distinctUntilChanged());
        this.loading$ = merge(loading$1, loading$2);
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.userClientService.listAll.clearData();
        this.mapService.usersCluster.trace([]);
    }
}
MapContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-map-container',
                template: `<ht-map [loading]="loading$ | async"></ht-map>
<!--<div class="map-label map-label-bottom">-->
  <!--<ht-loading-dots *ngIf="loading$ | async" class="text-1"></ht-loading-dots>-->
<!--</div>-->
<!--<div class="map-label map-label-top">-->
  <!--<button class="button is-primary" (click)="resetMap()">Fit in view</button>-->
<!--</div>-->
`,
                styles: [`.text-center{
  text-align:center;
}
.text-muted{
  color:#798E9B;
}
.text-right{
  text-align:right;
}
.text-left{
  text-align:left;
}
.text-1{
  font-size:2em;
}
.text-4{
  font-size:0.8em;
}
.text-capitalize{
  text-transform:capitalize;
}
.text-uppercase{
  text-transform:uppercase;
}
.text-ontime{
  color:#58ae5b;
}
.text-late{
  color:#E6413E;
}
.text-warning{
  color:#E6413E !important;
}
.text-red{
  color:#E6413E;
}
.text-blue{
  color:#5496F8;
}
.truncate{
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.flex-row{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:horizontal;
  -webkit-box-direction:normal;
      -ms-flex-direction:row;
          flex-direction:row;
}
.flex-column{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:vertical;
  -webkit-box-direction:normal;
      -ms-flex-direction:column;
          flex-direction:column;
}
.column-gap-4 > :not(:last-child){
  margin-bottom:4px;
}
.row-gap-4 > :not(:last-child){
  margin-right:4px;
}
.column-gap-7 > :not(:last-child){
  margin-bottom:7px;
}
.row-gap-7 > :not(:last-child){
  margin-right:7px;
}
.column-gap-10 > :not(:last-child){
  margin-bottom:10px;
}
.row-gap-10 > :not(:last-child){
  margin-right:10px;
}
.column-gap-20 > :not(:last-child){
  margin-bottom:20px;
}
.row-gap-20 > :not(:last-child){
  margin-right:20px;
}
.wrap{
  -ms-flex-wrap:wrap;
      flex-wrap:wrap;
}
.flex{
  -webkit-box-flex:1;
      -ms-flex:1;
          flex:1;
}
.auto{
  margin:auto;
}
.relative{
  position:relative;
}
.space-between{
  -webkit-box-pack:justify;
      -ms-flex-pack:justify;
          justify-content:space-between;
}
.space-around{
  -ms-flex-pack:distribute;
      justify-content:space-around;
}
.justify-center{
  -webkit-box-pack:center;
      -ms-flex-pack:center;
          justify-content:center;
}
.flex-center{
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
}
.align-center{
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
}
.clickable{
  cursor:pointer;
}
.round-icon{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  width:23px;
  height:23px;
  background:#315790;
  border-radius:50%;
}
.flex-half{
  -ms-flex-preferred-size:50%;
      flex-basis:50%;
}
.link-unstyled{
  color:inherit;
}
.link-unstyled:hover{
  text-decoration:none;
}
.half{
  width:50%;
}
.noselect{
  -webkit-touch-callout:none;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
.hover-shadow:hover{
  -webkit-box-shadow:0px 0px 4px 2px rgba(0, 0, 0, 0.16);
          box-shadow:0px 0px 4px 2px rgba(0, 0, 0, 0.16);
}
.marker-transparent{
  opacity:0.4;
}
.marker-fade{
  -webkit-filter:contrast(16%) brightness(160%) blur(0.6px);
          filter:contrast(16%) brightness(160%) blur(0.6px);
}
.tooltip-warning{
  background:#e04745;
  color:#fff;
}
.tooltip-warning-arrow{
  border-right-color:#e04745 !important;
}
.tooltip-info{
  background:#5496F8;
  color:#fff;
}
.tooltip-info-arrow{
  border-right-color:#5496F8 !important;
}
a{
  color:inherit;
  text-decoration:none;
}
a:hover{
  color:inherit;
  text-decoration:none;
}
a:active{
  color:inherit;
  text-decoration:none;
}
a:focus{
  outline:none;
  color:inherit;
  text-decoration:none;
}
.spinner-wave{
  margin:0 auto;
  width:100px;
  height:20px;
  text-align:center;
}
.spinner-wave > div{
  background-color:#5496F8;
  height:100%;
  width:6px;
  display:inline-block;
  -webkit-animation:wave 1.2s infinite ease-in-out;
  animation:wave 1.2s infinite ease-in-out;
}
.spinner-wave div:nth-child(2){
  -webkit-animation-delay:-1.1s;
  animation-delay:-1.1s;
}
.spinner-wave div:nth-child(3){
  -webkit-animation-delay:-1s;
  animation-delay:-1s;
}
.spinner-wave div:nth-child(4){
  -webkit-animation-delay:-0.9s;
  animation-delay:-0.9s;
}
.spinner-wave div:nth-child(5){
  -webkit-animation-delay:-0.8s;
  animation-delay:-0.8s;
}
@-webkit-keyframes wave{
  0%,
  40%,
  100%{
    -webkit-transform:scaleY(0.4);
  }
  20%{
    -webkit-transform:scaleY(1);
  }
}
@keyframes wave{
  0%,
  40%,
  100%{
    -webkit-transform:scaleY(0.4);
            transform:scaleY(0.4);
  }
  20%{
    -webkit-transform:scaleY(1);
            transform:scaleY(1);
  }
}
@media screen and (max-width: 480px){
  .hide-xs{
    display:none !important;
  }
}
@media screen and (min-width: 480px){
  .show-xs{
    display:none !important;
  }
}
.ht-btn{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
  padding:5px 13px;
  border:0;
  background:#ffffff;
  color:#52616A;
  -webkit-box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
          box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.ht-btn:focus{
  background:#fcfcfc;
  outline:0;
}
.ht-btn-card:hover{
  background:#5496F8;
  color:rgba(255, 255, 255, 0.96);
  -webkit-box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
          box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.stopped-color{
  color:#FFBB44;
}
.drive-color{
  color:#5496F8;
}
.walk-color{
  color:#5496F8;
}
.moving-color{
  color:#5496F8;
}
.logged_off-color{
  color:#A9BAC4;
}
.network_offline-color{
  color:#d19191;
}
.location_disabled-color{
  color:#d19191;
}
.location_low_accuracy-color{
  color:#d19191;
}
.stopped-bg{
  background:#FFBB44;
}
.drive-bg{
  background:#5496F8;
}
.walk-bg{
  background:#5496F8;
}
.moving-bg{
  background:#5496F8;
}
.logged_off-bg{
  background:#A9BAC4;
}
.network_offline-bg{
  background:#d19191;
}
.location_disabled-bg{
  background-color:#d19191;
}
.location_low_accuracy-bg{
  background-color:#d19191;
}
:host{
  height:100%;
  width:100%;
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  position:relative;
}
.map-label{
  position:absolute;
  z-index:400;
  text-align:center;
}
.map-label-bottom{
  bottom:20px;
  right:0;
  left:0;
  width:100%;
}
.map-label-top{
  top:10px;
  right:20px;
}
`]
            },] },
];
/** @nocollapse */
MapContainerComponent.ctorParameters = () => [
    { type: HtUsersService, },
    { type: HtMapService, },
];
MapContainerComponent.propDecorators = {
    "showLoading": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MapContainerModule {
}
MapContainerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MapModule,
                    SharedModule
                ],
                declarations: [MapContainerComponent],
                exports: [MapContainerComponent]
            },] },
];
/** @nocollapse */
MapContainerModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PlacelineMapContainerComponent {
    /**
     * @param {?} userClientService
     * @param {?} mapService
     */
    constructor(userClientService, mapService) {
        this.userClientService = userClientService;
        this.mapService = mapService;
        this.showSidebar = true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.userClientService.placeline.setId(this.userId);
        // this.userData$ = this.userClientService.getUserData().do((userData: IUserData) => {
        //   if (userData) {
        //     this.mapService.tracePlaceline(userData);
        //     this.mapService.resetBounds()
        //   } else {
        //     this.mapService.segmentTrace.trace(null, this.mapService.map)
        //   }
        // });
        // if (this.userId) {
        //   this.userClientService.placeline.setId(this.userId)
        // }
    }
}
PlacelineMapContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-placeline-map-container',
                template: `<div class="ht-container">
  <div class="bar" *ngIf="showSidebar">
    <ht-placeline-container [userId]="userId"></ht-placeline-container>
  </div>
  <div class="flex">
    <ht-map-container [showLoading]="false"></ht-map-container>
  </div>
</div>
`,
                styles: [`.text-center{
  text-align:center;
}
.text-muted{
  color:#798E9B;
}
.text-right{
  text-align:right;
}
.text-left{
  text-align:left;
}
.text-1{
  font-size:2em;
}
.text-4{
  font-size:0.8em;
}
.text-capitalize{
  text-transform:capitalize;
}
.text-uppercase{
  text-transform:uppercase;
}
.text-ontime{
  color:#58ae5b;
}
.text-late{
  color:#E6413E;
}
.text-warning{
  color:#E6413E !important;
}
.text-red{
  color:#E6413E;
}
.text-blue{
  color:#5496F8;
}
.truncate{
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.flex-row{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:horizontal;
  -webkit-box-direction:normal;
      -ms-flex-direction:row;
          flex-direction:row;
}
.flex-column{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:vertical;
  -webkit-box-direction:normal;
      -ms-flex-direction:column;
          flex-direction:column;
}
.column-gap-4 > :not(:last-child){
  margin-bottom:4px;
}
.row-gap-4 > :not(:last-child){
  margin-right:4px;
}
.column-gap-7 > :not(:last-child){
  margin-bottom:7px;
}
.row-gap-7 > :not(:last-child){
  margin-right:7px;
}
.column-gap-10 > :not(:last-child){
  margin-bottom:10px;
}
.row-gap-10 > :not(:last-child){
  margin-right:10px;
}
.column-gap-20 > :not(:last-child){
  margin-bottom:20px;
}
.row-gap-20 > :not(:last-child){
  margin-right:20px;
}
.wrap{
  -ms-flex-wrap:wrap;
      flex-wrap:wrap;
}
.flex{
  -webkit-box-flex:1;
      -ms-flex:1;
          flex:1;
}
.auto{
  margin:auto;
}
.relative{
  position:relative;
}
.space-between{
  -webkit-box-pack:justify;
      -ms-flex-pack:justify;
          justify-content:space-between;
}
.space-around{
  -ms-flex-pack:distribute;
      justify-content:space-around;
}
.justify-center{
  -webkit-box-pack:center;
      -ms-flex-pack:center;
          justify-content:center;
}
.flex-center{
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
}
.align-center{
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
}
.clickable{
  cursor:pointer;
}
.round-icon{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  width:23px;
  height:23px;
  background:#315790;
  border-radius:50%;
}
.flex-half{
  -ms-flex-preferred-size:50%;
      flex-basis:50%;
}
.link-unstyled{
  color:inherit;
}
.link-unstyled:hover{
  text-decoration:none;
}
.half{
  width:50%;
}
.noselect{
  -webkit-touch-callout:none;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
.hover-shadow:hover{
  -webkit-box-shadow:0px 0px 4px 2px rgba(0, 0, 0, 0.16);
          box-shadow:0px 0px 4px 2px rgba(0, 0, 0, 0.16);
}
.marker-transparent{
  opacity:0.4;
}
.marker-fade{
  -webkit-filter:contrast(16%) brightness(160%) blur(0.6px);
          filter:contrast(16%) brightness(160%) blur(0.6px);
}
.tooltip-warning{
  background:#e04745;
  color:#fff;
}
.tooltip-warning-arrow{
  border-right-color:#e04745 !important;
}
.tooltip-info{
  background:#5496F8;
  color:#fff;
}
.tooltip-info-arrow{
  border-right-color:#5496F8 !important;
}
a{
  color:inherit;
  text-decoration:none;
}
a:hover{
  color:inherit;
  text-decoration:none;
}
a:active{
  color:inherit;
  text-decoration:none;
}
a:focus{
  outline:none;
  color:inherit;
  text-decoration:none;
}
.spinner-wave{
  margin:0 auto;
  width:100px;
  height:20px;
  text-align:center;
}
.spinner-wave > div{
  background-color:#5496F8;
  height:100%;
  width:6px;
  display:inline-block;
  -webkit-animation:wave 1.2s infinite ease-in-out;
  animation:wave 1.2s infinite ease-in-out;
}
.spinner-wave div:nth-child(2){
  -webkit-animation-delay:-1.1s;
  animation-delay:-1.1s;
}
.spinner-wave div:nth-child(3){
  -webkit-animation-delay:-1s;
  animation-delay:-1s;
}
.spinner-wave div:nth-child(4){
  -webkit-animation-delay:-0.9s;
  animation-delay:-0.9s;
}
.spinner-wave div:nth-child(5){
  -webkit-animation-delay:-0.8s;
  animation-delay:-0.8s;
}
@-webkit-keyframes wave{
  0%,
  40%,
  100%{
    -webkit-transform:scaleY(0.4);
  }
  20%{
    -webkit-transform:scaleY(1);
  }
}
@keyframes wave{
  0%,
  40%,
  100%{
    -webkit-transform:scaleY(0.4);
            transform:scaleY(0.4);
  }
  20%{
    -webkit-transform:scaleY(1);
            transform:scaleY(1);
  }
}
@media screen and (max-width: 480px){
  .hide-xs{
    display:none !important;
  }
}
@media screen and (min-width: 480px){
  .show-xs{
    display:none !important;
  }
}
.ht-btn{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
  padding:5px 13px;
  border:0;
  background:#ffffff;
  color:#52616A;
  -webkit-box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
          box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.ht-btn:focus{
  background:#fcfcfc;
  outline:0;
}
.ht-btn-card:hover{
  background:#5496F8;
  color:rgba(255, 255, 255, 0.96);
  -webkit-box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
          box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.stopped-color{
  color:#FFBB44;
}
.drive-color{
  color:#5496F8;
}
.walk-color{
  color:#5496F8;
}
.moving-color{
  color:#5496F8;
}
.logged_off-color{
  color:#A9BAC4;
}
.network_offline-color{
  color:#d19191;
}
.location_disabled-color{
  color:#d19191;
}
.location_low_accuracy-color{
  color:#d19191;
}
.stopped-bg{
  background:#FFBB44;
}
.drive-bg{
  background:#5496F8;
}
.walk-bg{
  background:#5496F8;
}
.moving-bg{
  background:#5496F8;
}
.logged_off-bg{
  background:#A9BAC4;
}
.network_offline-bg{
  background:#d19191;
}
.location_disabled-bg{
  background-color:#d19191;
}
.location_low_accuracy-bg{
  background-color:#d19191;
}
.ht-container{
  width:100%;
  height:100%;
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:horizontal;
  -webkit-box-direction:normal;
      -ms-flex-direction:row;
          flex-direction:row;
  min-height:100%;
}
.ht-container .bar{
  -webkit-box-flex:1;
      -ms-flex:1;
          flex:1;
  max-width:400px;
  min-height:100%;
  height:100%;
  overflow:auto;
}
`]
            },] },
];
/** @nocollapse */
PlacelineMapContainerComponent.ctorParameters = () => [
    { type: HtUsersService, },
    { type: HtMapService, },
];
PlacelineMapContainerComponent.propDecorators = {
    "userId": [{ type: Input },],
    "showSidebar": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PlacelineMapContainerModule {
}
PlacelineMapContainerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MapContainerModule,
                    PlacelineContainerModule
                ],
                declarations: [PlacelineMapContainerComponent],
                exports: [PlacelineMapContainerComponent]
            },] },
];
/** @nocollapse */
PlacelineMapContainerModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UsersMapContainerComponent {
    /**
     * @param {?} userClientService
     */
    constructor(userClientService) {
        this.userClientService = userClientService;
        this.hasPlaceline = true;
        this.apiType = ApiType.analytics;
        this.showFilter = true;
        this.showSidebar = true;
        this.showAll = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.userClientService.listAll.setActive();
        if (this.key) {
            htClientService.getInstance().tempToken = this.key;
        }
    }
}
UsersMapContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-users-map-container',
                template: `<div class="ht-container">
  <ht-users-filter *ngIf="showFilter"></ht-users-filter>
  <div class="flex-row flex">
    <div class="bar" *ngIf="showSidebar" [style.width.px]="sidebarWidth || 400">
      <ht-users-container
        [apiType]="apiType"
        [hasPlaceline]="hasPlaceline"
        [showAll]="showAll"
        [hasMap]="true"></ht-users-container>
    </div>
    <div class="flex">
      <ht-map-container [showLoading]="false"></ht-map-container>
    </div>
  </div>
</div>
`,
                styles: [`.text-center{
  text-align:center;
}
.text-muted{
  color:#798E9B;
}
.text-right{
  text-align:right;
}
.text-left{
  text-align:left;
}
.text-1{
  font-size:2em;
}
.text-4{
  font-size:0.8em;
}
.text-capitalize{
  text-transform:capitalize;
}
.text-uppercase{
  text-transform:uppercase;
}
.text-ontime{
  color:#58ae5b;
}
.text-late{
  color:#E6413E;
}
.text-warning{
  color:#E6413E !important;
}
.text-red{
  color:#E6413E;
}
.text-blue{
  color:#5496F8;
}
.truncate{
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.flex-row{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:horizontal;
  -webkit-box-direction:normal;
      -ms-flex-direction:row;
          flex-direction:row;
}
.flex-column{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:vertical;
  -webkit-box-direction:normal;
      -ms-flex-direction:column;
          flex-direction:column;
}
.column-gap-4 > :not(:last-child){
  margin-bottom:4px;
}
.row-gap-4 > :not(:last-child){
  margin-right:4px;
}
.column-gap-7 > :not(:last-child){
  margin-bottom:7px;
}
.row-gap-7 > :not(:last-child){
  margin-right:7px;
}
.column-gap-10 > :not(:last-child){
  margin-bottom:10px;
}
.row-gap-10 > :not(:last-child){
  margin-right:10px;
}
.column-gap-20 > :not(:last-child){
  margin-bottom:20px;
}
.row-gap-20 > :not(:last-child){
  margin-right:20px;
}
.wrap{
  -ms-flex-wrap:wrap;
      flex-wrap:wrap;
}
.flex{
  -webkit-box-flex:1;
      -ms-flex:1;
          flex:1;
}
.auto{
  margin:auto;
}
.relative{
  position:relative;
}
.space-between{
  -webkit-box-pack:justify;
      -ms-flex-pack:justify;
          justify-content:space-between;
}
.space-around{
  -ms-flex-pack:distribute;
      justify-content:space-around;
}
.justify-center{
  -webkit-box-pack:center;
      -ms-flex-pack:center;
          justify-content:center;
}
.flex-center{
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
}
.align-center{
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
}
.clickable{
  cursor:pointer;
}
.round-icon{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  width:23px;
  height:23px;
  background:#315790;
  border-radius:50%;
}
.flex-half{
  -ms-flex-preferred-size:50%;
      flex-basis:50%;
}
.link-unstyled{
  color:inherit;
}
.link-unstyled:hover{
  text-decoration:none;
}
.half{
  width:50%;
}
.noselect{
  -webkit-touch-callout:none;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
.hover-shadow:hover{
  -webkit-box-shadow:0px 0px 4px 2px rgba(0, 0, 0, 0.16);
          box-shadow:0px 0px 4px 2px rgba(0, 0, 0, 0.16);
}
.marker-transparent{
  opacity:0.4;
}
.marker-fade{
  -webkit-filter:contrast(16%) brightness(160%) blur(0.6px);
          filter:contrast(16%) brightness(160%) blur(0.6px);
}
.tooltip-warning{
  background:#e04745;
  color:#fff;
}
.tooltip-warning-arrow{
  border-right-color:#e04745 !important;
}
.tooltip-info{
  background:#5496F8;
  color:#fff;
}
.tooltip-info-arrow{
  border-right-color:#5496F8 !important;
}
a{
  color:inherit;
  text-decoration:none;
}
a:hover{
  color:inherit;
  text-decoration:none;
}
a:active{
  color:inherit;
  text-decoration:none;
}
a:focus{
  outline:none;
  color:inherit;
  text-decoration:none;
}
.spinner-wave{
  margin:0 auto;
  width:100px;
  height:20px;
  text-align:center;
}
.spinner-wave > div{
  background-color:#5496F8;
  height:100%;
  width:6px;
  display:inline-block;
  -webkit-animation:wave 1.2s infinite ease-in-out;
  animation:wave 1.2s infinite ease-in-out;
}
.spinner-wave div:nth-child(2){
  -webkit-animation-delay:-1.1s;
  animation-delay:-1.1s;
}
.spinner-wave div:nth-child(3){
  -webkit-animation-delay:-1s;
  animation-delay:-1s;
}
.spinner-wave div:nth-child(4){
  -webkit-animation-delay:-0.9s;
  animation-delay:-0.9s;
}
.spinner-wave div:nth-child(5){
  -webkit-animation-delay:-0.8s;
  animation-delay:-0.8s;
}
@-webkit-keyframes wave{
  0%,
  40%,
  100%{
    -webkit-transform:scaleY(0.4);
  }
  20%{
    -webkit-transform:scaleY(1);
  }
}
@keyframes wave{
  0%,
  40%,
  100%{
    -webkit-transform:scaleY(0.4);
            transform:scaleY(0.4);
  }
  20%{
    -webkit-transform:scaleY(1);
            transform:scaleY(1);
  }
}
@media screen and (max-width: 480px){
  .hide-xs{
    display:none !important;
  }
}
@media screen and (min-width: 480px){
  .show-xs{
    display:none !important;
  }
}
.ht-btn{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
  padding:5px 13px;
  border:0;
  background:#ffffff;
  color:#52616A;
  -webkit-box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
          box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.ht-btn:focus{
  background:#fcfcfc;
  outline:0;
}
.ht-btn-card:hover{
  background:#5496F8;
  color:rgba(255, 255, 255, 0.96);
  -webkit-box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
          box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.stopped-color{
  color:#FFBB44;
}
.drive-color{
  color:#5496F8;
}
.walk-color{
  color:#5496F8;
}
.moving-color{
  color:#5496F8;
}
.logged_off-color{
  color:#A9BAC4;
}
.network_offline-color{
  color:#d19191;
}
.location_disabled-color{
  color:#d19191;
}
.location_low_accuracy-color{
  color:#d19191;
}
.stopped-bg{
  background:#FFBB44;
}
.drive-bg{
  background:#5496F8;
}
.walk-bg{
  background:#5496F8;
}
.moving-bg{
  background:#5496F8;
}
.logged_off-bg{
  background:#A9BAC4;
}
.network_offline-bg{
  background:#d19191;
}
.location_disabled-bg{
  background-color:#d19191;
}
.location_low_accuracy-bg{
  background-color:#d19191;
}
.ht-container{
  width:100%;
  height:100%;
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:vertical;
  -webkit-box-direction:normal;
      -ms-flex-direction:column;
          flex-direction:column;
  min-height:100%;
}
.ht-container .bar{
  width:100px;
  max-width:400px;
  min-height:100%;
  height:100%;
  overflow:auto;
  background:#fbfbfb;
}
`]
            },] },
];
/** @nocollapse */
UsersMapContainerComponent.ctorParameters = () => [
    { type: HtUsersService, },
];
UsersMapContainerComponent.propDecorators = {
    "hasPlaceline": [{ type: Input },],
    "key": [{ type: Input },],
    "sidebarWidth": [{ type: Input },],
    "apiType": [{ type: Input },],
    "showFilter": [{ type: Input },],
    "showSidebar": [{ type: Input },],
    "showAll": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UsersFilterComponent {
    /**
     * @param {?} usersClientService
     * @param {?} cd
     */
    constructor(usersClientService, cd) {
        this.usersClientService = usersClientService;
        this.cd = cd;
        this.query$ = of(null);
        this.loading$ = of(false);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        setTimeout(() => {
            this.query$ = this.usersClientService.queryLabel$;
            this.loading$ = this.usersClientService.list.loading$
                .pipe(skip(1), map$1(data => !!data), distinctUntilChanged());
            this.cd.detectChanges();
        });
        this.statusFiltes = this.usersClientService.filterClass.statusQueryArray;
        this.sortingLabels = this.usersClientService.filterClass.sortingQueryLabel;
        this.ordering$ = this.usersClientService.ordering$;
        this.showFilter$ = this.usersClientService.list.id$.pipe(map$1((id) => !id ? 'show' : 'hide'));
    }
    /**
     * @param {?} query
     * @return {?}
     */
    onQuery(query$$1) {
        this.usersClientService.list.setQueryReset(query$$1);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    clearQuery(key) {
        this.usersClientService.list.clearQueryKey(key);
    }
    /**
     * @param {?} key
     * @param {?} event
     * @return {?}
     */
    setStatus(key, event) {
        this.onQuery({ status: key });
    }
    /**
     * @param {?} key
     * @return {?}
     */
    setOrdering(key) {
        this.onQuery({ ordering: key });
    }
}
UsersFilterComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-users-filter',
                template: `<div class="filter-container flex-column" [@filter]="showFilter$ | async">
  <ht-entity-search (onSearchQuery)="onQuery($event)"></ht-entity-search>
  <div class="dropdown" htDropdown>
    <button type="button" class="button dropdown-trigger flex-row row-gap-4">
      <span>Sorting</span>
      <ng-container *ngIf="ordering$ | async as ordering">
        <span>: {{ordering.string}}</span>
        <i [ngClass]="ordering.sign ? 'fa-arrow-up' : 'fa-arrow-down'" class="fa"></i>
      </ng-container>
      <!--<span *ngIf="ordering$ | async as ordering"></span>-->
      <!--<i class="fa fa-filter"></i>-->
    </button>
    <div class="dropdown-menu" role="menu" aria-labelledby="dropdown-keyboard-access">
      <div class="dropdown-content">
        <a class="dropdown-item" (click)="setOrdering(sort.value)" *ngFor="let sort of sortingLabels">{{sort.label}}</a>
      </div>
    </div>
  </div>
  <div class="dropdown is-hoverable">
    <button id="dropdown-keyboard-access" type="button" class="button flex-row row-gap-4">
      <span>Filters</span> <i class="fa fa-filter"></i>
    </button>
    <div class="dropdown-menu" role="menu" aria-labelledby="dropdown-keyboard-access">
      <div class="dropdown-content">
        <a class="dropdown-item" (click)="setStatus(filter.values.toString(), $event)" *ngFor="let filter of statusFiltes">{{filter.label}}</a>
      </div>
    </div>
  </div>
  <div class="flex flex-row row-gap-4" *ngIf="query$">
    <div class="" *ngFor="let query of query$ | async as queries">
      <div class="tags has-addons">
        <div class="tag is-medium is-primary">{{query.label}}</div>
        <a (click)="clearQuery(query.value)" class="tag is-medium is-primary is-delete"></a>
      </div>
    </div>
  </div>
  <ht-date-range [isRight]="true"></ht-date-range>
  <div class="loading-bar" *ngIf="loading$ | async">
    <ht-loading-bar></ht-loading-bar>
  </div>
</div>
`,
                styles: [`.text-center{
  text-align:center;
}
.text-muted{
  color:#798E9B;
}
.text-right{
  text-align:right;
}
.text-left{
  text-align:left;
}
.text-1{
  font-size:2em;
}
.text-4{
  font-size:0.8em;
}
.text-capitalize{
  text-transform:capitalize;
}
.text-uppercase{
  text-transform:uppercase;
}
.text-ontime{
  color:#58ae5b;
}
.text-late{
  color:#E6413E;
}
.text-warning{
  color:#E6413E !important;
}
.text-red{
  color:#E6413E;
}
.text-blue{
  color:#5496F8;
}
.truncate{
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.flex-row{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:horizontal;
  -webkit-box-direction:normal;
      -ms-flex-direction:row;
          flex-direction:row;
}
.flex-column{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:vertical;
  -webkit-box-direction:normal;
      -ms-flex-direction:column;
          flex-direction:column;
}
.column-gap-4 > :not(:last-child){
  margin-bottom:4px;
}
.row-gap-4 > :not(:last-child){
  margin-right:4px;
}
.column-gap-7 > :not(:last-child){
  margin-bottom:7px;
}
.row-gap-7 > :not(:last-child){
  margin-right:7px;
}
.column-gap-10 > :not(:last-child){
  margin-bottom:10px;
}
.row-gap-10 > :not(:last-child){
  margin-right:10px;
}
.column-gap-20 > :not(:last-child){
  margin-bottom:20px;
}
.row-gap-20 > :not(:last-child){
  margin-right:20px;
}
.wrap{
  -ms-flex-wrap:wrap;
      flex-wrap:wrap;
}
.flex{
  -webkit-box-flex:1;
      -ms-flex:1;
          flex:1;
}
.auto{
  margin:auto;
}
.relative{
  position:relative;
}
.space-between{
  -webkit-box-pack:justify;
      -ms-flex-pack:justify;
          justify-content:space-between;
}
.space-around{
  -ms-flex-pack:distribute;
      justify-content:space-around;
}
.justify-center{
  -webkit-box-pack:center;
      -ms-flex-pack:center;
          justify-content:center;
}
.flex-center{
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
}
.align-center{
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
}
.clickable{
  cursor:pointer;
}
.round-icon{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  width:23px;
  height:23px;
  background:#315790;
  border-radius:50%;
}
.flex-half{
  -ms-flex-preferred-size:50%;
      flex-basis:50%;
}
.link-unstyled{
  color:inherit;
}
.link-unstyled:hover{
  text-decoration:none;
}
.half{
  width:50%;
}
.noselect{
  -webkit-touch-callout:none;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
.hover-shadow:hover{
  -webkit-box-shadow:0px 0px 4px 2px rgba(0, 0, 0, 0.16);
          box-shadow:0px 0px 4px 2px rgba(0, 0, 0, 0.16);
}
.marker-transparent{
  opacity:0.4;
}
.marker-fade{
  -webkit-filter:contrast(16%) brightness(160%) blur(0.6px);
          filter:contrast(16%) brightness(160%) blur(0.6px);
}
.tooltip-warning{
  background:#e04745;
  color:#fff;
}
.tooltip-warning-arrow{
  border-right-color:#e04745 !important;
}
.tooltip-info{
  background:#5496F8;
  color:#fff;
}
.tooltip-info-arrow{
  border-right-color:#5496F8 !important;
}
a{
  color:inherit;
  text-decoration:none;
}
a:hover{
  color:inherit;
  text-decoration:none;
}
a:active{
  color:inherit;
  text-decoration:none;
}
a:focus{
  outline:none;
  color:inherit;
  text-decoration:none;
}
.spinner-wave{
  margin:0 auto;
  width:100px;
  height:20px;
  text-align:center;
}
.spinner-wave > div{
  background-color:#5496F8;
  height:100%;
  width:6px;
  display:inline-block;
  -webkit-animation:wave 1.2s infinite ease-in-out;
  animation:wave 1.2s infinite ease-in-out;
}
.spinner-wave div:nth-child(2){
  -webkit-animation-delay:-1.1s;
  animation-delay:-1.1s;
}
.spinner-wave div:nth-child(3){
  -webkit-animation-delay:-1s;
  animation-delay:-1s;
}
.spinner-wave div:nth-child(4){
  -webkit-animation-delay:-0.9s;
  animation-delay:-0.9s;
}
.spinner-wave div:nth-child(5){
  -webkit-animation-delay:-0.8s;
  animation-delay:-0.8s;
}
@-webkit-keyframes wave{
  0%,
  40%,
  100%{
    -webkit-transform:scaleY(0.4);
  }
  20%{
    -webkit-transform:scaleY(1);
  }
}
@keyframes wave{
  0%,
  40%,
  100%{
    -webkit-transform:scaleY(0.4);
            transform:scaleY(0.4);
  }
  20%{
    -webkit-transform:scaleY(1);
            transform:scaleY(1);
  }
}
@media screen and (max-width: 480px){
  .hide-xs{
    display:none !important;
  }
}
@media screen and (min-width: 480px){
  .show-xs{
    display:none !important;
  }
}
.ht-btn{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
  padding:5px 13px;
  border:0;
  background:#ffffff;
  color:#52616A;
  -webkit-box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
          box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.ht-btn:focus{
  background:#fcfcfc;
  outline:0;
}
.ht-btn-card:hover{
  background:#5496F8;
  color:rgba(255, 255, 255, 0.96);
  -webkit-box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
          box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.stopped-color{
  color:#FFBB44;
}
.drive-color{
  color:#5496F8;
}
.walk-color{
  color:#5496F8;
}
.moving-color{
  color:#5496F8;
}
.logged_off-color{
  color:#A9BAC4;
}
.network_offline-color{
  color:#d19191;
}
.location_disabled-color{
  color:#d19191;
}
.location_low_accuracy-color{
  color:#d19191;
}
.stopped-bg{
  background:#FFBB44;
}
.drive-bg{
  background:#5496F8;
}
.walk-bg{
  background:#5496F8;
}
.moving-bg{
  background:#5496F8;
}
.logged_off-bg{
  background:#A9BAC4;
}
.network_offline-bg{
  background:#d19191;
}
.location_disabled-bg{
  background-color:#d19191;
}
.location_low_accuracy-bg{
  background-color:#d19191;
}
.filter-container{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:horizontal;
  -webkit-box-direction:normal;
      -ms-flex-direction:row;
          flex-direction:row;
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
  position:relative;
  padding:4px 10px;
  border-bottom:2px solid #ccc;
}
.filter-container > :not(:last-child){
  margin-right:7px;
}
.loading-bar{
  position:absolute;
  width:100%;
  bottom:0;
  left:0;
}
`],
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [
                    trigger('filter', [
                        state('hide', style({
                            display: 'none'
                        })),
                        transition('hide => show', [
                            style({ transform: 'translateX(-100px)', height: 0 }),
                            animate('0.3s' + ' ease-out')
                        ]),
                        transition('show => hide', [
                            animate('0.3s' + ' ease-in', style({ transform: 'translateX(-100px)', height: 0 }))
                        ])
                    ])
                ]
            },] },
];
/** @nocollapse */
UsersFilterComponent.ctorParameters = () => [
    { type: HtUsersService, },
    { type: ChangeDetectorRef, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class EntitySearchComponent {
    constructor() {
        this.query$ = new Subject();
        this.entity = "";
        this.onSearchQuery = new EventEmitter();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    clickSearch(e) {
        this.input.nativeElement.focus();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // this.watchChange()
    }
    /**
     * @param {?} string
     * @return {?}
     */
    test(string) {
        this.query$.next(string);
    }
    /**
     * @param {?} el
     * @return {?}
     */
    setSearch(el) {
        const /** @type {?} */ search = el.value;
        el.value = '';
        if (search)
            this.onSearchQuery.next({ search });
    }
}
EntitySearchComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-entity-search',
                template: `<!--<div class="control has-icons-right flex-row">-->
  <!--<input #query (input)="test(query.value)" (keydown.enter)="setSearch(query)" type="text" class="input" placeholder="Search {{entity}}">-->
  <!--<span class="icon is-right" (click)="setSearch(query)">-->
        <!--<i class="fa fa-search"></i>-->
      <!--</span>-->
<!--</div>&lt;!&ndash; /input-group &ndash;&gt;-->
<div class="field has-addons">
  <div class="control">
    <input #query (input)="test(query.value)" (keydown.enter)="setSearch(query)" type="text" class="input" placeholder="Search {{entity}}">
  </div>
  <div class="control">
    <a class="button">
      <i class="fa fa-search"></i>
    </a>
  </div>
</div>
`,
                styles: [`.text-center{
  text-align:center;
}
.text-muted{
  color:#798E9B;
}
.text-right{
  text-align:right;
}
.text-left{
  text-align:left;
}
.text-1{
  font-size:2em;
}
.text-4{
  font-size:0.8em;
}
.text-capitalize{
  text-transform:capitalize;
}
.text-uppercase{
  text-transform:uppercase;
}
.text-ontime{
  color:#58ae5b;
}
.text-late{
  color:#E6413E;
}
.text-warning{
  color:#E6413E !important;
}
.text-red{
  color:#E6413E;
}
.text-blue{
  color:#5496F8;
}
.truncate{
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.flex-row{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:horizontal;
  -webkit-box-direction:normal;
      -ms-flex-direction:row;
          flex-direction:row;
}
.flex-column{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:vertical;
  -webkit-box-direction:normal;
      -ms-flex-direction:column;
          flex-direction:column;
}
.column-gap-4 > :not(:last-child){
  margin-bottom:4px;
}
.row-gap-4 > :not(:last-child){
  margin-right:4px;
}
.column-gap-7 > :not(:last-child){
  margin-bottom:7px;
}
.row-gap-7 > :not(:last-child){
  margin-right:7px;
}
.column-gap-10 > :not(:last-child){
  margin-bottom:10px;
}
.row-gap-10 > :not(:last-child){
  margin-right:10px;
}
.column-gap-20 > :not(:last-child){
  margin-bottom:20px;
}
.row-gap-20 > :not(:last-child){
  margin-right:20px;
}
.wrap{
  -ms-flex-wrap:wrap;
      flex-wrap:wrap;
}
.flex{
  -webkit-box-flex:1;
      -ms-flex:1;
          flex:1;
}
.auto{
  margin:auto;
}
.relative{
  position:relative;
}
.space-between{
  -webkit-box-pack:justify;
      -ms-flex-pack:justify;
          justify-content:space-between;
}
.space-around{
  -ms-flex-pack:distribute;
      justify-content:space-around;
}
.justify-center{
  -webkit-box-pack:center;
      -ms-flex-pack:center;
          justify-content:center;
}
.flex-center{
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
}
.align-center{
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
}
.clickable{
  cursor:pointer;
}
.round-icon{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  width:23px;
  height:23px;
  background:#315790;
  border-radius:50%;
}
.flex-half{
  -ms-flex-preferred-size:50%;
      flex-basis:50%;
}
.link-unstyled{
  color:inherit;
}
.link-unstyled:hover{
  text-decoration:none;
}
.half{
  width:50%;
}
.noselect{
  -webkit-touch-callout:none;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
.hover-shadow:hover{
  -webkit-box-shadow:0px 0px 4px 2px rgba(0, 0, 0, 0.16);
          box-shadow:0px 0px 4px 2px rgba(0, 0, 0, 0.16);
}
.marker-transparent{
  opacity:0.4;
}
.marker-fade{
  -webkit-filter:contrast(16%) brightness(160%) blur(0.6px);
          filter:contrast(16%) brightness(160%) blur(0.6px);
}
.tooltip-warning{
  background:#e04745;
  color:#fff;
}
.tooltip-warning-arrow{
  border-right-color:#e04745 !important;
}
.tooltip-info{
  background:#5496F8;
  color:#fff;
}
.tooltip-info-arrow{
  border-right-color:#5496F8 !important;
}
a{
  color:inherit;
  text-decoration:none;
}
a:hover{
  color:inherit;
  text-decoration:none;
}
a:active{
  color:inherit;
  text-decoration:none;
}
a:focus{
  outline:none;
  color:inherit;
  text-decoration:none;
}
.spinner-wave{
  margin:0 auto;
  width:100px;
  height:20px;
  text-align:center;
}
.spinner-wave > div{
  background-color:#5496F8;
  height:100%;
  width:6px;
  display:inline-block;
  -webkit-animation:wave 1.2s infinite ease-in-out;
  animation:wave 1.2s infinite ease-in-out;
}
.spinner-wave div:nth-child(2){
  -webkit-animation-delay:-1.1s;
  animation-delay:-1.1s;
}
.spinner-wave div:nth-child(3){
  -webkit-animation-delay:-1s;
  animation-delay:-1s;
}
.spinner-wave div:nth-child(4){
  -webkit-animation-delay:-0.9s;
  animation-delay:-0.9s;
}
.spinner-wave div:nth-child(5){
  -webkit-animation-delay:-0.8s;
  animation-delay:-0.8s;
}
@-webkit-keyframes wave{
  0%,
  40%,
  100%{
    -webkit-transform:scaleY(0.4);
  }
  20%{
    -webkit-transform:scaleY(1);
  }
}
@keyframes wave{
  0%,
  40%,
  100%{
    -webkit-transform:scaleY(0.4);
            transform:scaleY(0.4);
  }
  20%{
    -webkit-transform:scaleY(1);
            transform:scaleY(1);
  }
}
@media screen and (max-width: 480px){
  .hide-xs{
    display:none !important;
  }
}
@media screen and (min-width: 480px){
  .show-xs{
    display:none !important;
  }
}
.ht-btn{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
  padding:5px 13px;
  border:0;
  background:#ffffff;
  color:#52616A;
  -webkit-box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
          box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.ht-btn:focus{
  background:#fcfcfc;
  outline:0;
}
.ht-btn-card:hover{
  background:#5496F8;
  color:rgba(255, 255, 255, 0.96);
  -webkit-box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
          box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.stopped-color{
  color:#FFBB44;
}
.drive-color{
  color:#5496F8;
}
.walk-color{
  color:#5496F8;
}
.moving-color{
  color:#5496F8;
}
.logged_off-color{
  color:#A9BAC4;
}
.network_offline-color{
  color:#d19191;
}
.location_disabled-color{
  color:#d19191;
}
.location_low_accuracy-color{
  color:#d19191;
}
.stopped-bg{
  background:#FFBB44;
}
.drive-bg{
  background:#5496F8;
}
.walk-bg{
  background:#5496F8;
}
.moving-bg{
  background:#5496F8;
}
.logged_off-bg{
  background:#A9BAC4;
}
.network_offline-bg{
  background:#d19191;
}
.location_disabled-bg{
  background-color:#d19191;
}
.location_low_accuracy-bg{
  background-color:#d19191;
}
:host{
  position:relative;
}
#results{
  position:absolute;
  left:0;
  top:37px;
  background:#fff;
  width:100%;
  border:1px solid #C9D6DE;
  z-index:11;
}
.input-search{
  border:0;
  border-bottom:1px solid #ffffff;
}
.input-search:focus{
  outline:0;
  border-bottom:1px solid #52616A;
}
.item{
  padding:4px 10px;
  color:#52616A;
}
.item:hover{
  background:#f7f7f7;
}
.clickable{
  color:#5496F8;
}
.input-sm{
  border:0;
  outline:0;
  -webkit-box-shadow:0 0;
          box-shadow:0 0;
  border-bottom:1px solid #d5dfe5;
  font-size:15px;
}
`]
            },] },
];
/** @nocollapse */
EntitySearchComponent.ctorParameters = () => [];
EntitySearchComponent.propDecorators = {
    "input": [{ type: ViewChild, args: ['query',] },],
    "entity": [{ type: Input },],
    "onSearchQuery": [{ type: Output },],
    "clickSearch": [{ type: HostListener, args: ['click',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class EntitySearchModule {
}
EntitySearchModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [EntitySearchComponent],
                exports: [EntitySearchComponent]
            },] },
];
/** @nocollapse */
EntitySearchModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DateRangeComponent {
    /**
     * @param {?} elRef
     * @param {?} cd
     */
    constructor(elRef, cd) {
        this.elRef = elRef;
        this.cd = cd;
        this.dateRangeService$ = dateRangeService.getInstance();
        this.isRight = false;
        this.showSingleDay = true;
        this.customDates = DateRangeLabelMap;
        this.isActive = false;
    }
    /**
     * @return {?}
     */
    open() {
        this.isActive = true;
    }
    /**
     * @return {?}
     */
    close() {
        this.isActive = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.dateRange$ = this.dateRangeService$.display$;
        // this.customDates$ = of(this.customDates);
        this.dateRangeOptions$ = this.dateRangeService$.data$.pipe(map$1((dateRange) => {
            return this.customDates.filter(customRange => {
                return this.showSingleDay ? true : !customRange.isSingleDay;
            }).map((customRange) => {
                return isSameDateRange(customRange.range, dateRange) ? Object.assign({}, customRange, { isActive: true }) : Object.assign({}, customRange);
            });
        }));
        this.dateRangeOptions$.subscribe();
    }
    /**
     * @param {?} range
     * @return {?}
     */
    setDateRange(range) {
        this.dateRangeService$.setDateRange(range);
        setTimeout(() => {
            this.isActive = false;
            this.cd.detectChanges();
        }, 200);
    }
}
DateRangeComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-date-range',
                template: `<div class="dropdown is-active" [class.is-right]="isRight" *ngIf="dateRange$ | async as dateRange">
  <button type="button dropdown-trigger" class="button flex-row row-gap-4">
    <span>{{dateRange}}</span>
    <span class="icon">
      <i class="fa fa-calendar"></i>
    </span>
    <!--<span *ngIf="ordering$ | async as ordering"></span>-->
    <!--<i class="fa fa-filter"></i>-->
  </button>
  <div class="dropdown-menu dropdown-menu-right is-boxed" *ngIf="isActive" [@calender-appear]>
    <div class="dropdown-content" role="menu" aria-labelledby="dropdown-keyboard-access">
      <div class="dropdown-item">
        <ht-date-range-picker [options]="{showSingleDay: showSingleDay, isRight: isRight}" (onRangeChange)="setDateRange($event)" [dateRange]="dateRangeService$.data$ | async"></ht-date-range-picker>
      </div>
    </div>
  </div>
</div>
`,
                styles: [`.text-center{
  text-align:center;
}
.text-muted{
  color:#798E9B;
}
.text-right{
  text-align:right;
}
.text-left{
  text-align:left;
}
.text-1{
  font-size:2em;
}
.text-4{
  font-size:0.8em;
}
.text-capitalize{
  text-transform:capitalize;
}
.text-uppercase{
  text-transform:uppercase;
}
.text-ontime{
  color:#58ae5b;
}
.text-late{
  color:#E6413E;
}
.text-warning{
  color:#E6413E !important;
}
.text-red{
  color:#E6413E;
}
.text-blue{
  color:#5496F8;
}
.truncate{
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.flex-row{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:horizontal;
  -webkit-box-direction:normal;
      -ms-flex-direction:row;
          flex-direction:row;
}
.flex-column{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:vertical;
  -webkit-box-direction:normal;
      -ms-flex-direction:column;
          flex-direction:column;
}
.column-gap-4 > :not(:last-child){
  margin-bottom:4px;
}
.row-gap-4 > :not(:last-child){
  margin-right:4px;
}
.column-gap-7 > :not(:last-child){
  margin-bottom:7px;
}
.row-gap-7 > :not(:last-child){
  margin-right:7px;
}
.column-gap-10 > :not(:last-child){
  margin-bottom:10px;
}
.row-gap-10 > :not(:last-child){
  margin-right:10px;
}
.column-gap-20 > :not(:last-child){
  margin-bottom:20px;
}
.row-gap-20 > :not(:last-child){
  margin-right:20px;
}
.wrap{
  -ms-flex-wrap:wrap;
      flex-wrap:wrap;
}
.flex{
  -webkit-box-flex:1;
      -ms-flex:1;
          flex:1;
}
.auto{
  margin:auto;
}
.relative{
  position:relative;
}
.space-between{
  -webkit-box-pack:justify;
      -ms-flex-pack:justify;
          justify-content:space-between;
}
.space-around{
  -ms-flex-pack:distribute;
      justify-content:space-around;
}
.justify-center{
  -webkit-box-pack:center;
      -ms-flex-pack:center;
          justify-content:center;
}
.flex-center{
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
}
.align-center{
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
}
.clickable{
  cursor:pointer;
}
.round-icon{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  width:23px;
  height:23px;
  background:#315790;
  border-radius:50%;
}
.flex-half{
  -ms-flex-preferred-size:50%;
      flex-basis:50%;
}
.link-unstyled{
  color:inherit;
}
.link-unstyled:hover{
  text-decoration:none;
}
.half{
  width:50%;
}
.noselect{
  -webkit-touch-callout:none;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
.hover-shadow:hover{
  -webkit-box-shadow:0px 0px 4px 2px rgba(0, 0, 0, 0.16);
          box-shadow:0px 0px 4px 2px rgba(0, 0, 0, 0.16);
}
.marker-transparent{
  opacity:0.4;
}
.marker-fade{
  -webkit-filter:contrast(16%) brightness(160%) blur(0.6px);
          filter:contrast(16%) brightness(160%) blur(0.6px);
}
.tooltip-warning{
  background:#e04745;
  color:#fff;
}
.tooltip-warning-arrow{
  border-right-color:#e04745 !important;
}
.tooltip-info{
  background:#5496F8;
  color:#fff;
}
.tooltip-info-arrow{
  border-right-color:#5496F8 !important;
}
a{
  color:inherit;
  text-decoration:none;
}
a:hover{
  color:inherit;
  text-decoration:none;
}
a:active{
  color:inherit;
  text-decoration:none;
}
a:focus{
  outline:none;
  color:inherit;
  text-decoration:none;
}
.spinner-wave{
  margin:0 auto;
  width:100px;
  height:20px;
  text-align:center;
}
.spinner-wave > div{
  background-color:#5496F8;
  height:100%;
  width:6px;
  display:inline-block;
  -webkit-animation:wave 1.2s infinite ease-in-out;
  animation:wave 1.2s infinite ease-in-out;
}
.spinner-wave div:nth-child(2){
  -webkit-animation-delay:-1.1s;
  animation-delay:-1.1s;
}
.spinner-wave div:nth-child(3){
  -webkit-animation-delay:-1s;
  animation-delay:-1s;
}
.spinner-wave div:nth-child(4){
  -webkit-animation-delay:-0.9s;
  animation-delay:-0.9s;
}
.spinner-wave div:nth-child(5){
  -webkit-animation-delay:-0.8s;
  animation-delay:-0.8s;
}
@-webkit-keyframes wave{
  0%,
  40%,
  100%{
    -webkit-transform:scaleY(0.4);
  }
  20%{
    -webkit-transform:scaleY(1);
  }
}
@keyframes wave{
  0%,
  40%,
  100%{
    -webkit-transform:scaleY(0.4);
            transform:scaleY(0.4);
  }
  20%{
    -webkit-transform:scaleY(1);
            transform:scaleY(1);
  }
}
@media screen and (max-width: 480px){
  .hide-xs{
    display:none !important;
  }
}
@media screen and (min-width: 480px){
  .show-xs{
    display:none !important;
  }
}
.ht-btn{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
  padding:5px 13px;
  border:0;
  background:#ffffff;
  color:#52616A;
  -webkit-box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
          box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.ht-btn:focus{
  background:#fcfcfc;
  outline:0;
}
.ht-btn-card:hover{
  background:#5496F8;
  color:rgba(255, 255, 255, 0.96);
  -webkit-box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
          box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.stopped-color{
  color:#FFBB44;
}
.drive-color{
  color:#5496F8;
}
.walk-color{
  color:#5496F8;
}
.moving-color{
  color:#5496F8;
}
.logged_off-color{
  color:#A9BAC4;
}
.network_offline-color{
  color:#d19191;
}
.location_disabled-color{
  color:#d19191;
}
.location_low_accuracy-color{
  color:#d19191;
}
.stopped-bg{
  background:#FFBB44;
}
.drive-bg{
  background:#5496F8;
}
.walk-bg{
  background:#5496F8;
}
.moving-bg{
  background:#5496F8;
}
.logged_off-bg{
  background:#A9BAC4;
}
.network_offline-bg{
  background:#d19191;
}
.location_disabled-bg{
  background-color:#d19191;
}
.location_low_accuracy-bg{
  background-color:#d19191;
}
.dropdown-menu{
  z-index:601;
}
.row-right{
  -webkit-box-orient:horizontal;
  -webkit-box-direction:reverse;
      -ms-flex-direction:row-reverse;
          flex-direction:row-reverse;
}
.row-right .options{
  padding-left:15px;
}
.row-left{
  -webkit-box-orient:horizontal;
  -webkit-box-direction:normal;
      -ms-flex-direction:row;
          flex-direction:row;
}
.row-left .options{
  padding-right:15px;
}
`],
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [
                    trigger('calender-appear', [
                        transition(":leave", [
                            style({ pointerEvents: 'none' }),
                            animate('150ms ease-in', style({ opacity: 0, top: "-10px" }))
                        ]),
                        transition(":enter", [
                            style({ opacity: 0, height: 0, top: "-10px" }),
                            animate('150ms ease-out')
                        ]),
                    ])
                ]
            },] },
];
/** @nocollapse */
DateRangeComponent.ctorParameters = () => [
    { type: ElementRef, },
    { type: ChangeDetectorRef, },
];
DateRangeComponent.propDecorators = {
    "dateRangeService$": [{ type: Input },],
    "isRight": [{ type: Input },],
    "showSingleDay": [{ type: Input },],
    "open": [{ type: HostListener, args: ['mouseenter',] },],
    "close": [{ type: HostListener, args: ['mouseleave',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */

/**
 * @record
 */

class DateRangePickerComponent {
    constructor() {
        this.options = {};
        this.onRangeChange = new EventEmitter();
        this.onDateChange = new EventEmitter();
        // selectedDates$: BehaviorSubject<Partial<IDateRange>> = new BehaviorSubject<Partial<IDateRange>>({end: new Date().toISOString()});
        this.selectedDate$ = new BehaviorSubject(null);
        this.hoveredDate = new BehaviorSubject(null);
        this.days = [
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat'
        ];
        this.customDates = DateRangeLabelMap;
        let /** @type {?} */ monthStart = startOfMonth(new Date());
        this.currentMonthStart$ = new BehaviorSubject(monthStart);
    }
    ;
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        if (this.options.datePicker) {
            this.dateRange = { end: this.date, start: this.date };
        }
        this.initDateRange(this.dateRange);
        this.display = dateRangeDisplay(this.dateRange);
    }
    /**
     * @param {?} range
     * @return {?}
     */
    initDateRange(range) {
        this.customDates$ = this.customDates.filter(customRange => {
            return !this.options.hideSingleDay ? true : !customRange.isSingleDay;
        }).map((customRange) => {
            return isSameDateRange(customRange.range, range) ? Object.assign({}, customRange, { isActive: true }) : Object.assign({}, customRange);
        });
        this.currentDateStyle$ = combineLatest(this.selectedDate$.pipe(distinctUntilChanged()), this.hoveredDate.pipe(distinctUntilChanged()), (selectedDate, hoveredDate) => {
            let /** @type {?} */ dateRange = range;
            let /** @type {?} */ selectedRange;
            let /** @type {?} */ display;
            if (selectedDate && hoveredDate) {
                if (isBefore(hoveredDate, selectedDate)) {
                    selectedRange = { end: selectedDate };
                    display = [null, format(selectedDate, 'DD MMM')];
                }
                else {
                    selectedRange = { start: selectedDate };
                    display = [format(selectedDate, 'DD MMM'), null];
                }
            }
            else if (selectedDate) {
                selectedRange = { end: selectedDate };
                display = [format(selectedDate, 'DD MMM'), null];
            }
            else {
                selectedRange = dateRange;
                display = [format(dateRange.start, 'DD MMM'), format(dateRange.end, 'DD MMM')];
            }
            if (this.options.datePicker) {
                display = [format(dateRange.start, 'DD MMM')];
            }
            return {
                selectedRange,
                hoveredDate,
                display
            };
        });
        this.dates$ = combineLatest(this.currentMonthStart$, this.currentDateStyle$, (monthStart, dateStyle) => {
            // let selectedDates = selectedDate ? [selectedDate] : [selectedRange.start, selectedRange.end];
            // let dateStyle: IDateStyle = {selectedDates, hoveredDate};
            return this.generateDates(monthStart, dateStyle);
        });
        this.month$ = this.currentMonthStart$.pipe(map$1(date => {
            return {
                display: format(date, 'MMM YY')
            };
        }));
    }
    /**
     * @param {?} inc
     * @return {?}
     */
    changeMonth(inc) {
        let /** @type {?} */ month = addMonths(new Date(this.currentMonthStart$.getValue()), inc);
        this.currentMonthStart$.next(month);
    }
    /**
     * @param {?} monthStart
     * @param {?} dateStyle
     * @return {?}
     */
    generateDates(monthStart, dateStyle) {
        let /** @type {?} */ start = startOfWeek(monthStart);
        let /** @type {?} */ weekStarts = [0, 1, 2, 3, 4, 5].map((v, i) => {
            return addWeeks(start, i);
        });
        let /** @type {?} */ days = weekStarts.map((weekStart) => {
            return [0, 1, 2, 3, 4, 5, 6].map((i) => {
                let /** @type {?} */ date = addDays(weekStart, i);
                return this.getDay(date, monthStart, dateStyle);
            });
        });
        // console.log(days);
        return days;
    }
    /**
     * @param {?} date
     * @param {?} monthStart
     * @param {?} dateStyle
     * @return {?}
     */
    getDay(date, monthStart, dateStyle) {
        // console.log(dateStyle);
        const /** @type {?} */ selectedRange = this.getRangeFromStyle(dateStyle);
        let /** @type {?} */ isEnd = false;
        let /** @type {?} */ isStart = false;
        let /** @type {?} */ isHovered = this.isHovered(date, dateStyle);
        if (selectedRange.end) {
            isEnd = isSameDay(selectedRange.end, date);
        }
        if (selectedRange.start) {
            isStart = isSameDay(selectedRange.start, date);
        }
        // if(dateStyle.hoveredDate) {
        //   isHovered = this.isHovered(date, dateStyle.selectedDates[0], dateStyle.hoveredDate)
        // }
        // if(dateStyle.selectedDates.length == 2) {
        //   isHovered = this.isHovered(date, dateStyle.selectedDates[0], dateStyle.selectedDates[1])
        // }
        return {
            date: date,
            timeStamp: date.toISOString(),
            day: format(date, 'D'),
            isInMonth: isSameMonth(date, monthStart),
            today: isToday(date),
            isEnd,
            isStart,
            isHovered,
            isInvalid: isFuture(date)
        };
    }
    ;
    /**
     * @param {?} date
     * @param {?} dateStyle
     * @return {?}
     */
    isHovered(date, dateStyle) {
        let /** @type {?} */ hovered = dateStyle.hoveredDate;
        let /** @type {?} */ start = dateStyle.selectedRange.start || hovered;
        let /** @type {?} */ end = dateStyle.selectedRange.end || hovered || start;
        return isWithinRange(date, start, end);
        // if (isBefore(hovered, selected)) {
        //   return isWithinRange(date, hovered, selected)
        // } else {
        //   return isWithinRange(date, selected, hovered)
        // }
    }
    /**
     * @param {?} range
     * @return {?}
     */
    setDateRange(range) {
        range = { start: range.start, end: endOfDay(range.end).toISOString() };
        this.onRangeChange.next(range);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    setDate(date) {
        this.onDateChange.next(date.timeStamp);
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    getRangeFromStyle({ selectedRange, hoveredDate }) {
        return selectedRange;
        // if (hoveredDate) {
        //   return isBefore(hoveredDate, selectedDates[0]) ?
        //     {end: new Date(selectedDates[0]).toISOString()} : {start: new Date(selectedDates[0]).toISOString()}
        // } else if(selectedDates.length == 2) {
        //   return isBefore(selectedDates[1], selectedDates[0]) ?
        //     {end: new Date(selectedDates[0]).toISOString(), start: new Date(selectedDates[1]).toISOString()} : {start: new Date(selectedDates[0]).toISOString(), end: new Date(selectedDates[1]).toISOString()}
        // } else {
        //   return {start: selectedDates[0], end: selectedDates[1]}
        // }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    pickDate(date) {
        if (date.isInvalid)
            return false;
        if (this.options.datePicker) {
            this.setDate(date);
        }
        else {
            this.currentDateStyle$.pipe(take(1)).subscribe(dateStyle => {
                if (dateStyle.hoveredDate || (!dateStyle.selectedRange.start || !dateStyle.selectedRange.end)) {
                    this.setDateFromDayRange(date, dateStyle);
                }
                else {
                    this.selectedDate$.next(new Date(date.date).toISOString());
                }
            });
        }
    }
    ;
    /**
     * @param {?} date
     * @param {?} dateStyle
     * @return {?}
     */
    setDateFromDayRange(date, dateStyle) {
        let /** @type {?} */ range = { end: dateStyle.selectedRange.end || date.timeStamp, start: dateStyle.selectedRange.start || date.timeStamp };
        // console.log(range, "range");
        this.selectedDate$.next(null);
        this.hoveredDate.next(null);
        this.setDateRange(range);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    hoverDate(date) {
        let /** @type {?} */ timeStamp = date ? new Date(date.date).toISOString() : null;
        if (timeStamp) {
            let /** @type {?} */ selected = this.selectedDate$.getValue();
            if (selected)
                this.hoveredDate.next(timeStamp);
        }
        else {
            this.hoveredDate.next(timeStamp);
        }
    }
    ;
    /**
     * @param {?} a
     * @param {?} v
     * @return {?}
     */
    indexBy(a, v) {
        return v.timeStamp;
    }
    /**
     * @param {?} a
     * @param {?} v
     * @return {?}
     */
    indexByWeek(a, v) {
        return v[0].timeStamp;
    }
    /**
     * @return {?}
     */
    reset() {
        this.selectedDate$.next(null);
        this.hoveredDate.next(null);
        let /** @type {?} */ monthStart = startOfMonth(new Date());
        this.currentMonthStart$.next(monthStart);
    }
}
DateRangePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-date-range-picker',
                template: `<div class="flex-row" [ngClass]="options.isRight ? 'row-right' : 'row-left'">
  <div class="flex-column column-gap-10 options" *ngIf="!options.datePicker">
    <button class="button is-light is-small" [class.is-primary]="date.isActive" (click)="setDateRange(date.range)" *ngFor="let date of customDates$">{{date.label}}</button>
  </div>
  <div class="calender" *ngIf="!options.hideCalender">
    <div class="flex-column">
      <div class="flex-row date-style" *ngIf="currentDateStyle$ | async as dateStyle">
        <div class="has-text-centered" [class.has-text-danger]="!dateStyle.display[0]">{{dateStyle.display[0] | dot: 'Set start date'}}</div>
        <div *ngIf="dateStyle.display.length == 2">&nbsp; &hArr; &nbsp;</div>
        <div *ngIf="dateStyle.display.length == 2" class="has-text-centered" [class.has-text-danger]="!dateStyle.display[1]">{{dateStyle.display[1] | dot: 'Set end date'}}</div>
      </div>
      <div class="flex-row month flex-center" *ngIf="month$ | async as month">
        <div class="icon clickable" (click)="changeMonth(-1)">
          <i class="fa fa-chevron-left"></i>
        </div>
        <div class="flex has-text-centered">{{month.display}}</div>
        <div class="icon clickable" (click)="changeMonth(1)">
          <i class="fa fa-chevron-right"></i>
        </div>
      </div>
      <div class="flex-row">
        <div class="day has-text-weight-bold" *ngFor="let day of  days">{{day}}</div>
      </div>
      <div *ngFor="let weeks of dates$ | async; trackBy: indexByWeek" class="flex-row">
        <div
          (mousedown)="pickDate(day)"
          (mouseenter)="hoverDate(day)"
          (mouseleave)="hoverDate(null)"
          [class.is-today]="day.today"
          [class.is-invalid]="day.isInvalid"
          [class.is-hovered]="day.isHovered"
          [class.is-start]="day.isStart"
          [class.is-end]="day.isEnd"
          [class.has-text-grey-light]="!day.isInMonth"
          *ngFor="let day of weeks; trackBy: indexBy"
          class="day">{{day.day}}</div>
      </div>
    </div>
  </div>
</div>
`,
                styles: [`.text-center{
  text-align:center; }
.text-muted{
  color:#798E9B; }
.text-right{
  text-align:right; }
.text-left{
  text-align:left; }
.text-1{
  font-size:2em; }
.text-4{
  font-size:0.8em; }
.text-capitalize{
  text-transform:capitalize; }
.text-uppercase{
  text-transform:uppercase; }
.text-ontime{
  color:#58ae5b; }
.text-late{
  color:#E6413E; }
.text-warning{
  color:#E6413E !important; }
.text-red{
  color:#E6413E; }
.text-blue{
  color:#5496F8; }
.truncate{
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis; }
.flex-row{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:horizontal;
  -webkit-box-direction:normal;
      -ms-flex-direction:row;
          flex-direction:row; }
.flex-column{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:vertical;
  -webkit-box-direction:normal;
      -ms-flex-direction:column;
          flex-direction:column; }
.column-gap-4 > :not(:last-child){
  margin-bottom:4px; }
.row-gap-4 > :not(:last-child){
  margin-right:4px; }
.column-gap-7 > :not(:last-child){
  margin-bottom:7px; }
.row-gap-7 > :not(:last-child){
  margin-right:7px; }
.column-gap-10 > :not(:last-child){
  margin-bottom:10px; }
.row-gap-10 > :not(:last-child){
  margin-right:10px; }
.column-gap-20 > :not(:last-child){
  margin-bottom:20px; }
.row-gap-20 > :not(:last-child){
  margin-right:20px; }
.wrap{
  -ms-flex-wrap:wrap;
      flex-wrap:wrap; }
.flex{
  -webkit-box-flex:1;
      -ms-flex:1;
          flex:1; }
.auto{
  margin:auto; }
.relative{
  position:relative; }
.space-between{
  -webkit-box-pack:justify;
      -ms-flex-pack:justify;
          justify-content:space-between; }
.space-around{
  -ms-flex-pack:distribute;
      justify-content:space-around; }
.justify-center{
  -webkit-box-pack:center;
      -ms-flex-pack:center;
          justify-content:center; }
.flex-center{
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center; }
.align-center{
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center; }
.clickable{
  cursor:pointer; }
.round-icon{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  width:23px;
  height:23px;
  background:#315790;
  border-radius:50%; }
.flex-half{
  -ms-flex-preferred-size:50%;
      flex-basis:50%; }
.link-unstyled{
  color:inherit; }
  .link-unstyled:hover{
    text-decoration:none; }
.half{
  width:50%; }
.noselect{
  -webkit-touch-callout:none;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none; }
.hover-shadow:hover{
  -webkit-box-shadow:0px 0px 4px 2px rgba(0, 0, 0, 0.16);
          box-shadow:0px 0px 4px 2px rgba(0, 0, 0, 0.16); }
.marker-transparent{
  opacity:0.4; }
.marker-fade{
  -webkit-filter:contrast(16%) brightness(160%) blur(0.6px);
          filter:contrast(16%) brightness(160%) blur(0.6px); }
.tooltip-warning{
  background:#e04745;
  color:#fff; }
  .tooltip-warning-arrow{
    border-right-color:#e04745 !important; }
.tooltip-info{
  background:#5496F8;
  color:#fff; }
  .tooltip-info-arrow{
    border-right-color:#5496F8 !important; }
a{
  color:inherit;
  text-decoration:none; }
  a:hover{
    color:inherit;
    text-decoration:none; }
  a:active{
    color:inherit;
    text-decoration:none; }
  a:focus{
    outline:none;
    color:inherit;
    text-decoration:none; }
.ht-card.clickable:hover{
  background:#edeff1; }
.ht-card-container{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:vertical;
  -webkit-box-direction:normal;
      -ms-flex-direction:column;
          flex-direction:column;
  position:relative; }
  .ht-card-container .card{
    margin-bottom:-1px; }
  .ht-card-container .sub-status{
    font-size:9px;
    margin-top:-16px;
    margin-bottom:20px;
    text-align:center;
    color:#798E9B;
    text-transform:uppercase;
    padding-top:3px; }
  .ht-card-container .card-action{
    height:30px;
    background:#5496F8;
    color:#fff;
    border:1px solid #C9D6DE;
    position:relative;
    top:-3px;
    margin:0 10px;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
        -ms-flex-align:center;
            align-items:center;
    -webkit-box-pack:center;
        -ms-flex-pack:center;
            justify-content:center;
    padding:0 20px;
    border-bottom-left-radius:5px;
    border-bottom-right-radius:5px;
    text-transform:uppercase; }
    .ht-card-container .card-action:hover{
      background:#3c87f7;
      font-weight:500; }
[hidden]{
  display:none !important; }
.card-clickable{
  cursor:pointer; }
  .card-clickable:hover{
    background-color:#f2f2f2; }
.adjust-huener-wave{
  margin:0 auto;
  width:100px;
  height:20px;
  text-align:center; }
.adjust-huener-wave > div{
  background-color:#5496F8;
  height:100%;
  width:6px;
  display:inline-block;
  -webkit-animation:wave 1.2s infinite ease-in-out;
  animation:wave 1.2s infinite ease-in-out; }
.adjust-huener-wave div:nth-child(2){
  -webkit-animation-delay:-1.1s;
  animation-delay:-1.1s; }
.adjust-huener-wave div:nth-child(3){
  -webkit-animation-delay:-1.0s;
  animation-delay:-1.0s; }
.adjust-huener-wave div:nth-child(4){
  -webkit-animation-delay:-0.9s;
  animation-delay:-0.9s; }
.adjust-huener-wave div:nth-child(5){
  -webkit-animation-delay:-0.8s;
  animation-delay:-0.8s; }
@-webkit-keyframes wave{
  0%, 40%, 100%{
    -webkit-transform:scaleY(0.4); }
  20%{
    -webkit-transform:scaleY(1); } }
@keyframes wave{
  0%, 40%, 100%{
    -webkit-transform:scaleY(0.4);
            transform:scaleY(0.4); }
  20%{
    -webkit-transform:scaleY(1);
            transform:scaleY(1); } }
@media screen and (max-width: 480px){
  .hide-xs{
    display:none !important; } }
@media screen and (min-width: 480px){
  .show-xs{
    display:none !important; } }
.ht-btn{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-align:center;
      -ms-flex-align:center;
          align-items:center;
  padding:5px 13px;
  border:0;
  background:white;
  color:#52616A;
  -webkit-box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
          box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12); }
  .ht-btn:focus{
    background:#fcfcfc;
    outline:0; }
  .ht-btn-card:hover{
    background:#5496F8;
    color:rgba(255, 255, 255, 0.96);
    -webkit-box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
            box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12); }
.stopped-color{
  color:#FFBB44; }
.drive-color{
  color:#5496F8; }
.walk-color{
  color:#5496F8; }
.moving-color{
  color:#5496F8; }
.logged_off-color{
  color:#A9BAC4; }
.network_offline-color{
  color:#d19191; }
.location_disabled-color{
  color:#d19191; }
.location_low_accuracy-color{
  color:#d19191; }
.stopped-bg{
  background:#FFBB44; }
.drive-bg{
  background:#5496F8; }
.walk-bg{
  background:#5496F8; }
.moving-bg{
  background:#5496F8; }
.logged_off-bg{
  background:#A9BAC4; }
.network_offline-bg{
  background:#d19191; }
.location_disabled-bg{
  background-color:#d19191; }
.location_low_accuracy-bg{
  background-color:#d19191; }
.card-content.is-small{
  padding:10px 20px; }
.modal{
  z-index:402; }
.day{
  width:40px;
  text-align:center;
  -webkit-user-select:none;
     -moz-user-select:none;
      -ms-user-select:none;
          user-select:none;
  cursor:pointer; }
  .day:hover{
    font-weight:700; }
.is-hovered{
  background:lightgray; }
.is-start{
  background:grey;
  color:#fff;
  border-bottom-left-radius:4px;
  border-top-left-radius:4px; }
.is-end{
  background:grey;
  color:#fff;
  border-bottom-right-radius:4px;
  border-top-right-radius:4px; }
.is-invalid{
  text-decoration:line-through;
  cursor:not-allowed; }
.month{
  padding:4px 0;
  background:#ececec;
  border-radius:4px;
  margin:12px 0; }
.date-style{
  -webkit-box-pack:center;
      -ms-flex-pack:center;
          justify-content:center;
  font-size:1.1rem; }
.row-right{
  -webkit-box-orient:horizontal;
  -webkit-box-direction:reverse;
      -ms-flex-direction:row-reverse;
          flex-direction:row-reverse; }
  .row-right .options{
    padding-left:15px; }
.row-left{
  -webkit-box-orient:horizontal;
  -webkit-box-direction:normal;
      -ms-flex-direction:row;
          flex-direction:row; }
  .row-left .options{
    padding-right:15px; }
`],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
DateRangePickerComponent.ctorParameters = () => [];
DateRangePickerComponent.propDecorators = {
    "dateRange": [{ type: Input },],
    "date": [{ type: Input },],
    "options": [{ type: Input },],
    "onRangeChange": [{ type: Output },],
    "onDateChange": [{ type: Output },],
};
/**
 * @record
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DateRangePickerModule {
}
DateRangePickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    SharedModule
                ],
                declarations: [DateRangePickerComponent],
                exports: [DateRangePickerComponent]
            },] },
];
/** @nocollapse */
DateRangePickerModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DateRangeModule {
}
DateRangeModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    SharedModule,
                    DateRangePickerModule
                ],
                declarations: [DateRangeComponent],
                exports: [DateRangeComponent]
            },] },
];
/** @nocollapse */
DateRangeModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UsersFilterModule {
}
UsersFilterModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    EntitySearchModule,
                    SharedModule,
                    DateRangeModule
                ],
                declarations: [UsersFilterComponent],
                exports: [UsersFilterComponent]
            },] },
];
/** @nocollapse */
UsersFilterModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UsersMapContainerModule {
}
UsersMapContainerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    UsersContainerModule,
                    MapContainerModule,
                    UsersFilterModule
                ],
                declarations: [UsersMapContainerComponent],
                exports: [UsersMapContainerComponent]
            },] },
];
/** @nocollapse */
UsersMapContainerModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class GroupKeyResolver {
    /**
     * @param {?} groupService
     */
    constructor(groupService) {
        this.groupService = groupService;
    }
    /**
     * @param {?} next
     * @return {?}
     */
    resolve(next) {
        const /** @type {?} */ id = next.paramMap.get('id');
        const /** @type {?} */ groupKey$ = this.groupService.api.get(id).pipe(map$1((data) => {
            return data ? data.token : "test";
        }));
        // return groupKey$.take(1)
        return of(true).pipe(switchMap(() => {
            return groupKey$.pipe(take(1));
        }));
        // const key$ = this.clientService.groups.item.getListener({id}).map((group: IGroup) => {
        //   // next.data = {token: next.paramMap.get('id')};
        //   console.log(group.token, "group");
        //   return group.token
        // });
        // return key$
    }
}
GroupKeyResolver.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GroupKeyResolver.ctorParameters = () => [
    { type: HtGroupsService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class GroupLookupKeyResolver {
    /**
     * @param {?} groupService
     */
    constructor(groupService) {
        this.groupService = groupService;
    }
    /**
     * @param {?} next
     * @return {?}
     */
    resolve(next) {
        const /** @type {?} */ id = next.paramMap.get('id');
        const /** @type {?} */ groupKey$ = this.groupService.api.index({ lookup_id: id }).pipe(map$1((data) => {
            return data.results.length ? data.results[0].token : "test";
        }));
        // return groupKey$.take(1)
        return of(true).pipe(switchMap(() => {
            return groupKey$.pipe(take(1));
        }));
        // const key$ = this.clientService.groups.item.getListener({id}).map((group: IGroup) => {
        //   // next.data = {token: next.paramMap.get('id')};
        //   console.log(group.token, "group");
        //   return group.token
        // });
        // return key$
    }
}
GroupLookupKeyResolver.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GroupLookupKeyResolver.ctorParameters = () => [
    { type: HtGroupsService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class HtClientService extends HtClient {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UsersAnalyticsListComponent {
    constructor() {
        this.selectedUser = null;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} row
     * @return {?}
     */
    showUserDetail(row) {
        this.selectedUser = row.data;
    }
    /**
     * @return {?}
     */
    closeModal() {
        this.selectedUser = null;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        // this.listService.client.destroy();
        // this.listService.client.list.dataSub.unsubscribe()
    }
}
UsersAnalyticsListComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-users-analytics-list',
                template: `<!--<div class="level">-->
  <!--<div class="level-left has-text-weight-bold has-text-primary">-->
    <!--{{listService.title}}-->
  <!--</div>-->
  <!--<div class="level-right" *ngIf="!listService.hideDatePicker">-->
    <!--<ht-date-range [dateRangeService$]="listService.dateRangeService$"></ht-date-range>-->
  <!--</div>-->
<!--</div>-->
<table class="table is-fullwidth is-bordered is-hoverable">
  <thead>
  <tr>
    <th *ngFor="let column of listService.columns">{{column}}</th>
  </tr>
  </thead>
  <tbody>
  <!--<ht-data-table (select)="showUserDetail($event)" [clickable]="true" [tableData]="listService.dataTable$ | async"></ht-data-table>-->
  <tr class="clickable" (click)="showUserDetail(row)" *ngFor="let row of listService.dataTable$ | async">
    <td *ngFor="let item of row.values">{{item}}</td>
  </tr>
  </tbody>
</table>
<div class="modal is-active" *ngIf="selectedUser">
  <div class="modal-background" (click)="closeModal()"></div>
  <div class="modal-card">
    <section class="modal-card-body">
      <ht-user-table [user]="selectedUser">
        <span *ngIf="!listService.hideDatePicker">{{listService.dateRangeService$.display$ | async}}</span>
      </ht-user-table>
    </section>
  </div>
  <button class="modal-close is-large" aria-label="close" (click)="closeModal()"></button>
</div>
`,
                styles: [`.clickable:hover{
  -webkit-box-shadow:0px 0px 6px 1px #808080;
          box-shadow:0px 0px 6px 1px #808080;
  z-index:2; }
`],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
UsersAnalyticsListComponent.ctorParameters = () => [];
UsersAnalyticsListComponent.propDecorators = {
    "listService": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UserTableComponent {
    constructor() {
        this.excludedKey = [
            'name',
            'status',
            'photo',
            'created_at',
            'modified_at',
            'id',
            'availability_status',
            'location_status',
            'vehicle_type'
        ];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    get tableData() {
        // let f = tableFormat(this.user, {excludes: this.excludedKey, format: {}});
        // console.log(f, "table");
        return tableFormat(this.user, { excludes: this.excludedKey, format: userTableFormat });
        // return Object.keys(this.user).reduce((acc, key) => {
        //   const value = this.user[key];
        //   if (typeof value === 'number' || typeof value === 'string' && this.isKeyIncluded(key)) {
        //     acc.push([key, value]);
        //     return acc
        //   } else {
        //     return acc
        //   }
        // }, [])
    }
    /**
     * @return {?}
     */
    get actionData() {
        // let f = tableFormat(this.user, {excludes: this.excludedKey, format: {}});
        // console.log(f, "table");
        return tableFormat(this.user, { excludes: this.excludedKey, format: userTableFormat });
    }
    /**
     * @return {?}
     */
    get currentUser() {
        return this.action ? this.action.user : this.user;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    isKeyIncluded(key) {
        return !!!this.excludedKey.includes(key);
    }
}
UserTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-user-table',
                template: `<div class="level">
  <div class="level-left">
    <div class="level-item">
      <ht-profile [url]="user.photo"></ht-profile>
    </div>
    <div class="level-item is-size-4 has-text-grey">
      {{user.name | nameCase}}
    </div>
  </div>
  <div class="level-right">
    <ng-content></ng-content>
  </div>
</div>
<ht-data-table [tableData]="tableData"></ht-data-table>
<!--<table class="table is-fullwidth is-bordered is-striped">-->
  <!--<tbody>-->
  <!--<tr *ngFor="let row of tableData">-->
    <!--<td *ngFor="let item of row">{{item}}</td>-->
  <!--</tr>-->
  <!--</tbody>-->
<!--</table>-->
`,
                styles: [``],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
UserTableComponent.ctorParameters = () => [];
UserTableComponent.propDecorators = {
    "user": [{ type: Input },],
    "action": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DataTableComponent {
    constructor() {
        this.clickable = false;
        this.select = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} row
     * @return {?}
     */
    selectRow(row) {
        if (this.clickable) {
            this.select.next(row);
        }
    }
}
DataTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-data-table',
                template: `<table class="table is-fullwidth is-bordered is-striped">
  <tbody>
  <tr [class.clickable]="clickable" (click)="selectRow(row)" *ngFor="let row of tableData">
    <td *ngFor="let item of row">{{item}}</td>
  </tr>
  </tbody>
</table>
`,
                styles: [`.clickable:hover{
  -webkit-box-shadow:1px 1px grey;
          box-shadow:1px 1px grey;
  z-index:2; }
`],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
DataTableComponent.ctorParameters = () => [];
DataTableComponent.propDecorators = {
    "tableData": [{ type: Input },],
    "clickable": [{ type: Input },],
    "select": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DataTableModule {
}
DataTableModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [DataTableComponent],
                exports: [DataTableComponent]
            },] },
];
/** @nocollapse */
DataTableModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UserTableModule {
}
UserTableModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    SharedModule,
                    DataTableModule
                ],
                declarations: [UserTableComponent],
                exports: [UserTableComponent]
            },] },
];
/** @nocollapse */
UserTableModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UsersAnalyticsListModule {
}
UsersAnalyticsListModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    DateRangeModule,
                    UserTableModule,
                    DataTableModule,
                ],
                declarations: [UsersAnalyticsListComponent],
                exports: [UsersAnalyticsListComponent]
            },] },
];
/** @nocollapse */
UsersAnalyticsListModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// create a symbol identify the observable I add to
// the component so it doesn't conflict with anything.
// I need this so I'm able to add the desired behaviour to the component.
const destroy$ = Symbol('destroy$');
/**
 * an operator that takes until destroy it takes a components this a parameter
 * returns a lettable RxJS operator.
 */
const untilDestroy = component => (source) => {
    if (component[destroy$] === undefined) {
        // only hookup each component once.
        addDestroyObservableToComponent(component);
    }
    // pipe in the takeuntil destroy$ and return the source unaltered
    return source.pipe(takeUntil(component[destroy$]));
};
/**
 * @param {?} component
 * @return {?}
 */
function addDestroyObservableToComponent(component) {
    component[destroy$] = new Observable(observer => {
        // keep track of the original destroy function,
        // the user might do something in there
        const /** @type {?} */ orignalDestroy = component.ngOnDestroy;
        if (orignalDestroy === undefined) {
            // Angular does not support dynamic added destroy methods
            // so make sure there is one.
            throw new Error('untilDestroy operator needs the component to have an ngOnDestroy method');
        }
        // replace the ngOndestroy
        component.ngOnDestroy = () => {
            // fire off the destroy observable
            observer.next();
            // complete the observable
            observer.complete();
            // and at last, call the original destroy
            orignalDestroy.call(component);
        };
        // return cleanup function.
        return _$$1 => (component[destroy$] = undefined);
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ActionsStatusGraphComponent {
    constructor() {
        this.noData = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.service.data$.pipe(untilDestroy(this))
            .subscribe((data) => {
            this.setChart(data);
        });
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
    }
    /**
     * @param {?} data
     * @return {?}
     */
    setChart(data) {
        if (data.labels.length <= 1) {
            this.noData = true;
            return false;
        }
        if (this.chart) {
            this.noData = false;
            const /** @type {?} */ labels = data.labels;
            const /** @type {?} */ dataset = data.datasets;
            this.chart.update_values(dataset, labels);
            const /** @type {?} */ type = data.labels.length > 1 ? 'line' : 'bar';
        }
        else {
            this.chart = new Chart({
                parent: this.charElem.nativeElement,
                // or a DOM element
                // title: "Action Graph",
                data: data,
                type: 'line',
                // or 'line', 'scatter', 'pie', 'percentage'
                height: 250,
                is_series: 1,
                colors: ['#60c1fd', 'red'],
                region_fill: 1,
                // x_axis_mode: 'tick',
                format_tooltip_x: d => {
                    // console.log(d, moment(d).format('ddd, MMM Do'));
                    return d;
                    // return moment(d).format('ddd, MMM Do')
                },
                // format_label_x: d => {
                //   console.log("daa");
                //   return d
                // },
                format_tooltip_y: d => d
            });
            // this.chart.show_averages();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
    }
}
ActionsStatusGraphComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-actions-status-graph',
                template: `<!--<div class="level">-->
  <!--<div class="level-left">-->
    <!--<div class="level-item has-text-weight-bold has-text-primary">-->
      <!--{{service.title}}-->
    <!--</div>-->
  <!--</div>-->
  <!--<div class="level-right">-->
    <!--<div class="level-item">-->
      <!--<ht-date-range [showSingleDay]="false" [dateRangeService$]="service.dateRangeService$"></ht-date-range>-->
    <!--</div>-->
  <!--</div>-->
<!--</div>-->
<div #chart id="chart"></div>
<!--<div class="chart-container">-->
  <!---->
  <!--<div class="loading-page" *ngIf="service.client.loading$ | async">-->
    <!--<div class="icon auto has-text-grey-light">-->
      <!--<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>-->
    <!--</div>-->
  <!--</div>-->
  <!---->
<!--</div>-->
`,
                styles: [`#chart{
  width:100%; }
.loading-page{
  background:#ffffff96;
  position:absolute;
  height:100%;
  width:100%;
  top:0;
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex; }
.chart-container{
  min-height:300px; }
`],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
ActionsStatusGraphComponent.ctorParameters = () => [];
ActionsStatusGraphComponent.propDecorators = {
    "service": [{ type: Input },],
    "charElem": [{ type: ViewChild, args: ['chart',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ActionsStatusGraphModule {
}
ActionsStatusGraphModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    DateRangeModule,
                ],
                declarations: [ActionsStatusGraphComponent],
                exports: [ActionsStatusGraphComponent]
            },] },
];
/** @nocollapse */
ActionsStatusGraphModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UsersAnalyticsListService {
    /**
     * @param {?} config
     */
    constructor(config) {
        this.component = UsersAnalyticsListComponent;
        this.className = "is-6";
        this.tags = ['users'];
        this.initState(config);
        this.initClient(config);
    }
    /**
     * @param {?} config
     * @return {?}
     */
    initState(config) {
        this.dateRangeService$ = dateRangeFactory(config.initialDateRange || DateRangeMap.last_7_days);
        this.title = config.title;
        this.tableFormat = config.tableFormat;
        this.query = config.query;
        this.columns = this.tableFormat.map(data => data.label);
        this.hideDatePicker = config.hideDatePicker;
        if (config.tags && config.tags.length)
            this.tags = [...this.tags, ...config.tags];
    }
    /**
     * @param {?} config
     * @return {?}
     */
    initClient(config) {
        const /** @type {?} */ userClient = usersClientFactory({ dateRange$: this.dateRangeService$.data$ });
        this.client = userClient.list;
        this.client.updateStrategy = config.updateStrategy || "once";
        this.client.setQuery(this.query);
        this.loading$ = this.client.loading$;
        // this.client.setActive();
        const /** @type {?} */ data$ = this.client.dataArray$;
        this.dataTable$ = data$.pipe(filter(data => !!data), map$1((users) => {
            this.noData = users.length ? false : true;
            return users.map(user => {
                const /** @type {?} */ values = this.tableFormat.map(data => data.selector(user));
                return { data: user, values };
            });
        }));
    }
    ;
    /**
     * @param {?} instance
     * @return {?}
     */
    setData(instance) {
        instance.listService = this;
    }
    /**
     * @param {?=} isActive
     * @return {?}
     */
    setActive(isActive = true) {
        this.client.setActive(isActive);
    }
}
UsersAnalyticsListService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
UsersAnalyticsListService.ctorParameters = () => [
    null,
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UsersSummaryChartComponent {
    constructor() {
        this.noData = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} data
     * @return {?}
     */
    setChart(data) {
        if (data.labels.length <= 1) {
            this.noData = true;
            return false;
        }
        if (this.chart) {
            this.noData = false;
        }
        else {
            this.chart = new Chart({
                parent: this.charElem.nativeElement,
                // or a DOM element
                // title: this.service.title,
                data: data,
                type: 'percentage',
                // or 'line', 'scatter', 'pie', 'percentage'
                height: 150,
                // is_series: 1,
                // colors: ['yellow', 'red', 'blue', 'green', 'grey', 'pink'],
                // region_fill: 1,
                // x_axis_mode: 'tick',
                format_tooltip_x: d => d,
                format_tooltip_y: d => d
            });
        }
    }
    /**
     * @param {?} data
     * @return {?}
     */
    formatSummary(data) {
        // let labels =
        const /** @type {?} */ labels = data.chart.map(item => item.label);
        const /** @type {?} */ values = data.chart.map(item => item.value);
        return {
            labels,
            datasets: [
                {
                    values
                }
            ]
        };
    }
}
UsersSummaryChartComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-users-summary-chart',
                template: `<div class="level">
  <div class="level-left">
    <div class="level-item is-size-5" *ngIf="service.summary$ | async as summary">
      Total: {{summary.totalUsers}} {{'users'}}
    </div>
  </div>
</div>
<ng-container *ngIf="service.summary$ | async as summary">
  <ht-users-summary [summary]="summary" [selectable]="false" [hideTotal]="true"></ht-users-summary>
</ng-container>
`,
                styles: [``],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
UsersSummaryChartComponent.ctorParameters = () => [];
UsersSummaryChartComponent.propDecorators = {
    "service": [{ type: Input },],
    "charElem": [{ type: ViewChild, args: ['chart',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UsersSummaryService {
    /**
     * @param {?} config
     */
    constructor(config) {
        this.component = UsersSummaryChartComponent;
        this.className = 'is-6';
        this.tags = ['users', 'live'];
        this.hideDatePicker = true;
        this.noData = false;
        this.minHeight = 50;
        this.setState(config);
        // this.initClient()
    }
    /**
     * @param {?} instance
     * @return {?}
     */
    setData(instance) {
        instance.service = this;
    }
    /**
     * @param {?} config
     * @return {?}
     */
    setState(config) {
        this.dateRangeService$ = dateRangeFactory(DateRangeMap.last_30_days);
        this.title = config.title;
        const /** @type {?} */ client = config.client || usersClientFactory({ dateRange$: this.dateRangeService$.data$ });
        client.setShowAll();
        this.client = client.summary;
        this.loading$ = this.client.loading$;
        this.summary$ = client.listStatusChart$(config.queryLabels);
    }
    /**
     * @return {?}
     */
    destroy() {
        this.client.destroy();
    }
    /**
     * @param {?=} isActive
     * @return {?}
     */
    setActive(isActive = true) {
        this.client.setActive(isActive);
    }
}
UsersSummaryService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
UsersSummaryService.ctorParameters = () => [
    null,
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AnalyticsMapContainerComponent {
    constructor() {
        this.mapOptions = {
            scrollWheelZoom: false
        };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
AnalyticsMapContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-analytics-map-container',
                template: `<ht-map [options]="mapOptions" [loading]="service.mapLoading$ | async" [mapInstance]="service.mapInstance"></ht-map>
`,
                styles: [`:host{
  height:500px;
  width:100%; }
ht-map{
  height:400px;
  width:100%; }
`]
            },] },
];
/** @nocollapse */
AnalyticsMapContainerComponent.ctorParameters = () => [];
AnalyticsMapContainerComponent.propDecorators = {
    "service": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class StopsHeatmapService {
    /**
     * @param {?} config
     */
    constructor(config) {
        this.component = AnalyticsMapContainerComponent;
        this.className = "is-6";
        this.tags = ['users'];
        this.noData = false;
        this.loading$ = of(false);
        this.mapInstance = new MapInstance();
        this.setMapType(mapTypeService.getInstance().mapType);
        this.initClient(config);
    }
    /**
     * @param {?} mapType
     * @return {?}
     */
    setMapType(mapType) {
        this.mapInstance.setMapType(mapType);
    }
    /**
     * @param {?} instance
     * @return {?}
     */
    setData(instance) {
        instance.service = this;
    }
    ;
    /**
     * @param {?=} active
     * @return {?}
     */
    setActive(active = true) {
        this.client.setActive(active);
    }
    /**
     * @param {?} config
     * @return {?}
     */
    initClient(config) {
        this.dateRangeService$ = dateRangeFactory(config.initialDateRange || DateRangeMap.last_7_days);
        this.title = config.title;
        let /** @type {?} */ userClient = usersClientFactory({ dateRange$: this.dateRangeService$.data$ });
        this.client = userClient.heatmap;
        this.mapLoading$ = this.client.loading$;
        this.data$ = this.client.data$.pipe(tap((data) => {
            this.noData = data && data.count == 0 ? true : false;
        }));
        let /** @type {?} */ heatMapTrace = new StopsHeatmapTrace(this.mapInstance);
        heatMapTrace.setPageData$(this.data$);
    }
}
StopsHeatmapService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
StopsHeatmapService.ctorParameters = () => [
    null,
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */

/**
 * @record
 */

const usersAnalyticsListPresets = {
    /**
     * @return {?}
     */
    stops_heatmap() {
        return {
            service: StopsHeatmapService,
            initialConfig: {
                title: "Heatmap of stops by users",
                query: { page_size: 500 },
                tags: ['user behaviour'],
                initialDateRange: DateRangeMap.last_7_days
            }
        };
    },
    /**
     * @return {?}
     */
    max_location_disabled_duration() {
        return {
            service: UsersAnalyticsListService,
            initialConfig: {
                title: "Users with max location disabled duration",
                query: { ordering: "-location_disabled_duration" },
                tags: ['user behaviour', 'device health'],
                tableFormat: [
                    {
                        label: "Name",
                        /**
                         * @param {?} user
                         * @return {?}
                         */
                        selector(user) {
                            return user.name;
                        }
                    },
                    userTableFormat.location_disabled_duration,
                    {
                        label: "% of total duration",
                        /**
                         * @param {?} user
                         * @return {?}
                         */
                        selector(user) {
                            return user.total_duration && user.location_disabled_duration ?
                                (100 * (user.location_disabled_duration / user.total_duration)).toFixed(1) :
                                "NA";
                        }
                    }
                ]
            }
        };
    },
    /**
     * @return {?}
     */
    current_location_disabled() {
        return {
            service: UsersAnalyticsListService,
            initialConfig: {
                title: "Recent users with location disabled",
                query: { status: 'location_disabled', show_all: true, ordering: '-last_heartbeat' },
                updateStrategy: 'live',
                hideDatePicker: true,
                tags: ['user behaviour', 'device health', 'live'],
                tableFormat: [
                    {
                        label: "Name",
                        /**
                         * @param {?} user
                         * @return {?}
                         */
                        selector(user) {
                            return user.name;
                        }
                    },
                    userTableFormat.last_heartbeat_at
                ]
            }
        };
    },
    /**
     * @return {?}
     */
    max_stop_duration() {
        return {
            service: UsersAnalyticsListService,
            initialConfig: {
                title: "Users with max stop duration",
                query: { ordering: "-stop_duration" },
                tags: ['activity'],
                tableFormat: [
                    {
                        label: "Name",
                        /**
                         * @param {?} user
                         * @return {?}
                         */
                        selector(user) {
                            return user.name;
                        }
                    },
                    userTableFormat.stop_duration,
                    {
                        label: "% of total duration",
                        /**
                         * @param {?} user
                         * @return {?}
                         */
                        selector(user) {
                            return user.total_duration && user.stop_duration ?
                                (100 * (user.stop_duration / user.total_duration)).toFixed(1) + '%' :
                                "NA";
                        }
                    }
                ]
            }
        };
    },
    /**
     * @return {?}
     */
    max_network_offline() {
        return {
            service: UsersAnalyticsListService,
            initialConfig: {
                title: "Users with max network offline duration",
                query: { ordering: "-network_offline_duration" },
                tags: ['device health'],
                tableFormat: [
                    {
                        label: "Name",
                        /**
                         * @param {?} user
                         * @return {?}
                         */
                        selector(user) {
                            return user.name;
                        }
                    },
                    userTableFormat.network_offline_duration,
                    {
                        label: "% of total duration",
                        /**
                         * @param {?} user
                         * @return {?}
                         */
                        selector(user) {
                            return user.total_duration && user.network_offline_duration ?
                                (100 * (user.network_offline_duration / user.total_duration)).toFixed(1) + '%' :
                                "NA";
                        }
                    }
                ]
            }
        };
    },
    /**
     * @return {?}
     */
    max_distance() {
        return {
            service: UsersAnalyticsListService,
            initialConfig: {
                title: "Users with max distance travelled",
                query: { ordering: "-total_distance" },
                tags: ['distance'],
                tableFormat: [
                    {
                        label: "Name",
                        /**
                         * @param {?} user
                         * @return {?}
                         */
                        selector(user) {
                            return user.name;
                        }
                    },
                    userTableFormat.total_distance
                ]
            }
        };
    },
    /**
     * @param {?} usersClient
     * @param {?=} title
     * @param {?=} queryLabels
     * @return {?}
     */
    users_summary(usersClient, title, queryLabels) {
        return {
            service: UsersSummaryService,
            initialConfig: {
                title: title || "Users status summary",
                queryLabels,
                client: usersClient,
            }
        };
    },
    /**
     * @return {?}
     */
    last_recorded() {
        return {
            service: UsersAnalyticsListService,
            initialConfig: {
                title: "Recent active users",
                query: { ordering: "-last_heartbeat_at" },
                tags: ['live'],
                initialDateRange: DateRangeMap.last_30_days,
                hideDatePicker: true,
                tableFormat: [
                    {
                        label: "Name",
                        /**
                         * @param {?} user
                         * @return {?}
                         */
                        selector(user) {
                            return user.name;
                        }
                    },
                    userTableFormat.last_heartbeat_at
                ]
            }
        };
    },
    /**
     * @return {?}
     */
    users_actions() {
        return {
            service: UsersAnalyticsListService,
            initialConfig: {
                title: "Users with max actions",
                query: { ordering: "-num_actions" },
                tags: ['actions'],
                initialDateRange: DateRangeMap.today,
                tableFormat: [
                    {
                        label: "Name",
                        /**
                         * @param {?} user
                         * @return {?}
                         */
                        selector(user) {
                            return user.name;
                        }
                    },
                    userTableFormat.num_actions
                ]
            }
        };
    }
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ActionsStatusGraphService {
    /**
     * @param {?} config
     */
    constructor(config) {
        this.component = ActionsStatusGraphComponent;
        this.tags = ['actions'];
        this.className = "is-12";
        this.initState(config);
        this.initClient();
    }
    /**
     * @param {?} config
     * @return {?}
     */
    initState(config) {
        // console.log(config.initialDateRange);
        this.dateRangeService$ = dateRangeFactory(config.initialDateRange || DateRangeMap.last_7_days);
        this.title = config.title || "Actions graph";
        this.chartFormat = config.chartFormat;
        if (config.tags && config.tags.length)
            this.tags = [...this.tags, ...config.tags];
    }
    /**
     * @return {?}
     */
    initClient() {
        const /** @type {?} */ graphClient = actionsClientFactory({ dateRange$: this.dateRangeService$.data$ });
        this.client = graphClient.graph;
        this.loading$ = this.client.loading$;
        this.data$ = this.client.data$.pipe(filter(data => !!data), map$1((data) => {
            this.noData = data.length ? false : true;
            return this.getCompletedActionChart(data);
        }));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    getCompletedActionChart(data) {
        // const format = data.length < 15 ? 'MMM D' : "MMM D";
        const /** @type {?} */ labels = data.map((item) => {
            return format(item.created_date, 'ddd, MMM Do');
            // return moment(item.created_date).format('ddd, MMM Do')
        });
        const /** @type {?} */ datasets = this.chartFormat.map((item) => {
            return {
                title: item.title,
                values: data.map(item.selector)
            };
        });
        return {
            labels,
            datasets
        };
    }
    /**
     * @param {?} instance
     * @return {?}
     */
    setData(instance) {
        instance.service = this;
    }
    /**
     * @param {?=} isActive
     * @return {?}
     */
    setActive(isActive = true) {
        // this.client.setActive(isActive)
    }
}
ActionsStatusGraphService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ActionsStatusGraphService.ctorParameters = () => [
    null,
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ActionsAnalyticsListComponent {
    constructor() {
        this.selectedAction = null;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} row
     * @return {?}
     */
    showActionDetail(row) {
        this.selectedAction = row.data;
    }
    /**
     * @return {?}
     */
    closeModal() {
        this.selectedAction = null;
    }
}
ActionsAnalyticsListComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-actions-analytics-list',
                template: `<table class="table is-fullwidth is-bordered is-hoverable">
  <thead>
  <tr>
    <th *ngFor="let column of listService.columns">{{column}}</th>
  </tr>
  </thead>
  <tbody>
  <tr class="clickable" (click)="showActionDetail(row)" *ngFor="let row of listService.dataTable$ | async">
    <td *ngFor="let item of row.values">{{item}}</td>
  </tr>
  </tbody>
</table>
<div class="modal is-active" *ngIf="selectedAction">
  <div class="modal-background" (click)="closeModal()"></div>
  <div class="modal-card">
    <section class="modal-card-body">
      <ht-action-table [action]="selectedAction"></ht-action-table>
      <!--<ht-user-table [user]="selectedUser">-->
        <!--{{listService.dateRangeService$.display$ | async}}-->
      <!--</ht-user-table>-->
    </section>
  </div>
  <button class="modal-close is-large" aria-label="close" (click)="closeModal()"></button>
</div>
`,
                styles: [`.clickable:hover{
  -webkit-box-shadow:0px 0px 6px 1px #9f9f9f;
          box-shadow:0px 0px 6px 1px #9f9f9f;
  z-index:2; }
`],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
ActionsAnalyticsListComponent.ctorParameters = () => [];
ActionsAnalyticsListComponent.propDecorators = {
    "listService": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ActionsAnalyticsListService {
    /**
     * @param {?} config
     */
    constructor(config) {
        this.component = ActionsAnalyticsListComponent;
        this.className = "is-6";
        this.tags = ['actions'];
        this.noData = false;
        this.initState(config);
        this.initClient(config);
    }
    /**
     * @param {?} config
     * @return {?}
     */
    initState(config) {
        this.dateRangeService$ = dateRangeFactory(config.initialDateRange || DateRangeMap.last_7_days);
        this.title = config.title;
        this.tableFormat = config.tableFormat;
        this.query = config.query;
        this.columns = this.tableFormat.map(data => data.label);
        this.hideDatePicker = config.hideDatePicker;
        if (config.tags && config.tags.length)
            this.tags = [...this.tags, ...config.tags];
    }
    /**
     * @param {?} config
     * @return {?}
     */
    initClient(config) {
        const /** @type {?} */ userClient = actionsClientFactory({ dateRange$: this.dateRangeService$.data$ });
        this.client = userClient.list;
        this.client.updateStrategy = config.updateStrategy || "once";
        this.client.setQuery(this.query);
        this.loading$ = this.client.loading$;
        // this.client.setActive();
        const /** @type {?} */ data$ = this.client.dataArray$;
        this.dataTable$ = data$.pipe(filter(data => !!data), map$1((users) => {
            this.noData = (users.length === 0) ? true : false;
            return users.map(user => {
                const /** @type {?} */ values = this.tableFormat.map(data => data.selector(user));
                return { data: user, values };
            });
        }));
    }
    ;
    /**
     * @param {?} instance
     * @return {?}
     */
    setData(instance) {
        instance.listService = this;
    }
    /**
     * @param {?=} isActive
     * @return {?}
     */
    setActive(isActive = true) {
        this.client.setActive(isActive);
    }
}
ActionsAnalyticsListService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ActionsAnalyticsListService.ctorParameters = () => [
    null,
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ActionsSummaryChartComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
ActionsSummaryChartComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-actions-summary-chart',
                template: `<div class="level">
  <div class="level-left">
    <div class="level-item is-size-5 has-text-grey" *ngIf="service.summary$ | async as summary">
      Total: {{summary.totalUsers}} actions
    </div>
  </div>
</div>
<ng-container *ngIf="service.summary$ | async as summary">
  <ht-users-summary [summary]="summary" [selectable]="false" [hideTotal]="true"></ht-users-summary>
</ng-container>
`,
                styles: [``],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
ActionsSummaryChartComponent.ctorParameters = () => [];
ActionsSummaryChartComponent.propDecorators = {
    "service": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ActionsSummaryService {
    /**
     * @param {?} config
     */
    constructor(config) {
        this.component = ActionsSummaryChartComponent;
        this.className = "is-6";
        this.tags = ['actions', 'live'];
        this.hideDatePicker = false;
        this.noData = false;
        this.minHeight = 50;
        this.initState(config);
    }
    /**
     * @param {?} instance
     * @return {?}
     */
    setData(instance) {
        instance.service = this;
    }
    /**
     * @param {?} config
     * @return {?}
     */
    initState(config) {
        this.dateRangeService$ = dateRangeFactory(DateRangeMap.today);
        this.title = config.title;
        const /** @type {?} */ client = config.client || actionsClientFactory({ dateRange$: this.dateRangeService$.data$ });
        if (config.dateRangeService)
            this.dateRangeService$ = config.dateRangeService;
        this.client = client.summary;
        this.loading$ = this.client.loading$;
        this.summary$ = this.client.summaryChart$;
        // this.client.setActive()
    }
    /**
     * @param {?=} isActive
     * @return {?}
     */
    setActive(isActive = true) {
        this.client.setActive(isActive);
    }
}
ActionsSummaryService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ActionsSummaryService.ctorParameters = () => [
    null,
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ActionsHeatmapService {
    /**
     * @param {?} config
     */
    constructor(config) {
        this.component = AnalyticsMapContainerComponent;
        this.className = "is-6";
        this.tags = ['actions'];
        this.noData = false;
        this.loading$ = of(false);
        this.mapInstance = new MapInstance();
        this.setMapType(mapTypeService.getInstance().mapType);
        this.initClient(config);
    }
    /**
     * @param {?} mapType
     * @return {?}
     */
    setMapType(mapType) {
        this.mapInstance.setMapType(mapType);
    }
    /**
     * @param {?} instance
     * @return {?}
     */
    setData(instance) {
        instance.service = this;
    }
    ;
    /**
     * @param {?=} active
     * @return {?}
     */
    setActive(active = true) {
        this.client.setActive(active);
    }
    /**
     * @param {?} config
     * @return {?}
     */
    initClient(config) {
        this.dateRangeService$ = dateRangeFactory(config.initialDateRange || DateRangeMap.last_7_days);
        this.title = config.title;
        let /** @type {?} */ actionsClient = actionsClientFactory({ dateRange$: this.dateRangeService$.data$ });
        this.client = actionsClient.heatmap;
        this.mapLoading$ = this.client.loading$;
        this.data$ = this.client.data$.pipe(tap((data) => {
            this.noData = data && data.count == 0 ? true : false;
        }));
        let /** @type {?} */ heatMapTrace = new ActionsHeatmapTrace(this.mapInstance);
        heatMapTrace.setPageData$(this.data$);
    }
}
ActionsHeatmapService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ActionsHeatmapService.ctorParameters = () => [
    null,
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const actionsConfigPreset = {
    /**
     * @return {?}
     */
    heatmap() {
        return {
            service: ActionsHeatmapService,
            initialConfig: {
                title: "Heatmap of completed actions",
                initialDateRange: DateRangeMap.last_7_days,
                query: { page_size: 500 }
            }
        };
    },
    /**
     * @return {?}
     */
    status() {
        return {
            service: ActionsStatusGraphService,
            initialConfig: {
                title: "Actions status chart",
                initialDateRange: DateRangeMap.last_30_days,
                tags: [],
                chartFormat: [
                    {
                        title: "Assigned",
                        /**
                         * @param {?} graphData
                         * @return {?}
                         */
                        selector(graphData) {
                            return graphData.assigned;
                        }
                    },
                    {
                        title: "Completed",
                        /**
                         * @param {?} graphData
                         * @return {?}
                         */
                        selector(graphData) {
                            return graphData.completed;
                        }
                    },
                ]
            }
        };
    },
    /**
     * @return {?}
     */
    max_distance() {
        return {
            service: ActionsAnalyticsListService,
            initialConfig: {
                title: "Actions with max distance",
                tags: ['distance'],
                query: { ordering: '-distance' },
                tableFormat: [
                    {
                        label: "id",
                        /**
                         * @param {?} action
                         * @return {?}
                         */
                        selector(action) {
                            return action.lookup_id || "NA";
                        }
                    },
                    {
                        label: "Type",
                        /**
                         * @param {?} action
                         * @return {?}
                         */
                        selector(action) {
                            return action.type;
                        }
                    },
                    actionTableFormat.distance,
                    actionTableFormat.duration
                ]
            }
        };
    },
    /**
     * @return {?}
     */
    recently_assigned() {
        return {
            service: ActionsAnalyticsListService,
            initialConfig: {
                title: "Recent assigned actions",
                tags: ['live'],
                query: { ordering: '-assigned_at', status: 'assigned,started' },
                updateStrategy: "live",
                hideDatePicker: true,
                initialDateRange: DateRangeMap.last_30_days,
                tableFormat: [
                    {
                        label: "User",
                        /**
                         * @param {?} action
                         * @return {?}
                         */
                        selector(action) {
                            return action.user ? NameCase(action.user.name) : "NA";
                        }
                    },
                    {
                        label: "Type",
                        /**
                         * @param {?} action
                         * @return {?}
                         */
                        selector(action) {
                            return action.type;
                        }
                    },
                    actionTableFormat.assigned_at,
                    {
                        label: "Expected at",
                        /**
                         * @param {?} action
                         * @return {?}
                         */
                        selector(action) {
                            return action.expected_at ?
                                TimeString(action.expected_at) + " " + DateString(action.expected_at, 'short') : action.eta ?
                                TimeString(action.eta) + " " + DateString(action.eta, 'short') : "--";
                        }
                    },
                    {
                        label: "Distance remaining",
                        /**
                         * @param {?} action
                         * @return {?}
                         */
                        selector(action) {
                            return action.display.distance_remaining ? DistanceLocale(action.display.distance_remaining) : "--";
                        }
                    }
                ]
            }
        };
    },
    /**
     * @return {?}
     */
    recently_completed() {
        return {
            service: ActionsAnalyticsListService,
            initialConfig: {
                title: "Recent completed actions",
                tags: ['live'],
                query: { ordering: '-completed_at', status: 'completed' },
                updateStrategy: "live",
                hideDatePicker: true,
                initialDateRange: DateRangeMap.last_30_days,
                tableFormat: [
                    {
                        label: "User",
                        /**
                         * @param {?} action
                         * @return {?}
                         */
                        selector(action) {
                            return action.user ? NameCase(action.user.name) : "NA";
                        }
                    },
                    {
                        label: "Type",
                        /**
                         * @param {?} action
                         * @return {?}
                         */
                        selector(action) {
                            return action.type;
                        }
                    },
                    actionTableFormat.completed_at,
                    {
                        label: "Ontime",
                        /**
                         * @param {?} action
                         * @return {?}
                         */
                        selector(action) {
                            return action.display.is_late ? "Late" : "Ontime";
                        }
                    },
                    actionTableFormat['distance&duration']
                ]
            }
        };
    },
    /**
     * @return {?}
     */
    max_duration() {
        return {
            service: ActionsAnalyticsListService,
            initialConfig: {
                title: "Actions with max duration",
                query: { ordering: '-duration' },
                tableFormat: [
                    {
                        label: "User",
                        /**
                         * @param {?} action
                         * @return {?}
                         */
                        selector(action) {
                            return action.user ? NameCase(action.user.name) : "NA";
                        }
                    },
                    {
                        label: "Type",
                        /**
                         * @param {?} action
                         * @return {?}
                         */
                        selector(action) {
                            return action.type;
                        }
                    },
                    actionTableFormat.duration,
                    actionTableFormat.distance
                ]
            }
        };
    },
    /**
     * @return {?}
     */
    users_on_action() {
        return {
            service: ActionsAnalyticsListService,
            initialConfig: {
                title: "Recent user on action",
                query: { ordering: '-assigned_at' },
                tags: ['users', 'live'],
                updateStrategy: 'live',
                hideDatePicker: true,
                tableFormat: [
                    {
                        label: "Name",
                        /**
                         * @param {?} action
                         * @return {?}
                         */
                        selector(action) {
                            return action.user ? action.user.name : "NA";
                        }
                    },
                    actionTableFormat.assigned_at,
                    {
                        label: "Last updated at",
                        /**
                         * @param {?} action
                         * @return {?}
                         */
                        selector(action) {
                            return action.user ? TimeString(action.user.last_heartbeat_at) : "--";
                        }
                    },
                    {
                        label: "Action type",
                        /**
                         * @param {?} action
                         * @return {?}
                         */
                        selector(action) {
                            return action.type;
                        }
                    },
                    {
                        label: "Expected At",
                        /**
                         * @param {?} action
                         * @return {?}
                         */
                        selector(action) {
                            return action.expected_at ?
                                TimeString(action.expected_at) + " " + DateString(action.expected_at, 'short') : action.eta ?
                                TimeString(action.eta) + " " + DateString(action.eta, 'short') : "--";
                        }
                    }
                ]
            }
        };
    },
    /**
     * @param {?=} actionsClient
     * @param {?=} dateRangeService
     * @param {?=} title
     * @param {?=} queryLabels
     * @return {?}
     */
    summary(actionsClient, dateRangeService$$1, title, queryLabels) {
        return {
            service: ActionsSummaryService,
            initialConfig: {
                title: title || "Actions status summary",
                updateStrategy: 'live',
                tags: ['live'],
                query: {},
                queryLabels,
                dateRangeService: dateRangeService$$1,
                client: actionsClient
            }
        };
    }
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AnalyticsItemsService {
    constructor() {
        this.chosenItemCreater = [];
        this.selectedTags$ = new BehaviorSubject([]);
        const /** @type {?} */ usersClient = usersClientFactory({ dateRange$: dateRangeFactory(DateRangeMap.today).data$ });
        const /** @type {?} */ usersFilter = usersClient.filterClass;
        const /** @type {?} */ activityQueryLabel = usersFilter.activityQueryArray;
        const /** @type {?} */ showAllQueryLable = usersFilter.showAllQueryArray;
        const /** @type {?} */ actionDateRangeService = dateRangeFactory(DateRangeMap.today);
        const /** @type {?} */ actionsClient = actionsClientFactory({ dateRange$: actionDateRangeService.data$ });
        this.presets = [
            // actionsConfigPreset.max_distance(),
            // actionsConfigPreset.max_duration(),
            actionsConfigPreset["summary"](actionsClient, actionDateRangeService),
            // usersAnalyticsListPresets.users_summary(usersClient),
            usersAnalyticsListPresets["users_summary"](usersClient, 'Users activity summary', [...activityQueryLabel, ...showAllQueryLable]),
            actionsConfigPreset["status"](),
            actionsConfigPreset["heatmap"](),
            usersAnalyticsListPresets["stops_heatmap"](),
            actionsConfigPreset["recently_assigned"](),
            actionsConfigPreset["recently_completed"](),
            // actionsConfigPreset.users_on_action(),
            usersAnalyticsListPresets["last_recorded"](),
            usersAnalyticsListPresets["users_actions"](),
            usersAnalyticsListPresets["max_location_disabled_duration"](),
            usersAnalyticsListPresets["current_location_disabled"](),
            usersAnalyticsListPresets["max_stop_duration"](),
            // usersAnalyticsListPresets.max_network_offline(),
            usersAnalyticsListPresets["max_distance"](),
        ];
        this.chosenItemCreater = this.presets;
    }
    ;
    /**
     * @return {?}
     */
    initPresets() {
        if (!this.items$) {
            this.items$ = new BehaviorSubject(this.getItems(this.presets));
            this.allTags$ = this.items$.pipe(map$1(items => {
                this.totalTags = items.length;
                return items.reduce((tags, item) => {
                    const /** @type {?} */ itemTags = item.tags;
                    return itemTags.reduce((currentTags, tag) => {
                        return currentTags.includes(tag) ? currentTags : [...currentTags, tag];
                    }, tags);
                    // return tags.includes()
                }, ['users', 'actions']);
            }));
            this.filteredItems$ = combineLatest(this.items$, this.selectedTags$, (items, tags) => {
                return tags.length ? items.filter((item) => {
                    return tags.reduce((pass, selectedTag) => {
                        return pass && item.tags.includes(selectedTag);
                    }, true);
                    // return tags.reduce((pass, existingTag) => {
                    //   return pass || item.tags.includes(existingTag)
                    // }, false)
                }) : items;
            });
            this.tags$ = combineLatest(this.allTags$, this.selectedTags$, (allTags, selectedTags) => {
                return allTags.map(tag => {
                    const /** @type {?} */ isActive = selectedTags.includes(tag);
                    return { key: tag, isActive };
                });
            });
        }
    }
    /**
     * @param {?} itemCreator
     * @return {?}
     */
    isItemCreatorActive(itemCreator) {
        return this.chosenItemCreater.includes(itemCreator);
    }
    /**
     * @param {?} tag
     * @return {?}
     */
    toggleTag(tag) {
        this.selectedTags$.pipe(take(1))
            .subscribe((tags) => {
            if (tags.includes(tag)) {
                tags.splice(tags.indexOf(tag), 1);
            }
            else {
                tags.push(tag);
            }
            // if (tags.includes(tag)) {
            //   tags = []
            // } else {
            //   tags = [tag]
            // }
            // if (tags.length === this.totalTags) {
            //   tags = [];
            // }
            this.selectedTags$.next([...tags]);
        });
    }
    ;
    /**
     * @param {?} tag
     * @return {?}
     */
    selectTag(tag) {
        this.selectedTags$.pipe(take(1))
            .subscribe((tags) => {
            if (tags.includes(tag)) {
                tags.splice(tags.indexOf(tag), 1);
            }
            else {
                tags = [tag];
            }
            // if (tags.length === this.totalTags) {
            //   tags = [];
            // }
            this.selectedTags$.next([...tags]);
        });
    }
    /**
     * @param {?} choosenPreset
     * @return {?}
     */
    setPreset(choosenPreset) {
        this.items$.next(this.getItems(choosenPreset));
        this.initServices();
    }
    /**
     * @param {?} itemsConfigs
     * @return {?}
     */
    getItems(itemsConfigs) {
        return itemsConfigs.map(preset => {
            const /** @type {?} */ service = new preset.service(preset.initialConfig);
            return service;
        });
    }
    ;
    /**
     * @return {?}
     */
    initServices() {
        this.setServicesActive(true);
    }
    /**
     * @param {?=} isActive
     * @return {?}
     */
    setServicesActive(isActive = true) {
        this.items$.pipe(take(1)).subscribe((items) => {
            items.forEach(item => {
                item.setActive(isActive);
            });
        });
    }
    /**
     * @return {?}
     */
    destroy() {
        this.setServicesActive(false);
    }
}
AnalyticsItemsService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AnalyticsItemsService.ctorParameters = () => [];
/**
 * @record
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AnalyticsContainerComponent {
    /**
     * @param {?} analyticsItemsService
     */
    constructor(analyticsItemsService) {
        this.analyticsItemsService = analyticsItemsService;
        this.configure = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.analyticsItemsService.initPresets();
        this.analyticsItemsService.initServices();
    }
    /**
     * @return {?}
     */
    openConfig() {
        this.configure = true;
    }
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    trackByFn(index, item) {
        return item.title; // or item.id
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.analyticsItemsService.destroy();
    }
}
AnalyticsContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-analytics-container',
                template: `<div class="toolbar">
  <div class="level">
    <div class="level-left">
      <!--<div class="level-item">-->
        <!--<div class="icon">-->
          <!--<i class="fa fa-tags has-text-grey"></i>-->
        <!--</div>-->
        <!--Filter by Tags:-->
      <!--</div>-->
      <div class="level-item">
        <div class="dropdown is-hoverable">
          <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
              <span class="icon">
                <i class="fa fa-tags has-text-grey"></i>
              </span>
              <span>Filter by Tags:</span>
              <span class="icon is-small">
        <i class="fa fa-angle-down" aria-hidden="true"></i>
      </span>
            </button>
          </div>
          <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <a (click)="analyticsItemsService.toggleTag(tag.key)" class="dropdown-item" *ngFor="let tag of analyticsItemsService.tags$ | async">
                <label class="checkbox">
                  <input type="checkbox" [checked]="tag.isActive">
                  {{tag.key}}
                </label>
              </a>
              <!--<a class="dropdown-item">-->
                <!--Other dropdown item-->
              <!--</a>-->
              <!--<a href="#" class="dropdown-item is-active">-->
                <!--Active dropdown item-->
              <!--</a>-->
              <!--<a href="#" class="dropdown-item">-->
                <!--Other dropdown item-->
              <!--</a>-->
              <!--<hr class="dropdown-divider">-->
              <!--<a href="#" class="dropdown-item">-->
                <!--With a divider-->
              <!--</a>-->
            </div>
          </div>
        </div>
      </div>
      <div class="level-item" *ngFor="let tag of analyticsItemsService.tags$ | async">
        <button
          class="button"
          [class.is-primary]="tag.isActive"
          (click)="analyticsItemsService.selectTag(tag.key)">
          <span>{{tag.key}}</span>
          <span *ngIf="tag.isActive" class="icon is-small">
              <i class="fa fa-times"></i>
            </span>
        </button>
        <!--<span class="tag clickable is-medium"-->
              <!--(click)="analyticsItemsService.selectTag(tag.key)"-->
              <!--[class.is-primary]="tag.isActive">-->
          <!--{{tag.key}} <span *ngIf="tag.isActive" class="delete"></span>-->
        <!--</span>-->
      </div>
    </div>
    <div class="level-right">
      <div class="level-item">
        <button class="button" (click)="openConfig()">
        <span class="icon">
          <i class="fa fa-edit"></i>
        </span>
          <span>Edit</span>
        </button>
      </div>
    </div>
  </div>
</div>
<div class="container">
  <div class="columns is-multiline is-centered" *ngIf="analyticsItemsService.filteredItems$ | async as items">
    <div class="column" [@card-appear] [ngClass]="item.className" *ngFor="let item of items">
      <div class="card card-content">
        <ht-analytics-tags
          (selectTag)="analyticsItemsService.toggleTag($event)"
          [tags]="item.tags"
          [selectedTags]="analyticsItemsService.selectedTags$ | async"></ht-analytics-tags>
        <ht-analytics-title
          [title]="item.title"
          [hideDatePicker]="item.hideDatePicker"
          [dateRangeService$]="item.dateRangeService$"></ht-analytics-title>
        <ht-analytics-item-load [minHeight]="item.minHeight" [loading$]="item.loading$" [noData]="item.noData">
          <ht-analytics-item [item]="item"></ht-analytics-item>
        </ht-analytics-item-load>
      </div>
    </div>
    <div class="column is-6 auto setup" *ngIf="items.length == 0">
      <div class="is-size-1 has-text-centered has-text-grey-light">No view is selected</div>
    </div>
    <div class="modal is-active" *ngIf="configure">
      <div class="modal-background" (click)="configure = false"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Choose preset views</p>
        </header>
        <section class="modal-card-body">
          <ht-analytics-selector (selected)="configure = false"></ht-analytics-selector>
        </section>
      </div>
    </div>
  </div>
</div>
`,
                styles: [`.setup{
  margin-top:70px; }
.toolbar{
  width:100%;
  padding:16px 40px;
  margin-bottom:20px;
  background:white;
  border-bottom:1px solid #d6d6d6; }
.grid{
  display:grid;
  grid-template-columns:1fr 1fr; }
  .grid .is-6{
    width:100%; }
  .grid .is-12{
    grid-column:1/3; }
`],
                // changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [
                    trigger('card-appear', [
                        transition(":enter", [
                            style({ width: 0, height: 0, opacity: 0 }),
                            animate('200ms ease-in-out', style({ width: "*", height: "*", opacity: 1 }))
                        ]),
                        transition(":leave", [
                            style({ width: "*", height: "*", opacity: 0 }),
                            animate('200ms ease-in-out', style({ width: 0, height: 0, opacity: 0 }))
                        ]),
                    ])
                ]
            },] },
];
/** @nocollapse */
AnalyticsContainerComponent.ctorParameters = () => [
    { type: AnalyticsItemsService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AnalyticsSlotDirective {
    /**
     * @param {?} viewContainerRef
     */
    constructor(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
}
AnalyticsSlotDirective.decorators = [
    { type: Directive, args: [{
                selector: '[htAnalyticsSlot]'
            },] },
];
/** @nocollapse */
AnalyticsSlotDirective.ctorParameters = () => [
    { type: ViewContainerRef, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AnalyticsItemComponent {
    /**
     * @param {?} componentFactoryResolver
     */
    constructor(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.addComponent();
    }
    /**
     * @return {?}
     */
    addComponent() {
        const /** @type {?} */ componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.item.component);
        const /** @type {?} */ viewContainerRef = this.slot.viewContainerRef;
        viewContainerRef.clear();
        const /** @type {?} */ componentRef = viewContainerRef.createComponent(componentFactory);
        this.item.setData(componentRef.instance);
    }
}
AnalyticsItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-analytics-item',
                template: `<div htAnalyticsSlot></div>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
AnalyticsItemComponent.ctorParameters = () => [
    { type: ComponentFactoryResolver, },
];
AnalyticsItemComponent.propDecorators = {
    "slot": [{ type: ViewChild, args: [AnalyticsSlotDirective,] },],
    "item": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AnalyticsSelectorComponent {
    /**
     * @param {?} analyticsItemsService
     */
    constructor(analyticsItemsService) {
        this.analyticsItemsService = analyticsItemsService;
        this.selected = new EventEmitter();
        this.choosenPreset = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.choosenPreset.push(...this.analyticsItemsService.presets);
        // setTimeout(() => {
        //   this.setPreset()
        // });
    }
    /**
     * @param {?} preset
     * @return {?}
     */
    isActive(preset) {
        return this.choosenPreset.includes(preset);
    }
    /**
     * @param {?} preset
     * @return {?}
     */
    togglePreset(preset) {
        if (this.isActive(preset)) {
            const /** @type {?} */ index = this.choosenPreset.indexOf(preset);
            this.choosenPreset.splice(index, 1);
        }
        else {
            this.choosenPreset.push(preset);
        }
    }
    ;
    /**
     * @return {?}
     */
    setPreset() {
        this.analyticsItemsService.setPreset(this.choosenPreset);
        this.selected.next(true);
    }
}
AnalyticsSelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-analytics-selector',
                template: `<!--<div class="card">-->
  <!--<div class="card-header">-->
    <!--<div class="card-header-title">-->
      <!--Choose preset views-->
    <!--</div>-->
  <!--</div>-->
  <!--<div class="card-content">-->
    <!---->
  <!--</div>-->
<!--</div>-->
<div class="field" *ngFor="let preset of analyticsItemsService.presets">
  <div class="control">
    <label class="checkbox">
      <input type="checkbox" (click)="togglePreset(preset)" [checked]="isActive(preset)">
      {{preset.initialConfig.title}}
    </label>
  </div>
</div>
<div class="field">
  <div class="control">
    <button class="button" (click)="setPreset()">Create views</button>
  </div>
</div>
`,
                styles: [``],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
AnalyticsSelectorComponent.ctorParameters = () => [
    { type: AnalyticsItemsService, },
];
AnalyticsSelectorComponent.propDecorators = {
    "selected": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UsersSummaryChartModule {
}
UsersSummaryChartModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    UsersSummaryModule,
                ],
                declarations: [UsersSummaryChartComponent],
                exports: [UsersSummaryChartComponent]
            },] },
];
/** @nocollapse */
UsersSummaryChartModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AnalyticsTagsComponent {
    constructor() {
        this.remove = new EventEmitter();
        this.selectTag = new EventEmitter();
        this.edit = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} tag
     * @return {?}
     */
    isTagActive(tag) {
        return this.selectedTags.includes(tag);
    }
}
AnalyticsTagsComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-analytics-tags',
                template: `<div class="level">
  <div class="level-left">
    <div class="level-item">
      <div class="icon">
        <i class="fa fa-tag has-text-grey"></i>
      </div>
    </div>
    <div class="level-item">
      <div class="tags">
        <span class="tag clickable" (click)="selectTag.next(tag)" [class.is-primary]="isTagActive(tag)" *ngFor="let tag of tags">
          {{tag}}
          <span class="icon" *ngIf="tag === 'live'">
            &nbsp;
            <i class="fa fa-circle" style="color: #99d8ac;"></i>
          </span>
        </span>
      </div>
    </div>
  </div>
  <!--<div class="level-right">-->
    <!--<div class="level-item">-->
      <!--<div class="dropdown is-hoverable is-right">-->
        <!--<div class="dropdown-trigger">-->
          <!--<button class="button is-white has-text-grey" aria-haspopup="true" aria-controls="dropdown-menu4">-->
        <!--<span class="icon">-->
          <!--<i class="fa fa-ellipsis-v"></i>-->
        <!--</span>-->
          <!--</button>-->
        <!--</div>-->
        <!--<div class="dropdown-menu" id="dropdown-menu4" role="menu">-->
          <!--<div class="dropdown-content">-->
            <!--<a class="dropdown-item flex-row align-center">-->
              <!--<span class="icon"><i class="fa fa-edit"></i></span>-->
              <!--<span class="flex">Edit</span>-->
            <!--</a>-->
            <!--<a class="dropdown-item flex-row align-center has-text-danger">-->
              <!--<span class="icon"><i class="fa fa-remove"></i></span>-->
              <!--<span class="flex">Remove</span>-->
            <!--</a>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
  <!--</div>-->
</div>
`,
                styles: [`.level{
  margin-bottom:10px; }
`],
                changeDetection: ChangeDetectionStrategy.OnPush,
            },] },
];
/** @nocollapse */
AnalyticsTagsComponent.ctorParameters = () => [];
AnalyticsTagsComponent.propDecorators = {
    "tags": [{ type: Input },],
    "selectedTags": [{ type: Input },],
    "remove": [{ type: Output },],
    "selectTag": [{ type: Output },],
    "edit": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AnalyticsTagsModule {
}
AnalyticsTagsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [AnalyticsTagsComponent],
                exports: [
                    AnalyticsTagsComponent
                ]
            },] },
];
/** @nocollapse */
AnalyticsTagsModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ActionTableComponent {
    constructor() {
        this.excludedKey = [
            'type',
            'lookup_id',
            'id',
            'short_code',
            'vehicle_type',
            'status',
            "created_at",
            "modified_at",
            'sub_status',
            'started_at',
            'tracking_url'
        ];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    get tableData() {
        // let f = tableFormat(this.action, {excludes: this.excludedKey, format: {}});
        // console.log(f, "table");
        return tableFormat(this.action, { excludes: this.excludedKey, format: actionTableFormat });
        // return Object.keys(this.user).reduce((acc, key) => {
        //   const value = this.user[key];
        //   if (typeof value === 'number' || typeof value === 'string' && this.isKeyIncluded(key)) {
        //     acc.push([key, value]);
        //     return acc
        //   } else {
        //     return acc
        //   }
        // }, [])
    }
}
ActionTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-action-table',
                template: `<div class="level">
  <div class="level-right has-text-grey">
    <div class="level-item">
      <div class="icon-box">
        <i class="fa fa-briefcase"></i>
      </div>
      <!--<span class="fa-stack fa-lg">-->
          <!--<i class="fa fa-square-o fa-stack-2x"></i>-->
          <!--<i class="fa fa-briefcase fa-stack-1x"></i>-->
        <!--</span>-->
    </div>
    <div class="level-item is-size-4 is-capitalized">
      {{action.type}}
      <!--<span *ngIf="action.display.duration_remaining && action.display.show_summary">-->
        <!--{{action.display.duration_remaining | HMString}}-->
      <!--</span>-->
    </div>
    <div class="level-item is-size-4">
      {{action.display.status_text}}
    </div>
    <div class="level-item is-size-4">
      {{action.display.sub_status_text}}
    </div>
  </div>
  <div class="level-left">
    # {{action.lookup_id}}
  </div>
</div>
<ht-data-table [tableData]="tableData"></ht-data-table>
<ht-user-table [user]="action.user"></ht-user-table>
`,
                styles: [`.icon-box{
  width:30px;
  height:30px;
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  border:1px solid grey;
  border-radius:50%; }
  .icon-box .fa{
    margin:auto; }
`],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
ActionTableComponent.ctorParameters = () => [];
ActionTableComponent.propDecorators = {
    "action": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ActionTableModule {
}
ActionTableModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    UserTableModule,
                    DataTableModule,
                    SharedModule
                ],
                declarations: [ActionTableComponent],
                exports: [ActionTableComponent]
            },] },
];
/** @nocollapse */
ActionTableModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ActionsAnalyticsListModule {
}
ActionsAnalyticsListModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    DateRangeModule,
                    ActionTableModule
                ],
                declarations: [ActionsAnalyticsListComponent],
                exports: [ActionsAnalyticsListComponent]
            },] },
];
/** @nocollapse */
ActionsAnalyticsListModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ActionsSummaryChartModule {
}
ActionsSummaryChartModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    UsersSummaryModule,
                ],
                declarations: [ActionsSummaryChartComponent],
                exports: [ActionsSummaryChartComponent]
            },] },
];
/** @nocollapse */
ActionsSummaryChartModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AnalyticsTitleComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
AnalyticsTitleComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-analytics-title',
                template: `<div class="level">
  <div class="level-left">
    <div class="level-item has-text-weight-bold has-text-primary is-size-4">
      {{title}}
    </div>
  </div>
  <div class="level-right">
    <ng-content></ng-content>
    <div class="level-item" *ngIf="!hideDatePicker">
      <ht-date-range [isRight]="true" [dateRangeService$]="dateRangeService$"></ht-date-range>
    </div>
  </div>
</div>
`,
                styles: [`.level{
  margin-bottom:10px; }
`]
            },] },
];
/** @nocollapse */
AnalyticsTitleComponent.ctorParameters = () => [];
AnalyticsTitleComponent.propDecorators = {
    "title": [{ type: Input },],
    "dateRangeService$": [{ type: Input },],
    "hideDatePicker": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AnalyticsItemLoadComponent {
    constructor() {
        this.noData = false;
    }
    /**
     * @return {?}
     */
    get _minHeight() {
        return this.minHeight || 300;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
AnalyticsItemLoadComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-analytics-item-load',
                template: `<div class="loading-container" [style.min-height.px]="_minHeight">
  <ng-content></ng-content>
  <div class="loading-page" *ngIf="loading$ | async">
    <div class="icon auto has-text-grey-light">
      <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
    </div>
  </div>
  <div class="loading-page" *ngIf="noData">
    <div class="auto has-text-grey-light is-size-1">
      No Data
    </div>
  </div>
</div>
`,
                styles: [`.loading-page{
  background:#ffffff96;
  position:absolute;
  height:100%;
  width:100%;
  top:0;
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  z-index:600; }
.loading-container{
  position:relative; }
`],
                changeDetection: ChangeDetectionStrategy.OnPush,
            },] },
];
/** @nocollapse */
AnalyticsItemLoadComponent.ctorParameters = () => [];
AnalyticsItemLoadComponent.propDecorators = {
    "loading$": [{ type: Input },],
    "minHeight": [{ type: Input },],
    "noData": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AnalyticsItemLoadModule {
}
AnalyticsItemLoadModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [AnalyticsItemLoadComponent],
                exports: [AnalyticsItemLoadComponent]
            },] },
];
/** @nocollapse */
AnalyticsItemLoadModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AnalyticsMapContainerModule {
}
AnalyticsMapContainerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MapModule
                ],
                declarations: [AnalyticsMapContainerComponent],
                exports: [AnalyticsMapContainerComponent]
            },] },
];
/** @nocollapse */
AnalyticsMapContainerModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AnalyticsContainerModule {
}
AnalyticsContainerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    ActionsStatusGraphModule,
                    UsersAnalyticsListModule,
                    UsersSummaryChartModule,
                    AnalyticsTagsModule,
                    ActionsAnalyticsListModule,
                    ActionsSummaryChartModule,
                    AnalyticsItemLoadModule,
                    DateRangeModule,
                    AnalyticsMapContainerModule
                ],
                declarations: [
                    AnalyticsContainerComponent,
                    AnalyticsSlotDirective,
                    AnalyticsItemComponent,
                    AnalyticsSelectorComponent,
                    AnalyticsTitleComponent
                ],
                exports: [
                    AnalyticsContainerComponent,
                    AnalyticsSlotDirective,
                    AnalyticsItemComponent,
                    AnalyticsSelectorComponent
                ],
                entryComponents: [
                    UsersAnalyticsListComponent,
                    ActionsStatusGraphComponent,
                    UsersSummaryChartComponent,
                    ActionsAnalyticsListComponent,
                    ActionsSummaryChartComponent,
                    AnalyticsMapContainerComponent
                ],
                providers: [AnalyticsItemsService]
            },] },
];
/** @nocollapse */
AnalyticsContainerModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class HtRequestService extends HtRequest {
    /**
     * @param {?} http
     */
    constructor(http) {
        super();
        this.http = http;
    }
    /**
     * @template T
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    getObservable(url, options = {}) {
        const /** @type {?} */ headers = super.headerObj();
        return this.http.get(url, Object.assign({ headers }, options));
    }
    /**
     * @template T
     * @param {?} url
     * @param {?} body
     * @param {?=} options
     * @return {?}
     */
    postObservable(url, body, options = {}) {
        const /** @type {?} */ headers = super.headerObj();
        return this.http.post(url, body, Object.assign({ headers }, options));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class HtAccountService extends AccountsClient {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class HtActionsService extends HtActionsClient {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TOKEN = new InjectionToken('app.token');
/**
 * @param {?} token
 * @param {?} http
 * @return {?}
 */
function clientServiceFactory(token, http) {
    const /** @type {?} */ request = new HtRequestService(http);
    htRequestService.setInstance(request);
    const /** @type {?} */ client = htClientService.getInstance(token);
    return client;
}
/**
 * @param {?} mapType
 * @return {?}
 */
function mapServiceFactory(mapType) {
    if (mapType === void 0) {
        mapType = 'google';
    }
    return new HtMapService(mapType);
}
/**
 * @return {?}
 */
function userClientServiceFactory() {
    return usersClientFactory();
}
/**
 * @return {?}
 */
function actionClientServiceFactory() {
    return actionsClientFactory();
}
/**
 * @return {?}
 */
function groupClientServiceFactory() {
    return groupsClientFactory();
}
/**
 * @return {?}
 */
function accountUsersClientServiceFactory() {
    return new AccountsClient();
}
class HtModule {
    /**
     * @param {?} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: HtModule,
            providers: [
                HttpClient,
                { provide: MAP_TYPE, useValue: config.mapType },
                { provide: HtMapService, useFactory: mapServiceFactory, deps: [MAP_TYPE] },
                { provide: TOKEN, useValue: config.token },
                { provide: HtClientService,
                    useFactory: clientServiceFactory,
                    deps: [TOKEN, HttpClient]
                },
                {
                    provide: HtUsersService,
                    useFactory: userClientServiceFactory
                },
                {
                    provide: HtActionsService,
                    useFactory: actionClientServiceFactory
                },
                {
                    provide: HtGroupsService,
                    useFactory: groupClientServiceFactory
                },
                {
                    provide: HtAccountService,
                    useFactory: accountUsersClientServiceFactory
                    // useClass: AccountsClient
                },
            ]
        };
    }
    ;
}
HtModule.decorators = [
    { type: NgModule, args: [{
                imports: [HttpClientModule]
            },] },
];
/** @nocollapse */
HtModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

// import {UserCardModule} from "./app/user-card/user-card.module";
// import {UserCardComponent} from "./app/user-card/user-card.component";
// import {UsersComponent} from "./app/users/users.component";
// import {UsersModule} from "./app/users/users.module";
// import {UsersContainerModule} from "./app/users-container/users-container.module";
// import {UsersContainerComponent} from "./app/users-container/users-container.component";
// import {GroupsModule} from "./app/groups/groups.module";
// import {GroupsComponent} from "./app/groups/groups.component";
// import {GroupsContainerModule} from "./app/groups-container/groups-container.module";
// import {GroupsContainerComponent} from "./app/groups-container/groups-container.component";
// import {GroupsChartContainerModule} from "./app/groups-chart-container/groups-chart-container.module";
// import {GroupsChartContainerComponent} from "./app/groups-chart-container/groups-chart-container.component";
// import {MapModule} from "./app/map/map.module";
// import {MapContainerModule} from "./app/map-container/map-container.module";
// import {MapContainerComponent} from "./app/map-container/map-container.component";
// import {SharedModule} from "./app/shared/shared.module";
// import {PlacelineContainerModule} from "./app/placeline-container/placeline-container.module";
// import {PlacelineContainerComponent} from "./app/placeline-container/placeline-container.component";
// import {PlacelineModule} from "./app/placeline/placeline.module";
// import {PlacelineComponent} from "./app/placeline/placeline.component";
// import {PlacelineMapContainerModule} from "./app/placeline-map-container/placeline-map-container.module";
// import {PlacelineMapContainerComponent} from "./app/placeline-map-container/placeline-map-container.component";
// import {UsersMapContainerModule} from "./app/users-map-container/users-map-container.module";
// import {UsersMapContainerComponent} from "./app/users-map-container/users-map-container.component";
// import { GroupKeyResolver} from "./app/guard/group-key-resolver";
// import { GroupLookupKeyResolver } from "./app/guard/group-lookup-key-resolver";
// import {HtClientService} from "./app/ht/ht-client.service";
// import {HtUsersService} from "./app/ht/ht-users.service";
// import {GlobalMap} from "./app/ht/ht-map.service";
// import {HtGroupsService} from "./app/ht/ht-groups.service";
//
// export {
//   UserCardComponent,
//   UserCardModule,
//   UsersComponent,
//   UsersModule,
//   UsersContainerComponent,
//   UsersContainerModule,
//   GroupsComponent,
//   GroupsContainerComponent,
//   GroupsModule,
//   GroupsContainerModule,
//   GroupsChartContainerModule,
//   GroupsChartContainerComponent,
//   MapContainerComponent,
//   MapContainerModule,
//   MapModule,
//   SharedModule,
//   PlacelineMapContainerComponent,
//   PlacelineMapContainerModule,
//   PlacelineComponent,
//   PlacelineModule,
//   PlacelineContainerModule,
//   PlacelineContainerComponent,
//   UsersMapContainerModule,
//   UsersMapContainerComponent,
//   GroupKeyResolver,
//   GroupLookupKeyResolver,
//   HtUsersService,
//   GlobalMap,
//   HtClientService,
//   HtGroupsService
// }
//
// export * from "./app/ht/ht.module"
//

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { UserCardModule, UserCardComponent, UsersComponent, UsersModule, UsersContainerModule, UsersContainerComponent, GroupsModule, GroupsComponent, GroupsContainerModule, GroupsContainerComponent, GroupsChartContainerModule, GroupsChartContainerComponent, MapModule, MapContainerModule, MapContainerComponent, SharedModule, PaginationModule, PaginationComponent, PlacelineContainerModule, PlacelineContainerComponent, PlacelineModule, PlacelineComponent, PlacelineMapContainerModule, PlacelineMapContainerComponent, UsersMapContainerModule, UsersMapContainerComponent, GroupKeyResolver, GroupLookupKeyResolver, HtClientService, HtUsersService, HtMapService, HtGroupsService, UsersAnalyticsListModule, UsersAnalyticsListComponent, ActionsStatusGraphModule, ActionsStatusGraphComponent, UserTableModule, UserTableComponent, AnalyticsContainerModule, AnalyticsContainerComponent, UsersSummaryChartComponent, UsersSummaryChartModule, DateRangeModule, DateRangePickerModule, DateRangePickerComponent, DateRangeComponent, TOKEN, clientServiceFactory, mapServiceFactory, userClientServiceFactory, actionClientServiceFactory, groupClientServiceFactory, accountUsersClientServiceFactory, HtModule, ActionTableComponent as ɵbl, ActionTableModule as ɵbk, ActionsAnalyticsListComponent as ɵbm, ActionsAnalyticsListModule as ɵbj, ActionsSummaryChartComponent as ɵbo, ActionsSummaryChartModule as ɵbn, AnalyticsItemLoadComponent as ɵbq, AnalyticsItemLoadModule as ɵbp, AnalyticsItemComponent as ɵbv, AnalyticsSlotDirective as ɵbu, AnalyticsItemsService as ɵbt, AnalyticsSelectorComponent as ɵbw, AnalyticsTagsComponent as ɵbi, AnalyticsTagsModule as ɵbh, AnalyticsTitleComponent as ɵbx, AnalyticsMapContainerComponent as ɵbs, AnalyticsMapContainerModule as ɵbr, DataTableComponent as ɵbg, DataTableModule as ɵbf, EntitySearchComponent as ɵbd, EntitySearchModule as ɵbc, UsersFilterComponent as ɵbe, UsersFilterModule as ɵbb, GroupsChartService as ɵz, HtAccountService as ɵbz, HtActionsService as ɵby, MAP_TYPE as ɵa, MapComponent as ɵba, ActionSortingStringPipe as ɵq, ActionStatusStringPipe as ɵn, DateHumanizePipe as ɵj, DateStringPipe as ɵd, DistanceLocalePipe as ɵk, DotPipe as ɵf, HmStringPipe as ɵl, NameCasePipe as ɵg, PluralizePipe as ɵr, SafeUrlPipe as ɵo, TimeStringPipe as ɵe, UserSortingStringPipe as ɵp, UsersStatusStringPipe as ɵm, BatteryIconComponent as ɵc, ButtonComponent as ɵs, DropdownDirective as ɵu, LoadingBarComponent as ɵt, LoadingDataComponent as ɵi, LoadingDotsComponent as ɵh, ProfileComponent as ɵb, UsersSummaryContainerComponent as ɵy, UsersSummaryContainerModule as ɵv, UsersSummaryComponent as ɵx, UsersSummaryModule as ɵw };
//# sourceMappingURL=ht-angular.js.map

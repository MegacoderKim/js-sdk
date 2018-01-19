var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, Directive, ElementRef, EventEmitter, HostBinding, HostListener, Injectable, InjectionToken, Input, NgModule, Output, Pipe, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { last, map, reduce, reject, sortBy } from 'underscore';
import { RouterModule } from '@angular/router';
import { Color, DateHumanize, DateString, DistanceLocale, DotString, GetUrlParam, HMString, NameCase, TimeString } from 'ht-utility';
import { animate, keyframes, query, state, style, transition, trigger } from '@angular/animations';
import { DateRangeLabelMap, DateRangeMap, HtPlaceline, actionTableFormat, htAction, isSameDateRange, listWithItem$, listwithSelectedId$, tableFormat, userTableFormat } from 'ht-data';
import { AccountsClient, ApiType, HtActionsClient, HtClient, HtGroupsClient, HtRequest, HtUsersClient, actionsClientFactory, dateRangeFactory, dateRangeService, groupsClientFactory, htClientService, htRequestService, usersClientFactory } from 'ht-client';
import { ActionsHeatmapTrace, GlobalMap, HtMapClass, MapInstance, StopsHeatmapTrace } from 'ht-maps';
import { distinctUntilChanged, filter, map as map$1, skip, switchMap, take, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { BehaviorSubject as BehaviorSubject$1 } from 'rxjs/BehaviorSubject';
import { combineLatest as combineLatest$1 } from 'rxjs/observable/combineLatest';
import { of as of$1 } from 'rxjs/observable/of';
import { merge as merge$1 } from 'rxjs/observable/merge';
import { Subject as Subject$1 } from 'rxjs/Subject';
import Chart from 'frappe-charts/dist/frappe-charts.min.esm';
import { Observable as Observable$1 } from 'rxjs/Observable';
import { format } from 'date-fns';
import { HttpClient, HttpClientModule } from '@angular/common/http';
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var UserCardComponent = (function () {
    function UserCardComponent() {
        this.selectedUserId = null;
        this.action = 'default';
        this.onAction = new EventEmitter();
        this.showStatus = true;
        this.hovered = false;
    }
    /**
     * @return {?}
     */
    UserCardComponent.prototype.hoverIn = function () {
        this.hovered = true;
    };
    /**
     * @return {?}
     */
    UserCardComponent.prototype.hoverOut = function () {
        this.hovered = false;
    };
    /**
     * @return {?}
     */
    UserCardComponent.prototype.ngOnInit = function () {
    };
    /**
     * @param {?} user
     * @return {?}
     */
    UserCardComponent.prototype.getShowStatus = function (user) {
        if (user.segments) {
            return !!user.segments.length && !last(user.segments)['ended_at'];
        }
        return !!user;
    };
    /**
     * @return {?}
     */
    UserCardComponent.prototype.fireAction = function () {
        this.onAction.next({ user: this.user, action: this.action });
        event.stopPropagation();
    };
    /**
     * @param {?} a
     * @return {?}
     */
    UserCardComponent.prototype.ngOnChanges = function (a) {
        // console.log(a, "change");
        this.showStatus = a.user ? this.getShowStatus(a.user.currentValue) : this.showStatus;
    };
    /**
     * @return {?}
     */
    UserCardComponent.prototype.getActionText = function () {
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
    };
    /**
     * @param {?} e
     * @return {?}
     */
    UserCardComponent.prototype.debug = function (e) {
        console.log(e);
    };
    return UserCardComponent;
}());
UserCardComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-user-card',
                template: "<div class=\"ht-card-content flex-row flex\">\n  <div class=\"text-left flex-row row-gap-10 flex\">\n    <ht-profile [height]=\"35\" [url]=\"user.photo\"></ht-profile>\n    <div class=\"\">\n      <div class=\"flex-row\">\n        {{user.name | nameCase | dot: 'Unknown users'}}\n      </div>\n      <ng-template [ngIf]=\"showStatus\">\n        <div class=\"user-status-display\" [ngClass]=\"user.status + '-color'\">\n          <div [class.text-warning]=\"user.display.is_warning\">{{user.display.status_text}}</div>\n        </div>\n        <div class=\"flex-row user-status\">\n          <div>{{user.display.sub_status_text}}<span *ngIf=\"user.display.battery\">&nbsp; &bull; &nbsp;</span></div>\n          <ht-battery-icon *ngIf=\"user.display.battery\" [battery]=\"user.display.battery\"></ht-battery-icon>\n        </div>\n      </ng-template>\n      <div class=\"flex-row\" *ngIf=\"!user['segments'] && user['total_distance']\">\n        <div>{{user['total_distance'] | distanceLocale}}</div>\n        <div>&nbsp; &bull; &nbsp;</div>\n        <div>{{user['total_duration'] | hmString:60}}</div>\n      </div>\n      <div class=\"\">\n        {{user['phone']}}\n      </div>\n    </div>\n  </div>\n  <!--<div *ngIf=\"action !== 'loading'; else loading\" [@cardAction]=\"action == 'close' ? 'active' : 'inactive'\" class=\"flex-row\">-->\n    <!--<button class=\"auto ht-btn ht-btn-card text-uppercase\" (click)=\"fireAction()\" *ngIf=\"getActionText()\">-->\n      <!--{{getActionText()}}-->\n    <!--</button>-->\n  <!--</div>-->\n  <ng-template #loading>\n    <div class=\"text-1 flex-row\">\n      <ht-loading-dots class=\"auto\"></ht-loading-dots>\n    </div>\n  </ng-template>\n</div>\n<ng-content></ng-content>\n<!--<div class=\"card-quick-action\" *ngIf=\"action == 'default'\">-->\n  <!--<div class=\"flex-row align-center\">-->\n    <!--<span class=\"element\">View on map &nbsp;</span>-->\n    <!--<i class=\"fa fa-map-o\"></i>-->\n  <!--</div>-->\n<!--</div>-->\n",
                styles: [".ht-card-content {\n  padding: 5px 10px;\n}\n"],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
UserCardComponent.ctorParameters = function () { return []; };
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
var ProfileComponent = (function () {
    function ProfileComponent() {
        this.height = 30;
        this.defaultUrl = "";
    }
    /**
     * @return {?}
     */
    ProfileComponent.prototype.ngOnInit = function () {
        // this.url = this.url || "images/missing.png"
    };
    return ProfileComponent;
}());
ProfileComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-profile',
                template: "<div [style.height.px]=\"height\" [style.width.px]=\"height\" class=\"profile-img\" [ngStyle]=\"{ 'background-image': 'url(' + (url || defaultUrl) + ')'}\">\n\n</div>\n",
                styles: [":host .profile-img {\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-position: center;\n  border-radius: 50%;\n}\n"],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
ProfileComponent.ctorParameters = function () { return []; };
ProfileComponent.propDecorators = {
    "url": [{ type: Input },],
    "height": [{ type: Input },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var BatteryIconComponent = (function () {
    function BatteryIconComponent() {
        this.battery = 0;
        this.layout = 'row';
    }
    /**
     * @return {?}
     */
    BatteryIconComponent.prototype.ngOnInit = function () {
    };
    /**
     * @param {?} level
     * @return {?}
     */
    BatteryIconComponent.prototype.batteryClass = function (level) {
        var /** @type {?} */ className = '';
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
    };
    return BatteryIconComponent;
}());
BatteryIconComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-battery-icon',
                template: "<div *ngIf=\"battery\" [ngClass]=\"layout == 'column' ? 'flex-column column-gap-4 justify-center' : 'flex-row row-gap-4 align-center'\" class=\"\">\n  <div>\n    {{battery}}%\n  </div>\n  <i class=\"fa\" [ngClass]=\"batteryClass(battery)\"></i>\n</div>\n",
                styles: [".text-center {\n  text-align: center;\n}\n.text-muted {\n  color: #798E9B;\n}\n.text-right {\n  text-align: right;\n}\n.text-left {\n  text-align: left;\n}\n.text-1 {\n  font-size: 2em;\n}\n.text-4 {\n  font-size: 0.8em;\n}\n.text-capitalize {\n  text-transform: capitalize;\n}\n.text-uppercase {\n  text-transform: uppercase;\n}\n.text-ontime {\n  color: #58ae5b;\n}\n.text-late {\n  color: #E6413E;\n}\n.text-warning {\n  color: #E6413E !important;\n}\n.text-red {\n  color: #E6413E;\n}\n.text-blue {\n  color: #5496F8;\n}\n.truncate {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.flex-row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n}\n.flex-column {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.column-gap-4 > :not(:last-child) {\n  margin-bottom: 4px;\n}\n.row-gap-4 > :not(:last-child) {\n  margin-right: 4px;\n}\n.column-gap-7 > :not(:last-child) {\n  margin-bottom: 7px;\n}\n.row-gap-7 > :not(:last-child) {\n  margin-right: 7px;\n}\n.column-gap-10 > :not(:last-child) {\n  margin-bottom: 10px;\n}\n.row-gap-10 > :not(:last-child) {\n  margin-right: 10px;\n}\n.column-gap-20 > :not(:last-child) {\n  margin-bottom: 20px;\n}\n.row-gap-20 > :not(:last-child) {\n  margin-right: 20px;\n}\n.wrap {\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.flex {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.auto {\n  margin: auto;\n}\n.relative {\n  position: relative;\n}\n.space-between {\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.space-around {\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n}\n.justify-center {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.flex-center {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.align-center {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.clickable {\n  cursor: pointer;\n}\n.round-icon {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 23px;\n  height: 23px;\n  background: #315790;\n  border-radius: 50%;\n}\n.flex-half {\n  -ms-flex-preferred-size: 50%;\n      flex-basis: 50%;\n}\n.link-unstyled {\n  color: inherit;\n}\n.link-unstyled:hover {\n  text-decoration: none;\n}\n.half {\n  width: 50%;\n}\n.noselect {\n  -webkit-touch-callout: none;\n  /* iOS Safari */\n  -webkit-user-select: none;\n  /* Chrome/Safari/Opera */\n  /* Konqueror */\n  -moz-user-select: none;\n  /* Firefox */\n  -ms-user-select: none;\n  /* Internet Explorer/Edge */\n  user-select: none;\n  /* Non-prefixed version, currently\n                                  not supported by any browser */\n}\n.hover-shadow:hover {\n  -webkit-box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.16);\n          box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.16);\n}\n.marker-transparent {\n  opacity: 0.4;\n}\n.marker-fade {\n  -webkit-filter: contrast(16%) brightness(160%) blur(0.6px);\n          filter: contrast(16%) brightness(160%) blur(0.6px);\n}\n.tooltip-warning {\n  background: #e04745;\n  color: #fff;\n}\n.tooltip-warning-arrow {\n  border-right-color: #e04745 !important;\n}\n.tooltip-info {\n  background: #5496F8;\n  color: #fff;\n}\n.tooltip-info-arrow {\n  border-right-color: #5496F8 !important;\n}\na {\n  color: inherit;\n  text-decoration: none;\n}\na:hover {\n  color: inherit;\n  text-decoration: none;\n}\na:active {\n  color: inherit;\n  text-decoration: none;\n}\na:focus {\n  outline: none;\n  color: inherit;\n  text-decoration: none;\n}\n.spinner-wave {\n  margin: 0 auto;\n  width: 100px;\n  height: 20px;\n  text-align: center;\n}\n.spinner-wave > div {\n  background-color: #5496F8;\n  height: 100%;\n  width: 6px;\n  display: inline-block;\n  -webkit-animation: wave 1.2s infinite ease-in-out;\n  animation: wave 1.2s infinite ease-in-out;\n}\n.spinner-wave div:nth-child(2) {\n  -webkit-animation-delay: -1.1s;\n  animation-delay: -1.1s;\n}\n.spinner-wave div:nth-child(3) {\n  -webkit-animation-delay: -1s;\n  animation-delay: -1s;\n}\n.spinner-wave div:nth-child(4) {\n  -webkit-animation-delay: -0.9s;\n  animation-delay: -0.9s;\n}\n.spinner-wave div:nth-child(5) {\n  -webkit-animation-delay: -0.8s;\n  animation-delay: -0.8s;\n}\n@-webkit-keyframes wave {\n  0%,\n  40%,\n  100% {\n    -webkit-transform: scaleY(0.4);\n  }\n  20% {\n    -webkit-transform: scaleY(1);\n  }\n}\n@keyframes wave {\n  0%,\n  40%,\n  100% {\n    -webkit-transform: scaleY(0.4);\n            transform: scaleY(0.4);\n  }\n  20% {\n    -webkit-transform: scaleY(1);\n            transform: scaleY(1);\n  }\n}\n@media screen and (max-width: 480px) {\n  .hide-xs {\n    display: none !important;\n  }\n}\n@media screen and (min-width: 480px) {\n  .show-xs {\n    display: none !important;\n  }\n}\n.ht-btn {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 5px 13px;\n  border: 0;\n  background: #ffffff;\n  color: #52616A;\n  -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\n.ht-btn:focus {\n  background: #fcfcfc;\n  outline: 0;\n}\n.ht-btn-card:hover {\n  background: #5496F8;\n  color: rgba(255, 255, 255, 0.96);\n  -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\n.stopped-color {\n  color: #FFBB44;\n}\n.drive-color {\n  color: #5496F8;\n}\n.walk-color {\n  color: #5496F8;\n}\n.moving-color {\n  color: #5496F8;\n}\n.logged_off-color {\n  color: #A9BAC4;\n}\n.network_offline-color {\n  color: #d19191;\n}\n.location_disabled-color {\n  color: #d19191;\n}\n.location_low_accuracy-color {\n  color: #d19191;\n}\n.stopped-bg {\n  background: #FFBB44;\n}\n.drive-bg {\n  background: #5496F8;\n}\n.walk-bg {\n  background: #5496F8;\n}\n.moving-bg {\n  background: #5496F8;\n}\n.logged_off-bg {\n  background: #A9BAC4;\n}\n.network_offline-bg {\n  background: #d19191;\n}\n.location_disabled-bg {\n  background-color: #d19191;\n}\n.location_low_accuracy-bg {\n  background-color: #d19191;\n}\n"],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
BatteryIconComponent.ctorParameters = function () { return []; };
BatteryIconComponent.propDecorators = {
    "battery": [{ type: Input },],
    "layout": [{ type: Input },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TimeStringPipe = (function () {
    function TimeStringPipe() {
    }
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    TimeStringPipe.prototype.transform = function (value, args) {
        return TimeString(value, args);
    };
    return TimeStringPipe;
}());
TimeStringPipe.decorators = [
    { type: Pipe, args: [{
                name: 'timeString'
            },] },
];
/** @nocollapse */
TimeStringPipe.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DateStringPipe = (function () {
    function DateStringPipe() {
    }
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    DateStringPipe.prototype.transform = function (value, args) {
        return DateString(value, args);
    };
    return DateStringPipe;
}());
DateStringPipe.decorators = [
    { type: Pipe, args: [{
                name: 'dateString'
            },] },
];
/** @nocollapse */
DateStringPipe.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NameCasePipe = (function () {
    function NameCasePipe() {
    }
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    NameCasePipe.prototype.transform = function (value, args) {
        return NameCase(value);
    };
    return NameCasePipe;
}());
NameCasePipe.decorators = [
    { type: Pipe, args: [{
                name: 'nameCase'
            },] },
];
/** @nocollapse */
NameCasePipe.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DotPipe = (function () {
    function DotPipe() {
    }
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    DotPipe.prototype.transform = function (value, args) {
        return DotString(value, args);
    };
    return DotPipe;
}());
DotPipe.decorators = [
    { type: Pipe, args: [{
                name: 'dot'
            },] },
];
/** @nocollapse */
DotPipe.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var LoadingDotsComponent = (function () {
    function LoadingDotsComponent() {
        this.show = true;
    }
    /**
     * @return {?}
     */
    LoadingDotsComponent.prototype.ngOnInit = function () {
    };
    return LoadingDotsComponent;
}());
LoadingDotsComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-loading-dots',
                template: "<ng-content></ng-content>\n<span [style.fontSize.px]=\"size || 'inherit'\" class=\"loading-dots\"><span> &bull;</span><span> &bull;</span><span> &bull;</span></span>\n",
                styles: [".loading-dots {\n  font-size: inherit;\n  margin: auto;\n}\n.loading-dots span {\n  -webkit-animation-name: blink;\n          animation-name: blink;\n  -webkit-animation-duration: 1.4s;\n          animation-duration: 1.4s;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n  -webkit-animation-fill-mode: both;\n          animation-fill-mode: both;\n}\n.loading-dots span:nth-child(2) {\n  -webkit-animation-delay: .2s;\n          animation-delay: .2s;\n}\n.loading-dots span:nth-child(3) {\n  -webkit-animation-delay: .4s;\n          animation-delay: .4s;\n}\n@-webkit-keyframes blink {\n  0% {\n    opacity: .2;\n  }\n  20% {\n    opacity: 1;\n  }\n  100% {\n    opacity: .2;\n  }\n}\n@keyframes blink {\n  0% {\n    opacity: .2;\n  }\n  20% {\n    opacity: 1;\n  }\n  100% {\n    opacity: .2;\n  }\n}\n"],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
LoadingDotsComponent.ctorParameters = function () { return []; };
LoadingDotsComponent.propDecorators = {
    "show": [{ type: Input },],
    "size": [{ type: Input },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var LoadingDataComponent = (function () {
    function LoadingDataComponent() {
        this.message = "";
    }
    /**
     * @return {?}
     */
    LoadingDataComponent.prototype.ngOnInit = function () {
    };
    Object.defineProperty(LoadingDataComponent.prototype, "displayMessage", {
        /**
         * @return {?}
         */
        get: function () {
            return !this.customMessage ? "" + this.message : this.customMessage;
        },
        enumerable: true,
        configurable: true
    });
    return LoadingDataComponent;
}());
LoadingDataComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-loading-data',
                template: "<div [style.fontSize.px]=\"size || 'inherit'\" loading-dots><span>{{displayMessage}}</span></div>\n",
                styles: [":host {\n  color: #798E9B;\n  text-align: center;\n}\n"],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
LoadingDataComponent.ctorParameters = function () { return []; };
LoadingDataComponent.propDecorators = {
    "size": [{ type: Input },],
    "message": [{ type: Input },],
    "customMessage": [{ type: Input },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DateHumanizePipe = (function () {
    function DateHumanizePipe() {
    }
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    DateHumanizePipe.prototype.transform = function (value, args) {
        return DateHumanize(value);
    };
    return DateHumanizePipe;
}());
DateHumanizePipe.decorators = [
    { type: Pipe, args: [{
                name: 'dateHumanize'
            },] },
];
/** @nocollapse */
DateHumanizePipe.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DistanceLocalePipe = (function () {
    function DistanceLocalePipe() {
    }
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    DistanceLocalePipe.prototype.transform = function (value, args) {
        return DistanceLocale(value);
    };
    return DistanceLocalePipe;
}());
DistanceLocalePipe.decorators = [
    { type: Pipe, args: [{
                name: 'distanceLocale'
            },] },
];
/** @nocollapse */
DistanceLocalePipe.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var HmStringPipe = (function () {
    function HmStringPipe() {
    }
    /**
     * @param {?} value
     * @param {?=} args
     * @param {?=} args2
     * @return {?}
     */
    HmStringPipe.prototype.transform = function (value, args, args2) {
        return HMString(value, args);
    };
    return HmStringPipe;
}());
HmStringPipe.decorators = [
    { type: Pipe, args: [{
                name: 'hmString'
            },] },
];
/** @nocollapse */
HmStringPipe.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SnackbarService = (function () {
    function SnackbarService() {
        this.showErrorToast = false;
        this.showSuccessToast = false;
        this.showLoadingToast = false;
    }
    /**
     * @param {?} errorMessage
     * @return {?}
     */
    SnackbarService.prototype.displayErrorToast = function (errorMessage) {
        var _this = this;
        this.errorMessage = errorMessage;
        this.showErrorToast = true;
        this.hideSuccessToast();
        if (this.hideErrorToastTimer)
            clearTimeout(this.hideErrorToastTimer);
        this.hideErrorToastTimer = setTimeout(function () {
            _this.hideErrorToast();
        }, 4000);
    };
    /**
     * @return {?}
     */
    SnackbarService.prototype.hideErrorToast = function () {
        this.showErrorToast = false;
    };
    /**
     * @param {?} successMessage
     * @return {?}
     */
    SnackbarService.prototype.displaySuccessToast = function (successMessage) {
        var _this = this;
        this.successMessage = successMessage;
        this.showSuccessToast = true;
        this.hideErrorToast();
        if (this.hideSuccessToastTimer)
            clearTimeout(this.hideSuccessToastTimer);
        this.hideSuccessToastTimer = setTimeout(function () {
            _this.hideSuccessToast();
        }, 4000);
    };
    /**
     * @param {?=} string
     * @return {?}
     */
    SnackbarService.prototype.displayLoadingToast = function (string) {
        if (string === void 0) { string = ''; }
        this.loadingMessage = string;
        this.showLoadingToast = true;
    };
    /**
     * @return {?}
     */
    SnackbarService.prototype.hideLoadingToast = function () {
        this.showLoadingToast = false;
    };
    /**
     * @return {?}
     */
    SnackbarService.prototype.hideSuccessToast = function () {
        this.showSuccessToast = false;
    };
    return SnackbarService;
}());
SnackbarService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SnackbarService.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SnackbarComponent = (function () {
    /**
     * @param {?} snackbarService
     */
    function SnackbarComponent(snackbarService) {
        this.snackbarService = snackbarService;
    }
    /**
     * @return {?}
     */
    SnackbarComponent.prototype.ngOnInit = function () {
    };
    return SnackbarComponent;
}());
SnackbarComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-snackbar',
                template: "<div class=\"toast\" [@toast]=\"snackbarService.showErrorToast ? 'on' : 'off'\" id=\"error-toast\">{{snackbarService.errorMessage}}<span class=\"dismiss-button\" (click)=\"snackbarService.showErrorToast=false\">Dismiss</span></div>\n<div class=\"toast\" [@toast]=\"snackbarService.showSuccessToast ? 'on' : 'off'\" id=\"show-toast\">{{snackbarService.successMessage}}<span class=\"dismiss-button\" (click)=\"snackbarService.showSuccessToast=false\">Dismiss</span></div>\n<div class=\"loading\" [@toast]=\"snackbarService.showLoadingToast ? 'on' : 'off'\" id=\"show-loading\">\n  <div class=\"spinner-wave\">\n    <div></div>\n    <div></div>\n    <div></div>\n    <div></div>\n    <div></div>\n  </div>\n</div>\n\n",
                styles: [".text-center {\n  text-align: center;\n}\n.text-muted {\n  color: #798E9B;\n}\n.text-right {\n  text-align: right;\n}\n.text-left {\n  text-align: left;\n}\n.text-1 {\n  font-size: 2em;\n}\n.text-4 {\n  font-size: 0.8em;\n}\n.text-capitalize {\n  text-transform: capitalize;\n}\n.text-uppercase {\n  text-transform: uppercase;\n}\n.text-ontime {\n  color: #58ae5b;\n}\n.text-late {\n  color: #E6413E;\n}\n.text-warning {\n  color: #E6413E !important;\n}\n.text-red {\n  color: #E6413E;\n}\n.text-blue {\n  color: #5496F8;\n}\n.truncate {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.flex-row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n}\n.flex-column {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.column-gap-4 > :not(:last-child) {\n  margin-bottom: 4px;\n}\n.row-gap-4 > :not(:last-child) {\n  margin-right: 4px;\n}\n.column-gap-7 > :not(:last-child) {\n  margin-bottom: 7px;\n}\n.row-gap-7 > :not(:last-child) {\n  margin-right: 7px;\n}\n.column-gap-10 > :not(:last-child) {\n  margin-bottom: 10px;\n}\n.row-gap-10 > :not(:last-child) {\n  margin-right: 10px;\n}\n.column-gap-20 > :not(:last-child) {\n  margin-bottom: 20px;\n}\n.row-gap-20 > :not(:last-child) {\n  margin-right: 20px;\n}\n.wrap {\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.flex {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.auto {\n  margin: auto;\n}\n.relative {\n  position: relative;\n}\n.space-between {\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.space-around {\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n}\n.justify-center {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.flex-center {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.align-center {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.clickable {\n  cursor: pointer;\n}\n.round-icon {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 23px;\n  height: 23px;\n  background: #315790;\n  border-radius: 50%;\n}\n.flex-half {\n  -ms-flex-preferred-size: 50%;\n      flex-basis: 50%;\n}\n.link-unstyled {\n  color: inherit;\n}\n.link-unstyled:hover {\n  text-decoration: none;\n}\n.half {\n  width: 50%;\n}\n.noselect {\n  -webkit-touch-callout: none;\n  /* iOS Safari */\n  -webkit-user-select: none;\n  /* Chrome/Safari/Opera */\n  /* Konqueror */\n  -moz-user-select: none;\n  /* Firefox */\n  -ms-user-select: none;\n  /* Internet Explorer/Edge */\n  user-select: none;\n  /* Non-prefixed version, currently\n                                  not supported by any browser */\n}\n.hover-shadow:hover {\n  -webkit-box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.16);\n          box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.16);\n}\n.marker-transparent {\n  opacity: 0.4;\n}\n.marker-fade {\n  -webkit-filter: contrast(16%) brightness(160%) blur(0.6px);\n          filter: contrast(16%) brightness(160%) blur(0.6px);\n}\n.tooltip-warning {\n  background: #e04745;\n  color: #fff;\n}\n.tooltip-warning-arrow {\n  border-right-color: #e04745 !important;\n}\n.tooltip-info {\n  background: #5496F8;\n  color: #fff;\n}\n.tooltip-info-arrow {\n  border-right-color: #5496F8 !important;\n}\na {\n  color: inherit;\n  text-decoration: none;\n}\na:hover {\n  color: inherit;\n  text-decoration: none;\n}\na:active {\n  color: inherit;\n  text-decoration: none;\n}\na:focus {\n  outline: none;\n  color: inherit;\n  text-decoration: none;\n}\n.spinner-wave {\n  margin: 0 auto;\n  width: 100px;\n  height: 20px;\n  text-align: center;\n}\n.spinner-wave > div {\n  background-color: #5496F8;\n  height: 100%;\n  width: 6px;\n  display: inline-block;\n  -webkit-animation: wave 1.2s infinite ease-in-out;\n  animation: wave 1.2s infinite ease-in-out;\n}\n.spinner-wave div:nth-child(2) {\n  -webkit-animation-delay: -1.1s;\n  animation-delay: -1.1s;\n}\n.spinner-wave div:nth-child(3) {\n  -webkit-animation-delay: -1s;\n  animation-delay: -1s;\n}\n.spinner-wave div:nth-child(4) {\n  -webkit-animation-delay: -0.9s;\n  animation-delay: -0.9s;\n}\n.spinner-wave div:nth-child(5) {\n  -webkit-animation-delay: -0.8s;\n  animation-delay: -0.8s;\n}\n@-webkit-keyframes wave {\n  0%,\n  40%,\n  100% {\n    -webkit-transform: scaleY(0.4);\n  }\n  20% {\n    -webkit-transform: scaleY(1);\n  }\n}\n@keyframes wave {\n  0%,\n  40%,\n  100% {\n    -webkit-transform: scaleY(0.4);\n            transform: scaleY(0.4);\n  }\n  20% {\n    -webkit-transform: scaleY(1);\n            transform: scaleY(1);\n  }\n}\n@media screen and (max-width: 480px) {\n  .hide-xs {\n    display: none !important;\n  }\n}\n@media screen and (min-width: 480px) {\n  .show-xs {\n    display: none !important;\n  }\n}\n.ht-btn {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 5px 13px;\n  border: 0;\n  background: #ffffff;\n  color: #52616A;\n  -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\n.ht-btn:focus {\n  background: #fcfcfc;\n  outline: 0;\n}\n.ht-btn-card:hover {\n  background: #5496F8;\n  color: rgba(255, 255, 255, 0.96);\n  -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\n.stopped-color {\n  color: #FFBB44;\n}\n.drive-color {\n  color: #5496F8;\n}\n.walk-color {\n  color: #5496F8;\n}\n.moving-color {\n  color: #5496F8;\n}\n.logged_off-color {\n  color: #A9BAC4;\n}\n.network_offline-color {\n  color: #d19191;\n}\n.location_disabled-color {\n  color: #d19191;\n}\n.location_low_accuracy-color {\n  color: #d19191;\n}\n.stopped-bg {\n  background: #FFBB44;\n}\n.drive-bg {\n  background: #5496F8;\n}\n.walk-bg {\n  background: #5496F8;\n}\n.moving-bg {\n  background: #5496F8;\n}\n.logged_off-bg {\n  background: #A9BAC4;\n}\n.network_offline-bg {\n  background: #d19191;\n}\n.location_disabled-bg {\n  background-color: #d19191;\n}\n.location_low_accuracy-bg {\n  background-color: #d19191;\n}\n.toast {\n  height: auto;\n  position: fixed;\n  z-index: 100000;\n  /* width: 400px; */\n  left: 0px;\n  right: 0px;\n  /* right: 0; */\n  bottom: 10%;\n  /* margin: 0 auto; */\n  opacity: 0.9;\n  filter: alpha(opacity=90);\n  background: #353f45;\n  color: #ffffff;\n  font-family: Roboto, helvetica, sans-serif;\n  font-size: 14px;\n  padding: 15px;\n  text-align: center;\n  border-radius: 2px;\n  -webkit-box-shadow: 0px 0px 24px -1px #383838;\n          box-shadow: 0px 0px 24px -1px #383838;\n  width: 460px;\n  margin: auto;\n}\n.loading {\n  height: auto;\n  position: fixed;\n  z-index: 100000;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  /* width: 400px; */\n  right: 25px;\n  /* right: 0; */\n  bottom: 50px;\n  /* margin: 0 auto; */\n  opacity: 0.9;\n  filter: alpha(opacity=90);\n  background: #353f45;\n  color: #5496F8;\n  font-family: Roboto, helvetica, sans-serif;\n  font-size: 16px;\n  padding: 12px;\n  text-align: center;\n  border-radius: 2px;\n  -webkit-box-shadow: 0px 0px 24px -1px #383838;\n          box-shadow: 0px 0px 24px -1px #383838;\n  width: 200px;\n  margin: auto;\n}\n.dismiss-button {\n  color: #5496F8;\n  padding: 5px;\n  font-size: 12px;\n  font-weight: 600;\n  text-transform: uppercase;\n  cursor: pointer;\n}\n"],
                animations: [
                    trigger('toast', [
                        state('on', style({
                            opacity: 1, bottom: '10%'
                        })),
                        state('off', style({
                            opacity: 0, display: 'none'
                        })),
                        transition('on => off', [
                            animate('100ms ease-out', style({ bottom: '-3%' }))
                        ]),
                        transition('off => on', [
                            style({ bottom: '-3%' }),
                            animate('100ms ease-out')
                        ])
                    ])
                ]
            },] },
];
/** @nocollapse */
SnackbarComponent.ctorParameters = function () { return [
    { type: SnackbarService, },
]; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var UsersStatusStringPipe = (function () {
    function UsersStatusStringPipe() {
    }
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    UsersStatusStringPipe.prototype.transform = function (value, args) {
        if (status.split(',').length === 4)
            return 'Fit to map';
        // return GetUserStatusString(value)
    };
    return UsersStatusStringPipe;
}());
UsersStatusStringPipe.decorators = [
    { type: Pipe, args: [{
                name: 'usersStatusString'
            },] },
];
/** @nocollapse */
UsersStatusStringPipe.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ActionStatusStringPipe = (function () {
    function ActionStatusStringPipe() {
    }
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    ActionStatusStringPipe.prototype.transform = function (value, args) {
        return htAction().getFilterString(value);
    };
    return ActionStatusStringPipe;
}());
ActionStatusStringPipe.decorators = [
    { type: Pipe, args: [{
                name: 'actionStatusString'
            },] },
];
/** @nocollapse */
ActionStatusStringPipe.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SafeHtmlPipe = (function () {
    function SafeHtmlPipe() {
    }
    /**
     * @param {?} value
     * @return {?}
     */
    SafeHtmlPipe.prototype.transform = function (value) {
        // return this.sanitized.bypassSecurityTrustHtml(value);
    };
    return SafeHtmlPipe;
}());
SafeHtmlPipe.decorators = [
    { type: Pipe, args: [{ name: 'safeHtml' },] },
];
/** @nocollapse */
SafeHtmlPipe.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var UserSortingStringPipe = (function () {
    function UserSortingStringPipe() {
    }
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    UserSortingStringPipe.prototype.transform = function (value, args) {
        return value;
        // return GetUserSortingString(value);
    };
    return UserSortingStringPipe;
}());
UserSortingStringPipe.decorators = [
    { type: Pipe, args: [{
                name: 'userSortingString'
            },] },
];
/** @nocollapse */
UserSortingStringPipe.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ActionSortingStringPipe = (function () {
    function ActionSortingStringPipe() {
    }
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    ActionSortingStringPipe.prototype.transform = function (value, args) {
        return htAction().getSortingString(value);
    };
    return ActionSortingStringPipe;
}());
ActionSortingStringPipe.decorators = [
    { type: Pipe, args: [{
                name: 'actionSortingString'
            },] },
];
/** @nocollapse */
ActionSortingStringPipe.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SafeUrlPipe = (function () {
    function SafeUrlPipe() {
    }
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    SafeUrlPipe.prototype.transform = function (value, args) {
        // return this.sanitizer.bypassSecurityTrustResourceUrl(value);
    };
    return SafeUrlPipe;
}());
SafeUrlPipe.decorators = [
    { type: Pipe, args: [{ name: 'safeUrl' },] },
];
/** @nocollapse */
SafeUrlPipe.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PluralizePipe = (function () {
    function PluralizePipe() {
    }
    /**
     * @param {?} value
     * @param {?} args
     * @param {?=} suffix
     * @param {?=} singularSuffix
     * @return {?}
     */
    PluralizePipe.prototype.transform = function (value, args, suffix, singularSuffix) {
        if (suffix === void 0) { suffix = 's'; }
        if (singularSuffix === void 0) { singularSuffix = ''; }
        if (args && typeof args === 'number') {
            return args > 1 ? value + suffix : value + singularSuffix;
        }
        return value;
    };
    return PluralizePipe;
}());
PluralizePipe.decorators = [
    { type: Pipe, args: [{
                name: 'pluralize'
            },] },
];
/** @nocollapse */
PluralizePipe.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ButtonComponent = (function () {
    function ButtonComponent() {
    }
    /**
     * @return {?}
     */
    ButtonComponent.prototype.ngOnInit = function () {
    };
    return ButtonComponent;
}());
ButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-button',
                template: "<p>\n  button works!\n</p>\n",
                styles: [""]
            },] },
];
/** @nocollapse */
ButtonComponent.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var LoadingBarComponent = (function () {
    function LoadingBarComponent() {
    }
    /**
     * @return {?}
     */
    LoadingBarComponent.prototype.ngOnInit = function () {
    };
    return LoadingBarComponent;
}());
LoadingBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-loading-bar',
                template: "<div class=\"relative\">\n  <div class=\"load-bar\">\n    <div class=\"bar\"></div>\n    <div class=\"bar\"></div>\n    <div class=\"bar\"></div>\n  </div>\n</div>\n\n\n",
                styles: [".text-center {\n  text-align: center;\n}\n.text-muted {\n  color: #798E9B;\n}\n.text-right {\n  text-align: right;\n}\n.text-left {\n  text-align: left;\n}\n.text-1 {\n  font-size: 2em;\n}\n.text-4 {\n  font-size: 0.8em;\n}\n.text-capitalize {\n  text-transform: capitalize;\n}\n.text-uppercase {\n  text-transform: uppercase;\n}\n.text-ontime {\n  color: #58ae5b;\n}\n.text-late {\n  color: #E6413E;\n}\n.text-warning {\n  color: #E6413E !important;\n}\n.text-red {\n  color: #E6413E;\n}\n.text-blue {\n  color: #5496F8;\n}\n.truncate {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.flex-row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n}\n.flex-column {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.column-gap-4 > :not(:last-child) {\n  margin-bottom: 4px;\n}\n.row-gap-4 > :not(:last-child) {\n  margin-right: 4px;\n}\n.column-gap-7 > :not(:last-child) {\n  margin-bottom: 7px;\n}\n.row-gap-7 > :not(:last-child) {\n  margin-right: 7px;\n}\n.column-gap-10 > :not(:last-child) {\n  margin-bottom: 10px;\n}\n.row-gap-10 > :not(:last-child) {\n  margin-right: 10px;\n}\n.column-gap-20 > :not(:last-child) {\n  margin-bottom: 20px;\n}\n.row-gap-20 > :not(:last-child) {\n  margin-right: 20px;\n}\n.wrap {\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.flex {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.auto {\n  margin: auto;\n}\n.relative {\n  position: relative;\n}\n.space-between {\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.space-around {\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n}\n.justify-center {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.flex-center {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.align-center {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.clickable {\n  cursor: pointer;\n}\n.round-icon {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 23px;\n  height: 23px;\n  background: #315790;\n  border-radius: 50%;\n}\n.flex-half {\n  -ms-flex-preferred-size: 50%;\n      flex-basis: 50%;\n}\n.link-unstyled {\n  color: inherit;\n}\n.link-unstyled:hover {\n  text-decoration: none;\n}\n.half {\n  width: 50%;\n}\n.noselect {\n  -webkit-touch-callout: none;\n  /* iOS Safari */\n  -webkit-user-select: none;\n  /* Chrome/Safari/Opera */\n  /* Konqueror */\n  -moz-user-select: none;\n  /* Firefox */\n  -ms-user-select: none;\n  /* Internet Explorer/Edge */\n  user-select: none;\n  /* Non-prefixed version, currently\n                                  not supported by any browser */\n}\n.hover-shadow:hover {\n  -webkit-box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.16);\n          box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.16);\n}\n.marker-transparent {\n  opacity: 0.4;\n}\n.marker-fade {\n  -webkit-filter: contrast(16%) brightness(160%) blur(0.6px);\n          filter: contrast(16%) brightness(160%) blur(0.6px);\n}\n.tooltip-warning {\n  background: #e04745;\n  color: #fff;\n}\n.tooltip-warning-arrow {\n  border-right-color: #e04745 !important;\n}\n.tooltip-info {\n  background: #5496F8;\n  color: #fff;\n}\n.tooltip-info-arrow {\n  border-right-color: #5496F8 !important;\n}\na {\n  color: inherit;\n  text-decoration: none;\n}\na:hover {\n  color: inherit;\n  text-decoration: none;\n}\na:active {\n  color: inherit;\n  text-decoration: none;\n}\na:focus {\n  outline: none;\n  color: inherit;\n  text-decoration: none;\n}\n.spinner-wave {\n  margin: 0 auto;\n  width: 100px;\n  height: 20px;\n  text-align: center;\n}\n.spinner-wave > div {\n  background-color: #5496F8;\n  height: 100%;\n  width: 6px;\n  display: inline-block;\n  -webkit-animation: wave 1.2s infinite ease-in-out;\n  animation: wave 1.2s infinite ease-in-out;\n}\n.spinner-wave div:nth-child(2) {\n  -webkit-animation-delay: -1.1s;\n  animation-delay: -1.1s;\n}\n.spinner-wave div:nth-child(3) {\n  -webkit-animation-delay: -1s;\n  animation-delay: -1s;\n}\n.spinner-wave div:nth-child(4) {\n  -webkit-animation-delay: -0.9s;\n  animation-delay: -0.9s;\n}\n.spinner-wave div:nth-child(5) {\n  -webkit-animation-delay: -0.8s;\n  animation-delay: -0.8s;\n}\n@-webkit-keyframes wave {\n  0%,\n  40%,\n  100% {\n    -webkit-transform: scaleY(0.4);\n  }\n  20% {\n    -webkit-transform: scaleY(1);\n  }\n}\n@keyframes wave {\n  0%,\n  40%,\n  100% {\n    -webkit-transform: scaleY(0.4);\n            transform: scaleY(0.4);\n  }\n  20% {\n    -webkit-transform: scaleY(1);\n            transform: scaleY(1);\n  }\n}\n@media screen and (max-width: 480px) {\n  .hide-xs {\n    display: none !important;\n  }\n}\n@media screen and (min-width: 480px) {\n  .show-xs {\n    display: none !important;\n  }\n}\n.ht-btn {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 5px 13px;\n  border: 0;\n  background: #ffffff;\n  color: #52616A;\n  -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\n.ht-btn:focus {\n  background: #fcfcfc;\n  outline: 0;\n}\n.ht-btn-card:hover {\n  background: #5496F8;\n  color: rgba(255, 255, 255, 0.96);\n  -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\n.stopped-color {\n  color: #FFBB44;\n}\n.drive-color {\n  color: #5496F8;\n}\n.walk-color {\n  color: #5496F8;\n}\n.moving-color {\n  color: #5496F8;\n}\n.logged_off-color {\n  color: #A9BAC4;\n}\n.network_offline-color {\n  color: #d19191;\n}\n.location_disabled-color {\n  color: #d19191;\n}\n.location_low_accuracy-color {\n  color: #d19191;\n}\n.stopped-bg {\n  background: #FFBB44;\n}\n.drive-bg {\n  background: #5496F8;\n}\n.walk-bg {\n  background: #5496F8;\n}\n.moving-bg {\n  background: #5496F8;\n}\n.logged_off-bg {\n  background: #A9BAC4;\n}\n.network_offline-bg {\n  background: #d19191;\n}\n.location_disabled-bg {\n  background-color: #d19191;\n}\n.location_low_accuracy-bg {\n  background-color: #d19191;\n}\n.load-bar {\n  position: absolute;\n  width: 100%;\n  height: 3px;\n  top: 0;\n  background-color: #fdba2c;\n  z-index: 10000;\n}\n.bar {\n  content: \"\";\n  display: inline;\n  position: absolute;\n  width: 0;\n  height: 100%;\n  left: 50%;\n  text-align: center;\n}\n.bar:nth-child(1) {\n  background-color: #da4733;\n  -webkit-animation: loading 3s linear infinite;\n          animation: loading 3s linear infinite;\n}\n.bar:nth-child(2) {\n  background-color: #3b78e7;\n  -webkit-animation: loading 3s linear 1s infinite;\n          animation: loading 3s linear 1s infinite;\n}\n.bar:nth-child(3) {\n  background-color: #fdba2c;\n  -webkit-animation: loading 3s linear 2s infinite;\n          animation: loading 3s linear 2s infinite;\n}\n@-webkit-keyframes loading {\n  from {\n    left: 50%;\n    width: 0;\n    z-index: 100;\n  }\n  33.3333% {\n    left: 0;\n    width: 100%;\n    z-index: 10;\n  }\n  to {\n    left: 0;\n    width: 100%;\n  }\n}\n@keyframes loading {\n  from {\n    left: 50%;\n    width: 0;\n    z-index: 100;\n  }\n  33.3333% {\n    left: 0;\n    width: 100%;\n    z-index: 10;\n  }\n  to {\n    left: 0;\n    width: 100%;\n  }\n}\n"]
            },] },
];
/** @nocollapse */
LoadingBarComponent.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DropdownDirective = (function () {
    function DropdownDirective() {
        this.show = false;
        this.appDropdown = 'onHover';
    }
    /**
     * @param {?} event
     * @return {?}
     */
    DropdownDirective.prototype.onMouseEnter = function (event) {
        if (!this.appDropdown || this.appDropdown === 'onHover') {
            this.show = true;
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DropdownDirective.prototype.onMouseLeave = function (event) {
        if (!this.appDropdown || this.appDropdown === 'onHover') {
            this.show = false;
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DropdownDirective.prototype.onClick = function (event) {
        if (this.appDropdown == 'onClick') {
            this.show = !this.show;
        }
    };
    /**
     * @return {?}
     */
    DropdownDirective.prototype.ngOnInit = function () {
    };
    return DropdownDirective;
}());
DropdownDirective.decorators = [
    { type: Directive, args: [{
                selector: '[htDropdown]'
            },] },
];
/** @nocollapse */
DropdownDirective.ctorParameters = function () { return []; };
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
var SharedModule = (function () {
    function SharedModule() {
    }
    return SharedModule;
}());
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
                    SnackbarComponent,
                    UsersStatusStringPipe,
                    ActionStatusStringPipe,
                    SafeHtmlPipe,
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
                    SnackbarComponent,
                    UsersStatusStringPipe,
                    ActionStatusStringPipe,
                    SafeHtmlPipe,
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
SharedModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var UserCardModule = (function () {
    function UserCardModule() {
    }
    return UserCardModule;
}());
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
UserCardModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var UsersComponent = (function () {
    function UsersComponent() {
        this.hasMap = false;
        this.showExtraBtn = true;
        this.onSelectUser = new EventEmitter();
        this.onAction = new EventEmitter();
        this.onHover = new EventEmitter();
    }
    /**
     * @return {?}
     */
    UsersComponent.prototype.ngOnInit = function () {
    };
    /**
     * @param {?} user
     * @return {?}
     */
    UsersComponent.prototype.getAction = function (user) {
        // console.log("action", this.loadingUserDataId, this.loadingUserId);
        var /** @type {?} */ id = user.id;
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
    };
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    UsersComponent.prototype.indexId = function (index, item) {
        return item.id;
    };
    /**
     * @param {?} user
     * @return {?}
     */
    UsersComponent.prototype.selectUser = function (user) {
        this.onSelectUser.next(user);
    };
    /**
     * @param {?} id
     * @return {?}
     */
    UsersComponent.prototype.hover = function (id) {
        this.onHover.next(id);
    };
    /**
     * @return {?}
     */
    UsersComponent.prototype.ngOnDestroy = function () {
    };
    return UsersComponent;
}());
UsersComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-users',
                template: "<div class=\"card-stack\" *ngIf=\"users\" [@cardStack]=\"users.length\">\n  <ht-user-card\n    [@sort]=\"i\"\n    class=\"flex-row card card-clickable is-marginless\"\n    [class.card-selected]=\"selectedUserDataId == user.id\"\n    (mouseenter)=\"hover(user.id)\"\n    (mouseleave)=\"hover(null)\"\n    (click)=\"selectUser(user)\"\n    [user]=\"user\" *ngFor=\"let user of users; let i = index; trackBy:indexId\">\n    <div *ngIf=\"selectedUserId\" class=\"card-content-mid card-action flex-row align-center\" (click)=\"onAction.next({event: $event, action: 'close'})\">\n      <a class=\"delete is-medium\"></a>\n    </div>\n    <ht-loading-dots\n      *ngIf=\"user.id === loadingUserDataId && !selectedUserId\" class=\"card-content-mid text-1 card-action flex-row align-center\">\n    </ht-loading-dots>\n  </ht-user-card>\n</div>\n",
                styles: [".card-action-clicked {\n  color: white;\n}\n.card-action {\n  font-size: 1.3em;\n  font-weight: bold;\n  min-width: 46px;\n}\n.card-action.clickable:hover {\n  background: #e6e6e6;\n}\n"],
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
UsersComponent.ctorParameters = function () { return []; };
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
var UsersModule = (function () {
    function UsersModule() {
    }
    return UsersModule;
}());
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
UsersModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var HtMapService = (function (_super) {
    __extends(HtMapService, _super);
    function HtMapService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return HtMapService;
}(HtMapClass));
var MAP_TYPE = new InjectionToken('app.mapType');
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var HtUsersService = (function (_super) {
    __extends(HtUsersService, _super);
    function HtUsersService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return HtUsersService;
}(HtUsersClient));
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var UsersContainerComponent = (function () {
    /**
     * @param {?} userService
     * @param {?} mapService
     */
    function UsersContainerComponent(userService, mapService) {
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
    UsersContainerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.list.setActive();
        if (this.hasPlaceline) {
            var /** @type {?} */ selectedUser$ = listwithSelectedId$(this.userService.list.data$, this.userService.list.id$);
            this.user$ = this.userService.placeline.data$;
            this.usersPage$ = listWithItem$(selectedUser$, this.user$);
            this.mapService.usersCluster.onClick = function (entity) {
                _this.selectUserCard(entity.data);
            };
        }
        else {
            this.usersPage$ = this.userService.list.data$;
        }
        this.users$ = this.usersPage$.pipe(map$1(function (pageData) {
            return pageData ? pageData.results : pageData;
        }));
        this.loadingUsers$ = this.userService.getLoading$();
        this.loadingUserDataId$ = this.userService.placeline.loading$
            .pipe(map$1(function (data) { return !!data; }), distinctUntilChanged());
        this.selectedUserDataId$ = this.userService.placeline.id$;
        this.selectedUserId$ = this.userService.list.id$;
        this.showSummary$ = this.selectedUserId$.pipe(map$1(function (id) {
            return id ? false : true;
        }), distinctUntilChanged());
    };
    Object.defineProperty(UsersContainerComponent.prototype, "queryMap", {
        /**
         * @return {?}
         */
        get: function () {
            var /** @type {?} */ showAllLabel = this.userService.filterClass.showAllQueryArray;
            return this.showAll ? __spread(this._queryMap, showAllLabel) : this._queryMap;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    UsersContainerComponent.prototype.clear = function () {
        this.mapService.segmentTrace.trace(null);
    };
    /**
     * @param {?} user
     * @return {?}
     */
    UsersContainerComponent.prototype.selectUserMarker = function (user) {
        this.mapService.usersCluster.highlight(user);
    };
    /**
     * @param {?} payload
     * @return {?}
     */
    UsersContainerComponent.prototype.onAction = function (payload) {
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
    };
    ;
    /**
     * @param {?} user
     * @return {?}
     */
    UsersContainerComponent.prototype.selectUserCard = function (user) {
        if (this.hasPlaceline) {
            this.selectUser(user);
        }
        else {
            this.selectUserMarker(user);
        }
    };
    /**
     * @param {?} user
     * @param {?} event
     * @return {?}
     */
    UsersContainerComponent.prototype.selectUserCardAction = function (user, event) {
        if (this.hasPlaceline) {
            this.selectUserData(user, event);
        }
        else {
            this.selectUserMarker(user);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    UsersContainerComponent.prototype.closeUser = function (event) {
        event.stopPropagation();
        this.userService.list.setId(null);
        this.userService.placeline.setId(null);
    };
    /**
     * @param {?} user
     * @return {?}
     */
    UsersContainerComponent.prototype.selectUser = function (user) {
        var /** @type {?} */ id = user.id;
        this.userService.list.toggleId(id);
        this.userService.placeline.toggleId(id);
        // this.userService.placeline.setId(id);
    };
    ;
    /**
     * @param {?} userData
     * @param {?} event
     * @return {?}
     */
    UsersContainerComponent.prototype.selectUserData = function (userData, event) {
        var /** @type {?} */ id = userData.id;
        event.stopPropagation();
        this.userService.placeline.toggleId(id);
    };
    /**
     * @param {?} number
     * @return {?}
     */
    UsersContainerComponent.prototype.fetchPage = function (number) {
        this.userService.list.addQuery({ page: number });
    };
    /**
     * @param {?} userId
     * @return {?}
     */
    UsersContainerComponent.prototype.hoverUser = function (userId) {
        this.mapService.usersCluster.setPopup(userId);
    };
    /**
     * @return {?}
     */
    UsersContainerComponent.prototype.closeHoverUser = function () {
        this.hoverUser(null);
    };
    /**
     * @return {?}
     */
    UsersContainerComponent.prototype.ngOnDestroy = function () {
        this.userService.list.clearData();
        this.userService.list.setId(null);
    };
    return UsersContainerComponent;
}());
UsersContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-users-container',
                template: "<div class=\"flex-column relative\">\n  <ng-container *ngIf=\"showSummary$ | async\">\n    <ht-users-summary-container *ngIf=\"showStatusSummary\" [selectable]=\"true\"></ht-users-summary-container>\n    <ht-users-summary-container *ngIf=\"showActiveSummary\" [selectable]=\"true\" [hideTotal]=\"true\" [queryLabels]=\"queryMap\"></ht-users-summary-container>\n  </ng-container>\n\n  <ht-users\n    [selectedUserDataId]=\"selectedUserDataId$ | async\"\n    [selectedUserId]=\"selectedUserId$ | async\"\n    [loadingUserDataId]=\"loadingUserDataId$ | async\"\n    [hasMap]=\"hasMap\"\n    (onHover)=\"hoverUser($event)\"\n    (onAction)=\"onAction($event)\"\n    (onSelectUser)=\"selectUserCard($event)\"\n    [showExtraBtn]=\"hasPlaceline\"\n    [users]=\"users$ | async\"></ht-users>\n  <ht-placeline-container [showUserCard]=\"false\" *ngIf=\"(selectedUserId$ | async)\"></ht-placeline-container>\n  <!--<div *ngIf=\"(selectedUserId$ | async) && user$ | async as userData\">-->\n    <!--&lt;!&ndash;<ht-user-card [user]=\"userData\"></ht-user-card>&ndash;&gt;-->\n    <!--<ht-placeline [userData]=\"userData\"></ht-placeline>-->\n  <!--</div>-->\n  <div class=\"loading-box\" *ngIf=\"loadingUsers$ | async\"></div>\n  <ng-container *ngIf=\"usersPage$ | async as usersPage\">\n    <ht-pagination (fetchPage)=\"fetchPage($event)\" [pageDate]=\"usersPage\"></ht-pagination>\n  </ng-container>\n\n</div>\n",
                styles: [".text-center {\n  text-align: center;\n}\n.text-muted {\n  color: #798E9B;\n}\n.text-right {\n  text-align: right;\n}\n.text-left {\n  text-align: left;\n}\n.text-1 {\n  font-size: 2em;\n}\n.text-4 {\n  font-size: 0.8em;\n}\n.text-capitalize {\n  text-transform: capitalize;\n}\n.text-uppercase {\n  text-transform: uppercase;\n}\n.text-ontime {\n  color: #58ae5b;\n}\n.text-late {\n  color: #E6413E;\n}\n.text-warning {\n  color: #E6413E !important;\n}\n.text-red {\n  color: #E6413E;\n}\n.text-blue {\n  color: #5496F8;\n}\n.truncate {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.flex-row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n}\n.flex-column {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.column-gap-4 > :not(:last-child) {\n  margin-bottom: 4px;\n}\n.row-gap-4 > :not(:last-child) {\n  margin-right: 4px;\n}\n.column-gap-7 > :not(:last-child) {\n  margin-bottom: 7px;\n}\n.row-gap-7 > :not(:last-child) {\n  margin-right: 7px;\n}\n.column-gap-10 > :not(:last-child) {\n  margin-bottom: 10px;\n}\n.row-gap-10 > :not(:last-child) {\n  margin-right: 10px;\n}\n.column-gap-20 > :not(:last-child) {\n  margin-bottom: 20px;\n}\n.row-gap-20 > :not(:last-child) {\n  margin-right: 20px;\n}\n.wrap {\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.flex {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.auto {\n  margin: auto;\n}\n.relative {\n  position: relative;\n}\n.space-between {\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.space-around {\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n}\n.justify-center {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.flex-center {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.align-center {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.clickable {\n  cursor: pointer;\n}\n.round-icon {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 23px;\n  height: 23px;\n  background: #315790;\n  border-radius: 50%;\n}\n.flex-half {\n  -ms-flex-preferred-size: 50%;\n      flex-basis: 50%;\n}\n.link-unstyled {\n  color: inherit;\n}\n.link-unstyled:hover {\n  text-decoration: none;\n}\n.half {\n  width: 50%;\n}\n.noselect {\n  -webkit-touch-callout: none;\n  /* iOS Safari */\n  -webkit-user-select: none;\n  /* Chrome/Safari/Opera */\n  /* Konqueror */\n  -moz-user-select: none;\n  /* Firefox */\n  -ms-user-select: none;\n  /* Internet Explorer/Edge */\n  user-select: none;\n  /* Non-prefixed version, currently\n                                  not supported by any browser */\n}\n.hover-shadow:hover {\n  -webkit-box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.16);\n          box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.16);\n}\n.marker-transparent {\n  opacity: 0.4;\n}\n.marker-fade {\n  -webkit-filter: contrast(16%) brightness(160%) blur(0.6px);\n          filter: contrast(16%) brightness(160%) blur(0.6px);\n}\n.tooltip-warning {\n  background: #e04745;\n  color: #fff;\n}\n.tooltip-warning-arrow {\n  border-right-color: #e04745 !important;\n}\n.tooltip-info {\n  background: #5496F8;\n  color: #fff;\n}\n.tooltip-info-arrow {\n  border-right-color: #5496F8 !important;\n}\na {\n  color: inherit;\n  text-decoration: none;\n}\na:hover {\n  color: inherit;\n  text-decoration: none;\n}\na:active {\n  color: inherit;\n  text-decoration: none;\n}\na:focus {\n  outline: none;\n  color: inherit;\n  text-decoration: none;\n}\n.spinner-wave {\n  margin: 0 auto;\n  width: 100px;\n  height: 20px;\n  text-align: center;\n}\n.spinner-wave > div {\n  background-color: #5496F8;\n  height: 100%;\n  width: 6px;\n  display: inline-block;\n  -webkit-animation: wave 1.2s infinite ease-in-out;\n  animation: wave 1.2s infinite ease-in-out;\n}\n.spinner-wave div:nth-child(2) {\n  -webkit-animation-delay: -1.1s;\n  animation-delay: -1.1s;\n}\n.spinner-wave div:nth-child(3) {\n  -webkit-animation-delay: -1s;\n  animation-delay: -1s;\n}\n.spinner-wave div:nth-child(4) {\n  -webkit-animation-delay: -0.9s;\n  animation-delay: -0.9s;\n}\n.spinner-wave div:nth-child(5) {\n  -webkit-animation-delay: -0.8s;\n  animation-delay: -0.8s;\n}\n@-webkit-keyframes wave {\n  0%,\n  40%,\n  100% {\n    -webkit-transform: scaleY(0.4);\n  }\n  20% {\n    -webkit-transform: scaleY(1);\n  }\n}\n@keyframes wave {\n  0%,\n  40%,\n  100% {\n    -webkit-transform: scaleY(0.4);\n            transform: scaleY(0.4);\n  }\n  20% {\n    -webkit-transform: scaleY(1);\n            transform: scaleY(1);\n  }\n}\n@media screen and (max-width: 480px) {\n  .hide-xs {\n    display: none !important;\n  }\n}\n@media screen and (min-width: 480px) {\n  .show-xs {\n    display: none !important;\n  }\n}\n.ht-btn {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 5px 13px;\n  border: 0;\n  background: #ffffff;\n  color: #52616A;\n  -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\n.ht-btn:focus {\n  background: #fcfcfc;\n  outline: 0;\n}\n.ht-btn-card:hover {\n  background: #5496F8;\n  color: rgba(255, 255, 255, 0.96);\n  -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\n.stopped-color {\n  color: #FFBB44;\n}\n.drive-color {\n  color: #5496F8;\n}\n.walk-color {\n  color: #5496F8;\n}\n.moving-color {\n  color: #5496F8;\n}\n.logged_off-color {\n  color: #A9BAC4;\n}\n.network_offline-color {\n  color: #d19191;\n}\n.location_disabled-color {\n  color: #d19191;\n}\n.location_low_accuracy-color {\n  color: #d19191;\n}\n.stopped-bg {\n  background: #FFBB44;\n}\n.drive-bg {\n  background: #5496F8;\n}\n.walk-bg {\n  background: #5496F8;\n}\n.moving-bg {\n  background: #5496F8;\n}\n.logged_off-bg {\n  background: #A9BAC4;\n}\n.network_offline-bg {\n  background: #d19191;\n}\n.location_disabled-bg {\n  background-color: #d19191;\n}\n.location_low_accuracy-bg {\n  background-color: #d19191;\n}\n.loading-box {\n  position: absolute;\n  background: rgba(255, 255, 255, 0.7);\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  -webkit-transition: background 0.5s;\n  transition: background 0.5s;\n  pointer-events: none;\n}\n.loading-box-active {\n  background: rgba(255, 255, 255, 0.7);\n}\n"]
            },] },
];
/** @nocollapse */
UsersContainerComponent.ctorParameters = function () { return [
    { type: HtUsersService, },
    { type: HtMapService, },
]; };
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
var PlacelineComponent = (function () {
    /**
     * @param {?} ref
     */
    function PlacelineComponent(ref) {
        this.ref = ref;
        this.segmentId = new EventEmitter();
        this.hoveredAction = new EventEmitter();
        this.selectedSegment = new EventEmitter();
        this.selectedPartialSegmentId = "__";
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
    PlacelineComponent.prototype.selectInUserData = function (segment, event) {
        if (segment && (segment.type === 'trip' || segment.type === 'stop')) {
            this.hardSelectedActivity = segment.id;
            this.selectedSegment.next({ segments: [segment] });
        }
        else {
            this.hardSelectedActivity = "";
            this.selectedSegment.next(null);
            if (event)
                event.stopPropagation();
        }
    };
    /**
     * @param {?} segment
     * @param {?=} toShow
     * @return {?}
     */
    PlacelineComponent.prototype.selectSegment = function (segment, toShow) {
        if (toShow === void 0) { toShow = true; }
        if (segment.actionText) {
            var /** @type {?} */ actionId = toShow ? segment.action_id : null;
            this.selectAction(actionId);
        }
        else {
            var /** @type {?} */ userId = toShow ? segment.id : null;
            this.selectActivity(userId);
        }
    };
    /**
     * @param {?} activityId
     * @return {?}
     */
    PlacelineComponent.prototype.hoverActivity = function (activityId) {
        this.selectedActivity = activityId;
        this.ref.detectChanges();
    };
    /**
     * @param {?} activityId
     * @return {?}
     */
    PlacelineComponent.prototype.selectActivity = function (activityId) {
        this.segmentId.next(activityId);
        this.hoverActivity(activityId);
        // console.log(this.selectedActivity, "sele");
    };
    /**
     * @param {?} actionId
     * @return {?}
     */
    PlacelineComponent.prototype.selectAction = function (actionId) {
        this.selectedAction = actionId;
        this.hoveredAction.next(actionId);
        this.ref.detectChanges();
    };
    Object.defineProperty(PlacelineComponent.prototype, "placelineMod", {
        /**
         * @return {?}
         */
        get: function () {
            var _this = this;
            var /** @type {?} */ placeline = this.userData;
            if (this.userData.segments.length === 0)
                return [];
            var /** @type {?} */ actions = placeline.actions;
            this.actionMap = {};
            var _a = this.currentExpActions(actions), currentActions = _a.currentActions, expActions = _a.expActions;
            var /** @type {?} */ allEvents = this.userData.events;
            var activitySegments = reduce(this.userData.segments, function (acc, segment) {
                var /** @type {?} */ time = segment.started_at;
                var /** @type {?} */ activityText = _this.getActivityText(segment);
                var /** @type {?} */ activityClass = _this.getActivityClass(segment);
                var /** @type {?} */ placeAddress = _this.getActivityPlaceAddress(segment);
                var /** @type {?} */ lastSeg = segment;
                var /** @type {?} */ gapSegment = _this.getGapSegment(segment, acc.lastSeg);
                // let lastSeg = _.last(acc.activitySegments);
                var /** @type {?} */ currentActivitySegment = Object.assign({}, segment, { time: time, events: [] }, _this.getSegmentStyle(activityClass), { activityText: activityText, placeAddress: placeAddress });
                var /** @type {?} */ events = reject(acc.events, function (event) {
                    if (_this.isEventInSegment(segment, event)) {
                        // event = {...event, ...this.getEventDisplay(event)};
                        var /** @type {?} */ eventDisplay = _this.getEventDisplay(event);
                        if (eventDisplay)
                            currentActivitySegment.events.push(Object.assign({}, event, eventDisplay));
                        return true;
                    }
                    return false;
                });
                // console.log(gapSegment, "gap");
                var /** @type {?} */ activitySegments = __spread(acc.activitySegments, gapSegment, [currentActivitySegment]);
                // let activitySegments =  [...acc.activitySegments, currentActivitySegment];
                return { activitySegments: activitySegments, events: events, lastSeg: lastSeg };
            }, { activitySegments: [], events: allEvents, lastSeg: null }).activitySegments;
            var /** @type {?} */ lastSeg = this.lastSeg(placeline);
            // activitySegments.push(lastSeg);
            // return activitySegments
            var _b = reduce(__spread(activitySegments, [lastSeg]), function (acc, segment, i, placelineM) {
                activitySegments = acc.activitySegments;
                var /** @type {?} */ lastSeg = segment;
                var /** @type {?} */ activityClass = acc.lastSeg ? acc.lastSeg.activityClass : 'no-info';
                var /** @type {?} */ actionSegments = acc.actionSegments;
                var /** @type {?} */ actionEvents = reject(acc.actionEvents, function (actionEvent) {
                    var /** @type {?} */ actionMin = _this.getMinute(actionEvent.actionTime);
                    var /** @type {?} */ segTime = _this.getMinute(segment.time);
                    if (actionMin == segTime && !segment.ended && !segment.actionText) {
                        // if(actionEvent.actionTime == segment.time) {
                        var /** @type {?} */ actionSegment = _this.createActionSegment(actionEvent, activityClass, acc.lastSeg);
                        segment = Object.assign({}, actionSegment, segment);
                        return true;
                    }
                    else if (actionEvent.actionTime <= segment.time) {
                        // console.log("np match");
                        var /** @type {?} */ actionSegment = _this.createActionSegment(actionEvent, activityClass, acc.lastSeg);
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
                return { activitySegments: activitySegments, actionEvents: actionEvents, lastSeg: lastSeg, actionSegments: actionSegments };
            }, { activitySegments: [], actionEvents: currentActions, lastSeg: null, actionSegments: [] }), actionSegments = _b.actionSegments, actionEvents = _b.actionEvents;
            // activitySegments.pop();
            var /** @type {?} */ unsortedCurrentSegment = __spread(activitySegments, actionSegments);
            var /** @type {?} */ currentSegment = sortBy(unsortedCurrentSegment, function (segment) {
                return segment.time;
            });
            var /** @type {?} */ restActiviySegments = map(actionEvents, function (actionEvent, i) {
                lastSeg['activityBorder'] = 'no-info-border';
                lastSeg['activityText'] = 'No information';
                // let activityClass = i < actionEvents.length - 2 ? 'no-info' : 'line';
                return _this.createActionSegment(actionEvent, 'no-info');
            });
            var /** @type {?} */ expActionSegments = map(expActions, function (actionEvent, i, expEvents) {
                if (actionEvents.length === 0) {
                    lastSeg['activityBorder'] = 'line-border';
                }
                var /** @type {?} */ activityClass = i < expEvents.length - 2 ? 'line' : '';
                return _this.createActionSegment(actionEvent, activityClass);
            });
            // console.log(actionSegments, expActionSegments, "ac");
            // console.log("last seeg", lastSeg);
            // console.log(activitySegments.length,actionSegments.length , expActionSegments.length);
            // console.log(this.userData.segments.length, this.userData.actions.length);
            return lastSeg['time'] ? __spread(currentSegment, [lastSeg], restActiviySegments, expActionSegments) : __spread(currentSegment, expActionSegments);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} actionEvent
     * @param {?=} activityClass
     * @param {?=} seg
     * @return {?}
     */
    PlacelineComponent.prototype.createActionSegment = function (actionEvent, activityClass, seg) {
        if (activityClass === void 0) { activityClass = 'no-info'; }
        if (seg === void 0) { seg = {}; }
        var /** @type {?} */ id = seg ? seg['id'] : '';
        return Object.assign({}, actionEvent, { time: actionEvent.actionTime }, this.getSegmentStyle(activityClass), { ended: false, isLive: false, id: id });
    };
    /**
     * @param {?=} activityClass
     * @return {?}
     */
    PlacelineComponent.prototype.getSegmentStyle = function (activityClass) {
        if (activityClass === void 0) { activityClass = 'no-info'; }
        return activityClass ?
            {
                activityBg: activityClass + "-bg",
                activityBorder: activityClass + "-border",
                activityClass: activityClass,
                activityColor: activityClass + "-color"
            } : {};
    };
    /**
     * @param {?} segment
     * @param {?} event
     * @return {?}
     */
    PlacelineComponent.prototype.isEventInSegment = function (segment, event) {
        if (!!segment.ended_at && !!event.recorded_at) {
            var /** @type {?} */ eventMin = this.getMinute(event.recorded_at);
            var /** @type {?} */ segEndMin = this.getMinute(segment.ended_at);
            var /** @type {?} */ segStartMin = this.getMinute(segment.started_at);
            return eventMin >= segStartMin && eventMin <= segEndMin;
        }
        return false;
    };
    /**
     * @param {?} time
     * @return {?}
     */
    PlacelineComponent.prototype.getMinute = function (time) {
        var /** @type {?} */ timeStamp = new Date(time).getTime();
        return Math.round(timeStamp - timeStamp % 60000);
    };
    /**
     * @param {?} actions
     * @return {?}
     */
    PlacelineComponent.prototype.currentExpActions = function (actions) {
        var _this = this;
        return reduce(actions, function (acc, action) {
            var /** @type {?} */ expActions = [];
            _this.actionMap = _this.setActionMap(action);
            var /** @type {?} */ assign = Object.assign({ actionText: NameCase(action.type) + " assigned", actionTime: action.assigned_at, actionD: NameCase(action.type[0]) + _this.actionMap[action.id], action_id: action.id, actionLookupId: action.lookup_id }, action);
            var /** @type {?} */ currentActions = (assign.actionTime) ? __spread(acc.currentActions, [assign]) : acc.currentActions;
            if (action.display.ended_at) {
                var /** @type {?} */ end = Object.assign({ actionText: NameCase(action.type) + " " + action.status, actionTime: action.display.ended_at, actionD: NameCase(action.type[0]) + _this.actionMap[action.id], actionEnd: true, action_id: action.id, action_distance: action.distance, action_duration: action.duration, actionEnded: true, actionLookupId: action.lookup_id }, action);
                currentActions = __spread(currentActions, [end]);
            }
            else {
                var /** @type {?} */ end = Object.assign({ actionText: NameCase(action.type) + " scheduled", actionTime: action.eta || null, actionD: NameCase(action.type[0]) + _this.actionMap[action.id], actionEnd: true, action_id: action.id, action_distance: action.distance, action_duration: action.duration, actionLookupId: action.lookup_id }, action);
                expActions.push(end);
            }
            return { currentActions: currentActions, expActions: expActions };
        }, { currentActions: [], expActions: [] });
    };
    /**
     * @param {?} placeline
     * @return {?}
     */
    PlacelineComponent.prototype.lastSeg = function (placeline) {
        var /** @type {?} */ lastSeg = last(placeline.segments);
        if (!lastSeg)
            return {};
        // let last = {time: lastSeg['last_heartbeat_at']};
        var /** @type {?} */ pipeClass = "";
        var /** @type {?} */ time;
        var /** @type {?} */ isLive = new HtPlaceline().isLive(placeline);
        if (!isLive) {
            time = lastSeg.ended_at;
        }
        else {
            isLive = true;
            time = placeline.last_heartbeat_at;
        }
        var /** @type {?} */ activityClass = this.getActivityClass(lastSeg);
        return { time: time, pipeClass: pipeClass, lastSeg: true, isLive: isLive, ended: true, activityClass: activityClass, activityBg: this.getActivityClass(lastSeg) + "-bg" };
    };
    /**
     * @param {?} placeline
     * @return {?}
     */
    PlacelineComponent.prototype.isSegmentLive = function (placeline) {
        var /** @type {?} */ old = placeline.display.seconds_elapsed_since_last_heartbeat;
        var /** @type {?} */ status = placeline.display.status_text;
        return status !== 'Logged off' && old < 15 * 60;
    };
    /**
     * @param {?} segment
     * @return {?}
     */
    PlacelineComponent.prototype.getActivityClass = function (segment) {
        var /** @type {?} */ type = segment.type;
        if (type === 'location_void') {
            return 'warning';
        }
        return type === 'stop' ? 'stop' : 'trip';
    };
    /**
     * @param {?} status
     * @return {?}
     */
    PlacelineComponent.prototype.getPipeClass = function (status) {
        return status === 'stop' ? 'stop solid' : 'trip solid';
    };
    /**
     * @param {?} segment
     * @return {?}
     */
    PlacelineComponent.prototype.getActivityText = function (segment) {
        if (segment.activity) {
            return segment.activity;
        }
        else if (segment.type === 'stop') {
            return 'Stop';
        }
        else if (segment.reason) {
            return this.getLocationVoidText(segment);
        }
        else {
            return NameCase(segment.type);
        }
    };
    /**
     * @param {?} segment
     * @return {?}
     */
    PlacelineComponent.prototype.getActivityPlaceAddress = function (segment) {
        if (segment.type === 'stop' && segment.place && segment.place.locality) {
            return segment.place.locality;
        }
        return "";
    };
    /**
     * @param {?} segment
     * @return {?}
     */
    PlacelineComponent.prototype.getLocationVoidText = function (segment) {
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
    };
    /**
     * @param {?} event
     * @return {?}
     */
    PlacelineComponent.prototype.getEventDisplay = function (event) {
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
    };
    /**
     * @param {?} segment
     * @param {?} lastSeg
     * @return {?}
     */
    PlacelineComponent.prototype.getGapSegment = function (segment, lastSeg) {
        var /** @type {?} */ gaps = [];
        if (!lastSeg)
            return [];
        if (segment.started_at && lastSeg.ended_at) {
            var /** @type {?} */ endMin = this.getMinute(segment.started_at);
            var /** @type {?} */ startMin = this.getMinute(lastSeg.ended_at);
            var /** @type {?} */ duration = (new Date(segment.started_at).getTime() - new Date(lastSeg.ended_at).getTime()) / 1000;
            if (endMin !== startMin && startMin < endMin) {
                var /** @type {?} */ gap = Object.assign({}, this.getSegmentStyle('no-info'), { time: lastSeg.ended_at, activityText: 'No information', events: [], duration: duration, id: "asd" });
                gaps.push(gap);
            }
        }
        return gaps;
    };
    /**
     * @param {?} action
     * @return {?}
     */
    PlacelineComponent.prototype.setActionMap = function (action) {
        var /** @type {?} */ actionMap = this.actionMap;
        var /** @type {?} */ type = action.type;
        var /** @type {?} */ id = action.id;
        var /** @type {?} */ typeCount = this.actionMap[type];
        var /** @type {?} */ actionShort = this.actionMap[id];
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
    };
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    PlacelineComponent.prototype.indexId = function (index, item) {
        return item.id;
    };
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    PlacelineComponent.prototype.indexPlaceline = function (index, item) {
        return item.time || "";
    };
    /**
     * @param {?} a
     * @return {?}
     */
    PlacelineComponent.prototype.log = function (a) {
        console.log(a);
    };
    /**
     * @return {?}
     */
    PlacelineComponent.prototype.ngOnInit = function () {
    };
    return PlacelineComponent;
}());
PlacelineComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-placeline',
                template: "<div class=\"flex-column\">\n  <div\n    class=\"flex-row segment\"\n    (click)=\"selectInUserData(segment)\"\n    [class.active-segment]=\"(selectedActivity == segment.id && segment.activityBorder && !selectedPartialSegmentId) || selectedPartialSegmentId === segment.id\"\n    (mouseenter)=\"selectActivity(segment.id)\"\n    (mouseleave)=\"selectActivity(null)\"\n    *ngFor=\"let segment of placelineMod; trackBy:indexPlaceline; let last = last\">\n    <div class=\"time-container action-time\">\n      <div class=\"target-status text-muted\">\n      </div>\n      <div class=\"timestamp\">\n        {{segment.time | timeString | dot: 'Unknown ETA'}}\n      </div>\n      <div class=\"text-muted\">\n        {{segment.time | dateString: 'short'}}\n      </div>\n      <!--<div class=\"time-container-mid text-muted\" *ngIf=\"!segment.actionD\">-->\n        <!--<span>{{segment.duration / 60 | hmString}}</span>-->\n      <!--</div>-->\n    </div>\n    <div class=\"pipe\">\n      <div class=\"bar\" *ngIf=\"!last\" [class.big]=\"(selectedActivity == segment.id && segment.activityBorder && !selectedPartialSegmentId) || selectedPartialSegmentId === segment.id\" [class.solid]=\"segment.activityBorder\" [ngClass]=\"segment.activityBorder\"></div>\n    </div>\n    <div class=\"flex-column flex timeline-detail\">\n      <div class=\"activity-dot segment-dot\" [class.activity-dot-ended]=\"segment.actionEnded\" *ngIf=\"segment.actionD\"><div class=\"auto\">{{segment.actionD}} </div></div>\n      <div *ngIf=\"segment.isLive\" [ngClass]=\"segment.activityBg\" class=\"segment-dot\"><div *ngIf=\"segment.isLive\" [ngClass]=\"segment.activityBg\" class=\"pulse\"></div></div>\n      <div *ngIf=\"!segment.isLive && !segment.actionD\" class=\"a-dot\" [ngClass]=\"segment.activityBorder\"></div>\n      <div class=\"flex-column column-gap-10\">\n        <div (mouseenter)=\"selectAction(segment.action_id)\" (mouseleave)=\"selectAction(null)\" class=\"action-card\" *ngIf=\"segment.actionText\">\n          <div class=\"flex-column column-gap-4\">\n            <div class=\"title\">\n              {{segment.actionText}}\n            </div>\n            <div class=\"lookup\" *ngIf=\"segment.actionLookupId\">{{segment.actionLookupId}}</div>\n            <div *ngIf=\"segment.expected_at && segment.actionEnd\">Scheduled at {{segment.expected_at | timeString}}</div>\n            <div *ngIf=\"segment.action_duration\" class=\"flex-row row-gap-4\">\n              <span>{{segment.action_duration / 60 | hmString}}</span>\n              <ng-template [ngIf]=\"(segment.action_distance || segment.action_distance == 0)\">\n                <span>&bull;</span>\n                <span>{{segment.action_distance | distanceLocale}}</span>\n              </ng-template>\n            </div>\n          </div>\n        </div>\n        <!--<pre>-->\n        <!--{{segment | json}}-->\n        <!--</pre>-->\n        <div class=\"activity-card flex-column\" [class.activity-card-selected]=\"selectedPartialSegmentId == segment.id\" *ngIf=\"segment.activityText\">\n          <div [ngClass]=\"segment.activityColor\">\n            {{segment.activityText | nameCase}}\n          </div>\n          <div class=\"flex-row row-gap-4 activity-stats align-center\" *ngIf=\"segment.duration\">\n            <span>{{segment.duration / 60 | hmString}}</span>\n            <ng-template [ngIf]=\"(segment.distance || segment.distance == 0) && segment.type == 'trip'\">\n              <span>&bull;</span>\n              <span>{{segment.distance | distanceLocale}}</span>\n            </ng-template>\n          </div>\n          <div>\n            {{segment.placeAddress}}\n          </div>\n          <table class=\"table table-bordered table-condensed\" *ngIf=\"segment.events && segment.events.length\">\n            <tbody>\n            <tr *ngFor=\"let event of segment.events; trackBy:indexId\">\n              <td>{{event.recorded_at | timeString}}</td>\n              <td>{{event.text}}</td>\n            </tr>\n            </tbody>\n          </table>\n          <div class=\"close-card\" *ngIf=\"selectedPartialSegmentId == segment.id && !isMobile\" (click)=\"selectInUserData(null, $event)\">\n            <i class=\"fa fa-times-circle fa-2x\"></i>\n          </div>\n        </div>\n        <div *ngIf=\"segment.isLive\" class=\"text-muted heatbeat\">\n          Last heartbeat\n        </div>\n      </div>\n\n\n    </div>\n  </div>\n</div>\n<div class=\"card\" *ngIf=\"placelineMod && placelineMod.length == 0\">\n  <div class=\"card-content-mid text-center\"><strong>No Placeline</strong></div>\n</div>\n",
                styles: [".text-center {\n  text-align: center;\n}\n.text-muted {\n  color: #798E9B;\n}\n.text-right {\n  text-align: right;\n}\n.text-left {\n  text-align: left;\n}\n.text-1 {\n  font-size: 2em;\n}\n.text-4 {\n  font-size: 0.8em;\n}\n.text-capitalize {\n  text-transform: capitalize;\n}\n.text-uppercase {\n  text-transform: uppercase;\n}\n.text-ontime {\n  color: #58ae5b;\n}\n.text-late {\n  color: #E6413E;\n}\n.text-warning {\n  color: #E6413E !important;\n}\n.text-red {\n  color: #E6413E;\n}\n.text-blue {\n  color: #5496F8;\n}\n.truncate {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.flex-row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n}\n.flex-column {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.column-gap-4 > :not(:last-child) {\n  margin-bottom: 4px;\n}\n.row-gap-4 > :not(:last-child) {\n  margin-right: 4px;\n}\n.column-gap-7 > :not(:last-child) {\n  margin-bottom: 7px;\n}\n.row-gap-7 > :not(:last-child) {\n  margin-right: 7px;\n}\n.column-gap-10 > :not(:last-child) {\n  margin-bottom: 10px;\n}\n.row-gap-10 > :not(:last-child) {\n  margin-right: 10px;\n}\n.column-gap-20 > :not(:last-child) {\n  margin-bottom: 20px;\n}\n.row-gap-20 > :not(:last-child) {\n  margin-right: 20px;\n}\n.wrap {\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.flex {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.auto {\n  margin: auto;\n}\n.relative {\n  position: relative;\n}\n.space-between {\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.space-around {\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n}\n.justify-center {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.flex-center {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.align-center {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.clickable {\n  cursor: pointer;\n}\n.round-icon {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 23px;\n  height: 23px;\n  background: #315790;\n  border-radius: 50%;\n}\n.flex-half {\n  -ms-flex-preferred-size: 50%;\n      flex-basis: 50%;\n}\n.link-unstyled {\n  color: inherit;\n}\n.link-unstyled:hover {\n  text-decoration: none;\n}\n.half {\n  width: 50%;\n}\n.noselect {\n  -webkit-touch-callout: none;\n  /* iOS Safari */\n  -webkit-user-select: none;\n  /* Chrome/Safari/Opera */\n  /* Konqueror */\n  -moz-user-select: none;\n  /* Firefox */\n  -ms-user-select: none;\n  /* Internet Explorer/Edge */\n  user-select: none;\n  /* Non-prefixed version, currently\n                                  not supported by any browser */\n}\n.hover-shadow:hover {\n  -webkit-box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.16);\n          box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.16);\n}\n.marker-transparent {\n  opacity: 0.4;\n}\n.marker-fade {\n  -webkit-filter: contrast(16%) brightness(160%) blur(0.6px);\n          filter: contrast(16%) brightness(160%) blur(0.6px);\n}\n.tooltip-warning {\n  background: #e04745;\n  color: #fff;\n}\n.tooltip-warning-arrow {\n  border-right-color: #e04745 !important;\n}\n.tooltip-info {\n  background: #5496F8;\n  color: #fff;\n}\n.tooltip-info-arrow {\n  border-right-color: #5496F8 !important;\n}\na {\n  color: inherit;\n  text-decoration: none;\n}\na:hover {\n  color: inherit;\n  text-decoration: none;\n}\na:active {\n  color: inherit;\n  text-decoration: none;\n}\na:focus {\n  outline: none;\n  color: inherit;\n  text-decoration: none;\n}\n.spinner-wave {\n  margin: 0 auto;\n  width: 100px;\n  height: 20px;\n  text-align: center;\n}\n.spinner-wave > div {\n  background-color: #5496F8;\n  height: 100%;\n  width: 6px;\n  display: inline-block;\n  -webkit-animation: wave 1.2s infinite ease-in-out;\n  animation: wave 1.2s infinite ease-in-out;\n}\n.spinner-wave div:nth-child(2) {\n  -webkit-animation-delay: -1.1s;\n  animation-delay: -1.1s;\n}\n.spinner-wave div:nth-child(3) {\n  -webkit-animation-delay: -1s;\n  animation-delay: -1s;\n}\n.spinner-wave div:nth-child(4) {\n  -webkit-animation-delay: -0.9s;\n  animation-delay: -0.9s;\n}\n.spinner-wave div:nth-child(5) {\n  -webkit-animation-delay: -0.8s;\n  animation-delay: -0.8s;\n}\n@-webkit-keyframes wave {\n  0%,\n  40%,\n  100% {\n    -webkit-transform: scaleY(0.4);\n  }\n  20% {\n    -webkit-transform: scaleY(1);\n  }\n}\n@keyframes wave {\n  0%,\n  40%,\n  100% {\n    -webkit-transform: scaleY(0.4);\n            transform: scaleY(0.4);\n  }\n  20% {\n    -webkit-transform: scaleY(1);\n            transform: scaleY(1);\n  }\n}\n@media screen and (max-width: 480px) {\n  .hide-xs {\n    display: none !important;\n  }\n}\n@media screen and (min-width: 480px) {\n  .show-xs {\n    display: none !important;\n  }\n}\n.ht-btn {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 5px 13px;\n  border: 0;\n  background: #ffffff;\n  color: #52616A;\n  -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\n.ht-btn:focus {\n  background: #fcfcfc;\n  outline: 0;\n}\n.ht-btn-card:hover {\n  background: #5496F8;\n  color: rgba(255, 255, 255, 0.96);\n  -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\n.stopped-color {\n  color: #FFBB44;\n}\n.drive-color {\n  color: #5496F8;\n}\n.walk-color {\n  color: #5496F8;\n}\n.moving-color {\n  color: #5496F8;\n}\n.logged_off-color {\n  color: #A9BAC4;\n}\n.network_offline-color {\n  color: #d19191;\n}\n.location_disabled-color {\n  color: #d19191;\n}\n.location_low_accuracy-color {\n  color: #d19191;\n}\n.stopped-bg {\n  background: #FFBB44;\n}\n.drive-bg {\n  background: #5496F8;\n}\n.walk-bg {\n  background: #5496F8;\n}\n.moving-bg {\n  background: #5496F8;\n}\n.logged_off-bg {\n  background: #A9BAC4;\n}\n.network_offline-bg {\n  background: #d19191;\n}\n.location_disabled-bg {\n  background-color: #d19191;\n}\n.location_low_accuracy-bg {\n  background-color: #d19191;\n}\n:host {\n  margin: 30px 0;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.segment {\n  border-radius: 4px;\n  padding-right: 18px;\n}\n.active-segment {\n  background: rgba(255, 255, 255, 0.75);\n}\n.trip-status {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  text-align: center;\n  color: #52616A;\n  margin-bottom: 20px;\n  position: relative;\n}\n.trip-status .status-main {\n  font-size: 31px;\n  font-weight: 600;\n}\n.trip-status .status-sub {\n  color: #798E9B;\n  font-size: 12px;\n}\n.ht-breadcrumb {\n  padding-bottom: 19px;\n}\n.card {\n  margin-bottom: 9px;\n}\n.card .action-img {\n  margin: 0 auto;\n}\n.card .content-right {\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n  position: relative;\n  text-align: center;\n}\n.driver-container {\n  margin-bottom: 20px;\n  border-bottom: 1px solid #C9D6DE;\n  padding-bottom: 16px;\n}\n.driver-container .text-muted {\n  color: #A9BAC4;\n}\n.task-status {\n  padding-bottom: 20px;\n  text-align: center;\n  color: #52616A;\n}\n.time-container {\n  width: 84px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  text-align: right;\n  padding-right: 20px;\n  padding-bottom: 16px;\n  z-index: 5;\n  color: #52616A;\n}\n.time-container .target-status {\n  font-size: 10px;\n}\n.time-container .timestamp {\n  font-size: 14px;\n  color: #52616A;\n}\n.time-container .text-muted {\n  color: #A9BAC4;\n  font-size: 12px;\n}\n.time-container .timestamp-text {\n  font-size: 12px;\n  color: #52616A;\n  font-weight: 700;\n}\n.time-container-mid {\n  height: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.pipe {\n  width: 20px;\n  min-width: 20px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  z-index: 1;\n}\n.pipe .bar {\n  height: 100%;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.pipe .big {\n  outline: 2px solid;\n}\n.pipe .solid {\n  border-right: 3px solid #798E9B;\n}\n.pipe .line {\n  border-right: 3px dotted #798E9B;\n}\n.pipe .line-border {\n  border-right: 3px dotted #798E9B;\n  outline: 0;\n}\n.pipe .light {\n  border-right: 3px dashed rgba(121, 142, 155, 0.4);\n}\n.pipe .fade {\n  border-right: 3px solid rgba(121, 142, 155, 0.14);\n}\n.timeline-detail {\n  padding-bottom: 22px;\n  position: relative;\n  padding-left: 16px;\n  min-height: 66px;\n}\n.timeline-detail .task-action {\n  font-size: 16px;\n  color: #52616A;\n  text-transform: capitalize;\n  margin-bottom: 4px;\n  -webkit-transition: font-size 0.4s;\n  transition: font-size 0.4s;\n}\n.timeline-detail .action-title {\n  font-size: 16px;\n  color: #52616A;\n  text-transform: capitalize;\n  -webkit-transition: font-size 0.4s;\n  transition: font-size 0.4s;\n  font-weight: 700;\n}\n.timeline-detail .task-detail {\n  background: #fff;\n  padding: 6px 10px;\n  color: #52616A;\n  -webkit-transition: font-size 0.4s;\n  transition: font-size 0.4s;\n}\n.timeline-detail .task-icon {\n  position: absolute;\n  left: -23px;\n  top: -2px;\n}\n.timeline-detail .task-ontime-status {\n  color: #55ad58;\n  padding-bottom: 4px;\n  font-size: 11px;\n  -webkit-transition: font-size 0.4s;\n  transition: font-size 0.4s;\n}\n.timeline-detail .text-late {\n  color: #E6413E;\n}\n.selected-task .task-action {\n  font-size: 18px;\n}\n.selected-task .task-detail {\n  font-size: 13px;\n}\n.selected-task .task-ontime-status {\n  font-size: 13px;\n}\n.trip-event .pipe {\n  padding-top: 7px;\n}\n.trip-event .time-container {\n  padding-bottom: 24px;\n}\n.segment-dot {\n  width: 25px;\n  height: 25px;\n  border-radius: 50%;\n  background: #fff;\n  position: absolute;\n  top: -1px;\n  left: -23px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  z-index: 2;\n}\n.a-dot {\n  width: 9px;\n  height: 9px;\n  border-radius: 50%;\n  background: #fff;\n  border: 2px solid #798E9B;\n  position: absolute;\n  top: -4px;\n  left: -14px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  background-color: white;\n  z-index: 2;\n}\n.activity-dot {\n  border: 1px solid #798E9B;\n  font-size: 10px;\n}\n.activity-dot-ended {\n  background: #798E9B;\n  color: #fff;\n}\n.trip-dot {\n  border: 0px solid #5496F8;\n  background: #5496F8;\n}\n.trip-dot .pulse {\n  background: #5496F8;\n}\n.stop-dot {\n  border: 0px solid #5496F8;\n  background: #5496F8;\n}\n.stop-dot .pulse {\n  background: #5496F8;\n}\n@-webkit-keyframes pulse {\n  0% {\n    -webkit-transform: scale(0.3, 0.3);\n            transform: scale(0.3, 0.3);\n    opacity: 0.9;\n  }\n  100% {\n    -webkit-transform: scale(3, 3);\n            transform: scale(3, 3);\n    opacity: 0;\n  }\n}\n@keyframes pulse {\n  0% {\n    -webkit-transform: scale(0.3, 0.3);\n            transform: scale(0.3, 0.3);\n    opacity: 0.9;\n  }\n  100% {\n    -webkit-transform: scale(3, 3);\n            transform: scale(3, 3);\n    opacity: 0;\n  }\n}\n.ranges li.active {\n  background: #52616A;\n  border-color: #52616A;\n}\n.ranges li {\n  color: #52616A;\n}\n.ranges li:hover {\n  background: #52616A;\n  border-color: #52616A;\n}\n.pulse {\n  border-radius: 50%;\n  height: 25px;\n  width: 25px;\n  -webkit-animation: pulse 3s ease-out;\n          animation: pulse 3s ease-out;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n  position: absolute;\n  z-index: 10;\n  opacity: 1;\n  margin: auto;\n}\n.trip {\n  color: #5496F8;\n  border-color: #5496F8 !important;\n}\n.stop {\n  color: #FFBB44;\n  border-color: #FFBB44 !important;\n}\n.no-info {\n  color: #FFBB44;\n  border-color: #A9BAC4 !important;\n}\n.ht-faded {\n  opacity: 0.4;\n}\n.action {\n  position: absolute;\n  top: 6px;\n  padding: 3px;\n  font-size: 19px;\n  color: #798E9B;\n}\n.action-left {\n  left: 11px;\n  font-size: 35px;\n  color: #A9BAC4;\n}\n.action-left:hover {\n  color: #798E9B;\n}\n.text-sm {\n  font-size: 11px;\n  color: #52616A;\n  padding-bottom: 7px;\n}\n.title {\n  font-size: 13px;\n  font-weight: bold;\n}\n.activity-card {\n  padding: 6px 10px;\n  color: #52616A;\n  -webkit-transition: font-size 0.4s;\n  transition: font-size 0.4s;\n  font-size: 13px;\n  position: relative;\n  cursor: pointer;\n}\n.activity-card-selected {\n  background: #fff;\n}\n.activity-card-selected:hover {\n  background: #fff;\n}\n.activity-card .close-card {\n  position: absolute;\n  top: -3px;\n  right: -3px;\n  color: #52616A;\n  height: 14px;\n  width: 14px;\n  border-radius: 50%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.activity-card .close-card .fa {\n  margin: auto;\n}\n.action-card {\n  background: #fff;\n  padding: 3px 11px;\n  border: 1px solid #C9D6DE;\n  font-size: 11px;\n  cursor: pointer;\n  color: #52616A;\n  margin-left: -127px;\n  padding-left: 134px;\n  margin-top: -9px;\n  min-height: 50px;\n  -webkit-box-shadow: 1px 2px 2px 0px rgba(0, 0, 0, 0.07);\n          box-shadow: 1px 2px 2px 0px rgba(0, 0, 0, 0.07);\n}\n.action-card:hover {\n  border: 1px solid #798E9B;\n}\n.action-card-active {\n  border: 1px solid #798E9B;\n}\n.trip-border {\n  border-color: #5496F8 !important;\n  outline-color: #5496F8 !important;\n}\n.stop-border {\n  border-color: #FFBB44 !important;\n  outline-color: #FFBB44 !important;\n}\n.no-info-border {\n  border-color: #A9BAC4 !important;\n  outline-color: #A9BAC4 !important;\n}\n.warning-border {\n  border-color: #d19191 !important;\n  outline-color: #d19191 !important;\n}\n.trip-bg {\n  background: #5496F8;\n}\n.stop-bg {\n  background: #FFBB44;\n}\n.no-info-bg {\n  background: #A9BAC4;\n}\n.warning-bg {\n  background: #d19191;\n}\n.trip-color {\n  color: #5496F8;\n}\n.stop-color {\n  color: #ffb025;\n}\n.no-info-color {\n  color: #A9BAC4;\n}\n.warning-color {\n  color: #d19191;\n}\n.table {\n  margin: 7px 0;\n  font-size: 11px;\n}\n.activity-stats {\n  font-size: 12px;\n  font-weight: bold;\n}\n.heatbeat {\n  padding-left: 12px;\n  font-size: 13px;\n}\n"],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
PlacelineComponent.ctorParameters = function () { return [
    { type: ChangeDetectorRef, },
]; };
PlacelineComponent.propDecorators = {
    "segmentId": [{ type: Output },],
    "hoveredAction": [{ type: Output },],
    "selectedSegment": [{ type: Output },],
    "userData": [{ type: Input },],
    "selectedPartialSegmentId": [{ type: Input },],
    "isMobile": [{ type: Input },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PlacelineModule = (function () {
    function PlacelineModule() {
    }
    return PlacelineModule;
}());
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
PlacelineModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PlacelineContainerComponent = (function () {
    /**
     * @param {?} userClientService
     */
    function PlacelineContainerComponent(userClientService) {
        this.userClientService = userClientService;
        this.showUserCard = true;
    }
    /**
     * @return {?}
     */
    PlacelineContainerComponent.prototype.ngOnInit = function () {
        this.userData$ = this.userClientService.placeline.data$;
        if (this.userId) {
            this.userClientService.placeline.setId(this.userId);
        }
    };
    /**
     * @param {?} segmentId
     * @return {?}
     */
    PlacelineContainerComponent.prototype.onSegmentId = function (segmentId) {
        this.userClientService.placeline.setSegmentSelectedId(segmentId);
    };
    /**
     * @param {?} segmentId
     * @return {?}
     */
    PlacelineContainerComponent.prototype.onSelectSegmentId = function (segmentId) {
        var _this = this;
        this.userClientService.placeline.setSegmentResetMapId(segmentId);
        setTimeout(function () {
            _this.userClientService.placeline.setSegmentResetMapId(null);
        });
    };
    /**
     * @return {?}
     */
    PlacelineContainerComponent.prototype.ngOnDestroy = function () {
        this.userClientService.placeline.setId(null);
        this.userClientService.placeline.clearData();
    };
    return PlacelineContainerComponent;
}());
PlacelineContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-placeline-container',
                template: "<div class=\"flex-column column-gap-10\" *ngIf=\"userData$ | async as userData; else loading\">\n  <ht-user-card *ngIf=\"showUserCard\" [user]=\"userData\"></ht-user-card>\n  <ht-placeline (selectedSegment)=\"onSelectSegmentId($event)\" (segmentId)=\"onSegmentId($event)\" [userData]=\"userData\"></ht-placeline>\n</div>\n<ng-template #loading>\n  <ht-loading-dots class=\"text-1 text-center flex-row\"></ht-loading-dots>\n</ng-template>\n",
                styles: [".text-center {\n  text-align: center;\n}\n.text-muted {\n  color: #798E9B;\n}\n.text-right {\n  text-align: right;\n}\n.text-left {\n  text-align: left;\n}\n.text-1 {\n  font-size: 2em;\n}\n.text-4 {\n  font-size: 0.8em;\n}\n.text-capitalize {\n  text-transform: capitalize;\n}\n.text-uppercase {\n  text-transform: uppercase;\n}\n.text-ontime {\n  color: #58ae5b;\n}\n.text-late {\n  color: #E6413E;\n}\n.text-warning {\n  color: #E6413E !important;\n}\n.text-red {\n  color: #E6413E;\n}\n.text-blue {\n  color: #5496F8;\n}\n.truncate {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.flex-row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n}\n.flex-column {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.column-gap-4 > :not(:last-child) {\n  margin-bottom: 4px;\n}\n.row-gap-4 > :not(:last-child) {\n  margin-right: 4px;\n}\n.column-gap-7 > :not(:last-child) {\n  margin-bottom: 7px;\n}\n.row-gap-7 > :not(:last-child) {\n  margin-right: 7px;\n}\n.column-gap-10 > :not(:last-child) {\n  margin-bottom: 10px;\n}\n.row-gap-10 > :not(:last-child) {\n  margin-right: 10px;\n}\n.column-gap-20 > :not(:last-child) {\n  margin-bottom: 20px;\n}\n.row-gap-20 > :not(:last-child) {\n  margin-right: 20px;\n}\n.wrap {\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.flex {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.auto {\n  margin: auto;\n}\n.relative {\n  position: relative;\n}\n.space-between {\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.space-around {\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n}\n.justify-center {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.flex-center {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.align-center {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.clickable {\n  cursor: pointer;\n}\n.round-icon {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 23px;\n  height: 23px;\n  background: #315790;\n  border-radius: 50%;\n}\n.flex-half {\n  -ms-flex-preferred-size: 50%;\n      flex-basis: 50%;\n}\n.link-unstyled {\n  color: inherit;\n}\n.link-unstyled:hover {\n  text-decoration: none;\n}\n.half {\n  width: 50%;\n}\n.noselect {\n  -webkit-touch-callout: none;\n  /* iOS Safari */\n  -webkit-user-select: none;\n  /* Chrome/Safari/Opera */\n  /* Konqueror */\n  -moz-user-select: none;\n  /* Firefox */\n  -ms-user-select: none;\n  /* Internet Explorer/Edge */\n  user-select: none;\n  /* Non-prefixed version, currently\n                                  not supported by any browser */\n}\n.hover-shadow:hover {\n  -webkit-box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.16);\n          box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.16);\n}\n.marker-transparent {\n  opacity: 0.4;\n}\n.marker-fade {\n  -webkit-filter: contrast(16%) brightness(160%) blur(0.6px);\n          filter: contrast(16%) brightness(160%) blur(0.6px);\n}\n.tooltip-warning {\n  background: #e04745;\n  color: #fff;\n}\n.tooltip-warning-arrow {\n  border-right-color: #e04745 !important;\n}\n.tooltip-info {\n  background: #5496F8;\n  color: #fff;\n}\n.tooltip-info-arrow {\n  border-right-color: #5496F8 !important;\n}\na {\n  color: inherit;\n  text-decoration: none;\n}\na:hover {\n  color: inherit;\n  text-decoration: none;\n}\na:active {\n  color: inherit;\n  text-decoration: none;\n}\na:focus {\n  outline: none;\n  color: inherit;\n  text-decoration: none;\n}\n.spinner-wave {\n  margin: 0 auto;\n  width: 100px;\n  height: 20px;\n  text-align: center;\n}\n.spinner-wave > div {\n  background-color: #5496F8;\n  height: 100%;\n  width: 6px;\n  display: inline-block;\n  -webkit-animation: wave 1.2s infinite ease-in-out;\n  animation: wave 1.2s infinite ease-in-out;\n}\n.spinner-wave div:nth-child(2) {\n  -webkit-animation-delay: -1.1s;\n  animation-delay: -1.1s;\n}\n.spinner-wave div:nth-child(3) {\n  -webkit-animation-delay: -1s;\n  animation-delay: -1s;\n}\n.spinner-wave div:nth-child(4) {\n  -webkit-animation-delay: -0.9s;\n  animation-delay: -0.9s;\n}\n.spinner-wave div:nth-child(5) {\n  -webkit-animation-delay: -0.8s;\n  animation-delay: -0.8s;\n}\n@-webkit-keyframes wave {\n  0%,\n  40%,\n  100% {\n    -webkit-transform: scaleY(0.4);\n  }\n  20% {\n    -webkit-transform: scaleY(1);\n  }\n}\n@keyframes wave {\n  0%,\n  40%,\n  100% {\n    -webkit-transform: scaleY(0.4);\n            transform: scaleY(0.4);\n  }\n  20% {\n    -webkit-transform: scaleY(1);\n            transform: scaleY(1);\n  }\n}\n@media screen and (max-width: 480px) {\n  .hide-xs {\n    display: none !important;\n  }\n}\n@media screen and (min-width: 480px) {\n  .show-xs {\n    display: none !important;\n  }\n}\n.ht-btn {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 5px 13px;\n  border: 0;\n  background: #ffffff;\n  color: #52616A;\n  -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\n.ht-btn:focus {\n  background: #fcfcfc;\n  outline: 0;\n}\n.ht-btn-card:hover {\n  background: #5496F8;\n  color: rgba(255, 255, 255, 0.96);\n  -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\n.stopped-color {\n  color: #FFBB44;\n}\n.drive-color {\n  color: #5496F8;\n}\n.walk-color {\n  color: #5496F8;\n}\n.moving-color {\n  color: #5496F8;\n}\n.logged_off-color {\n  color: #A9BAC4;\n}\n.network_offline-color {\n  color: #d19191;\n}\n.location_disabled-color {\n  color: #d19191;\n}\n.location_low_accuracy-color {\n  color: #d19191;\n}\n.stopped-bg {\n  background: #FFBB44;\n}\n.drive-bg {\n  background: #5496F8;\n}\n.walk-bg {\n  background: #5496F8;\n}\n.moving-bg {\n  background: #5496F8;\n}\n.logged_off-bg {\n  background: #A9BAC4;\n}\n.network_offline-bg {\n  background: #d19191;\n}\n.location_disabled-bg {\n  background-color: #d19191;\n}\n.location_low_accuracy-bg {\n  background-color: #d19191;\n}\n:host {\n  max-width: 500px;\n}\nht-loading-dots {\n  width: 100%;\n  margin-top: 20%;\n}\n"],
            },] },
];
/** @nocollapse */
PlacelineContainerComponent.ctorParameters = function () { return [
    { type: HtUsersService, },
]; };
PlacelineContainerComponent.propDecorators = {
    "userId": [{ type: Input },],
    "showUserCard": [{ type: Input },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PlacelineContainerModule = (function () {
    function PlacelineContainerModule() {
    }
    return PlacelineContainerModule;
}());
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
PlacelineContainerModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var UsersSummaryContainerComponent = (function () {
    /**
     * @param {?} usersClientService
     */
    function UsersSummaryContainerComponent(usersClientService) {
        this.usersClientService = usersClientService;
        this.hideTotal = false;
        this.selectable = false;
    }
    /**
     * @return {?}
     */
    UsersSummaryContainerComponent.prototype.ngOnInit = function () {
        this.usersClientService.summary.setActive();
        this.summary$ = this.usersClientService.listStatusChart$(this.queryLabels);
        // this.summary$ = this.usersClientService.summary.data$
    };
    /**
     * @param {?} key
     * @return {?}
     */
    UsersSummaryContainerComponent.prototype.onClearQueryKey = function (key) {
        this.usersClientService.list.clearQueryKey(key);
    };
    /**
     * @param {?} query
     * @return {?}
     */
    UsersSummaryContainerComponent.prototype.setQuery = function (query$$1) {
        this.usersClientService.list.setQueryReset(query$$1);
    };
    /**
     * @return {?}
     */
    UsersSummaryContainerComponent.prototype.ngOnDestroy = function () {
        this.usersClientService.summary.clearData();
    };
    return UsersSummaryContainerComponent;
}());
UsersSummaryContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-users-summary-container',
                template: "<div [@summaryAnim] *ngIf=\"summary$ | async as summary\">\n  <ht-users-summary\n    [hideTotal]=\"hideTotal\"\n    (clearQueryKey)=\"onClearQueryKey($event)\"\n    (setQuery)=\"setQuery($event)\"\n    [selectable]=\"selectable\"\n    [summary]=\"summary\"></ht-users-summary>\n</div>\n\n",
                styles: ["ht-users-summary {\n  padding: 10px 20px;\n}\n"],
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
UsersSummaryContainerComponent.ctorParameters = function () { return [
    { type: HtUsersService, },
]; };
UsersSummaryContainerComponent.propDecorators = {
    "queryLabels": [{ type: Input },],
    "hideTotal": [{ type: Input },],
    "selectable": [{ type: Input },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var UsersSummaryComponent = (function () {
    function UsersSummaryComponent() {
        this.setQuery = new EventEmitter();
        this.clearQueryKey = new EventEmitter();
        this.selectable = false;
    }
    /**
     * @return {?}
     */
    UsersSummaryComponent.prototype.ngOnInit = function () {
    };
    /**
     * @param {?} query
     * @return {?}
     */
    UsersSummaryComponent.prototype.onHoverQuery = function (query$$1) {
        this.hoveredQuery = query$$1.label;
    };
    /**
     * @return {?}
     */
    UsersSummaryComponent.prototype.onHoveroutQuery = function () {
        this.hoveredQuery = "";
    };
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    UsersSummaryComponent.prototype.indexId = function (index, item) {
        return item.label;
    };
    /**
     * @param {?} datum
     * @return {?}
     */
    UsersSummaryComponent.prototype.setFilter = function (datum) {
        var /** @type {?} */ query$$1 = { status: datum.values.toString() };
        this.setQuery.next(query$$1);
    };
    /**
     * @param {?} datum
     * @return {?}
     */
    UsersSummaryComponent.prototype.clearFilter = function (datum) {
        this.clearQueryKey.next('status');
    };
    /**
     * @param {?} datum
     * @return {?}
     */
    UsersSummaryComponent.prototype.selectLabel = function (datum) {
        if (!this.selectable)
            return false;
        if (datum.selected) {
            this.clearFilter(datum);
        }
        else {
            this.setFilter(datum);
        }
    };
    return UsersSummaryComponent;
}());
UsersSummaryComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-users-summary',
                template: "<div class=\"flex-column justify-center label-container has-text-grey\">\n  <div *ngIf=\"!hideTotal\" class=\"count text-center\">{{summary.totalUsers}} {{'user' | pluralize: summary.totalUsers}}</div>\n\n  <div class=\"flex-row\" *ngIf=\"summary.totalUsers\">\n    <ng-container *ngFor=\"let datum of summary.chart; trackBy:indexId; let i = index\">\n      <div\n        class=\"bar\"\n        [style.flex-basis.%]=\"datum.value/summary.totalUsers * 100\"\n        [style.background-color]=\"datum.color\"\n        [class.faded]=\"hoveredQuery && hoveredQuery !== datum.label\"\n        [class.bar-selected]=\"hoveredQuery && hoveredQuery === datum.label\"\n      *ngIf=\"datum.value\"></div>\n    </ng-container>\n\n  </div>\n  <div *ngIf=\"summary.totalUsers == 0\" class=\"bar\" style=\"width: 100%; background: #ccc\"></div>\n  <div class=\"flex-row row-gap-4\">\n    <!--<div class=\"box\" [style.background-color]=\"datum.color\"></div>-->\n    <div\n      class=\"graph-label flex-column\"\n      [class.graph-active]=\"datum.selected\"\n      [class.graph-label-selectable]=\"selectable\"\n      (click)=\"selectLabel(datum)\"\n      (mouseenter)=\"onHoverQuery(datum)\"\n      (mouseleave)=\"onHoveroutQuery()\"\n      *ngFor=\"let datum of summary.chart; trackBy:indexId; let i = index\">\n      <strong class=\"text-center is-size-4\" [style.color]=\"datum.color\">\n        {{datum.value}}\n      </strong>\n      <span class=\"text-center\">{{datum.label}}</span>\n\n    </div>\n    <!--<div class=\"box\" style=\"background-color: #ccc;\"></div>-->\n  </div>\n</div>\n<!--{{summary | json}}-->\n",
                styles: [".text-center {\n  text-align: center;\n}\n.text-muted {\n  color: #798E9B;\n}\n.text-right {\n  text-align: right;\n}\n.text-left {\n  text-align: left;\n}\n.text-1 {\n  font-size: 2em;\n}\n.text-4 {\n  font-size: 0.8em;\n}\n.text-capitalize {\n  text-transform: capitalize;\n}\n.text-uppercase {\n  text-transform: uppercase;\n}\n.text-ontime {\n  color: #58ae5b;\n}\n.text-late {\n  color: #E6413E;\n}\n.text-warning {\n  color: #E6413E !important;\n}\n.text-red {\n  color: #E6413E;\n}\n.text-blue {\n  color: #5496F8;\n}\n.truncate {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.flex-row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n}\n.flex-column {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.column-gap-4 > :not(:last-child) {\n  margin-bottom: 4px;\n}\n.row-gap-4 > :not(:last-child) {\n  margin-right: 4px;\n}\n.column-gap-7 > :not(:last-child) {\n  margin-bottom: 7px;\n}\n.row-gap-7 > :not(:last-child) {\n  margin-right: 7px;\n}\n.column-gap-10 > :not(:last-child) {\n  margin-bottom: 10px;\n}\n.row-gap-10 > :not(:last-child) {\n  margin-right: 10px;\n}\n.column-gap-20 > :not(:last-child) {\n  margin-bottom: 20px;\n}\n.row-gap-20 > :not(:last-child) {\n  margin-right: 20px;\n}\n.wrap {\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.flex {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.auto {\n  margin: auto;\n}\n.relative {\n  position: relative;\n}\n.space-between {\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.space-around {\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n}\n.justify-center {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.flex-center {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.align-center {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.clickable {\n  cursor: pointer;\n}\n.round-icon {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 23px;\n  height: 23px;\n  background: #315790;\n  border-radius: 50%;\n}\n.flex-half {\n  -ms-flex-preferred-size: 50%;\n      flex-basis: 50%;\n}\n.link-unstyled {\n  color: inherit;\n}\n.link-unstyled:hover {\n  text-decoration: none;\n}\n.half {\n  width: 50%;\n}\n.noselect {\n  -webkit-touch-callout: none;\n  /* iOS Safari */\n  -webkit-user-select: none;\n  /* Chrome/Safari/Opera */\n  /* Konqueror */\n  -moz-user-select: none;\n  /* Firefox */\n  -ms-user-select: none;\n  /* Internet Explorer/Edge */\n  user-select: none;\n  /* Non-prefixed version, currently\n                                  not supported by any browser */\n}\n.hover-shadow:hover {\n  -webkit-box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.16);\n          box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.16);\n}\n.marker-transparent {\n  opacity: 0.4;\n}\n.marker-fade {\n  -webkit-filter: contrast(16%) brightness(160%) blur(0.6px);\n          filter: contrast(16%) brightness(160%) blur(0.6px);\n}\n.tooltip-warning {\n  background: #e04745;\n  color: #fff;\n}\n.tooltip-warning-arrow {\n  border-right-color: #e04745 !important;\n}\n.tooltip-info {\n  background: #5496F8;\n  color: #fff;\n}\n.tooltip-info-arrow {\n  border-right-color: #5496F8 !important;\n}\na {\n  color: inherit;\n  text-decoration: none;\n}\na:hover {\n  color: inherit;\n  text-decoration: none;\n}\na:active {\n  color: inherit;\n  text-decoration: none;\n}\na:focus {\n  outline: none;\n  color: inherit;\n  text-decoration: none;\n}\n.spinner-wave {\n  margin: 0 auto;\n  width: 100px;\n  height: 20px;\n  text-align: center;\n}\n.spinner-wave > div {\n  background-color: #5496F8;\n  height: 100%;\n  width: 6px;\n  display: inline-block;\n  -webkit-animation: wave 1.2s infinite ease-in-out;\n  animation: wave 1.2s infinite ease-in-out;\n}\n.spinner-wave div:nth-child(2) {\n  -webkit-animation-delay: -1.1s;\n  animation-delay: -1.1s;\n}\n.spinner-wave div:nth-child(3) {\n  -webkit-animation-delay: -1s;\n  animation-delay: -1s;\n}\n.spinner-wave div:nth-child(4) {\n  -webkit-animation-delay: -0.9s;\n  animation-delay: -0.9s;\n}\n.spinner-wave div:nth-child(5) {\n  -webkit-animation-delay: -0.8s;\n  animation-delay: -0.8s;\n}\n@-webkit-keyframes wave {\n  0%,\n  40%,\n  100% {\n    -webkit-transform: scaleY(0.4);\n  }\n  20% {\n    -webkit-transform: scaleY(1);\n  }\n}\n@keyframes wave {\n  0%,\n  40%,\n  100% {\n    -webkit-transform: scaleY(0.4);\n            transform: scaleY(0.4);\n  }\n  20% {\n    -webkit-transform: scaleY(1);\n            transform: scaleY(1);\n  }\n}\n@media screen and (max-width: 480px) {\n  .hide-xs {\n    display: none !important;\n  }\n}\n@media screen and (min-width: 480px) {\n  .show-xs {\n    display: none !important;\n  }\n}\n.ht-btn {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 5px 13px;\n  border: 0;\n  background: #ffffff;\n  color: #52616A;\n  -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\n.ht-btn:focus {\n  background: #fcfcfc;\n  outline: 0;\n}\n.ht-btn-card:hover {\n  background: #5496F8;\n  color: rgba(255, 255, 255, 0.96);\n  -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\n.stopped-color {\n  color: #FFBB44;\n}\n.drive-color {\n  color: #5496F8;\n}\n.walk-color {\n  color: #5496F8;\n}\n.moving-color {\n  color: #5496F8;\n}\n.logged_off-color {\n  color: #A9BAC4;\n}\n.network_offline-color {\n  color: #d19191;\n}\n.location_disabled-color {\n  color: #d19191;\n}\n.location_low_accuracy-color {\n  color: #d19191;\n}\n.stopped-bg {\n  background: #FFBB44;\n}\n.drive-bg {\n  background: #5496F8;\n}\n.walk-bg {\n  background: #5496F8;\n}\n.moving-bg {\n  background: #5496F8;\n}\n.logged_off-bg {\n  background: #A9BAC4;\n}\n.network_offline-bg {\n  background: #d19191;\n}\n.location_disabled-bg {\n  background-color: #d19191;\n}\n.location_low_accuracy-bg {\n  background-color: #d19191;\n}\n.ht-box {\n  height: 20px;\n  min-width: 20px;\n  border-radius: 50%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  color: white;\n  text-shadow: 0px 0.5px 1px #ffffff;\n  font-weight: bold;\n}\n.label-container {\n  min-width: 170px;\n}\n.graph-label {\n  -webkit-transition: color 0.2s;\n  transition: color 0.2s;\n  padding: 1px 5px;\n  color: #52616A;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border-radius: 4px;\n  font-size: 14px;\n  margin-top: 5px;\n}\n.graph-label:hover {\n  outline: 1px solid #d6d6d6;\n}\n.graph-label-selectable {\n  cursor: pointer;\n}\n.bar {\n  height: 10px;\n  -webkit-transition: width 1s ease-in-out;\n  transition: width 1s ease-in-out;\n  -webkit-transition: opacity 0.3s ease-in-out;\n  transition: opacity 0.3s ease-in-out;\n  float: right;\n}\n.bar:first-child {\n  border-bottom-left-radius: 3px;\n  border-top-left-radius: 3px;\n}\n.bar:last-child {\n  border-bottom-right-radius: 3px;\n  border-top-right-radius: 3px;\n}\n.graph-active {\n  background: #e2e2e2;\n}\n.count {\n  font-size: 21px;\n  color: #52616A;\n  padding-bottom: 18px;\n}\n:host {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.faded {\n  opacity: 0.4;\n}\n.bar-selected {\n  outline: 1px solid;\n}\n"]
            },] },
];
/** @nocollapse */
UsersSummaryComponent.ctorParameters = function () { return []; };
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
var UsersSummaryModule = (function () {
    function UsersSummaryModule() {
    }
    return UsersSummaryModule;
}());
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
UsersSummaryModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var UsersSummaryContainerModule = (function () {
    function UsersSummaryContainerModule() {
    }
    return UsersSummaryContainerModule;
}());
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
UsersSummaryContainerModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PaginationComponent = (function () {
    function PaginationComponent() {
        this.pageSize = 10;
        this.fetchPage = new EventEmitter();
    }
    /**
     * @return {?}
     */
    PaginationComponent.prototype.ngOnInit = function () {
    };
    Object.defineProperty(PaginationComponent.prototype, "currentPage", {
        /**
         * @return {?}
         */
        get: function () {
            var /** @type {?} */ preUrl = this.pageDate.previous;
            var /** @type {?} */ page = 1;
            if (preUrl) {
                var /** @type {?} */ prevPage = GetUrlParam('page', this.pageDate.previous) || 1;
                // console.log(prevPage);
                page = +prevPage + 1;
            }
            return page;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "pagesCount", {
        /**
         * @return {?}
         */
        get: function () {
            var /** @type {?} */ count = this.pageDate.count;
            // let rem = count % this.pageSize;
            return Math.ceil(count / this.pageSize);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "visiblePages", {
        /**
         * @return {?}
         */
        get: function () {
            var _this = this;
            return Array(this.pagesCount).fill(1).map(function (n, i) { return n + i; }).filter(function (i) {
                if (_this.currentPage === 1) {
                    return (_this.currentPage - i >= -2);
                }
                else if (_this.currentPage + 1 === i) {
                    return true;
                }
                else if (_this.currentPage + 2 === i) {
                    return true;
                }
                else if (_this.currentPage === i) {
                    return true;
                }
                else if (_this.currentPage === _this.pagesCount) {
                    return (_this.currentPage - i <= 2);
                }
                return false;
            });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} pageNumber
     * @return {?}
     */
    PaginationComponent.prototype.onFetchPage = function (pageNumber) {
        // console.log(pageNumber);
        if (pageNumber < 1 || pageNumber > this.pagesCount)
            return;
        this.fetchPage.next(pageNumber);
        // this.fetchPage.emit(pageNumber);
        // this.currentPage = pageNumber;
        // this.hasNextPage = (this.currentPage < this.numberOfPages);
        // this.hasPreviousPage = (this.currentPage > 1);
        // this.pages = this.getVisiblePages();
    };
    return PaginationComponent;
}());
PaginationComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-pagination',
                template: "<!--<p>-->\n  <!--pagination works!-->\n<!--</p>-->\n<!--<p>Count: {{pageDate.count}}</p>-->\n<!--<p>Page: {{currentPage}}</p>-->\n<!--<p>Pages: {{pagesCount}}</p>-->\n<!--<div class=\"pagination-container columns\" *ngIf=\"pagesCount > 1\">-->\n  <!--<div [class.disabled]=\"!pageDate.previous\" (click)=\"onFetchPage(currentPage - 1)\" class=\"pagination-element\">-->\n    <!--<i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>-->\n  <!--</div>-->\n  <!--<ng-container *ngIf=\"currentPage - 1 > 1\">-->\n    <!--<div (click)=\"onFetchPage(1)\" class=\"\">-->\n      <!--<span class=\"pagination-number\">1</span>-->\n    <!--</div>-->\n    <!--<span>&hellip;</span>-->\n    <!--&lt;!&ndash;<div>.</div>&ndash;&gt;-->\n    <!--&lt;!&ndash;<div>.</div>&ndash;&gt;-->\n    <!--&lt;!&ndash;<div>.</div>&ndash;&gt;-->\n  <!--</ng-container>-->\n\n  <!--<div (click)=\"onFetchPage(page)\" class=\"\" *ngFor=\"let page of visiblePages\" [ngClass]=\"currentPage === page ? 'is-current' : ''\">-->\n    <!--<span class=\"pagination-number\">{{page}}</span>-->\n  <!--</div>-->\n  <!--<ng-container *ngIf=\"pagesCount - currentPage > 2\">-->\n    <!--<span>&hellip;</span>-->\n    <!--&lt;!&ndash;<div>.</div>&ndash;&gt;-->\n    <!--&lt;!&ndash;<div>.</div>&ndash;&gt;-->\n    <!--&lt;!&ndash;<div>.</div>&ndash;&gt;-->\n    <!--<div (click)=\"onFetchPage(pagesCount)\" class=\"\">-->\n      <!--<span class=\"pagination-number\">{{pagesCount}}</span>-->\n    <!--</div>-->\n  <!--</ng-container>-->\n  <!--&lt;!&ndash;<div [class.disabled]=\"currentPage == pagesCount\" (click)=\"onFetchPage(pagesCount)\" class=\"pagination-element\">&ndash;&gt;-->\n  <!--&lt;!&ndash;<i class=\"fa fa-angle-double-right\" aria-hidden=\"true\"></i>&ndash;&gt;-->\n  <!--&lt;!&ndash;</div>&ndash;&gt;-->\n  <!--<div [attr.disabled]=\"!pageDate.next\" (click)=\"onFetchPage(currentPage + 1)\" class=\"\">-->\n    <!--<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>-->\n  <!--</div>-->\n<!--</div>-->\n\n<nav class=\"pagination is-small is-centered\" role=\"navigation\" aria-label=\"pagination\" *ngIf=\"pagesCount > 1\">\n  <ul class=\"pagination-list\">\n    <li>\n      <a class=\"pagination-link\" [attr.disabled]=\"!pageDate.previous ? true : null\"  (click)=\"onFetchPage(currentPage - 1)\" aria-label=\"Goto page 1\">\n        <i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>\n      </a>\n    </li>\n    <ng-container *ngIf=\"currentPage - 1 > 1\">\n      <li (click)=\"onFetchPage(1)\" class=\"\">\n        <a class=\"pagination-link\">1</a>\n      </li>\n      <li>\n        <span class=\"pagination-ellipsis\">&hellip;</span>\n      </li>\n    </ng-container>\n    <li (click)=\"onFetchPage(page)\" class=\"\" *ngFor=\"let page of visiblePages\">\n      <a class=\"pagination-link\" [ngClass]=\"currentPage === page ? 'is-current' : ''\">{{page}}</a>\n    </li>\n    <ng-container *ngIf=\"pagesCount - currentPage > 2\">\n      <li>\n        <span class=\"pagination-ellipsis\">&hellip;</span>\n      </li>\n      <li (click)=\"onFetchPage(pagesCount)\" class=\"\">\n        <a class=\"pagination-link\">{{pagesCount}}</a>\n      </li>\n    </ng-container>\n\n    <li [attr.disabled]=\"!pageDate.next ? true : null\" (click)=\"onFetchPage(currentPage + 1)\" class=\"\">\n      <a class=\"pagination-link\">\n        <i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>\n      </a>\n    </li>\n\n\n    <!--<li>-->\n      <!--<span class=\"pagination-ellipsis\">&hellip;</span>-->\n    <!--</li>-->\n    <!--<li>-->\n      <!--<a class=\"pagination-link\" aria-label=\"Goto page 45\">45</a>-->\n    <!--</li>-->\n    <!--<li>-->\n      <!--<a class=\"pagination-link is-current\" aria-label=\"Page 46\" aria-current=\"page\">46</a>-->\n    <!--</li>-->\n    <!--<li>-->\n      <!--<a class=\"pagination-link\" aria-label=\"Goto page 47\">47</a>-->\n    <!--</li>-->\n    <!--<li>-->\n      <!--<span class=\"pagination-ellipsis\">&hellip;</span>-->\n    <!--</li>-->\n    <!--<li>-->\n      <!--<a class=\"pagination-link\" aria-label=\"Goto page 86\">86</a>-->\n    <!--</li>-->\n  </ul>\n</nav>\n\n",
                styles: [".text-center {\n  text-align: center;\n}\n.text-muted {\n  color: #798E9B;\n}\n.text-right {\n  text-align: right;\n}\n.text-left {\n  text-align: left;\n}\n.text-1 {\n  font-size: 2em;\n}\n.text-4 {\n  font-size: 0.8em;\n}\n.text-capitalize {\n  text-transform: capitalize;\n}\n.text-uppercase {\n  text-transform: uppercase;\n}\n.text-ontime {\n  color: #58ae5b;\n}\n.text-late {\n  color: #E6413E;\n}\n.text-warning {\n  color: #E6413E !important;\n}\n.text-red {\n  color: #E6413E;\n}\n.text-blue {\n  color: #5496F8;\n}\n.truncate {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.flex-row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n}\n.flex-column {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.column-gap-4 > :not(:last-child) {\n  margin-bottom: 4px;\n}\n.row-gap-4 > :not(:last-child) {\n  margin-right: 4px;\n}\n.column-gap-7 > :not(:last-child) {\n  margin-bottom: 7px;\n}\n.row-gap-7 > :not(:last-child) {\n  margin-right: 7px;\n}\n.column-gap-10 > :not(:last-child) {\n  margin-bottom: 10px;\n}\n.row-gap-10 > :not(:last-child) {\n  margin-right: 10px;\n}\n.column-gap-20 > :not(:last-child) {\n  margin-bottom: 20px;\n}\n.row-gap-20 > :not(:last-child) {\n  margin-right: 20px;\n}\n.wrap {\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.flex {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.auto {\n  margin: auto;\n}\n.relative {\n  position: relative;\n}\n.space-between {\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.space-around {\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n}\n.justify-center {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.flex-center {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.align-center {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.clickable {\n  cursor: pointer;\n}\n.round-icon {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 23px;\n  height: 23px;\n  background: #315790;\n  border-radius: 50%;\n}\n.flex-half {\n  -ms-flex-preferred-size: 50%;\n      flex-basis: 50%;\n}\n.link-unstyled {\n  color: inherit;\n}\n.link-unstyled:hover {\n  text-decoration: none;\n}\n.half {\n  width: 50%;\n}\n.noselect {\n  -webkit-touch-callout: none;\n  /* iOS Safari */\n  -webkit-user-select: none;\n  /* Chrome/Safari/Opera */\n  /* Konqueror */\n  -moz-user-select: none;\n  /* Firefox */\n  -ms-user-select: none;\n  /* Internet Explorer/Edge */\n  user-select: none;\n  /* Non-prefixed version, currently\n                                  not supported by any browser */\n}\n.hover-shadow:hover {\n  -webkit-box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.16);\n          box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.16);\n}\n.marker-transparent {\n  opacity: 0.4;\n}\n.marker-fade {\n  -webkit-filter: contrast(16%) brightness(160%) blur(0.6px);\n          filter: contrast(16%) brightness(160%) blur(0.6px);\n}\n.tooltip-warning {\n  background: #e04745;\n  color: #fff;\n}\n.tooltip-warning-arrow {\n  border-right-color: #e04745 !important;\n}\n.tooltip-info {\n  background: #5496F8;\n  color: #fff;\n}\n.tooltip-info-arrow {\n  border-right-color: #5496F8 !important;\n}\na {\n  color: inherit;\n  text-decoration: none;\n}\na:hover {\n  color: inherit;\n  text-decoration: none;\n}\na:active {\n  color: inherit;\n  text-decoration: none;\n}\na:focus {\n  outline: none;\n  color: inherit;\n  text-decoration: none;\n}\n.spinner-wave {\n  margin: 0 auto;\n  width: 100px;\n  height: 20px;\n  text-align: center;\n}\n.spinner-wave > div {\n  background-color: #5496F8;\n  height: 100%;\n  width: 6px;\n  display: inline-block;\n  -webkit-animation: wave 1.2s infinite ease-in-out;\n  animation: wave 1.2s infinite ease-in-out;\n}\n.spinner-wave div:nth-child(2) {\n  -webkit-animation-delay: -1.1s;\n  animation-delay: -1.1s;\n}\n.spinner-wave div:nth-child(3) {\n  -webkit-animation-delay: -1s;\n  animation-delay: -1s;\n}\n.spinner-wave div:nth-child(4) {\n  -webkit-animation-delay: -0.9s;\n  animation-delay: -0.9s;\n}\n.spinner-wave div:nth-child(5) {\n  -webkit-animation-delay: -0.8s;\n  animation-delay: -0.8s;\n}\n@-webkit-keyframes wave {\n  0%,\n  40%,\n  100% {\n    -webkit-transform: scaleY(0.4);\n  }\n  20% {\n    -webkit-transform: scaleY(1);\n  }\n}\n@keyframes wave {\n  0%,\n  40%,\n  100% {\n    -webkit-transform: scaleY(0.4);\n            transform: scaleY(0.4);\n  }\n  20% {\n    -webkit-transform: scaleY(1);\n            transform: scaleY(1);\n  }\n}\n@media screen and (max-width: 480px) {\n  .hide-xs {\n    display: none !important;\n  }\n}\n@media screen and (min-width: 480px) {\n  .show-xs {\n    display: none !important;\n  }\n}\n.ht-btn {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 5px 13px;\n  border: 0;\n  background: #ffffff;\n  color: #52616A;\n  -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\n.ht-btn:focus {\n  background: #fcfcfc;\n  outline: 0;\n}\n.ht-btn-card:hover {\n  background: #5496F8;\n  color: rgba(255, 255, 255, 0.96);\n  -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\n.stopped-color {\n  color: #FFBB44;\n}\n.drive-color {\n  color: #5496F8;\n}\n.walk-color {\n  color: #5496F8;\n}\n.moving-color {\n  color: #5496F8;\n}\n.logged_off-color {\n  color: #A9BAC4;\n}\n.network_offline-color {\n  color: #d19191;\n}\n.location_disabled-color {\n  color: #d19191;\n}\n.location_low_accuracy-color {\n  color: #d19191;\n}\n.stopped-bg {\n  background: #FFBB44;\n}\n.drive-bg {\n  background: #5496F8;\n}\n.walk-bg {\n  background: #5496F8;\n}\n.moving-bg {\n  background: #5496F8;\n}\n.logged_off-bg {\n  background: #A9BAC4;\n}\n.network_offline-bg {\n  background: #d19191;\n}\n.location_disabled-bg {\n  background-color: #d19191;\n}\n.location_low_accuracy-bg {\n  background-color: #d19191;\n}\n.pagination {\n  padding: 20px 0;\n  width: 100%;\n}\n.pagination-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  padding: 30px 10px;\n}\n.pagination-container > :not(:last-child) {\n  margin-right: 7px;\n}\n.pagination-element {\n  border: 1px solid #D9D9D9;\n  width: 28px;\n  height: 28px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  background: white;\n  border-radius: 3px;\n  cursor: pointer;\n  color: #666666;\n}\n.pagination-element.disabled {\n  cursor: not-allowed;\n  pointer-events: none;\n}\n.pagination-element.disabled i {\n  color: #CCCCCC;\n}\n.pagination-element i {\n  color: #666666;\n}\n.pagination-element .pagination-number {\n  font-size: 12px;\n  color: #666666;\n  line-height: 18px;\n}\n.pagination-element.selected {\n  background: #108EE9;\n}\n.pagination-element.selected .pagination-number {\n  color: #ffffff;\n}\n.disabled {\n  cursor: not-allowed;\n  pointer-events: none;\n  color: #CCCCCC;\n}\n.fa {\n  font-size: 1.3em;\n}\n"],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
PaginationComponent.ctorParameters = function () { return []; };
PaginationComponent.propDecorators = {
    "pageDate": [{ type: Input },],
    "pageSize": [{ type: Input },],
    "fetchPage": [{ type: Output },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PaginationModule = (function () {
    function PaginationModule() {
    }
    return PaginationModule;
}());
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
PaginationModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var UsersContainerModule = (function () {
    function UsersContainerModule() {
    }
    return UsersContainerModule;
}());
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
UsersContainerModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var GroupsComponent = (function () {
    function GroupsComponent() {
        this.groupIdParam = 'id';
    }
    /**
     * @return {?}
     */
    GroupsComponent.prototype.ngOnInit = function () {
    };
    return GroupsComponent;
}());
GroupsComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-groups',
                template: "<div class=\"card-stack\">\n  <a [routerLink]=\"['/groups', group[groupIdParam]]\" class=\"card\" *ngFor=\"let group of groups\">\n    <div class=\"card-content-mid\">\n      {{group.name}}\n    </div>\n  </a>\n</div>\n",
                styles: [".text-center {\n  text-align: center;\n}\n.text-muted {\n  color: #798E9B;\n}\n.text-right {\n  text-align: right;\n}\n.text-left {\n  text-align: left;\n}\n.text-1 {\n  font-size: 2em;\n}\n.text-4 {\n  font-size: 0.8em;\n}\n.text-capitalize {\n  text-transform: capitalize;\n}\n.text-uppercase {\n  text-transform: uppercase;\n}\n.text-ontime {\n  color: #58ae5b;\n}\n.text-late {\n  color: #E6413E;\n}\n.text-warning {\n  color: #E6413E !important;\n}\n.text-red {\n  color: #E6413E;\n}\n.text-blue {\n  color: #5496F8;\n}\n.truncate {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.flex-row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n}\n.flex-column {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.column-gap-4 > :not(:last-child) {\n  margin-bottom: 4px;\n}\n.row-gap-4 > :not(:last-child) {\n  margin-right: 4px;\n}\n.column-gap-7 > :not(:last-child) {\n  margin-bottom: 7px;\n}\n.row-gap-7 > :not(:last-child) {\n  margin-right: 7px;\n}\n.column-gap-10 > :not(:last-child) {\n  margin-bottom: 10px;\n}\n.row-gap-10 > :not(:last-child) {\n  margin-right: 10px;\n}\n.column-gap-20 > :not(:last-child) {\n  margin-bottom: 20px;\n}\n.row-gap-20 > :not(:last-child) {\n  margin-right: 20px;\n}\n.wrap {\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.flex {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.auto {\n  margin: auto;\n}\n.relative {\n  position: relative;\n}\n.space-between {\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.space-around {\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n}\n.justify-center {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.flex-center {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.align-center {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.clickable {\n  cursor: pointer;\n}\n.round-icon {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 23px;\n  height: 23px;\n  background: #315790;\n  border-radius: 50%;\n}\n.flex-half {\n  -ms-flex-preferred-size: 50%;\n      flex-basis: 50%;\n}\n.link-unstyled {\n  color: inherit;\n}\n.link-unstyled:hover {\n  text-decoration: none;\n}\n.half {\n  width: 50%;\n}\n.noselect {\n  -webkit-touch-callout: none;\n  /* iOS Safari */\n  -webkit-user-select: none;\n  /* Chrome/Safari/Opera */\n  /* Konqueror */\n  -moz-user-select: none;\n  /* Firefox */\n  -ms-user-select: none;\n  /* Internet Explorer/Edge */\n  user-select: none;\n  /* Non-prefixed version, currently\n                                  not supported by any browser */\n}\n.hover-shadow:hover {\n  -webkit-box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.16);\n          box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.16);\n}\n.marker-transparent {\n  opacity: 0.4;\n}\n.marker-fade {\n  -webkit-filter: contrast(16%) brightness(160%) blur(0.6px);\n          filter: contrast(16%) brightness(160%) blur(0.6px);\n}\n.tooltip-warning {\n  background: #e04745;\n  color: #fff;\n}\n.tooltip-warning-arrow {\n  border-right-color: #e04745 !important;\n}\n.tooltip-info {\n  background: #5496F8;\n  color: #fff;\n}\n.tooltip-info-arrow {\n  border-right-color: #5496F8 !important;\n}\na {\n  color: inherit;\n  text-decoration: none;\n}\na:hover {\n  color: inherit;\n  text-decoration: none;\n}\na:active {\n  color: inherit;\n  text-decoration: none;\n}\na:focus {\n  outline: none;\n  color: inherit;\n  text-decoration: none;\n}\n.spinner-wave {\n  margin: 0 auto;\n  width: 100px;\n  height: 20px;\n  text-align: center;\n}\n.spinner-wave > div {\n  background-color: #5496F8;\n  height: 100%;\n  width: 6px;\n  display: inline-block;\n  -webkit-animation: wave 1.2s infinite ease-in-out;\n  animation: wave 1.2s infinite ease-in-out;\n}\n.spinner-wave div:nth-child(2) {\n  -webkit-animation-delay: -1.1s;\n  animation-delay: -1.1s;\n}\n.spinner-wave div:nth-child(3) {\n  -webkit-animation-delay: -1s;\n  animation-delay: -1s;\n}\n.spinner-wave div:nth-child(4) {\n  -webkit-animation-delay: -0.9s;\n  animation-delay: -0.9s;\n}\n.spinner-wave div:nth-child(5) {\n  -webkit-animation-delay: -0.8s;\n  animation-delay: -0.8s;\n}\n@-webkit-keyframes wave {\n  0%,\n  40%,\n  100% {\n    -webkit-transform: scaleY(0.4);\n  }\n  20% {\n    -webkit-transform: scaleY(1);\n  }\n}\n@keyframes wave {\n  0%,\n  40%,\n  100% {\n    -webkit-transform: scaleY(0.4);\n            transform: scaleY(0.4);\n  }\n  20% {\n    -webkit-transform: scaleY(1);\n            transform: scaleY(1);\n  }\n}\n@media screen and (max-width: 480px) {\n  .hide-xs {\n    display: none !important;\n  }\n}\n@media screen and (min-width: 480px) {\n  .show-xs {\n    display: none !important;\n  }\n}\n.ht-btn {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 5px 13px;\n  border: 0;\n  background: #ffffff;\n  color: #52616A;\n  -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\n.ht-btn:focus {\n  background: #fcfcfc;\n  outline: 0;\n}\n.ht-btn-card:hover {\n  background: #5496F8;\n  color: rgba(255, 255, 255, 0.96);\n  -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\n.stopped-color {\n  color: #FFBB44;\n}\n.drive-color {\n  color: #5496F8;\n}\n.walk-color {\n  color: #5496F8;\n}\n.moving-color {\n  color: #5496F8;\n}\n.logged_off-color {\n  color: #A9BAC4;\n}\n.network_offline-color {\n  color: #d19191;\n}\n.location_disabled-color {\n  color: #d19191;\n}\n.location_low_accuracy-color {\n  color: #d19191;\n}\n.stopped-bg {\n  background: #FFBB44;\n}\n.drive-bg {\n  background: #5496F8;\n}\n.walk-bg {\n  background: #5496F8;\n}\n.moving-bg {\n  background: #5496F8;\n}\n.logged_off-bg {\n  background: #A9BAC4;\n}\n.network_offline-bg {\n  background: #d19191;\n}\n.location_disabled-bg {\n  background-color: #d19191;\n}\n.location_low_accuracy-bg {\n  background-color: #d19191;\n}\n.card-stack {\n  max-width: 500px;\n  margin: auto;\n}\n"]
            },] },
];
/** @nocollapse */
GroupsComponent.ctorParameters = function () { return []; };
GroupsComponent.propDecorators = {
    "groups": [{ type: Input },],
    "groupIdParam": [{ type: Input },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var GroupsModule = (function () {
    function GroupsModule() {
    }
    return GroupsModule;
}());
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
GroupsModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var HtGroupsService = (function (_super) {
    __extends(HtGroupsService, _super);
    function HtGroupsService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return HtGroupsService;
}(HtGroupsClient));
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var GroupsContainerComponent = (function () {
    /**
     * @param {?} groupsClient
     */
    function GroupsContainerComponent(groupsClient) {
        this.groupsClient = groupsClient;
        this.groupIdParam = 'id';
    }
    /**
     * @return {?}
     */
    GroupsContainerComponent.prototype.ngOnInit = function () {
        this.groupsClient.list.setActive();
        this.groups$ = this.groupsClient.list.dataArray$;
        // this.clientService.groups.list.setOptions({query: {}});
        // this.clientService.groups.list.initListener();
        // this.groups$ = this.clientService.groups.list.dataArray$.map((groups) => {
        //   return _.filter(groups, (group: IGroup) => !!group[this.groupIdParam])
        // })
    };
    return GroupsContainerComponent;
}());
GroupsContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-groups-container',
                template: "<div class=\"container\" *ngIf=\"groups$ | async as groups\">\n  <ht-groups [groupIdParam]=\"groupIdParam\" [groups]=\"groups\"></ht-groups>\n</div>\n",
                styles: [".container {\n  width: 100%;\n}\n"]
            },] },
];
/** @nocollapse */
GroupsContainerComponent.ctorParameters = function () { return [
    { type: HtGroupsService, },
]; };
GroupsContainerComponent.propDecorators = {
    "groupIdParam": [{ type: Input },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var GroupsContainerModule = (function () {
    function GroupsContainerModule() {
    }
    return GroupsContainerModule;
}());
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
GroupsContainerModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var GroupsChartService = (function () {
    /**
     * @param {?} groupsService
     */
    function GroupsChartService(groupsService) {
        this.groupsService = groupsService;
        this.selectedGroups$ = new BehaviorSubject$1([]);
        this.groupsLevelsEntity$ = new BehaviorSubject$1({});
        this.setGroupsLevels();
        this.groupsLevels$ = combineLatest$1(this.selectedGroups$, this.groupsLevelsEntity$, function (selectedGroups, groupslevelsEntity) {
            return selectedGroups.map(function (group) {
                var /** @type {?} */ id = group ? group.id : null;
                return groupslevelsEntity[id] ? groupslevelsEntity[id] : null;
            });
        });
    }
    /**
     * @param {?} groupId
     * @return {?}
     */
    GroupsChartService.prototype.setRootGroupId = function (groupId) {
        var _this = this;
        this.selectedGroups$.pipe(take(1), filter(function (groups) {
            var /** @type {?} */ id = groups[0] ? groups[0].id : null;
            return id !== groupId || (groupId == null && !groups.length);
        }), switchMap(function () {
            return groupId ? _this.groupsService.item.api$(groupId) : of$1(null);
        })).subscribe(function (group) {
            _this.setSelectedGroup(group, 0);
        });
    };
    ;
    /**
     * @param {?} group
     * @param {?} level
     * @return {?}
     */
    GroupsChartService.prototype.setSelectedGroup = function (group, level) {
        var _this = this;
        this.selectedGroups$.asObservable().pipe(take(1), map$1(function (selectedGroups) {
            selectedGroups.splice(level);
            selectedGroups.push(group);
            return selectedGroups;
        })).subscribe(function (selectedGroups) {
            _this.selectedGroups$.next(selectedGroups);
        });
    };
    ;
    /**
     * @return {?}
     */
    GroupsChartService.prototype.setGroupsLevels = function () {
        var _this = this;
        if (this.groupsSub)
            return false;
        this.groupsSub = this.selectedGroups$.pipe(filter(function (data) { return !!data.length; }), withLatestFrom(this.groupsLevelsEntity$), switchMap(function (_a) {
            var _b = __read(_a, 2), selectedGroups = _b[0], groupsLevels = _b[1];
            var /** @type {?} */ level = selectedGroups.length;
            var /** @type {?} */ lastId = selectedGroups[level - 1] ? selectedGroups[level - 1].id : null;
            // groupsLevels.splice(length);
            groupsLevels = selectedGroups.reduce(function (acc, group) {
                var /** @type {?} */ groupId = group ? group.id : null;
                return groupsLevels[groupId] ? Object.assign({}, acc, (_a = {}, _a[groupId] = groupsLevels[groupId], _a)) : acc;
                var _a;
            }, {});
            if (groupsLevels[lastId]) {
                return of$1(groupsLevels);
            }
            else {
                return _this.getGroups(lastId).pipe(map$1(function (groupsPage) {
                    return Object.assign({}, groupsLevels, (_a = {}, _a[lastId] = groupsPage.results, _a));
                    var _a;
                }));
            }
            // return of(groupsLevels)
        })).subscribe(function (data) {
            _this.groupsLevelsEntity$.next(data);
        });
    };
    ;
    /**
     * @param {?} parentId
     * @return {?}
     */
    GroupsChartService.prototype.getGroups = function (parentId) {
        return parentId ? this.groupsService.getChildren(parentId) : this.groupsService.getRoot();
    };
    /**
     * @param {?} level
     * @return {?}
     */
    GroupsChartService.prototype.setLevel = function (level) {
        var _this = this;
        this.selectedGroups$.asObservable().pipe(take(1), map$1(function (selectedGroups) {
            selectedGroups.splice(level + 1);
            return selectedGroups;
        })).subscribe(function (selectedGroups) {
            _this.selectedGroups$.next(selectedGroups);
        });
        // this.setSelectedGroup(group, level + 1)
    };
    return GroupsChartService;
}());
GroupsChartService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GroupsChartService.ctorParameters = function () { return [
    { type: HtGroupsService, },
]; };
/**
 * @record
 */
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var GroupsChartContainerComponent = (function () {
    /**
     * @param {?} groupsChartService
     */
    function GroupsChartContainerComponent(groupsChartService) {
        this.groupsChartService = groupsChartService;
        this.loading = false;
        this.onGroup = new EventEmitter();
    }
    /**
     * @return {?}
     */
    GroupsChartContainerComponent.prototype.ngOnInit = function () {
        var /** @type {?} */ groupId = this.groupId ? this.groupId : null;
        this.groupsChartService.setRootGroupId(groupId);
    };
    Object.defineProperty(GroupsChartContainerComponent.prototype, "selectedGroups$", {
        /**
         * @return {?}
         */
        get: function () {
            return this.groupsChartService.selectedGroups$;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GroupsChartContainerComponent.prototype, "groupsLevels$", {
        /**
         * @return {?}
         */
        get: function () {
            return this.groupsChartService.groupsLevels$;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} group
     * @return {?}
     */
    GroupsChartContainerComponent.prototype.setGroup = function (group) {
        this.onGroup.next(group);
    };
    /**
     * @param {?} group
     * @param {?} level
     * @param {?} event
     * @return {?}
     */
    GroupsChartContainerComponent.prototype.selectGroup = function (group, level, event) {
        var /** @type {?} */ id = group.id;
        event.stopPropagation();
        event.preventDefault();
        this.groupsChartService.setSelectedGroup(group, level + 1);
    };
    return GroupsChartContainerComponent;
}());
GroupsChartContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-groups-chart-container',
                template: "<ng-container *ngIf=\"selectedGroups$ | async as selectedGroups\">\n  <nav class=\"breadcrumb has-arrow-separator\" aria-label=\"breadcrumbs\">\n    <ul>\n      <li [class.is-active]=\"l\" (click)=\"groupsChartService.setLevel(i)\" *ngFor=\"let group of selectedGroups; let l = last; let i = index\">\n        <a *ngIf=\"group; else root\">\n          <span>{{group.name}}</span>\n        </a>\n        <ng-template #root>\n          <a>\n            <span class=\"icon is-small\"><i class=\"fa fa-home\"></i></span>\n            <span>Root groups</span>\n          </a>\n        </ng-template>\n      </li>\n    </ul>\n  </nav>\n\n  <div class=\"container\">\n    <ng-template #notFound>\n      <div>\n        No Group found\n      </div>\n    </ng-template>\n    <div class=\"flex-row wrap group-container\" *ngIf=\"!error\">\n      <div class=\"flex-column group-container-list bar card-stack\" *ngFor=\"let groups of groupsLevels$ | async; let i = index\">\n        <div class=\"text-center ht-level\">\n          <span class=\"\">Level {{i + 1}}</span>\n        </div>\n        <div class=\"flex-column\" *ngIf=\"groups; else empty\">\n          <div (click)=\"setGroup(group)\" class=\"card card-clickable is-primary\" [class.card-active]=\"selectedGroups[i + 1] && selectedGroups[i + 1].id == group.id\" *ngFor=\"let group of groups\">\n            <div class=\"card-content is-primary flex-row\">\n              <div class=\"flex\">\n                {{group.name}}\n              </div>\n              <div (click)=\"selectGroup(group, i, $event)\" class=\"button is-small is-primary\">\n                <div class=\"icon\">\n                  <i class=\"fa fa-angle-right\"></i>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div class=\"card card-content has-text-grey-light has-text-centered\" *ngIf=\"groups.length == 0\">\n            No Sub-group\n          </div>\n        </div>\n        <ng-template #empty>\n          <h3 class=\"text-center msg bar has-text-grey-light has-text-centered\">\n            Loading\n          </h3>\n        </ng-template>\n      </div>\n\n\n    </div>\n  </div>\n</ng-container>\n",
                styles: [".bar {\n  width: 200px;\n  min-width: 200px;\n}\n.card-content {\n  padding: 10px 13px;\n}\n.card-active {\n  background-color: #5496F8;\n  color: white !important;\n}\n.card-active .button {\n  display: none;\n}\n.action {\n  background: #798E9B;\n  color: white;\n  padding: 0 8px;\n  border-radius: 3px;\n}\n.action:hover {\n  background-color: #52616A;\n}\n.group-container {\n  margin: 20px 0;\n}\n.group-container-list {\n  margin: 20px 0;\n}\n.msg {\n  margin-top: 60px;\n}\n.ht-level {\n  padding: 8px 16px;\n  background-color: #52616A;\n  color: white;\n}\na:focus {\n  color: initial;\n}\n.breadcrumb {\n  padding: 0 30px;\n  background-color: #fff;\n  border-bottom: 1px solid #C9D6DE;\n}\n.groups-list {\n  max-height: 400px;\n  overflow: auto;\n}\n"]
            },] },
];
/** @nocollapse */
GroupsChartContainerComponent.ctorParameters = function () { return [
    { type: GroupsChartService, },
]; };
GroupsChartContainerComponent.propDecorators = {
    "groupId": [{ type: Input },],
    "onGroup": [{ type: Output },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var GroupsChartContainerModule = (function () {
    function GroupsChartContainerModule() {
    }
    return GroupsChartContainerModule;
}());
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
GroupsChartContainerModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MapComponent = (function () {
    /**
     * @param {?} elRef
     */
    function MapComponent(elRef) {
        this.elRef = elRef;
        this.options = {};
        this.onReady = new EventEmitter();
        this.mapInstance = GlobalMap;
        this.loading = false;
    }
    /**
     * @return {?}
     */
    MapComponent.prototype.onMapResize = function () {
        this.mapInstance.inValidateSize();
        // todo this.mapService.map.resize();
    };
    /**
     * @return {?}
     */
    MapComponent.prototype.ngOnInit = function () {
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
    };
    /**
     * @return {?}
     */
    MapComponent.prototype.resetMap = function () {
        this.mapInstance.resetBounds();
    };
    /**
     * @return {?}
     */
    MapComponent.prototype.ngAfterViewInit = function () {
        var /** @type {?} */ el = this.mapElem.nativeElement;
        this.mapInstance.renderMap(el, this.options);
        this.onReady.next(this.mapInstance.map);
        // window['ht-map'] = this.mapService.map;
        // this.mapService.resetBounds()
    };
    return MapComponent;
}());
MapComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-map',
                template: "<div #map style=\"width: 100%; height: 100%;\"></div>\n<div class=\"map-label map-label-bottom\">\n  <ht-loading-dots *ngIf=\"loading\" class=\"text-1\"></ht-loading-dots>\n</div>\n<div class=\"map-label map-label-top\">\n  <button class=\"button is-primary\" (click)=\"resetMap()\">Fit in view</button>\n</div>\n",
                styles: [".text-center {\n  text-align: center;\n}\n.text-muted {\n  color: #798E9B;\n}\n.text-right {\n  text-align: right;\n}\n.text-left {\n  text-align: left;\n}\n.text-1 {\n  font-size: 2em;\n}\n.text-4 {\n  font-size: 0.8em;\n}\n.text-capitalize {\n  text-transform: capitalize;\n}\n.text-uppercase {\n  text-transform: uppercase;\n}\n.text-ontime {\n  color: #58ae5b;\n}\n.text-late {\n  color: #E6413E;\n}\n.text-warning {\n  color: #E6413E !important;\n}\n.text-red {\n  color: #E6413E;\n}\n.text-blue {\n  color: #5496F8;\n}\n.truncate {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.flex-row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n}\n.flex-column {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.column-gap-4 > :not(:last-child) {\n  margin-bottom: 4px;\n}\n.row-gap-4 > :not(:last-child) {\n  margin-right: 4px;\n}\n.column-gap-7 > :not(:last-child) {\n  margin-bottom: 7px;\n}\n.row-gap-7 > :not(:last-child) {\n  margin-right: 7px;\n}\n.column-gap-10 > :not(:last-child) {\n  margin-bottom: 10px;\n}\n.row-gap-10 > :not(:last-child) {\n  margin-right: 10px;\n}\n.column-gap-20 > :not(:last-child) {\n  margin-bottom: 20px;\n}\n.row-gap-20 > :not(:last-child) {\n  margin-right: 20px;\n}\n.wrap {\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.flex {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.auto {\n  margin: auto;\n}\n.relative {\n  position: relative;\n}\n.space-between {\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.space-around {\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n}\n.justify-center {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.flex-center {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.align-center {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.clickable {\n  cursor: pointer;\n}\n.round-icon {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 23px;\n  height: 23px;\n  background: #315790;\n  border-radius: 50%;\n}\n.flex-half {\n  -ms-flex-preferred-size: 50%;\n      flex-basis: 50%;\n}\n.link-unstyled {\n  color: inherit;\n}\n.link-unstyled:hover {\n  text-decoration: none;\n}\n.half {\n  width: 50%;\n}\n.noselect {\n  -webkit-touch-callout: none;\n  /* iOS Safari */\n  -webkit-user-select: none;\n  /* Chrome/Safari/Opera */\n  /* Konqueror */\n  -moz-user-select: none;\n  /* Firefox */\n  -ms-user-select: none;\n  /* Internet Explorer/Edge */\n  user-select: none;\n  /* Non-prefixed version, currently\n                                  not supported by any browser */\n}\n.hover-shadow:hover {\n  -webkit-box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.16);\n          box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.16);\n}\n.marker-transparent {\n  opacity: 0.4;\n}\n.marker-fade {\n  -webkit-filter: contrast(16%) brightness(160%) blur(0.6px);\n          filter: contrast(16%) brightness(160%) blur(0.6px);\n}\n.tooltip-warning {\n  background: #e04745;\n  color: #fff;\n}\n.tooltip-warning-arrow {\n  border-right-color: #e04745 !important;\n}\n.tooltip-info {\n  background: #5496F8;\n  color: #fff;\n}\n.tooltip-info-arrow {\n  border-right-color: #5496F8 !important;\n}\na {\n  color: inherit;\n  text-decoration: none;\n}\na:hover {\n  color: inherit;\n  text-decoration: none;\n}\na:active {\n  color: inherit;\n  text-decoration: none;\n}\na:focus {\n  outline: none;\n  color: inherit;\n  text-decoration: none;\n}\n.spinner-wave {\n  margin: 0 auto;\n  width: 100px;\n  height: 20px;\n  text-align: center;\n}\n.spinner-wave > div {\n  background-color: #5496F8;\n  height: 100%;\n  width: 6px;\n  display: inline-block;\n  -webkit-animation: wave 1.2s infinite ease-in-out;\n  animation: wave 1.2s infinite ease-in-out;\n}\n.spinner-wave div:nth-child(2) {\n  -webkit-animation-delay: -1.1s;\n  animation-delay: -1.1s;\n}\n.spinner-wave div:nth-child(3) {\n  -webkit-animation-delay: -1s;\n  animation-delay: -1s;\n}\n.spinner-wave div:nth-child(4) {\n  -webkit-animation-delay: -0.9s;\n  animation-delay: -0.9s;\n}\n.spinner-wave div:nth-child(5) {\n  -webkit-animation-delay: -0.8s;\n  animation-delay: -0.8s;\n}\n@-webkit-keyframes wave {\n  0%,\n  40%,\n  100% {\n    -webkit-transform: scaleY(0.4);\n  }\n  20% {\n    -webkit-transform: scaleY(1);\n  }\n}\n@keyframes wave {\n  0%,\n  40%,\n  100% {\n    -webkit-transform: scaleY(0.4);\n            transform: scaleY(0.4);\n  }\n  20% {\n    -webkit-transform: scaleY(1);\n            transform: scaleY(1);\n  }\n}\n@media screen and (max-width: 480px) {\n  .hide-xs {\n    display: none !important;\n  }\n}\n@media screen and (min-width: 480px) {\n  .show-xs {\n    display: none !important;\n  }\n}\n.ht-btn {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 5px 13px;\n  border: 0;\n  background: #ffffff;\n  color: #52616A;\n  -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\n.ht-btn:focus {\n  background: #fcfcfc;\n  outline: 0;\n}\n.ht-btn-card:hover {\n  background: #5496F8;\n  color: rgba(255, 255, 255, 0.96);\n  -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\n.stopped-color {\n  color: #FFBB44;\n}\n.drive-color {\n  color: #5496F8;\n}\n.walk-color {\n  color: #5496F8;\n}\n.moving-color {\n  color: #5496F8;\n}\n.logged_off-color {\n  color: #A9BAC4;\n}\n.network_offline-color {\n  color: #d19191;\n}\n.location_disabled-color {\n  color: #d19191;\n}\n.location_low_accuracy-color {\n  color: #d19191;\n}\n.stopped-bg {\n  background: #FFBB44;\n}\n.drive-bg {\n  background: #5496F8;\n}\n.walk-bg {\n  background: #5496F8;\n}\n.moving-bg {\n  background: #5496F8;\n}\n.logged_off-bg {\n  background: #A9BAC4;\n}\n.network_offline-bg {\n  background: #d19191;\n}\n.location_disabled-bg {\n  background-color: #d19191;\n}\n.location_low_accuracy-bg {\n  background-color: #d19191;\n}\n:host {\n  height: 100%;\n  width: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n}\n.map-label {\n  position: absolute;\n  z-index: 400;\n  text-align: center;\n}\n.map-label-bottom {\n  bottom: 20px;\n  right: 0;\n  left: 0;\n  width: 100%;\n}\n.map-label-top {\n  top: 10px;\n  right: 20px;\n}\n"]
            },] },
];
/** @nocollapse */
MapComponent.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
MapComponent.propDecorators = {
    "options": [{ type: Input },],
    "onReady": [{ type: Output },],
    "mapInstance": [{ type: Input },],
    "loading": [{ type: Input },],
    "mapElem": [{ type: ViewChild, args: ['map',] },],
    "onMapResize": [{ type: HostListener, args: ['resize', ['$event'],] },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MapModule = (function () {
    function MapModule() {
    }
    return MapModule;
}());
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
MapModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MapContainerComponent = (function () {
    /**
     * @param {?} userClientService
     * @param {?} mapService
     */
    function MapContainerComponent(userClientService, mapService) {
        this.userClientService = userClientService;
        this.mapService = mapService;
        this.showLoading = true;
        this.subs = [];
    }
    /**
     * @return {?}
     */
    MapContainerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.mapService.usersCluster.setPageData$(this.userClientService.listAll.data$, {
            hide$: this.userClientService.placeline.id$
        });
        this.mapService.placeline.setCompoundData$(this.userClientService.placeline.data$, {
            roots: ['segments', 'actions'],
            filter$: this.userClientService.placeline.segmentSelectedId$,
            resetMap$: this.userClientService.placeline.segmentResetId$
        });
        var /** @type {?} */ loading$1 = this.userClientService.placeline.loading$
            .pipe(map$1(function (data) { return !!data && _this.showLoading; }), distinctUntilChanged());
        var /** @type {?} */ loading$2 = this.userClientService.listAll.loading$
            .pipe(map$1(function (data) { return !!data; }), distinctUntilChanged());
        this.loading$ = merge$1(loading$1, loading$2);
    };
    /**
     * @return {?}
     */
    MapContainerComponent.prototype.ngAfterContentInit = function () {
    };
    /**
     * @return {?}
     */
    MapContainerComponent.prototype.ngOnDestroy = function () {
        this.userClientService.listAll.clearData();
        this.mapService.usersCluster.trace([]);
    };
    return MapContainerComponent;
}());
MapContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-map-container',
                template: "<ht-map [loading]=\"loading$ | async\"></ht-map>\n<!--<div class=\"map-label map-label-bottom\">-->\n  <!--<ht-loading-dots *ngIf=\"loading$ | async\" class=\"text-1\"></ht-loading-dots>-->\n<!--</div>-->\n<!--<div class=\"map-label map-label-top\">-->\n  <!--<button class=\"button is-primary\" (click)=\"resetMap()\">Fit in view</button>-->\n<!--</div>-->\n",
                styles: [".text-center {\n  text-align: center;\n}\n.text-muted {\n  color: #798E9B;\n}\n.text-right {\n  text-align: right;\n}\n.text-left {\n  text-align: left;\n}\n.text-1 {\n  font-size: 2em;\n}\n.text-4 {\n  font-size: 0.8em;\n}\n.text-capitalize {\n  text-transform: capitalize;\n}\n.text-uppercase {\n  text-transform: uppercase;\n}\n.text-ontime {\n  color: #58ae5b;\n}\n.text-late {\n  color: #E6413E;\n}\n.text-warning {\n  color: #E6413E !important;\n}\n.text-red {\n  color: #E6413E;\n}\n.text-blue {\n  color: #5496F8;\n}\n.truncate {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.flex-row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n}\n.flex-column {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.column-gap-4 > :not(:last-child) {\n  margin-bottom: 4px;\n}\n.row-gap-4 > :not(:last-child) {\n  margin-right: 4px;\n}\n.column-gap-7 > :not(:last-child) {\n  margin-bottom: 7px;\n}\n.row-gap-7 > :not(:last-child) {\n  margin-right: 7px;\n}\n.column-gap-10 > :not(:last-child) {\n  margin-bottom: 10px;\n}\n.row-gap-10 > :not(:last-child) {\n  margin-right: 10px;\n}\n.column-gap-20 > :not(:last-child) {\n  margin-bottom: 20px;\n}\n.row-gap-20 > :not(:last-child) {\n  margin-right: 20px;\n}\n.wrap {\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.flex {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.auto {\n  margin: auto;\n}\n.relative {\n  position: relative;\n}\n.space-between {\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.space-around {\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n}\n.justify-center {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.flex-center {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.align-center {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.clickable {\n  cursor: pointer;\n}\n.round-icon {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 23px;\n  height: 23px;\n  background: #315790;\n  border-radius: 50%;\n}\n.flex-half {\n  -ms-flex-preferred-size: 50%;\n      flex-basis: 50%;\n}\n.link-unstyled {\n  color: inherit;\n}\n.link-unstyled:hover {\n  text-decoration: none;\n}\n.half {\n  width: 50%;\n}\n.noselect {\n  -webkit-touch-callout: none;\n  /* iOS Safari */\n  -webkit-user-select: none;\n  /* Chrome/Safari/Opera */\n  /* Konqueror */\n  -moz-user-select: none;\n  /* Firefox */\n  -ms-user-select: none;\n  /* Internet Explorer/Edge */\n  user-select: none;\n  /* Non-prefixed version, currently\n                                  not supported by any browser */\n}\n.hover-shadow:hover {\n  -webkit-box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.16);\n          box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.16);\n}\n.marker-transparent {\n  opacity: 0.4;\n}\n.marker-fade {\n  -webkit-filter: contrast(16%) brightness(160%) blur(0.6px);\n          filter: contrast(16%) brightness(160%) blur(0.6px);\n}\n.tooltip-warning {\n  background: #e04745;\n  color: #fff;\n}\n.tooltip-warning-arrow {\n  border-right-color: #e04745 !important;\n}\n.tooltip-info {\n  background: #5496F8;\n  color: #fff;\n}\n.tooltip-info-arrow {\n  border-right-color: #5496F8 !important;\n}\na {\n  color: inherit;\n  text-decoration: none;\n}\na:hover {\n  color: inherit;\n  text-decoration: none;\n}\na:active {\n  color: inherit;\n  text-decoration: none;\n}\na:focus {\n  outline: none;\n  color: inherit;\n  text-decoration: none;\n}\n.spinner-wave {\n  margin: 0 auto;\n  width: 100px;\n  height: 20px;\n  text-align: center;\n}\n.spinner-wave > div {\n  background-color: #5496F8;\n  height: 100%;\n  width: 6px;\n  display: inline-block;\n  -webkit-animation: wave 1.2s infinite ease-in-out;\n  animation: wave 1.2s infinite ease-in-out;\n}\n.spinner-wave div:nth-child(2) {\n  -webkit-animation-delay: -1.1s;\n  animation-delay: -1.1s;\n}\n.spinner-wave div:nth-child(3) {\n  -webkit-animation-delay: -1s;\n  animation-delay: -1s;\n}\n.spinner-wave div:nth-child(4) {\n  -webkit-animation-delay: -0.9s;\n  animation-delay: -0.9s;\n}\n.spinner-wave div:nth-child(5) {\n  -webkit-animation-delay: -0.8s;\n  animation-delay: -0.8s;\n}\n@-webkit-keyframes wave {\n  0%,\n  40%,\n  100% {\n    -webkit-transform: scaleY(0.4);\n  }\n  20% {\n    -webkit-transform: scaleY(1);\n  }\n}\n@keyframes wave {\n  0%,\n  40%,\n  100% {\n    -webkit-transform: scaleY(0.4);\n            transform: scaleY(0.4);\n  }\n  20% {\n    -webkit-transform: scaleY(1);\n            transform: scaleY(1);\n  }\n}\n@media screen and (max-width: 480px) {\n  .hide-xs {\n    display: none !important;\n  }\n}\n@media screen and (min-width: 480px) {\n  .show-xs {\n    display: none !important;\n  }\n}\n.ht-btn {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 5px 13px;\n  border: 0;\n  background: #ffffff;\n  color: #52616A;\n  -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\n.ht-btn:focus {\n  background: #fcfcfc;\n  outline: 0;\n}\n.ht-btn-card:hover {\n  background: #5496F8;\n  color: rgba(255, 255, 255, 0.96);\n  -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\n.stopped-color {\n  color: #FFBB44;\n}\n.drive-color {\n  color: #5496F8;\n}\n.walk-color {\n  color: #5496F8;\n}\n.moving-color {\n  color: #5496F8;\n}\n.logged_off-color {\n  color: #A9BAC4;\n}\n.network_offline-color {\n  color: #d19191;\n}\n.location_disabled-color {\n  color: #d19191;\n}\n.location_low_accuracy-color {\n  color: #d19191;\n}\n.stopped-bg {\n  background: #FFBB44;\n}\n.drive-bg {\n  background: #5496F8;\n}\n.walk-bg {\n  background: #5496F8;\n}\n.moving-bg {\n  background: #5496F8;\n}\n.logged_off-bg {\n  background: #A9BAC4;\n}\n.network_offline-bg {\n  background: #d19191;\n}\n.location_disabled-bg {\n  background-color: #d19191;\n}\n.location_low_accuracy-bg {\n  background-color: #d19191;\n}\n:host {\n  height: 100%;\n  width: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n}\n.map-label {\n  position: absolute;\n  z-index: 400;\n  text-align: center;\n}\n.map-label-bottom {\n  bottom: 20px;\n  right: 0;\n  left: 0;\n  width: 100%;\n}\n.map-label-top {\n  top: 10px;\n  right: 20px;\n}\n"]
            },] },
];
/** @nocollapse */
MapContainerComponent.ctorParameters = function () { return [
    { type: HtUsersService, },
    { type: HtMapService, },
]; };
MapContainerComponent.propDecorators = {
    "showLoading": [{ type: Input },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MapContainerModule = (function () {
    function MapContainerModule() {
    }
    return MapContainerModule;
}());
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
MapContainerModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PlacelineMapContainerComponent = (function () {
    /**
     * @param {?} userClientService
     * @param {?} mapService
     */
    function PlacelineMapContainerComponent(userClientService, mapService) {
        this.userClientService = userClientService;
        this.mapService = mapService;
        this.showSidebar = true;
    }
    /**
     * @return {?}
     */
    PlacelineMapContainerComponent.prototype.ngOnInit = function () {
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
    };
    return PlacelineMapContainerComponent;
}());
PlacelineMapContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-placeline-map-container',
                template: "<div class=\"ht-container\">\n  <div class=\"bar\" *ngIf=\"showSidebar\">\n    <ht-placeline-container [userId]=\"userId\"></ht-placeline-container>\n  </div>\n  <div class=\"flex\">\n    <ht-map-container [showLoading]=\"false\"></ht-map-container>\n  </div>\n</div>\n",
                styles: [".text-center {\n  text-align: center;\n}\n.text-muted {\n  color: #798E9B;\n}\n.text-right {\n  text-align: right;\n}\n.text-left {\n  text-align: left;\n}\n.text-1 {\n  font-size: 2em;\n}\n.text-4 {\n  font-size: 0.8em;\n}\n.text-capitalize {\n  text-transform: capitalize;\n}\n.text-uppercase {\n  text-transform: uppercase;\n}\n.text-ontime {\n  color: #58ae5b;\n}\n.text-late {\n  color: #E6413E;\n}\n.text-warning {\n  color: #E6413E !important;\n}\n.text-red {\n  color: #E6413E;\n}\n.text-blue {\n  color: #5496F8;\n}\n.truncate {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.flex-row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n}\n.flex-column {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.column-gap-4 > :not(:last-child) {\n  margin-bottom: 4px;\n}\n.row-gap-4 > :not(:last-child) {\n  margin-right: 4px;\n}\n.column-gap-7 > :not(:last-child) {\n  margin-bottom: 7px;\n}\n.row-gap-7 > :not(:last-child) {\n  margin-right: 7px;\n}\n.column-gap-10 > :not(:last-child) {\n  margin-bottom: 10px;\n}\n.row-gap-10 > :not(:last-child) {\n  margin-right: 10px;\n}\n.column-gap-20 > :not(:last-child) {\n  margin-bottom: 20px;\n}\n.row-gap-20 > :not(:last-child) {\n  margin-right: 20px;\n}\n.wrap {\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.flex {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.auto {\n  margin: auto;\n}\n.relative {\n  position: relative;\n}\n.space-between {\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.space-around {\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n}\n.justify-center {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.flex-center {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.align-center {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.clickable {\n  cursor: pointer;\n}\n.round-icon {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 23px;\n  height: 23px;\n  background: #315790;\n  border-radius: 50%;\n}\n.flex-half {\n  -ms-flex-preferred-size: 50%;\n      flex-basis: 50%;\n}\n.link-unstyled {\n  color: inherit;\n}\n.link-unstyled:hover {\n  text-decoration: none;\n}\n.half {\n  width: 50%;\n}\n.noselect {\n  -webkit-touch-callout: none;\n  /* iOS Safari */\n  -webkit-user-select: none;\n  /* Chrome/Safari/Opera */\n  /* Konqueror */\n  -moz-user-select: none;\n  /* Firefox */\n  -ms-user-select: none;\n  /* Internet Explorer/Edge */\n  user-select: none;\n  /* Non-prefixed version, currently\n                                  not supported by any browser */\n}\n.hover-shadow:hover {\n  -webkit-box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.16);\n          box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.16);\n}\n.marker-transparent {\n  opacity: 0.4;\n}\n.marker-fade {\n  -webkit-filter: contrast(16%) brightness(160%) blur(0.6px);\n          filter: contrast(16%) brightness(160%) blur(0.6px);\n}\n.tooltip-warning {\n  background: #e04745;\n  color: #fff;\n}\n.tooltip-warning-arrow {\n  border-right-color: #e04745 !important;\n}\n.tooltip-info {\n  background: #5496F8;\n  color: #fff;\n}\n.tooltip-info-arrow {\n  border-right-color: #5496F8 !important;\n}\na {\n  color: inherit;\n  text-decoration: none;\n}\na:hover {\n  color: inherit;\n  text-decoration: none;\n}\na:active {\n  color: inherit;\n  text-decoration: none;\n}\na:focus {\n  outline: none;\n  color: inherit;\n  text-decoration: none;\n}\n.spinner-wave {\n  margin: 0 auto;\n  width: 100px;\n  height: 20px;\n  text-align: center;\n}\n.spinner-wave > div {\n  background-color: #5496F8;\n  height: 100%;\n  width: 6px;\n  display: inline-block;\n  -webkit-animation: wave 1.2s infinite ease-in-out;\n  animation: wave 1.2s infinite ease-in-out;\n}\n.spinner-wave div:nth-child(2) {\n  -webkit-animation-delay: -1.1s;\n  animation-delay: -1.1s;\n}\n.spinner-wave div:nth-child(3) {\n  -webkit-animation-delay: -1s;\n  animation-delay: -1s;\n}\n.spinner-wave div:nth-child(4) {\n  -webkit-animation-delay: -0.9s;\n  animation-delay: -0.9s;\n}\n.spinner-wave div:nth-child(5) {\n  -webkit-animation-delay: -0.8s;\n  animation-delay: -0.8s;\n}\n@-webkit-keyframes wave {\n  0%,\n  40%,\n  100% {\n    -webkit-transform: scaleY(0.4);\n  }\n  20% {\n    -webkit-transform: scaleY(1);\n  }\n}\n@keyframes wave {\n  0%,\n  40%,\n  100% {\n    -webkit-transform: scaleY(0.4);\n            transform: scaleY(0.4);\n  }\n  20% {\n    -webkit-transform: scaleY(1);\n            transform: scaleY(1);\n  }\n}\n@media screen and (max-width: 480px) {\n  .hide-xs {\n    display: none !important;\n  }\n}\n@media screen and (min-width: 480px) {\n  .show-xs {\n    display: none !important;\n  }\n}\n.ht-btn {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 5px 13px;\n  border: 0;\n  background: #ffffff;\n  color: #52616A;\n  -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\n.ht-btn:focus {\n  background: #fcfcfc;\n  outline: 0;\n}\n.ht-btn-card:hover {\n  background: #5496F8;\n  color: rgba(255, 255, 255, 0.96);\n  -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\n.stopped-color {\n  color: #FFBB44;\n}\n.drive-color {\n  color: #5496F8;\n}\n.walk-color {\n  color: #5496F8;\n}\n.moving-color {\n  color: #5496F8;\n}\n.logged_off-color {\n  color: #A9BAC4;\n}\n.network_offline-color {\n  color: #d19191;\n}\n.location_disabled-color {\n  color: #d19191;\n}\n.location_low_accuracy-color {\n  color: #d19191;\n}\n.stopped-bg {\n  background: #FFBB44;\n}\n.drive-bg {\n  background: #5496F8;\n}\n.walk-bg {\n  background: #5496F8;\n}\n.moving-bg {\n  background: #5496F8;\n}\n.logged_off-bg {\n  background: #A9BAC4;\n}\n.network_offline-bg {\n  background: #d19191;\n}\n.location_disabled-bg {\n  background-color: #d19191;\n}\n.location_low_accuracy-bg {\n  background-color: #d19191;\n}\n.ht-container {\n  width: 100%;\n  height: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  min-height: 100%;\n}\n.ht-container .bar {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  max-width: 400px;\n  min-height: 100%;\n  height: 100%  ;\n  overflow: auto;\n}\n"]
            },] },
];
/** @nocollapse */
PlacelineMapContainerComponent.ctorParameters = function () { return [
    { type: HtUsersService, },
    { type: HtMapService, },
]; };
PlacelineMapContainerComponent.propDecorators = {
    "userId": [{ type: Input },],
    "showSidebar": [{ type: Input },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PlacelineMapContainerModule = (function () {
    function PlacelineMapContainerModule() {
    }
    return PlacelineMapContainerModule;
}());
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
PlacelineMapContainerModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var UsersMapContainerComponent = (function () {
    /**
     * @param {?} userClientService
     */
    function UsersMapContainerComponent(userClientService) {
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
    UsersMapContainerComponent.prototype.ngOnInit = function () {
        this.userClientService.listAll.setActive();
        if (this.key) {
            htClientService.getInstance().tempToken = this.key;
        }
    };
    return UsersMapContainerComponent;
}());
UsersMapContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-users-map-container',
                template: "<div class=\"ht-container\">\n  <ht-users-filter *ngIf=\"showFilter\"></ht-users-filter>\n  <div class=\"flex-row flex\">\n    <div class=\"bar\" *ngIf=\"showSidebar\" [style.width.px]=\"sidebarWidth || 400\">\n      <ht-users-container\n        [apiType]=\"apiType\"\n        [hasPlaceline]=\"hasPlaceline\"\n        [showAll]=\"showAll\"\n        [hasMap]=\"true\"></ht-users-container>\n    </div>\n    <div class=\"flex\">\n      <ht-map-container [showLoading]=\"false\"></ht-map-container>\n    </div>\n  </div>\n</div>\n",
                styles: [".text-center {\n  text-align: center;\n}\n.text-muted {\n  color: #798E9B;\n}\n.text-right {\n  text-align: right;\n}\n.text-left {\n  text-align: left;\n}\n.text-1 {\n  font-size: 2em;\n}\n.text-4 {\n  font-size: 0.8em;\n}\n.text-capitalize {\n  text-transform: capitalize;\n}\n.text-uppercase {\n  text-transform: uppercase;\n}\n.text-ontime {\n  color: #58ae5b;\n}\n.text-late {\n  color: #E6413E;\n}\n.text-warning {\n  color: #E6413E !important;\n}\n.text-red {\n  color: #E6413E;\n}\n.text-blue {\n  color: #5496F8;\n}\n.truncate {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.flex-row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n}\n.flex-column {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.column-gap-4 > :not(:last-child) {\n  margin-bottom: 4px;\n}\n.row-gap-4 > :not(:last-child) {\n  margin-right: 4px;\n}\n.column-gap-7 > :not(:last-child) {\n  margin-bottom: 7px;\n}\n.row-gap-7 > :not(:last-child) {\n  margin-right: 7px;\n}\n.column-gap-10 > :not(:last-child) {\n  margin-bottom: 10px;\n}\n.row-gap-10 > :not(:last-child) {\n  margin-right: 10px;\n}\n.column-gap-20 > :not(:last-child) {\n  margin-bottom: 20px;\n}\n.row-gap-20 > :not(:last-child) {\n  margin-right: 20px;\n}\n.wrap {\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.flex {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.auto {\n  margin: auto;\n}\n.relative {\n  position: relative;\n}\n.space-between {\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.space-around {\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n}\n.justify-center {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.flex-center {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.align-center {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.clickable {\n  cursor: pointer;\n}\n.round-icon {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 23px;\n  height: 23px;\n  background: #315790;\n  border-radius: 50%;\n}\n.flex-half {\n  -ms-flex-preferred-size: 50%;\n      flex-basis: 50%;\n}\n.link-unstyled {\n  color: inherit;\n}\n.link-unstyled:hover {\n  text-decoration: none;\n}\n.half {\n  width: 50%;\n}\n.noselect {\n  -webkit-touch-callout: none;\n  /* iOS Safari */\n  -webkit-user-select: none;\n  /* Chrome/Safari/Opera */\n  /* Konqueror */\n  -moz-user-select: none;\n  /* Firefox */\n  -ms-user-select: none;\n  /* Internet Explorer/Edge */\n  user-select: none;\n  /* Non-prefixed version, currently\n                                  not supported by any browser */\n}\n.hover-shadow:hover {\n  -webkit-box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.16);\n          box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.16);\n}\n.marker-transparent {\n  opacity: 0.4;\n}\n.marker-fade {\n  -webkit-filter: contrast(16%) brightness(160%) blur(0.6px);\n          filter: contrast(16%) brightness(160%) blur(0.6px);\n}\n.tooltip-warning {\n  background: #e04745;\n  color: #fff;\n}\n.tooltip-warning-arrow {\n  border-right-color: #e04745 !important;\n}\n.tooltip-info {\n  background: #5496F8;\n  color: #fff;\n}\n.tooltip-info-arrow {\n  border-right-color: #5496F8 !important;\n}\na {\n  color: inherit;\n  text-decoration: none;\n}\na:hover {\n  color: inherit;\n  text-decoration: none;\n}\na:active {\n  color: inherit;\n  text-decoration: none;\n}\na:focus {\n  outline: none;\n  color: inherit;\n  text-decoration: none;\n}\n.spinner-wave {\n  margin: 0 auto;\n  width: 100px;\n  height: 20px;\n  text-align: center;\n}\n.spinner-wave > div {\n  background-color: #5496F8;\n  height: 100%;\n  width: 6px;\n  display: inline-block;\n  -webkit-animation: wave 1.2s infinite ease-in-out;\n  animation: wave 1.2s infinite ease-in-out;\n}\n.spinner-wave div:nth-child(2) {\n  -webkit-animation-delay: -1.1s;\n  animation-delay: -1.1s;\n}\n.spinner-wave div:nth-child(3) {\n  -webkit-animation-delay: -1s;\n  animation-delay: -1s;\n}\n.spinner-wave div:nth-child(4) {\n  -webkit-animation-delay: -0.9s;\n  animation-delay: -0.9s;\n}\n.spinner-wave div:nth-child(5) {\n  -webkit-animation-delay: -0.8s;\n  animation-delay: -0.8s;\n}\n@-webkit-keyframes wave {\n  0%,\n  40%,\n  100% {\n    -webkit-transform: scaleY(0.4);\n  }\n  20% {\n    -webkit-transform: scaleY(1);\n  }\n}\n@keyframes wave {\n  0%,\n  40%,\n  100% {\n    -webkit-transform: scaleY(0.4);\n            transform: scaleY(0.4);\n  }\n  20% {\n    -webkit-transform: scaleY(1);\n            transform: scaleY(1);\n  }\n}\n@media screen and (max-width: 480px) {\n  .hide-xs {\n    display: none !important;\n  }\n}\n@media screen and (min-width: 480px) {\n  .show-xs {\n    display: none !important;\n  }\n}\n.ht-btn {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 5px 13px;\n  border: 0;\n  background: #ffffff;\n  color: #52616A;\n  -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\n.ht-btn:focus {\n  background: #fcfcfc;\n  outline: 0;\n}\n.ht-btn-card:hover {\n  background: #5496F8;\n  color: rgba(255, 255, 255, 0.96);\n  -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\n.stopped-color {\n  color: #FFBB44;\n}\n.drive-color {\n  color: #5496F8;\n}\n.walk-color {\n  color: #5496F8;\n}\n.moving-color {\n  color: #5496F8;\n}\n.logged_off-color {\n  color: #A9BAC4;\n}\n.network_offline-color {\n  color: #d19191;\n}\n.location_disabled-color {\n  color: #d19191;\n}\n.location_low_accuracy-color {\n  color: #d19191;\n}\n.stopped-bg {\n  background: #FFBB44;\n}\n.drive-bg {\n  background: #5496F8;\n}\n.walk-bg {\n  background: #5496F8;\n}\n.moving-bg {\n  background: #5496F8;\n}\n.logged_off-bg {\n  background: #A9BAC4;\n}\n.network_offline-bg {\n  background: #d19191;\n}\n.location_disabled-bg {\n  background-color: #d19191;\n}\n.location_low_accuracy-bg {\n  background-color: #d19191;\n}\n.ht-container {\n  width: 100%;\n  height: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  min-height: 100%;\n}\n.ht-container .bar {\n  width: 100px;\n  max-width: 400px;\n  min-height: 100%;\n  height: 100%  ;\n  overflow: auto;\n  background: #fbfbfb;\n}\n"]
            },] },
];
/** @nocollapse */
UsersMapContainerComponent.ctorParameters = function () { return [
    { type: HtUsersService, },
]; };
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
var UsersFilterComponent = (function () {
    /**
     * @param {?} usersClientService
     * @param {?} cd
     */
    function UsersFilterComponent(usersClientService, cd) {
        this.usersClientService = usersClientService;
        this.cd = cd;
        this.query$ = of$1(null);
        this.loading$ = of$1(false);
    }
    /**
     * @return {?}
     */
    UsersFilterComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.query$ = _this.usersClientService.queryLabel$;
            _this.loading$ = _this.usersClientService.list.loading$
                .pipe(skip(1), map$1(function (data) { return !!data; }), distinctUntilChanged());
            _this.cd.detectChanges();
        });
        this.statusFiltes = this.usersClientService.filterClass.statusQueryArray;
        this.sortingLabels = this.usersClientService.filterClass.sortingQueryLabel;
        this.ordering$ = this.usersClientService.ordering$;
        this.showFilter$ = this.usersClientService.list.id$.pipe(map$1(function (id) { return !id ? 'show' : 'hide'; }));
    };
    /**
     * @param {?} query
     * @return {?}
     */
    UsersFilterComponent.prototype.onQuery = function (query$$1) {
        this.usersClientService.list.setQueryReset(query$$1);
    };
    /**
     * @param {?} key
     * @return {?}
     */
    UsersFilterComponent.prototype.clearQuery = function (key) {
        this.usersClientService.list.clearQueryKey(key);
    };
    /**
     * @param {?} key
     * @param {?} event
     * @return {?}
     */
    UsersFilterComponent.prototype.setStatus = function (key, event) {
        this.onQuery({ status: key });
    };
    /**
     * @param {?} key
     * @return {?}
     */
    UsersFilterComponent.prototype.setOrdering = function (key) {
        this.onQuery({ ordering: key });
    };
    return UsersFilterComponent;
}());
UsersFilterComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-users-filter',
                template: "<div class=\"filter-container flex-column\" [@filter]=\"showFilter$ | async\">\n  <ht-entity-search (onSearchQuery)=\"onQuery($event)\"></ht-entity-search>\n  <div class=\"dropdown\" htDropdown>\n    <button type=\"button\" class=\"button dropdown-trigger flex-row row-gap-4\">\n      <span>Sorting</span>\n      <ng-container *ngIf=\"ordering$ | async as ordering\">\n        <span>: {{ordering.string}}</span>\n        <i [ngClass]=\"ordering.sign ? 'fa-arrow-up' : 'fa-arrow-down'\" class=\"fa\"></i>\n      </ng-container>\n      <!--<span *ngIf=\"ordering$ | async as ordering\"></span>-->\n      <!--<i class=\"fa fa-filter\"></i>-->\n    </button>\n    <div class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dropdown-keyboard-access\">\n      <div class=\"dropdown-content\">\n        <a class=\"dropdown-item\" (click)=\"setOrdering(sort.value)\" *ngFor=\"let sort of sortingLabels\">{{sort.label}}</a>\n      </div>\n    </div>\n  </div>\n  <div class=\"dropdown is-hoverable\">\n    <button id=\"dropdown-keyboard-access\" type=\"button\" class=\"button flex-row row-gap-4\">\n      <span>Filters</span> <i class=\"fa fa-filter\"></i>\n    </button>\n    <div class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dropdown-keyboard-access\">\n      <div class=\"dropdown-content\">\n        <a class=\"dropdown-item\" (click)=\"setStatus(filter.values.toString(), $event)\" *ngFor=\"let filter of statusFiltes\">{{filter.label}}</a>\n      </div>\n\n    </div>\n  </div>\n  <div class=\"flex flex-row row-gap-4\" *ngIf=\"query$\">\n    <div class=\"\" *ngFor=\"let query of query$ | async as queries\">\n      <div class=\"tags has-addons\">\n        <div class=\"tag is-medium is-primary\">{{query.label}}</div>\n        <a (click)=\"clearQuery(query.value)\" class=\"tag is-medium is-primary is-delete\"></a>\n      </div>\n    </div>\n  </div>\n  <ht-date-range [isRight]=\"true\"></ht-date-range>\n  <div class=\"loading-bar\" *ngIf=\"loading$ | async\">\n    <ht-loading-bar></ht-loading-bar>\n  </div>\n</div>\n\n\n",
                styles: [".text-center {\n  text-align: center;\n}\n.text-muted {\n  color: #798E9B;\n}\n.text-right {\n  text-align: right;\n}\n.text-left {\n  text-align: left;\n}\n.text-1 {\n  font-size: 2em;\n}\n.text-4 {\n  font-size: 0.8em;\n}\n.text-capitalize {\n  text-transform: capitalize;\n}\n.text-uppercase {\n  text-transform: uppercase;\n}\n.text-ontime {\n  color: #58ae5b;\n}\n.text-late {\n  color: #E6413E;\n}\n.text-warning {\n  color: #E6413E !important;\n}\n.text-red {\n  color: #E6413E;\n}\n.text-blue {\n  color: #5496F8;\n}\n.truncate {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.flex-row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n}\n.flex-column {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.column-gap-4 > :not(:last-child) {\n  margin-bottom: 4px;\n}\n.row-gap-4 > :not(:last-child) {\n  margin-right: 4px;\n}\n.column-gap-7 > :not(:last-child) {\n  margin-bottom: 7px;\n}\n.row-gap-7 > :not(:last-child) {\n  margin-right: 7px;\n}\n.column-gap-10 > :not(:last-child) {\n  margin-bottom: 10px;\n}\n.row-gap-10 > :not(:last-child) {\n  margin-right: 10px;\n}\n.column-gap-20 > :not(:last-child) {\n  margin-bottom: 20px;\n}\n.row-gap-20 > :not(:last-child) {\n  margin-right: 20px;\n}\n.wrap {\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.flex {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.auto {\n  margin: auto;\n}\n.relative {\n  position: relative;\n}\n.space-between {\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.space-around {\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n}\n.justify-center {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.flex-center {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.align-center {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.clickable {\n  cursor: pointer;\n}\n.round-icon {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 23px;\n  height: 23px;\n  background: #315790;\n  border-radius: 50%;\n}\n.flex-half {\n  -ms-flex-preferred-size: 50%;\n      flex-basis: 50%;\n}\n.link-unstyled {\n  color: inherit;\n}\n.link-unstyled:hover {\n  text-decoration: none;\n}\n.half {\n  width: 50%;\n}\n.noselect {\n  -webkit-touch-callout: none;\n  /* iOS Safari */\n  -webkit-user-select: none;\n  /* Chrome/Safari/Opera */\n  /* Konqueror */\n  -moz-user-select: none;\n  /* Firefox */\n  -ms-user-select: none;\n  /* Internet Explorer/Edge */\n  user-select: none;\n  /* Non-prefixed version, currently\n                                  not supported by any browser */\n}\n.hover-shadow:hover {\n  -webkit-box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.16);\n          box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.16);\n}\n.marker-transparent {\n  opacity: 0.4;\n}\n.marker-fade {\n  -webkit-filter: contrast(16%) brightness(160%) blur(0.6px);\n          filter: contrast(16%) brightness(160%) blur(0.6px);\n}\n.tooltip-warning {\n  background: #e04745;\n  color: #fff;\n}\n.tooltip-warning-arrow {\n  border-right-color: #e04745 !important;\n}\n.tooltip-info {\n  background: #5496F8;\n  color: #fff;\n}\n.tooltip-info-arrow {\n  border-right-color: #5496F8 !important;\n}\na {\n  color: inherit;\n  text-decoration: none;\n}\na:hover {\n  color: inherit;\n  text-decoration: none;\n}\na:active {\n  color: inherit;\n  text-decoration: none;\n}\na:focus {\n  outline: none;\n  color: inherit;\n  text-decoration: none;\n}\n.spinner-wave {\n  margin: 0 auto;\n  width: 100px;\n  height: 20px;\n  text-align: center;\n}\n.spinner-wave > div {\n  background-color: #5496F8;\n  height: 100%;\n  width: 6px;\n  display: inline-block;\n  -webkit-animation: wave 1.2s infinite ease-in-out;\n  animation: wave 1.2s infinite ease-in-out;\n}\n.spinner-wave div:nth-child(2) {\n  -webkit-animation-delay: -1.1s;\n  animation-delay: -1.1s;\n}\n.spinner-wave div:nth-child(3) {\n  -webkit-animation-delay: -1s;\n  animation-delay: -1s;\n}\n.spinner-wave div:nth-child(4) {\n  -webkit-animation-delay: -0.9s;\n  animation-delay: -0.9s;\n}\n.spinner-wave div:nth-child(5) {\n  -webkit-animation-delay: -0.8s;\n  animation-delay: -0.8s;\n}\n@-webkit-keyframes wave {\n  0%,\n  40%,\n  100% {\n    -webkit-transform: scaleY(0.4);\n  }\n  20% {\n    -webkit-transform: scaleY(1);\n  }\n}\n@keyframes wave {\n  0%,\n  40%,\n  100% {\n    -webkit-transform: scaleY(0.4);\n            transform: scaleY(0.4);\n  }\n  20% {\n    -webkit-transform: scaleY(1);\n            transform: scaleY(1);\n  }\n}\n@media screen and (max-width: 480px) {\n  .hide-xs {\n    display: none !important;\n  }\n}\n@media screen and (min-width: 480px) {\n  .show-xs {\n    display: none !important;\n  }\n}\n.ht-btn {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 5px 13px;\n  border: 0;\n  background: #ffffff;\n  color: #52616A;\n  -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\n.ht-btn:focus {\n  background: #fcfcfc;\n  outline: 0;\n}\n.ht-btn-card:hover {\n  background: #5496F8;\n  color: rgba(255, 255, 255, 0.96);\n  -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\n.stopped-color {\n  color: #FFBB44;\n}\n.drive-color {\n  color: #5496F8;\n}\n.walk-color {\n  color: #5496F8;\n}\n.moving-color {\n  color: #5496F8;\n}\n.logged_off-color {\n  color: #A9BAC4;\n}\n.network_offline-color {\n  color: #d19191;\n}\n.location_disabled-color {\n  color: #d19191;\n}\n.location_low_accuracy-color {\n  color: #d19191;\n}\n.stopped-bg {\n  background: #FFBB44;\n}\n.drive-bg {\n  background: #5496F8;\n}\n.walk-bg {\n  background: #5496F8;\n}\n.moving-bg {\n  background: #5496F8;\n}\n.logged_off-bg {\n  background: #A9BAC4;\n}\n.network_offline-bg {\n  background: #d19191;\n}\n.location_disabled-bg {\n  background-color: #d19191;\n}\n.location_low_accuracy-bg {\n  background-color: #d19191;\n}\n.filter-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  position: relative;\n  padding: 4px 10px;\n  border-bottom: 2px solid #ccc;\n}\n.filter-container > :not(:last-child) {\n  margin-right: 7px;\n}\n.loading-bar {\n  position: absolute;\n  width: 100%;\n  bottom: 0;\n  left: 0;\n}\n"],
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
UsersFilterComponent.ctorParameters = function () { return [
    { type: HtUsersService, },
    { type: ChangeDetectorRef, },
]; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var EntitySearchComponent = (function () {
    function EntitySearchComponent() {
        this.query$ = new Subject$1();
        this.entity = "";
        this.onSearchQuery = new EventEmitter();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    EntitySearchComponent.prototype.clickSearch = function (e) {
        this.input.nativeElement.focus();
    };
    /**
     * @return {?}
     */
    EntitySearchComponent.prototype.ngOnInit = function () {
        // this.watchChange()
    };
    /**
     * @param {?} string
     * @return {?}
     */
    EntitySearchComponent.prototype.test = function (string) {
        this.query$.next(string);
    };
    /**
     * @param {?} el
     * @return {?}
     */
    EntitySearchComponent.prototype.setSearch = function (el) {
        var /** @type {?} */ search = el.value;
        el.value = '';
        if (search)
            this.onSearchQuery.next({ search: search });
    };
    return EntitySearchComponent;
}());
EntitySearchComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-entity-search',
                template: "<!--<div class=\"control has-icons-right flex-row\">-->\n  <!--<input #query (input)=\"test(query.value)\" (keydown.enter)=\"setSearch(query)\" type=\"text\" class=\"input\" placeholder=\"Search {{entity}}\">-->\n  <!--<span class=\"icon is-right\" (click)=\"setSearch(query)\">-->\n        <!--<i class=\"fa fa-search\"></i>-->\n      <!--</span>-->\n<!--</div>&lt;!&ndash; /input-group &ndash;&gt;-->\n<div class=\"field has-addons\">\n  <div class=\"control\">\n    <input #query (input)=\"test(query.value)\" (keydown.enter)=\"setSearch(query)\" type=\"text\" class=\"input\" placeholder=\"Search {{entity}}\">\n  </div>\n  <div class=\"control\">\n    <a class=\"button\">\n      <i class=\"fa fa-search\"></i>\n    </a>\n  </div>\n</div>\n\n",
                styles: [".text-center {\n  text-align: center;\n}\n.text-muted {\n  color: #798E9B;\n}\n.text-right {\n  text-align: right;\n}\n.text-left {\n  text-align: left;\n}\n.text-1 {\n  font-size: 2em;\n}\n.text-4 {\n  font-size: 0.8em;\n}\n.text-capitalize {\n  text-transform: capitalize;\n}\n.text-uppercase {\n  text-transform: uppercase;\n}\n.text-ontime {\n  color: #58ae5b;\n}\n.text-late {\n  color: #E6413E;\n}\n.text-warning {\n  color: #E6413E !important;\n}\n.text-red {\n  color: #E6413E;\n}\n.text-blue {\n  color: #5496F8;\n}\n.truncate {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.flex-row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n}\n.flex-column {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.column-gap-4 > :not(:last-child) {\n  margin-bottom: 4px;\n}\n.row-gap-4 > :not(:last-child) {\n  margin-right: 4px;\n}\n.column-gap-7 > :not(:last-child) {\n  margin-bottom: 7px;\n}\n.row-gap-7 > :not(:last-child) {\n  margin-right: 7px;\n}\n.column-gap-10 > :not(:last-child) {\n  margin-bottom: 10px;\n}\n.row-gap-10 > :not(:last-child) {\n  margin-right: 10px;\n}\n.column-gap-20 > :not(:last-child) {\n  margin-bottom: 20px;\n}\n.row-gap-20 > :not(:last-child) {\n  margin-right: 20px;\n}\n.wrap {\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.flex {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.auto {\n  margin: auto;\n}\n.relative {\n  position: relative;\n}\n.space-between {\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.space-around {\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n}\n.justify-center {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.flex-center {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.align-center {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.clickable {\n  cursor: pointer;\n}\n.round-icon {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 23px;\n  height: 23px;\n  background: #315790;\n  border-radius: 50%;\n}\n.flex-half {\n  -ms-flex-preferred-size: 50%;\n      flex-basis: 50%;\n}\n.link-unstyled {\n  color: inherit;\n}\n.link-unstyled:hover {\n  text-decoration: none;\n}\n.half {\n  width: 50%;\n}\n.noselect {\n  -webkit-touch-callout: none;\n  /* iOS Safari */\n  -webkit-user-select: none;\n  /* Chrome/Safari/Opera */\n  /* Konqueror */\n  -moz-user-select: none;\n  /* Firefox */\n  -ms-user-select: none;\n  /* Internet Explorer/Edge */\n  user-select: none;\n  /* Non-prefixed version, currently\n                                  not supported by any browser */\n}\n.hover-shadow:hover {\n  -webkit-box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.16);\n          box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.16);\n}\n.marker-transparent {\n  opacity: 0.4;\n}\n.marker-fade {\n  -webkit-filter: contrast(16%) brightness(160%) blur(0.6px);\n          filter: contrast(16%) brightness(160%) blur(0.6px);\n}\n.tooltip-warning {\n  background: #e04745;\n  color: #fff;\n}\n.tooltip-warning-arrow {\n  border-right-color: #e04745 !important;\n}\n.tooltip-info {\n  background: #5496F8;\n  color: #fff;\n}\n.tooltip-info-arrow {\n  border-right-color: #5496F8 !important;\n}\na {\n  color: inherit;\n  text-decoration: none;\n}\na:hover {\n  color: inherit;\n  text-decoration: none;\n}\na:active {\n  color: inherit;\n  text-decoration: none;\n}\na:focus {\n  outline: none;\n  color: inherit;\n  text-decoration: none;\n}\n.spinner-wave {\n  margin: 0 auto;\n  width: 100px;\n  height: 20px;\n  text-align: center;\n}\n.spinner-wave > div {\n  background-color: #5496F8;\n  height: 100%;\n  width: 6px;\n  display: inline-block;\n  -webkit-animation: wave 1.2s infinite ease-in-out;\n  animation: wave 1.2s infinite ease-in-out;\n}\n.spinner-wave div:nth-child(2) {\n  -webkit-animation-delay: -1.1s;\n  animation-delay: -1.1s;\n}\n.spinner-wave div:nth-child(3) {\n  -webkit-animation-delay: -1s;\n  animation-delay: -1s;\n}\n.spinner-wave div:nth-child(4) {\n  -webkit-animation-delay: -0.9s;\n  animation-delay: -0.9s;\n}\n.spinner-wave div:nth-child(5) {\n  -webkit-animation-delay: -0.8s;\n  animation-delay: -0.8s;\n}\n@-webkit-keyframes wave {\n  0%,\n  40%,\n  100% {\n    -webkit-transform: scaleY(0.4);\n  }\n  20% {\n    -webkit-transform: scaleY(1);\n  }\n}\n@keyframes wave {\n  0%,\n  40%,\n  100% {\n    -webkit-transform: scaleY(0.4);\n            transform: scaleY(0.4);\n  }\n  20% {\n    -webkit-transform: scaleY(1);\n            transform: scaleY(1);\n  }\n}\n@media screen and (max-width: 480px) {\n  .hide-xs {\n    display: none !important;\n  }\n}\n@media screen and (min-width: 480px) {\n  .show-xs {\n    display: none !important;\n  }\n}\n.ht-btn {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 5px 13px;\n  border: 0;\n  background: #ffffff;\n  color: #52616A;\n  -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\n.ht-btn:focus {\n  background: #fcfcfc;\n  outline: 0;\n}\n.ht-btn-card:hover {\n  background: #5496F8;\n  color: rgba(255, 255, 255, 0.96);\n  -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\n.stopped-color {\n  color: #FFBB44;\n}\n.drive-color {\n  color: #5496F8;\n}\n.walk-color {\n  color: #5496F8;\n}\n.moving-color {\n  color: #5496F8;\n}\n.logged_off-color {\n  color: #A9BAC4;\n}\n.network_offline-color {\n  color: #d19191;\n}\n.location_disabled-color {\n  color: #d19191;\n}\n.location_low_accuracy-color {\n  color: #d19191;\n}\n.stopped-bg {\n  background: #FFBB44;\n}\n.drive-bg {\n  background: #5496F8;\n}\n.walk-bg {\n  background: #5496F8;\n}\n.moving-bg {\n  background: #5496F8;\n}\n.logged_off-bg {\n  background: #A9BAC4;\n}\n.network_offline-bg {\n  background: #d19191;\n}\n.location_disabled-bg {\n  background-color: #d19191;\n}\n.location_low_accuracy-bg {\n  background-color: #d19191;\n}\n:host {\n  position: relative;\n}\n#results {\n  position: absolute;\n  left: 0;\n  top: 37px;\n  background: #fff;\n  width: 100%;\n  border: 1px solid #C9D6DE;\n  z-index: 11;\n}\n.input-search {\n  border: 0;\n  border-bottom: 1px solid #ffffff;\n}\n.input-search:focus {\n  outline: 0;\n  border-bottom: 1px solid #52616A;\n}\n.item {\n  padding: 4px 10px;\n  color: #52616A;\n}\n.item:hover {\n  background: #f7f7f7;\n}\n.clickable {\n  color: #5496F8;\n}\n.input-sm {\n  border: 0;\n  outline: 0;\n  -webkit-box-shadow: 0 0;\n          box-shadow: 0 0;\n  border-bottom: 1px solid #d5dfe5;\n  font-size: 15px;\n}\n"]
            },] },
];
/** @nocollapse */
EntitySearchComponent.ctorParameters = function () { return []; };
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
var EntitySearchModule = (function () {
    function EntitySearchModule() {
    }
    return EntitySearchModule;
}());
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
EntitySearchModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DateRangeComponent = (function () {
    function DateRangeComponent() {
        this.dateRangeService$ = dateRangeService.getInstance();
        this.isRight = false;
        this.showSingleDay = true;
        this.customDates = DateRangeLabelMap;
    }
    /**
     * @return {?}
     */
    DateRangeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dateRange$ = this.dateRangeService$.display$;
        // this.customDates$ = of(this.customDates);
        this.dateRangeOptions$ = this.dateRangeService$.data$.pipe(map$1(function (dateRange) {
            return _this.customDates.filter(function (customRange) {
                return _this.showSingleDay ? true : !customRange.isSingleDay;
            }).map(function (customRange) {
                return isSameDateRange(customRange.range, dateRange) ? Object.assign({}, customRange, { isActive: true }) : Object.assign({}, customRange);
            });
        }));
        this.dateRangeOptions$.subscribe();
    };
    /**
     * @param {?} range
     * @return {?}
     */
    DateRangeComponent.prototype.setDateRange = function (range) {
        this.dateRangeService$.data$.next(range);
    };
    return DateRangeComponent;
}());
DateRangeComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-date-range',
                template: "<div class=\"dropdown is-hoverable\" [class.is-right]=\"isRight\" *ngIf=\"dateRange$ | async as dateRange\">\n  <button type=\"button dropdown-trigger\" class=\"button flex-row row-gap-4\">\n    {{dateRange}}\n    <!--<span *ngIf=\"ordering$ | async as ordering\"></span>-->\n    <!--<i class=\"fa fa-filter\"></i>-->\n  </button>\n  <div class=\"dropdown-menu dropdown-menu-right is-boxed\">\n    <div class=\"dropdown-content\" role=\"menu\" aria-labelledby=\"dropdown-keyboard-access\">\n      <a class=\"dropdown-item\" [class.is-active]=\"date.isActive\" (click)=\"setDateRange(date.range)\" *ngFor=\"let date of dateRangeOptions$ | async\">{{date.label}}</a>\n    </div>\n  </div>\n\n</div>\n",
                styles: [".text-center {\n  text-align: center;\n}\n.text-muted {\n  color: #798E9B;\n}\n.text-right {\n  text-align: right;\n}\n.text-left {\n  text-align: left;\n}\n.text-1 {\n  font-size: 2em;\n}\n.text-4 {\n  font-size: 0.8em;\n}\n.text-capitalize {\n  text-transform: capitalize;\n}\n.text-uppercase {\n  text-transform: uppercase;\n}\n.text-ontime {\n  color: #58ae5b;\n}\n.text-late {\n  color: #E6413E;\n}\n.text-warning {\n  color: #E6413E !important;\n}\n.text-red {\n  color: #E6413E;\n}\n.text-blue {\n  color: #5496F8;\n}\n.truncate {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.flex-row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n}\n.flex-column {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.column-gap-4 > :not(:last-child) {\n  margin-bottom: 4px;\n}\n.row-gap-4 > :not(:last-child) {\n  margin-right: 4px;\n}\n.column-gap-7 > :not(:last-child) {\n  margin-bottom: 7px;\n}\n.row-gap-7 > :not(:last-child) {\n  margin-right: 7px;\n}\n.column-gap-10 > :not(:last-child) {\n  margin-bottom: 10px;\n}\n.row-gap-10 > :not(:last-child) {\n  margin-right: 10px;\n}\n.column-gap-20 > :not(:last-child) {\n  margin-bottom: 20px;\n}\n.row-gap-20 > :not(:last-child) {\n  margin-right: 20px;\n}\n.wrap {\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.flex {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.auto {\n  margin: auto;\n}\n.relative {\n  position: relative;\n}\n.space-between {\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.space-around {\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n}\n.justify-center {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.flex-center {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.align-center {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.clickable {\n  cursor: pointer;\n}\n.round-icon {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 23px;\n  height: 23px;\n  background: #315790;\n  border-radius: 50%;\n}\n.flex-half {\n  -ms-flex-preferred-size: 50%;\n      flex-basis: 50%;\n}\n.link-unstyled {\n  color: inherit;\n}\n.link-unstyled:hover {\n  text-decoration: none;\n}\n.half {\n  width: 50%;\n}\n.noselect {\n  -webkit-touch-callout: none;\n  /* iOS Safari */\n  -webkit-user-select: none;\n  /* Chrome/Safari/Opera */\n  /* Konqueror */\n  -moz-user-select: none;\n  /* Firefox */\n  -ms-user-select: none;\n  /* Internet Explorer/Edge */\n  user-select: none;\n  /* Non-prefixed version, currently\n                                  not supported by any browser */\n}\n.hover-shadow:hover {\n  -webkit-box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.16);\n          box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.16);\n}\n.marker-transparent {\n  opacity: 0.4;\n}\n.marker-fade {\n  -webkit-filter: contrast(16%) brightness(160%) blur(0.6px);\n          filter: contrast(16%) brightness(160%) blur(0.6px);\n}\n.tooltip-warning {\n  background: #e04745;\n  color: #fff;\n}\n.tooltip-warning-arrow {\n  border-right-color: #e04745 !important;\n}\n.tooltip-info {\n  background: #5496F8;\n  color: #fff;\n}\n.tooltip-info-arrow {\n  border-right-color: #5496F8 !important;\n}\na {\n  color: inherit;\n  text-decoration: none;\n}\na:hover {\n  color: inherit;\n  text-decoration: none;\n}\na:active {\n  color: inherit;\n  text-decoration: none;\n}\na:focus {\n  outline: none;\n  color: inherit;\n  text-decoration: none;\n}\n.spinner-wave {\n  margin: 0 auto;\n  width: 100px;\n  height: 20px;\n  text-align: center;\n}\n.spinner-wave > div {\n  background-color: #5496F8;\n  height: 100%;\n  width: 6px;\n  display: inline-block;\n  -webkit-animation: wave 1.2s infinite ease-in-out;\n  animation: wave 1.2s infinite ease-in-out;\n}\n.spinner-wave div:nth-child(2) {\n  -webkit-animation-delay: -1.1s;\n  animation-delay: -1.1s;\n}\n.spinner-wave div:nth-child(3) {\n  -webkit-animation-delay: -1s;\n  animation-delay: -1s;\n}\n.spinner-wave div:nth-child(4) {\n  -webkit-animation-delay: -0.9s;\n  animation-delay: -0.9s;\n}\n.spinner-wave div:nth-child(5) {\n  -webkit-animation-delay: -0.8s;\n  animation-delay: -0.8s;\n}\n@-webkit-keyframes wave {\n  0%,\n  40%,\n  100% {\n    -webkit-transform: scaleY(0.4);\n  }\n  20% {\n    -webkit-transform: scaleY(1);\n  }\n}\n@keyframes wave {\n  0%,\n  40%,\n  100% {\n    -webkit-transform: scaleY(0.4);\n            transform: scaleY(0.4);\n  }\n  20% {\n    -webkit-transform: scaleY(1);\n            transform: scaleY(1);\n  }\n}\n@media screen and (max-width: 480px) {\n  .hide-xs {\n    display: none !important;\n  }\n}\n@media screen and (min-width: 480px) {\n  .show-xs {\n    display: none !important;\n  }\n}\n.ht-btn {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 5px 13px;\n  border: 0;\n  background: #ffffff;\n  color: #52616A;\n  -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\n.ht-btn:focus {\n  background: #fcfcfc;\n  outline: 0;\n}\n.ht-btn-card:hover {\n  background: #5496F8;\n  color: rgba(255, 255, 255, 0.96);\n  -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\n.stopped-color {\n  color: #FFBB44;\n}\n.drive-color {\n  color: #5496F8;\n}\n.walk-color {\n  color: #5496F8;\n}\n.moving-color {\n  color: #5496F8;\n}\n.logged_off-color {\n  color: #A9BAC4;\n}\n.network_offline-color {\n  color: #d19191;\n}\n.location_disabled-color {\n  color: #d19191;\n}\n.location_low_accuracy-color {\n  color: #d19191;\n}\n.stopped-bg {\n  background: #FFBB44;\n}\n.drive-bg {\n  background: #5496F8;\n}\n.walk-bg {\n  background: #5496F8;\n}\n.moving-bg {\n  background: #5496F8;\n}\n.logged_off-bg {\n  background: #A9BAC4;\n}\n.network_offline-bg {\n  background: #d19191;\n}\n.location_disabled-bg {\n  background-color: #d19191;\n}\n.location_low_accuracy-bg {\n  background-color: #d19191;\n}\n.dropdown-menu {\n  z-index: 500;\n}\n"]
            },] },
];
/** @nocollapse */
DateRangeComponent.ctorParameters = function () { return []; };
DateRangeComponent.propDecorators = {
    "dateRangeService$": [{ type: Input },],
    "isRight": [{ type: Input },],
    "showSingleDay": [{ type: Input },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DateRangeModule = (function () {
    function DateRangeModule() {
    }
    return DateRangeModule;
}());
DateRangeModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    SharedModule
                ],
                declarations: [DateRangeComponent],
                exports: [DateRangeComponent]
            },] },
];
/** @nocollapse */
DateRangeModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var UsersFilterModule = (function () {
    function UsersFilterModule() {
    }
    return UsersFilterModule;
}());
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
UsersFilterModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var UsersMapContainerModule = (function () {
    function UsersMapContainerModule() {
    }
    return UsersMapContainerModule;
}());
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
UsersMapContainerModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var GroupKeyResolver = (function () {
    /**
     * @param {?} groupService
     */
    function GroupKeyResolver(groupService) {
        this.groupService = groupService;
    }
    /**
     * @param {?} next
     * @return {?}
     */
    GroupKeyResolver.prototype.resolve = function (next) {
        var /** @type {?} */ id = next.paramMap.get('id');
        var /** @type {?} */ groupKey$ = this.groupService.api.get(id).pipe(map$1(function (data) {
            return data ? data.token : "test";
        }));
        // return groupKey$.take(1)
        return of$1(true).pipe(switchMap(function () {
            return groupKey$.pipe(take(1));
        }));
        // const key$ = this.clientService.groups.item.getListener({id}).map((group: IGroup) => {
        //   // next.data = {token: next.paramMap.get('id')};
        //   console.log(group.token, "group");
        //   return group.token
        // });
        // return key$
    };
    return GroupKeyResolver;
}());
GroupKeyResolver.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GroupKeyResolver.ctorParameters = function () { return [
    { type: HtGroupsService, },
]; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var GroupLookupKeyResolver = (function () {
    /**
     * @param {?} groupService
     */
    function GroupLookupKeyResolver(groupService) {
        this.groupService = groupService;
    }
    /**
     * @param {?} next
     * @return {?}
     */
    GroupLookupKeyResolver.prototype.resolve = function (next) {
        var /** @type {?} */ id = next.paramMap.get('id');
        var /** @type {?} */ groupKey$ = this.groupService.api.index({ lookup_id: id }).pipe(map$1(function (data) {
            return data.results.length ? data.results[0].token : "test";
        }));
        // return groupKey$.take(1)
        return of$1(true).pipe(switchMap(function () {
            return groupKey$.pipe(take(1));
        }));
        // const key$ = this.clientService.groups.item.getListener({id}).map((group: IGroup) => {
        //   // next.data = {token: next.paramMap.get('id')};
        //   console.log(group.token, "group");
        //   return group.token
        // });
        // return key$
    };
    return GroupLookupKeyResolver;
}());
GroupLookupKeyResolver.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GroupLookupKeyResolver.ctorParameters = function () { return [
    { type: HtGroupsService, },
]; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var HtClientService = (function (_super) {
    __extends(HtClientService, _super);
    function HtClientService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return HtClientService;
}(HtClient));
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var UsersAnalyticsListComponent = (function () {
    function UsersAnalyticsListComponent() {
        this.selectedUser = null;
    }
    /**
     * @return {?}
     */
    UsersAnalyticsListComponent.prototype.ngOnInit = function () {
    };
    /**
     * @param {?} row
     * @return {?}
     */
    UsersAnalyticsListComponent.prototype.showUserDetail = function (row) {
        this.selectedUser = row.data;
    };
    /**
     * @return {?}
     */
    UsersAnalyticsListComponent.prototype.closeModal = function () {
        this.selectedUser = null;
    };
    /**
     * @return {?}
     */
    UsersAnalyticsListComponent.prototype.ngOnDestroy = function () {
        // this.listService.client.destroy();
        // this.listService.client.list.dataSub.unsubscribe()
    };
    return UsersAnalyticsListComponent;
}());
UsersAnalyticsListComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-users-analytics-list',
                template: "<!--<div class=\"level\">-->\n  <!--<div class=\"level-left has-text-weight-bold has-text-primary\">-->\n    <!--{{listService.title}}-->\n  <!--</div>-->\n  <!--<div class=\"level-right\" *ngIf=\"!listService.hideDatePicker\">-->\n    <!--<ht-date-range [dateRangeService$]=\"listService.dateRangeService$\"></ht-date-range>-->\n  <!--</div>-->\n<!--</div>-->\n<table class=\"table is-fullwidth is-bordered is-hoverable\">\n  <thead>\n  <tr>\n    <th *ngFor=\"let column of listService.columns\">{{column}}</th>\n  </tr>\n  </thead>\n  <tbody>\n  <!--<ht-data-table (select)=\"showUserDetail($event)\" [clickable]=\"true\" [tableData]=\"listService.dataTable$ | async\"></ht-data-table>-->\n  <tr class=\"clickable\" (click)=\"showUserDetail(row)\" *ngFor=\"let row of listService.dataTable$ | async\">\n    <td *ngFor=\"let item of row.values\">{{item}}</td>\n  </tr>\n  </tbody>\n</table>\n\n<div class=\"modal is-active\" *ngIf=\"selectedUser\">\n  <div class=\"modal-background\" (click)=\"closeModal()\"></div>\n  <div class=\"modal-card\">\n    <section class=\"modal-card-body\">\n      <ht-user-table [user]=\"selectedUser\">\n        <span *ngIf=\"!listService.hideDatePicker\">{{listService.dateRangeService$.display$ | async}}</span>\n      </ht-user-table>\n    </section>\n  </div>\n  <button class=\"modal-close is-large\" aria-label=\"close\" (click)=\"closeModal()\"></button>\n</div>\n",
                styles: [".clickable:hover {\n  -webkit-box-shadow: 0px 0px 6px 1px #808080;\n          box-shadow: 0px 0px 6px 1px #808080;\n  z-index: 2; }\n"],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
UsersAnalyticsListComponent.ctorParameters = function () { return []; };
UsersAnalyticsListComponent.propDecorators = {
    "listService": [{ type: Input },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var UserTableComponent = (function () {
    function UserTableComponent() {
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
    UserTableComponent.prototype.ngOnInit = function () {
    };
    Object.defineProperty(UserTableComponent.prototype, "tableData", {
        /**
         * @return {?}
         */
        get: function () {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserTableComponent.prototype, "actionData", {
        /**
         * @return {?}
         */
        get: function () {
            // let f = tableFormat(this.user, {excludes: this.excludedKey, format: {}});
            // console.log(f, "table");
            return tableFormat(this.user, { excludes: this.excludedKey, format: userTableFormat });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserTableComponent.prototype, "currentUser", {
        /**
         * @return {?}
         */
        get: function () {
            return this.action ? this.action.user : this.user;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} key
     * @return {?}
     */
    UserTableComponent.prototype.isKeyIncluded = function (key) {
        return !!!this.excludedKey.includes(key);
    };
    return UserTableComponent;
}());
UserTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-user-table',
                template: "<div class=\"level\">\n  <div class=\"level-left\">\n    <div class=\"level-item\">\n      <ht-profile [url]=\"user.photo\"></ht-profile>\n    </div>\n    <div class=\"level-item is-size-4 has-text-grey\">\n      {{user.name | nameCase}}\n    </div>\n  </div>\n  <div class=\"level-right\">\n    <ng-content></ng-content>\n  </div>\n</div>\n<ht-data-table [tableData]=\"tableData\"></ht-data-table>\n<!--<table class=\"table is-fullwidth is-bordered is-striped\">-->\n  <!--<tbody>-->\n  <!--<tr *ngFor=\"let row of tableData\">-->\n    <!--<td *ngFor=\"let item of row\">{{item}}</td>-->\n  <!--</tr>-->\n  <!--</tbody>-->\n<!--</table>-->\n\n",
                styles: [""],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
UserTableComponent.ctorParameters = function () { return []; };
UserTableComponent.propDecorators = {
    "user": [{ type: Input },],
    "action": [{ type: Input },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DataTableComponent = (function () {
    function DataTableComponent() {
        this.clickable = false;
        this.select = new EventEmitter();
    }
    /**
     * @return {?}
     */
    DataTableComponent.prototype.ngOnInit = function () {
    };
    /**
     * @param {?} row
     * @return {?}
     */
    DataTableComponent.prototype.selectRow = function (row) {
        if (this.clickable) {
            this.select.next(row);
        }
    };
    return DataTableComponent;
}());
DataTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-data-table',
                template: "<table class=\"table is-fullwidth is-bordered is-striped\">\n  <tbody>\n  <tr [class.clickable]=\"clickable\" (click)=\"selectRow(row)\" *ngFor=\"let row of tableData\">\n    <td *ngFor=\"let item of row\">{{item}}</td>\n  </tr>\n  </tbody>\n</table>\n",
                styles: [".clickable:hover {\n  -webkit-box-shadow: 1px 1px grey;\n          box-shadow: 1px 1px grey;\n  z-index: 2; }\n"],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
DataTableComponent.ctorParameters = function () { return []; };
DataTableComponent.propDecorators = {
    "tableData": [{ type: Input },],
    "clickable": [{ type: Input },],
    "select": [{ type: Output },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DataTableModule = (function () {
    function DataTableModule() {
    }
    return DataTableModule;
}());
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
DataTableModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var UserTableModule = (function () {
    function UserTableModule() {
    }
    return UserTableModule;
}());
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
UserTableModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var UsersAnalyticsListModule = (function () {
    function UsersAnalyticsListModule() {
    }
    return UsersAnalyticsListModule;
}());
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
UsersAnalyticsListModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// create a symbol identify the observable I add to
// the component so it doesn't conflict with anything.
// I need this so I'm able to add the desired behaviour to the component.
var destroy$ = Symbol('destroy$');
/**
 * an operator that takes until destroy it takes a components this a parameter
 * returns a lettable RxJS operator.
 */
var untilDestroy = function (component) { return function (source) {
    if (component[destroy$] === undefined) {
        // only hookup each component once.
        addDestroyObservableToComponent(component);
    }
    // pipe in the takeuntil destroy$ and return the source unaltered
    return source.pipe(takeUntil(component[destroy$]));
}; };
/**
 * @param {?} component
 * @return {?}
 */
function addDestroyObservableToComponent(component) {
    component[destroy$] = new Observable$1(function (observer) {
        // keep track of the original destroy function,
        // the user might do something in there
        var /** @type {?} */ orignalDestroy = component.ngOnDestroy;
        if (orignalDestroy === undefined) {
            // Angular does not support dynamic added destroy methods
            // so make sure there is one.
            throw new Error('untilDestroy operator needs the component to have an ngOnDestroy method');
        }
        // replace the ngOndestroy
        component.ngOnDestroy = function () {
            // fire off the destroy observable
            observer.next();
            // complete the observable
            observer.complete();
            // and at last, call the original destroy
            orignalDestroy.call(component);
        };
        // return cleanup function.
        return function (_$$1) { return (component[destroy$] = undefined); };
    });
}
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ActionsStatusGraphComponent = (function () {
    function ActionsStatusGraphComponent() {
        this.noData = false;
    }
    /**
     * @return {?}
     */
    ActionsStatusGraphComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.data$.pipe(untilDestroy(this))
            .subscribe(function (data) {
            _this.setChart(data);
        });
    };
    /**
     * @return {?}
     */
    ActionsStatusGraphComponent.prototype.ngAfterViewInit = function () {
    };
    /**
     * @param {?} data
     * @return {?}
     */
    ActionsStatusGraphComponent.prototype.setChart = function (data) {
        if (data.labels.length <= 1) {
            this.noData = true;
            return false;
        }
        if (this.chart) {
            this.noData = false;
            var /** @type {?} */ labels = data.labels;
            var /** @type {?} */ dataset = data.datasets;
            this.chart.update_values(dataset, labels);
            var /** @type {?} */ type = data.labels.length > 1 ? 'line' : 'bar';
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
                format_tooltip_x: function (d) {
                    // console.log(d, moment(d).format('ddd, MMM Do'));
                    return d;
                    // return moment(d).format('ddd, MMM Do')
                },
                // format_label_x: d => {
                //   console.log("daa");
                //   return d
                // },
                format_tooltip_y: function (d) { return d; }
            });
            // this.chart.show_averages();
        }
    };
    /**
     * @return {?}
     */
    ActionsStatusGraphComponent.prototype.ngOnDestroy = function () {
    };
    return ActionsStatusGraphComponent;
}());
ActionsStatusGraphComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-actions-status-graph',
                template: "<!--<div class=\"level\">-->\n  <!--<div class=\"level-left\">-->\n    <!--<div class=\"level-item has-text-weight-bold has-text-primary\">-->\n      <!--{{service.title}}-->\n    <!--</div>-->\n  <!--</div>-->\n  <!--<div class=\"level-right\">-->\n    <!--<div class=\"level-item\">-->\n      <!--<ht-date-range [showSingleDay]=\"false\" [dateRangeService$]=\"service.dateRangeService$\"></ht-date-range>-->\n    <!--</div>-->\n  <!--</div>-->\n<!--</div>-->\n<div #chart id=\"chart\"></div>\n<!--<div class=\"chart-container\">-->\n  <!---->\n  <!--<div class=\"loading-page\" *ngIf=\"service.client.loading$ | async\">-->\n    <!--<div class=\"icon auto has-text-grey-light\">-->\n      <!--<i class=\"fa fa-circle-o-notch fa-spin fa-3x fa-fw\"></i>-->\n    <!--</div>-->\n  <!--</div>-->\n  <!---->\n<!--</div>-->\n",
                styles: ["#chart {\n  width: 100%; }\n\n.loading-page {\n  background: #ffffff96;\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  top: 0;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n\n.chart-container {\n  min-height: 300px; }\n"],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
ActionsStatusGraphComponent.ctorParameters = function () { return []; };
ActionsStatusGraphComponent.propDecorators = {
    "service": [{ type: Input },],
    "charElem": [{ type: ViewChild, args: ['chart',] },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ActionsStatusGraphModule = (function () {
    function ActionsStatusGraphModule() {
    }
    return ActionsStatusGraphModule;
}());
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
ActionsStatusGraphModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var UsersAnalyticsListService = (function () {
    /**
     * @param {?} config
     */
    function UsersAnalyticsListService(config) {
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
    UsersAnalyticsListService.prototype.initState = function (config) {
        this.dateRangeService$ = dateRangeFactory(config.initialDateRange || DateRangeMap.last_7_days);
        this.title = config.title;
        this.tableFormat = config.tableFormat;
        this.query = config.query;
        this.columns = this.tableFormat.map(function (data) { return data.label; });
        this.hideDatePicker = config.hideDatePicker;
        if (config.tags && config.tags.length)
            this.tags = __spread(this.tags, config.tags);
    };
    /**
     * @param {?} config
     * @return {?}
     */
    UsersAnalyticsListService.prototype.initClient = function (config) {
        var _this = this;
        var /** @type {?} */ userClient = usersClientFactory({ dateRange$: this.dateRangeService$.data$ });
        this.client = userClient.list;
        this.client.updateStrategy = config.updateStrategy || "once";
        this.client.setQuery(this.query);
        this.loading$ = this.client.loading$;
        // this.client.setActive();
        var /** @type {?} */ data$ = this.client.dataArray$;
        this.dataTable$ = data$.pipe(filter(function (data) { return !!data; }), map$1(function (users) {
            _this.noData = users.length ? false : true;
            return users.map(function (user) {
                var /** @type {?} */ values = _this.tableFormat.map(function (data) { return data.selector(user); });
                return { data: user, values: values };
            });
        }));
    };
    ;
    /**
     * @param {?} instance
     * @return {?}
     */
    UsersAnalyticsListService.prototype.setData = function (instance) {
        instance.listService = this;
    };
    /**
     * @param {?=} isActive
     * @return {?}
     */
    UsersAnalyticsListService.prototype.setActive = function (isActive) {
        if (isActive === void 0) { isActive = true; }
        this.client.setActive(isActive);
    };
    return UsersAnalyticsListService;
}());
UsersAnalyticsListService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
UsersAnalyticsListService.ctorParameters = function () { return [
    null,
]; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var UsersSummaryChartComponent = (function () {
    function UsersSummaryChartComponent() {
        this.noData = false;
    }
    /**
     * @return {?}
     */
    UsersSummaryChartComponent.prototype.ngOnInit = function () {
    };
    /**
     * @param {?} data
     * @return {?}
     */
    UsersSummaryChartComponent.prototype.setChart = function (data) {
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
                format_tooltip_x: function (d) { return d; },
                format_tooltip_y: function (d) { return d; }
            });
        }
    };
    /**
     * @param {?} data
     * @return {?}
     */
    UsersSummaryChartComponent.prototype.formatSummary = function (data) {
        // let labels =
        var /** @type {?} */ labels = data.chart.map(function (item) { return item.label; });
        var /** @type {?} */ values = data.chart.map(function (item) { return item.value; });
        return {
            labels: labels,
            datasets: [
                {
                    values: values
                }
            ]
        };
    };
    return UsersSummaryChartComponent;
}());
UsersSummaryChartComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-users-summary-chart',
                template: "<div class=\"level\">\n  <div class=\"level-left\">\n    <div class=\"level-item is-size-5\" *ngIf=\"service.summary$ | async as summary\">\n      Total: {{summary.totalUsers}} {{'users'}}\n    </div>\n  </div>\n</div>\n<ng-container *ngIf=\"service.summary$ | async as summary\">\n  <ht-users-summary [summary]=\"summary\" [selectable]=\"false\" [hideTotal]=\"true\"></ht-users-summary>\n</ng-container>\n\n",
                styles: [""],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
UsersSummaryChartComponent.ctorParameters = function () { return []; };
UsersSummaryChartComponent.propDecorators = {
    "service": [{ type: Input },],
    "charElem": [{ type: ViewChild, args: ['chart',] },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var UsersSummaryService = (function () {
    /**
     * @param {?} config
     */
    function UsersSummaryService(config) {
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
    UsersSummaryService.prototype.setData = function (instance) {
        instance.service = this;
    };
    /**
     * @param {?} config
     * @return {?}
     */
    UsersSummaryService.prototype.setState = function (config) {
        this.dateRangeService$ = dateRangeFactory(DateRangeMap.last_30_days);
        this.title = config.title;
        var /** @type {?} */ client = config.client || usersClientFactory({ dateRange$: this.dateRangeService$.data$ });
        client.setShowAll();
        this.client = client.summary;
        this.loading$ = this.client.loading$;
        this.summary$ = client.listStatusChart$(config.queryLabels);
    };
    /**
     * @return {?}
     */
    UsersSummaryService.prototype.destroy = function () {
        this.client.destroy();
    };
    /**
     * @param {?=} isActive
     * @return {?}
     */
    UsersSummaryService.prototype.setActive = function (isActive) {
        if (isActive === void 0) { isActive = true; }
        this.client.setActive(isActive);
    };
    return UsersSummaryService;
}());
UsersSummaryService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
UsersSummaryService.ctorParameters = function () { return [
    null,
]; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AnalyticsMapContainerComponent = (function () {
    function AnalyticsMapContainerComponent() {
        this.mapOptions = {
            scrollWheelZoom: false
        };
    }
    /**
     * @return {?}
     */
    AnalyticsMapContainerComponent.prototype.ngOnInit = function () {
    };
    return AnalyticsMapContainerComponent;
}());
AnalyticsMapContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-analytics-map-container',
                template: "<ht-map [options]=\"mapOptions\" [loading]=\"service.mapLoading$ | async\" [mapInstance]=\"service.mapInstance\"></ht-map>\n",
                styles: [":host {\n  height: 500px;\n  width: 100%; }\n\nht-map {\n  height: 400px;\n  width: 100%; }\n"]
            },] },
];
/** @nocollapse */
AnalyticsMapContainerComponent.ctorParameters = function () { return []; };
AnalyticsMapContainerComponent.propDecorators = {
    "service": [{ type: Input },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var StopsHeatmapService = (function () {
    /**
     * @param {?} config
     */
    function StopsHeatmapService(config) {
        this.component = AnalyticsMapContainerComponent;
        this.className = "is-12";
        this.tags = ['users'];
        this.noData = false;
        this.loading$ = of$1(false);
        this.mapInstance = new MapInstance();
        this.setMapType('leaflet');
        this.initClient(config);
    }
    /**
     * @param {?} mapType
     * @return {?}
     */
    StopsHeatmapService.prototype.setMapType = function (mapType) {
        this.mapInstance.setMapType(mapType);
    };
    /**
     * @param {?} instance
     * @return {?}
     */
    StopsHeatmapService.prototype.setData = function (instance) {
        instance.service = this;
    };
    ;
    /**
     * @param {?=} active
     * @return {?}
     */
    StopsHeatmapService.prototype.setActive = function (active) {
        if (active === void 0) { active = true; }
        this.client.setActive(active);
    };
    /**
     * @param {?} config
     * @return {?}
     */
    StopsHeatmapService.prototype.initClient = function (config) {
        var _this = this;
        this.dateRangeService$ = dateRangeFactory(config.initialDateRange || DateRangeMap.last_7_days);
        this.title = config.title;
        var /** @type {?} */ userClient = usersClientFactory({ dateRange$: this.dateRangeService$.data$ });
        this.client = userClient.heatmap;
        this.mapLoading$ = this.client.loading$;
        this.dataArray$ = this.client.dataArray$.pipe(tap(function (data) {
            _this.noData = data && data.length == 0 ? true : false;
        }));
        var /** @type {?} */ heatMapTrace = new StopsHeatmapTrace(this.mapInstance);
        heatMapTrace.setData$(this.dataArray$);
    };
    return StopsHeatmapService;
}());
StopsHeatmapService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
StopsHeatmapService.ctorParameters = function () { return [
    null,
]; };
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
var usersAnalyticsListPresets = {
    /**
     * @return {?}
     */
    stops_heatmap: function () {
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
    max_location_disabled_duration: function () {
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
                        selector: function (user) {
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
                        selector: function (user) {
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
    current_location_disabled: function () {
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
                        selector: function (user) {
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
    max_stop_duration: function () {
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
                        selector: function (user) {
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
                        selector: function (user) {
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
    max_network_offline: function () {
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
                        selector: function (user) {
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
                        selector: function (user) {
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
    max_distance: function () {
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
                        selector: function (user) {
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
    users_summary: function (usersClient, title, queryLabels) {
        return {
            service: UsersSummaryService,
            initialConfig: {
                title: title || "Users status summary",
                queryLabels: queryLabels,
                client: usersClient,
            }
        };
    },
    /**
     * @return {?}
     */
    last_recorded: function () {
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
                        selector: function (user) {
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
    users_actions: function () {
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
                        selector: function (user) {
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
var ActionsStatusGraphService = (function () {
    /**
     * @param {?} config
     */
    function ActionsStatusGraphService(config) {
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
    ActionsStatusGraphService.prototype.initState = function (config) {
        // console.log(config.initialDateRange);
        this.dateRangeService$ = dateRangeFactory(config.initialDateRange || DateRangeMap.last_7_days);
        this.title = config.title || "Actions graph";
        this.chartFormat = config.chartFormat;
        if (config.tags && config.tags.length)
            this.tags = __spread(this.tags, config.tags);
    };
    /**
     * @return {?}
     */
    ActionsStatusGraphService.prototype.initClient = function () {
        var _this = this;
        var /** @type {?} */ graphClient = actionsClientFactory({ dateRange$: this.dateRangeService$.data$ });
        this.client = graphClient.graph;
        this.loading$ = this.client.loading$;
        this.data$ = this.client.data$.pipe(filter(function (data) { return !!data; }), map$1(function (data) {
            _this.noData = data.length ? false : true;
            return _this.getCompletedActionChart(data);
        }));
    };
    /**
     * @param {?} data
     * @return {?}
     */
    ActionsStatusGraphService.prototype.getCompletedActionChart = function (data) {
        // const format = data.length < 15 ? 'MMM D' : "MMM D";
        var /** @type {?} */ labels = data.map(function (item) {
            return format(item.created_date, 'ddd, MMM Do');
            // return moment(item.created_date).format('ddd, MMM Do')
        });
        var /** @type {?} */ datasets = this.chartFormat.map(function (item) {
            return {
                title: item.title,
                values: data.map(item.selector)
            };
        });
        return {
            labels: labels,
            datasets: datasets
        };
    };
    /**
     * @param {?} instance
     * @return {?}
     */
    ActionsStatusGraphService.prototype.setData = function (instance) {
        instance.service = this;
    };
    /**
     * @param {?=} isActive
     * @return {?}
     */
    ActionsStatusGraphService.prototype.setActive = function (isActive) {
        if (isActive === void 0) { isActive = true; }
        // this.client.setActive(isActive)
    };
    return ActionsStatusGraphService;
}());
ActionsStatusGraphService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ActionsStatusGraphService.ctorParameters = function () { return [
    null,
]; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ActionsAnalyticsListComponent = (function () {
    function ActionsAnalyticsListComponent() {
        this.selectedAction = null;
    }
    /**
     * @return {?}
     */
    ActionsAnalyticsListComponent.prototype.ngOnInit = function () {
    };
    /**
     * @param {?} row
     * @return {?}
     */
    ActionsAnalyticsListComponent.prototype.showActionDetail = function (row) {
        this.selectedAction = row.data;
    };
    /**
     * @return {?}
     */
    ActionsAnalyticsListComponent.prototype.closeModal = function () {
        this.selectedAction = null;
    };
    return ActionsAnalyticsListComponent;
}());
ActionsAnalyticsListComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-actions-analytics-list',
                template: "<table class=\"table is-fullwidth is-bordered is-hoverable\">\n  <thead>\n  <tr>\n    <th *ngFor=\"let column of listService.columns\">{{column}}</th>\n  </tr>\n  </thead>\n  <tbody>\n  <tr class=\"clickable\" (click)=\"showActionDetail(row)\" *ngFor=\"let row of listService.dataTable$ | async\">\n    <td *ngFor=\"let item of row.values\">{{item}}</td>\n  </tr>\n  </tbody>\n</table>\n\n<div class=\"modal is-active\" *ngIf=\"selectedAction\">\n  <div class=\"modal-background\" (click)=\"closeModal()\"></div>\n  <div class=\"modal-card\">\n    <section class=\"modal-card-body\">\n      <ht-action-table [action]=\"selectedAction\"></ht-action-table>\n      <!--<ht-user-table [user]=\"selectedUser\">-->\n        <!--{{listService.dateRangeService$.display$ | async}}-->\n      <!--</ht-user-table>-->\n    </section>\n  </div>\n  <button class=\"modal-close is-large\" aria-label=\"close\" (click)=\"closeModal()\"></button>\n</div>\n",
                styles: [".clickable:hover {\n  -webkit-box-shadow: 0px 0px 6px 1px #9f9f9f;\n          box-shadow: 0px 0px 6px 1px #9f9f9f;\n  z-index: 2; }\n"],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
ActionsAnalyticsListComponent.ctorParameters = function () { return []; };
ActionsAnalyticsListComponent.propDecorators = {
    "listService": [{ type: Input },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ActionsAnalyticsListService = (function () {
    /**
     * @param {?} config
     */
    function ActionsAnalyticsListService(config) {
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
    ActionsAnalyticsListService.prototype.initState = function (config) {
        this.dateRangeService$ = dateRangeFactory(config.initialDateRange || DateRangeMap.last_7_days);
        this.title = config.title;
        this.tableFormat = config.tableFormat;
        this.query = config.query;
        this.columns = this.tableFormat.map(function (data) { return data.label; });
        this.hideDatePicker = config.hideDatePicker;
        if (config.tags && config.tags.length)
            this.tags = __spread(this.tags, config.tags);
    };
    /**
     * @param {?} config
     * @return {?}
     */
    ActionsAnalyticsListService.prototype.initClient = function (config) {
        var _this = this;
        var /** @type {?} */ userClient = actionsClientFactory({ dateRange$: this.dateRangeService$.data$ });
        this.client = userClient.list;
        this.client.updateStrategy = config.updateStrategy || "once";
        this.client.setQuery(this.query);
        this.loading$ = this.client.loading$;
        // this.client.setActive();
        var /** @type {?} */ data$ = this.client.dataArray$;
        this.dataTable$ = data$.pipe(filter(function (data) { return !!data; }), map$1(function (users) {
            _this.noData = (users.length === 0) ? true : false;
            return users.map(function (user) {
                var /** @type {?} */ values = _this.tableFormat.map(function (data) { return data.selector(user); });
                return { data: user, values: values };
            });
        }));
    };
    ;
    /**
     * @param {?} instance
     * @return {?}
     */
    ActionsAnalyticsListService.prototype.setData = function (instance) {
        instance.listService = this;
    };
    /**
     * @param {?=} isActive
     * @return {?}
     */
    ActionsAnalyticsListService.prototype.setActive = function (isActive) {
        if (isActive === void 0) { isActive = true; }
        this.client.setActive(isActive);
    };
    return ActionsAnalyticsListService;
}());
ActionsAnalyticsListService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ActionsAnalyticsListService.ctorParameters = function () { return [
    null,
]; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ActionsSummaryChartComponent = (function () {
    function ActionsSummaryChartComponent() {
    }
    /**
     * @return {?}
     */
    ActionsSummaryChartComponent.prototype.ngOnInit = function () {
    };
    return ActionsSummaryChartComponent;
}());
ActionsSummaryChartComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-actions-summary-chart',
                template: "<div class=\"level\">\n  <div class=\"level-left\">\n    <div class=\"level-item is-size-5 has-text-grey\" *ngIf=\"service.summary$ | async as summary\">\n      Total: {{summary.totalUsers}} actions\n    </div>\n  </div>\n</div>\n<ng-container *ngIf=\"service.summary$ | async as summary\">\n  <ht-users-summary [summary]=\"summary\" [selectable]=\"false\" [hideTotal]=\"true\"></ht-users-summary>\n</ng-container>\n\n",
                styles: [""],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
ActionsSummaryChartComponent.ctorParameters = function () { return []; };
ActionsSummaryChartComponent.propDecorators = {
    "service": [{ type: Input },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ActionsSummaryService = (function () {
    /**
     * @param {?} config
     */
    function ActionsSummaryService(config) {
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
    ActionsSummaryService.prototype.setData = function (instance) {
        instance.service = this;
    };
    /**
     * @param {?} config
     * @return {?}
     */
    ActionsSummaryService.prototype.initState = function (config) {
        this.dateRangeService$ = dateRangeFactory(DateRangeMap.today);
        this.title = config.title;
        var /** @type {?} */ client = config.client || actionsClientFactory({ dateRange$: this.dateRangeService$.data$ });
        if (config.dateRangeService)
            this.dateRangeService$ = config.dateRangeService;
        this.client = client.summary;
        this.loading$ = this.client.loading$;
        this.summary$ = this.client.summaryChart$;
        // this.client.setActive()
    };
    /**
     * @param {?=} isActive
     * @return {?}
     */
    ActionsSummaryService.prototype.setActive = function (isActive) {
        if (isActive === void 0) { isActive = true; }
        this.client.setActive(isActive);
    };
    return ActionsSummaryService;
}());
ActionsSummaryService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ActionsSummaryService.ctorParameters = function () { return [
    null,
]; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ActionsHeatmapService = (function () {
    /**
     * @param {?} config
     */
    function ActionsHeatmapService(config) {
        this.component = AnalyticsMapContainerComponent;
        this.className = "is-12";
        this.tags = ['action'];
        this.noData = false;
        this.loading$ = of$1(false);
        this.mapInstance = new MapInstance();
        this.setMapType('leaflet');
        this.initClient(config);
    }
    /**
     * @param {?} mapType
     * @return {?}
     */
    ActionsHeatmapService.prototype.setMapType = function (mapType) {
        this.mapInstance.setMapType(mapType);
    };
    /**
     * @param {?} instance
     * @return {?}
     */
    ActionsHeatmapService.prototype.setData = function (instance) {
        instance.service = this;
    };
    ;
    /**
     * @param {?=} active
     * @return {?}
     */
    ActionsHeatmapService.prototype.setActive = function (active) {
        if (active === void 0) { active = true; }
        this.client.setActive(active);
    };
    /**
     * @param {?} config
     * @return {?}
     */
    ActionsHeatmapService.prototype.initClient = function (config) {
        var _this = this;
        this.dateRangeService$ = dateRangeFactory(config.initialDateRange || DateRangeMap.last_7_days);
        this.title = config.title;
        var /** @type {?} */ actionsClient = actionsClientFactory({ dateRange$: this.dateRangeService$.data$ });
        this.client = actionsClient.heatmap;
        this.mapLoading$ = this.client.loading$;
        this.dataArray$ = this.client.dataArray$.pipe(tap(function (data) {
            _this.noData = data && data.length == 0 ? true : false;
        }));
        var /** @type {?} */ heatMapTrace = new ActionsHeatmapTrace(this.mapInstance);
        heatMapTrace.setData$(this.dataArray$);
    };
    return ActionsHeatmapService;
}());
ActionsHeatmapService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ActionsHeatmapService.ctorParameters = function () { return [
    null,
]; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var actionsConfigPreset = {
    /**
     * @return {?}
     */
    heatmap: function () {
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
    status: function () {
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
                        selector: function (graphData) {
                            return graphData.assigned;
                        }
                    },
                    {
                        title: "Completed",
                        /**
                         * @param {?} graphData
                         * @return {?}
                         */
                        selector: function (graphData) {
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
    max_distance: function () {
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
                        selector: function (action) {
                            return action.lookup_id || "NA";
                        }
                    },
                    {
                        label: "Type",
                        /**
                         * @param {?} action
                         * @return {?}
                         */
                        selector: function (action) {
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
    recently_assigned: function () {
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
                        selector: function (action) {
                            return action.user ? NameCase(action.user.name) : "NA";
                        }
                    },
                    {
                        label: "Type",
                        /**
                         * @param {?} action
                         * @return {?}
                         */
                        selector: function (action) {
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
                        selector: function (action) {
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
                        selector: function (action) {
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
    recently_completed: function () {
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
                        selector: function (action) {
                            return action.user ? NameCase(action.user.name) : "NA";
                        }
                    },
                    {
                        label: "Type",
                        /**
                         * @param {?} action
                         * @return {?}
                         */
                        selector: function (action) {
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
                        selector: function (action) {
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
    max_duration: function () {
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
                        selector: function (action) {
                            return action.user ? NameCase(action.user.name) : "NA";
                        }
                    },
                    {
                        label: "Type",
                        /**
                         * @param {?} action
                         * @return {?}
                         */
                        selector: function (action) {
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
    users_on_action: function () {
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
                        selector: function (action) {
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
                        selector: function (action) {
                            return action.user ? TimeString(action.user.last_heartbeat_at) : "--";
                        }
                    },
                    {
                        label: "Action type",
                        /**
                         * @param {?} action
                         * @return {?}
                         */
                        selector: function (action) {
                            return action.type;
                        }
                    },
                    {
                        label: "Expected At",
                        /**
                         * @param {?} action
                         * @return {?}
                         */
                        selector: function (action) {
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
    summary: function (actionsClient, dateRangeService$$1, title, queryLabels) {
        return {
            service: ActionsSummaryService,
            initialConfig: {
                title: title || "Actions status summary",
                updateStrategy: 'live',
                tags: ['live'],
                query: {},
                queryLabels: queryLabels,
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
var AnalyticsItemsService = (function () {
    function AnalyticsItemsService() {
        var _this = this;
        this.chosenItemCreater = [];
        this.selectedTags$ = new BehaviorSubject$1([]);
        var /** @type {?} */ usersClient = usersClientFactory({ dateRange$: dateRangeFactory(DateRangeMap.today).data$.asObservable() });
        var /** @type {?} */ usersFilter = usersClient.filterClass;
        var /** @type {?} */ activityQueryLabel = usersFilter.activityQueryArray;
        var /** @type {?} */ showAllQueryLable = usersFilter.showAllQueryArray;
        var /** @type {?} */ actionDateRangeService = dateRangeFactory(DateRangeMap.today);
        var /** @type {?} */ actionsClient = actionsClientFactory({ dateRange$: actionDateRangeService.data$.asObservable() });
        this.presets = [
            // actionsConfigPreset.max_distance(),
            // actionsConfigPreset.max_duration(),
            actionsConfigPreset["summary"](actionsClient, actionDateRangeService),
            // usersAnalyticsListPresets.users_summary(usersClient),
            usersAnalyticsListPresets["users_summary"](usersClient, 'Users activity summary', __spread(activityQueryLabel, showAllQueryLable)),
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
        this.items$ = new BehaviorSubject$1(this.getItems(this.presets));
        this.allTags$ = this.items$.pipe(map$1(function (items) {
            _this.totalTags = items.length;
            return items.reduce(function (tags, item) {
                var /** @type {?} */ itemTags = item.tags;
                return itemTags.reduce(function (currentTags, tag) {
                    return currentTags.includes(tag) ? currentTags : __spread(currentTags, [tag]);
                }, tags);
                // return tags.includes()
            }, ['users', 'actions']);
        }));
        this.tags$ = combineLatest$1(this.allTags$, this.selectedTags$, function (allTags, selectedTags) {
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
            return allTags.map(function (tag) {
                var /** @type {?} */ isActive = selectedTags.includes(tag);
                return { key: tag, isActive: isActive };
            });
        });
        this.filteredItems$ = combineLatest$1(this.items$, this.selectedTags$, function (items, tags) {
            return tags.length ? items.filter(function (item) {
                return tags.reduce(function (pass, selectedTag) {
                    return pass && item.tags.includes(selectedTag);
                }, true);
                // return tags.reduce((pass, existingTag) => {
                //   return pass || item.tags.includes(existingTag)
                // }, false)
            }) : items;
        });
    }
    ;
    /**
     * @param {?} itemCreator
     * @return {?}
     */
    AnalyticsItemsService.prototype.isItemCreatorActive = function (itemCreator) {
        return this.chosenItemCreater.includes(itemCreator);
    };
    /**
     * @param {?} tag
     * @return {?}
     */
    AnalyticsItemsService.prototype.toggleTag = function (tag) {
        var _this = this;
        this.selectedTags$.pipe(take(1))
            .subscribe(function (tags) {
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
            _this.selectedTags$.next(__spread(tags));
        });
    };
    ;
    /**
     * @param {?} tag
     * @return {?}
     */
    AnalyticsItemsService.prototype.selectTag = function (tag) {
        var _this = this;
        this.selectedTags$.pipe(take(1))
            .subscribe(function (tags) {
            if (tags.includes(tag)) {
                tags.splice(tags.indexOf(tag), 1);
            }
            else {
                tags = [tag];
            }
            // if (tags.length === this.totalTags) {
            //   tags = [];
            // }
            _this.selectedTags$.next(__spread(tags));
        });
    };
    /**
     * @param {?} choosenPreset
     * @return {?}
     */
    AnalyticsItemsService.prototype.setPreset = function (choosenPreset) {
        this.items$.next(this.getItems(choosenPreset));
        this.initServices();
    };
    /**
     * @param {?} itemsConfigs
     * @return {?}
     */
    AnalyticsItemsService.prototype.getItems = function (itemsConfigs) {
        return itemsConfigs.map(function (preset) {
            var /** @type {?} */ service = new preset.service(preset.initialConfig);
            return service;
        });
    };
    ;
    /**
     * @return {?}
     */
    AnalyticsItemsService.prototype.initServices = function () {
        this.setServicesActive(true);
    };
    /**
     * @param {?=} isActive
     * @return {?}
     */
    AnalyticsItemsService.prototype.setServicesActive = function (isActive) {
        if (isActive === void 0) { isActive = true; }
        this.items$.pipe(take(1)).subscribe(function (items) {
            items.forEach(function (item) {
                item.setActive(isActive);
            });
        });
    };
    /**
     * @return {?}
     */
    AnalyticsItemsService.prototype.destroy = function () {
        this.setServicesActive(false);
    };
    return AnalyticsItemsService;
}());
AnalyticsItemsService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AnalyticsItemsService.ctorParameters = function () { return []; };
/**
 * @record
 */
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AnalyticsContainerComponent = (function () {
    /**
     * @param {?} analyticsItemsService
     */
    function AnalyticsContainerComponent(analyticsItemsService) {
        this.analyticsItemsService = analyticsItemsService;
        this.configure = false;
    }
    /**
     * @return {?}
     */
    AnalyticsContainerComponent.prototype.ngOnInit = function () {
        this.analyticsItemsService.initServices();
    };
    /**
     * @return {?}
     */
    AnalyticsContainerComponent.prototype.openConfig = function () {
        this.configure = true;
    };
    /**
     * @return {?}
     */
    AnalyticsContainerComponent.prototype.ngOnDestroy = function () {
        this.analyticsItemsService.destroy();
    };
    return AnalyticsContainerComponent;
}());
AnalyticsContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-analytics-container',
                template: "<div class=\"toolbar\">\n  <div class=\"level\">\n    <div class=\"level-left\">\n      <!--<div class=\"level-item\">-->\n        <!--<div class=\"icon\">-->\n          <!--<i class=\"fa fa-tags has-text-grey\"></i>-->\n        <!--</div>-->\n        <!--Filter by Tags:-->\n      <!--</div>-->\n      <div class=\"level-item\">\n        <div class=\"dropdown is-hoverable\">\n          <div class=\"dropdown-trigger\">\n            <button class=\"button\" aria-haspopup=\"true\" aria-controls=\"dropdown-menu\">\n              <span class=\"icon\">\n                <i class=\"fa fa-tags has-text-grey\"></i>\n              </span>\n              <span>Filter by Tags:</span>\n              <span class=\"icon is-small\">\n        <i class=\"fa fa-angle-down\" aria-hidden=\"true\"></i>\n      </span>\n            </button>\n          </div>\n          <div class=\"dropdown-menu\" id=\"dropdown-menu\" role=\"menu\">\n            <div class=\"dropdown-content\">\n              <a (click)=\"analyticsItemsService.toggleTag(tag.key)\" class=\"dropdown-item\" *ngFor=\"let tag of analyticsItemsService.tags$ | async\">\n                <label class=\"checkbox\">\n                  <input type=\"checkbox\" [checked]=\"tag.isActive\">\n                  {{tag.key}}\n                </label>\n              </a>\n              <!--<a class=\"dropdown-item\">-->\n                <!--Other dropdown item-->\n              <!--</a>-->\n              <!--<a href=\"#\" class=\"dropdown-item is-active\">-->\n                <!--Active dropdown item-->\n              <!--</a>-->\n              <!--<a href=\"#\" class=\"dropdown-item\">-->\n                <!--Other dropdown item-->\n              <!--</a>-->\n              <!--<hr class=\"dropdown-divider\">-->\n              <!--<a href=\"#\" class=\"dropdown-item\">-->\n                <!--With a divider-->\n              <!--</a>-->\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"level-item\" *ngFor=\"let tag of analyticsItemsService.tags$ | async\">\n        <button\n          class=\"button\"\n          [class.is-primary]=\"tag.isActive\"\n          (click)=\"analyticsItemsService.selectTag(tag.key)\">\n\n          <span>{{tag.key}}</span>\n          <span *ngIf=\"tag.isActive\" class=\"icon is-small\">\n              <i class=\"fa fa-times\"></i>\n            </span>\n        </button>\n        <!--<span class=\"tag clickable is-medium\"-->\n\n              <!--(click)=\"analyticsItemsService.selectTag(tag.key)\"-->\n              <!--[class.is-primary]=\"tag.isActive\">-->\n          <!--{{tag.key}} <span *ngIf=\"tag.isActive\" class=\"delete\"></span>-->\n        <!--</span>-->\n      </div>\n    </div>\n    <div class=\"level-right\">\n      <div class=\"level-item\">\n        <button class=\"button\" (click)=\"openConfig()\">\n        <span class=\"icon\">\n          <i class=\"fa fa-edit\"></i>\n        </span>\n          <span>Edit</span>\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n<div class=\"container\">\n  <div class=\"columns is-multiline is-centered\" *ngIf=\"analyticsItemsService.filteredItems$ | async as items\">\n    <div class=\"column\" [@card-appear] [ngClass]=\"item.className\" *ngFor=\"let item of items\">\n      <div class=\"card card-content\">\n        <ht-analytics-tags\n          (selectTag)=\"analyticsItemsService.toggleTag($event)\"\n          [tags]=\"item.tags\"\n          [selectedTags]=\"analyticsItemsService.selectedTags$ | async\"></ht-analytics-tags>\n        <ht-analytics-title\n          [title]=\"item.title\"\n          [hideDatePicker]=\"item.hideDatePicker\"\n          [dateRangeService$]=\"item.dateRangeService$\"></ht-analytics-title>\n        <ht-analytics-item-load [minHeight]=\"item.minHeight\" [loading$]=\"item.loading$\" [noData]=\"item.noData\">\n          <ht-analytics-item [item]=\"item\"></ht-analytics-item>\n        </ht-analytics-item-load>\n\n      </div>\n    </div>\n    <div class=\"column is-6 auto setup\" *ngIf=\"items.length == 0\">\n      <div class=\"is-size-1 has-text-centered has-text-grey-light\">No view is selected</div>\n    </div>\n    <div class=\"modal is-active\" *ngIf=\"configure\">\n      <div class=\"modal-background\" (click)=\"configure = false\"></div>\n      <div class=\"modal-card\">\n        <header class=\"modal-card-head\">\n          <p class=\"modal-card-title\">Choose preset views</p>\n        </header>\n        <section class=\"modal-card-body\">\n          <ht-analytics-selector (selected)=\"configure = false\"></ht-analytics-selector>\n        </section>\n      </div>\n    </div>\n  </div>\n</div>\n\n",
                styles: [".setup {\n  margin-top: 70px; }\n\n.toolbar {\n  width: 100%;\n  padding: 16px 40px;\n  margin-bottom: 20px;\n  background: white;\n  border-bottom: 1px solid #d6d6d6; }\n\n.grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr; }\n  .grid .is-6 {\n    width: 100%; }\n  .grid .is-12 {\n    grid-column: 1/3; }\n"],
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
AnalyticsContainerComponent.ctorParameters = function () { return [
    { type: AnalyticsItemsService, },
]; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AnalyticsSlotDirective = (function () {
    /**
     * @param {?} viewContainerRef
     */
    function AnalyticsSlotDirective(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    return AnalyticsSlotDirective;
}());
AnalyticsSlotDirective.decorators = [
    { type: Directive, args: [{
                selector: '[htAnalyticsSlot]'
            },] },
];
/** @nocollapse */
AnalyticsSlotDirective.ctorParameters = function () { return [
    { type: ViewContainerRef, },
]; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AnalyticsItemComponent = (function () {
    /**
     * @param {?} componentFactoryResolver
     */
    function AnalyticsItemComponent(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
    }
    /**
     * @return {?}
     */
    AnalyticsItemComponent.prototype.ngOnInit = function () {
        this.addComponent();
    };
    /**
     * @return {?}
     */
    AnalyticsItemComponent.prototype.addComponent = function () {
        var /** @type {?} */ componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.item.component);
        var /** @type {?} */ viewContainerRef = this.slot.viewContainerRef;
        viewContainerRef.clear();
        var /** @type {?} */ componentRef = viewContainerRef.createComponent(componentFactory);
        this.item.setData(componentRef.instance);
    };
    return AnalyticsItemComponent;
}());
AnalyticsItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-analytics-item',
                template: "<div htAnalyticsSlot></div>\n",
                styles: [""]
            },] },
];
/** @nocollapse */
AnalyticsItemComponent.ctorParameters = function () { return [
    { type: ComponentFactoryResolver, },
]; };
AnalyticsItemComponent.propDecorators = {
    "slot": [{ type: ViewChild, args: [AnalyticsSlotDirective,] },],
    "item": [{ type: Input },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AnalyticsSelectorComponent = (function () {
    /**
     * @param {?} analyticsItemsService
     */
    function AnalyticsSelectorComponent(analyticsItemsService) {
        this.analyticsItemsService = analyticsItemsService;
        this.selected = new EventEmitter();
        this.choosenPreset = [];
    }
    /**
     * @return {?}
     */
    AnalyticsSelectorComponent.prototype.ngOnInit = function () {
        (_a = this.choosenPreset).push.apply(_a, __spread(this.analyticsItemsService.presets));
        var _a;
        // setTimeout(() => {
        //   this.setPreset()
        // });
    };
    /**
     * @param {?} preset
     * @return {?}
     */
    AnalyticsSelectorComponent.prototype.isActive = function (preset) {
        return this.choosenPreset.includes(preset);
    };
    /**
     * @param {?} preset
     * @return {?}
     */
    AnalyticsSelectorComponent.prototype.togglePreset = function (preset) {
        if (this.isActive(preset)) {
            var /** @type {?} */ index = this.choosenPreset.indexOf(preset);
            this.choosenPreset.splice(index, 1);
        }
        else {
            this.choosenPreset.push(preset);
        }
    };
    ;
    /**
     * @return {?}
     */
    AnalyticsSelectorComponent.prototype.setPreset = function () {
        this.analyticsItemsService.setPreset(this.choosenPreset);
        this.selected.next(true);
    };
    return AnalyticsSelectorComponent;
}());
AnalyticsSelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-analytics-selector',
                template: "<!--<div class=\"card\">-->\n  <!--<div class=\"card-header\">-->\n    <!--<div class=\"card-header-title\">-->\n      <!--Choose preset views-->\n    <!--</div>-->\n  <!--</div>-->\n  <!--<div class=\"card-content\">-->\n    <!---->\n  <!--</div>-->\n<!--</div>-->\n<div class=\"field\" *ngFor=\"let preset of analyticsItemsService.presets\">\n  <div class=\"control\">\n    <label class=\"checkbox\">\n      <input type=\"checkbox\" (click)=\"togglePreset(preset)\" [checked]=\"isActive(preset)\">\n      {{preset.initialConfig.title}}\n    </label>\n  </div>\n</div>\n<div class=\"field\">\n  <div class=\"control\">\n    <button class=\"button\" (click)=\"setPreset()\">Create views</button>\n  </div>\n</div>\n",
                styles: [""],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
AnalyticsSelectorComponent.ctorParameters = function () { return [
    { type: AnalyticsItemsService, },
]; };
AnalyticsSelectorComponent.propDecorators = {
    "selected": [{ type: Output },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var UsersSummaryChartModule = (function () {
    function UsersSummaryChartModule() {
    }
    return UsersSummaryChartModule;
}());
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
UsersSummaryChartModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AnalyticsTagsComponent = (function () {
    function AnalyticsTagsComponent() {
        this.remove = new EventEmitter();
        this.selectTag = new EventEmitter();
        this.edit = new EventEmitter();
    }
    /**
     * @return {?}
     */
    AnalyticsTagsComponent.prototype.ngOnInit = function () {
    };
    /**
     * @param {?} tag
     * @return {?}
     */
    AnalyticsTagsComponent.prototype.isTagActive = function (tag) {
        return this.selectedTags.includes(tag);
    };
    return AnalyticsTagsComponent;
}());
AnalyticsTagsComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-analytics-tags',
                template: "<div class=\"level\">\n  <div class=\"level-left\">\n    <div class=\"level-item\">\n      <div class=\"icon\">\n        <i class=\"fa fa-tag has-text-grey\"></i>\n      </div>\n    </div>\n    <div class=\"level-item\">\n      <div class=\"tags\">\n        <span class=\"tag clickable\" (click)=\"selectTag.next(tag)\" [class.is-primary]=\"isTagActive(tag)\" *ngFor=\"let tag of tags\">\n          {{tag}}\n          <span class=\"icon\" *ngIf=\"tag === 'live'\">\n            &nbsp;\n            <i class=\"fa fa-circle\" style=\"color: #99d8ac;\"></i>\n          </span>\n        </span>\n      </div>\n    </div>\n  </div>\n  <!--<div class=\"level-right\">-->\n    <!--<div class=\"level-item\">-->\n      <!--<div class=\"dropdown is-hoverable is-right\">-->\n        <!--<div class=\"dropdown-trigger\">-->\n          <!--<button class=\"button is-white has-text-grey\" aria-haspopup=\"true\" aria-controls=\"dropdown-menu4\">-->\n        <!--<span class=\"icon\">-->\n          <!--<i class=\"fa fa-ellipsis-v\"></i>-->\n        <!--</span>-->\n          <!--</button>-->\n        <!--</div>-->\n        <!--<div class=\"dropdown-menu\" id=\"dropdown-menu4\" role=\"menu\">-->\n          <!--<div class=\"dropdown-content\">-->\n            <!--<a class=\"dropdown-item flex-row align-center\">-->\n              <!--<span class=\"icon\"><i class=\"fa fa-edit\"></i></span>-->\n              <!--<span class=\"flex\">Edit</span>-->\n            <!--</a>-->\n            <!--<a class=\"dropdown-item flex-row align-center has-text-danger\">-->\n              <!--<span class=\"icon\"><i class=\"fa fa-remove\"></i></span>-->\n              <!--<span class=\"flex\">Remove</span>-->\n            <!--</a>-->\n          <!--</div>-->\n        <!--</div>-->\n      <!--</div>-->\n    <!--</div>-->\n  <!--</div>-->\n</div>\n",
                styles: [".level {\n  margin-bottom: 10px; }\n"],
                changeDetection: ChangeDetectionStrategy.OnPush,
            },] },
];
/** @nocollapse */
AnalyticsTagsComponent.ctorParameters = function () { return []; };
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
var AnalyticsTagsModule = (function () {
    function AnalyticsTagsModule() {
    }
    return AnalyticsTagsModule;
}());
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
AnalyticsTagsModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ActionTableComponent = (function () {
    function ActionTableComponent() {
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
    ActionTableComponent.prototype.ngOnInit = function () {
    };
    Object.defineProperty(ActionTableComponent.prototype, "tableData", {
        /**
         * @return {?}
         */
        get: function () {
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
        },
        enumerable: true,
        configurable: true
    });
    return ActionTableComponent;
}());
ActionTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-action-table',
                template: "<div class=\"level\">\n  <div class=\"level-right has-text-grey\">\n    <div class=\"level-item\">\n      <div class=\"icon-box\">\n        <i class=\"fa fa-briefcase\"></i>\n      </div>\n      <!--<span class=\"fa-stack fa-lg\">-->\n          <!--<i class=\"fa fa-square-o fa-stack-2x\"></i>-->\n          <!--<i class=\"fa fa-briefcase fa-stack-1x\"></i>-->\n        <!--</span>-->\n    </div>\n    <div class=\"level-item is-size-4 is-capitalized\">\n      {{action.type}}\n      <!--<span *ngIf=\"action.display.duration_remaining && action.display.show_summary\">-->\n        <!--{{action.display.duration_remaining | HMString}}-->\n      <!--</span>-->\n    </div>\n    <div class=\"level-item is-size-4\">\n      {{action.display.status_text}}\n    </div>\n    <div class=\"level-item is-size-4\">\n      {{action.display.sub_status_text}}\n    </div>\n  </div>\n  <div class=\"level-left\">\n    # {{action.lookup_id}}\n  </div>\n</div>\n<ht-data-table [tableData]=\"tableData\"></ht-data-table>\n<ht-user-table [user]=\"action.user\"></ht-user-table>\n",
                styles: [".icon-box {\n  width: 30px;\n  height: 30px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  border: 1px solid grey;\n  border-radius: 50%; }\n  .icon-box .fa {\n    margin: auto; }\n"],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
ActionTableComponent.ctorParameters = function () { return []; };
ActionTableComponent.propDecorators = {
    "action": [{ type: Input },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ActionTableModule = (function () {
    function ActionTableModule() {
    }
    return ActionTableModule;
}());
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
ActionTableModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ActionsAnalyticsListModule = (function () {
    function ActionsAnalyticsListModule() {
    }
    return ActionsAnalyticsListModule;
}());
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
ActionsAnalyticsListModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ActionsSummaryChartModule = (function () {
    function ActionsSummaryChartModule() {
    }
    return ActionsSummaryChartModule;
}());
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
ActionsSummaryChartModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AnalyticsTitleComponent = (function () {
    function AnalyticsTitleComponent() {
    }
    /**
     * @return {?}
     */
    AnalyticsTitleComponent.prototype.ngOnInit = function () {
    };
    return AnalyticsTitleComponent;
}());
AnalyticsTitleComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-analytics-title',
                template: "<div class=\"level\">\n  <div class=\"level-left\">\n    <div class=\"level-item has-text-weight-bold has-text-primary is-size-4\">\n      {{title}}\n    </div>\n  </div>\n  <div class=\"level-right\">\n    <ng-content></ng-content>\n    <div class=\"level-item\" *ngIf=\"!hideDatePicker\">\n      <ht-date-range [isRight]=\"true\" [dateRangeService$]=\"dateRangeService$\"></ht-date-range>\n    </div>\n  </div>\n</div>\n",
                styles: [".level {\n  margin-bottom: 10px; }\n"]
            },] },
];
/** @nocollapse */
AnalyticsTitleComponent.ctorParameters = function () { return []; };
AnalyticsTitleComponent.propDecorators = {
    "title": [{ type: Input },],
    "dateRangeService$": [{ type: Input },],
    "hideDatePicker": [{ type: Input },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AnalyticsItemLoadComponent = (function () {
    function AnalyticsItemLoadComponent() {
        this.noData = false;
    }
    Object.defineProperty(AnalyticsItemLoadComponent.prototype, "_minHeight", {
        /**
         * @return {?}
         */
        get: function () {
            return this.minHeight || 300;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AnalyticsItemLoadComponent.prototype.ngOnInit = function () {
    };
    return AnalyticsItemLoadComponent;
}());
AnalyticsItemLoadComponent.decorators = [
    { type: Component, args: [{
                selector: 'ht-analytics-item-load',
                template: "<div class=\"loading-container\" [style.min-height.px]=\"_minHeight\">\n  <ng-content></ng-content>\n  <div class=\"loading-page\" *ngIf=\"loading$ | async\">\n    <div class=\"icon auto has-text-grey-light\">\n      <i class=\"fa fa-circle-o-notch fa-spin fa-3x fa-fw\"></i>\n    </div>\n  </div>\n  <div class=\"loading-page\" *ngIf=\"noData\">\n    <div class=\"auto has-text-grey-light is-size-1\">\n      No Data\n    </div>\n  </div>\n</div>\n",
                styles: [".loading-page {\n  background: #ffffff96;\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  top: 0;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n\n.loading-container {\n  position: relative; }\n"],
                changeDetection: ChangeDetectionStrategy.OnPush,
            },] },
];
/** @nocollapse */
AnalyticsItemLoadComponent.ctorParameters = function () { return []; };
AnalyticsItemLoadComponent.propDecorators = {
    "loading$": [{ type: Input },],
    "minHeight": [{ type: Input },],
    "noData": [{ type: Input },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AnalyticsItemLoadModule = (function () {
    function AnalyticsItemLoadModule() {
    }
    return AnalyticsItemLoadModule;
}());
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
AnalyticsItemLoadModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AnalyticsMapContainerModule = (function () {
    function AnalyticsMapContainerModule() {
    }
    return AnalyticsMapContainerModule;
}());
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
AnalyticsMapContainerModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AnalyticsContainerModule = (function () {
    function AnalyticsContainerModule() {
    }
    return AnalyticsContainerModule;
}());
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
AnalyticsContainerModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var HtRequestService = (function (_super) {
    __extends(HtRequestService, _super);
    /**
     * @param {?} http
     */
    function HtRequestService(http$$1) {
        var _this = _super.call(this) || this;
        _this.http = http$$1;
        return _this;
    }
    /**
     * @template T
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    HtRequestService.prototype.getObservable = function (url, options) {
        if (options === void 0) { options = {}; }
        var /** @type {?} */ headers = _super.prototype.headerObj.call(this);
        return this.http.get(url, Object.assign({ headers: headers }, options));
    };
    /**
     * @template T
     * @param {?} url
     * @param {?} body
     * @param {?=} options
     * @return {?}
     */
    HtRequestService.prototype.postObservable = function (url, body, options) {
        if (options === void 0) { options = {}; }
        var /** @type {?} */ headers = _super.prototype.headerObj.call(this);
        return this.http.post(url, body, Object.assign({ headers: headers }, options));
    };
    return HtRequestService;
}(HtRequest));
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var HtAccountService = (function (_super) {
    __extends(HtAccountService, _super);
    function HtAccountService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return HtAccountService;
}(AccountsClient));
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var HtActionsService = (function (_super) {
    __extends(HtActionsService, _super);
    function HtActionsService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return HtActionsService;
}(HtActionsClient));
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
function clientServiceFactory(token, http$$1) {
    var /** @type {?} */ request = new HtRequestService(http$$1);
    htRequestService.setInstance(request);
    var /** @type {?} */ client = htClientService.getInstance(token);
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
var HtModule = (function () {
    function HtModule() {
    }
    /**
     * @param {?} config
     * @return {?}
     */
    HtModule.forRoot = function (config) {
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
    };
    ;
    return HtModule;
}());
HtModule.decorators = [
    { type: NgModule, args: [{
                imports: [HttpClientModule]
            },] },
];
/** @nocollapse */
HtModule.ctorParameters = function () { return []; };
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
export { UserCardModule, UserCardComponent, UsersComponent, UsersModule, UsersContainerModule, UsersContainerComponent, GroupsModule, GroupsComponent, GroupsContainerModule, GroupsContainerComponent, GroupsChartContainerModule, GroupsChartContainerComponent, MapModule, MapContainerModule, MapContainerComponent, SharedModule, PaginationModule, PaginationComponent, PlacelineContainerModule, PlacelineContainerComponent, PlacelineModule, PlacelineComponent, PlacelineMapContainerModule, PlacelineMapContainerComponent, UsersMapContainerModule, UsersMapContainerComponent, GroupKeyResolver, GroupLookupKeyResolver, HtClientService, HtUsersService, HtMapService, HtGroupsService, UsersAnalyticsListModule, UsersAnalyticsListComponent, ActionsStatusGraphModule, ActionsStatusGraphComponent, UserTableModule, UserTableComponent, AnalyticsContainerModule, AnalyticsContainerComponent, UsersSummaryChartComponent, UsersSummaryChartModule, TOKEN, clientServiceFactory, mapServiceFactory, userClientServiceFactory, actionClientServiceFactory, groupClientServiceFactory, accountUsersClientServiceFactory, HtModule, ActionTableComponent as ɵbq, ActionTableModule as ɵbp, ActionsAnalyticsListComponent as ɵbr, ActionsAnalyticsListModule as ɵbo, ActionsSummaryChartComponent as ɵbt, ActionsSummaryChartModule as ɵbs, AnalyticsItemLoadComponent as ɵbv, AnalyticsItemLoadModule as ɵbu, AnalyticsItemComponent as ɵca, AnalyticsSlotDirective as ɵbz, AnalyticsItemsService as ɵby, AnalyticsSelectorComponent as ɵcb, AnalyticsTagsComponent as ɵbn, AnalyticsTagsModule as ɵbm, AnalyticsTitleComponent as ɵcc, AnalyticsMapContainerComponent as ɵbx, AnalyticsMapContainerModule as ɵbw, DataTableComponent as ɵbl, DataTableModule as ɵbk, DateRangeComponent as ɵbi, DateRangeModule as ɵbh, EntitySearchComponent as ɵbg, EntitySearchModule as ɵbf, UsersFilterComponent as ɵbj, UsersFilterModule as ɵbe, GroupsChartService as ɵbc, HtAccountService as ɵce, HtActionsService as ɵcd, MAP_TYPE as ɵa, MapComponent as ɵbd, ActionSortingStringPipe as ɵt, ActionStatusStringPipe as ɵp, DateHumanizePipe as ɵj, DateStringPipe as ɵd, DistanceLocalePipe as ɵk, DotPipe as ɵf, HmStringPipe as ɵl, NameCasePipe as ɵg, PluralizePipe as ɵu, SafeHtmlPipe as ɵq, SafeUrlPipe as ɵr, TimeStringPipe as ɵe, UserSortingStringPipe as ɵs, UsersStatusStringPipe as ɵo, BatteryIconComponent as ɵc, ButtonComponent as ɵv, DropdownDirective as ɵx, LoadingBarComponent as ɵw, LoadingDataComponent as ɵi, LoadingDotsComponent as ɵh, ProfileComponent as ɵb, SnackbarComponent as ɵm, SnackbarService as ɵn, UsersSummaryContainerComponent as ɵbb, UsersSummaryContainerModule as ɵy, UsersSummaryComponent as ɵba, UsersSummaryModule as ɵz };
//# sourceMappingURL=ht-angular.js.map

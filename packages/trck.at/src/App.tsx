import * as React from 'react';
import './App.css';
const logo = require('./logo.png');

import {TrackAction, trackShortCode} from 'ht-webtracking-sdk';
import {IAction, ISubAccount} from 'ht-webtracking-sdk/dist/src/model';
import {isRedirectedUrl, checkUserAgent, getUserAgent} from './helper';
const HTPublishableKey = 'pk_fe8200189bbdfd44b078bd462b08cb86174aa97c';

class App extends React.Component<{}, AppState> {
    HTTrack: TrackAction;
    constructor() {
        super();
        let shortCode = window.location.pathname.slice(1);
        console.log('Short code', shortCode);
        this.setupTrackingSDK(shortCode);
        this.state = {
            action: null
        };
    }

    render() {
        return this.createTrackingView();
    }

    createTrackingView() {
        let action = this.state.action;
        return (
            <div className="app-container">
                {this.createStatusBar(action)}
                {this.createSummaryContainer(action)}
                {this.createAddressContainer(action)}
                <div className="map-container">
                    <div id="map" />
                    {this.createDriverInfo(action)}
                </div>
            </div>
        );
    }

    createLogo() {
        return (
            <img src={logo} className="logo" alt="logo" />
        );
    }

    createStatusBar(action: IAction | null) {
        if (!action) {
            return null;
        }
        let statusText = action.display.status_text;
        let subStatusText = action.display.sub_status_text;
        return (
            <div className="status-bar">
                {this.createLogo()}
                <div className="status-bar-info-container">
                    <div className="status">{statusText}</div>
                    <div className="substatus">{subStatusText}</div>
                </div>
            </div>
        );
    }

    createSummaryContainer(action: IAction | null) {
        if (!action) {
            return null;
        }
        if (!this.showSummary(action)) {
            return null;
        }
        console.log('Action', action);
        return (
          <div className="summary-container">
              <div className="distance-time-container">
                  <span className="time-container">{this.getTimeDisplay(action)}</span>
                  <b>&bull;</b>
                  <span className="distance-container">{this.getDistanceDisplay(action)}</span>
              </div>
              <div className="date-container">
                  <span className="date">{this.getDateDisplay(action)}</span>
              </div>
          </div>
        );
    }

    createAddressContainer(action: IAction | null) {
        if (!action) {
            return null;
        }
        return (
          <div className="address-container">
              {this.getFromAddress(action)}
              {this.getAddressBorder(action)}
              {this.getToAddress(action)}
          </div>
        );
    }

    getToAddress(action: IAction | null) {
        if (!action) {
            return null;
        }
        let completionTime = action.completed_at ? this.formatTime(new Date(action.completed_at)) : '';
        let completionAddress = action.completed_place ? action.completed_place.address : '';
        let expectedAddress = action.expected_place ? action.expected_place.address : '';
        let toAddress = this.showSummary(action) ? completionAddress : expectedAddress;
        return (
          <div className="to-address-container">
              <div className="dot-container">
                  <div className="dot red" />
              </div>
              <div className="address-bar">
                  <span className="address-value">
                      {toAddress}
                  </span>
                  <span className="address-time">
                      {completionTime}
                  </span>
              </div>
          </div>
        );
    }

    getFromAddress(action: IAction | null) {
        if (!action) {
            return null;
        }
        if (!this.showSummary(action)) {
            return null;
        }
        let startAddress = action.started_place ? action.started_place.address : '';
        let startTime = action.assigned_at ? this.formatTime(new Date(action.assigned_at)) : '';
        return (
          <div className="from-address-container">
              <div className="dot-container">
                  <div className="dot green" />
              </div>
              <div className="address-bar">
                  <span className="address-value">
                      {startAddress}
                  </span>
                  <span className="address-time">
                          {startTime}
                      </span>
              </div>
          </div>
        );
    }

    getAddressBorder(action: IAction | null) {
        if (!this.getFromAddress(action)) {
            return null;
        }
        return (
          <div className="address-border">
              <div className="address-border-vertical" />
          </div>
        );
    }

    formatTime(date: Date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let period = hours < 12 ? 'AM' : 'PM';
        let displayHours = hours > 12 ? hours - 12 : hours;
        return displayHours + ':' + this.pad(minutes, 2) + ' ' + period;
    };

    showSummary(action: IAction | null) {
        if (!action) {
            return false;
        }
        return action.display.show_summary;
    }

    pad(n: number, width: number, z: string = '0') {
        let nString = n + '';
        return nString.length >= width ? n : new Array(width - nString.length + 1).join(z) + n;
    }

    getDistanceDisplay(action: IAction | null) {
        if (!action) {
            return '-';
        }
        let distance = (action.distance / 1000).toFixed(1);
        return `${distance} KMs`;
    }

    getTimeDisplay(action: IAction | null) {
        if (!action) {
            return '-';
        }
        let minutes = '-';
        if (action.completed_at && action.assigned_at) {
            let completionTime = new Date(action.completed_at).getTime();
            let startTime = new Date(action.assigned_at).getTime();
            let duration = completionTime - startTime;
            minutes = Math.floor(duration / (1000 * 60)).toString();
        }
        return `${minutes} MINs`;
    }

    getDateDisplay(action: IAction | null) {
        if (!action) {
            return '-';
        }
        let date = '-';
        if (action.assigned_at) {
            date = new Date(action.assigned_at).toDateString().substr(4);
        }
        return date;
    }

    createDriverInfo(action: IAction | null) {
        if (!action || !action.user) {
            return null;
        }
        let userName = action.user ? action.user.name : '';
        let photo = action.user ? action.user.photo : '';
        let phone = (action.user && action.user.phone) ? `tel:${action.user.phone}` : '';
        const divStyle = {
            backgroundImage: `url(${photo})`
        };
        console.log('Action user', action.user);
        let phoneClass = 'call-button-container';
        phoneClass += !phone ? 'disabled' : '';
        return (
            <div className="driver-info-container">
                <div className="pic" id="pic" style={divStyle} />
                <div className="name">{userName}</div>
                <a className={phoneClass} href={phone}>
                    <i className="fa fa-phone call-button" />
                </a>
            </div>
        );
    }

    setupTrackingSDK(shortCode: string) {
        trackShortCode(shortCode, HTPublishableKey, {
            mapId: 'map',
            bottomPadding: 50,
            onReady: (trackAction: TrackAction) => {
                this.HTTrack = trackAction;
                console.log('Ready track Action', trackAction);
            },
            onActionReady: (action: IAction) => {
                console.log('On Action ready', action);
                this.setState({
                    action: action
                });
                if (this.HTTrack) {
                    this.HTTrack.resetBounds();
                }
            },
            onActionUpdate: (action: IAction) => {
                this.setState({
                    action: action
                });
                console.log('On Action update', action);
            },
            onAccountReady: (subAccount: ISubAccount, action: IAction) => {
                console.log('subAccount', subAccount);
                this.handleDeepLinkRedirect(subAccount, action);
            }
        });
    }

    handleDeepLinkRedirect(subAccount: ISubAccount, action: IAction) {
        let userAgent = getUserAgent();
        let iosDeepLinkUrl = subAccount.account.ios_deeplink_url;
        if (!isRedirectedUrl()
          && checkUserAgent.iOS(userAgent)
          && iosDeepLinkUrl
          && iosDeepLinkUrl !== '' && action.id)  {
            let iosIntent = iosDeepLinkUrl + '?task_id=' + action.id;
            let originalUrl = window.location.protocol + '://' + window.location.host + window.location.pathname;
            window.location.href = iosIntent;
            setTimeout(function() {
                window.location.href = originalUrl + '?redirect=true';
                },
                       5000);
        }
    }

    getQueryStringValue (key: string) {
        return decodeURIComponent(window.location.search.replace(
          new RegExp(
            '^(?:.*[&\\?]'
            + encodeURIComponent(key).replace(/[\.\+\*]/g, '\\$&')
            + '(?:\\=([^&]*))?)?.*$',
            'i'),
          '$1'));
    }

    createExample() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.tsx</code> and save to reload.
                </p>
            </div>
        );
    }
}

interface AppState {
    action: IAction | null;
}

export default App;

import * as React from 'react';
import './App.css';
const logo = require('./logo.png');

import {TrackAction, trackShortCode} from 'ht-webtracking-sdk';
import {IAction} from 'ht-webtracking-sdk/dist/src/model';

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
            }
        });
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

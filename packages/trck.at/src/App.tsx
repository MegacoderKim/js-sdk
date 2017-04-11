import * as React from 'react';
import './App.css';
const logo = require('./logo.png');

import {trackShortCode} from 'ht-webtracking-sdk';

class App extends React.Component<{}, {}> {
    render() {
        const divStyle = {
            backgroundImage: 'url(https://hypertrack-api-v2-prod.s3.amazonaws.com/default_drivers/v2/b4.png)'
        };
        return (
            <div className="app-container">
                <div className="status-bar">
                    <img src={logo} className="logo" alt="logo" />
                    <div className="status-bar-info-container">
                        <div className="status">On the way</div>
                        <div className="substatus">2 mins delayed</div>
                    </div>
                </div>
                <div className="status-bar">
                    <img src={logo} className="logo" alt="logo" />
                    <div className="status-bar-info-container">
                        <div className="status">On the way</div>
                        <div className="substatus">2 mins delayed</div>
                    </div>
                </div>
                <div className="map-container">
                    <div id="map" />
                    <div className="driver-info-container">
                        <div className ="pic" id="pic" style={divStyle} />
                        <div className ="name"> Rishabh Garg </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        let code = 'fR2vtsAl';
        let pk = 'pk_fe8200189bbdfd44b078bd462b08cb86174aa97c';
        let tAction: any;
        trackShortCode(code, pk, {
            mapId: 'map',
            bottomPadding: 50,
            onReady: (trackAction: any) => {
                tAction = trackAction;
                console.log('onReady', trackAction);
            },
            onActionReady: (action: any) => {
                console.log('On Action ready', action);
                if (tAction) {
                    tAction.resetBounds();
                }
            },
            onActionUpdate: (action: any) => {
                // console.log('On Action update', action);
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

export default App;

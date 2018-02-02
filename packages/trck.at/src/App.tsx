import * as React from 'react';
import './App.css';
import InfoCardComponent from './components/InfoCardContainer/InfoCard.component';
import DestinationBar from './components/DestinationBar/DestinationBar.component';
import LoadingContainerComponent from './components/LoadingContainer/LoadingContainer.component';
import { trackShortCode , trackLookupId, trackCollectionId } from 'ht-webtracking';
import {
  IAction, ISubAccount, ISubAccountData,
  ITrackingOptions, ITrackedData
} from 'ht-webtracking';
import { isRedirectedUrl, checkUserAgent, getUserAgent } from './helper';
import * as Utils from './helpers/helper.util';
import * as CustomGMapsStyles from './values/GMaps.styles';

import Slider from 'react-slick';
import { Logger } from './helpers/logger.util';

const HTPublishableKey = 'pk_fe8200189bbdfd44b078bd462b08cb86174aa97c';
const images = {
    logo: require('./logo.png'),
    resetBoundsIcon: require('./assets/reset-bounds.png'),
    destinationIcon: require('./assets/destination-icon.png'),
    phoneIcon: require('./assets/phone-icon.png'),
    leftArrow: require('./assets/left-arrow.png'),
    rightArrow: require('./assets/right-arrow.png')
};
class App extends React.Component<{}, AppState> {
    HTTrackActions: ITrackedData;
    map: google.maps.Map;
    isMapDirty: boolean = false;
    isSliding: boolean = false;
    constructor() {
        super();
        let code = window.location.pathname.slice(1);
        let isLookupId = Utils.getParameterByName('code') === 'lookup';
        let isCollectionId = Utils.getParameterByName('code') === 'collection';
        if (isLookupId) {
            this.setupSDKTracking(code, 'lookupId');
        } else if (isCollectionId) {
            this.setupSDKTracking(code, 'collectionId');
        } else {
            this.setupSDKTracking(code, 'shortCode');
        }
        this.state = {
            currentActionId: null,
            actions: [],
            isExpanded: false
        };
    }

    render() {
        let currentAction = this.getCurrentAction(this.state.actions, this.state.currentActionId);
        return this.createTrackingView(currentAction);
    }

    createTrackingView(action: IAction | null) {
        let actions = this.state.actions;
        let currentActionId = this.state.currentActionId;
        let currentAction = this.getCurrentAction(actions, currentActionId);
        let loadingContainerClass = 'app-loading-container';
        loadingContainerClass += action ? ' hide' : '';
        return (
            <div className="app-container">
                <div className={loadingContainerClass}>
                    <LoadingContainerComponent />
                </div>
                {this.getDestinationBar(currentAction)}
                {this.getResetBoundsContainer(currentAction)}
                <div className="map-container">
                    <div id="map" />
                    {this.getInformationContainerSlider(actions, currentActionId)}
                </div>
            </div>
        );
    }

    onActionIndexUpdate(actions: IAction[], newActionIndex: number) {
        let newCurrentActionId = actions[newActionIndex].id;
        this.setState({
            currentActionId: newCurrentActionId
        });
        this.resetBounds(actions, newCurrentActionId);
    }

    getDestinationBar(action: IAction | null) {
        if (!action || action.display.show_summary) {
          return null;
        }
        return (
          <DestinationBar action={action} />
        );
    }

    getInformationContainerSlider(actions: IAction[], currentActionId: string | null) {
        if (!currentActionId || actions.length === 0) {
            return null;
        }
        let multipleActions = actions.filter((action: IAction) => {
          return !!(action && action.user);
        }).map((action: IAction) => {
            return (
              <div key={action.id} className="app-information-slider-container">
                  {this.getInformationContainer(action)}
              </div>
            );
        });
        let currentActionIndex = actions.findIndex((action: IAction) => {
           return (action.id === currentActionId);
        });
        let settings = {
            dots: false,
            speed: 500,
            initialSlide: currentActionIndex,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            accessibility: false,
            centerMode: true,
            centerPadding: '12px',
            vertical: false,
            afterChange: (index: number) => {
                this.isSliding = false;
                this.onActionIndexUpdate(actions, index);
            },
            beforeChange: (index: number) => {
                this.isSliding = true;
            }
        };
        return (
        <div className="actions-slider-container">
            <Slider {...settings}>
                {multipleActions}
            </Slider>
        </div>
        );
    }

    getInformationContainer(action: IAction | null) {
        if (!action) {
            return null;
        }
        return (
          <InfoCardComponent
            action={action}
            isExpanded={this.state.isExpanded}
            onExpand={() => this.handleOnExpand()}
          />
        );
    }

    getResetBoundsContainer(action: IAction | null) {
        if (!action) {
            return null;
        }
        let containerClass = 'reset-bounds-container';
        containerClass += this.state.isExpanded ? ' expanded' : '';
        containerClass += this.actionHasSummary() ? ' show-summary' : '';
        return (
          <div className={containerClass}>
            <div className={"zoom-control"}>
              <div
                onClick={() => this.changeZoom(1)}
                className={"zoom-action"}>
                <span className={'auto'}>+</span>
              </div>
              <div
                onClick={() => this.changeZoom(0)}
                className={"zoom-action"}>
                <span className={'auto'}>-</span>
              </div>
            </div>
              <img
                src={images.resetBoundsIcon}
                className="reset-bounds-icon"
                alt="reset-bounds"
                onClick={() => this.resetBounds()}
              />
          </div>
        );
    }

    actionHasSummary(actions: IAction[] = this.state.actions) {
        let hasSummaryAction = false;
        for (let i = 0; i < actions.length ; i++) {
          if (actions[i].display.show_summary) {
            hasSummaryAction = true;
            break;
          }
        }
        return hasSummaryAction;
    }

    getGMapsStyle() {
        let mapStyleCode = Utils.getParameterByName('mapStyle');
        let gMapsStyle = null;
        // switch (mapStyleCode) {
        //     case 'pastel':
        //         gMapsStyle = CustomGMapsStyles.pastelTones;
        //         break;
        //     case 'ultralight':
        //         gMapsStyle = CustomGMapsStyles.ultraLightWithLabel;
        //         break;
        //     default:
        //         break;
        // }
        return gMapsStyle;
    }

    getSDKTrackingOptions(): ITrackingOptions {
        let mapOptions = {
          bottomPadding: 90
        };
        if (this.getGMapsStyle()) {
            mapOptions['gMapsStyle'] = this.getGMapsStyle();
        }
        return {
            mapId: 'map',
            mapOptions: mapOptions,
            onReady: (trackActions: ITrackedData, actions: IAction[], map: google.maps.Map) => {
                this.handleOnReady(trackActions, actions, map);
            },
            onUpdate: (trackActions: ITrackedData, actions: IAction[]) => {
                this.handleOnUpdate(trackActions, actions);
            },
            onAccountReady: (subAccountData: ISubAccountData, actions: IAction[]) => {
                if (actions.length === 1) {
                    let action = actions[0];
                    let isDebug = Utils.getParameterByName('d');
                    if (isDebug) {
                        window.location.href = `https://dashboard.hypertrack.com/debug/events;action_id=${action.id}`;
                    } else {
                        if (subAccountData && subAccountData.sub_account) {
                            Logger.log('subAccount', subAccountData.sub_account);
                            this.handleDeepLinkRedirect(subAccountData.sub_account, action);
                        }
                    }
                }
            }
        };
    }

    handleOnReady(trackActions: ITrackedData, actions: IAction[], map: google.maps.Map) {
      this.HTTrackActions = trackActions;
      this.map = map;
      // this.addZoomControl(map);
      this.handleUserMapEvents(map);
      this.handleOnActionsReady(actions);
      actions.forEach((action: IAction) => {
         trackActions[action.id].mapPolyline.setOptions({
           strokeColor: '#df5cc1'
         });
      });
      this.resetBounds();
      Logger.log('On Actions ready', actions);
      Logger.log('Ready track Action', trackActions);
    };

    changeZoom(number: 1 | 0) {
      let zoom = this.map.getZoom();
      zoom = number > 0 ? zoom + 1 : zoom - 1;
      this.map.setZoom(zoom)
    }

    addZoomControl(map: google.maps.Map) {
      map.setOptions(
        {
          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
          }}
      )
    }

    handleOnUpdate(trackActions: ITrackedData, actions: IAction[]) {
      this.HTTrackActions = trackActions;
      this.handleOnActionsUpdate(actions);
      if (!this.isMapDirty) {
        this.resetBounds();
      }
      Logger.log('On Actions update', actions);
      Logger.log('Update track Action', trackActions);
    }

    getCurrentAction(actions: IAction[] = this.state.actions, actionId: string | null = this.state.currentActionId) {
    if (actionId) {
      let currentAction = actions.find((action: IAction) => {
        return (action.id === actionId);
      });
      return currentAction || null;
    }
    return null;
  }

    handleUserMapEvents(map: google.maps.Map) {
        if (map) {
            map.addListener('drag_start', () => {
                this.isMapDirty = true;
            });
            map.addListener('bounds_changed', () => {
                this.isMapDirty = true;
            });
        }
    }

    resetBounds(
      actions: IAction[] = this.state.actions,
      currentActionId: string | null = this.state.currentActionId) {
        if (!currentActionId) {
            return;
        }
        let currentAction = this.getCurrentAction(actions, currentActionId);
        if (currentAction && this.HTTrackActions && this.HTTrackActions[currentAction.id]) {
            let bottomPadding = this.state.isExpanded ? -330 : -90;
            this.HTTrackActions[currentAction.id].resetBounds(bottomPadding);
        }
        setTimeout(
          () => {
            this.isMapDirty = false;
            },
          1000);
    }

    setupSDKTracking(code: string, codeType?: string) {
        let trackingOptions = this.getSDKTrackingOptions();
        switch (codeType) {
            case 'lookupId':
                trackLookupId(code, HTPublishableKey, trackingOptions);
                break;
            case 'collectionId':
                trackCollectionId(code, HTPublishableKey, trackingOptions);
                break;
            default:
                trackShortCode(code, HTPublishableKey, trackingOptions);
        }
    }

    handleOnExpand() {
        if (this.isSliding) {
            return;
        }
        this.setState({
            isExpanded: !this.state.isExpanded
        });
    }

    handleOnActionsReady(actions: IAction[]) {
        let isExpanded = false;
        let currentActionId = actions[0] ? actions[0].id : null;
        let currentAction = this.getCurrentAction(actions, currentActionId);
        if (currentAction && currentAction.display.show_summary) {
            isExpanded = true;
        }
        setTimeout(() => {
            this.resetBounds();
        },         1000);
        this.setState({
            currentActionId: currentActionId,
            actions: actions,
            isExpanded: isExpanded
        });
    }

    handleOnActionsUpdate(actions: IAction[]) {
        let isExpanded = this.state.isExpanded;
        let currentAction = this.getCurrentAction(this.state.actions, this.state.currentActionId);
        let updatedAction = this.getCurrentAction(actions, this.state.currentActionId);
        if (updatedAction && updatedAction.display.show_summary
          && currentAction && !currentAction.display.show_summary) {
            isExpanded = true;
            this.resetBounds()
        }
        this.setState({
            isExpanded: isExpanded,
            actions: actions
        });
    }

    handleDeepLinkRedirect(subAccount: ISubAccount, action: IAction) {
        let userAgent = getUserAgent();
        let iosDeepLinkUrl = subAccount.account.ios_deeplink_url;
        let androidDeepLinkUrl = subAccount.account.android_deeplink_url;
        let actionId = action ? action.id : '';
        let lookupId = action ? action.lookup_id : '';
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
        } else if (!isRedirectedUrl()
            && checkUserAgent.Android(getUserAgent())
            && (checkUserAgent.Chrome(getUserAgent())
                || checkUserAgent.Firefox(getUserAgent())
            )
            && androidDeepLinkUrl
            && androidDeepLinkUrl !== '' && actionId) {
                let queryParams = '?task_id=' + actionId;
                if (lookupId) {
                    queryParams = queryParams + '&order_id=' + lookupId;
                }
                let fallbackUrl = window.location.protocol + '://'
                  + window.location.host + window.location.pathname + '?redirect=true';
                let androidIntent = 'intent:' + queryParams
                  + '#Intent;scheme=' + androidDeepLinkUrl
                  + ';S.browser_fallback_url=' + fallbackUrl + ';end';
                window.location.href = androidIntent;
        }
    }
}

interface AppState {
    currentActionId: string | null;
    actions: IAction[];
    isExpanded: boolean;
}

export default App;

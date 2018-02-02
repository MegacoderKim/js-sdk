import * as React from 'react';
import './DriverDetail.component.css';
import {IAction} from 'ht-webtracking';
import * as Utils from '../../helpers/helper.util';
import ProfileImageComponent from '../ProfileImageContainer/ProfileImage.component';
import CallButtonContainer from '../CallButtonContainer/CallButtonContainer.component';

const images = {
  defaultProfilePic: require('../../assets/default-profile-pic.png')
};

class DriverDetailComponent extends React.Component<DriverDetailProps, {}> {
  constructor() {
    super();
  }

  render() {
    if (!this.props.action) {
      return null;
    }
    return this.createDriverDetailContainer(this.props.action);
  }

  createDriverDetailContainer(action: IAction) {
    if (!action || Utils.isNullOrUndefined(action.user)) {
      return null;
    }
    let containerClass = 'driver-detail-container';
    let customerName = Utils.getCustomerName();
    if (customerName === 't') {
      containerClass += ' gocars';
    }
    containerClass += this.props.isExpanded ? ' expanded' : '';
    return (
      <div className={containerClass}
           onDoubleClick={() => {this.openActionDebuggerOnDashboard(action); }}>
        {this.createDriverPictureContainer(action)}
        {this.createDriverDetailInfo(action)}
      </div>
    );
  }

  createDriverDetailInfo(action: IAction) {
    let customerName = Utils.getCustomerName();
    if (customerName === 't') {
      return this.createUserDetailInfoGoCars(action);
    }
    return (
      <div className="driver-detail-info">
        {this.createDriverUserName(action)}
        {this.createLastUpdatedContainer(action)}
      </div>
    );
  }

  createUserDetailInfoGoCars(action: IAction) {
    return (
      <div className="driver-detail-info-gocars">
        {this.createDriverUserName(action)}
        {this.createVehicleRegGoCarsContainer(action)}
        {this.createLastUpdatedContainer(action)}
      </div>
    );
  }

  createVehicleRegGoCarsContainer(action: IAction) {
    let vehicleReg = action.metadata ? Utils.extractFromActionMetadata(action.metadata, 'vehicle') : '';
    return (
      <div className="driver-vehicle-reg-container-gocars">
        <div className="driver-vehicle-reg-value-gocars">{vehicleReg}</div>
      </div>
    );
  }

  createLastUpdatedContainer(action: IAction) {
    let lastUpdatedDisplayClass = 'driver-detail-last-updated-container';
    lastUpdatedDisplayClass += action.display.show_summary ? ' hide' : '';
    return (
      <div className={lastUpdatedDisplayClass}>
        <div className="driver-detail-last-updated-value">
          {this.getLastUpdatedDisplay(action)}
        </div>
      </div>
    );
  }

  openActionDebuggerOnDashboard(action: IAction) {
    if (!action) {
      return;
    }
    let isDebug = Utils.getParameterByName('debug');
    if (isDebug) {
      let url = `https://dashboard.hypertrack.com/debug/events;action_id=${action.id}`;
      window.open(url, '_blank');
    }
  }

  createDriverUserName(action: IAction) {
    let userName = action.user.name || '';
    // let customerName = Utils.getCustomerName();
    // if (customerName === 't') {
    //   userName = action.metadata ? Utils.extractFromActionMetadata(action.metadata, 'passenger') : '';
    // }
    return (
      <div className="driver-detail-name-container">
        <div className="driver-detail-name-value">{userName}</div>
      </div>
    );
  }

  createDriverPictureContainer(action: IAction) {
    let photo = action.user.photo || images.defaultProfilePic;
    let customerName = Utils.getCustomerName();
    if (customerName === 't') {
      return (
        <div className="driver-detail-call-button-container">
          <CallButtonContainer action={action} />
        </div>
      );
    }
    // const divStyle = {
    //   backgroundImage: `url(${photo})`
    // };
    return (
      <div className="driver-detail-profile-picture-container">
        <ProfileImageComponent source={photo} />
      </div>
    );
    // return (
    //   <div className="driver-detail-picture-container">
    //     <div className="driver-detail-picture" id="pic" style={divStyle} />
    //   </div>
    // );
  }

  getLastUpdatedDisplay(action: IAction) {
    if (action.user && action.user.last_heartbeat_at && !action.display.show_summary) {
      let currentTime = new Date();
      let heartBeatTime = new Date(action.user.last_heartbeat_at);
      let secondsAgo = (currentTime.getTime() - heartBeatTime.getTime()) / 1000;
      let minutesAgo = `${Utils.secondsToMinutes(secondsAgo)} min ago`;
      if (secondsAgo < 60) {
        minutesAgo = 'few seconds ago';
      }
      return `Last updated ${minutesAgo}`;
    }
    return '';
  }
}

interface DriverDetailProps {
  action: IAction;
  isExpanded: boolean;
}

export default DriverDetailComponent;

import * as React from 'react';
import './StatusDetail.component.css';
import {IAction} from 'ht-webtracking';
import * as Utils from '../../helpers/helper.util';
import CallButtonContainer from '../CallButtonContainer/CallButtonContainer.component';
import ProfileImageComponent from '../ProfileImageContainer/ProfileImage.component';

const images = {
  phoneIcon: require('../../assets/phone-icon.png'),
  expandIcon: require('../../assets/expand-icon.png'),
  defaultProfilePic: require('../../assets/default-profile-pic.png')
};
class StatusDetailContainer extends React.Component<StatusDetailProps, {}> {
  constructor() {
    super();
  }

  render() {
    let action: (IAction | null) = this.props.action;
    if (!action) {
      return null;
    }
    return this.createStatusDetailContainer(action);
  }

  createStatusDetailContainer(action: IAction) {
    if (!action || !action.user) {
      return null;
    }
    let expandIconClass = 'status-container-expand-icon';
    expandIconClass += this.props.isExpanded ? ' expanded' : '';
    let statusContainerClass = 'status-container';
    statusContainerClass += this.props.isExpanded ? ' expanded' : '';
    return (
      <div className={statusContainerClass} onClick={() => this.handleOnExpand()}>
        {this.createTimeElapsedContainer(action)}
        {this.createStatusValues(action)}
        <div className="status-container-expand-icon-container">
          <img src={images.expandIcon} className={expandIconClass}
               alt="Expand" />
        </div>
      </div>
    );
  }

  createTimeElapsedContainer(action: IAction) {
    let customerName = Utils.getCustomerName();
    if (customerName === 't' || customerName === 't') {
      let photo = action.account
        ? action.account.logo
        : action.user.photo;
      return (
        <div className="status-detail-profile-picture-container">
          <ProfileImageComponent source={photo} />
        </div>
      );
    }
    return <CallButtonContainer action={action} />;
  }

  createStatusValues(action: IAction) {
    let customerName = Utils.getCustomerName();
    if (customerName === 't') {
      return this.createStatusValuesForGoCars(action);
    }
    return (
      <div className="status-container-status-values">
        <div className="status-container-label">{this.getStatusText(action)}</div>
        <div className="status-container-eta-distance-values">
          <div className="status-container-eta-value">{this.getDurationDisplay(action)}</div>
          <div className="status-container-distance-value">({this.getDistanceDisplay(action)})</div>
        </div>
      </div>
    );
  }

  createStatusValuesForGoCars(action: IAction) {
    let actionHeadline = (action.metadata)
      ? Utils.extractFromActionMetadata(action.metadata, 'headline') : '';
    return (
      <div className="status-container-status-values">
        <div className="status-container-gocars-header">{actionHeadline}</div>
        <div className="status-container-gocars-label">{this.getStatusText(action)}</div>
        <div className="status-container-eta-distance-values">
          <div className="status-container-eta-value">{this.getDurationDisplay(action)}</div>
          <div className="status-container-distance-value">({this.getDistanceDisplay(action)})</div>
        </div>
      </div>
    );
  }

  getStatusText(action: IAction): string {
    return action.display.status_text;
  }

  handleOnExpand() {
    this.props.onExpand();
  }

  getDistanceDisplay(action: IAction) {
    if (action.display.show_summary) {
      if (Utils.isNullOrUndefined(action.distance)) {
        return '--';
      }
      return this.getDistanceString(action, action.distance);
    }
    if (Utils.isNullOrUndefined(action.display.distance_remaining || action.status == 'arrived')) {
      return '--';
    }
    return this.getDistanceString(action, action.display.distance_remaining as number);
  }

  getDistanceString(action: IAction, meters: number) {
    if (action.display.distance_unit === 'km') {
      let distanceInKms = Utils.metersToKm(meters);
      return `${distanceInKms} km`;
    }
    let distanceInMiles = Utils.metersToMiles(meters);
    return `${distanceInMiles} mi`;
  }

  getDurationDisplay(action: IAction) {
    if (action.display.show_summary) {
      if (Utils.isNullOrUndefined(action.display.duration_elapsed)) {
        return '--';
      }
      let durationElapsed = Utils.secondsToMinutes(action.display.duration_elapsed);
      return `${durationElapsed} min`;
    }
    if (Utils.isNullOrUndefined(action.display.duration_remaining) || action.status == 'arrived') {
      return '--';
    }
    let durationRemaining = Utils.secondsToMinutes(action.display.duration_remaining);
    let durationRemainingRoundedUp = Math.ceil(+durationRemaining);
    return `ETA ${durationRemainingRoundedUp} min`;
  }

  getActionCompletePercentage(action: IAction) {
    if (action.display.show_summary) {
      return 100;
    }
    let distanceCovered = action.distance || 0;
    let distanceRemaining = action.display.distance_remaining || 0;
    let totalDistance = distanceCovered + distanceRemaining;
    if (totalDistance === 0) {
      return 0;
    }
    let distancePercentage = (distanceCovered / totalDistance) * 100;
    return Math.round(distancePercentage);
  }

  getTimeElapsedCSS(percentage: number) {
    if (percentage > 100) {
      percentage = 100;
    }
    let deg = percentage * 3.6;
    let css = `linear-gradient(${(deg - 90)}deg, transparent 50%, #DF5CC1 50%),\
        linear-gradient(90deg, #D7D7D7 50%, transparent 50%)`;
    if (deg <= 180) {
      css = `linear-gradient(${(90 + deg)}deg, transparent 50%, #D7D7D7 50%),\
            linear-gradient(90deg, #D7D7D7 50%, transparent 50%)`;
    }
    return {
      backgroundImage: css,
    };
  }
}

interface StatusDetailProps {
  action: IAction | null;
  isExpanded: boolean;
  onExpand: () => void;
}

export default StatusDetailContainer;

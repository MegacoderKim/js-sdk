import * as React from 'react';
import './SummaryDetail.component.css';
import {IAction} from 'ht-webtracking';
import * as Utils from '../../helpers/helper.util';

class SummaryDetailComponent extends React.Component<SummaryDetailProps, {}> {
  constructor() {
    super();
  }

  render() {
    let action: (IAction | null) = this.props.action;
    if (!action) {
      return null;
    }
    return this.createSummaryDetailContainer(action);
  }

  createSummaryDetailContainer(action: IAction) {
    if (!action || !action.user) {
      return null;
    }
    let summaryContainerClass = 'summary-detail-container';
    summaryContainerClass += this.props.isExpanded ? ' expanded' : '';
    return (
      <div className={summaryContainerClass}>
        <div className="summary-detail-elapsed-container">
          <div className="summary-detail-elapsed-time-value">{this.getTimeElapsed(action)}</div>
          <div className="summary-detail-elapsed-time-label">Elapsed</div>
        </div>
        <div className="summary-detail-travelled-container">
          <div className="summary-detail-travelled-time-value">{this.getDistanceTravelledString(action)}</div>
          <div className="summary-detail-travelled-time-label">Travelled</div>
        </div>
        {this.createSpeedContainer(action)}
        {this.createBatteryDetailContainer(action)}
      </div>
    );
  }

  createSpeedContainer(action: IAction) {
    let customerName = Utils.getCustomerName();
    if (customerName === 't') {
      return this.createActionDateContainer(action);
    }
    return (
      <div className="summary-detail-speed-container">
        <div className="summary-detail-speed-value">{this.getSpeed(action)}</div>
        <div className="summary-detail-elapsed-time-label">Speed</div>
      </div>
    );
  }

  createActionDateContainer(action: IAction) {
    let actionDate = (action && action.created_at) ? action.created_at : '';
    let dateValue = '';
    if (actionDate) {
      let date = new Date(actionDate);
      dateValue = `${Utils.getMonthName(date.getMonth())} ${date.getDate()}`;
    }
    return (
      <div className="summary-detail-speed-container summary-detail-action-date-container-gocars">
        <div className="summary-detail-speed-value">{dateValue}</div>
        <div className="summary-detail-elapsed-time-label">Date</div>
      </div>
    );
  }

  createBatteryDetailContainer(action: IAction) {
    let customerName = Utils.getCustomerName();
    if (customerName === 't') {
      return null;
    }
    return (
      <div className="summary-detail-battery-container">
        <div className="summary-detail-battery-value">{this.getBattery(action)}</div>
        <div className="summary-detail-battery-label">Battery</div>
      </div>
    );
  }

  getTimeElapsed(action: IAction) {
    if (!action || Utils.isNullOrUndefined(action.display.duration_elapsed)) {
      return '--';
    }
    return Utils.secondsToHms(action.display.duration_elapsed);
  }

  getDistanceTravelledString(action: IAction) {
    if (!action || Utils.isNullOrUndefined(action.distance)) {
      return '--';
    }
    let distanceTravelled = action.distance;
    if (action.display.distance_unit === 'km') {
      let distanceKms = Utils.metersToKm(distanceTravelled);
      return `${distanceKms} km`;
    }
    let distanceMiles = Utils.metersToMiles(distanceTravelled);
    return `${distanceMiles} mi`;
  }

  getSpeed(action: IAction) {
    if (!action
      || Utils.isNullOrUndefined(action.user)
      || Utils.isNullOrUndefined(action.user.display.speed)) {
      return '--';
    }
    return this.getSpeedString(action, action.user.display.speed);
  }

  getSpeedString(action: IAction, metersPerSecond: number) {
    if (action.display.distance_unit === 'km') {
      let speedInMph = Utils.mpsToKPH(metersPerSecond);
      return `${speedInMph} kmph`;
    }
    let speedInMph = Utils.mpsToMPH(metersPerSecond);
    return `${speedInMph} mph`;
  }

  getBattery(action: IAction) {
    if (!action
      || Utils.isNullOrUndefined(action.user)
      || Utils.isNullOrUndefined(action.user.display.battery)) {
      return '--';
    }
    let batteryValue = action.user.display.battery.toFixed(0);
    return `${batteryValue}%`;
  }
}

interface SummaryDetailProps {
  action: IAction | null;
  isExpanded: boolean;
}

export default SummaryDetailComponent;

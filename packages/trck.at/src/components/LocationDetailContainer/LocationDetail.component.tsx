import * as React from 'react';
import './LocationDetail.component.css';
import {IAction} from 'ht-webtracking';
import * as Utils from '../../helpers/helper.util';

const images = {
  startAddressIcon: require('../../assets/start-address-icon.png'),
  endAddressIcon: require('../../assets/end-address-icon.png')
};

class LocationDetailComponent extends React.Component<LocationDetailProps, {}> {
  constructor() {
    super();
  }

  render() {
    let action: (IAction | null) = this.props.action;
    if (!action) {
      return null;
    }
    return this.createLocationSummaryContainer(action);
  }

  createLocationSummaryContainer(action: IAction) {
    if (!action || !action.user) {
      return null;
    }
    let containerClass = 'location-summary-container';
    containerClass += this.props.isExpanded ? ' expanded' : '';
    return (
      <div className={containerClass}>
        <div className="location-summary-representation-container">
          <div className="location-summary-start-representation">
            <img src={images.startAddressIcon} className="location-summary-start-address-icon"
                 alt="Start Address" />
          </div>
          <div className="location-summary-representation-connector">
            <div className="location-summary-representation-border" />
          </div>
          <div className="location-summary-end-representation">
            <img src={images.endAddressIcon} className="location-summary-end-address-icon"
                 alt="End Address" />
          </div>
        </div>
        <div className="location-summary-value-container">
          <div className="location-summary-start-container">
            <div className="location-summary-start-time">
              {this.getAssignedTime(action)}
            </div>
            <div className="location-summary-start-address">
              <div className="location-summary-start-address-value">
                {this.getStartAddress(action)}
              </div>
            </div>
          </div>
          <div className="location-summary-end-container">
            <div className="location-summary-end-time">
              {this.getEndTime(action)}
            </div>
            <div className="location-summary-end-address">
              <div className="location-summary-end-address-value">
                {this.getEndAddress(action)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  getStartAddress(action: IAction): string {
    let startAddress = '--';
    if (action.started_place && action.started_place.address) {
      startAddress = action.started_place.address;
    }
    return startAddress;
  }

  getAssignedTime(action: IAction): string {
    let assignedTime = '--';
    if (action.assigned_at) {
      let assignedAt = new Date(action.assigned_at);
      let startTimeString = assignedAt.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
      let startDateString: string = `${Utils.getMonthName(assignedAt.getMonth())} ${assignedAt.getDate()}`;
      assignedTime = `${startTimeString}, ${startDateString}`;
    }
    return assignedTime;
  }

  getEndAddress(action: IAction): string {
    let endAddress = '--';
    if (action.completed_place && action.completed_place.address) {
      endAddress = action.completed_place.address;
    }
    return endAddress;
  }

  getEndTime(action: IAction): string {
    let endTime = '--';
    if (action.ended_at) {
      let endedAt = new Date(action.ended_at);
      let endDateString: string = `${Utils.getMonthName(endedAt.getMonth())} ${endedAt.getDate()}`;
      let endTimeString = endedAt.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
      endTime = `${endTimeString}, ${endDateString}`;
    }
    return endTime;
  }
}

interface LocationDetailProps {
  action: IAction | null;
  isExpanded: boolean;
}

export default LocationDetailComponent;

import * as React from 'react';
import './CallButtonContainer.component.css';
import {IAction} from 'ht-webtracking';

const images = {
  phoneIcon: require('../../assets/phone-icon.png')
};
class CallButtonContainer extends React.Component<CallButtonContainerProps, {}> {
  constructor() {
    super();
  }

  render() {
    let action: (IAction | null) = this.props.action;
    if (!action) {
      return null;
    }
    return this.createCallButtonContainer(action);
  }

  createCallButtonContainer(action: IAction) {
    if (!action || !action.user) {
      return null;
    }
    return this.createTimeElapsedContainer(action);
  }

  createTimeElapsedContainer(action: IAction) {
    if (!action.user.phone) {
      return null;
    }
    let phone = `tel:${action.user.phone || ''}`;
    let phoneClass = 'call-button-component-call-button-container';
    let completedPercent = this.getActionCompletePercentage(action);
    phoneClass += !phone ? 'disabled' : '';
    return (
      <div className="call-button-component-time-elapsed-container">
        <div className="call-button-component-call-button">
          <div className="call-button-component-circle-active-border" style={this.getTimeElapsedCSS(completedPercent)}>
            <div className="call-button-component-call-button-circle">
              <a className={phoneClass} href={phone}>
                <img src={images.phoneIcon} className="call-button-component-phone-icon"
                     alt="Phone" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
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

interface CallButtonContainerProps {
  action: IAction | null;
}

export default CallButtonContainer;

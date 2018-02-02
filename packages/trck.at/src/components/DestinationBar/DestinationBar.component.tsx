import * as React from 'react';
import './DestinationBar.css';
import { IAction } from 'ht-webtracking';
import * as Utils from '../../helpers/helper.util';
const images = {
  destinationIcon: require('../../assets/destination-icon.png'),
};
class DestinationBar extends React.Component<DestinationBarProps, {}> {
  constructor() {
    super();
  }

  render() {
    let action: (IAction | null) = this.props.action;
    if (!action) {
      return null;
    }
    return this.createDestinationBar(action);
  }

  createDestinationBar(action: IAction) {
    if (!this.getDestinationAddress(action)) {
     return null;
    }
    return (
      <div className="destination-bar-container">
        <div className="destination-bar-values-container">
          <div className="destination-bar-label"> Destination </div>
          <div className="destination-bar-value-container">
            <div className="destination-bar-value">
              {this.getDestinationAddress(action)}
            </div>
          </div>
        </div>
        {this.createDestinationBarIcon()}
      </div>
    );
  }

  createDestinationBarIcon() {
    let customerName = Utils.getCustomerName();
    if (customerName === 't') {
      return null;
    }
    return (
      <div className="destination-bar-icon-container">
        <img
          src={images.destinationIcon}
          className="destination-bar-icon"
          alt="Destination"
        />
      </div>
    );
  }

  getDestinationAddress(action: IAction| null): string {
    if (!action || !action.expected_place) {
      return '';
    }
    let placeName = action.expected_place.name || '';
    let placeAddress = action.expected_place.address || '';
    let destinationAddress = '';
    if (placeName && placeAddress) {
      destinationAddress = `${placeName}, ${placeAddress}`;
    } else if (placeName && !placeAddress) {
      destinationAddress = placeName;
    } else if (placeAddress && !placeName) {
      destinationAddress = placeAddress;
    }
    return destinationAddress;
  }
}

interface DestinationBarProps {
  action: IAction | null;
}

export default DestinationBar;

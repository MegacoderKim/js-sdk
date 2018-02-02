import * as React from 'react';
import DriverDetailComponent from '../DriverDetailContainer/DriverDetail.component';
import StatusDetailContainer from '../StatusDetailContainer/StatusDetail.component';
import SummaryDetailComponent from '../SummaryDetailContainer/SummaryDetail.component';
import LocationDetailComponent from '../LocationDetailContainer/LocationDetail.component';
import {IAction} from 'ht-webtracking';

class InfoCardComponent extends React.Component<InfoCardProps, {}> {
  constructor() {
    super();
  }

  render() {
    let action: (IAction | null) = this.props.action;
    if (!action) {
      return null;
    }
    return this.createInfoCardContainer(action);
  }

  createInfoCardContainer(action: IAction) {
    if (!action || !action.user) {
      return null;
    }
    if (action.display.show_summary) {
      return (
        <div className="app-information-detail-container" key={action.id}>
          {this.getStatusDetailContainer(action)}
          {this.getLocationDetailContainer(action)}
          {this.getDriverDetailContainer(action)}
        </div>
      );
    }
    return (
      <div className="app-information-detail-container" key={action.id}>
        {this.getStatusDetailContainer(action)}
        {this.getSummaryDetailContainer(action)}
        {this.getDriverDetailContainer(action)}
      </div>
    );
  }

  getStatusDetailContainer(action: IAction) {
    return (
      <StatusDetailContainer
        action={action}
        isExpanded={this.props.isExpanded}
        onExpand={() => this.handleOnExpand()} />
    );
  }

  handleOnExpand() {
    this.props.onExpand();
  }

  getSummaryDetailContainer(action: IAction) {
    return (
      <SummaryDetailComponent
        action={action}
        isExpanded={this.props.isExpanded} />
    );
  }

  getLocationDetailContainer(action: IAction) {
    return (
      <LocationDetailComponent
        action={action}
        isExpanded={this.props.isExpanded} />
    );
  }

  getDriverDetailContainer(action: IAction) {
    return (
      <DriverDetailComponent
        action={action}
        isExpanded={this.props.isExpanded} />
    );
  }
}

interface InfoCardProps {
  action: IAction | null;
  isExpanded: boolean;
  onExpand: () => void;
}

export default InfoCardComponent;

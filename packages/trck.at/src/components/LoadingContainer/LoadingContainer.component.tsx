import * as React from 'react';
import './LoadingContainer.component.css';

class LoadingContainerComponent extends React.Component<{}, {}> {
  constructor() {
    super();
  }

  render() {
    return this.createLoadingDisplay();
  }

  createLoadingDisplay() {
    return (
      <div className="loading-container">
        <div className="loading-section">
          <div className="loading-section-ht-logo-pale" />
          <div className="loading-section-ht-logo" />
        </div>
      </div>
    );
  }
}

export default LoadingContainerComponent;

import { Injectable } from '@angular/core';

@Injectable()
export class TrackingConfigService implements ITrackingConfig {

  hideSummary = false;
  hideStatus = false;
  hideExpectedPolyline = false;
  hideTrailingPolyline = false;

  constructor() {
    
  };

  set(config: Partial<ITrackingConfig>): void {
    this.hideSummary = config.hideSummary || this.hideSummary;
    this.hideStatus = config.hideStatus || this.hideStatus;
    this.hideExpectedPolyline = config.hideExpectedPolyline || this.hideExpectedPolyline;
    this.hideTrailingPolyline = config.hideTrailingPolyline || this.hideTrailingPolyline;
  }

}

export interface ITrackingConfig {
  hideSummary: boolean,
  hideStatus: boolean,
  hideExpectedPolyline: boolean,
  hideTrailingPolyline: boolean,
}

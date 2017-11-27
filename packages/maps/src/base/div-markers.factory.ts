import {DivMarkerDataConfig, StyleObj} from "../interfaces";


export class DivMarkersBase implements DivMarkerDataConfig<any>, DivMarkersFactoryConfig{
  // styleObj: StyleObj;
  constructor(public renderConfig, public styleObj) {

  }

  getPosition(data) {
    return this.renderConfig.getPosition(data)
  }

  getInfoContent(data) {
    return this.renderConfig.getInfoContent(data)
  }

  getDivContent(data) {
    return this.renderConfig.getDivContent(data);
  }
}

export interface DivMarkersFactoryConfig {
  renderConfig: DivMarkerDataConfig<any>,
  styleObj: StyleObj
}
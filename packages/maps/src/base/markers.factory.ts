import { MarkerDataConfig, StyleObj } from "../interfaces";

export class MarkersBase
  implements MarkerDataConfig<any>, MarkersFactoryConfig {
  // styleObj: StyleObj;
  constructor(public renderConfig, public styleObj: StyleObj, public name?) {}

  getPosition(data) {
    return this.renderConfig.getPosition(data);
  }

  getInfoContent(data) {
    return this.renderConfig.getInfoContent(data);
  }
}

export interface MarkersFactoryConfig {
  renderConfig: MarkerDataConfig<any>;
  styleObj: StyleObj;
}

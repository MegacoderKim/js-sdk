import { MarkerDataConfig, StyleFunct } from "../interfaces";

export class MarkersBase
  implements MarkerDataConfig<any>, MarkersFactoryConfig {
  // styleFunct: StyleFunct;
  constructor(public renderConfig, public styleFunct: StyleFunct, public name?) {}

  getPosition(data) {
    return this.renderConfig.getPosition(data);
  }

  getInfoContent(data) {
    return this.renderConfig.getInfoContent(data);
  }
}

export interface MarkersFactoryConfig {
  renderConfig: MarkerDataConfig<any>;
  styleFunct: StyleFunct;
}

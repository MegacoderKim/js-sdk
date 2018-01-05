import { DivMarkerDataConfig, StyleFunct } from "../interfaces";

export class DivMarkersBase
  implements DivMarkerDataConfig<any>, DivMarkersFactoryConfig {
  // styleFunct: StyleFunct;
  constructor(public renderConfig, public styleFunct) {}

  getPosition(data) {
    return this.renderConfig.getPosition(data);
  }

  getInfoContent(data) {
    return this.renderConfig.getInfoContent(data);
  }

  getDivContent(data) {
    return this.renderConfig.getDivContent(data);
  }
}

export interface DivMarkersFactoryConfig {
  renderConfig: DivMarkerDataConfig<any>;
  styleFunct: StyleFunct;
}

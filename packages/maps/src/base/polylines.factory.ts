import { PolylineDataConfig, StyleFunct } from "../interfaces";

export class PolylinesBase
  implements PolylinesFactoryConfig, PolylineDataConfig<any> {
  // styleFunct: StyleFunct;
  constructor(public renderConfig: PolylineDataConfig<any>, public styleFunct) {}

  getEncodedPath(data) {
    return this.renderConfig.getEncodedPath(data);
  }

  getEncodedPositionTime(data) {
    return this.renderConfig.getEncodedPositionTime(data);
  }
}

export interface PolylinesFactoryConfig {
  renderConfig: PolylineDataConfig<any>;
  styleFunct: StyleFunct;
}

import { PolylineDataConfig, StyleObj} from "../interfaces";


export class PolylinesBase implements PolylinesFactoryConfig, PolylineDataConfig<any>{
  // styleObj: StyleObj;
  constructor(public renderConfig: PolylineDataConfig<any>, public styleObj) {

  }

  getEncodedPath(data) {
    return this.renderConfig.getEncodedPath(data)
  }

  getEncodedPositionTime(data) {
    return this.renderConfig.getEncodedPositionTime(data)
  }
}

export interface PolylinesFactoryConfig {
  renderConfig: PolylineDataConfig<any>,
  styleObj: StyleObj
}
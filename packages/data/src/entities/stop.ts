import { IPlaceline } from "ht-models";

export class HtStop {
  constructor(public data?: IPlaceline) {}

  getPosition() {
    let pos = null;
    if (this.data.place && this.data.place.location.coordinates) {
      pos = this.data.place.location.coordinates;
      return { lat: pos[1], lng: pos[0] };
    } else {
      return null;
    }
  }
}

export const htStop = (action?: IPlaceline) => new HtStop(action);

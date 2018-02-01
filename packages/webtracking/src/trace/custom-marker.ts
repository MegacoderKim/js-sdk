import {Richmarker} from "./richmarker";
declare const RichMarkerPosition: any;

export class CustomRichMarker {
  marker;

  constructor(content?: string) {
    this.marker = Richmarker({
      flat: true
    }, 'MIDDLE');
    this.setMarkerDiv(content);
  }

  render(position, map, content?: string) {
    if (map && position) {
      this.setPosition(position);
      this.setMarkerDiv(content);
      this.marker.setMap(map);
    }
  }

  setMap(map) {
    if (map) {
      this.marker.setMap(map);
    }
  }

  setPosition(position) {
    this.marker.setPosition(position);
  }

  setMarkerDiv(content: string) {
    if (content) {
      this.marker.setContent(content);
    }
  }

  getMap() {
    return this.marker.getMap()
  }

  clear() {
    this.marker.setMap(null)
  }

  getPosition() {
    return this.marker.getPosition()
  }
}
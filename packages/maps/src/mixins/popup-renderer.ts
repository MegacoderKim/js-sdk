import {MapService} from "../map-service";
import {Entities, Entity} from "../entities/interfaces";
import {HtPosition} from "ht-data";
import {Constructor} from "../interfaces";

export class PopupRenderer {
  popup;
  getStyle: (styleType?) => object;
  entities: Entities<any>;
  getPosition: (data) => HtPosition;
  getInfoContent: (data) => string;
  // setMap: (item, map) => void;

  addPopup() {
    this.popup = MapService.mapUtils.getPopup(this.getStyle('popup'))
  }

  setPopup(id: string | null) {
    if (id && this.entities[id]) {
      let {data} = this.entities[id];
      let popup = this.popup;
      let map = MapService.map;
      MapService.mapUtils.openPopupPosition(this.getPosition(data), map, this.getInfoContent(data), popup);
    } else {
      MapService.mapUtils.setMap(this.popup, null)
    }
  };

  onMouseEnter(entity: Entity<any>) {
    let id = entity.data.id;
    this.setPopup(id);

  };

  onMouseLeave(entity: Entity<any>) {
    this.popup && MapService.mapUtils.setMap(this.popup, null)
  }
}
export function PopupMixin <TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    popup;
    getStyle: (styleType?) => object;
    entities: Entities<any>;
    getPosition: (data) => HtPosition;
    getInfoContent: (data) => string;

    constructor(...arg: any[]) {
      super(...arg);
      this.addPopup()
    }
    addPopup() {
      this.popup = MapService.mapUtils.getPopup(this.getStyle('popup'))
    }

    setPopup(id: string | null) {
      if (id && this.entities[id]) {
        let {data} = this.entities[id];
        let popup = this.popup;
        let map = MapService.map;
        MapService.mapUtils.openPopupPosition(this.getPosition(data), map, this.getInfoContent(data), popup);
      } else {
        MapService.mapUtils.setMap(this.popup, null)
      }
    };

    onMouseEnter(entity: Entity<any>) {
      let id = entity.data.id;
      this.setPopup(id);

    };

    onMouseLeave(entity: Entity<any>) {
      this.popup && MapService.mapUtils.setMap(this.popup, null)
    }
  }
}
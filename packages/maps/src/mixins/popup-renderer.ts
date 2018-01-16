import { GlobalMap } from "../global/map-service";
import { HtPosition } from "ht-data";
import { Constructor, Entities, Entity } from "../interfaces";

export interface PopupBase {
  getStyle: (styleType?, fallbackStyle?) => object;
  entities: Entities<any>;
  getPosition: (data) => HtPosition;
  getInfoContent: (data) => string;
}

export function PopupMixin<TBase extends Constructor<PopupBase>>(Base: TBase) {
  return class extends Base {
    popup;
    defaultPopupStyle = {
      disableAutoPan: true,
      // pixelOffset: new google.maps.Size(0, -35)
    };
    constructor(...arg: any[]) {
      super(...arg);
      this.addPopup();
    }

    addPopup() {
      this.popup = GlobalMap.mapUtils.getPopup(
        this.getStyle("popup", this.defaultPopupStyle)
      );
    }

    setPopup(id: string | null) {
      if (id && this.entities[id]) {
        let { data } = this.entities[id];
        let popup = this.popup;
        let map = GlobalMap.map;
        GlobalMap.mapUtils.openPopupPosition(
          this.getPosition(data),
          map,
          this.getInfoContent(data),
          popup
        );
      } else {
        GlobalMap.mapUtils.clearItem(this.popup);
      }
    }

    onMouseEnter(entity: Entity<any>) {
      let id = entity.data.id;
      this.setPopup(id);
    }

    onMouseLeave(entity: Entity<any>) {
      this.popup && GlobalMap.mapUtils.clearItem(this.popup);
    }
  };
}

// export class PopupRenderer {
//   popup;
//   getStyle: (styleType?) => object;
//   entities: Entities<any>;
//   getPosition: (data) => HtPosition;
//   getInfoContent: (data) => string;
//   // setMap: (item, map) => void;
//   defaultPopupStyle =  {
//     disableAutoPan: true,
//     pixelOffset: new google.maps.Size(0, -35)
//   };
//
//   addPopup() {
//     this.popup = GlobalMap.mapUtils.getPopup(this.getStyle('popup'))
//   }
//
//   setPopup(id: string | null) {
//     if (id && this.entities[id]) {
//       let {data} = this.entities[id];
//       let popup = this.popup;
//       let map = GlobalMap.map;
//       GlobalMap.mapUtils.openPopupPosition(this.getPosition(data), map, this.getInfoContent(data), popup);
//     } else {
//       GlobalMap.mapUtils.setMap(this.popup, null)
//     }
//   };
//
//   onMouseEnter(entity: Entity<any>) {
//     let id = entity.data.id;
//     this.setPopup(id);
//
//   };
//
//   onMouseLeave(entity: Entity<any>) {
//     this.popup && GlobalMap.mapUtils.setMap(this.popup, null)
//   }
// }

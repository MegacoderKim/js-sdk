import {MapService} from "../global/map-service";
import {HtPosition} from "ht-data";
import {Constructor, Entities, Entity} from "../interfaces";


export function PopupMixin <TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    popup;
    getStyle: (styleType?, fallbackStyle?) => object;
    entities: Entities<any>;
    getPosition: (data) => HtPosition;
    getInfoContent: (data) => string;
    defaultPopupStyle =  {
      disableAutoPan: true,
      pixelOffset: new google.maps.Size(0, -35)
    };
    constructor(...arg: any[]) {
      super(...arg);
      this.addPopup()
    }
    addPopup() {
      this.popup = MapService.mapUtils.getPopup(this.getStyle('popup', this.defaultPopupStyle))
    }

    setPopup(id: string | null) {
      if (id && this.entities[id]) {
        let {data} = this.entities[id];
        let popup = this.popup;
        let map = MapService.map;
        MapService.mapUtils.openPopupPosition(this.getPosition(data), map, this.getInfoContent(data), popup);
      } else {
        MapService.mapUtils.clearItem(this.popup)
      }
    };

    onMouseEnter(entity: Entity<any>) {
      let id = entity.data.id;
      this.setPopup(id);

    };

    onMouseLeave(entity: Entity<any>) {
      this.popup && MapService.mapUtils.clearItem(this.popup)
    }
  }
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
//     this.popup = MapService.mapUtils.getPopup(this.getStyle('popup'))
//   }
//
//   setPopup(id: string | null) {
//     if (id && this.entities[id]) {
//       let {data} = this.entities[id];
//       let popup = this.popup;
//       let map = MapService.map;
//       MapService.mapUtils.openPopupPosition(this.getPosition(data), map, this.getInfoContent(data), popup);
//     } else {
//       MapService.mapUtils.setMap(this.popup, null)
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
//     this.popup && MapService.mapUtils.setMap(this.popup, null)
//   }
// }
import {Constructor, Entity} from "../interfaces";
import {MapInstance} from "../map-utils/map-instance";
import {TimeAwareAnimation, IPathBearing} from "time-aware-polyline";
import {HtPosition} from "ht-models";

export interface IAnimationBase {
  animation?: TimeAwareAnimation;
  getEntity(): Entity<any>
  // mapInstance: MapInstance
  // getTimeAwarePolyline: (data) => string,
  // update(entity): void;
  // getDivContent(bearing): string;
  update(entity, pathBearing: IPathBearing): void;
// getStyle: (styleType?) => object;
}

export function AnimationMixin<TBase extends Constructor<IAnimationBase>>(Base: TBase) {
  return class extends Base {
    // bearing: number = 0;
    // item;

    setTimeAwareAnimation (animation: TimeAwareAnimation) {
      this.animation = animation || this.animation;
      this.animation.updateEvent.subscribe('update', ({path, bearing}) => {
        let entity = this.getEntity();
        if(entity) this.update(entity, {path, bearing})
      });
    }


  };
}

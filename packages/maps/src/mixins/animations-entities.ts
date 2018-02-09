import {Constructor, Entity} from "../interfaces";
import {IPathBearingTime} from "ht-models";
import {TimeAwareAnimation} from "time-aware-polyline";
import {Subscription} from "rxjs/Subscription";

export interface IAnimationsEntitiesBase {
  getEntity(id?): Entity<any>,
  getTimeAwarePolyline?(data): string;
  clearItem(entity): void;
  update(entity, pathBearing: IPathBearingTime): void;
}

export function AnimationsEntitiesMixin<TBase extends Constructor<IAnimationsEntitiesBase>>(Base: TBase) {
  return class extends Base {
    // bearing: number = 0;
    // item;
    animationEntities: AnimationsEntities;
    toNotTraceItem = false;
    subs: {
      [id: string]: any
    } = {};

    setTimeAwareAnimationEntity (animationEntity?: AnimationsEntities) {
      this.animationEntities = animationEntity || new AnimationsEntities();
      // this.animationEntities.onUpdate = (id, {path, bearing}) => {
      //   const entity = this.getEntity(id);
      //   if (entity) {
      //     console.log(super.update, this['name']);
      //     super.update(entity, {path, bearing})
      //   }
      // }
    };

    clearItem(entity) {
      this.animationEntities.clearItem(entity.data.id);
      this.clearSub(entity.data.id);
      super.clearItem(entity)
    }

    update(entity, pathBearing) {
      const id = entity.data.id;
      this.initSub(id);
      const encodedString = this.getTimeAwarePolyline ? this.getTimeAwarePolyline(entity.data) : null;
      if (encodedString) {
        this.animationEntities.update(id, encodedString)
      } else {
        // super.update(entity, {path, bearing})
      }
    };

    initSub(id) {
      const sub = this.subs[id];
      if (sub) {

      } else {
        const newsub = this.animationEntities
          .getEntity(id)
          .updateEvent
          .subscribe('update', ({path, bearing}) => {
            const entity = this.getEntity(id);
            if (entity) {
              super.update(entity, {path, bearing})
            }
          });

        this.subs[id] = newsub;

      }
    }

    clearSub(id) {
      const sub = this.subs[id];
      sub.unsubscribe();
      delete this.subs[id];
    }



  };
}

export class AnimationsEntities {
  enitites: {
    [id: string]: TimeAwareAnimation
  } = {};


  clearItem(id) {
    const entity = this.enitites[id];
    entity.clear();
    delete this.enitites[id]
  }

  // onUpdate(id, {path, bearing}) {
  //
  // }

  update(id, polyline: string) {
    const entity = this.getEntity(id);
    entity.updatePolylineString(polyline);
  };

  getEntity(id: string) {
    const entity = this.enitites[id];
    if (entity) {
      return entity;
    } else {
      const newEntity = new TimeAwareAnimation();
      this.enitites[id] = newEntity;
      return newEntity;
    }
  }

  // clearSubs() {
  //   // this.subs.forEach(sub => {
  //   //   sub.unsubscribe();
  //   // });
  //   // this.subs = []
  // }

  // initSubs(cb: (id: string, pathBearing) => void) {
  //   const keys = Object.keys(this.enitites);
  //   keys.map(key => {
  //     return this.enitites[key].updateEvent.subscribe('update', ({path, bearing}) => {
  //       cb(key, {path, bearing})
  //       // let entity = this.getEntity();
  //       // if(entity) this.update(entity, {path, bearing})
  //     });
  //   })
  // }



}
import { Constructor } from "ht-models";
import {CurrentUserTrace, Entities, Entity, MapInstance} from "ht-maps";
import Popper from "popper.js";
export const User = PopperMixin(CurrentUserTrace)

export interface IPopperBase {
	traceEffect? (): any;
	getEntity(): Entity;
	update(entity: Entity, pathBearingTime): void;
	entities: Entities<any>
	  mapInstance: MapInstance,
	  removeItem(item): void
	// getStyle: (styleType?) => object;
}

export function PopperMixin<TBase extends Constructor<IPopperBase>>(Base: TBase) {
	return class extends Base {
		popper
		constructor(...arg: any[]) {
			super(...arg);
		  }
		update(entity: Entity, pathBearingTime) {
			super.update(entity, pathBearingTime)
			setTimeout(() => {
				const elem = this.getEntity().item.markerWrapper_;
		
				if (!elem) {
					this.popper && this.popper.destory()
				} else if (this.popper) {
					this.popper.scheduleUpdate()
				} else if(elem) {
					var dom: Element = document.createElement("div");
					dom.innerHTML = `${entity.data.name}`
					dom.className = "card"
					document.body.appendChild(dom);
					this.popper =  new Popper(elem, dom)
					this.mapInstance.addPopper(this.popper);
				}
			})
			
		}

		removeItem(item) {
			if(this.popper) this.popper.destroy()
			this.mapInstance.removePopper(this.popper);
			this.popper = null;
			super.removeItem(item)
		}
	};
}

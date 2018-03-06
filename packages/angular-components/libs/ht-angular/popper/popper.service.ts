import { Injectable } from '@angular/core';

@Injectable()
export class PopperService {
  poppers: any[] = [];
  constructor() { }

  addPopper(popper) {
    let didMatch = false;
    this.poppers = this.poppers.map((currentPopper) => {
      if (popper.instance == currentPopper.instance) {
        didMatch = true;
        return popper
      } else {
        return currentPopper
      }
    });
    if (!didMatch) {
      this.poppers.push(popper)
    }
  };

  checkCollision(data): false | any[] {
    const otherPoppers = this.getOtherPoppers(data);
    return this.detctCollisions(data, otherPoppers)
  };

  private getOtherPoppers(data) {
    return this.poppers.reduce((rest, p) => {
      return p.instance == data.instance ? rest : [...rest, p];
    }, []);
  };

  detctCollisions(data, otherPoppers): false | any[] {
    const detected = otherPoppers.reduce((acc, data1) => {
      const col = this.detctCollision(data, data1);
      return col ? [...acc, data1] : acc
    }, []);
    return detected.length ? detected : false
  }

  private detctCollision(data1, data2) {
    var d1_offset             = data1.popper;
    var d1_height             = data1.popper.height;
    var d1_width              = data1.popper.width;
    var d1_distance_from_top  = d1_offset.top + d1_height;
    var d1_distance_from_left = d1_offset.left + d1_width;

    // Div 2 data
    var d2_offset             = data2.popper;
    var d2_height             = data2.popper.height;
    var d2_width              = data2.popper.width;
    var d2_distance_from_top  = d2_offset.top + d2_height;
    var d2_distance_from_left = d2_offset.left + d2_width;

    // if(d1_distance_from_top < d2_offset.top || d1_offset.top > d2_distance_from_top) {
    //
    // };
    //
    // if (d1_distance_from_left < d2_offset.left || d1_offset.left > d2_distance_from_left) {
    //
    // }

    var not_colliding = ( d1_distance_from_top < d2_offset.top || d1_offset.top > d2_distance_from_top || d1_distance_from_left < d2_offset.left || d1_offset.left > d2_distance_from_left );

    // Return whether it IS colliding
    return ! not_colliding;
  }

}

import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[htAnalyticsSlot]'
})
export class AnalyticsSlotDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}

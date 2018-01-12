import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild} from '@angular/core';
import {AnalyticsSlotDirective} from "./analytics-slot.directive";
import {IAnalyticsItem} from "../../interfaces/analytics-item";

@Component({
  selector: 'ht-analytics-item',
  templateUrl: './analytics-item.component.html',
  styleUrls: ['./analytics-item.component.scss']
})
export class AnalyticsItemComponent implements OnInit {
  @ViewChild(AnalyticsSlotDirective) slot: AnalyticsSlotDirective;
  @Input() item: IAnalyticsItem;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnInit() {
    this.addComponent()
  }

  private addComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.item.component);

    const viewContainerRef = this.slot.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);

    this.item.setData(componentRef.instance)

  }

}

import { AnalyticsSlotDirective } from './analytics-slot.directive';
import {ViewContainerRef} from "@angular/core";
import {async, TestBed} from "@angular/core/testing";

describe('AnalyticsSlotDirective', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsSlotDirective ],
      providers: [ViewContainerRef]
    })
      .compileComponents();
  }));

  // it('should create an instance', () => {
  //   const directive = new AnalyticsSlotDirective();
  //   expect(directive).toBeTruthy();
  // });
});

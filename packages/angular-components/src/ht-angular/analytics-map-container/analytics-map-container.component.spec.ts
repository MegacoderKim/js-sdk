import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsMapContainerComponent } from './analytics-map-container.component';

describe('AnalyticsMapContainerComponent', () => {
  let component: AnalyticsMapContainerComponent;
  let fixture: ComponentFixture<AnalyticsMapContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsMapContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsMapContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

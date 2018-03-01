import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsItemLoadComponent } from './analytics-item-load.component';

describe('AnalyticsItemLoadComponent', () => {
  let component: AnalyticsItemLoadComponent;
  let fixture: ComponentFixture<AnalyticsItemLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsItemLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsItemLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

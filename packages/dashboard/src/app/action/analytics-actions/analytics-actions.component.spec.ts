import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsActionsComponent } from './analytics-actions.component';

describe('AnalyticsActionsComponent', () => {
  let component: AnalyticsActionsComponent;
  let fixture: ComponentFixture<AnalyticsActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

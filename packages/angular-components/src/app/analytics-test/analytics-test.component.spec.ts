import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsTestComponent } from './analytics-test.component';

describe('AnalyticsTestComponent', () => {
  let component: AnalyticsTestComponent;
  let fixture: ComponentFixture<AnalyticsTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

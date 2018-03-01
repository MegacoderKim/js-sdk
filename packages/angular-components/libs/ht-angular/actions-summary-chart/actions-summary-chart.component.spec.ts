import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsSummaryChartComponent } from './actions-summary-chart.component';

describe('ActionsSummaryChartComponent', () => {
  let component: ActionsSummaryChartComponent;
  let fixture: ComponentFixture<ActionsSummaryChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsSummaryChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsSummaryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

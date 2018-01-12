import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSummaryChartComponent } from './users-summary-chart.component';

describe('UsersSummaryChartComponent', () => {
  let component: UsersSummaryChartComponent;
  let fixture: ComponentFixture<UsersSummaryChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersSummaryChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersSummaryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

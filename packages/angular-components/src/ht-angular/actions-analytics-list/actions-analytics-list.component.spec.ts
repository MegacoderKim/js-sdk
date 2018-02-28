import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsAnalyticsListComponent } from './actions-analytics-list.component';

describe('ActionsAnalyticsListComponent', () => {
  let component: ActionsAnalyticsListComponent;
  let fixture: ComponentFixture<ActionsAnalyticsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsAnalyticsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsAnalyticsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkforceMonitoringComponent } from './workforce-monitoring.component';

describe('WorkforceMonitoringComponent', () => {
  let component: WorkforceMonitoringComponent;
  let fixture: ComponentFixture<WorkforceMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkforceMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkforceMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

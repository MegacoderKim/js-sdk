import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsChartContainerComponent } from './groups-chart-container.component';

describe('GroupsChartContainerComponent', () => {
  let component: GroupsChartContainerComponent;
  let fixture: ComponentFixture<GroupsChartContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsChartContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsChartContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

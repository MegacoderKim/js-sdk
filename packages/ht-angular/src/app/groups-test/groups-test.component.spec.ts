import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsTestComponent } from './groups-test.component';

describe('GroupsTestComponent', () => {
  let component: GroupsTestComponent;
  let fixture: ComponentFixture<GroupsTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

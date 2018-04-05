import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationBasedAssignmentComponent } from './location-based-assignment.component';

describe('LocationBasedAssignmentComponent', () => {
  let component: LocationBasedAssignmentComponent;
  let fixture: ComponentFixture<LocationBasedAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationBasedAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationBasedAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

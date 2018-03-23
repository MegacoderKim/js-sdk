import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldPlanComponent } from './old-plan.component';

describe('OldPlanComponent', () => {
  let component: OldPlanComponent;
  let fixture: ComponentFixture<OldPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

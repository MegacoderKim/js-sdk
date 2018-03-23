import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanSuccessComponent } from './plan-success.component';

describe('PlanSuccessComponent', () => {
  let component: PlanSuccessComponent;
  let fixture: ComponentFixture<PlanSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

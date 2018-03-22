import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingSetupComponent } from './onboarding-setup.component';

describe('OnboardingSetupComponent', () => {
  let component: OnboardingSetupComponent;
  let fixture: ComponentFixture<OnboardingSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardingSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

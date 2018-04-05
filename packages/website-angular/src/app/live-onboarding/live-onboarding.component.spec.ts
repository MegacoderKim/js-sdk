import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveOnboardingComponent } from './live-onboarding.component';

describe('LiveOnboardingComponent', () => {
  let component: LiveOnboardingComponent;
  let fixture: ComponentFixture<LiveOnboardingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveOnboardingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

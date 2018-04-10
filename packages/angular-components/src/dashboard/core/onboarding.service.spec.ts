import { TestBed, inject } from '@angular/core/testing';

import { OnboardingService } from './onboarding.service';

describe('OnboardingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnboardingService]
    });
  });

  it('should be created', inject([OnboardingService], (service: OnboardingService) => {
    expect(service).toBeTruthy();
  }));
});

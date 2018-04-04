import { TestBed, inject } from '@angular/core/testing';

import { LiveOnboardingService } from './live-onboarding.service';

describe('LiveOnboardingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LiveOnboardingService]
    });
  });

  it('should be created', inject([LiveOnboardingService], (service: LiveOnboardingService) => {
    expect(service).toBeTruthy();
  }));
});

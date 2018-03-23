import { TestBed, inject } from '@angular/core/testing';

import { ReplayEffectsService } from './replay-effects.service';

describe('ReplayEffectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReplayEffectsService]
    });
  });

  it('should ...', inject([ReplayEffectsService], (service: ReplayEffectsService) => {
    expect(service).toBeTruthy();
  }));
});

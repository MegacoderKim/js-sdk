import { TestBed, inject } from '@angular/core/testing';

import { LoadingEffectsService } from './loading-effects.service';

describe('LoadingEffectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingEffectsService]
    });
  });

  it('should be created', inject([LoadingEffectsService], (service: LoadingEffectsService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { UiEffectsService } from './ui-effects.service';

describe('UiEffectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UiEffectsService]
    });
  });

  it('should ...', inject([UiEffectsService], (service: UiEffectsService) => {
    expect(service).toBeTruthy();
  }));
});

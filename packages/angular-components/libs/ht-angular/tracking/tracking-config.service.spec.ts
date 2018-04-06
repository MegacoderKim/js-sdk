import { TestBed, inject } from '@angular/core/testing';

import { TrackingConfigService } from './tracking-config.service';

describe('TrackingConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrackingConfigService]
    });
  });

  it('should be created', inject([TrackingConfigService], (service: TrackingConfigService) => {
    expect(service).toBeTruthy();
  }));
});

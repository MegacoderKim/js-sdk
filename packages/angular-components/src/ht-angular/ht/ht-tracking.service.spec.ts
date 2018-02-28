import { TestBed, inject } from '@angular/core/testing';

import { HtTrackingService } from './ht-tracking.service';

describe('HtTrackingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HtTrackingService]
    });
  });

  it('should be created', inject([HtTrackingService], (service: HtTrackingService) => {
    expect(service).toBeTruthy();
  }));
});

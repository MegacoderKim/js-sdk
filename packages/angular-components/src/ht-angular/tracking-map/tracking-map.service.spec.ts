import { TestBed, inject } from '@angular/core/testing';

import { TrackingMapService } from './tracking-map.service';

describe('TrackingMapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrackingMapService]
    });
  });

  it('should be created', inject([TrackingMapService], (service: TrackingMapService) => {
    expect(service).toBeTruthy();
  }));
});

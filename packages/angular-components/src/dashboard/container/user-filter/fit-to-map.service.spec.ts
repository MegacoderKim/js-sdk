import { TestBed, inject } from '@angular/core/testing';

import { FitToMapService } from './fit-to-map.service';

describe('FitToMapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FitToMapService]
    });
  });

  it('should be created', inject([FitToMapService], (service: FitToMapService) => {
    expect(service).toBeTruthy();
  }));
});

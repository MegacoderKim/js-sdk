import { TestBed, inject } from '@angular/core/testing';

import { HtMapService } from './ht-map.service';

describe('HtMapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HtMapService]
    });
  });

  it('should be created', inject([HtMapService], (service: HtMapService) => {
    expect(service).toBeTruthy();
  }));
});

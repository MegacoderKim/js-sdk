import { TestBed, inject } from '@angular/core/testing';

import { StopsHeatmapService } from './stops-heatmap.service';

describe('StopsHeatmapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StopsHeatmapService]
    });
  });

  it('should be created', inject([StopsHeatmapService], (service: StopsHeatmapService) => {
    expect(service).toBeTruthy();
  }));
});

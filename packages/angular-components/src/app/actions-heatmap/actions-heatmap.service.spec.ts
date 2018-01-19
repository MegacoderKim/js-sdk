import { TestBed, inject } from '@angular/core/testing';

import { ActionsHeatmapService } from './actions-heatmap.service';

describe('ActionsHeatmapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActionsHeatmapService]
    });
  });

  it('should be created', inject([ActionsHeatmapService], (service: ActionsHeatmapService) => {
    expect(service).toBeTruthy();
  }));
});

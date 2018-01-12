import { TestBed, inject } from '@angular/core/testing';

import { AnalyticsItemsService } from './analytics-items.service';

describe('AnalyticsItemsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnalyticsItemsService]
    });
  });

  it('should be created', inject([AnalyticsItemsService], (service: AnalyticsItemsService) => {
    expect(service).toBeTruthy();
  }));
});

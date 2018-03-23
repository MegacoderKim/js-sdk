import { TestBed, inject } from '@angular/core/testing';

import { ExternalAnalyticsService } from './external-analytics.service';

describe('ExternalAnalyticsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExternalAnalyticsService]
    });
  });

  it('should be created', inject([ExternalAnalyticsService], (service: ExternalAnalyticsService) => {
    expect(service).toBeTruthy();
  }));
});

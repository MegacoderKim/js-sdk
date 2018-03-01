import { TestBed, inject } from '@angular/core/testing';

import { ActionsAnalyticsListService } from './actions-analytics-list.service';

describe('ActionsAnalyticsListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActionsAnalyticsListService]
    });
  });

  it('should be created', inject([ActionsAnalyticsListService], (service: ActionsAnalyticsListService) => {
    expect(service).toBeTruthy();
  }));
});

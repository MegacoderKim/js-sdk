import { TestBed, inject } from '@angular/core/testing';

import { UsersAnalyticsListService } from './users-analytics-list.service';

describe('UsersAnalyticsListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersAnalyticsListService]
    });
  });

  it('should be created', inject([UsersAnalyticsListService], (service: UsersAnalyticsListService) => {
    expect(service).toBeTruthy();
  }));
});

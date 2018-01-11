import { TestBed, inject } from '@angular/core/testing';

import { UsersSummaryService } from './users-summary.service';

describe('UsersSummaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersSummaryService]
    });
  });

  it('should be created', inject([UsersSummaryService], (service: UsersSummaryService) => {
    expect(service).toBeTruthy();
  }));
});

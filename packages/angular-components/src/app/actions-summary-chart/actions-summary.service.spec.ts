import { TestBed, inject } from '@angular/core/testing';

import { ActionsSummaryService } from './actions-summary.service';

describe('ActionsSummaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActionsSummaryService]
    });
  });

  it('should be created', inject([ActionsSummaryService], (service: ActionsSummaryService) => {
    expect(service).toBeTruthy();
  }));
});

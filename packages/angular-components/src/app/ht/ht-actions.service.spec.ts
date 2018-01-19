import { TestBed, inject } from '@angular/core/testing';

import { HtActionsService } from './ht-actions.service';

describe('HtActionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HtActionsService]
    });
  });

  it('should be created', inject([HtActionsService], (service: HtActionsService) => {
    expect(service).toBeTruthy();
  }));
});

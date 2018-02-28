import { TestBed, inject } from '@angular/core/testing';

import { HtRequestService } from './ht-request.service';

describe('HtRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HtRequestService]
    });
  });

  it('should be created', inject([HtRequestService], (service: HtRequestService) => {
    expect(service).toBeTruthy();
  }));
});

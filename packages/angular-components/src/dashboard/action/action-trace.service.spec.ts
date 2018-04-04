import { TestBed, inject } from '@angular/core/testing';

import { ActionTraceService } from './action-trace.service';

describe('ActionTraceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActionTraceService]
    });
  });

  it('should ...', inject([ActionTraceService], (service: ActionTraceService) => {
    expect(service).toBeTruthy();
  }));
});

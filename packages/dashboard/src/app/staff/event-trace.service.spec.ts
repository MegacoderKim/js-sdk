import { TestBed, inject } from '@angular/core/testing';

import { EventTraceService } from './event-trace.service';

describe('EventTraceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventTraceService]
    });
  });

  it('should be created', inject([EventTraceService], (service: EventTraceService) => {
    expect(service).toBeTruthy();
  }));
});

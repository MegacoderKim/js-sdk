import { TestBed, inject } from '@angular/core/testing';
import { UserTraceService } from './user-trace.service';

describe('UserTraceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserTraceService]
    });
  });

  it('should ...', inject([UserTraceService], (service: UserTraceService) => {
    expect(service).toBeTruthy();
  }));
});

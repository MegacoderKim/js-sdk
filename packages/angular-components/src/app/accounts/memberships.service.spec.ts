import { TestBed, inject } from '@angular/core/testing';

import { MembershipsService } from './memberships.service';

describe('MembershipsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MembershipsService]
    });
  });

  it('should be created', inject([MembershipsService], (service: MembershipsService) => {
    expect(service).toBeTruthy();
  }));
});

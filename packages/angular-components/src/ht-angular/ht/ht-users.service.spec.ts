import { TestBed, inject } from '@angular/core/testing';

import { HtUsersService } from './ht-users.service';

describe('HtUsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HtUsersService]
    });
  });

  it('should be created', inject([HtUsersService], (service: HtUsersService) => {
    expect(service).toBeTruthy();
  }));
});

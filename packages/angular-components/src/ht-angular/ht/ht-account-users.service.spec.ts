import { TestBed, inject } from '@angular/core/testing';

import { HtAccountService } from './ht-account-users.service';

describe('HtAccountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HtAccountService]
    });
  });

  it('should be created', inject([HtAccountService], (service: HtAccountService) => {
    expect(service).toBeTruthy();
  }));
});

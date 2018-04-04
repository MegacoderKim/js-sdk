import { TestBed, inject } from '@angular/core/testing';
import { AccountUsersService } from './account-users.service';

describe('AccountUsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountUsersService]
    });
  });

  it('should ...', inject([AccountUsersService], (service: AccountUsersService) => {
    expect(service).toBeTruthy();
  }));
});

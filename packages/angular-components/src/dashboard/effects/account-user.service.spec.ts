import { TestBed, inject } from '@angular/core/testing';
import { AccountUserEffectsService } from './account-user.service';

describe('AccountUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountUserEffectsService]
    });
  });

  it('should ...', inject([AccountUserEffectsService], (service: AccountUserEffectsService) => {
    expect(service).toBeTruthy();
  }));
});

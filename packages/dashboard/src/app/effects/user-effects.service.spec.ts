import { TestBed, inject } from '@angular/core/testing';
import { UserEffectsService } from './user-effects.service';

describe('UserEffectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserEffectsService]
    });
  });

  it('should ...', inject([UserEffectsService], (service: UserEffectsService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, async, inject } from '@angular/core/testing';

import { GroupKeyGuard } from './group-key.guard';

describe('GroupKeyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupKeyGuard]
    });
  });

  it('should ...', inject([GroupKeyGuard], (guard: GroupKeyGuard) => {
    expect(guard).toBeTruthy();
  }));
});

import { TestBed, async, inject } from '@angular/core/testing';

import { ContainerGuardGuard } from './container-guard.guard';

describe('ContainerGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContainerGuardGuard]
    });
  });

  it('should ...', inject([ContainerGuardGuard], (guard: ContainerGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});

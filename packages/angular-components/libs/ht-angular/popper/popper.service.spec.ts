import { TestBed, inject } from '@angular/core/testing';

import { PopperService } from './popper.service';

describe('PopperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PopperService]
    });
  });

  it('should be created', inject([PopperService], (service: PopperService) => {
    expect(service).toBeTruthy();
  }));
});

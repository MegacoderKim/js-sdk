import { TestBed, inject } from '@angular/core/testing';

import { QuickstartService } from './quickstart.service';

describe('QuickstartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuickstartService]
    });
  });

  it('should be created', inject([QuickstartService], (service: QuickstartService) => {
    expect(service).toBeTruthy();
  }));
});

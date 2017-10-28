import { TestBed, inject } from '@angular/core/testing';

import { HtClientService } from './ht-client.service';

describe('HtClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HtClientService]
    });
  });

  it('should be created', inject([HtClientService], (service: HtClientService) => {
    expect(service).toBeTruthy();
  }));
});

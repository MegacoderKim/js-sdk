import { TestBed, inject } from '@angular/core/testing';

import { HtConfigService } from './ht-config.service';

describe('HtConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HtConfigService]
    });
  });

  it('should be created', inject([HtConfigService], (service: HtConfigService) => {
    expect(service).toBeTruthy();
  }));
});

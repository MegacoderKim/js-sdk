import { TestBed, inject } from '@angular/core/testing';
import { DefaultRequestOptions } from './default-header.service';

describe('DefaultHeaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefaultRequestOptions]
    });
  });

  it('should ...', inject([DefaultRequestOptions], (service: DefaultRequestOptions) => {
    expect(service).toBeTruthy();
  }));
});

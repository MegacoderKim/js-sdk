/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InnerMapService } from './map.service';

describe('InnerMapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InnerMapService]
    });
  });

  it('should ...', inject([InnerMapService], (service: InnerMapService) => {
    expect(service).toBeTruthy();
  }));
});

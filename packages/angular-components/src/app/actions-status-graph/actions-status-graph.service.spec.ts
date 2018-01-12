import { TestBed, inject } from '@angular/core/testing';

import { ActionsStatusGraphService } from './actions-status-graph.service';

describe('ActionsStatusGraphService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActionsStatusGraphService]
    });
  });

  it('should be created', inject([ActionsStatusGraphService], (service: ActionsStatusGraphService) => {
    expect(service).toBeTruthy();
  }));
});

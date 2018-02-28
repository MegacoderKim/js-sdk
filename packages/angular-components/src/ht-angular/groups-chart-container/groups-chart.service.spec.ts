import { TestBed, inject } from '@angular/core/testing';

import { GroupsChartService } from './groups-chart.service';

describe('GroupsChartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupsChartService]
    });
  });

  it('should be created', inject([GroupsChartService], (service: GroupsChartService) => {
    expect(service).toBeTruthy();
  }));
});

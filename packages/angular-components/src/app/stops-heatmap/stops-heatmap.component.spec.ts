import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopsHeatmapComponent } from './stops-heatmap.component';

describe('StopsHeatmapComponent', () => {
  let component: StopsHeatmapComponent;
  let fixture: ComponentFixture<StopsHeatmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopsHeatmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopsHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

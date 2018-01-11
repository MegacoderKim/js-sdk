import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacelineMapContainerComponent } from './placeline-map-container.component';

describe('PlacelineMapContainerComponent', () => {
  let component: PlacelineMapContainerComponent;
  let fixture: ComponentFixture<PlacelineMapContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacelineMapContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacelineMapContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

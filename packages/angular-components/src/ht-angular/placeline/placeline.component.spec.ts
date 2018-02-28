import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacelineComponent } from './placeline.component';

describe('PlacelineComponent', () => {
  let component: PlacelineComponent;
  let fixture: ComponentFixture<PlacelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

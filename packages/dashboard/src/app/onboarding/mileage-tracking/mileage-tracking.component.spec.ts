import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MileageTrackingComponent } from './mileage-tracking.component';

describe('MileageTrackingComponent', () => {
  let component: MileageTrackingComponent;
  let fixture: ComponentFixture<MileageTrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MileageTrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MileageTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

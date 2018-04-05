import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackDeliveriesAndroidComponent } from './track-deliveries-android.component';

describe('TrackDeliveriesAndroidComponent', () => {
  let component: TrackDeliveriesAndroidComponent;
  let fixture: ComponentFixture<TrackDeliveriesAndroidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackDeliveriesAndroidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackDeliveriesAndroidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceVisitTrackingAndroidComponent } from './service-visit-tracking-android.component';

describe('ServiceVisitTrackingAndroidComponent', () => {
  let component: ServiceVisitTrackingAndroidComponent;
  let fixture: ComponentFixture<ServiceVisitTrackingAndroidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceVisitTrackingAndroidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceVisitTrackingAndroidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

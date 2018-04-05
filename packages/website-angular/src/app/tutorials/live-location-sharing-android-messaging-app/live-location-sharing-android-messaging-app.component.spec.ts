import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveLocationSharingAndroidMessagingAppComponent } from './live-location-sharing-android-messaging-app.component';

describe('LiveLocationSharingAndroidMessagingAppComponent', () => {
  let component: LiveLocationSharingAndroidMessagingAppComponent;
  let fixture: ComponentFixture<LiveLocationSharingAndroidMessagingAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveLocationSharingAndroidMessagingAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveLocationSharingAndroidMessagingAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

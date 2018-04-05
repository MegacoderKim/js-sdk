import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveLocationSharingAndroidMarketplaceAppComponent } from './live-location-sharing-android-marketplace-app.component';

describe('LiveLocationSharingAndroidMarketplaceAppComponent', () => {
  let component: LiveLocationSharingAndroidMarketplaceAppComponent;
  let fixture: ComponentFixture<LiveLocationSharingAndroidMarketplaceAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveLocationSharingAndroidMarketplaceAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveLocationSharingAndroidMarketplaceAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveLocationSharingComponent } from './live-location-sharing.component';

describe('LiveLocationSharingComponent', () => {
  let component: LiveLocationSharingComponent;
  let fixture: ComponentFixture<LiveLocationSharingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveLocationSharingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveLocationSharingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

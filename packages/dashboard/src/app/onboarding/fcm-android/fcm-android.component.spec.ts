import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FcmAndroidComponent } from './fcm-android.component';

describe('FcmAndroidComponent', () => {
  let component: FcmAndroidComponent;
  let fixture: ComponentFixture<FcmAndroidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FcmAndroidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FcmAndroidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

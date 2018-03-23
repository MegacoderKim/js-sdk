import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdkAndroidComponent } from './sdk-android.component';

describe('SdkAndroidComponent', () => {
  let component: SdkAndroidComponent;
  let fixture: ComponentFixture<SdkAndroidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdkAndroidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdkAndroidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

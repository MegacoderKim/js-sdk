import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AndroidSdkComponent } from './android-sdk.component';

describe('AndroidSdkComponent', () => {
  let component: AndroidSdkComponent;
  let fixture: ComponentFixture<AndroidSdkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AndroidSdkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AndroidSdkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactNativeSdkComponent } from './react-native-sdk.component';

describe('ReactNativeSdkComponent', () => {
  let component: ReactNativeSdkComponent;
  let fixture: ComponentFixture<ReactNativeSdkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactNativeSdkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactNativeSdkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

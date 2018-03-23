import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdkReactnativeComponent } from './sdk-reactnative.component';

describe('SdkReactnativeComponent', () => {
  let component: SdkReactnativeComponent;
  let fixture: ComponentFixture<SdkReactnativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdkReactnativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdkReactnativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

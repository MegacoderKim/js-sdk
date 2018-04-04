import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdkIosComponent } from './sdk-ios.component';

describe('SdkIosComponent', () => {
  let component: SdkIosComponent;
  let fixture: ComponentFixture<SdkIosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdkIosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdkIosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

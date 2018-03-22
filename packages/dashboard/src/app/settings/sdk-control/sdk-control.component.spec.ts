import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdkControlComponent } from './sdk-control.component';

describe('SdkControlComponent', () => {
  let component: SdkControlComponent;
  let fixture: ComponentFixture<SdkControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdkControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdkControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IosSdkComponent } from './ios-sdk.component';

describe('IosSdkComponent', () => {
  let component: IosSdkComponent;
  let fixture: ComponentFixture<IosSdkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IosSdkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IosSdkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

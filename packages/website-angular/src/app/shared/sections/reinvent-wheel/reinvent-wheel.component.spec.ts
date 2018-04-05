import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinventWheelComponent } from './reinvent-wheel.component';

describe('ReinventWheelComponent', () => {
  let component: ReinventWheelComponent;
  let fixture: ComponentFixture<ReinventWheelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReinventWheelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReinventWheelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

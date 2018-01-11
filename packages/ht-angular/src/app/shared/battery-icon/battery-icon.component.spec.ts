import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatteryIconComponent } from './battery-icon.component';

describe('BatteryIconComponent', () => {
  let component: BatteryIconComponent;
  let fixture: ComponentFixture<BatteryIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatteryIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatteryIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

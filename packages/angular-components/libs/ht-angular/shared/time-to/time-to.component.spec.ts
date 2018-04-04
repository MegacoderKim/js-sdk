import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeToComponent } from './time-to.component';

describe('TimeToComponent', () => {
  let component: TimeToComponent;
  let fixture: ComponentFixture<TimeToComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeToComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

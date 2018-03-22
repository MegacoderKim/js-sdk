import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraceEventsComponent } from './trace-events.component';

describe('TraceEventsComponent', () => {
  let component: TraceEventsComponent;
  let fixture: ComponentFixture<TraceEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraceEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraceEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

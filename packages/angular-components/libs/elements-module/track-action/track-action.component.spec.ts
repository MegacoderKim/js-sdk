import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackActionComponent } from './track-action.component';

describe('TrackActionComponent', () => {
  let component: TrackActionComponent;
  let fixture: ComponentFixture<TrackActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

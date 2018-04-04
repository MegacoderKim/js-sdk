import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsTimelineComponent } from './actions-timeline.component';

describe('ActionsTimelineComponent', () => {
  let component: ActionsTimelineComponent;
  let fixture: ComponentFixture<ActionsTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

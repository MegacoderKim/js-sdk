import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsGuideComponent } from './events-guide.component';

describe('EventsGuideComponent', () => {
  let component: EventsGuideComponent;
  let fixture: ComponentFixture<EventsGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

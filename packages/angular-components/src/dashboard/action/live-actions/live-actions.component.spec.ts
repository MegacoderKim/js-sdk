import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveActionsComponent } from './live-actions.component';

describe('LiveActionsComponent', () => {
  let component: LiveActionsComponent;
  let fixture: ComponentFixture<LiveActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

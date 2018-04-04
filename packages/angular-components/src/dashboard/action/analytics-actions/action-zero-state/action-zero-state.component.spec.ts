import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionZeroStateComponent } from './action-zero-state.component';

describe('ActionZeroStateComponent', () => {
  let component: ActionZeroStateComponent;
  let fixture: ComponentFixture<ActionZeroStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionZeroStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionZeroStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

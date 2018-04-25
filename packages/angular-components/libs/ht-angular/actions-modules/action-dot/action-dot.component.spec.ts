import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionDotComponent } from './action-dot.component';

describe('ActionDotComponent', () => {
  let component: ActionDotComponent;
  let fixture: ComponentFixture<ActionDotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionDotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionDotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

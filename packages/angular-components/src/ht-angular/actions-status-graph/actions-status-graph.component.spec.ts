import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsStatusGraphComponent } from './actions-status-graph.component';

describe('ActionsStatusGraphComponent', () => {
  let component: ActionsStatusGraphComponent;
  let fixture: ComponentFixture<ActionsStatusGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsStatusGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsStatusGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

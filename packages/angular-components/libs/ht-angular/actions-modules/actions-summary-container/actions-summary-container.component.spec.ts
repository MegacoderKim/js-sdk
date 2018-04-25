import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsSummaryContainerComponent } from './actions-summary-container.component';

describe('ActionsSummaryContainerComponent', () => {
  let component: ActionsSummaryContainerComponent;
  let fixture: ComponentFixture<ActionsSummaryContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsSummaryContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsSummaryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

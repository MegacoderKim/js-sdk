import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsCardsContainerComponent } from './actions-cards-container.component';

describe('ActionsCardsContainerComponent', () => {
  let component: ActionsCardsContainerComponent;
  let fixture: ComponentFixture<ActionsCardsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsCardsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsCardsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

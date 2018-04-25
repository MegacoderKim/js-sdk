import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersCardsContainerComponent } from './users-cards-container.component';

describe('UsersComponent', () => {
  let component: UsersCardsContainerComponent;
  let fixture: ComponentFixture<UsersCardsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersCardsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersCardsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

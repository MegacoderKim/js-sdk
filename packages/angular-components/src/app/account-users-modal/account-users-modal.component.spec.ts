import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountUsersModalComponent } from './account-users-modal.component';

describe('AccountUsersModalComponent', () => {
  let component: AccountUsersModalComponent;
  let fixture: ComponentFixture<AccountUsersModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountUsersModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountUsersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

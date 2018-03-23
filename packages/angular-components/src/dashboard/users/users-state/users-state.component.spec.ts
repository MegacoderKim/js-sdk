import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersStateComponent } from './users-state.component';

describe('UsersStateComponent', () => {
  let component: UsersStateComponent;
  let fixture: ComponentFixture<UsersStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

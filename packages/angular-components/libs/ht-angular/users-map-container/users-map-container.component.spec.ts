import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersMapContainerComponent } from './users-map-container.component';

describe('UsersMapContainerComponent', () => {
  let component: UsersMapContainerComponent;
  let fixture: ComponentFixture<UsersMapContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersMapContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersMapContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

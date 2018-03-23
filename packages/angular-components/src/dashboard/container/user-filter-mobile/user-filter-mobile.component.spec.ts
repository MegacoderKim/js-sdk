import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFilterMobileComponent } from './user-filter-mobile.component';

describe('UserFilterMobileComponent', () => {
  let component: UserFilterMobileComponent;
  let fixture: ComponentFixture<UserFilterMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFilterMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFilterMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

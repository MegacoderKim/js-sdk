import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSummaryComponent } from './users-summary.component';

describe('UsersSummaryComponent', () => {
  let component: UsersSummaryComponent;
  let fixture: ComponentFixture<UsersSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

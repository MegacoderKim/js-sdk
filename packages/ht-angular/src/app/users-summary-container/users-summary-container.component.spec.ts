import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSummaryContainerComponent } from './users-summary-container.component';

describe('UsersSummaryContainerComponent', () => {
  let component: UsersSummaryContainerComponent;
  let fixture: ComponentFixture<UsersSummaryContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersSummaryContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersSummaryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAnalyticsListComponent } from './users-analytics-list.component';

describe('UsersAnalyticsListComponent', () => {
  let component: UsersAnalyticsListComponent;
  let fixture: ComponentFixture<UsersAnalyticsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersAnalyticsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersAnalyticsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

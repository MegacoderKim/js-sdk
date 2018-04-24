import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsFiltersComponent } from './actions-filters.component';

describe('ActionsFiltersComponent', () => {
  let component: ActionsFiltersComponent;
  let fixture: ComponentFixture<ActionsFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

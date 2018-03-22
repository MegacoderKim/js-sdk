import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionFilterMobileComponent } from './action-filter-mobile.component';

describe('ActionFilterMobileComponent', () => {
  let component: ActionFilterMobileComponent;
  let fixture: ComponentFixture<ActionFilterMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionFilterMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionFilterMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

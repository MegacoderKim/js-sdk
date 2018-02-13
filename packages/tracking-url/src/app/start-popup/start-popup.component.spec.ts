import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartPopupComponent } from './start-popup.component';

describe('StartPopupComponent', () => {
  let component: StartPopupComponent;
  let fixture: ComponentFixture<StartPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

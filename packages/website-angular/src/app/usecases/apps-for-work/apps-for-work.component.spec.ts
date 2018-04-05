import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsForWorkComponent } from './apps-for-work.component';

describe('AppsForWorkComponent', () => {
  let component: AppsForWorkComponent;
  let fixture: ComponentFixture<AppsForWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppsForWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppsForWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

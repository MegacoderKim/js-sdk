import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsForConsumersComponent } from './apps-for-consumers.component';

describe('AppsForConsumersComponent', () => {
  let component: AppsForConsumersComponent;
  let fixture: ComponentFixture<AppsForConsumersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppsForConsumersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppsForConsumersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

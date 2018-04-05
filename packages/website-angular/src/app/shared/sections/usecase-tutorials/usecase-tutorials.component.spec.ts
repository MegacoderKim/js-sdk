import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsecaseTutorialsComponent } from './usecase-tutorials.component';

describe('UsecaseTutorialsComponent', () => {
  let component: UsecaseTutorialsComponent;
  let fixture: ComponentFixture<UsecaseTutorialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsecaseTutorialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsecaseTutorialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLoggedoffComponent } from './header-loggedoff.component';

describe('HeaderLoggedoffComponent', () => {
  let component: HeaderLoggedoffComponent;
  let fixture: ComponentFixture<HeaderLoggedoffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderLoggedoffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderLoggedoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

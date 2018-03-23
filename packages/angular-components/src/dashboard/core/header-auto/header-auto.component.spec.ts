import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAutoComponent } from './header-auto.component';

describe('HeaderAutoComponent', () => {
  let component: HeaderAutoComponent;
  let fixture: ComponentFixture<HeaderAutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderAutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

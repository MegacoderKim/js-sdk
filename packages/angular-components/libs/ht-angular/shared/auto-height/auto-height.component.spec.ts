import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoHeightComponent } from './auto-height.component';

describe('AutoHeightComponent', () => {
  let component: AutoHeightComponent;
  let fixture: ComponentFixture<AutoHeightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoHeightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoHeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

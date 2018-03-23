import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacelineDateComponent } from './placeline-date.component';

describe('PlacelineDateComponent', () => {
  let component: PlacelineDateComponent;
  let fixture: ComponentFixture<PlacelineDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacelineDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacelineDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

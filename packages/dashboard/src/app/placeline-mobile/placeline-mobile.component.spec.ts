import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacelineMobileComponent } from './placeline-mobile.component';

describe('PlacelineMobileComponent', () => {
  let component: PlacelineMobileComponent;
  let fixture: ComponentFixture<PlacelineMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacelineMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacelineMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

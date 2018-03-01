import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationPopupComponent } from './destination-popup.component';

describe('DestinationPopupComponent', () => {
  let component: DestinationPopupComponent;
  let fixture: ComponentFixture<DestinationPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestinationPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

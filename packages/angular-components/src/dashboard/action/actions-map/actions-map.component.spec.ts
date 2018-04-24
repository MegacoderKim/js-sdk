import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsMapComponent } from './actions-map.component';

describe('ActionsMapComponent', () => {
  let component: ActionsMapComponent;
  let fixture: ComponentFixture<ActionsMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

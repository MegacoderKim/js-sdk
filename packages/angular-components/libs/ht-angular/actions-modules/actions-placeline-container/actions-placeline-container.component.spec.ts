import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsPlacelineContainerComponent } from './actions-placeline-container.component';

describe('ActionsPlacelineContainerComponent', () => {
  let component: ActionsPlacelineContainerComponent;
  let fixture: ComponentFixture<ActionsPlacelineContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsPlacelineContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsPlacelineContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

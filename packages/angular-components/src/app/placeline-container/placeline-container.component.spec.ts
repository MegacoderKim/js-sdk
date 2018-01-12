import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacelineContainerComponent } from './placeline-container.component';

describe('PlacelineContainerComponent', () => {
  let component: PlacelineContainerComponent;
  let fixture: ComponentFixture<PlacelineContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacelineContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacelineContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

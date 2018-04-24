import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersPlacelineContainerComponent } from './placeline-container.component';

describe('PlacelineContainerComponent', () => {
  let component: UsersPlacelineContainerComponent;
  let fixture: ComponentFixture<UsersPlacelineContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersPlacelineContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersPlacelineContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

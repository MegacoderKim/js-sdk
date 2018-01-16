import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPlacelineComponent } from './test-placeline.component';

describe('TestPlacelineComponent', () => {
  let component: TestPlacelineComponent;
  let fixture: ComponentFixture<TestPlacelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestPlacelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPlacelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

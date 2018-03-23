import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarShartComponent } from './bar-chart.component';

describe('BarShartComponent', () => {
  let component: BarShartComponent;
  let fixture: ComponentFixture<BarShartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarShartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarShartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

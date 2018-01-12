import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsTitleComponent } from './analytics-title.component';

describe('AnalyticsTitleComponent', () => {
  let component: AnalyticsTitleComponent;
  let fixture: ComponentFixture<AnalyticsTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

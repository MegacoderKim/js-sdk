import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsSelectorComponent } from './analytics-selector.component';

describe('AnalyticsSelectorComponent', () => {
  let component: AnalyticsSelectorComponent;
  let fixture: ComponentFixture<AnalyticsSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

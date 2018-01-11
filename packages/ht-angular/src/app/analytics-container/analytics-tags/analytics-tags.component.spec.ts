import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsTagsComponent } from './analytics-tags.component';

describe('AnalyticsTagsComponent', () => {
  let component: AnalyticsTagsComponent;
  let fixture: ComponentFixture<AnalyticsTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

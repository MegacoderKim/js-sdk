import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonCtaComponent } from './common-cta.component';

describe('CommonCtaComponent', () => {
  let component: CommonCtaComponent;
  let fixture: ComponentFixture<CommonCtaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonCtaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonCtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

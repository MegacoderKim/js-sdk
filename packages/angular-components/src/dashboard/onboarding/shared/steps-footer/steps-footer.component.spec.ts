import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsFooterComponent } from './steps-footer.component';

describe('StepsFooterComponent', () => {
  let component: StepsFooterComponent;
  let fixture: ComponentFixture<StepsFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepsFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

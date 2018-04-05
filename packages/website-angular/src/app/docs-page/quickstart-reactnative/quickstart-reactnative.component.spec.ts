import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickstartReactnativeComponent } from './quickstart-reactnative.component';

describe('QuickstartReactnativeComponent', () => {
  let component: QuickstartReactnativeComponent;
  let fixture: ComponentFixture<QuickstartReactnativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickstartReactnativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickstartReactnativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

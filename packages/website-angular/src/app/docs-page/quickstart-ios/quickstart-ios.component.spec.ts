import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickstartIosComponent } from './quickstart-ios.component';

describe('QuickstartIosComponent', () => {
  let component: QuickstartIosComponent;
  let fixture: ComponentFixture<QuickstartIosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickstartIosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickstartIosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

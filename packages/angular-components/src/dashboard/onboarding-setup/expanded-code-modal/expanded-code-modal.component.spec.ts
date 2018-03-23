import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandedCodeModalComponent } from './expanded-code-modal.component';

describe('ExpandedCodeModalComponent', () => {
  let component: ExpandedCodeModalComponent;
  let fixture: ComponentFixture<ExpandedCodeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandedCodeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandedCodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

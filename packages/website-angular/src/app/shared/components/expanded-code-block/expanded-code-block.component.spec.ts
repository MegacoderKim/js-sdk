import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandedCodeBlockComponent } from './expanded-code-block.component';

describe('ExpandedCodeBlockComponent', () => {
  let component: ExpandedCodeBlockComponent;
  let fixture: ComponentFixture<ExpandedCodeBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandedCodeBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandedCodeBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

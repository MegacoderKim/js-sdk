import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplainerDigramComponent } from './explainer-digram.component';

describe('ExplainerDigramComponent', () => {
  let component: ExplainerDigramComponent;
  let fixture: ComponentFixture<ExplainerDigramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExplainerDigramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplainerDigramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

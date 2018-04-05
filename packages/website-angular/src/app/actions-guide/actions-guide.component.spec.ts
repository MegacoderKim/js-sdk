import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsGuideComponent } from './actions-guide.component';

describe('ActionsGuideComponent', () => {
  let component: ActionsGuideComponent;
  let fixture: ComponentFixture<ActionsGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

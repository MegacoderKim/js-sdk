import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveBoxComponent } from './reactive-box.component';

describe('ReactiveBoxComponent', () => {
  let component: ReactiveBoxComponent;
  let fixture: ComponentFixture<ReactiveBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactiveBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

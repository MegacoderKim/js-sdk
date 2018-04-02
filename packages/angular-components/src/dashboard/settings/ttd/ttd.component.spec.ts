import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TtdComponent } from './ttd.component';

describe('TtdComponent', () => {
  let component: TtdComponent;
  let fixture: ComponentFixture<TtdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TtdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TtdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

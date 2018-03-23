import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyRollComponent } from './key-roll.component';

describe('KeyRollComponent', () => {
  let component: KeyRollComponent;
  let fixture: ComponentFixture<KeyRollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyRollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyRollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

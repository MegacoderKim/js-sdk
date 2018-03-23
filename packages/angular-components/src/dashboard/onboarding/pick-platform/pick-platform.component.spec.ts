import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickPlatformComponent } from './pick-platform.component';

describe('PickPlatformComponent', () => {
  let component: PickPlatformComponent;
  let fixture: ComponentFixture<PickPlatformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickPlatformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

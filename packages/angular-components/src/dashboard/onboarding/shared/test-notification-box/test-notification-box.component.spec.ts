import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestNotificationBoxComponent } from './test-notification-box.component';

describe('TestNotificationBoxComponent', () => {
  let component: TestNotificationBoxComponent;
  let fixture: ComponentFixture<TestNotificationBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestNotificationBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestNotificationBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

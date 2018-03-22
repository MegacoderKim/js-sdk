import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotDeveloperBoxComponent } from './not-developer-box.component';

describe('NotDeveloperBoxComponent', () => {
  let component: NotDeveloperBoxComponent;
  let fixture: ComponentFixture<NotDeveloperBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotDeveloperBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotDeveloperBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

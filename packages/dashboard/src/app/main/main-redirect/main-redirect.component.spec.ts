import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainRedirectComponent } from './main-redirect.component';

describe('MainRedirectComponent', () => {
  let component: MainRedirectComponent;
  let fixture: ComponentFixture<MainRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainRedirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickstartAndroidComponent } from './quickstart-android.component';

describe('QuickstartAndroidComponent', () => {
  let component: QuickstartAndroidComponent;
  let fixture: ComponentFixture<QuickstartAndroidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickstartAndroidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickstartAndroidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

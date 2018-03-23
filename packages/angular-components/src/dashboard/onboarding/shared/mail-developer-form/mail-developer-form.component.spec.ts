import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailDeveloperFormComponent } from './mail-developer-form.component';

describe('MailDeveloperFormComponent', () => {
  let component: MailDeveloperFormComponent;
  let fixture: ComponentFixture<MailDeveloperFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailDeveloperFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailDeveloperFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

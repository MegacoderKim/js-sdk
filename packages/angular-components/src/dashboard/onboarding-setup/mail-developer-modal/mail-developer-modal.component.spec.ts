import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailDeveloperModalComponent } from './mail-developer-modal.component';

describe('IframeModalComponent', () => {
  let component: MailDeveloperModalComponent;
  let fixture: ComponentFixture<MailDeveloperModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MailDeveloperModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailDeveloperModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

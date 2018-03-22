import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaasAgreementComponent } from './saas-agreement.component';

describe('SaasAgreementComponent', () => {
  let component: SaasAgreementComponent;
  let fixture: ComponentFixture<SaasAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaasAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaasAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingBoxComponent } from './billing-box.component';

describe('BillingBoxComponent', () => {
  let component: BillingBoxComponent;
  let fixture: ComponentFixture<BillingBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

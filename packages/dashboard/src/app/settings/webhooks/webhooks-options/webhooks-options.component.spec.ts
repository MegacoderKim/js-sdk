import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebhooksOptionsComponent } from './webhooks-options.component';

describe('WebhooksOptionsComponent', () => {
  let component: WebhooksOptionsComponent;
  let fixture: ComponentFixture<WebhooksOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebhooksOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebhooksOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

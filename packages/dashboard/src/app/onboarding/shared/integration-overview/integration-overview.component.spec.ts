import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationOverviewComponent } from './integration-overview.component';

describe('IntegrationOverviewComponent', () => {
  let component: IntegrationOverviewComponent;
  let fixture: ComponentFixture<IntegrationOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegrationOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrationOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

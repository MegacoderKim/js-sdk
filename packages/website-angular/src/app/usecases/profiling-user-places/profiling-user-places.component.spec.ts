import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilingUserPlacesComponent } from './profiling-user-places.component';

describe('ProfilingUserPlacesComponent', () => {
  let component: ProfilingUserPlacesComponent;
  let fixture: ComponentFixture<ProfilingUserPlacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilingUserPlacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilingUserPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

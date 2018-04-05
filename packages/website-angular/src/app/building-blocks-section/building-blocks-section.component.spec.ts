import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingBlocksSectionComponent } from './building-blocks-section.component';

describe('BuildingBlocksSectionComponent', () => {
  let component: BuildingBlocksSectionComponent;
  let fixture: ComponentFixture<BuildingBlocksSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingBlocksSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingBlocksSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingBlocksPageComponent } from './building-blocks-page.component';

describe('BuildingBlocksPageComponent', () => {
  let component: BuildingBlocksPageComponent;
  let fixture: ComponentFixture<BuildingBlocksPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingBlocksPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingBlocksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

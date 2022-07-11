import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildRelationComponent } from './build-relation.component';

describe('BuildRelationComponent', () => {
  let component: BuildRelationComponent;
  let fixture: ComponentFixture<BuildRelationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildRelationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

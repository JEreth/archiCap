import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircumstanceCompareComponent } from './circumstance-compare.component';

describe('CircumstanceCompareComponent', () => {
  let component: CircumstanceCompareComponent;
  let fixture: ComponentFixture<CircumstanceCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircumstanceCompareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircumstanceCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

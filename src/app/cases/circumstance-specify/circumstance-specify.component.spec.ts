import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircumstanceSpecifyComponent } from './circumstance-specify.component';

describe('CircumstanceSpecifyComponent', () => {
  let component: CircumstanceSpecifyComponent;
  let fixture: ComponentFixture<CircumstanceSpecifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircumstanceSpecifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircumstanceSpecifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

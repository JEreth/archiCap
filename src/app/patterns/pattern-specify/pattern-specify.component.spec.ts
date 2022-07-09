import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternSpecifyComponent } from './pattern-specify.component';

describe('PatternSpecifyComponent', () => {
  let component: PatternSpecifyComponent;
  let fixture: ComponentFixture<PatternSpecifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatternSpecifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatternSpecifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

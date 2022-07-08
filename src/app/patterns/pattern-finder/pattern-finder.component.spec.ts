import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {PatternFinderComponent} from './pattern-finder.component';

describe('PatternFinderComponent', () => {
  let component: PatternFinderComponent;
  let fixture: ComponentFixture<PatternFinderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PatternFinderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

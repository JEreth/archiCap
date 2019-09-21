import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StageComponent} from './stage.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('StageComponent', () => {
  let component: StageComponent;
  let fixture: ComponentFixture<StageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

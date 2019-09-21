import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PatternEditComponent} from './pattern-edit.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../material.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('PatternEditComponent', () => {
  let component: PatternEditComponent;
  let fixture: ComponentFixture<PatternEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PatternEditComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        FormsModule,
        MaterialModule,
        RouterTestingModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WizardComponent} from './wizard.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('WizardComponent', () => {
  let component: WizardComponent;
  let fixture: ComponentFixture<WizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WizardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {SystemsComponent} from './systems.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';

describe('SystemsComponent', () => {
  let component: SystemsComponent;
  let fixture: ComponentFixture<SystemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SystemsComponent],
      imports: [
        FormsModule,
        MaterialModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

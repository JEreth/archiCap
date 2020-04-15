import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CapabilityListComponent} from './capability-list.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../material.module';
import {CapabilityService} from '../shared/capability.service';
import {CapabilityServiceMock} from '../shared/capability.service.mock';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSnackBarMock} from '../../../mocks';
import {RouterTestingModule} from '@angular/router/testing';

describe('CapabilityListComponent', () => {
  let component: CapabilityListComponent;
  let fixture: ComponentFixture<CapabilityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CapabilityListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        FormsModule,
        MaterialModule,
        RouterTestingModule
      ],
      providers: [
        {provide: CapabilityService, useClass: CapabilityServiceMock},
        {provide: MatSnackBar, useClass: MatSnackBarMock},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapabilityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

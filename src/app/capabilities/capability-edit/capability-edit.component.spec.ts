import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CapabilityEditComponent} from './capability-edit.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../material.module';
import {ActivatedRouteMock, MatSnackBarMock, RouterMock} from '../../../mocks';
import {ActivatedRoute, Router} from '@angular/router';
import {CapabilityService} from '../shared/capability.service';
import {MatSnackBar} from '@angular/material';
import {SystemService} from '../../systems/shared/system.service';
import {SystemServiceMock} from '../../systems/shared/system.service.mock';
import {CapabilityServiceMock} from '../shared/capability.service.mock';
import {RouterTestingModule} from '@angular/router/testing';

describe('CapabilityEditComponent', () => {
  let component: CapabilityEditComponent;
  let fixture: ComponentFixture<CapabilityEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CapabilityEditComponent],
      imports: [
        FormsModule,
        MaterialModule,
        RouterTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: Router, useClass: RouterMock},
        {provide: ActivatedRoute, useClass: ActivatedRouteMock},
        {provide: CapabilityService, useClass: CapabilityServiceMock},
        {provide: MatSnackBar, useClass: MatSnackBarMock},
        {provide: SystemService, useClass: SystemServiceMock},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapabilityEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

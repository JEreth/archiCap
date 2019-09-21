import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileComponent} from './profile.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {SystemServiceMock} from '../../systems/shared/system.service.mock';
import {CapabilityServiceMock} from '../../capabilities/shared/capability.service.mock';
import {CapabilityService} from '../../capabilities/shared/capability.service';
import {SystemService} from '../../systems/shared/system.service';
import {MatSnackBar} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {ProfileService} from '../../shared/profile.service';
import {DomSanitizerMock, MatSnackBarMock} from '../../../mocks';
import {ProfileServiceMock} from '../../shared/profile.service.mock';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provider: CapabilityService, useClass: CapabilityServiceMock},
        {provider: SystemService, useClass: SystemServiceMock},
        {provider: MatSnackBar, useClass: MatSnackBarMock},
        {provider: DomSanitizer, useClass: DomSanitizerMock},
        {provider: ProfileService, useClass: ProfileServiceMock}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

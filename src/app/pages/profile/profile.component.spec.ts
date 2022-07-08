import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {ProfileComponent} from './profile.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {SystemServiceMock} from '../../systems/shared/system.service.mock';
import {CapabilityServiceMock} from '../../capabilities/shared/capability.service.mock';
import {CapabilityService} from '../../capabilities/shared/capability.service';
import {SystemService} from '../../systems/shared/system.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DomSanitizer} from '@angular/platform-browser';
import {ProfileService} from '../../shared/profile.service';
import {DomSanitizerMock, MatSnackBarMock} from '../../../mocks';
import {ProfileServiceMock} from '../../shared/profile.service.mock';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../material.module';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        FormsModule,
        MaterialModule
      ],
      providers: [
        {provide: CapabilityService, useClass: CapabilityServiceMock},
        {provide: SystemService, useClass: SystemServiceMock},
        {provide: MatSnackBar, useClass: MatSnackBarMock},
        {provide: DomSanitizer, useClass: DomSanitizerMock},
        {provide: ProfileService, useClass: ProfileServiceMock}
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

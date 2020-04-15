import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ConfigurationComponent} from './configuration.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../material.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../../shared/configuration.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DomSanitizer} from '@angular/platform-browser';
import {ConfigurationServiceMock} from '../../shared/configuration.service.mock';
import {DomSanitizerMock, MatSnackBarMock} from '../../../mocks';

describe('ConfigurationComponent', () => {
  let component: ConfigurationComponent;
  let fixture: ComponentFixture<ConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigurationComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        MaterialModule
      ],
      providers: [
        {provide: ConfigurationService, useClass: ConfigurationServiceMock},
        {provide: MatSnackBar, useClass: MatSnackBarMock},
        {provide: DomSanitizer, useClass: DomSanitizerMock},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

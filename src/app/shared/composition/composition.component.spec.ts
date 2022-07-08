import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {CompositionComponent} from './composition.component';
import {MaterialModule} from '../../material.module';
import {FormsModule} from '@angular/forms';
import {ConfigurationService} from '../configuration.service';
import {ConfigurationServiceMock} from '../configuration.service.mock';
import {SystemService} from '../../systems/shared/system.service';
import {SystemServiceMock} from '../../systems/shared/system.service.mock';
import {MatDialog} from '@angular/material/dialog';
import {MatDialogMock} from '../../../mocks';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('CompositionComponent', () => {
  let component: CompositionComponent;
  let fixture: ComponentFixture<CompositionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CompositionComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        MaterialModule,
        FormsModule
      ],
      providers: [
        {provide: ConfigurationService, useClass: ConfigurationServiceMock},
        {provide: SystemService, useClass: SystemServiceMock},
        {provide: MatDialog, useClass: MatDialogMock},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

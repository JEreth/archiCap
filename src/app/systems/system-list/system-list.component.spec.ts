import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {SystemListComponent} from './system-list.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../material.module';
import {RouterTestingModule} from '@angular/router/testing';
import {SystemServiceMock} from '../shared/system.service.mock';
import {MatSnackBarMock} from '../../../mocks';
import {SystemService} from '../shared/system.service';
import {MatSnackBar} from '@angular/material/snack-bar';

describe('SystemListComponent', () => {
  let component: SystemListComponent;
  let fixture: ComponentFixture<SystemListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SystemListComponent],
      imports: [
        FormsModule,
        MaterialModule,
        RouterTestingModule
      ],
      providers: [
        {provide: SystemService, useClass: SystemServiceMock},
        {provide: MatSnackBar, useClass: MatSnackBarMock},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

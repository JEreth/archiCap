import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CategoryEditComponent} from './category-edit.component';
import {ActivatedRouteMock, MatSnackBarMock, RouterMock} from '../../../mocks';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../shared/category.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SystemService} from '../../systems/shared/system.service';
import {CategoryServiceMock} from '../shared/category.service.mock';
import {SystemServiceMock} from '../../systems/shared/system.service.mock';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../material.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('CategoryEditComponent', () => {
  let component: CategoryEditComponent;
  let fixture: ComponentFixture<CategoryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryEditComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        FormsModule,
        MaterialModule,
        RouterTestingModule
      ],
      providers: [
        {provide: Router, useClass: RouterMock},
        {provide: ActivatedRoute, useClass: ActivatedRouteMock},
        {provide: CategoryService, useClass: CategoryServiceMock},
        {provide: MatSnackBar, useClass: MatSnackBarMock},
        {provide: SystemService, useClass: SystemServiceMock},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

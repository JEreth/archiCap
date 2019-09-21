import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CategoryListComponent} from './category-list.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MatSnackBarMock} from '../../../mocks';
import {CategoryService} from '../shared/category.service';
import {MatSnackBar} from '@angular/material';
import {CategoryServiceMock} from '../shared/category.service.mock';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../material.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('CategoryListComponent', () => {
  let component: CategoryListComponent;
  let fixture: ComponentFixture<CategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        FormsModule,
        MaterialModule,
        RouterTestingModule
      ],
      providers: [
        {provide: CategoryService, useClass: CategoryServiceMock},
        {provide: MatSnackBar, useClass: MatSnackBarMock},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ProductEditComponent} from './product-edit.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../material.module';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRouteMock, MatSnackBarMock, RouterMock} from '../../../mocks';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../shared/product.service';
import {MatSnackBar} from '@angular/material';
import {SystemService} from '../../systems/shared/system.service';
import {ProductServiceMock} from '../shared/product.service.mock';
import {SystemServiceMock} from '../../systems/shared/system.service.mock';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('ProductEditComponent', () => {
  let component: ProductEditComponent;
  let fixture: ComponentFixture<ProductEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductEditComponent],
      imports: [
        FormsModule,
        MaterialModule,
        RouterTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: Router, useClass: RouterMock},
        {provide: ActivatedRoute, useClass: ActivatedRouteMock},
        {provide: ProductService, useClass: ProductServiceMock},
        {provide: MatSnackBar, useClass: MatSnackBarMock},
        {provide: SystemService, useClass: SystemServiceMock},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

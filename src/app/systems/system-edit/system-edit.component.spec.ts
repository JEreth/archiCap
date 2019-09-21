import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SystemEditComponent} from './system-edit.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../material.module';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteMock, MatSnackBarMock, RouterMock} from '../../../mocks';
import {CategoryService} from '../../categories/shared/category.service';
import {SystemService} from '../shared/system.service';
import {ProductService} from '../../products/shared/product.service';
import {PatternService} from '../../patterns/shared/pattern.service';
import {CapabilityService} from '../../capabilities/shared/capability.service';
import {MatSnackBar} from '@angular/material';
import {CategoryServiceMock} from '../../categories/shared/category.service.mock';
import {SystemServiceMock} from '../shared/system.service.mock';
import {PatternServiceMock} from '../../patterns/shared/pattern.service.mock';
import {ProductServiceMock} from '../../products/shared/product.service.mock';
import {CapabilityServiceMock} from '../../capabilities/shared/capability.service.mock';

describe('SystemEditComponent', () => {
  let component: SystemEditComponent;
  let fixture: ComponentFixture<SystemEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SystemEditComponent],
      imports: [
        FormsModule,
        MaterialModule,
        RouterTestingModule
      ],
      providers: [
        {provide: Router, useClass: RouterMock},
        {provide: ActivatedRoute, useClass: ActivatedRouteMock},
        {provide: CategoryService, useClass: CategoryServiceMock},
        {provide: SystemService, useClass: SystemServiceMock},
        {provide: ProductService, useClass: ProductServiceMock},
        {provide: PatternService, useClass: PatternServiceMock},
        {provide: CapabilityService, useClass: CapabilityServiceMock},
        {provide: MatSnackBar, useClass: MatSnackBarMock},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

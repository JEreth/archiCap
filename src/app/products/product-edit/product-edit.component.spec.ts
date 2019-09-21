import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductEditComponent} from './product-edit.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../material.module';
import {RouterTestingModule} from '@angular/router/testing';

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

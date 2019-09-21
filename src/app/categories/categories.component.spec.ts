import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CategoriesComponent} from './categories.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriesComponent],
      imports: [
        FormsModule,
        MaterialModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

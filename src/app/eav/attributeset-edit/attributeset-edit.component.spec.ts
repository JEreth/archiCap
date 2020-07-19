import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AttributesetEditComponent} from './attributeset-edit.component';

describe('AttributesetEditComponent', () => {
  let component: AttributesetEditComponent;
  let fixture: ComponentFixture<AttributesetEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AttributesetEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributesetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AttributesetListComponent} from './attributeset-list.component';

describe('AttributesetListComponent', () => {
  let component: AttributesetListComponent;
  let fixture: ComponentFixture<AttributesetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AttributesetListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributesetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

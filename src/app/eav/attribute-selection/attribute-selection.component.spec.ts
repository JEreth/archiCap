import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AttributeSelectionComponent} from './attribute-selection.component';

describe('AttributeSelectionComponent', () => {
  let component: AttributeSelectionComponent;
  let fixture: ComponentFixture<AttributeSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AttributeSelectionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapabilityEditComponent } from './capability-edit.component';

describe('CapabilityEditComponent', () => {
  let component: CapabilityEditComponent;
  let fixture: ComponentFixture<CapabilityEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapabilityEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapabilityEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CapabilitySpecifyComponent} from './capability-specify.component';

describe('CapabilitySpecifyComponent', () => {
  let component: CapabilitySpecifyComponent;
  let fixture: ComponentFixture<CapabilitySpecifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CapabilitySpecifyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapabilitySpecifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

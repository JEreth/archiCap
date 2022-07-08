import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {CapabilityInfoComponent} from './capability-info.component';

describe('CapabilityInfoComponent', () => {
  let component: CapabilityInfoComponent;
  let fixture: ComponentFixture<CapabilityInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CapabilityInfoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapabilityInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

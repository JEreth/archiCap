import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {EavComponent} from './eav.component';

describe('EavComponent', () => {
  let component: EavComponent;
  let fixture: ComponentFixture<EavComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EavComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

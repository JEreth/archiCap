import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SystemSpecifyComponent} from './system-specify.component';

describe('SystemSpecifyComponent', () => {
  let component: SystemSpecifyComponent;
  let fixture: ComponentFixture<SystemSpecifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SystemSpecifyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemSpecifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

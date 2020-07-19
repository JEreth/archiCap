import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EavComponent} from './eav.component';

describe('EavComponent', () => {
  let component: EavComponent;
  let fixture: ComponentFixture<EavComponent>;

  beforeEach(async(() => {
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

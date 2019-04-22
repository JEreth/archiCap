import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemEditComponent } from './system-edit.component';

describe('SystemEditComponent', () => {
  let component: SystemEditComponent;
  let fixture: ComponentFixture<SystemEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

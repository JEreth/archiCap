import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {PatternListComponent} from './pattern-list.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../material.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('PatternListComponent', () => {
  let component: PatternListComponent;
  let fixture: ComponentFixture<PatternListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PatternListComponent],
      imports: [
        FormsModule,
        MaterialModule,
        RouterTestingModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

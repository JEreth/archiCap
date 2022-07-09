import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemCompareComponent } from './system-compare.component';

describe('SystemCompareComponent', () => {
  let component: SystemCompareComponent;
  let fixture: ComponentFixture<SystemCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemCompareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

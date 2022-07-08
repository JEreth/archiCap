import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {ExploreComponent} from './explore.component';
import {ConfigurationService} from '../../shared/configuration.service';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ConfigurationServiceMock} from '../../shared/configuration.service.mock';
import {CompositionModule} from '../../shared/composition/composition.module';
import {MaterialModule} from '../../material.module';

describe('ExploreComponent', () => {
  let component: ExploreComponent;
  let fixture: ComponentFixture<ExploreComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ExploreComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        CompositionModule,
        MaterialModule
      ],
      providers: [
        {provide: ConfigurationService, useClass: ConfigurationServiceMock}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {TestBed} from '@angular/core/testing';

import {ConfigurationService} from './configuration.service';
import {CapabilityService} from '../capabilities/shared/capability.service';
import {CategoryService} from '../categories/shared/category.service';
import {PatternService} from '../patterns/shared/pattern.service';
import {ProductService} from '../products/shared/product.service';
import {DataService} from './data.service';
import {SystemService} from '../systems/shared/system.service';
import {CapabilityServiceMock} from '../capabilities/shared/capability.service.mock';
import {CategoryServiceMock} from '../categories/shared/category.service.mock';
import {PatternServiceMock} from '../patterns/shared/pattern.service.mock';
import {ProductServiceMock} from '../products/shared/product.service.mock';
import {DataServiceMock} from './data.service.mock';
import {SystemServiceMock} from '../systems/shared/system.service.mock';

describe('ConfigurationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: CapabilityService, useClass: CapabilityServiceMock},
      {provide: CategoryService, useClass: CategoryServiceMock},
      {provide: PatternService, useClass: PatternServiceMock},
      {provide: ProductService, useClass: ProductServiceMock},
      {provide: DataService, useClass: DataServiceMock},
      {provide: SystemService, useClass: SystemServiceMock},
    ]
  }));

  it('should be created', () => {
    const service: ConfigurationService = TestBed.get(ConfigurationService);
    expect(service).toBeTruthy();
  });
});

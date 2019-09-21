import {TestBed} from '@angular/core/testing';

import {CapabilityService} from './capability.service';
import {DataService} from '../../shared/data.service';
import {DataServiceMock} from '../../shared/data.service.mock';

describe('CapabilityService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: DataService, useClass: DataServiceMock},
    ]
  }));

  it('should be created', () => {
    const service: CapabilityService = TestBed.get(CapabilityService);
    expect(service).toBeTruthy();
  });
});

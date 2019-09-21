import {TestBed} from '@angular/core/testing';

import {SystemService} from './system.service';
import {DataService} from '../../shared/data.service';
import {DataServiceMock} from '../../shared/data.service.mock';

describe('SystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provider: DataService, useClass: DataServiceMock}
    ]
  }));

  it('should be created', () => {
    const service: SystemService = TestBed.get(SystemService);
    expect(service).toBeTruthy();
  });
});

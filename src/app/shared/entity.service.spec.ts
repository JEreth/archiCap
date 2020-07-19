import {TestBed} from '@angular/core/testing';
import {EntityService} from './entity.service';
import {DataService} from './data.service';
import {DataServiceMock} from './data.service.mock';

describe('EntityService', () => {
  let service: EntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provider: DataService, useClass: DataServiceMock}
      ]
    });
    service = TestBed.inject(EntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

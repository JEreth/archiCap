import {TestBed} from '@angular/core/testing';

import {ProfileService} from './profile.service';
import {DataService} from './data.service';
import {DataServiceMock} from './data.service.mock';

describe('ProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provider: DataService, useClass: DataServiceMock}
    ]
  }));

  it('should be created', () => {
    const service: ProfileService = TestBed.get(ProfileService);
    expect(service).toBeTruthy();
  });
});

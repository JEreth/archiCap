import {TestBed} from '@angular/core/testing';

import {DataService} from './data.service';
import {LocalStorage} from '@ngx-pwa/local-storage';
import {LocalStorageMock} from '../../mocks';

describe('DataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: LocalStorage, useClass: LocalStorageMock}
    ]
  }));

  it('should be created', () => {
    const service: DataService = TestBed.get(DataService);
    expect(service).toBeTruthy();
  });
});

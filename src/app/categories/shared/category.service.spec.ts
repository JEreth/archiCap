import {TestBed} from '@angular/core/testing';

import {CategoryService} from './category.service';
import {DataService} from '../../shared/data.service';
import {DataServiceMock} from '../../shared/data.service.mock';

describe('CategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provider: DataService, useClass: DataServiceMock}
    ]
  }));

  it('should be created', () => {
    const service: CategoryService = TestBed.get(CategoryService);
    expect(service).toBeTruthy();
  });
});

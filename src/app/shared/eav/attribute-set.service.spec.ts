import { TestBed } from '@angular/core/testing';

import { AttributeSetService } from './attribute-set.service';

describe('AttributeSetService', () => {
  let service: AttributeSetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttributeSetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

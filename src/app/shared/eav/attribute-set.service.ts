import { Injectable } from '@angular/core';
import {EntityService} from '../entity.service';
import {DataService} from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class AttributeSetService extends EntityService {

  public entityCode = 'attributeSets';

  constructor(protected data: DataService) {
    super(data);
  }
}

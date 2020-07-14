import { Injectable } from '@angular/core';
import {EntityService} from '../entity.service';
import {DataService} from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class AttributeService extends EntityService  {

  public entityCode = 'attributes';

  constructor(protected data: DataService) {
    super(data);
  }
}

import { Injectable } from '@angular/core';
import {EntityService} from '../../shared/entity.service';
import {DataService} from '../../shared/data.service';

@Injectable({
  providedIn: 'root'
})
export class CaseService extends EntityService {

  public entityCode = 'cases';

  constructor(protected data: DataService) {
    super(data);
  }
}

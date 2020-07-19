import {Injectable} from '@angular/core';
import {EntityService} from '../../shared/entity.service';
import {DataService} from '../../shared/data.service';

@Injectable({
  providedIn: 'root'
})
export class AttributeSetService extends EntityService {

  public entityCode = 'attributeSets';

  constructor(protected data: DataService) {
    super(data);
  }
}

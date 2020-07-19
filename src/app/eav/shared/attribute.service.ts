import {Injectable} from '@angular/core';
import {EntityService} from '../../shared/entity.service';
import {DataService} from '../../shared/data.service';

@Injectable({
  providedIn: 'root'
})
export class AttributeService extends EntityService {

  public entityCode = 'attributes';

  constructor(protected data: DataService) {
    super(data);
  }
}

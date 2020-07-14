import {Injectable} from '@angular/core';
import {EntityService} from '../../shared/entity.service';
import {DataService} from '../../shared/data.service';

@Injectable({
  providedIn: 'root'
})
export class SystemService extends EntityService {

  public entityCode = 'systems';

  constructor(protected data: DataService) {
    super(data);
  }
}

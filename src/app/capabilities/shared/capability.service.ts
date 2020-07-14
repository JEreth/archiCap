import {Injectable} from '@angular/core';
import {EntityService} from '../../shared/entity.service';
import {DataService} from '../../shared/data.service';


@Injectable({
  providedIn: 'root'
})
export class CapabilityService extends EntityService {

  public entityCode = 'capabilities';

  constructor(data: DataService) {
    super(data);
  }

}

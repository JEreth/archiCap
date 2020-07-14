import {Injectable} from '@angular/core';
import {EntityService} from '../../shared/entity.service';
import {DataService} from '../../shared/data.service';

@Injectable({
  providedIn: 'root'
})
export class PatternService extends EntityService {

  public entityCode = 'pattern';

  constructor(protected data: DataService) {
    super(data);
  }
}

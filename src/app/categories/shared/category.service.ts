import {Injectable} from '@angular/core';
import {EntityService} from '../../shared/entity.service';
import {DataService} from '../../shared/data.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends EntityService {

  public entityCode = 'categories';

  constructor(protected data: DataService) {
    super(data);
  }
}

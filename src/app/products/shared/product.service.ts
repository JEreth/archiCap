import {Injectable} from '@angular/core';
import {EntityService} from '../../shared/entity.service';
import {DataService} from '../../shared/data.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends EntityService {

  public entityCode = 'products';

  constructor(protected data: DataService) {
    super(data);
  }
}

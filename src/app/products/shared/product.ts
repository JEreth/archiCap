import {Entity} from '../../shared/entity.service';

export interface Product extends Entity {
  name: string;
  description?: string;
}

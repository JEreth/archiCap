import {Entity} from '../../shared/entity.service';

export interface Category extends Entity {
  id?: string;
  name: string;
  description?: string;
}

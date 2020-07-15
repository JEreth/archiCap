import {Entity} from '../../shared/entity.service';

export interface Category extends Entity {
  name: string;
  description?: string;
}

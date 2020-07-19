import {Entity} from '../../shared/entity.service';

export interface System extends Entity {
  name: string;
  description?: string;
  attributeSet: string;
  relevant?: boolean;
  categories: string[];
  products: string[];
  substitutions?: string[];
}

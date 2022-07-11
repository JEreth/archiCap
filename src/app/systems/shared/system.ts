import {Entity} from '../../shared/entity.service';
import {AttributeSelection} from '../../eav/shared/models';

export interface System extends Entity {
  name: string;
  description?: string;
  attributeSet: string;
  attributeSelection: AttributeSelection[];
  relevant?: boolean;
  categories: string[];
  products: string[];
  substitutions?: string[];
  basedOnSystems?: {
    case: string;
    index: number;
  }[]
}

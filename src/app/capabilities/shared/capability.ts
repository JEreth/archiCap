import {Entity} from '../../shared/entity.service';
import {AttributeSelection} from '../../eav/shared/models';

export interface Capability extends Entity {
  id?: string;
  name: string;
  description?: string;
  category: string;
  attributeSet: string;
  attributeSelection: AttributeSelection[];
  basedOnCircumstances?: {
    case: string;
    index: number;
  }[]
}

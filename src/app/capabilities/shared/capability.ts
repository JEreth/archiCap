import {Entity} from '../../shared/entity.service';

export interface Capability extends Entity {
  id?: string;
  name: string;
  description?: string;
  attributeSet: string;
}

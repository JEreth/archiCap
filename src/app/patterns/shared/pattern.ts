import {Entity} from '../../shared/entity.service';

export interface Pattern extends Entity {
  name: string;
  description?: string;
  capabilities: string[];
  systems: string[];
}

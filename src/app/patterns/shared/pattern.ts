import {Entity} from '../../shared/entity.service';
import {AttributeSelection} from '../../eav/shared/models';

export interface Pattern extends Entity {
  name: string;
  description?: string;
  componentType: string;
  componentSelection: AttributeSelection[];
  capabilityType: string;
  capabilitySelection: AttributeSelection[];
  capabilities: string[]; // capabilities that this pattern is based on
  systems: string[]; // components that this pattern is based on
}

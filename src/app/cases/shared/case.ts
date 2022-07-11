import {Entity} from '../../shared/entity.service';
import {AttributeSelection} from '../../eav/shared/models';

export interface Circumstance {
  description?: string;
  category: string;
  attributeSet: string;
  attributeSelection: AttributeSelection[];
  systems: number[];
}

export interface CaseSystem {
  description?: string;
  attributeSet: string;
  attributeSelection: AttributeSelection[];
}

export interface Case extends Entity {
  id?: string;
  name: string;
  description?: string;
  circumstances: Circumstance[];
  systems: CaseSystem[];
}

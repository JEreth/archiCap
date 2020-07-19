import {Entity} from '../../shared/entity.service';

export interface AttributeSet extends Entity {
  name: string;
  description?: string;
  attributes: string[];
  type: 'capability' | 'component';
}

// An attribute has a label and different values that can be selected
export interface Attribute extends Entity {
  name: string;
  description?: string;
  values: string[];
  type: 'capability' | 'component';
}

export interface AttributeSelection {
  attribute: string;
  value: string;
}

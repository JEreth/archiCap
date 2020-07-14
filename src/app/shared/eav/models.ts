import {Entity} from '../entity.service';

export interface AttributeSet extends Entity {
  label: string;
  description?: string;
  attributes: string[];
  type: 'capability' | 'component';
}

// An attribute has a label and different values that can be selected
export interface Attribute extends Entity {
  label: string;
  description?: string;
  values: string[];
}


import {System} from '../../systems/shared/system';

export interface Category {
  id?: number;
  name: string;
  description?: string;
  systems?: System[];
}

import {Category} from '../../categories/shared/category';
import {Product} from '../../products/shared/product';

export interface System {
  id: number;
  name: string;
  description: string;
  categories?: Category[];
  products?: Product[];
}

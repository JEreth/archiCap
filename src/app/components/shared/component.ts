import {Product} from '../../products/shared/product';
import {Category} from '../../categories/shared/category';

export interface Component {
  id: number;
  name: string;
  description: string;
  categories?: Category[];
  products?: Product[];
}

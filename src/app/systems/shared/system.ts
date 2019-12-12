import {Category} from '../../categories/shared/category';
import {Product} from '../../products/shared/product';
import {Pattern} from '../../patterns/shared/pattern';
import {Capability} from '../../capabilities/shared/capability';

export interface System {
  id: number;
  name: string;
  description?: string;
  relevant?: boolean;
  categories: Category[];
  products: Product[];
  patterns: Pattern[];
  capabilities: Capability[];
  substitutions: System[];
}

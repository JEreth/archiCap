import {System} from '../../systems/shared/system';

export interface Capability {
  id: number;
  name: string;
  description: string;
  components: System[];
}

import {Component} from '../../components/shared/component';

export interface Capability {
  id: number;
  name: string;
  description: string;
  components: Component[];
}

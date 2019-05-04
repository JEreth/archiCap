import {Component, Input, OnInit} from '@angular/core';
import {System} from '../shared/system';
import {Capability} from '../../capabilities/shared/capability';
import {Category} from '../../categories/shared/category';
import {Pattern} from '../../patterns/shared/pattern';
import {Product} from '../../products/shared/product';

@Component({
  selector: 'app-composition',
  templateUrl: './composition.component.html',
  styleUrls: ['./composition.component.scss']
})
export class CompositionComponent implements OnInit {

  // systems and capabilities to visualize, we receive them from the page where this component is embeded
  @Input() relevantSystems: System[];
  @Input() reevantCapabilities: Capability[];

  // get current configuration
  public capabilites: Capability[];
  public systems: System[];
  public categories: Category[];
  public patterns: Pattern[];
  public products: Product[];


  constructor() {

    // load stuff


  }

  ngOnInit() {
  }

}

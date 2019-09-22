import {Component, OnInit} from '@angular/core';
import {Capability} from '../../capabilities/shared/capability';
import {CapabilityService} from '../../capabilities/shared/capability.service';
import {ProfileService} from '../../shared/profile.service';
import {SystemService} from '../../systems/shared/system.service';
import {System} from '../../systems/shared/system';
import {Pattern} from '../../patterns/shared/pattern';
import {Product} from '../../products/shared/product';
import {PatternService} from '../../patterns/shared/pattern.service';
import {ProductService} from '../../products/shared/product.service';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {

  public selectedSystems: number[];
  public selectedCapabilities: number[];
  public selectedPatterns: number[];
  public selectedProducts: number[];

  public capabilities: Capability[] = [];
  public systems: System[] = [];
  public patterns: Pattern[] = [];
  public products: Product[] = [];

  public working = true;

  constructor(private capabilityService: CapabilityService,
              private systemService: SystemService,
              private patterService: PatternService,
              private productService: ProductService,
              private profile: ProfileService) {

    this.capabilityService.getAllAsArray().subscribe(capabilities => {
      this.capabilities = capabilities;
    });

    this.systemService.getAllAsArray().subscribe(systems => {
      this.systems = systems;
    });

    this.patterService.getAllAsArray().subscribe(systems => {
      this.patterns = systems;
    });

    this.productService.getAllAsArray().subscribe(systems => {
      this.products = systems;
    });

    this.profile.init().subscribe(() => {
      this.selectedSystems = this.profile.selectedSystems;
      this.selectedCapabilities = this.profile.selectedCapabilities;
      this.working = false;
    });

  }

  save() {
    this.working = true;
    this.profile.selectedSystems = this.selectedSystems;
    this.profile.selectedCapabilities = this.selectedCapabilities;
    this.profile.persist().subscribe(() => {
      this.working = false;
    });
  }

  selectAdequateComponentsByPatterns() {
    this.working = true;
    this.systemService.findManyFromRelation('patterns', this.selectedPatterns).subscribe(r => {
      this.selectedSystems = r.map(a => a.id);
      this.save();
    });
  }

  selectAdequateComponentsByProducts() {
    this.working = true;
    this.systemService.findManyFromRelation('products', this.selectedProducts).subscribe(r => {
      this.selectedSystems = r.map(a => a.id);
      this.save();
    });
  }

  ngOnInit() {
  }

}

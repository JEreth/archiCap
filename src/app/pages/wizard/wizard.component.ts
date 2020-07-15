import {Component, OnInit} from '@angular/core';
import {Capability} from '../../capabilities/shared/capability';
import {CapabilityService} from '../../capabilities/shared/capability.service';
import {Profile, ProfileService} from '../../shared/profile.service';
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

  public profile: Profile;

  public capabilities: Capability[] = [];
  public systems: System[] = [];
  public patterns: Pattern[] = [];
  public products: Product[] = [];

  public working = true;

  constructor(private capabilityService: CapabilityService,
              private systemService: SystemService,
              private patterService: PatternService,
              private productService: ProductService,
              private profileService: ProfileService) {
  }

  async save() {
    this.working = true;
    /*this.profile.systems = this.selectedSystems;
    this.profile.capabilities = this.selectedCapabilities;
    this.profile.products = this.selectedProducts; */
    await this.profileService.persist();
    this.working = false;
  }

  async ngOnInit() {
    this.capabilities = (await this.capabilityService.all()) as Capability[];
    this.systems = (await this.systemService.all()) as System[];
    this.patterns = (await this.patterService.all()) as Pattern[];
    this.products = (await this.productService.all()) as Product[];
    this.profile = await this.profileService.get();
    this.working = false;
  }

  selectAdequateComponentsByPatterns() {
    /*this.working = true;
    this.systemService.findManyFromRelation('patterns', this.selectedPatterns).subscribe(r => {
      this.selectedSystems = r.map(a => a.id);
      this.save();
    });*/
  }

  selectAdequateComponentsByProducts() {
    /*this.working = true;
    this.systemService.findManyFromRelation('products', this.selectedProducts).subscribe(r => {
      this.selectedSystems = r.map(a => a.id);
      this.save();
    });*/
  }

}

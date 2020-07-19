import {Injectable} from '@angular/core';
import {CapabilityService} from '../capabilities/shared/capability.service';
import {PatternService} from '../patterns/shared/pattern.service';
import {ProductService} from '../products/shared/product.service';
import {SystemService} from '../systems/shared/system.service';
import {CategoryService} from '../categories/shared/category.service';
import {Capability} from '../capabilities/shared/capability';
import {Category} from '../categories/shared/category';
import {Pattern} from '../patterns/shared/pattern';
import {Product} from '../products/shared/product';
import {System} from '../systems/shared/system';
import {Attribute, AttributeSet} from '../eav/shared/models';
import {AttributeService} from '../eav/shared/attribute.service';
import {AttributeSetService} from "../eav/shared/attribute-set.service";

export interface Configuration {
  capabilities: Capability[];
  categories: Category[];
  patterns: Pattern[];
  products: Product[];
  systems: System[];
  attributeSets: AttributeSet[];
  attributes: Attribute[];
}

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(private capabilityService: CapabilityService,
              private categoryService: CategoryService,
              private patternService: PatternService,
              private productService: ProductService,
              private systemService: SystemService,
              private attributeService: AttributeService,
              private attributeSetService: AttributeSetService
  ) {
  }

  // load current setup and save to json file
  async export(): Promise<string> {
    return JSON.stringify(await this.get());
  }

  async import(input: any): Promise<boolean> {
    try {
      await this.capabilityService.add(input.capabilities || [], true, true);
      await this.categoryService.add(input.categories || [], true, true);
      await this.patternService.add(input.patterns || [], true, true);
      await this.productService.add(input.products || [], true, true);
      await this.systemService.add(input.systems || [], true, true);
      await this.attributeSetService.add(input.attributeSets || [], true, true);
      await this.attributeService.add(input.attributes || [], true, true);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  // Build configuration entity from different services
  async get(): Promise<Configuration> {
    return {
      capabilities: (await this.capabilityService.all()) as Capability[],
      categories: (await this.categoryService.all()) as Category[],
      patterns: (await this.patternService.all()) as Pattern[],
      products: (await this.productService.all()) as Product[],
      systems: (await this.systemService.all()) as System[],
      attributes: (await this.attributeService.all()) as Attribute[],
      attributeSets: (await this.attributeSetService.all()) as AttributeSet[],
    } as Configuration;
  }

  // reset current configuration
  async reset(): Promise<boolean> {
    try {
      await this.capabilityService.reset();
      await this.categoryService.reset();
      await this.patternService.reset();
      await this.productService.reset();
      await this.systemService.reset();
      await this.attributeService.reset();
      await this.attributeSetService.reset();
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  validate(input: any): boolean {
    // we only check for the major properties here. Might be better to make a in-depth validation
    return (input &&
      input.capabilities && Array.isArray(input.capabilities) &&
      input.categories && Array.isArray(input.categories) &&
      input.patterns && Array.isArray(input.patterns) &&
      input.products && Array.isArray(input.products) &&
      input.attributes && Array.isArray(input.attributes) &&
      input.attributeSets && Array.isArray(input.attributeSets) &&
      input.systems && Array.isArray(input.systems));
  }
}

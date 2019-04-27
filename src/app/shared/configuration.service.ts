import { Injectable } from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
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
import {DataService} from './data.service';

export interface ConfigurationPersistence {
  capabilities: Capability[];
  categories: Category[];
  patterns: Pattern[];
  products: Product[];
  systems: System[];
}

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(private capabilityService: CapabilityService,
              private categoryService: CategoryService,
              private patternService: PatternService,
              private productService: ProductService,
              private dataService: DataService,
              private systemService: SystemService) { }

  // load current setup and save to json file
  exportToJson(): Observable<string> {
    return new Observable<string>((observer) => {
      const queue = [
        this.capabilityService.getAllAsArray(),
        this.categoryService.getAllAsArray(),
        this.patternService.getAllAsArray(),
        this.productService.getAllAsArray(),
        this.systemService.getAllAsArray()
      ];
      forkJoin(queue).subscribe(results => {
        const persistence: ConfigurationPersistence = {
          capabilities: <Capability[]>results[0],
          categories: <Category[]>results[1],
          patterns: <Pattern[]>results[2],
          products: <Product[]>results[3],
          systems: <System[]>results[4]
        };

        observer.next(JSON.stringify(persistence));
        observer.complete();
      });
    });
  }

  importFromPersistence(input: ConfigurationPersistence): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      const queue = [
        this.capabilityService.set(input.capabilities || []),
        this.categoryService.set(input.categories || []),
        this.patternService.set(input.patterns || []),
        this.productService.set(input.products || []),
        this.systemService.set(input.systems || []),
      ];
      forkJoin(queue).subscribe(() => {
        observer.next(true);
        observer.complete();
      });
    });
  }

  // reset current configuratuon
  reset(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      const queue = [
        this.capabilityService.set([]),
        this.categoryService.set([]),
        this.patternService.set([]),
        this.productService.set([]),
        this.systemService.set([]),
      ];
      forkJoin(queue).subscribe(() => {
        observer.next(true);
        observer.complete();
      });
    });
  }

  validate(input: any): boolean {
    // we only check for the major properties here. Might be better to make a in-depth validation
    return (input &&
      input.capabilities && typeof(input.capabilities) === 'object' &&
      input.categories && typeof(input.categories) === 'object' &&
      input.patterns && typeof(input.patterns) === 'object' &&
      input.products && typeof(input.products) === 'object' &&
      input.systems && typeof(input.systems) === 'object');
  }
}
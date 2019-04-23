import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {System} from '../shared/system';
import {SystemService} from '../shared/system.service';
import {Category} from '../../categories/shared/category';
import {CategoryService} from '../../categories/shared/category.service';
import {ProductService} from '../../products/shared/product.service';
import {Product} from '../../products/shared/product';
import {PatternService} from '../../patterns/shared/pattern.service';
import {Capability} from '../../capabilities/shared/capability';
import {CapabilityService} from '../../capabilities/shared/capability.service';
import {Pattern} from '../../patterns/shared/pattern';

@Component({
  selector: 'app-system-edit',
  templateUrl: './system-edit.component.html',
  styleUrls: ['./system-edit.component.scss']
})
export class SystemEditComponent implements OnInit {

  public system: System;
  public categories: Category[] = [];
  public products: Product[] = [];
  public patterns: Pattern[] = [];
  public capabilities: Capability[] = [];


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private systemService: SystemService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private patternService: PatternService,
    private capabilityService: CapabilityService,
    private snackBar: MatSnackBar

  ) {
    // get all available categories
    this.categoryService.getAllAsArray().subscribe( categories => {
      this.categories = categories;
    });

    // get all available products
    this.productService.getAllAsArray().subscribe( products => {
      this.products = products;
    });

    // get all available patterns
    this.patternService.getAllAsArray().subscribe( patterns => {
      this.patterns = patterns;
    });

    // get all available capabilites
    this.capabilityService.getAllAsArray().subscribe( capabilities => {
      this.capabilities = capabilities;
    });

    // get the id from the path and load system if set
    const id = this.route.snapshot.paramMap.get('id');
    const systemId: number = Number(id);
    if (id === 'new') {
      this.system = <System>{name: '', description: '', categories: [], products: [], capabilities: [], patterns: []};
    } else {
      this.systemService.get(systemId).subscribe( c => {
        if (c) {
          this.system = <System> c;
        } else {
          this.system = <System>{name: '', description: '', categories: [], products: [], capabilities: [], patterns: []};
        }
      });
    }
  }

  categorySelected(c1: Category, c2: Category): boolean {
    return (c1.id === c2.id);
  }

  productSelected(p1: Product, p2: Product): boolean {
    return (p1.id === p2.id);
  }

  ngOnInit() {
  }

  save() {
    this.systemService.add(this.system).subscribe( () => {
      this.snackBar.open('System was successfully saved');
      this.router.navigateByUrl('/components');
    });
  }
}

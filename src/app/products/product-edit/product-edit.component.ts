import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ProductService} from '../shared/product.service';
import {Product} from '../shared/product';
import {System} from '../../systems/shared/system';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {SystemService} from '../../systems/shared/system.service';
import {Category} from "../../categories/shared/category";
import {Configuration, ConfigurationService} from "../../shared/configuration.service";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  public form: UntypedFormGroup;
  public product: Product = {name: '', description: ''};
  public relatedSystems: System[] = [];
  public configuration: Configuration;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private formBuilder: UntypedFormBuilder,
    private systemService: SystemService,
    private configurationService: ConfigurationService
  ) {
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.product = (await this.productService.get(id)) as Product || this.product;
      this.relatedSystems = await (this.systemService.findBy(id, 'products')) as System[];
    }
    this.configuration = await this.configurationService.get();
    this.form = this.formBuilder.group({
      name: [this.product.name, Validators.required],
      description: [this.product.description]
    });
  }

  async save() {
    this.product = {...this.product, ...this.form.value};
    if (await this.productService.add(this.product)) {
      // update relations
      await this.systemService.relate(this.relatedSystems, this.product, 'products');
      this.snackBar.open('Product was successfully saved');
      await this.router.navigateByUrl('/products');
    } else {
      this.snackBar.open('There has been an error');
    }
  }

}

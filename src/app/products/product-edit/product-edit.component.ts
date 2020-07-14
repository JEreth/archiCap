import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ProductService} from '../shared/product.service';
import {Product} from '../shared/product';
import {System} from '../../systems/shared/system';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  public product: Product;
  public systems: System[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.product =  (await this.productService.get(id)) as Product;
    }
  }

  async save() {
    if (await this.productService.add(this.product)) {
      this.snackBar.open('Product was successfully saved');
      await this.router.navigateByUrl('/products');
    } else {
      this.snackBar.open('There has been an error');
    }
  }

}

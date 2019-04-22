import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {ProductService} from '../shared/product.service';
import {Product} from '../shared/product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  public product: Product;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private snackBar: MatSnackBar

  ) {

    // get the id from the path and load product if set
    const id = this.route.snapshot.paramMap.get('id');
    const productId: number = Number(id);
    if (id === 'new') {
      this.product = <Product>{name: '', description: ''};
    } else {
      this.productService.get(productId).subscribe( c => {
        if (c) {
          this.product = <Product> c;
        } else {
          this.product = <Product>{name: '', description: ''};
        }
      });
    }

  }

  ngOnInit() {
  }

  save() {
    this.productService.add(this.product).subscribe( () => {
      this.snackBar.open('Product was successfully saved');
      this.router.navigateByUrl('/products');
    });
  }

}

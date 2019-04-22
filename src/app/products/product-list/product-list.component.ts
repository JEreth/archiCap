import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {Product} from '../shared/product';
import {ProductService} from '../shared/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public products: Product[];

  constructor(private productService: ProductService,
              private snackBar: MatSnackBar) {
    this.productService.getAllAsArray().subscribe( products => {
      this.products = products;
    });
  }

  ngOnInit() {
  }

  remove(id: number) {
    this.productService.remove(id).subscribe( () => {
      this.snackBar.open('Product has been removed');
      this.productService.getAllAsArray().subscribe( products => {
        this.products = products;
      });
    });
  }

}

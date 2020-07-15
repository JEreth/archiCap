import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
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
  }

  async ngOnInit() {
    await this.update();
  }

  async update() {
    this.products = (await this.productService.all()) as Product[];
  }

  async remove(id: string) {
    if (await this.productService.remove(id)) {
      await this.update();
      this.snackBar.open('Product has been removed');
    } else {
      this.snackBar.open('There has been an error');
    }
  }

}

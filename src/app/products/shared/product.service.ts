import { Injectable } from '@angular/core';
import {DataService} from '../../shared/data.service';
import {Observable, of} from 'rxjs';
import {Product} from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public products: Map<number, Product> = new Map<number, Product>();
  public initialized = false;

  constructor(private data: DataService) {}

  getAllAsArray(): Observable<Product[]> {
    return new Observable<Product[]>((observer) => {
      this.init().subscribe( () => {
        observer.next(Array.from(this.products.values()));
        observer.complete();
      });
    });
  }

  // return a product by its id
  get(id: number): Observable<Product> {
    return new Observable<Product>((observer) => {
      this.init().subscribe( () => {
        observer.next(this.products.get(id));
        observer.complete();
      });
    });
  }

  // add a new product, if no id given auto increment
  add(input: any, persist = true): Observable<boolean> {
    const c: Product = <Product> input;
    const id: number = (c.id != null) ? c.id : Number(this.products.size);
    c.id = id;
    this.products.set(id, c);
    return (persist) ? this.persist() :  of(true);
  }

  // set multiple new values
  set(input: Product[], persist = true): Observable<boolean> {
    const products = new Map<number, Product>();
    input.forEach(function (product) {
      const c: Product = <Product> product;
      const id: number = (c.id != null) ? c.id : Number(products.size);
      c.id = id;
      products.set(id, c);
    });
    this.products = products;
    return (persist) ? this.persist() :  of(true);
  }

  // remove a product by id or object
  remove(input: any, persist = true): Observable<boolean> {
    const id = ((<Product>input).id !== undefined) ? input.id : input;
    this.products.delete(id);
    // we probably also have to clean relations?
    return (persist) ? this.persist() :  of(true);
  }

  // persist current products to local storage
  persist(): Observable<boolean> {
    return this.data.set('products', this.products);
  }

  init(): Observable<boolean> {
    return (this.initialized) ? of(true) : new Observable<boolean>((observer) => {
      const scope = this;
      this.data.get('products').subscribe(products => {
        if (products) {
          products.forEach(function (product) {
            const c: Product = <Product>product;
            const id: number = (c.id != null) ? c.id : scope.products.size;
            c.id = id;
            scope.products.set(id, c);
          });
        }
        scope.initialized = true;
        observer.next(true);
        observer.complete();
      });
    });
  }
}

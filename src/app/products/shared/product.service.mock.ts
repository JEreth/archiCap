import {Product} from './product';
import {Observable, of} from 'rxjs';

export class ProductServiceMock {

  public products: Map<number, Product> = new Map<number, Product>();
  public initialized = false;

  constructor() {
  }

  getAllAsArray(): Observable<Product[]> {
    return of([] as Product[]);
  }

  // return a product by its id
  get(id: number): Observable<Product> {
    return of({} as Product);
  }

  // add a new product, if no id given auto increment
  add(input: any, persist = true): Observable<boolean> {
    return of(true);
  }

  // set multiple new values
  set(input: Product[], persist = true): Observable<boolean> {
    return of(true);
  }

  // remove a product by id or object
  remove(input: any, persist = true): Observable<boolean> {
    return of(true);
  }

  // persist current products to local storage
  persist(): Observable<boolean> {
    return of(true);
  }

  init(): Observable<boolean> {
    return of(true);
  }
}

import {Observable, of} from 'rxjs';
import {Category} from './category';

export class CategoryServiceMock {

  public categories: Map<number, Category> = new Map<number, Category>();
  public initialized = false;

  constructor() {
  }

  getAllAsArray(): Observable<Category[]> {
    return of([] as Category[]);
  }

  // return a category by its id
  get(id: number): Observable<Category> {
    return of({} as Category);
  }

  add(input: any, persist = true): Observable<boolean> {
    return of(true);
  }

  set(input: Category[], persist = true): Observable<boolean> {
    return of(true);
  }

  remove(input: any, persist = true): Observable<boolean> {
    return of(true);
  }

  persist(): Observable<boolean> {
    return of(true);
  }

  init(): Observable<boolean> {
    return of(true);
  }

}

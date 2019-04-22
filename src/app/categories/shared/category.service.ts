import { Injectable } from '@angular/core';
import { Category } from './category';
import {Observable, of} from 'rxjs';
import {DataService} from '../../shared/data.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public categories: Map<number, Category> = new Map<number, Category>();
  public initialized = false;

  constructor(private data: DataService) {}

  getAllAsArray(): Observable<Category[]> {
    return new Observable<Category[]>((observer) => {
      this.init().subscribe( () => {
        observer.next(Array.from(this.categories.values()));
        observer.complete();
      });
    });
  }

  // return a category by its id
  get(id: number): Category {
    return this.categories.get(id);
  }

  // add a new category, if no id given auto increment
  add(input: any, persist = true): Observable<boolean> {
    const c: Category = <Category> input;
    const id: number = (c.id) ? c.id : Number(this.categories.size);
    c.id = id;
    this.categories.set(id, c);
    return (persist) ? this.persist() :  of(true);
  }

  // remove a category by id or object
  remove(input: any, persist = true): Observable<boolean> {
    const id = ((<Category>input).id !== undefined) ? input.id : input;
    this.categories.delete(id);
    // we probably also have to clean relations?
    return (persist) ? this.persist() :  of(true);
  }

  // persist current categories to local storage
  persist(): Observable<boolean> {
    return this.data.set('categories', this.categories);
  }

  init(): Observable<boolean> {
    if (this.initialized) {
      return of(true);
    }
    return new Observable<boolean>((observer) => {
      const scope = this;
      this.data.get('categories').subscribe(categories => {
        if (categories) {
          categories.forEach(function (category) {
            const c: Category = <Category>category;
            const id: number = (c.id) ? c.id : scope.categories.size;
            scope.categories.set(id, c);
          });
        }
        scope.initialized = true;
        observer.next(true);
        observer.complete();
      });
    });
  }

}

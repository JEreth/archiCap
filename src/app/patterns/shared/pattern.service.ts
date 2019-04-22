import { Injectable } from '@angular/core';
import {DataService} from '../../shared/data.service';
import {Observable, of} from 'rxjs';
import {Pattern} from './pattern';

@Injectable({
  providedIn: 'root'
})
export class PatternService {

  public patterns: Map<number, Pattern> = new Map<number, Pattern>();
  public initialized = false;

  constructor(private data: DataService) {}

  getAllAsArray(): Observable<Pattern[]> {
    return new Observable<Pattern[]>((observer) => {
      this.init().subscribe( () => {
        observer.next(Array.from(this.patterns.values()));
        observer.complete();
      });
    });
  }

  // return a pattern by its id
  get(id: number): Observable<Pattern> {
    return new Observable<Pattern>((observer) => {
      this.init().subscribe( () => {
        observer.next(this.patterns.get(id));
        observer.complete();
      });
    });
  }

  // add a new pattern, if no id given auto increment
  add(input: any, persist = true): Observable<boolean> {
    const c: Pattern = <Pattern> input;
    const id: number = (c.id) ? c.id : Number(this.patterns.size);
    c.id = id;
    this.patterns.set(id, c);
    return (persist) ? this.persist() :  of(true);
  }

  // remove a pattern by id or object
  remove(input: any, persist = true): Observable<boolean> {
    const id = ((<Pattern>input).id !== undefined) ? input.id : input;
    this.patterns.delete(id);
    // we probably also have to clean relations?
    return (persist) ? this.persist() :  of(true);
  }

  // persist current patterns to local storage
  persist(): Observable<boolean> {
    return this.data.set('patterns', this.patterns);
  }

  init(): Observable<boolean> {
    return (this.initialized) ? of(true) : new Observable<boolean>((observer) => {
      const scope = this;
      this.data.get('patterns').subscribe(patterns => {
        if (patterns) {
          patterns.forEach(function (pattern) {
            const c: Pattern = <Pattern>pattern;
            const id: number = (c.id) ? c.id : scope.patterns.size;
            c.id = id;
            scope.patterns.set(id, c);
          });
        }
        scope.initialized = true;
        observer.next(true);
        observer.complete();
      });
    });
  }
}

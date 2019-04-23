import { Injectable } from '@angular/core';
import {DataService} from '../../shared/data.service';
import {Observable, of} from 'rxjs';
import {System} from './system';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  public systems: Map<number, System> = new Map<number, System>();
  public initialized = false;

  constructor(private data: DataService) {}

  getAllAsArray(): Observable<System[]> {
    return new Observable<System[]>((observer) => {
      this.init().subscribe( () => {
        observer.next(Array.from(this.systems.values()));
        observer.complete();
      });
    });
  }

  // return a system by its id
  get(id: number): Observable<System> {
    return new Observable<System>((observer) => {
      this.init().subscribe( () => {
        observer.next(this.systems.get(id));
        observer.complete();
      });
    });
  }

  // get components that have certain relation
  findFromRelation(property: string, id: number): Observable<System[]> {
    return new Observable<System[]>((observer) => {
      this.init().subscribe( () => {
        const res: System[] = [];
        Array.from(this.systems.values()).forEach(function (system) {
          // check if property exists and add system if it contains id
          if (property in system
            && typeof system[property][Symbol.iterator] === 'function'
            && system[property].find(obj => obj.id === id) !== undefined) {
            res.push(system);
          }
        });
        observer.next(res);
        observer.complete();
      });
    });
  }

  // add a new system, if no id given auto increment
  add(input: any, persist = true): Observable<boolean> {
    const c: System = <System> input;
    const id: number = (c.id) ? c.id : Number(this.systems.size);
    c.id = id;
    this.systems.set(id, c);
    return (persist) ? this.persist() :  of(true);
  }

  // remove a system by id or object
  remove(input: any, persist = true): Observable<boolean> {
    const id = ((<System>input).id !== undefined) ? input.id : input;
    this.systems.delete(id);
    // we probably also have to clean relations?
    return (persist) ? this.persist() :  of(true);
  }

  // persist current systems to local storage
  persist(): Observable<boolean> {
    return this.data.set('systems', this.systems);
  }

  init(): Observable<boolean> {
    return (this.initialized) ? of(true) : new Observable<boolean>((observer) => {
      const scope = this;
      this.data.get('systems').subscribe(systems => {
        if (systems) {
          systems.forEach(function (system) {
            const c: System = <System>system;
            const id: number = (c.id) ? c.id : scope.systems.size;
            c.id = id;
            scope.systems.set(id, c);
          });
        }
        scope.initialized = true;
        observer.next(true);
        observer.complete();
      });
    });
  }
}

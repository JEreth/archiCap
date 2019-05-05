import { Injectable } from '@angular/core';
import {DataService} from '../../shared/data.service';
import {Observable, of} from 'rxjs';
import {Capability} from './capability';

@Injectable({
  providedIn: 'root'
})
export class CapabilityService {


  public capabilities: Map<number, Capability> = new Map<number, Capability>();
  public initialized = false;

  constructor(private data: DataService) {}

  getAllAsArray(): Observable<Capability[]> {
    return new Observable<Capability[]>((observer) => {
      this.init().subscribe( () => {
        observer.next(Array.from(this.capabilities.values()));
        observer.complete();
      });
    });
  }

  // return a Capability by its id
  get(id: number): Observable<Capability> {
    return new Observable<Capability>((observer) => {
      this.init().subscribe( () => {
        observer.next(this.capabilities.get(id));
        observer.complete();
      });
    });
  }

  // add a new Capability, if no id given auto increment
  add(input: any, persist = true): Observable<boolean> {
    const c: Capability = <Capability> input;
    const id: number = (c.id != null) ? c.id : Number(this.capabilities.size);
    c.id = id;
    this.capabilities.set(id, c);
    return (persist) ? this.persist() :  of(true);
  }

  // set multiple new values
  set(input: Capability[], persist = true): Observable<boolean> {
    const capabilities = new Map<number, Capability>();
    input.forEach(function (capability) {
      const c: Capability = <Capability> capability;
      const id: number = (c.id != null) ? c.id : Number(capabilities.size);
      c.id = id;
      capabilities.set(id, c);
    });
    this.capabilities = capabilities;
    return (persist) ? this.persist() :  of(true);
  }

  // remove a Capability by id or object
  remove(input: any, persist = true): Observable<boolean> {
    const id = ((<Capability>input).id !== undefined) ? input.id : input;
    this.capabilities.delete(id);
    // we probably also have to clean relations?
    return (persist) ? this.persist() :  of(true);
  }

  // persist current capabilities to local storage
  persist(): Observable<boolean> {
    return this.data.set('capabilities', this.capabilities);
  }

  init(): Observable<boolean> {
    return (this.initialized) ? of(true) : new Observable<boolean>((observer) => {
      const scope = this;
      this.data.get('capabilities').subscribe(capabilities => {
        if (capabilities) {
          capabilities.forEach(function (capability) {
            const c: Capability = <Capability>capability;
            const id: number = (c.id != null) ? c.id : scope.capabilities.size;
            c.id = id;
            scope.capabilities.set(id, c);
          });
        }
        scope.initialized = true;
        observer.next(true);
        observer.complete();
      });
    });
  }
}

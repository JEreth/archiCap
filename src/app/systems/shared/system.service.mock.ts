import {System} from './system';
import {Observable, of} from 'rxjs';

export class SystemServiceMock {

  public systems: Map<number, System> = new Map<number, System>();
  public initialized = false;

  constructor() {
  }

  getAllAsArray(): Observable<System[]> {
    return of([] as System[]);
  }

  get(id: number): Observable<System> {
    return of({} as System);
  }

  findFromRelation(property: string, id: number): Observable<System[]> {
    return of([] as System[]);
  }

  add(input: any, persist = true): Observable<boolean> {
    return of(true);
  }

  set(input: System[], persist = true): Observable<boolean> {
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

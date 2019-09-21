import {Capability} from './capability';
import {Observable, of} from 'rxjs';

export class CapabilityServiceMock {

  public capabilities: Map<number, Capability> = new Map<number, Capability>();
  public initialized = false;

  constructor() {
  }

  getAllAsArray(): Observable<Capability[]> {
    return of([] as Capability[]);
  }

  get(id: number): Observable<Capability> {
    return of({
      id: 1,
      name: 'test capability',
      description: 'test description'
    });
  }

  add(input: any, persist = true): Observable<boolean> {
    return of(true);
  }

  set(input: Capability[], persist = true): Observable<boolean> {
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

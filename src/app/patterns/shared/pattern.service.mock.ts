import {Observable, of} from 'rxjs';
import {Pattern} from './pattern';

export class PatternServiceMock {

  public patterns: Map<number, Pattern> = new Map<number, Pattern>();
  public initialized = false;

  constructor() {
  }

  getAllAsArray(): Observable<Pattern[]> {
    return of([] as Pattern[]);
  }

  get(id: number): Observable<Pattern> {
    return of({} as Pattern);
  }

  add(input: any, persist = true): Observable<boolean> {
    return of(true);
  }

  set(input: Pattern[], persist = true): Observable<boolean> {
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

import {Observable, of} from 'rxjs';

export class DataServiceMock {

  constructor() {
  }

  set(key: string, data: any): Observable<boolean> {
    return of(true);
  }

  get(key: string): Observable<any> {
    return of(null);
  }

  delete(key: string): Observable<boolean> {
    return of(true);
  }

  reset(): Observable<boolean> {
    return of(true);
  }

}

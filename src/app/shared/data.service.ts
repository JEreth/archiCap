import { Injectable } from '@angular/core';
import {LocalStorage} from '@ngx-pwa/local-storage';
import {forkJoin, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(protected localStorage: LocalStorage) { }

  set(key: string, data: any): Observable<boolean> {
    if (data instanceof Map) {
      data = Array.from(data.values());
    }
    return this.localStorage.setItem(key, data);
  }

  get(key: string): Observable<any> {
    return this.localStorage.getItem<any>(key);
  }

  delete(key: string): Observable<boolean> {
    return this.localStorage.removeItem(key);
  }

  reset(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      const queue = [];
      for (const key of ['categories', 'capabilities', 'patterns', 'systems']) {
        queue.push(this.delete(key));
      }
      forkJoin(queue).subscribe(result => {
        observer.next(true);
        observer.complete();
      });
    });
  }

}

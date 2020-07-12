import {Injectable} from '@angular/core';
import {StorageMap} from '@ngx-pwa/local-storage';
import {forkJoin, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private storage: StorageMap) {
  }

  set(key: string, data: any): Observable<boolean> {
    if (data instanceof Map) {
      data = Array.from(data.values());
    }
    return this.storage.set(key, data);
  }

  get(key: string): Observable<any> {
    return this.storage.get<any>(key);
  }

  delete(key: string): Observable<boolean> {
    return this.storage.delete(key);
  }

  async reset(): Promise<boolean> {
    return new Promise<boolean>(async resolve => {
      try {
        for (const key of ['categories', 'capabilities', 'patterns', 'systems']) {
          await this.delete(key).toPromise();
        }
        resolve(true);
      } catch(e) {
        console.log(e);
        resolve(false);
      }
    });
  }

}

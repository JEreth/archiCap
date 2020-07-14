import {Injectable} from '@angular/core';
import {StorageMap} from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private storage: StorageMap) {
  }

  async set(key: string, data: any): Promise<boolean> {
    if (data instanceof Map) {
      data = Array.from(data.values());
    }
    return this.storage.set(key, data).toPromise();
  }

  async get(key: string): Promise<any> {
    return this.storage.get<any>(key).toPromise();
  }

  async delete(key: string): Promise<boolean> {
    return this.storage.delete(key).toPromise();
  }
}

import {Injectable} from '@angular/core';
import {StorageMap} from '@ngx-pwa/local-storage';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private storage: StorageMap) {
  }

  async set(key: string, data: any): Promise<boolean> {
    try {
      await firstValueFrom(this.storage.set(key, data));
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async get(key: string): Promise<any> {
    return firstValueFrom(this.storage.get(key));
  }

  async delete(key: string): Promise<boolean> {
    return firstValueFrom(this.storage.delete(key));
  }
}

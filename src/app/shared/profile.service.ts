import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {DataService} from './data.service';

export interface ProfilePersistence {
  selectedCapabilities: number[];
  selectedComponents: number[];
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public initialized = false;
  public selectedCapabilities: number[] = [];
  public selectedComponents: number[] = [];

  constructor(private data: DataService) { }

  init(): Observable<boolean> {
    return (this.initialized) ? of(true) : new Observable<boolean>((observer) => {
      const scope = this;
      this.data.get('profile').subscribe(profile => {
        this.selectedCapabilities = (profile && profile.selectedCapabilities) || [];
        this.selectedComponents = (profile && profile.selectedComponents) || [];
        scope.initialized = true;
        observer.next(true);
        observer.complete();
      });
    });
  }

  // persist current capabilities to local storage
  persist(): Observable<boolean> {
    const p: ProfilePersistence = {
      selectedCapabilities: this.selectedCapabilities,
      selectedComponents: this.selectedComponents
    };
    return this.data.set('profile', p);
  }

}

import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {DataService} from './data.service';

export interface ProfilePersistence {
  selectedCapabilities: number[];
  selectedSystems: number[];
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public initialized = false;
  public selectedCapabilities: number[] = [];
  public selectedSystems: number[] = [];

  constructor(private data: DataService) { }

  init(): Observable<boolean> {
    return (this.initialized) ? of(true) : new Observable<boolean>((observer) => {
      const scope = this;
      this.data.get('profile').subscribe(profile => {
        this.selectedCapabilities = (profile && profile.selectedCapabilities) || [];
        this.selectedSystems = (profile && profile.selectedSystems) || [];
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
      selectedSystems: this.selectedSystems
    };
    return this.data.set('profile', p);
  }

}

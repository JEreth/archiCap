import {Observable, of} from 'rxjs';
import {ProfilePersistence} from './profile.service';

export class ProfileServiceMock {

  public initialized = false;
  public selectedCapabilities: number[] = [];
  public selectedSystems: number[] = [];

  constructor() {
  }

  init(): Observable<boolean> {
    return of(true);
  }

  // persist current capabilities to local storage
  persist(): Observable<boolean> {
    return of(true);
  }

  exportToJson(): string {
    return '{}';
  }

  validate(input: any): boolean {
    return true;
  }

  reset(): Observable<boolean> {
    return of(true);
  }

  importFromPersistence(input: ProfilePersistence): Observable<boolean> {
    return of(true);
  }

}

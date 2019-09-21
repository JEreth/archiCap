import {Observable, of} from 'rxjs';
import {ConfigurationPersistence} from './configuration.service';

export class ConfigurationServiceMock {

  constructor() {
  }

  exportToJson(): Observable<string> {
    return of('');
  }

  importFromPersistence(input: any): Observable<boolean> {
    return of(true);
  }

  getConfiguration(): Observable<ConfigurationPersistence> {
    return of({
      capabilities: [],
      categories: [],
      patterns: [],
      products: [],
      systems: []
    });
  }

  reset(): Observable<boolean> {
    return of(true);
  }

  validate(input: any): boolean {
    return true;
  }
}

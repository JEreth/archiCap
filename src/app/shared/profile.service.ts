import {Injectable} from '@angular/core';
import {DataService} from './data.service';

export interface Profile {
  capabilities: string[];
  systems: string[];
  products: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public profile;

  constructor(private data: DataService) {
  }

  async init(): Promise<boolean> {
    if (!this.profile) {
      const p = await this.data.get('profile');
      this.profile = {
        capabilities: p.capabilities || [],
        systems: p.systems || [],
        products: p.products || []
      };
    }
    return true;
  }

  async get(): Promise<Profile> {
    await this.init();
    return this.profile;
  }

  // persist current capabilities to local storage
  async persist(): Promise<boolean> {
    try {
      await this.data.set('profile', this.profile || {});
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async export(): Promise<string> {
    return JSON.stringify(await this.get());
  }

  validate(input: any): boolean {
    // we only check for the major properties here. Might be better to make a in-depth validation
    return (input &&
      input.capabilities && Array.isArray(input.capabilities) &&
      input.systems && Array.isArray(input.systems));
  }

  async reset(): Promise<boolean> {
    this.profile = {};
    return this.persist();
  }

  async import(input: any): Promise<boolean> {
    this.profile = {
      capabilities: input.capabilities || [],
      systems: input.systems || [],
      products: input.products || []
    };
    return this.persist();
  }

}

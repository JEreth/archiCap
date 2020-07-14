import { Injectable } from '@angular/core';
import {DataService} from './data.service';

//
//  Abstract entity service that provides certain features that are reused across all entity services
//

// Abstract interface that serves as minimum template for other entities
export interface Entity {
  id?: string;
}

@Injectable({
  providedIn: 'root'
})
export abstract class EntityService {

  // Collection of entites
  public entityCode = 'entity'; // identifier
  public entities: Entity[];

  protected constructor(protected data: DataService) { }

  // Generate random uid from timestamp and object hash
  protected uid(object: any): string {
    return (new Date().getTime()).toString(36) + '_' + window.btoa(JSON.stringify(object)).substr(12);
  }

  async init(): Promise<boolean> {
    if (!this.entities) {
      const data: Entity[] = await this.data.get(this.entityCode) || [];
      data.map(i => i.id = (i.id) ? i.id : this.uid(i)); // ensure that ids are set
      this.entities = data;
    }
    return true;
  }

  // Persist entities in localstorage
  async persist(): Promise<boolean> {
    return this.data.set(this.entityCode, this.entities);
  }

  // Return all entities
  async all(): Promise<Entity[]> {
    await this.init();
    return this.entities;
  }

  // Returns if element with id exists
  async has(id: string): Promise<boolean> {
    await this.init();
    return (this.entities.find(i => i.id === id) !== undefined);
  }

  // Return an entity by id
  async get(id: string): Promise<Entity> {
    await this.init();
    return this.entities.find(i => i.id === id);
  }

  // Returns entities identified by certain property (default by id)
  async findBy(searchValues: string | string[], property: string = 'id'): Promise<Entity[]> {
    await this.init();
    searchValues = (Array.isArray(searchValues)) ? searchValues : [ searchValues ];
    return this.entities.filter(i => (i.hasOwnProperty(property) && searchValues.includes(i[property])));
  }

  // Add one or more entities
  async add(input: any, persist = true, reset = false): Promise<boolean> {
    await this.init();
    input = (Array.isArray(input)) ? input : [input]; // ensure we have array
    if (reset) {
      this.entities = [];
    }
    for (const inputItem of input) {
      inputItem.id = (inputItem.id != null) ? inputItem.id : this.uid(inputItem);
      if (!(await this.has(input.id))) {
        this.entities.push(input as Entity);
      } else {
        await this.update(input, false); // update if element exists
      }
    }
    return (persist) ? this.persist() : true;
  }

  // Update one or more entities
  async update(input: Entity | Entity[], persist = true): Promise<boolean> {
    await this.init();
    input = (Array.isArray(input)) ? input : [input]; // ensure we have array
    let entities = this.entities;
    for (const inputItem of input) {
      entities = entities.map(i => (i.id === inputItem.id) ? inputItem : i);
    }
    this.entities = entities;
    return (persist) ? this.persist() : true;
  }

  // remove a Capability by id or object
  async remove(input: string | Entity, persist = true): Promise<boolean> {
    await this.init();
    input = (typeof input !== 'string') ? input : (input as Entity).id;
    this.entities = this.entities.filter(i => i !== input);
    // todo: Clean relations ?
    return (persist) ? this.persist() : true;
  }

  async reset(): Promise<boolean> {
    this.entities = [];
    return this.persist();
  }

}

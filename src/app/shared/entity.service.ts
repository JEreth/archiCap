import {Injectable} from '@angular/core';
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

  protected constructor(protected data: DataService) {
  }

  // Generate random uid from timestamp and object hash
  protected uid(object: any): string {
    return (new Date().getTime()).toString(36) + window.btoa(JSON.stringify(object)).substr(4);
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
  async persist(overwrite: Entity[] = null): Promise<boolean> {
    if (overwrite) {
      this.entities = overwrite;
    }
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
    searchValues = ((Array.isArray(searchValues)) ? searchValues : [searchValues]) as string[];
    return this.entities.filter(i => {
      if (i.hasOwnProperty(property) && Array.isArray(i[property])) {
        return (i[property].filter(j => searchValues.includes(j)).length) > 0;
      } else {
        return searchValues.includes(i[property]);
      }
    });
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
      if (!(await this.has(inputItem.id))) {
        this.entities.push(inputItem as Entity);
      } else {
        await this.update(inputItem, false); // update if element exists
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
    input = (typeof input === 'string') ? input : (input as Entity).id;
    this.entities = this.entities.filter(i => i.id !== input);
    // todo: Clean relations ?
    return (persist) ? this.persist() : true;
  }

  async reset(): Promise<boolean> {
    this.entities = [];
    return this.persist();
  }

  // Create relation between elements by passing ids and foreign ids
  async relate(ids: string | string[] | Entity | Entity[], foreignIds: string | string[] | Entity | Entity[],
               property: string, persist = true): Promise<boolean> {
    await this.init();

    // check if property is valid
    if (this.entities.length > 0 &&
      ((!(this.entities[0] as any).hasOwnProperty(property)) || !Array.isArray(this.entities[0][property]))
    ) {
      console.log(`Property ${property} does not exist or is not relation.`);
      return false;
    }

    // if we get an object transform to id array
    if (!Array.isArray(ids) && typeof ids === 'object') {
      ids = [(ids as Entity).id];
    }
    if (!Array.isArray(foreignIds) && typeof foreignIds === 'object') {
      foreignIds = [(foreignIds as Entity).id];
    }
    if (Array.isArray(ids) && typeof ids[0] === 'object') {
      ids = (ids as Entity[]).map(i => i.id);
    }
    if (Array.isArray(foreignIds) && typeof foreignIds[0] === 'object') {
      foreignIds = (foreignIds as Entity[]).map(i => i.id);
    }
    if (typeof ids === 'string') {
      ids = [ids];
    }
    if (typeof foreignIds === 'string') {
      foreignIds = [foreignIds];
    }

    for (let i = 0; i < this.entities.length; i++) {
      if (ids.includes(this.entities[i].id)) {
        foreignIds.forEach(foreignId => {
          if (!this.entities[i][property].includes(foreignId)) {
            this.entities[i][property].push(foreignId);
          }
        });
      } else {
        // remove relation
        foreignIds.forEach(foreignId => {
          const index = this.entities[i][property].indexOf(foreignId, 0);
          if (index > -1) {
            this.entities[i][property].splice(index, 1);
          }
        });
      }
    }
    return (persist) ? this.persist() : true;
  }

}

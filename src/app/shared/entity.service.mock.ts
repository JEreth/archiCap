import {Entity} from './entity.service';

export abstract class EntityServiceMock {

  public entityCode = 'entity';
  public entities: Entity[] = [];

  protected constructor() {
  }

  // Generate random uid from timestamp and object hash
  protected uid(object: any): string {
    return 'test';
  }

  async init(): Promise<boolean> {
    return true;
  }

  // Persist entities in localstorage
  async persist(): Promise<boolean> {
    return true;
  }

  // Return all entities
  async all(): Promise<Entity[]> {
    return [];
  }

  // Returns if element with id exists
  async has(id: string): Promise<boolean> {
    return true;
  }

  // Return an entity by id
  async get(id: string): Promise<Entity> {
    return null;
  }

  // Return many entities by ids
  async many(ids: string[]): Promise<Entity[]> {
    return [];
  }

  // Add a new entity
  async add(input: any, persist = true): Promise<boolean> {
    return true;
  }

  // Update a certain entity
  async update(input: Entity | Entity[], persist = true): Promise<boolean> {
    return true;
  }

  // remove a Capability by id or object
  async remove(input: string | Entity, persist = true): Promise<boolean> {
    return true;
  }

}

import { Connection } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SampleRepo {
  private readonly repository: Repository<SampleEntity>;

  constructor(private readonly connection: Connection) {
    this.repository = connection.getRepository(SampleEntity);
  }

  /**
   * Finds all entities of type SampleEntity.
   *
   * @returns A promise that resolves to an array of SampleEntity objects.
   */
  async findAll(): Promise<SampleEntity[]> {
    try {
      return await this.repository.find();
    } catch (error) {
      throw new Error(`Failed to find all sample entities: ${error.message}`);
    }
  }

  /**
   * Finds one entity of type SampleEntity by its primary key.
   *
   * @param id - The primary key of the entity to find.
   * @returns A promise that resolves to a SampleEntity object if found, otherwise null.
   */
  async findOne(id: number): Promise<SampleEntity | null> {
    try {
      return await this.repository.findOne(id);
    } catch (error) {
      throw new Error(`Failed to find sample entity with id ${id}: ${error.message}`);
    }
  }

  /**
   * Creates a new entity of type SampleEntity.
   *
   * @param entity - The entity data to create.
   * @returns A promise that resolves to the created SampleEntity object.
   */
  async create(entity: Partial<SampleEntity>): Promise<SampleEntity> {
    try {
      const newEntity = this.repository.create(entity);
      return await this.repository.save(newEntity);
    } catch (error) {
      throw new Error(`Failed to create sample entity: ${error.message}`);
    }
  }

  /**
   * Updates an existing entity of type SampleEntity.
   *
   * @param id - The primary key of the entity to update.
   * @param entity - The updated entity data.
   * @returns A promise that resolves to the updated SampleEntity object.
   */
  async update(id: number, entity: Partial<SampleEntity>): Promise<SampleEntity> {
    try {
      await this.repository.update(id, entity);
      return await this.repository.findOne(id);
    } catch (error) {
      throw new Error(`Failed to update sample entity with id ${id}: ${error.message}`);
    }
  }

  /**
   * Deletes an entity of type SampleEntity by its primary key.
   *
   * @param id - The primary key of the entity to delete.
   * @returns A promise that resolves when the deletion is complete.
   */
  async delete(id: number): Promise<void> {
    try {
      await this.repository.delete(id);
    } catch (error) {
      throw new Error(`Failed to delete sample entity with id ${id}: ${error.message}`);
    }
  }
}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Folder } from '../../../domain/folder/folder.entity';
import { IFolderRepository } from '../../../domain/ports/folder.repository.interface';
import { FolderOrmEntity } from '../entities/folder.orm-entity';

@Injectable()
export class FolderRepository implements IFolderRepository {
  constructor(
    @InjectRepository(FolderOrmEntity)
    private readonly ormRepo: Repository<FolderOrmEntity>,
  ) {}

  async findAll(): Promise<Folder[]> {
    const entities = await this.ormRepo.find({
      order: { createdAt: 'DESC' },
    });
    return entities.map(this.toDomain);
  }

  async findById(id: string): Promise<Folder | null> {
    const entity = await this.ormRepo.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async save(folder: Folder): Promise<Folder> {
    const entity = this.toOrm(folder);
    const saved = await this.ormRepo.save(entity);
    return this.toDomain(saved);
  }

  async update(folder: Folder): Promise<Folder> {
    const entity = this.toOrm(folder);
    const updated = await this.ormRepo.save(entity);
    return this.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }

  private toDomain(entity: FolderOrmEntity): Folder {
    return new Folder({
      id: entity.id,
      name: entity.name,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  private toOrm(folder: Folder): FolderOrmEntity {
    const entity = new FolderOrmEntity();
    entity.id = folder.id;
    entity.name = folder.name;
    entity.createdAt = folder.createdAt;
    entity.updatedAt = folder.updatedAt;
    return entity;
  }
}
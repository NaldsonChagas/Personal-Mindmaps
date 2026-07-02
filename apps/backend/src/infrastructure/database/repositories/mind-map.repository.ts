import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MindMap } from '../../../domain/mind-map/mind-map.entity';
import { MindMapContent } from '../../../domain/mind-map/mind-map-content.entity';
import { MindMapNode, NodeStyle } from '../../../domain/mind-map/mind-map-node.entity';
import { IMindMapRepository } from '../../../domain/ports/mind-map.repository.interface';
import { MindMapOrmEntity } from '../entities/mind-map.orm-entity';

@Injectable()
export class MindMapRepository implements IMindMapRepository {
  constructor(
    @InjectRepository(MindMapOrmEntity)
    private readonly ormRepo: Repository<MindMapOrmEntity>,
  ) {}

  async findAll(folderId?: string | null): Promise<MindMap[]> {
    let entities: MindMapOrmEntity[];

    if (folderId === undefined) {
      entities = await this.ormRepo.find();
    } else if (folderId === null) {
      entities = await this.ormRepo.find({ where: { folderId: null as unknown as undefined } });
    } else {
      entities = await this.ormRepo.find({ where: { folderId } });
    }

    return entities.map(this.toDomain.bind(this));
  }

  async findById(id: string): Promise<MindMap | null> {
    const entity = await this.ormRepo.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async save(mindMap: MindMap): Promise<MindMap> {
    const entity = this.toOrm(mindMap);
    const saved = await this.ormRepo.save(entity);
    return this.toDomain(saved);
  }

  async update(mindMap: MindMap): Promise<MindMap> {
    const entity = this.toOrm(mindMap);
    const updated = await this.ormRepo.save(entity);
    return this.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }

  private toDomain(entity: MindMapOrmEntity): MindMap {
    return new MindMap({
      id: entity.id,
      title: entity.title,
      folderId: entity.folderId,
      content: this.contentToDomain(entity.content as Record<string, unknown>),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  private toOrm(mindMap: MindMap): MindMapOrmEntity {
    const entity = new MindMapOrmEntity();
    entity.id = mindMap.id;
    entity.title = mindMap.title;
    entity.folderId = mindMap.folderId;
    entity.content = this.contentToOrm(mindMap.content);
    entity.createdAt = mindMap.createdAt;
    entity.updatedAt = mindMap.updatedAt;
    return entity;
  }

  private contentToDomain(raw: Record<string, unknown>): MindMapContent {
    const rootData = raw.root as Record<string, unknown>;
    const root = new MindMapNode({
      id: rootData.id as string,
      label: rootData.label as string,
      style: rootData.style as NodeStyle | undefined,
      children: (rootData.children as Record<string, unknown>[])
        ?.map((child) => this.nodeToDomain(child as Record<string, unknown>)),
    });
    return new MindMapContent(root);
  }

  private nodeToDomain(data: Record<string, unknown>): MindMapNode {
    return new MindMapNode({
      id: data.id as string,
      label: data.label as string,
      style: data.style as NodeStyle | undefined,
      children: (data.children as Record<string, unknown>[])
        ?.map((child) => this.nodeToDomain(child as Record<string, unknown>)),
    });
  }

  private contentToOrm(content: MindMapContent): object {
    return JSON.parse(JSON.stringify(content));
  }
}
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { MindMap } from '../domain/mind-map/mind-map.entity';
import { MindMapContent } from '../domain/mind-map/mind-map-content.entity';
import { IFolderRepository } from '../domain/ports/folder.repository.interface';
import { IMindMapRepository } from '../domain/ports/mind-map.repository.interface';
import { CreateMindMapDto } from './dto/create-mind-map.dto';
import { UpdateMindMapDto } from './dto/update-mind-map.dto';
import { MoveMindMapDto } from './dto/move-mind-map.dto';
import { MindElixirAdapter } from '../domain/adapters/mind-elixir.adapter';

@Injectable()
export class MindMapsService {
  constructor(
    @Inject('MIND_MAP_REPOSITORY')
    private readonly mindMapRepository: IMindMapRepository,
    @Inject('FOLDER_REPOSITORY')
    private readonly folderRepository: IFolderRepository,
  ) {}

  async findAll(folderId?: string): Promise<MindMap[]> {
    return this.mindMapRepository.findAll(folderId);
  }

  async findById(id: string): Promise<MindMap> {
    const mindMap = await this.mindMapRepository.findById(id);
    if (!mindMap) {
      throw new NotFoundException(`Mind map with id "${id}" not found`);
    }
    return mindMap;
  }

  async create(dto: CreateMindMapDto): Promise<MindMap> {
    if (dto.folderId) {
      const folder = await this.folderRepository.findById(dto.folderId);
      if (!folder) {
        throw new NotFoundException(`Folder with id "${dto.folderId}" not found`);
      }
    }

    const now = new Date();
    const content = MindMapContent.createDefault(dto.title, uuidv4());
    const mindMap = new MindMap({
      id: uuidv4(),
      title: dto.title,
      folderId: dto.folderId ?? null,
      content,
      createdAt: now,
      updatedAt: now,
    });
    return this.mindMapRepository.save(mindMap);
  }

  async rename(id: string, dto: UpdateMindMapDto): Promise<MindMap> {
    const mindMap = await this.findById(id);

    if (dto.title !== undefined) {
      mindMap.rename(dto.title);
    }

    if (dto.content !== undefined) {
      const content = MindElixirAdapter.toDomain(dto.content as any);
      mindMap.updateContent(content);
    }

    return this.mindMapRepository.update(mindMap);
  }

  async move(id: string, dto: MoveMindMapDto): Promise<MindMap> {
    if (dto.folderId !== null) {
      const folder = await this.folderRepository.findById(dto.folderId);
      if (!folder) {
        throw new NotFoundException(`Folder with id "${dto.folderId}" not found`);
      }
    }

    const mindMap = await this.findById(id);
    mindMap.moveToFolder(dto.folderId);
    return this.mindMapRepository.update(mindMap);
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.mindMapRepository.delete(id);
  }
}
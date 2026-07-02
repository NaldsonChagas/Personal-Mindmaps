import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Folder } from '../domain/folder/folder.entity';
import { IFolderRepository } from '../domain/ports/folder.repository.interface';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';

@Injectable()
export class FoldersService {
  constructor(
    @Inject('FOLDER_REPOSITORY')
    private readonly folderRepository: IFolderRepository,
  ) {}

  async findAll(): Promise<Folder[]> {
    return this.folderRepository.findAll();
  }

  async findById(id: string): Promise<Folder> {
    const folder = await this.folderRepository.findById(id);
    if (!folder) {
      throw new NotFoundException(`Folder with id "${id}" not found`);
    }
    return folder;
  }

  async create(dto: CreateFolderDto): Promise<Folder> {
    const now = new Date();
    const folder = new Folder({
      id: uuidv4(),
      name: dto.name,
      createdAt: now,
      updatedAt: now,
    });
    return this.folderRepository.save(folder);
  }

  async rename(id: string, dto: UpdateFolderDto): Promise<Folder> {
    const folder = await this.findById(id);
    folder.rename(dto.name);
    return this.folderRepository.update(folder);
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.folderRepository.delete(id);
  }
}
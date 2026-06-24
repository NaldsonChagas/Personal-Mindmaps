import { Folder } from '../folder/folder.entity';

export interface IFolderRepository {
  findAll(): Promise<Folder[]>;
  findById(id: string): Promise<Folder | null>;
  save(folder: Folder): Promise<Folder>;
  update(folder: Folder): Promise<Folder>;
  delete(id: string): Promise<void>;
}
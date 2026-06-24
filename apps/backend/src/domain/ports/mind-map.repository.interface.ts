import { MindMap } from '../mind-map/mind-map.entity';

export interface IMindMapRepository {
  findAll(folderId?: string | null): Promise<MindMap[]>;
  findById(id: string): Promise<MindMap | null>;
  save(mindMap: MindMap): Promise<MindMap>;
  update(mindMap: MindMap): Promise<MindMap>;
  delete(id: string): Promise<void>;
}
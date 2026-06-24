import { MindMapContent } from './mind-map-content.entity';

export class MindMap {
  id: string;
  title: string;
  folderId: string | null;
  content: MindMapContent;
  createdAt: Date;
  updatedAt: Date;

  constructor(params: {
    id: string;
    title: string;
    folderId: string | null;
    content: MindMapContent;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = params.id;
    this.title = params.title;
    this.folderId = params.folderId;
    this.content = params.content;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }

  rename(newTitle: string): void {
    if (!newTitle || newTitle.trim().length === 0) {
      throw new Error('Mind map title cannot be empty');
    }
    this.title = newTitle.trim();
    this.updatedAt = new Date();
  }

  moveToFolder(folderId: string | null): void {
    this.folderId = folderId;
    this.updatedAt = new Date();
  }

  updateContent(content: MindMapContent): void {
    this.content = content;
    this.updatedAt = new Date();
  }
}

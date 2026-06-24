export class Folder {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(params: { id: string; name: string; createdAt: Date; updatedAt: Date }) {
    this.id = params.id;
    this.name = params.name;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }

  rename(newName: string): void {
    if (!newName || newName.trim().length === 0) {
      throw new Error('Folder name cannot be empty');
    }
    this.name = newName.trim();
    this.updatedAt = new Date();
  }
}

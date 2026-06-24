import { Folder } from '../folder/folder.entity';

describe('Folder', () => {
  const createFolder = () =>
    new Folder({
      id: 'folder-1',
      name: 'My Folder',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    });

  describe('rename', () => {
    it('updates the name and updatedAt', () => {
      const folder = createFolder();
      const oldUpdatedAt = folder.updatedAt;

      folder.rename('New Name');

      expect(folder.name).toBe('New Name');
      expect(folder.updatedAt.getTime()).toBeGreaterThan(oldUpdatedAt.getTime());
    });

    it('throws when the new name is empty', () => {
      const folder = createFolder();

      expect(() => folder.rename('')).toThrow('Folder name cannot be empty');
    });

    it('throws when the new name is whitespace only', () => {
      const folder = createFolder();

      expect(() => folder.rename('   ')).toThrow('Folder name cannot be empty');
    });
  });
});
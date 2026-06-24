import { MindMap } from '../mind-map/mind-map.entity';
import { MindMapContent } from '../mind-map/mind-map-content.entity';
import { MindMapNode } from '../mind-map/mind-map-node.entity';

describe('MindMap', () => {
  const createContent = () =>
    new MindMapContent(new MindMapNode({ id: 'root-1', label: 'Root' }));

  const createMindMap = (overrides?: Partial<{ id: string; title: string; folderId: string | null; content: MindMapContent; createdAt: Date; updatedAt: Date }>) =>
    new MindMap({
      id: 'map-1',
      title: 'My Map',
      folderId: 'folder-1',
      content: createContent(),
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      ...overrides,
    });

  describe('rename', () => {
    it('updates the title and updatedAt', () => {
      const mindMap = createMindMap();
      const oldUpdatedAt = mindMap.updatedAt;

      mindMap.rename('New Title');

      expect(mindMap.title).toBe('New Title');
      expect(mindMap.updatedAt.getTime()).toBeGreaterThan(oldUpdatedAt.getTime());
    });

    it('throws when the new title is empty', () => {
      const mindMap = createMindMap();

      expect(() => mindMap.rename('')).toThrow('Mind map title cannot be empty');
    });
  });

  describe('moveToFolder', () => {
    it('updates folderId and updatedAt', () => {
      const mindMap = createMindMap();
      const oldUpdatedAt = mindMap.updatedAt;

      mindMap.moveToFolder('folder-2');

      expect(mindMap.folderId).toBe('folder-2');
      expect(mindMap.updatedAt.getTime()).toBeGreaterThan(oldUpdatedAt.getTime());
    });

    it('removes the folder association when called with null', () => {
      const mindMap = createMindMap();

      mindMap.moveToFolder(null);

      expect(mindMap.folderId).toBeNull();
    });
  });

  describe('updateContent', () => {
    it('replaces the content and updates updatedAt', () => {
      const mindMap = createMindMap();
      const oldUpdatedAt = mindMap.updatedAt;
      const newContent = new MindMapContent(
        new MindMapNode({ id: 'new-root', label: 'New Root' }),
      );

      mindMap.updateContent(newContent);

      expect(mindMap.content).toBe(newContent);
      expect(mindMap.updatedAt.getTime()).toBeGreaterThan(oldUpdatedAt.getTime());
    });
  });
});
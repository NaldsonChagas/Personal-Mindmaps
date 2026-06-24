import { MindMapContent } from '../mind-map/mind-map-content.entity';
import { MindMapNode } from '../mind-map/mind-map-node.entity';

describe('MindMapContent', () => {
  describe('createDefault', () => {
    it('creates a root node with the given label and id', () => {
      const content = MindMapContent.createDefault('Central Idea', 'root-1');

      expect(content.root.id).toBe('root-1');
      expect(content.root.label).toBe('Central Idea');
      expect(content.root.children).toEqual([]);
    });
  });

  describe('findNode', () => {
    it('returns the root node when searching by root id', () => {
      const content = MindMapContent.createDefault('Root', 'root-1');

      const found = content.findNode('root-1');

      expect(found).toBe(content.root);
    });

    it('returns a nested node at any depth', () => {
      const grandchild = new MindMapNode({ id: 'gc-1', label: 'Grandchild' });
      const child = new MindMapNode({ id: 'child-1', label: 'Child', children: [grandchild] });
      const root = new MindMapNode({ id: 'root-1', label: 'Root', children: [child] });
      const content = new MindMapContent(root);

      const found = content.findNode('gc-1');

      expect(found).toBe(grandchild);
    });

    it('returns null when the node does not exist', () => {
      const content = MindMapContent.createDefault('Root', 'root-1');

      const found = content.findNode('non-existent');

      expect(found).toBeNull();
    });
  });
});
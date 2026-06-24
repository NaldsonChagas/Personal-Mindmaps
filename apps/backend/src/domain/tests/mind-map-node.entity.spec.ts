import { MindMapNode, NodeStyle } from '../mind-map/mind-map-node.entity';

describe('MindMapNode', () => {
  const createNode = (overrides?: Partial<{ id: string; label: string; children: MindMapNode[]; style: NodeStyle }>) =>
    new MindMapNode({
      id: 'node-1',
      label: 'Node 1',
      ...overrides,
    });

  describe('addChild', () => {
    it('appends a child to the children array', () => {
      const parent = createNode();
      const child = createNode({ id: 'child-1', label: 'Child' });

      parent.addChild(child);

      expect(parent.children).toHaveLength(1);
      expect(parent.children[0]).toBe(child);
    });
  });

  describe('removeChild', () => {
    it('removes the correct child by id', () => {
      const parent = createNode();
      const child1 = createNode({ id: 'child-1', label: 'Child 1' });
      const child2 = createNode({ id: 'child-2', label: 'Child 2' });
      parent.addChild(child1);
      parent.addChild(child2);

      parent.removeChild('child-1');

      expect(parent.children).toHaveLength(1);
      expect(parent.children[0].id).toBe('child-2');
    });

    it('does nothing if the id does not exist', () => {
      const parent = createNode();
      parent.addChild(createNode({ id: 'child-1', label: 'Child' }));

      parent.removeChild('non-existent');

      expect(parent.children).toHaveLength(1);
    });
  });

  describe('updateLabel', () => {
    it('updates the label', () => {
      const node = createNode();

      node.updateLabel('Updated Label');

      expect(node.label).toBe('Updated Label');
    });

    it('throws when the label is empty', () => {
      const node = createNode();

      expect(() => node.updateLabel('')).toThrow('Node label cannot be empty');
    });
  });
});
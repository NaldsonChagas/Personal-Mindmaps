import { MindMapContent } from '../mind-map/mind-map-content.entity';
import { MindMapNode } from '../mind-map/mind-map-node.entity';
import { MindElixirAdapter } from '../adapters/mind-elixir.adapter';

describe('MindElixirAdapter', () => {
  describe('toMindElixir', () => {
    it('converts a single-node MindMapContent correctly (id, label → topic)', () => {
      const root = new MindMapNode({ id: 'root-1', label: 'Central Idea' });
      const content = new MindMapContent(root);

      const result = MindElixirAdapter.toMindElixir(content);

      expect(result.nodeData.id).toBe('root-1');
      expect(result.nodeData.topic).toBe('Central Idea');
      expect(result.nodeData.children).toBeUndefined();
    });

    it('recursively converts children', () => {
      const child1 = new MindMapNode({ id: 'c1', label: 'Child 1' });
      const child2 = new MindMapNode({ id: 'c2', label: 'Child 2' });
      const root = new MindMapNode({ id: 'root-1', label: 'Root', children: [child1, child2] });
      const content = new MindMapContent(root);

      const result = MindElixirAdapter.toMindElixir(content);

      expect(result.nodeData.children).toHaveLength(2);
      expect(result.nodeData.children![0].id).toBe('c1');
      expect(result.nodeData.children![0].topic).toBe('Child 1');
      expect(result.nodeData.children![1].id).toBe('c2');
      expect(result.nodeData.children![1].topic).toBe('Child 2');
    });

    it('maps NodeStyle fields to the mind-elixir style format (fontSize as string)', () => {
      const root = new MindMapNode({
        id: 'root-1',
        label: 'Root',
        style: { background: '#fff', color: '#000', fontSize: 16, fontWeight: 'bold' },
      });
      const content = new MindMapContent(root);

      const result = MindElixirAdapter.toMindElixir(content);

      expect(result.nodeData.style).toEqual({
        background: '#fff',
        color: '#000',
        fontSize: '16',
        fontWeight: 'bold',
      });
    });
  });

  describe('toDomain', () => {
    it('converts a MindElixirData object back to MindMapContent', () => {
      const data = {
        nodeData: {
          id: 'root-1',
          topic: 'Central Idea',
        },
      };

      const content = MindElixirAdapter.toDomain(data);

      expect(content.root.id).toBe('root-1');
      expect(content.root.label).toBe('Central Idea');
      expect(content.root.children).toEqual([]);
    });

    it('is the inverse of toMindElixir (round-trip test)', () => {
      const child1 = new MindMapNode({ id: 'c1', label: 'Child 1' });
      const child2 = new MindMapNode({ id: 'c2', label: 'Child 2' });
      const root = new MindMapNode({ id: 'root-1', label: 'Root', children: [child1, child2] });
      const original = new MindMapContent(root);

      const elixirData = MindElixirAdapter.toMindElixir(original);
      const roundTripped = MindElixirAdapter.toDomain(elixirData);

      expect(roundTripped.root.id).toBe(original.root.id);
      expect(roundTripped.root.label).toBe(original.root.label);
      expect(roundTripped.root.children).toHaveLength(2);
      expect(roundTripped.root.children[0].id).toBe('c1');
      expect(roundTripped.root.children[0].label).toBe('Child 1');
      expect(roundTripped.root.children[1].id).toBe('c2');
      expect(roundTripped.root.children[1].label).toBe('Child 2');
    });

    it('maps mind-elixir style back to NodeStyle (fontSize as number)', () => {
      const data = {
        nodeData: {
          id: 'root-1',
          topic: 'Root',
          style: { background: '#fff', color: '#000', fontSize: '16', fontWeight: 'bold' },
        },
      };

      const content = MindElixirAdapter.toDomain(data);

      expect(content.root.style).toEqual({
        background: '#fff',
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
      });
    });
  });
});
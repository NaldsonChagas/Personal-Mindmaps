import { MindMapNode } from './mind-map-node.entity';

export class MindMapContent {
  root: MindMapNode;

  constructor(root: MindMapNode) {
    this.root = root;
  }

  static createDefault(rootLabel: string, rootId: string): MindMapContent {
    return new MindMapContent(new MindMapNode({ id: rootId, label: rootLabel }));
  }

  findNode(nodeId: string): MindMapNode | null {
    return this.searchNode(this.root, nodeId);
  }

  private searchNode(current: MindMapNode, nodeId: string): MindMapNode | null {
    if (current.id === nodeId) return current;
    for (const child of current.children) {
      const found = this.searchNode(child, nodeId);
      if (found) return found;
    }
    return null;
  }
}

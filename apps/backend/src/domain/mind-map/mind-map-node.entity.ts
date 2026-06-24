export interface NodeStyle {
  background?: string;
  color?: string;
  fontSize?: number;
  fontWeight?: string;
}

export class MindMapNode {
  id: string;
  label: string;
  children: MindMapNode[];
  style?: NodeStyle;

  constructor(params: {
    id: string;
    label: string;
    children?: MindMapNode[];
    style?: NodeStyle;
  }) {
    this.id = params.id;
    this.label = params.label;
    this.children = params.children ?? [];
    this.style = params.style;
  }

  addChild(node: MindMapNode): void {
    this.children.push(node);
  }

  removeChild(nodeId: string): void {
    this.children = this.children.filter((child) => child.id !== nodeId);
  }

  updateLabel(label: string): void {
    if (!label || label.trim().length === 0) {
      throw new Error('Node label cannot be empty');
    }
    this.label = label.trim();
  }
}

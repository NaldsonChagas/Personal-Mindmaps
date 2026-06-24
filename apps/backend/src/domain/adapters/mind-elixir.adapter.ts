import { MindMapContent } from '../mind-map/mind-map-content.entity';
import { MindMapNode, NodeStyle } from '../mind-map/mind-map-node.entity';

interface MindElixirNodeData {
  id: string;
  topic: string;
  style?: {
    background?: string;
    color?: string;
    fontSize?: string;
    fontWeight?: string;
  };
  children?: MindElixirNodeData[];
}

interface MindElixirData {
  nodeData: MindElixirNodeData;
}

export class MindElixirAdapter {
  static toMindElixir(content: MindMapContent): MindElixirData {
    return {
      nodeData: MindElixirAdapter.nodeToMindElixir(content.root),
    };
  }

  static toDomain(data: MindElixirData): MindMapContent {
    return new MindMapContent(MindElixirAdapter.mindElixirToNode(data.nodeData));
  }

  private static nodeToMindElixir(node: MindMapNode): MindElixirNodeData {
    return {
      id: node.id,
      topic: node.label,
      style: node.style ? MindElixirAdapter.styleToMindElixir(node.style) : undefined,
      children: node.children.length > 0
        ? node.children.map(MindElixirAdapter.nodeToMindElixir.bind(MindElixirAdapter))
        : undefined,
    };
  }

  private static mindElixirToNode(data: MindElixirNodeData): MindMapNode {
    return new MindMapNode({
      id: data.id,
      label: data.topic,
      style: data.style ? MindElixirAdapter.styleFromMindElixir(data.style) : undefined,
      children: (data.children ?? []).map(MindElixirAdapter.mindElixirToNode.bind(MindElixirAdapter)),
    });
  }

  private static styleToMindElixir(style: NodeStyle): MindElixirNodeData['style'] {
    return {
      background: style.background,
      color: style.color,
      fontSize: style.fontSize?.toString(),
      fontWeight: style.fontWeight,
    };
  }

  private static styleFromMindElixir(style: NonNullable<MindElixirNodeData['style']>): NodeStyle {
    return {
      background: style.background,
      color: style.color,
      fontSize: style.fontSize ? parseInt(style.fontSize, 10) : undefined,
      fontWeight: style.fontWeight,
    };
  }
}
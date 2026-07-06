export class FrontendMindMapAdapter {
  static toMindElixir(appContent) {
    return {
      nodeData: FrontendMindMapAdapter.nodeToMindElixir(appContent.root)
    };
  }

  static fromMindElixir(mindElixirData) {
    return {
      root: FrontendMindMapAdapter.nodeFromMindElixir(mindElixirData.nodeData)
    };
  }

  static nodeToMindElixir(node) {
    const result = {
      id: node.id,
      topic: node.label,
    };
    if (node.style) {
      result.style = {};
      if (node.style.background) result.style.background = node.style.background;
      if (node.style.color) result.style.color = node.style.color;
      if (node.style.fontSize !== undefined) result.style.fontSize = String(node.style.fontSize);
      if (node.style.fontWeight) result.style.fontWeight = node.style.fontWeight;
    }
    if (node.children && node.children.length > 0) {
      result.children = node.children.map(c => FrontendMindMapAdapter.nodeToMindElixir(c));
    }
    return result;
  }

  static nodeFromMindElixir(nodeData) {
    const result = {
      id: nodeData.id,
      label: nodeData.topic,
      children: [],
    };
    if (nodeData.style) {
      result.style = {};
      if (nodeData.style.background) result.style.background = nodeData.style.background;
      if (nodeData.style.color) result.style.color = nodeData.style.color;
      if (nodeData.style.fontSize !== undefined) result.style.fontSize = parseInt(nodeData.style.fontSize, 10);
      if (nodeData.style.fontWeight) result.style.fontWeight = nodeData.style.fontWeight;
    }
    if (nodeData.children && nodeData.children.length > 0) {
      result.children = nodeData.children.map(c => FrontendMindMapAdapter.nodeFromMindElixir(c));
    }
    return result;
  }
}

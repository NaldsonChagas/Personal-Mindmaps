# Domain Model

## Overview

The domain model is the core of the application. It represents mind maps and their organization without any dependency on frameworks, databases, or UI libraries.

## Entities

### Folder

A container that groups mind maps.

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique identifier |
| `name` | `string` | Display name (non-empty) |
| `createdAt` | `Date` | Creation timestamp |
| `updatedAt` | `Date` | Last update timestamp |

**Behavior:** `rename(newName)` — updates the name, validates non-empty.

### MindMap (Aggregate Root)

A single mind map with a title and tree content. Can belong to a folder or be uncategorized.

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique identifier |
| `title` | `string` | Display title (non-empty) |
| `folderId` | `string \| null` | Parent folder, null if uncategorized |
| `content` | `MindMapContent` | The mind map node tree |
| `createdAt` | `Date` | Creation timestamp |
| `updatedAt` | `Date` | Last update timestamp |

**Behaviors:** `rename`, `moveToFolder`, `updateContent`

### MindMapContent (Value Object)

Holds the root node of the mind map tree.

| Property | Type | Description |
|----------|------|-------------|
| `root` | `MindMapNode` | The root node of the tree |

**Behavior:** `findNode(nodeId)` — depth-first search through the tree.

### MindMapNode (Tree Node)

A single node in the mind map tree.

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique identifier |
| `label` | `string` | Display text (non-empty) |
| `children` | `MindMapNode[]` | Child nodes |
| `style` | `NodeStyle \| undefined` | Optional visual styling |

**Behaviors:** `addChild`, `removeChild`, `updateLabel`

### NodeStyle

| Property | Type |
|----------|------|
| `background` | `string \| undefined` |
| `color` | `string \| undefined` |
| `fontSize` | `number \| undefined` |
| `fontWeight` | `string \| undefined` |

## Domain Independence

The domain model is **not coupled to Mind Elixir**. The `MindElixirAdapter` in the adapters layer handles conversion between the domain model and the Mind Elixir format. This keeps the domain pure and allows the external format to change without affecting business logic.
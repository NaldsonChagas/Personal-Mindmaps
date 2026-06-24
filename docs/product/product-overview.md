# Product Overview

Personal MindMaps is a web application for creating, organizing, and editing personal mind maps.

## What It Does

Users can create mind maps to visually structure thoughts, ideas, and notes. Each mind map is a tree of nodes that can be freely edited: add child nodes, rename, restyle, or remove them.

## Main User Flows

- **List page** — View all mind maps, organized in folders. Create, rename, move, and delete mind maps and folders.
- **Editor page** — Open a mind map to view and edit its content. Add nodes, edit labels, apply styles, reorganize the tree.

## Core Concepts

- **Folders** — Containers that group mind maps. A mind map can also exist outside any folder (uncategorized).
- **Mind Maps** — The main entity. Each mind map has a title and a tree of nodes.
- **Mind Map Nodes** — Individual items in the mind map tree. Each node has a label, optional styling, and child nodes.

## Pages

| Page | Path | Purpose |
|------|------|---------|
| List | `/list` | Browse, create, organize mind maps and folders |
| Editor | `/editor?id=<id>` | View and edit a specific mind map |
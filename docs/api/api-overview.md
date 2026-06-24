# API Overview

## Base URL

`http://localhost:3000` (development)

## Folders

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/folders` | List all folders |
| `GET` | `/api/folders/:id` | Get folder by ID |
| `POST` | `/api/folders` | Create a folder |
| `PUT` | `/api/folders/:id` | Update folder name |
| `DELETE` | `/api/folders/:id` | Delete a folder |

## Mind Maps

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/mind-maps` | List all mind maps (optional `?folderId=` filter) |
| `GET` | `/api/mind-maps/:id` | Get mind map by ID |
| `POST` | `/api/mind-maps` | Create a mind map |
| `PUT` | `/api/mind-maps/:id` | Update title, folder, or content |
| `DELETE` | `/api/mind-maps/:id` | Delete a mind map |

## Request/Response Format

All endpoints use JSON. Mind map content follows the domain model node tree structure. When consumed by the frontend Mind Elixir widget, the content is converted through the MindElixir adapter on the backend.

## Detailed Documentation

Swagger documentation is available at `http://localhost:3000/api` when the backend is running.
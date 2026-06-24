# Frontend Architecture

## Stack

- **Pages:** Two static HTML pages
- **Server:** Minimal Node.js/Express server for static file serving and API proxying
- **Language:** Vanilla JavaScript, CSS, HTML (no SPA framework)

## Pages

### List Page (`/list`)

Displays all mind maps organized by folder. Features:
- Folder list with expand/collapse
- Mind map cards with titles
- Create, rename, move, delete actions for folders and mind maps
- Click a mind map to open the editor

### Editor Page (`/editor?id=<id>`)

Full mind map editing surface. Features:
- Mind Elixir widget for interactive tree editing
- Node add, edit label, delete, restyle
- Save changes to backend
- Back navigation to list page

## API Integration

The frontend communicates with the backend REST API. API calls are isolated from view logic. The integration boundary converts between API response formats and what the UI needs.

## Design Constraints

- No SPA framework — two distinct HTML pages
- Server serves static files and optionally proxies API requests
- Keep UI simple, clean, and accessible
- Mind Elixir data format is handled through the backend adapter, not duplicated in frontend logic
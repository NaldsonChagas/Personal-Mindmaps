# System Overview

## Architecture

Personal MindMaps follows a layered architecture with clear separation between domain, infrastructure, and UI.

```
┌─────────────┐     ┌─────────────┐
│  Frontend   │────▶│  Backend    │────▶ PostgreSQL
│ (2 pages)   │     │ (NestJS 11) │
└─────────────┘     └─────────────┘
```

## Monorepo Structure

The project is a pnpm monorepo with two application packages under `apps/`:

- **`apps/backend`** — NestJS 11 REST API serving domain logic and persistence
- **`apps/frontend`** — Static HTML frontend with two pages, served by a minimal Node.js server

## Separation of Concerns

- **Domain** — Business entities and rules. Independent of frameworks, databases, and UI libraries.
- **Infrastructure** — Persistence (PostgreSQL repositories), HTTP transport (NestJS controllers).
- **UI Integration** — Adapter layer that converts between the domain model and external formats (e.g., Mind Elixir).

## Local Environment

The project runs in Docker Compose with three services:
- `postgres` — Database with local bind mount for persistence
- `backend` — NestJS API
- `frontend` — Static file server
# Local Development

## Prerequisites

- Node.js 24 LTS (use `.nvmrc`: `nvm use`)
- pnpm (`npm install -g pnpm`)
- Docker + Docker Compose

## Quick Start

```bash
cp .env.example .env
docker compose up --build
```

- Frontend: http://localhost:4000
- Backend API: http://localhost:3000
- Swagger docs: http://localhost:3000/api

## Running Without Docker

```bash
# Install dependencies
pnpm install

# Start PostgreSQL via Docker
docker compose up postgres -d

# Start backend
cd apps/backend && pnpm run dev

# Start frontend
cd apps/frontend && pnpm run dev
```

## Useful Commands

```bash
pnpm test        # Run all tests
pnpm lint        # Lint all packages
pnpm format      # Format all files
```
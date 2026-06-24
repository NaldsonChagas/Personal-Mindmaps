# Personal MindMaps

A mind map web application with a NestJS backend and vanilla HTML/CSS/JS frontend.

## Prerequisites

- Node.js 24 LTS (use `.nvmrc`: `nvm use`)
- pnpm (`npm install -g pnpm`)
- Docker + Docker Compose

## Getting Started

```bash
# Clone the repository
git clone <repo-url>
cd mindcanvas

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env

# Start all services (postgres + backend + frontend)
docker-compose up --build
```

Access:

- Frontend: http://localhost:4000
- Backend API: http://localhost:3000
- Swagger docs: http://localhost:3000/api

## Database Backup & Restore

The PostgreSQL data is stored in `./data/postgres/` on the host machine.

```bash
# Backup
tar -czf backup-$(date +%Y%m%d-%H%M%S).tar.gz ./data/postgres

# Restore (stop containers first)
docker-compose down
tar -xzf backup-YYYYMMDD-HHMMSS.tar.gz
docker-compose up
```

## Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/).
Commitlint is enforced via Husky on every commit.

```
feat(scope): short description
fix(scope): short description
chore(scope): short description
docs(scope): short description
```

## Adding a New Resource (Backend)

```bash
cd apps/backend
nest generate resource <resource-name>
```

Follow the existing module structure: controller → service → repository → entity → DTOs.

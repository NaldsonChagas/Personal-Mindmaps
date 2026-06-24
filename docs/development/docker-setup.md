# Docker Setup

## Services

Three services are defined in `docker-compose.yml`:

| Service | Image/Base | Port | Purpose |
|---------|-----------|------|---------|
| `postgres` | `postgres:16-alpine` | 5432 | Database |
| `backend` | Custom (Node.js 24) | 3000 | NestJS API |
| `frontend` | Custom (Node.js 24) | 4000 | Static file server |

## PostgreSQL Persistence

PostgreSQL data is stored in `./data/postgres/` on the host machine via a bind mount. This keeps the database data outside the container lifecycle, making it easy to back up or inspect.

```bash
# Backup
tar -czf backup-$(date +%Y%m%d-%H%M%S).tar.gz ./data/postgres

# Restore (stop containers first)
docker compose down
tar -xzf backup-YYYYMMDD-HHMMSS.tar.gz
docker compose up
```

## Environment Variables

Copy `.env.example` to `.env` before starting. Key variables:

- `POSTGRES_*` — Database credentials
- `DATABASE_URL` — Connection string for the backend
- `API_URL` — Backend URL for the frontend
- `BACKEND_PORT` / `FRONTEND_PORT` — Service ports
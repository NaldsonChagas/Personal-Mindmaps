# Technology Choices

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Runtime | Node.js 24 LTS | Latest LTS, stable, required for project |
| Backend framework | NestJS 11 | Structured, modular, TypeScript-native |
| Database | PostgreSQL 16 | Reliable, well-supported, SQL |
| Containerization | Docker Compose | Consistent local environment, easy setup |
| Frontend approach | Two HTML pages, no SPA | Simple scope, no framework overhead |
| Mind map UI | Mind Elixir (adapter boundary) | Well-maintained library; domain does not depend on it |
| Package manager | pnpm | Fast, strict, monorepo-friendly |
| Testing | Jest with ts-jest | Simple, sufficient for domain unit tests |

## Why Not an SPA Framework

The application has only two pages. A full SPA framework adds complexity (routing, state, bundling) that is unnecessary for this scope. Vanilla HTML/CSS/JS keeps the frontend simple and maintainable.

## Why Mind Elixir Is an Adapter, Not a Domain Dependency

Mind Elixir is a UI library with its own data format. The domain model uses its own entities (MindMapNode, MindMapContent) that represent the business concepts. The adapter converts between the two, so changing the UI library does not affect the domain logic.
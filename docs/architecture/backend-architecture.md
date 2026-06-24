# Backend Architecture

## Stack

- **Framework:** NestJS 11
- **Database:** PostgreSQL 16
- **Language:** TypeScript (strict mode)

## Module Structure

The backend follows the standard NestJS modular structure:

```
src/
├── domain/
│   ├── folder/
│   │   └── folder.entity.ts
│   ├── mind-map/
│   │   ├── mind-map.entity.ts
│   │   ├── mind-map-content.entity.ts
│   │   └── mind-map-node.entity.ts
│   ├── ports/
│   │   ├── folder.repository.interface.ts
│   │   └── mind-map.repository.interface.ts
│   └── adapters/
│       └── mind-elixir.adapter.ts
├── application/
│   ├── folders/
│   │   ├── folders.controller.ts
│   │   ├── folders.service.ts
│   │   └── dto/
│   ├── mind-maps/
│   │   ├── mind-maps.controller.ts
│   │   ├── mind-maps.service.ts
│   │   └── dto/
├── infrastructure/
│   ├── persistence/
│   │   ├── folder.repository.ts
│   │   ├── mind-map.repository.ts
│   │   └── entities/
└── main.ts
```

## Layers

- **Domain layer** — Business entities, value objects, repository interfaces (ports), and format adapters. Has zero NestJS or ORM dependencies.
- **Application layer** — NestJS modules with controllers, services, and DTOs. Controllers handle HTTP, services contain use-case orchestration.
- **Infrastructure layer** — Concrete repository implementations, ORM entity mappings, database configuration.

## Key Principles

- Controllers are thin — they validate input and delegate to services
- Services contain business logic orchestration but delegate domain operations to entities
- Repositories implement domain interfaces and handle persistence only
- Domain entities never depend on NestJS, TypeORM, or external libraries
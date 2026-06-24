# Backend Rules

- The backend must use NestJS 11
- All API endpoints must follow REST conventions
- Use DTO validation on input boundaries (class-validator or equivalent)
- Controllers must not contain business logic
- Services must not depend directly on ORM entities for domain behavior
- Repositories must implement domain port interfaces (hexagonal architecture)
- Domain entities must not depend on NestJS, TypeORM, or any external frontend library
- Keep persistence concerns in the infrastructure layer
- PostgreSQL is the required database — no other database is supported
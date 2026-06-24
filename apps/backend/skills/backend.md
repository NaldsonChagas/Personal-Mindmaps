# Backend Skills

## How to Work Effectively on the Backend

### Follow NestJS Conventions

Use the standard NestJS module structure: controllers handle HTTP, services contain use-case logic, and modules organize related features.

### Keep Controllers Thin

Controllers validate input and delegate to services. They should not contain business logic or direct repository calls.

### Keep Services Focused

Services orchestrate use cases. They call repositories, invoke domain entity behavior, and coordinate across modules. Keep each service method focused on a single responsibility.

### Repositories Handle Persistence Only

Repository implementations map domain entities to database records and back. They should not contain business logic.

### Domain Independence

Domain entities must not depend on NestJS, TypeORM, or any external library. Domain logic lives in the domain layer and is testable without frameworks.

### Use REST Conventions Consistently

- `GET` for queries
- `POST` for creation
- `PUT` for full updates
- `DELETE` for removal
- Use plural nouns for resource paths (`/folders`, `/mind-maps`)

### Use DTOs and Domain Entities Appropriately

- DTOs define the transport contract (what comes in and out of the API)
- Domain entities encapsulate business logic and state
- Convert between them at service boundaries

### Prefer Explicit Code

Write readable service methods. Use repository interfaces for dependency inversion. Avoid magic strings, hidden side effects, and over-abstraction.
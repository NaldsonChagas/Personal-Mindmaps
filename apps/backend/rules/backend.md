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

## Swagger / OpenAPI

All controllers and DTOs must be fully documented with `@nestjs/swagger` decorators so the generated OpenAPI document is complete and accurate.

- Every controller class must have an `@ApiTags('ResourceName')` decorator with a human-readable tag
- Every endpoint must have an `@ApiOperation({ summary: '...' })` decorator
- Every path parameter must have an `@ApiParam({ name: '...', description: '...' })` decorator
- Every query parameter must have an `@ApiQuery({ name: '...', required: ..., description: '...' })` decorator
- Every endpoint must document its success response with the appropriate shorthand decorator:
  - `@ApiResponse({ status: 200, ... })` for GET and PATCH
  - `@ApiCreatedResponse(...)` for POST (201)
  - `@ApiNoContentResponse(...)` for DELETE (204)
- Error response documentation is required — at minimum `@ApiNotFoundResponse({ description: '...' })` for endpoints that look up resources by ID
- Every request DTO property must use `@ApiProperty()` or `@ApiPropertyOptional()` with meaningful `example`, `description`, or `nullable` values
- Every response DTO property must use `@ApiProperty()` or `@ApiPropertyOptional()`
# Testing Strategy

## Test Layers

### Domain Unit Tests

Test domain entities and value objects in isolation. No frameworks, no database.

**Location:** `apps/backend/src/domain/tests/`

**What to test:**
- Entity creation and state changes
- Validation rules (non-empty names, etc.)
- Value object behavior (findNode, createDefault)
- Adapter conversions (domain ↔ external format)

Run with: `cd apps/backend && pnpm test`

### Service / Integration Tests

Test NestJS services with real or in-memory repository implementations.

**What to test:**
- Use-case orchestration in services
- DTO validation
- Repository interaction

### End-to-End Tests

Test the full stack through the API.

**What to test:**
- Complete user flows (create folder → create mind map → edit → save)
- API contract compliance

## Current State

Domain unit tests are in place for all entities, the MindMapContent value object, and the MindElixir adapter. Service and E2E tests will be added as the HTTP layer is built.
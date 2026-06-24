# General Skills

## How to Work Effectively in This Repository

### Understand the Product Before Implementing

Read the relevant product and architecture documentation before making changes. Know what you are building and why.

### Prefer Small, Focused Changes

Make changes that do one thing. Keep commits and PRs narrow in scope.

### Update Documentation

When you change architecture, behavior, or conventions, update the relevant docs. Documentation that does not match the code is worse than no documentation.

### Reuse Existing Patterns

Before introducing a new pattern, look at what already exists in the codebase. Follow the same conventions unless there is a strong reason not to.

### Preserve Separation of Concerns

- Domain logic does not belong in controllers or UI code
- Persistence details do not belong in domain entities
- Framework-specific code does not belong in domain modules

### Keep Domain Language Explicit

Use the same terms in code, documentation, and discussions. Folder, MindMap, MindMapNode — these are the building blocks. Do not rename them without updating the domain model documentation.

### Validate Assumptions Against Documentation

If you are unsure about architecture or behavior, check the docs first. Do not guess.
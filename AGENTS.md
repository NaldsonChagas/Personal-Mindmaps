# AGENTS.md

This file is the entry point for AI agents working in the Personal MindMaps repository. Read this first, then follow the references to find the right guidance for your task.

## Project Summary

Personal MindMaps is a web application for creating, organizing, and editing personal mind maps. Users can create mind maps (visual tree structures), organize them in folders, rename, move, and delete them. The application has two main pages: a list page (for browsing and organizing) and an editor page (for editing a mind map's content).

## Repository Structure

```
├── AGENTS.md                  # This file — AI agent entry point
├── README.md                  # Non-technical product overview
├── docs/                      # Technical and architectural documentation
│   ├── product/               # Product context
│   ├── architecture/          # System, backend, frontend, domain model
│   ├── decisions/             # Technology decisions and rationale
│   ├── development/           # Local dev, Docker, testing
│   └── api/                   # API overview
├── skills/                    # General working guidance (root level)
├── rules/                     # General constraints and conventions (root level)
├── apps/
│   ├── frontend/
│   │   ├── skills/            # Frontend-specific working guidance
│   │   └── rules/             # Frontend-specific constraints
│   └── backend/
│       ├── skills/            # Backend-specific working guidance
│       └── rules/             # Backend-specific constraints
```

## Where to Find Information

- Product context → `docs/product/product-overview.md`
- Architecture overview → `docs/architecture/system-overview.md`
- Backend architecture → `docs/architecture/backend-architecture.md`
- Frontend architecture → `docs/architecture/frontend-architecture.md`
- Domain model → `docs/architecture/domain-model.md`
- Technology decisions → `docs/decisions/technology-choices.md`
- Local setup → `docs/development/local-development.md`
- Docker setup → `docs/development/docker-setup.md`
- Testing strategy → `docs/development/testing-strategy.md`
- API overview → `docs/api/api-overview.md`
- General working guidance → `skills/general.md`
- General constraints and conventions → `rules/general.md`
- Frontend working guidance → `apps/frontend/skills/frontend.md`
- Frontend constraints and conventions → `apps/frontend/rules/frontend.md`
- Backend working guidance → `apps/backend/skills/backend.md`
- Backend constraints and conventions → `apps/backend/rules/backend.md`

## How Agents Should Work

- Read relevant documentation before making changes. Do not guess architecture if documentation exists.
- Read root guidance first, then app-specific guidance when working in frontend or backend.
- Keep changes aligned with the domain model and existing conventions.
- Update documentation when introducing relevant structural changes.
- Keep README non-technical. Place technical details in `docs/`.
- Avoid mixing business rules with infrastructure details.
- Keep the domain independent from external frontend libraries.

## Writing Standards

- Everything must be written in English.
- Use clear names for files, variables, functions, classes, and modules.
- Avoid unnecessary comments.
- Keep code and documentation concise and explicit.
- Follow existing rules and skill files before creating new patterns.

## Priority Order

When conflicting guidance exists, use this order:

1. **AGENTS.md** — this file
2. **Rules** — root and app-specific `rules/*.md`
3. **Skills** — root and app-specific `skills/*.md`
4. **Documentation** — `docs/**/*.md`
5. **Existing code patterns** — conventions already present in the repository

Rules win over skills. App-specific rules win over root rules for app-local decisions. Documented architecture wins over assumptions.
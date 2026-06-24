# General Rules

## Language

All code, comments, documentation, and commit messages must be written in English.

## Documentation

- Do not place technical architecture details in the root README
- Technical, architectural, and implementation details belong in `docs/`
- The root README is for product description and basic usage only

## Runtime

- Use Node.js 24 LTS
- Use PostgreSQL in Docker for local development
- Persist PostgreSQL data through a local bind mount at `./data/postgres/` for backup convenience

## Code Quality

- Follow clean code principles
- Avoid unnecessary comments — let the code speak
- Use clear, explicit naming for files, variables, functions, classes, and modules
- Keep business rules separate from technical implementation details
- Do not couple the project domain to Mind Elixir or any external UI library
# Frontend Rules

- Do not use SPA libraries or frameworks (React, Vue, Svelte, Angular, etc.)
- The frontend must have exactly two HTML pages: a list page and an editor page
- Use a minimal Node.js server for static file serving only
- Keep the UI simple, clean, and accessible
- Use accessible HTML semantics (proper headings, labels, ARIA attributes where needed)
- Item actions (create, rename, move, delete) must be predictable and consistent across pages
- Frontend-specific library details must not leak into the application domain
- Do not create unnecessary abstractions for a small UI — keep it direct and readable
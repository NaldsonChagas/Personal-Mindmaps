# Frontend Skills

## How to Work Effectively on the Frontend

### Understand the Page Structure

The frontend has two HTML pages — a list page and an editor page. There is no SPA framework. Each page is a self-contained HTML document with its own CSS and JavaScript.

### Keep the UI Simple

Use clean layouts, consistent spacing, and minimal styling. Prefer native HTML semantics over custom components. Reuse UI patterns for dialogs, dropdowns, and cards.

### Isolate API Integration

Keep API calls separate from view logic. Use a small module or helper functions to handle requests and data transformation. The views should call these helpers, not make raw fetch calls.

### Use Progressive Enhancement

Start with functional HTML. Add JavaScript for interactivity, not for basic rendering. Make sure core flows work without JS where possible.

### Respect the Backend Contract

The API defines the data shapes. Do not reshape the frontend architecture to match a UI library's preferred format. Use adapters at the boundary instead.

### Mind Elixir Integration

The Mind Elixir library belongs in the editor page. Its data format enters and leaves through the backend adapter. The frontend works with the same domain-shaped data as the backend. If the UI library changes, only the editor page integration code changes — not the API contract or the domain model.
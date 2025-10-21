# Gong Org Chart – Frontend Exercise

An interactive React + TypeScript org chart that authenticates users, fetches Gong’s hierarchy from Firebase, and renders expandable manager trees with Tailwind styling.

## Features

- Email/password login backed by Firebase secrets with session restoration via `localStorage`.
- Hierarchical tree view of employees with manager/child connectors and smooth expand/collapse.
- Tailwind utility classes for consistent spacing, borders, and hierarchy styling.

## Tech Stack

- **Framework:** React 19 with React Router
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 4 (`@tailwindcss/vite`)

## Getting Started

### Install

```bash
npm install
```

### Configure Environment

```bash
touch .env
```

Ensure `VITE_FIREBASE_ROOT` is set to the Firebase database given in the exercise.

### Run the Dev Server

```bash
npm run dev
```

The app serves on `http://localhost:5173` by default. Vite hot-reloads as you edit files.

### Build for Production

```bash
npm run build
```

Artifacts are emitted to `dist/`. Preview the production bundle locally with:

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Environment & Configuration

- Firebase base URL is read from the `VITE_FIREBASE_ROOT` environment variable and must live in `.env` file.

## Project Structure

```
src/
├── auth/           # Auth provider, context, hooks
├── components/     # Reusable UI components (TreeNode, UserBadge, etc.)
├── lib/            # Utilities (e.g., credential encoder)
├── pages/          # Routed pages (Login, Hierarchy)
├── services/       # Firebase data access
├── types.ts        # Shared TypeScript types
└── main.tsx        # App bootstrap with providers
```

### Routes

- `/login` — User authentication page
- `/` — Displays the user hierarchy tree (main app view)

The hierarchy page is set as the root route so users immediately see the organization structure after logging in.

## UX Considerations

- Login page is inspired from existing Gong welcome sign in page so input fields have placeholders of what is expected.
- The tree has a large breadth (more than 2 levels) so I added a tree line/hierarchy connector line which is a vertical border that helps visually connect parent to child nodes in a tree structure.
- Manager branches are automatically expanded on initial load so users can view the full hierarchy without needing to click through each level.
- Utilize cursor pointer on tree buttons if managers have expanding or collapsing branches available for view.
- Some user photos were not visible due to failure to load so it will show user initials instead.

## Deployment

Live demo: https://gong-frontend-exercise.vercel.app

# SkillPath Frontend Application

React 19 + Vite 8 + Tailwind CSS v4 full-stack client application.

## Development Server

Vite development server running on `$PORT` (default 8443 or 5173).

- Hot reload: Changes to source files are reflected immediately
- API Proxy: Automatically proxies `/api` requests to backend on port 4000

## Project Structure

- `src/main.tsx` - React entrypoint; mounts `src/App.tsx` into `#root` element
- `src/App.tsx` - App entrypoint with `ErrorBoundary`, `AuthProvider`, and `RouterProvider`
- `src/routes/` - Centralized React Router configuration
- `src/features/` - Feature modules (auth, roadmap, practice, projects, resources, analytics, goals, notifications, settings, marketing)
- `src/components/` - Shared UI, Layout, and Common components
- `src/services/` - Typed REST API client
- `src/index.css` - Global CSS entrypoint and Tailwind CSS v4 styling
- `index.html` - HTML shell
- `package.json` - Project dependencies and scripts
- `vite.config.ts` - Vite configuration with React, Tailwind CSS v4, and `@` alias for `src`

# AtomQuest

In-house Goal Setting & Tracking Portal for employee goals, manager approvals, quarterly check-ins, dashboards, reporting, audit logs, and notifications.

## Features
- JWT authentication with role-based access control
- Employee goal creation, editing, and submission
- Manager review, approval, rejection, and inline edits
- Shared goals for department KPIs
- Quarterly check-ins with progress tracking
- Role-aware dashboards with charts
- CSV and Excel reporting exports
- Audit trail logging for key actions
- Notification feed for workflow events

## Tech Stack
- Frontend: React 19, Vite, Tailwind CSS, Redux Toolkit, React Router DOM, Axios, Recharts, React Hook Form, Zod
- Backend: Node.js, Express.js, MongoDB Atlas, Mongoose, JWT, bcryptjs, Multer, Node Cron
- Hosting: Vercel frontend, Render backend, MongoDB Atlas database

## Workspace
- `apps/web` - React frontend
- `apps/api` - Express API
- `packages/shared` - shared types and validation
- `docs/architecture.md` - architecture and module boundaries

## Setup
1. Copy `.env.example` into your local environment files.
2. Install dependencies with `corepack pnpm install`.
3. Start the frontend with `corepack pnpm --filter @atomquest/web dev`.
4. Start the backend with `corepack pnpm --filter @atomquest/api dev`.
5. Seed demo data with `corepack pnpm seed` after configuring `MONGO_URI`.

## Architecture
- Browser -> React/Vite -> Axios -> Express API -> MongoDB Atlas

See [docs/architecture.md](docs/architecture.md) for the module map and request flow.

## Screenshots
- Frontend dashboard: add after first Vercel deployment.
- Goal creation: add after first Vercel deployment.
- Manager review: add after first Vercel deployment.

## Demo Credentials
- `employee@atomquest.local` / `Password123!`
- `manager@atomquest.local` / `Password123!`
- `admin@atomquest.local` / `Password123!`

## Deployment
- Frontend: Vercel config lives in `apps/web/vercel.json`
- Backend: Render config lives in `render.yaml`
- Database: MongoDB Atlas with `MONGO_URI`

## Scripts
- `corepack pnpm dev`
- `corepack pnpm build`
- `corepack pnpm build:web`
- `corepack pnpm build:api`
- `corepack pnpm check`
- `corepack pnpm seed`

## Notes
- The portal is scaffolded as a monorepo so the frontend, backend, and shared contracts can evolve independently.
- Feature work should continue from the existing module boundaries rather than collapsing everything into a single app layer.

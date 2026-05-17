# Architecture

Frontend: React 19 + Vite + Tailwind + Redux Toolkit + React Router DOM.
Backend: Node.js + Express + Mongoose + JWT + bcryptjs.
Shared: workspace package for domain constants and Zod schemas.

Request flow:
Browser -> Vite app -> Axios client -> Express API -> MongoDB Atlas

Core modules:
- Auth
- Goals
- Manager approvals
- Shared goals
- Quarterly check-ins
- Dashboards
- Reporting
- Audit logs
- Notifications

# Joyful Vibe

Clean, modern, and appealing full-stack web app built with React (Vite + TypeScript) and FastAPI, featuring JWT auth, Postgres, Tailwind + shadcn/ui, React Query, i18n, and Dockerized dev.

- Frontend: `Vite + React + TS`, Tailwind, shadcn/ui, Framer Motion, React Router, React Query, Axios.
- Backend: `FastAPI`, SQLAlchemy + Alembic, PostgreSQL, JWT (access + refresh), CORS, rate limiting, structured logging, Pydantic.
- Tooling: ESLint + Prettier, Jest/RTL + Pytest, Husky hooks, GitHub Actions.

## Quick Start (Docker)

1. Copy envs and adjust if needed:
   - `cp .env.example .env`
   - `cp backend/.env.example backend/.env`
   - `cp frontend/.env.example frontend/.env`

2. Start services:
   - `docker compose up --build`
   - Frontend: http://localhost:5173
   - Backend: http://localhost:8000 (docs at `/docs`)
   - DB: Postgres exposed on 5432 (optional)

3. Initialize DB + seed demo data (first time):
   - `docker compose exec backend alembic upgrade head`
   - `docker compose exec backend python -m app.seed`

Login demo accounts:
- Admin: `admin@example.com` / `admin1234`
- User: `user@example.com` / `user1234`

## Local Dev (separate terminals)

- Backend
  - `cd backend && python -m venv .venv && source .venv/bin/activate`
  - `pip install -r requirements.txt`
  - `cp .env.example .env`
  - Start: `uvicorn app.main:app --reload`

- Frontend
  - `cd frontend && corepack enable && pnpm i` (or `npm i`)
  - `cp .env.example .env`
  - Start: `pnpm dev` (or `npm run dev`)

## Scripts

- `make up` — run Docker stack
- `make down` — stop stack
- `make seed` — run DB migrations + seed
- `make test` — run backend + frontend tests

## Project Structure

- `/frontend` — Vite React app (TS)
- `/backend` — FastAPI app
- `/infra` — Docker, CI

See `DESIGN.md` for design system and UX notes.

## CI

GitHub Actions run lint, test, and build for both frontend and backend on pushes and PRs.

## License

This project is provided as-is for demonstration purposes.

SHELL := /bin/bash

.PHONY: up down logs seed backend-shell frontend-shell test lint fmt

up:
	docker compose up --build

down:
	docker compose down -v

logs:
	docker compose logs -f --tail=200

seed:
	docker compose exec backend alembic upgrade head
	docker compose exec backend python -m app.seed

backend-shell:
	docker compose exec backend bash

frontend-shell:
	docker compose exec frontend sh

test:
	docker compose exec backend pytest -q
	docker compose exec frontend npm test -- --ci --passWithNoTests

lint:
	docker compose exec backend flake8
	docker compose exec frontend npm run lint

fmt:
	docker compose exec backend black .
	docker compose exec frontend npm run format

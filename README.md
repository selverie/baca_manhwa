# 🗂️ BacaManhwa — Monorepo

Full-stack manhwa catalog application built for onboarding purposes.

## Project Structure

```
BACA_MANHWA/
├── docs/              # Preview screenshots
├── backend/           # NestJS REST API + PostgreSQL
├── frontend/          # React + Vite + TailwindCSS
└── docker-compose.yml
```

## 📸 Preview

| Page             | Screenshot                      |
|------------------|---------------------------------|
| Home             | ![Home](docs/home.png)          |
| Bookmarks        | ![Bookmarks](docs/bookmarks.png)|
| Manhwa Detail    | ![Detail](docs/detail.png)      |
| Admin Dashboard  | ![Admin](docs/admin.png)        |
| Editor Dashboard | ![Editor](docs/editor.png)      |

## 🚀 Quick Start (Docker)

```bash
# Clone the repo, then start all services at once
docker-compose up -d

# Seed the database (run once after containers are up)
docker-compose exec api npm run seed
```

| Service  | URL                              |
|----------|----------------------------------|
| Frontend | http://localhost:5173            |
| API      | http://localhost:3000/api/v1     |
| Swagger  | http://localhost:3000/api/docs   |

## 🌱 Seed Accounts

After seeding, the following accounts are available:

| Role   | Email              | Password    |
|--------|--------------------|-------------|
| Admin  | admin@manhwa.com   | password123 |
| Editor | editor@manhwa.com  | password123 |
| User   | alice@manhwa.com   | password123 |
| User   | bob@manhwa.com     | password123 |

10 sample manhwas are also created.

## 🔐 Roles & Permissions

| Feature           | GUEST | USER | EDITOR | ADMIN |
|-------------------|-------|------|--------|-------|
| View manhwas      | ✅    | ✅   | ✅     | ✅    |
| Manage bookmarks  | ❌    | ✅   | ✅     | ✅    |
| CRUD manhwas      | ❌    | ❌   | ✅     | ✅    |
| User management   | ❌    | ❌   | ❌     | ✅    |
| Change user roles | ❌    | ❌   | ❌     | ✅    |

## 📄 Further Documentation

- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)
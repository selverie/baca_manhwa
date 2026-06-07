# BacaManhwa — Backend API

NestJS REST API for the BacaManhwa catalog app. For full project overview, Docker setup, seed accounts, and role permissions, see the [root README](../README.md).

## Tech Stack

- **Framework:** NestJS 10
- **Language:** TypeScript
- **Database:** PostgreSQL 16
- **ORM:** TypeORM
- **Authentication:** JWT + Passport
- **Password Hashing:** bcrypt
- **Validation:** class-validator
- **Documentation:** Swagger (OpenAPI)
- **Containerization:** Docker + Docker Compose

## Local Development

> To run the full stack together, use Docker Compose from the root directory instead.

For backend-only local development:

```bash
npm install
cp .env.example .env
# Edit .env — set DB_HOST=localhost

# Start only the database via Docker
docker-compose up postgres -d

# Start dev server
npm run start:dev
```

## API Endpoints

### Authentication

| Method | Endpoint              | Auth   | Description          |
|--------|-----------------------|--------|----------------------|
| POST   | /api/v1/auth/register | Public | Register new account |
| POST   | /api/v1/auth/login    | Public | Login and get token  |

### Users (Admin only)

| Method | Endpoint               | Auth  | Description      |
|--------|------------------------|-------|------------------|
| GET    | /api/v1/users          | Admin | Get all users    |
| PATCH  | /api/v1/users/:id/role | Admin | Update user role |

### Manhwas

| Method | Endpoint            | Auth           | Description       |
|--------|---------------------|----------------|-------------------|
| GET    | /api/v1/manhwas     | Public         | List all manhwas  |
| GET    | /api/v1/manhwas/:id | Public         | Get manhwa detail |
| POST   | /api/v1/manhwas     | Admin / Editor | Create manhwa     |
| PATCH  | /api/v1/manhwas/:id | Admin / Editor | Update manhwa     |
| DELETE | /api/v1/manhwas/:id | Admin / Editor | Delete manhwa     |

### Bookmarks

| Method | Endpoint              | Auth                  | Description      |
|--------|-----------------------|-----------------------|------------------|
| GET    | /api/v1/bookmarks     | User / Editor / Admin | Get my bookmarks |
| POST   | /api/v1/bookmarks     | User / Editor / Admin | Add bookmark     |
| DELETE | /api/v1/bookmarks/:id | User / Editor / Admin | Remove bookmark  |

## Project Structure

```
src/
├── auth/                        # Authentication module
│   ├── dto/                     # register.dto, login.dto
│   ├── interfaces/              # jwt-payload.interface
│   ├── strategies/              # jwt.strategy
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
│
├── users/                       # User management module
│   ├── dto/                     # update-user-role.dto
│   ├── entities/                # user.entity
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
│
├── manhwas/                     # Manhwa CRUD module
│   ├── dto/                     # create-manhwa.dto, update-manhwa.dto
│   ├── entities/                # manhwa.entity
│   ├── manhwas.controller.ts
│   ├── manhwas.service.ts
│   └── manhwas.module.ts
│
├── bookmarks/                   # Bookmarks module
│   ├── dto/                     # create-bookmark.dto
│   ├── entities/                # bookmark.entity
│   ├── bookmarks.controller.ts
│   ├── bookmarks.service.ts
│   └── bookmarks.module.ts
│
├── common/                      # Shared utilities
│   ├── decorators/              # @Roles, @CurrentUser, @Public
│   ├── enums/                   # UserRole enum
│   ├── filters/                 # HttpExceptionFilter
│   ├── guards/                  # JwtAuthGuard, RolesGuard
│   └── interceptors/            # ResponseInterceptor
│
├── config/                      # Configuration
│   ├── app.config.ts
│   └── database.config.ts
│
├── database/
│   └── seeders/
│       └── seed.ts              # Database seeder
│
├── app.module.ts
└── main.ts
```

## Environment Variables

| Variable       | Description           | Default        |
|----------------|-----------------------|----------------|
| NODE_ENV       | Environment           | development    |
| PORT           | API port              | 3000           |
| DB_HOST        | PostgreSQL host       | postgres       |
| DB_PORT        | PostgreSQL port       | 5432           |
| DB_USERNAME    | Database user         | postgres       |
| DB_PASSWORD    | Database password     | postgres       |
| DB_NAME        | Database name         | manhwa_tracker |
| JWT_SECRET     | JWT signing secret    | —              |
| JWT_EXPIRES_IN | Token expiry duration | 7d             |

## Example Requests

**Register**
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "password": "password123"}'
```

**Login**
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@manhwa.com", "password": "password123"}'
```

**Create Manhwa (Admin/Editor)**
```bash
curl -X POST http://localhost:3000/api/v1/manhwas \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"title": "My Manhwa", "author": "Author Name", "synopsis": "A great story..."}'
```

**Add Bookmark**
```bash
curl -X POST http://localhost:3000/api/v1/bookmarks \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"manhwaId": "<manhwa-uuid>"}'
```

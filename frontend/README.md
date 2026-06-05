# BacaManhwa — Frontend

Aplikasi web katalog manhwa untuk onboarding frontend dengan React, SWR, TailwindCSS, Ant Design, dan Axios.

## Tech Stack

- React 19 + Vite + TypeScript
- TailwindCSS v4
- Ant Design v6
- SWR (data fetching)
- React Router v7
- Axios

## Setup

```bash
npm install
cp .env.example .env
# Set VITE_API_URL ke URL backend kamu
npm run dev
```

## Struktur Folder

```
src/
├── components/        # PublicNavbar, ManhwaCard
├── constants/         # PAGE_PATH, STORAGE_KEY
├── hooks/             # useAuth (context), useData (SWR hooks)
├── layouts/           # DashboardLayout
├── pages/
│   ├── auth/          # LoginPage, RegisterPage
│   ├── bookmarks/     # BookmarksPage
│   ├── dashboard/     # EditorDashboardPage, AdminDashboardPage
│   └── public/        # HomePage, ManhwaDetailPage
├── routes/            # Routes + ProtectedRoute
├── services/          # Axios API layer
└── types/             # TypeScript interfaces
```

## Role & Redirect setelah Login

| Role   | Redirect           |
|--------|--------------------|
| ADMIN  | /dashboard/admin   |
| EDITOR | /dashboard/editor  |
| USER   | /                  |

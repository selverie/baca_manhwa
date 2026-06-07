# BacaManhwa — Frontend

React-based manhwa catalog web app. For full project overview, Docker setup, seed accounts, and role permissions, see the [root README](../README.md).

## Tech Stack

- React 19 + Vite + TypeScript
- TailwindCSS v4
- Ant Design v6
- SWR (data fetching)
- React Router v7
- Axios

## Local Development

```bash
npm install
cp .env.example .env
# Set VITE_API_URL to your backend URL
npm run dev
```

> To run the full stack together, use Docker Compose from the root directory instead.

## Folder Structure

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

## Post-Login Redirect by Role

| Role   | Redirect          |
|--------|-------------------|
| ADMIN  | /dashboard/admin  |
| EDITOR | /dashboard/editor |
| USER   | /                 |

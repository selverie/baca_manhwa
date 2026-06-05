export const PAGE_PATH = Object.freeze({
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  MANHWA_DETAIL: (id: string) => `/manhwa/${id}`,
  BOOKMARKS: '/bookmarks',
  DASHBOARD: {
    EDITOR: '/dashboard/editor',
    ADMIN: '/dashboard/admin',
  },
  // keep backward compat with boilerplate
  USER: {
    LIST: '/dashboard/admin',
    CREATE_USER: '/dashboard/admin',
    EDIT_USER: (id: string) => `/dashboard/admin?edit=${id}`,
  },
});

export const STORAGE_KEY = Object.freeze({
  TOKEN: 'baca_manhwa_token',
  USER: 'baca_manhwa_user',
});

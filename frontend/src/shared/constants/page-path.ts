export const PAGE_PATH = Object.freeze({
  LOGIN: '/login',
  DASHBOARD: '/',
  USER: {
    LIST: '/user-management/users',
    CREATE_USER: '/user-management/users/create',
    EDIT_USER: (id: string) => `/user-management/users/${id}`,
  },
});

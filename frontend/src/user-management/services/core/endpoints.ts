export const USER_ENDPOINTS = Object.freeze({
  GET: '/api/users',
  CREATE: '/api/users',
  GET_BY_ID: (id: string) => `/api/users/${id}`,
  UPDATE_BY_ID: (id: string) => `/api/users/${id}`,
  DELETE_BY_ID: (id: string) => `/api/users/${id}`,
});

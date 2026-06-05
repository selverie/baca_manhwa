import useSWR from 'swr';
import { manhwaService, bookmarkService, userService } from '../services';
import type { Manhwa, Bookmark, User } from '../types';

// Fetchers
const manhwaFetcher = () => manhwaService.getAll().then((r) => r.data as Manhwa[]);
const manhwaByIdFetcher = (id: string) =>
  manhwaService.getById(id).then((r) => r.data as Manhwa);
const bookmarkFetcher = () =>
  bookmarkService.getAll().then((r) => r.data as Bookmark[]);
const userFetcher = () => userService.getAll().then((r) => r.data as User[]);

export function useManhwas() {
  return useSWR('/api/v1/manhwas', manhwaFetcher);
}

export function useManhwa(id: string) {
  return useSWR(id ? `/api/v1/manhwas/${id}` : null, () =>
    manhwaByIdFetcher(id),
  );
}

export function useBookmarks(isAuthenticated: boolean) {
  return useSWR(isAuthenticated ? '/api/v1/bookmarks' : null, bookmarkFetcher);
}

export function useUsers(isAdmin: boolean) {
  return useSWR(isAdmin ? '/api/v1/users' : null, userFetcher);
}

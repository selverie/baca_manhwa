export type UserRole = 'USER' | 'EDITOR' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    accessToken: string;
  };
  timestamp: string;
}

export interface Manhwa {
  id: string;
  title: string;
  author: string;
  synopsis: string;
  coverImage: string;
  createdAt: string;
  updatedAt: string;
}

export interface Bookmark {
  id: string;
  userId: string;
  manhwaId: string;
  createdAt: string;
  manhwa?: Manhwa;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface CreateManhwaDto {
  title: string;
  author: string;
  synopsis?: string;
  coverImage?: string;
}

export interface UpdateManhwaDto {
  title?: string;
  author?: string;
  synopsis?: string;
  coverImage?: string;
}

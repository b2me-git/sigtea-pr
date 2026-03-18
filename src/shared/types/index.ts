import React from 'react';

export type RootStackParamList = {
  index: undefined;
  NotFound: undefined;
};

export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  created_at: string;
}

export interface ApiResponse<T> {
  data: T;
  error: string | null;
  status: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

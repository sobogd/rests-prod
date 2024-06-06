import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IUserAuth } from '../back/types';

import { API_URL } from './config';
import { Notice } from './hooks/useNotification';

export const API = createApi({
  reducerPath: 'admin/api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('restsToken');
      if (token) headers.set('authorization', `Bearer ${token}`);

      return headers;
    },
    validateStatus: (response, result) => {
      if (response.status >= 402 || response.status === 400) {
        Notice.error(result?.message || 'Error with request');
      }

      return response.status < 400;
    },
  }),
  endpoints: (b) => ({
    authByHash: b.mutation<IUserAuth, string>({
      query: (hash) => ({
        url: 'auth-hash',
        method: 'POST',
        body: { hash },
      }),
    }),
    auth: b.mutation<
      { token: string; loginHash: string; name?: string },
      { login: string; password: string }
    >({
      query: (body) => ({
        url: 'auth',
        method: 'POST',
        body,
      }),
    }),
    whoami: b.query<any, void>({
      query: () => ({
        url: 'whoami',
        method: 'POST',
      }),
    }),
    register: b.mutation<{ login: string }, any>({
      query: (body) => ({
        url: 'registration',
        method: 'POST',
        body,
      }),
    }),
  }),
});

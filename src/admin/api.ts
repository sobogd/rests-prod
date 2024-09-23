import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ICategory, ICompany, IUser, IUserAuth } from '../back/types';

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
    company: b.query<ICompany, void>({
      query: () => ({
        url: `company`,
        method: 'POST',
      }),
    }),
    updateCompany: b.mutation<void, ICompany>({
      query: (company) => ({
        url: `company-update`,
        method: 'POST',
        body: company,
      }),
    }),
    users: b.query<IUser[], undefined>({
      query: () => ({
        url: `users`,
        method: 'POST',
      }),
    }),
    user: b.query<IUser, number>({
      query: (id) => ({
        url: `user`,
        method: 'POST',
        body: { id },
      }),
    }),
    userCreateOrUpdate: b.mutation<void, IUser>({
      query: (body) => ({
        url: `user-create-or-update`,
        method: 'POST',
        body,
      }),
    }),
    userDelete: b.mutation<void, number>({
      query: (id) => ({
        url: `user-delete`,
        method: 'POST',
        body: {
          id,
        },
      }),
    }),
    categories: b.query<ICategory[], void>({
      query: () => ({
        url: `categories`,
        method: 'POST',
      }),
    }),
    category: b.query<ICategory, number>({
      query: (id) => ({
        url: `category`,
        method: 'POST',
        body: { id },
      }),
    }),
    updateCategory: b.mutation<void, ICategory>({
      query: (body) => ({
        url: `category-update`,
        method: 'POST',
        body,
      }),
    }),
    createCategory: b.mutation<void, ICategory>({
      query: (body) => ({
        url: `category-create`,
        method: 'POST',
        body,
      }),
    }),
    deleteCategory: b.mutation<void, number>({
      query: (id) => ({
        url: `category-remove`,
        method: 'POST',
        body: {
          id,
        },
      }),
    }),
  }),
});

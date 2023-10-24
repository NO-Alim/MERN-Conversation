import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedOut } from '../auth/authSlice';

// prepare a baseQuery
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.SERVER_URL,
  prepareHeaders: async (headers, { getState, endpoint }) => {
    return headers;
  },
});

// apiSlice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401) {
      api.dispatch(userLoggedOut());
      // clear localStorage or cookie
      localStorage.clear();
    }
    return result;
  },
  tagTypes: ['User', 'Friend', 'Messages', 'Conversations'],
  endpoints: (builder) => ({}),
});

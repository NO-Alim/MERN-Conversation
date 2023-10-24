import { apiSlice } from '../api/apiSlice';
import { userLoggedIn, userLoggedOut } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: '/register',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['User'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const user = {
            id: result?.data?.id || null,
            name: result?.data?.name || null,
          };

          // set user in localStorage
          localStorage.setItem(
            'auth',
            JSON.stringify({
              user,
            })
          );

          // dispatch userLoggedIn
          dispatch(
            userLoggedIn({
              user,
            })
          );
        } catch (error) {}
      },
    }),

    login: builder.mutation({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['User', 'Conversations', 'Friend', 'Messages'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const user = {
            id: result?.data?.id || null,
            name: result?.data?.name || null,
          };

          // set user in localStorage
          localStorage.setItem(
            'auth',
            JSON.stringify({
              user,
            })
          );

          // dispatch userLoggedIn
          dispatch(
            userLoggedIn({
              user,
            })
          );
        } catch (error) {}
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'DELETE',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedOut());
          localStorage.clear();
        } catch (error) {}
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  authApi;

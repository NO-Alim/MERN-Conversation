import { socket } from '../../utilities/socket';
import { apiSlice } from '../api/apiSlice';
export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (userId) => ({
        url: '/users',
        method: 'GET',
      }),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;
          socket.on('sendFriendRequest', (data) => {
            // remove this requester from users list
            if (data?.recipient._id == arg) {
              updateCachedData((draft) => {
                const filterItem = draft?.users.filter(
                  (item) => item._id !== data.requester._id
                );
                draft.users = filterItem;
              });
            }
          });
          socket.on('deleteFriendRequest', (data) => {
            if (data?.recipient._id == arg || data?.requester._id == arg) {
              updateCachedData((draft) => {
                draft.users.push(
                  data.recipient._id == arg ? data.requester : data.recipient
                );
              });
            }
          });
        } catch (error) {
          socket.close();
        }
      },
      providesTags: ['User'],
    }),
    searchUser: builder.query({
      query: (data) => ({
        url: '/users/search',
        method: 'GET',
        body: data,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useSearchUserQuery } = usersApi;

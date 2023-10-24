import { socket } from '../../utilities/socket';
import { apiSlice } from '../api/apiSlice';

export const friendsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: '/friends',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const requestedFriend = await queryFulfilled;
          if (requestedFriend?.data) {
            // dispatch getUsers api remove
            dispatch(
              apiSlice.util.updateQueryData(
                'getUsers',
                requestedFriend.data.requester._id.toString(),
                (draft) => {
                  const filterItem = draft?.users.filter(
                    (item) => item._id !== requestedFriend.data.recipient._id
                  );
                  draft.users = filterItem;
                }
              )
            );
            // dispatch getAllRequestedFriend for update requestedFriend
            dispatch(
              apiSlice.util.updateQueryData(
                'getAllRequestedFriend',
                requestedFriend.data.requester._id.toString(),
                (draft) => {
                  draft.friendShip.push(requestedFriend.data);
                }
              )
            );
          }
        } catch (error) {}
      },
    }),
    getAllFriend: builder.query({
      query: (userId) => ({
        url: '/friends',
        method: 'GET',
      }),
      providesTags: ['Friend'],
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // socket
        try {
          await cacheDataLoaded;
          socket.on('acceptRequest', (data) => {
            updateCachedData((draft) => {
              if (data.recipient._id == arg || data.requester._id == arg) {
                draft.friendShip.push(data);
              }
            });
          });
        } catch (error) {
          socket.close();
        }
      },
    }),
    getAllRequestedFriend: builder.query({
      query: (userId) => ({
        url: '/friends/request',
        method: 'GET',
      }),
      providesTags: ['Friend'],
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;
          socket.on('sendFriendRequest', (data) => {
            // check userId if I'm recipient push data
            if (data?.recipient._id == arg) {
              updateCachedData((draft) => {
                draft.friendShip.push(data);
              });
            }
          });
          // when delete friend request
          socket.on('deleteFriendRequest', (data) => {
            if (data?.recipient._id == arg || data?.requester._id == arg) {
              updateCachedData((draft) => {
                const filteredItem = draft.friendShip.filter(
                  (item) => item._id !== data._id
                );
                draft.friendShip = filteredItem;
              });
            }
          });
          // when friend request accepted
          socket.on('acceptRequest', (data) => {
            updateCachedData((draft) => {
              const filteredItem = draft.friendShip.filter(
                (item) => item._id !== data._id
              );
              draft.friendShip = filteredItem;
            });
          });
        } catch (error) {
          socket.close();
        }
      },
    }),
    acceptRequest: builder.mutation({
      query: (friendShipId) => ({
        url: `/friends`,
        method: 'PUT',
        body: friendShipId,
      }),
      providesTags: ['Friend'],
    }),
    deleteRequest: builder.mutation({
      query: (friendShipId, userId) => ({
        url: `/friends/`,
        method: 'DELETE',
        body: friendShipId,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const deleteResponse = await queryFulfilled;
          // delete from getAllRequestedFriend
          dispatch(
            apiSlice.util.updateQueryData(
              'getAllRequestedFriend',
              args.userId.toString(),
              (draft) => {
                const filterItem = draft.friendShip.filter(
                  (item) =>
                    item._id !== deleteResponse.data.deletedFriendReq._id
                );
                draft.friendShip = filterItem;
              }
            )
          );
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useSendFriendRequestMutation,
  useGetAllFriendQuery,
  useGetAllRequestedFriendQuery,
  useAcceptRequestMutation,
  useDeleteRequestMutation,
} = friendsApi;

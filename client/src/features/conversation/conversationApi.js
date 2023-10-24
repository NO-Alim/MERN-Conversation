import { socket } from '../../utilities/socket';
import { apiSlice } from '../api/apiSlice';

export const conversationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createConversation: builder.mutation({
      query: (data) => ({
        url: '/conversation',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              'getAllConversation',
              args.creator,
              (draft) => {
                // check if it is exist
                const isConversationExist = draft.find(
                  (item) => item._id === response.data._id
                );
                if (!isConversationExist) {
                  draft.unshift(response.data);
                }
              }
            )
          );
        } catch (error) {}
      },
    }),
    getAllConversation: builder.query({
      query: (id) => ({
        url: '/conversation',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Conversations'],
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // socket
        try {
          await cacheDataLoaded;
          //createConversation
          socket.on('createConversation', (data) => {
            updateCachedData((draft) => {
              const isConversationExist = draft.find(
                (item) => item._id === data._id
              );
              if (!isConversationExist && data.participant._id == arg) {
                draft.push(data);
              }
            });
          });
        } catch (error) {
          socket.close();
        }
        await cacheEntryRemoved;
        socket.close();
      },
    }),
  }),
});

export const { useCreateConversationMutation, useGetAllConversationQuery } =
  conversationApi;

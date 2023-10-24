import { socket } from '../../utilities/socket';
import { apiSlice } from '../api/apiSlice';
export const messageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessage: builder.query({
      query: (conversation_id) => ({
        //change limit from env file
        url: `/message/${conversation_id}?timeStamp&limit=15`,
        method: 'GET',
      }),
      providesTags: ['Messages'],
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // socket
        try {
          await cacheDataLoaded;
          socket.on('message', (data) => {
            if (data?.conversation == arg) {
              updateCachedData((draft) => {
                draft.unshift(data);
              });
            }
          });
        } catch (error) {
          socket.close();
        }
        await cacheEntryRemoved;
        socket.close();
      },
    }),
    getMoreMessage: builder.query({
      query: ({ conversation_id, lastMessageTime, limit = 10 }) => ({
        url: `/message/${conversation_id}?timeStamp=${lastMessageTime}&limit=${limit}`,
        method: 'GET',
      }),
      providesTags: ['Messages'],
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              'getMessage',
              args.conversation_id,
              (draft) => {
                return [...draft, ...response.data];
              }
            )
          );
        } catch (error) {}
      },
    }),
    sendMessage: builder.mutation({
      query: (data) => ({
        url: '/message',
        method: 'POST',
        body: data,
        formData: true,
      }),
    }),
  }),
});

export const {
  useGetMessageQuery,
  useGetMoreMessageQuery,
  useSendMessageMutation,
} = messageApi;

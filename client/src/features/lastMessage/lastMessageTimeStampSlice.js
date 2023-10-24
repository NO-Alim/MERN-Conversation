import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lastMessageTimeStamp: '',
  lastConversationTimeStamp: '',
};

// used for pagination
const lastMessageSlice = createSlice({
  name: 'lastMessage',
  initialState,
  reducers: {
    setLastMessageTimeStamp: (state, action) => {
      state.lastMessageTimeStamp = action.payload;
    },
    setLastConversationTimeStamp: (state, action) => {
      state.lastConversationTimeStamp = action.payload;
    },
  },
});

export const { setLastMessageTimeStamp, setLastConversationTimeStamp } =
  lastMessageSlice.actions;
export default lastMessageSlice.reducer;

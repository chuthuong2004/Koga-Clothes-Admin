import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { Nullable } from '@/types/commons';
import { StoreConversation } from '@/types/entities';
import { randomBgAvatar } from '@/utils';

type ChatState = {
  selectedConversation: Nullable<StoreConversation>;
  colorUser: string;

  openSidebar: boolean;
};
const initialState: ChatState = {
    selectedConversation: null,
    colorUser: randomBgAvatar(),
    openSidebar: false
};
export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedConversation: (state, action: PayloadAction<ChatState['selectedConversation']>) => {
        state.selectedConversation = action.payload
        state.colorUser = randomBgAvatar()
    },
    toggleSidebar: (state) => {
      state.openSidebar = !state.openSidebar
    }
  },
});

export const selectChat = (state: RootState) => state.chatKoga;

export const { setSelectedConversation, toggleSidebar } = chatSlice.actions;

export default chatSlice.reducer;

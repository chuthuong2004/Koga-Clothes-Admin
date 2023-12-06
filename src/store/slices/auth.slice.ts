import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { Nullable, StoreToken } from '@/types/commons';
import { StoreUser } from '@/types/entities';

type AuthState = {
  user: Nullable<StoreUser>;
  token: Nullable<StoreToken>;
  account: Nullable<Pick<StoreUser, 'username' | 'password'>>;
};
const initialState: AuthState = {
  user: null,
  token: null,
  account: null,
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState['user']>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<AuthState['token']>) => {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken));
        localStorage.setItem('refreshToken', JSON.stringify(action.payload.refreshToken));
      }
    },
    updateProfile: (state, action: PayloadAction<StoreUser>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },
    saveAccount: (state, action: PayloadAction<AuthState['account']>) => {
      state.account = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.clear();
    },
  },
});

export const selectAuth = (state: RootState) => state.authKoga;

export const { setCredentials, logout, updateProfile, saveAccount, setToken } = authSlice.actions;

export default authSlice.reducer;

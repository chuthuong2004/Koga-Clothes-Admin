import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IToken, IUser } from '../models/user.model';
import { clearCart } from './cartSlice';
import { RootState } from '@/store/store';

export interface AuthState {
  user: IUser | null;
  token: IToken | null;
}
const initialState: AuthState = {
  user: null,
  token: null,
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      if (action.payload.user) {
        state.user = action.payload.user;
      }
      if (action.payload.token) {
        state.token = action.payload.token;
        localStorage.setItem('token', JSON.stringify(action.payload.token));
      }
      if (!state.token) {
        state.user = null;
        state.token = null;
        localStorage.clear();
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.clear();
    },
  },
});

export const selectAuth = (state: RootState) => state.authKoga;

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

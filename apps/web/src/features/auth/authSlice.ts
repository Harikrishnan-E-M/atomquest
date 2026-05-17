import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: 'employee' | 'manager' | 'admin';
};

export type AuthState = {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  bootstrapped: boolean;
};

const tokenFromStorage = typeof window !== 'undefined' ? localStorage.getItem('atomquest_token') : null;
const userFromStorage = typeof window !== 'undefined' ? localStorage.getItem('atomquest_user') : null;

export const initialAuthState: AuthState = {
  token: tokenFromStorage,
  user: userFromStorage ? (JSON.parse(userFromStorage) as AuthUser) : null,
  isAuthenticated: Boolean(tokenFromStorage),
  bootstrapped: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; user: AuthUser }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.bootstrapped = true;

      if (typeof window !== 'undefined') {
        localStorage.setItem('atomquest_token', action.payload.token);
        localStorage.setItem('atomquest_user', JSON.stringify(action.payload.user));
      }
    },
    clearCredentials: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.bootstrapped = true;

      if (typeof window !== 'undefined') {
        localStorage.removeItem('atomquest_token');
        localStorage.removeItem('atomquest_user');
      }
    },
    setBootstrapped: (state, action: PayloadAction<boolean>) => {
      state.bootstrapped = action.payload;
    },
  },
});

export const { setCredentials, clearCredentials, setBootstrapped } = authSlice.actions;
export default authSlice.reducer;

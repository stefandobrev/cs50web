import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setTokens: (state, action) => {
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
    },
    logout: () => initialState,
  },
});

export const { setUser, setTokens, logout } = authSlice.actions;
export default authSlice.reducer;

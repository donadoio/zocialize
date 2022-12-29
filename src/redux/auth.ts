import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';

export const getLogout = createAsyncThunk('auth/getLogout', () => {
  return fetch('http://localhost:3000/auth/logout')
  .then((resp) => resp.json)
  .catch((err) => console.log(err));
});

const initialState = {
  loading: false,
  authenticated: false,
  error: "",
  access_token: null,
  refresh_token: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.authenticated = true;
      console.log('AuthStatus: ', state.authenticated);
    },
    logout: (state) => {
      state.authenticated = false;
      console.log('AuthStatus: ', state.authenticated);
    }
  },
  extraReducers: {
    [getLogout.pending]:(state) => {
      state.loading = true
    },
    [getLogout.fulfilled]: (state, action) => {
      console.log("Response: ", action.payload);
      state.loading = false;
    },
    [getLogout.rejected]: (state) => {
      console.log("Rejected");
      state.loading = false;
    }
  }
})


// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions
export default authSlice.reducer
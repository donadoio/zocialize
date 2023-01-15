import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../store';
import {getTokens, confirmEmail, registerAccount} from './thunks';
import {AuthStateType} from './types';

//InitialState
const initialState: AuthStateType = {
  loading: false,
  error: '',
  authenticated: false,
  confirmed: false,
  refreshTokenPromise: null,
  access_token: null,
  refresh_token: null,
};

// Slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLogout: (state: AuthStateType) => {
      state.loading = false;
      state.error = '';
      state.authenticated = false;
      state.confirmed = false;
      state.access_token = null;
      state.refresh_token = null;
      state.refreshTokenPromise = null;
      console.log('Logged out');
    },
    authSessionExpired: (state: AuthStateType) => {
      state.loading = false;
      state.error = 'Session expired.';
      state.authenticated = false;
      state.confirmed = false;
      state.access_token = null;
      state.refresh_token = null;
      state.refreshTokenPromise = null;
    },
    authRefreshing: (state: AuthStateType, action) => {
      state.refreshTokenPromise = action.payload;
    },
    authUpdateTokens: (state: AuthStateType, action) => {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      state.refreshTokenPromise = null;
    },
    authUpdateErrorMsg: (state: AuthStateType, action) => {
      state.error = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getTokens.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getTokens.rejected, (state, action) => {
        state.loading = false;
        state.error = `${action.payload.error}(${action.payload.statusCode}): ${action.payload.message}`;
      })
      .addCase(getTokens.fulfilled, (state, action) => {
        state.loading = false;
        state.authenticated = true;
        state.confirmed = action.payload.confirmed;
        state.error = '';
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
      })
      .addCase(confirmEmail.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(confirmEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = `${action.payload.error}(${action.payload.statusCode}): ${action.payload.message}`;
      })
      .addCase(confirmEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.authenticated = true;
        state.confirmed = true;
        state.error = '';
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
      })
      .addCase(registerAccount.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(registerAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = `${action.payload.error ? action.payload.error : ''}(${
          action.payload.statusCode
        }): ${action.payload.message}`;
      })
      .addCase(registerAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.authenticated = true;
        state.confirmed = action.payload.confirmed;
        state.error = '';
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
      });
  },
});

export const getAuthInfo = (state: RootState) => state.auth;

export const {
  authLogout,
  authUpdateErrorMsg,
  authRefreshing,
  authUpdateTokens,
  authSessionExpired,
} = authSlice.actions;
export default authSlice.reducer;

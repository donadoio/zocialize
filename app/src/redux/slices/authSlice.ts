import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {REACT_APP_BACKEND_URL} from '@env';
import axios, {AxiosError} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootState} from '../store';

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

// Types
export type AuthStateType = {
  loading: boolean;
  error: string;
  authenticated: boolean;
  confirmed: boolean;
  refreshTokenPromise: Promise<any> | null;
  access_token: string | null | undefined;
  refresh_token: string | null | undefined;
};
export type ConfirmEmailFulfilled = {
  access_token: string;
  refresh_token: string;
};
export type RegisterAccountFulfilled = {};
export type ValidationError = {
  error: string;
  statusCode: string;
  message: string;
};

// Thunks
export const getTokens = createAsyncThunk(
  'auth/getTokens',
  async (userInfo: {username: string; password: string}, thunkApi) => {
    try {
      const {username, password} = userInfo;
      const response = await axios.post(`${REACT_APP_BACKEND_URL}/auth/login`, {
        username: username,
        password: password,
      });
      return await response.data;
    } catch (e: AxiosError | any) {
      if (e.response) {
        return thunkApi.rejectWithValue(e.response.data);
      } else if (e.request) {
        console.log('Request: ', e.request);
        return thunkApi.rejectWithValue({
          error: 'Error',
          statusCode: 'No response',
          message: 'Something went wrong.',
        });
      } else {
        return thunkApi.rejectWithValue({
          error: 'Error',
          statusCode: 'No request',
          message: 'Something went wrong.',
        });
      }
    }
  },
);

export const confirmEmail = createAsyncThunk<
  ConfirmEmailFulfilled,
  string,
  {
    state: RootState;
    rejectWithValue: ValidationError;
  }
>(
  'auth/confirmEmail',
  async (verificationCode, {getState, rejectWithValue}) => {
    try {
      const access_token: string | null | undefined =
        getState().auth.access_token;
      const response = await axios.post(
        `${REACT_APP_BACKEND_URL}/auth/confirmemail`,
        {
          verificationCode: verificationCode,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );
      return await response.data;
    } catch (e: AxiosError | any) {
      if (e.response) {
        return rejectWithValue(e.response.data);
      } else if (e.request) {
        console.log('Request: ', e.request);
        return rejectWithValue({
          error: 'Error',
          statusCode: 'No response',
          message: 'Something went wrong.',
        });
      } else {
        return rejectWithValue({
          error: 'Error',
          statusCode: 'No request',
          message: 'Something went wrong.',
        });
      }
    }
  },
);

export const registerAccount = createAsyncThunk<
  RegisterAccountFulfilled,
  any,
  {
    state: RootState;
    rejectWithValue: ValidationError;
  }
>('auth/registerAccount', async (data, {getState, rejectWithValue}) => {
  try {
    const access_token: string | null | undefined =
      getState().auth.access_token;
    const response = await axios.post(
      `${REACT_APP_BACKEND_URL}/auth/register`,
      {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    );
    return await response.data;
  } catch (e: AxiosError | any) {
    if (e.response) {
      return rejectWithValue(e.response.data);
    } else if (e.request) {
      console.log('Request: ', e.request);
      return rejectWithValue({
        error: 'Error',
        statusCode: 'No response',
        message: 'Something went wrong.',
      });
    } else {
      return rejectWithValue({
        error: 'Error',
        statusCode: 'No request',
        message: 'Something went wrong.',
      });
    }
  }
});

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

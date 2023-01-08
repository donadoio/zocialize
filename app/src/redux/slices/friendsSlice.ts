import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios, {AxiosError} from 'axios';
import {RootState} from '../store';
import {ValidationError} from './authSlice';
import {REACT_APP_BACKEND_URL} from '@env';

// InitialState
const initialState: FriendsStateType = {
  userSearchResults: new Array(),
  friendsSearchError: '',
  loading: false,
};

// Types
export type FriendsStateType = {
  userSearchResults: UserSearchInfo[];
  friendsSearchError: string;
  loading: boolean;
};
export type UserSearchInfo = {
  id: number;
  username: string;
  avatar: string;
};
export type SearchUsersFulfilled = {
  results: UserSearchInfo[];
};

// Thunks
export const searchUsers = createAsyncThunk<
  SearchUsersFulfilled,
  string,
  {
    state: RootState;
    rejectWithValue: ValidationError;
  }
>('friends/searchUsers', async (query, {getState, rejectWithValue}) => {
  try {
    const access_token: string | null | undefined =
      getState().auth.access_token;
    const response = await axios.post(
      `${REACT_APP_BACKEND_URL}/friends/searchusers`,
      {
        query: query,
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
});

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    clearSearchUsersResults: state => {
      state.userSearchResults = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(searchUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.loading = false;
        state.friendsSearchError = `${action.payload.error}(${action.payload.statusCode}): ${action.payload.message}`;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.friendsSearchError = '';
        state.userSearchResults = action.payload.results;
      });
  },
});

export const getUserSearchResults = (state: RootState) =>
  state.friends.userSearchResults;

export const {clearSearchUsersResults} = friendsSlice.actions;
export default friendsSlice.reducer;

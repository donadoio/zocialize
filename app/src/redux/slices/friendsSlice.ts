import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios, {AxiosError} from 'axios';
import {RootState} from '../store';
import {ValidationError} from './authSlice';
import {REACT_APP_BACKEND_URL} from '@env';

// InitialState
const initialState: FriendsStateType = {
  userSearchResults: new Array(),
  friends: new Array(),
  friendRequests: new Array(),
  friendsSearchError: '',
  addFriendError: '',
  removeFriendError: '',
  rejectRequestError: '',
  getFriendRequestsError: '',
  getFriendsError: '',
  loading: false,
};

// Types
export type FriendsStateType = {
  userSearchResults: UserSearchInfo[];
  friends: UserInfo[];
  friendRequests: UserInfo[];
  friendsSearchError: string;
  addFriendError: string;
  removeFriendError: string;
  rejectRequestError: string;
  getFriendRequestsError: string;
  getFriendsError: string;
  loading: boolean;
};
export type UserInfo = {
  id: number;
  username: string;
  avatar: string;
};
export type UserSearchInfo = {
  id: number;
  username: string;
  avatar: string;
  isFriend: boolean;
};

// Fulfilled Types
export type SearchUsersFulfilled = {
  results: UserSearchInfo[];
};
export type GetFriendsFulfilled = {
  friends: UserInfo[];
};
export type AddFriendFulfilled = {
  friendRequests: UserInfo[];
  friends: UserInfo[];
};
export type GetFriendRequestsFulfilled = {
  friendRequests: UserInfo[];
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

export const getFriends = createAsyncThunk<
  GetFriendsFulfilled,
  string,
  {
    state: RootState;
    rejectWithValue: ValidationError;
  }
>('friends/getFriends', async (origin: string, {getState, rejectWithValue}) => {
  try {
    const access_token: string | null | undefined =
      getState().auth.access_token;
    const response = await axios.get(
      `${REACT_APP_BACKEND_URL}/friends/getfriends`,
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

export const getFriendRequests = createAsyncThunk<
  GetFriendRequestsFulfilled,
  string,
  {
    state: RootState;
    rejectWithValue: ValidationError;
  }
>(
  'friends/getFriendRequests',
  async (origin: string, {getState, rejectWithValue}) => {
    try {
      const access_token: string | null | undefined =
        getState().auth.access_token;
      const response = await axios.get(
        `${REACT_APP_BACKEND_URL}/friends/getfriendrequests`,
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

export const addFriend = createAsyncThunk<
  AddFriendFulfilled,
  number,
  {
    state: RootState;
    rejectWithValue: ValidationError;
  }
>('friends/addFriend', async (id, {getState, rejectWithValue}) => {
  try {
    const access_token: string | null | undefined =
      getState().auth.access_token;
    const response = await axios.post(
      `${REACT_APP_BACKEND_URL}/friends/addfriend`,
      {
        targetId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );
    return await {userId: id, ...response.data};
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

export const removeFriend = createAsyncThunk<
  GetFriendsFulfilled,
  number,
  {
    state: RootState;
    rejectWithValue: ValidationError;
  }
>('friends/removeFriend', async (id, {getState, rejectWithValue}) => {
  try {
    const access_token: string | null | undefined =
      getState().auth.access_token;
    const response = await axios.post(
      `${REACT_APP_BACKEND_URL}/friends/removefriend`,
      {
        targetId: id,
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

export const rejectRequest = createAsyncThunk<
  GetFriendRequestsFulfilled,
  number,
  {
    state: RootState;
    rejectWithValue: ValidationError;
  }
>('friends/rejectRequest', async (id, {getState, rejectWithValue}) => {
  try {
    const access_token: string | null | undefined =
      getState().auth.access_token;
    const response = await axios.post(
      `${REACT_APP_BACKEND_URL}/friends/rejectrequest`,
      {
        targetId: id,
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
      })
      .addCase(getFriends.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getFriends.rejected, (state, action) => {
        state.loading = false;
        state.getFriendsError = `${action.payload.error}(${action.payload.statusCode}): ${action.payload.message}`;
      })
      .addCase(getFriends.fulfilled, (state, action) => {
        state.loading = false;
        state.getFriendsError = '';
        state.friends = action.payload.friends;
      })
      .addCase(getFriendRequests.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getFriendRequests.rejected, (state, action) => {
        state.loading = false;
        state.getFriendRequestsError = `${action.payload.error}(${action.payload.statusCode}): ${action.payload.message}`;
      })
      .addCase(getFriendRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.getFriendRequestsError = '';
        state.friendRequests = action.payload.friendRequests;
      })
      .addCase(addFriend.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addFriend.rejected, (state, action) => {
        state.loading = false;
        state.addFriendError = `${action.payload.error}(${action.payload.statusCode}): ${action.payload.message}`;
      })
      .addCase(addFriend.fulfilled, (state, action) => {
        state.loading = false;
        state.addFriendError = '';
        state.friends = action.payload.friends;
        state.friendRequests = action.payload.friendRequests;
      })
      .addCase(removeFriend.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(removeFriend.rejected, (state, action) => {
        state.loading = false;
        state.removeFriendError = `${action.payload.error}(${action.payload.statusCode}): ${action.payload.message}`;
      })
      .addCase(removeFriend.fulfilled, (state, action) => {
        state.loading = false;
        state.removeFriendError = '';
        state.friends = action.payload.friends;
      })
      .addCase(rejectRequest.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(rejectRequest.rejected, (state, action) => {
        state.loading = false;
        state.rejectRequestError = `${action.payload.error}(${action.payload.statusCode}): ${action.payload.message}`;
      })
      .addCase(rejectRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.rejectRequestError = '';
        state.friendRequests = action.payload.friendRequests;
      });
  },
});

export const getUserSearchResults = (state: RootState) =>
  state.friends.userSearchResults;

export const getFriendList = (state: RootState) => state.friends.friends;

export const {clearSearchUsersResults} = friendsSlice.actions;
export default friendsSlice.reducer;

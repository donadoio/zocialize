import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../store';
import {FriendsStateType} from './types';
import {
  searchUsers,
  getFriends,
  getFriendRequests,
  addFriend,
  removeFriend,
  rejectRequest,
} from './thunks';

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

// Thunks

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

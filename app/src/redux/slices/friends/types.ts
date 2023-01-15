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

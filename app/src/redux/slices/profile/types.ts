export type ProfileStateType = {
  id: number;
  username: string;
  avatar: string;
  profileColor: string;
  error: string;
};
export type GetBasicProfileFulfilled = {
  id: number;
  username: string;
  avatar: string;
  profileColor: string;
};

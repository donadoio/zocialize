import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../store';
import {REACT_APP_BACKEND_URL} from '@env';
import {changeProfileColor} from './thunks/changeProfileColor';
import {getBasicProfile} from './thunks/getBasicProfile';
import {ProfileStateType} from './types';

// InitialState
const initialState: ProfileStateType = {
  id: 0,
  username: 'x',
  avatar: 'default',
  profileColor: 'default',
  error: '',
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    profileUpdate: state => {},
  },
  extraReducers(builder) {
    builder
      .addCase(getBasicProfile.pending, (state, action) => {
        console.log('Loading basic profile');
      })
      .addCase(getBasicProfile.rejected, (state, action) => {})
      .addCase(getBasicProfile.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.username = action.payload.username;
        state.avatar = action.payload.avatar;
        state.profileColor = action.payload.profileColor;
      })
      .addCase(changeProfileColor.pending, (state, action) => {
        console.log('Loading changing profile color');
      })
      .addCase(changeProfileColor.rejected, (state, action) => {
        state.error = 'profile-color-failed';
      })
      .addCase(changeProfileColor.fulfilled, (state, action) => {
        state.profileColor = action.payload;
        state.error = 'profile-color-success';
      });
  },
});

export const getBasicProfileInfo = (state: RootState) => state.profile;
export const {profileUpdate} = profileSlice.actions;
export default profileSlice.reducer;

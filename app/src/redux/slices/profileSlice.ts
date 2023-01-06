import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios, {AxiosError} from 'axios';
import {RootState} from '../store';
import {ValidationError} from './authSlice';
import {REACT_APP_BACKEND_URL} from '@env';

// InitialState
const initialState: ProfileStateType = {
  id: 0,
  username: 'x',
  avatar: 'default',
  profileColor: 'default',
  error: '',
};

// Types
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

// Thunks
export const getBasicProfile = createAsyncThunk<
  GetBasicProfileFulfilled,
  string,
  {
    state: RootState;
    rejectWithValue: ValidationError;
  }
>('profile/getProfile', async (origin: string, thunkApi) => {
  try {
    const access_token = thunkApi.getState().auth.access_token;
    console.log('access-token: ', access_token);
    const response = await axios.get(
      `${REACT_APP_BACKEND_URL}/user/getbasicprofile`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );
    console.log('In getProfile thunk:', response.data);
    return await response.data;
  } catch (e: AxiosError | any) {
    if (e.response) {
      return thunkApi.rejectWithValue(e.response.data);
    } else if (e.request) {
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
});

export const changeProfileColor = createAsyncThunk(
  'profile/changeProfileColor',
  async (color: string, thunkApi) => {
    try {
      const access_token = thunkApi.getState().auth.access_token;
      const response = await axios.post(
        `${REACT_APP_BACKEND_URL}/user/changeprofilecolor`,
        {
          color: color,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );
      return color;
    } catch (e: AxiosError | any) {
      if (e.response) {
        return thunkApi.rejectWithValue(e.response.data);
      } else if (e.request) {
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

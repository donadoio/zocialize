import {createAsyncThunk} from '@reduxjs/toolkit';
import axios, {AxiosError} from 'axios';
import {RootState} from '../../../store';
import {ValidationError} from '../../auth/types';
import {GetFriendsFulfilled} from '../types';
import {REACT_APP_BACKEND_URL} from '@env';

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

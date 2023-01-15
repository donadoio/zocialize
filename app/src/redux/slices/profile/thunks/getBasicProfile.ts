import {createAsyncThunk} from '@reduxjs/toolkit';
import axios, {AxiosError} from 'axios';
import {RootState} from '../../../store';
import {ValidationError} from '../../auth/types';
import {GetBasicProfileFulfilled} from '../types';
import {REACT_APP_BACKEND_URL} from '@env';

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

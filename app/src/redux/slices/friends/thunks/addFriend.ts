import {createAsyncThunk} from '@reduxjs/toolkit';
import axios, {AxiosError} from 'axios';
import {RootState} from '../../../store';
import {ValidationError} from '../../auth/types';
import {AddFriendFulfilled} from '../types';
import {REACT_APP_BACKEND_URL} from '@env';

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

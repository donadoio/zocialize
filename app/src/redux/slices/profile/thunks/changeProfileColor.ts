import {createAsyncThunk} from '@reduxjs/toolkit';
import axios, {AxiosError} from 'axios';
import {REACT_APP_BACKEND_URL} from '@env';

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

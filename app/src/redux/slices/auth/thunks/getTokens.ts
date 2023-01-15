import {createAsyncThunk} from '@reduxjs/toolkit';
import axios, {AxiosError} from 'axios';
import {REACT_APP_BACKEND_URL} from '@env';

export const getTokens = createAsyncThunk(
  'auth/getTokens',
  async (userInfo: {username: string; password: string}, thunkApi) => {
    try {
      const {username, password} = userInfo;
      const response = await axios.post(`${REACT_APP_BACKEND_URL}/auth/login`, {
        username: username,
        password: password,
      });
      return await response.data;
    } catch (e: AxiosError | any) {
      if (e.response) {
        return thunkApi.rejectWithValue(e.response.data);
      } else if (e.request) {
        console.log('Request: ', e.request);
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

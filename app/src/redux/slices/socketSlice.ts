import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios, {AxiosError} from 'axios';
import {RootState} from '../store';
import {ValidationError} from './authSlice';
import {REACT_APP_SOCKET_URL} from '@env';
import {io} from 'socket.io-client';

// InitialState
const initialState: SocketStateType = {
  id: '',
  socket: null,
};

// Types
export type SocketStateType = {
  id: string;
  socket: any;
};

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    initSocket: (state, action) => {
      console.log('initSocket payload: ', action.payload);
      console.log('backend socket: ', REACT_APP_SOCKET_URL);
      const socketOptions: any = {
        transportOptions: {
          polling: {
            extraHeaders: {
              Authorization: `Bearer ${action.payload}`,
            },
          },
        },
        autoConnect: true,
      };
      state.socket = io(`${process.env.REACT_APP_SOCKET_URL}`);
      state.socket.connect();
      console.log('After connect: ', state.socket);
    },
  },
});

export const getSocketInfo = (state: RootState) => state.socket;

export const {initSocket} = socketSlice.actions;
export default socketSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../store';
import {REACT_APP_SOCKET_URL} from '@env';
import {io} from 'socket.io-client';
import {SocketStateType} from './types';

// InitialState
const initialState: SocketStateType = {
  id: '',
  socket: null,
};

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    initSocket: (state, action) => {
      const socketOptions: any = {
        auth: {
          token: action.payload,
        },
      };
      state.socket = io(`${process.env.REACT_APP_SOCKET_URL}`, socketOptions);
    },
    disconnectSocket: state => {
      try {
        state.socket.disconnect();
      } catch (e) {}
    },
  },
});

export const getSocketInfo = (state: RootState) => state.socket;

export const {initSocket, disconnectSocket} = socketSlice.actions;
export default socketSlice.reducer;

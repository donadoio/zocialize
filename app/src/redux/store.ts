import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice';
import profileReducer from './slices/profile/profileSlice';
import socketReducer from './slices/socket/socketSlice';
import friendsReducer from './slices/friends/friendsSlice';
import thunk from 'redux-thunk';
import jwtMiddleware from './jwtMiddleware';
import {useDispatch} from 'react-redux';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    socket: socketReducer,
    friends: friendsReducer,
  },
  middleware: [jwtMiddleware, thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

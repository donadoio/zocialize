import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import screenReducer from './slices/screenSlice';
import thunk from 'redux-thunk';
import jwtMiddleware from './jwtMiddleware';
import {useDispatch} from 'react-redux';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    screen: screenReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(jwtMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

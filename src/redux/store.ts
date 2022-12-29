import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import { combineReducers, applyMiddleware, ThunkMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

const persistConfig = {
    key: "root",
    version: 1,
    storage: AsyncStorage,
    whitelist: ['auth']
};

const reducer = combineReducers({
    auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk),
})

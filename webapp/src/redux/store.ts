import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import jwtMiddleware from "./jwtMiddleware";
import authReducer from "./slices/auth/authSlice";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: [jwtMiddleware, thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

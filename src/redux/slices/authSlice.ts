import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthStateType } from "../types";
import { REACT_APP_BACKEND_URL } from '@env';
import axios from "axios";

const initialState: AuthStateType = {
    loading: false,
    error: "",
    authenticated: false,
    access_token: null,
    refresh_token: null,
};

export const getTokens = createAsyncThunk('auth/getTokens', async (userInfo: {username: string, password: string}) => {
    try {
        const {username, password} = userInfo;
        const response = await axios.post(`${REACT_APP_BACKEND_URL}/auth/login`, {
            username: username,
            password: password,
        });
        console.log(response.data);
        return await response.data;
    } catch (e) {
        return Promise.reject(e.message);
    }
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authLogout: (state: AuthStateType) => {
            state.loading = false;
            state.error = "";
            state.authenticated = false;
            state.access_token = null;
            state.refresh_token = null;
        },
    },
    extraReducers(builder) {
        builder.addCase(getTokens.pending, (state, action) => {
            state.loading = true;
        }).addCase(getTokens.rejected, (state, action) => {
            console.log(action.error.message);
            state.loading = false;
            state.error = action.error.message;
        }).addCase(getTokens.fulfilled, (state, action) => {
            console.log("payload: ", action.payload)
            state.loading = false;
            state.authenticated = true;
            state.error = "";
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
        });
    },
});

export const { authLogout } = authSlice.actions;
export default authSlice.reducer;
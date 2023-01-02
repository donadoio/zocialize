import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { REACT_APP_BACKEND_URL } from '@env';
import axios, { AxiosError } from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from "../store";

//InitialState
const initialState: AuthStateType = {
    loading: false,
    error: "",
    authenticated: false,
    refreshTokenPromise: null,
    access_token: null,
    refresh_token: null,
};

// Types
export type AuthStateType = {
    loading: boolean,
    error: string,
    authenticated: boolean,
    refreshTokenPromise: Promise<any> | null
    access_token: string | null | undefined,
    refresh_token: string | null | undefined,
};

// Thunks
export const getTokens = createAsyncThunk('auth/getTokens', async (userInfo: {username: string, password: string}, thunkApi) => {
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
            console.log("Request: ", e.request);
            return thunkApi.rejectWithValue({error: "Error", statusCode: "No response", message: "Something went wrong."});
        } else {
            return thunkApi.rejectWithValue({error: "Error", statusCode: "No request", message: "Something went wrong."});
        }
    }
});

export const getProfile = createAsyncThunk('auth/getProfile', async (userInfo: {accessToken: string}) => {
    try {
        const response = await axios.get(`${REACT_APP_BACKEND_URL}/user/getprofile`, {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`
            },
        });
        console.log("In getProfile thunk:", response.data);
        return await response.data;
    } catch (e) {
        return Promise.reject(e.message);
    }
});

// Slice
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
            state.refreshTokenPromise = null;
        },
        authSessionExpired: (state: AuthStateType) => {
            state.loading = false;
            state.error = "Session expired.";
            state.authenticated = false;
            state.access_token = null;
            state.refresh_token = null;
            state.refreshTokenPromise = null;
        },
        authRefreshing: (state: AuthStateType, action) => {
            state.refreshTokenPromise = action.payload;
        },
        authUpdateTokens: (state: AuthStateType, action) => {
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
            state.refreshTokenPromise = null;
        },
        testDispatch: (state:AuthStateType) => {
            console.log("In test dispatch");
        }
    },
    extraReducers(builder) {
        builder.addCase(getTokens.pending, (state, action) => {
            state.loading = true;
        }).addCase(getTokens.rejected, (state, action) => {
            state.loading = false;
            state.error = `${action.payload.error}(${action.payload.statusCode}): ${action.payload.message}`;
        }).addCase(getTokens.fulfilled, (state, action) => {
            state.loading = false;
            state.authenticated = true;
            state.error = "";
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
        }).
        
        addCase(getProfile.fulfilled, (state, action)=>{
            console.log("In getProfilefulfilled: ");
            console.log(action.payload);
        }).addCase(getProfile.rejected, (state, action)=>{
            console.log("In getprofiled rejected");
        });
    },
});

export const getAuthInfo = (state: RootState) => state.auth;

export const { authLogout, testDispatch, authRefreshing, authUpdateTokens, authSessionExpired } = authSlice.actions;
export default authSlice.reducer;
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const getTokens = createAsyncThunk(
  "auth/getTokens",
  async (userInfo: { username: string; password: string }, thunkApi) => {
    try {
      const { username, password } = userInfo;
      console.log(process.env.REACT_APP_BACKEND_URL);
      console.log(userInfo);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
        {
          username: username,
          password: password,
        }
      );
      return await response.data;
    } catch (e: AxiosError | any) {
      if (e.response) {
        return thunkApi.rejectWithValue(e.response.data);
      } else if (e.request) {
        console.log("Request: ", e.request);
        return thunkApi.rejectWithValue({
          error: "Error",
          statusCode: "No response",
          message: "Something went wrong.",
        });
      } else {
        return thunkApi.rejectWithValue({
          error: "Error",
          statusCode: "No request",
          message: "Something went wrong.",
        });
      }
    }
  }
);

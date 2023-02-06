import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RootState } from "../../../store";
import { ConfirmEmailFulfilled, ValidationError } from "../types";

export const confirmEmail = createAsyncThunk<
  ConfirmEmailFulfilled,
  string,
  {
    state: RootState;
    rejectWithValue: ValidationError;
  }
>(
  "auth/confirmEmail",
  async (verificationCode, { getState, rejectWithValue }) => {
    try {
      const access_token: string | null | undefined =
        getState().auth.access_token;
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/confirmemail`,
        {
          verificationCode: verificationCode,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      return await response.data;
    } catch (e: AxiosError | any) {
      if (e.response) {
        return rejectWithValue(e.response.data);
      } else if (e.request) {
        console.log("Request: ", e.request);
        return rejectWithValue({
          error: "Error",
          statusCode: "No response",
          message: "Something went wrong.",
        });
      } else {
        return rejectWithValue({
          error: "Error",
          statusCode: "No request",
          message: "Something went wrong.",
        });
      }
    }
  }
);

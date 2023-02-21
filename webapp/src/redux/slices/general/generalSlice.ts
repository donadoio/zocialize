import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

//InitialState
const initialState: GeneralStateType = {
  darkmode: true,
};

export type GeneralStateType = {
  darkmode: boolean;
};

// Slice
export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    toggleDarkmode: (state) => {
      state.darkmode = !state.darkmode;
    },
  },
});

export const getGeneralState = (state: RootState) => state.general;

export const { toggleDarkmode } = generalSlice.actions;
export default generalSlice.reducer;

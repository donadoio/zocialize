import { createSlice } from "@reduxjs/toolkit";
import { ScreenInfo } from "../types";

const initialState: ScreenInfo = {
    current: 'Dashboard',
};

export const screenSlice = createSlice({
    name: 'screen',
    initialState,
    reducers: {
        setScreen: (state: ScreenInfo, action) => {
            state.current = action.payload;
        },
    },
});

export const { setScreen } = screenSlice.actions;
export default screenSlice.reducer;
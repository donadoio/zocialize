import { createSlice } from "@reduxjs/toolkit";

// Types
export type ScreenType = 'Dashboard' | 'Settings';
export type ScreenInfo = {
    current: ScreenType,
};

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
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export enum Theme {
	LIGHT = "light",
	DARK = "dark",
}

export interface ThemeState {
	theme: Theme;
}

const initialState: ThemeState = {
	theme: Theme.LIGHT,
};

export const themeSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setTheme: (state, action: PayloadAction<ThemeState>) => {
			state.theme = action.payload.theme;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;

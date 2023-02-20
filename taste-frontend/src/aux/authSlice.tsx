import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type User from "firebase/compat/app";

export interface AuthState {
	photoUrl: string | null;
	displayName: string | null;
	email: string | null;
	uid: string;
	emailVerified: boolean;
	signedIn: boolean;
}

const initialState: AuthState = {
	photoUrl: "",
	displayName: "",
	email: "",
	uid: "",
	emailVerified: false,
	signedIn: false,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuth: (state, action: PayloadAction<AuthState>) => {
			state.photoUrl = action.payload.photoUrl;
			state.displayName = action.payload.displayName;
			state.email = action.payload.email;
			state.uid = action.payload.uid;
			state.emailVerified = action.payload.emailVerified;
			state.signedIn = true;
		},
		logout: (state) => {
			state.photoUrl = "";
			state.displayName = "";
			state.email = "";
			state.uid = "";
			state.emailVerified = false;
			state.signedIn = false;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setAuth, logout } = authSlice.actions;

export default authSlice.reducer;

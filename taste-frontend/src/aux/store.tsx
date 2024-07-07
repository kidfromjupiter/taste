import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import messageSlice from "./messagingSlice";
import themeSlice from "./themeSlice";
export const store = configureStore({
	reducer: {
		auth: authSlice,
		message: messageSlice,
		theme: themeSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

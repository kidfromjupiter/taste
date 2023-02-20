import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import messageSlice from "./messagingSlice";
export const store = configureStore({
	reducer: {
		auth: authSlice,
		message: messageSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

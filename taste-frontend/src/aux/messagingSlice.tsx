import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export enum MessageType {
	ERROR = "error",
	SUCCESS = "success",
	INFO = "info",
	WARNING = "warning",
}

export interface MessageState {
	message: string;
	type: MessageType;
}

const initialState: MessageState = {
	message: "",
	type: MessageType.INFO,
};

export const messageSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		sendMessage: (state, action: PayloadAction<MessageState>) => {
			state.message = action.payload.message;
			state.type = action.payload.type;
		},
		clearMessage: (state) => {
			state.message = "";
			state.type = MessageType.INFO;
		},
	},
});

// Action creators are generated for each case reducer function
export const { sendMessage, clearMessage } = messageSlice.actions;

export default messageSlice.reducer;

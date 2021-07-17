import { createSlice } from "@reduxjs/toolkit";

const langSlice = createSlice({
	name: "lang",
	initialState: {
		current: "en",
	},
	reducers: {
		updateLang(state, action) {
			state.current = action.payload;
			localStorage.setItem("lang", action.payload);
		},
	},
});

export const langActions = langSlice.actions;
export default langSlice;

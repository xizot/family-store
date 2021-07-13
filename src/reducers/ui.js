import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
	name: "ui",
	initialState: {
		isOpenCart: false,
	},
	reducers: {
		toggleCartModal(state) {
			state.isOpenCart = !state.isOpenCart;
		},
	},
});

export const uiActions = uiSlice.actions;
export default uiSlice;

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../reducers/auth";
import cartSlice from "../reducers/cart";
import uiSlice from "../reducers/ui";

const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		ui: uiSlice.reducer,
		cart: cartSlice.reducer,
	},
});
export default store;

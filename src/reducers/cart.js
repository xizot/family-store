import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		data: [],
		totalAmount: 0,
	},
	reducers: {
		addItem(state, action) {
			const newItem = action.payload;
			const newItemPrice = newItem?.salePrice || newItem.price || 0;

			const newTotalAmount =
				Number(state.totalAmount) + Number(newItemPrice);

			const existingItemIndex = state.data.findIndex(
				(item) => item.id === newItem.id
			);

			const existingItem = state.data[existingItemIndex];

			if (!existingItem) {
				state.data = [
					...state.data,
					{ ...newItem, totalPrice: newItemPrice },
				];
			} else {
				const updatedItem = {
					...existingItem,
					quantity: existingItem.quantity + 1,
				};

				updatedItem.totalPrice = Number.parseFloat(
					updatedItem.quantity * newItemPrice
				).toFixed(2);

				state.data[existingItemIndex] = updatedItem;
			}
			state.totalAmount = Number.parseFloat(newTotalAmount).toFixed(2);
		},
		removeItem(state, action) {
			const existingItemIndex = state.data.findIndex(
				(item) => item.id === action.payload
			);

			const existingItem = state.data[existingItemIndex];

			const existingItemPrice =
				existingItem?.salePrice || existingItem.price;

			const newTotalAmount =
				Number(state.totalAmount) - Number(existingItemPrice);

			if (existingItem.quantity === 1) {
				state.data.splice(existingItemIndex, 1);
			} else {
				const updatedItem = {
					...existingItem,
					quantity: existingItem.quantity - 1,
				};

				updatedItem.totalPrice = Number.parseFloat(
					updatedItem.quantity * existingItemPrice
				).toFixed(2);

				state.data[existingItemIndex] = updatedItem;
			}

			state.totalAmount = Number.parseFloat(newTotalAmount).toFixed(2);
		},
		clearItem(state, action) {
			state.data = state.data.filter(
				(item) => item.id !== Number(action.payload)
			);
			state.totalAmount = state.data.reduce((totalAmount, item) => {
				return totalAmount + item.totalPrice;
			}, 0);
		},
	},
});

export const cartActions = cartSlice.actions;
export default cartSlice;

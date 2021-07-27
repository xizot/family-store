import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		data: [],
		totalAmount: 0,
	},
	reducers: {
		addItem(state, action) {
			const { quantity, ...newItem } = action.payload;
			const newItemPrice =
				quantity * Number(newItem?.salePrice || newItem.price);
			const newTotalAmount = +state.totalAmount + newItemPrice;
			const existingItemIndex = state.data.findIndex(
				(item) => item.id === newItem.id
			);

			const existingItem = state.data[existingItemIndex];

			if (!existingItem) {
				state.data = [
					...state.data,
					{ ...newItem, totalPrice: newItemPrice, quantity },
				];
			} else {
				const updatedItem = {
					...existingItem,
					quantity: existingItem.quantity + quantity,
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
				(item) => item.id !== action.payload
			);
			const newTotalAmount = state.data.reduce((totalAmount, item) => {
				return totalAmount + item.totalPrice;
			}, 0);

			state.totalAmount = Number.parseFloat(newTotalAmount).toFixed(2);
		},
	},
});

export const cartActions = cartSlice.actions;
export default cartSlice;

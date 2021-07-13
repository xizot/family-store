import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		data: [
			{
				id: 1,
				title: "Caffe Vergnano Coffee",
				image: "https://picksy.vercel.app/static/e648d27d1074d0facb34419d18776e2c/aa668/Coffee-7-update-1.webp",
				info: "Beans 450g",
				price: 5.0,
				totalPrice: 5.0,
				quantity: 1,
			},
			{
				id: 2,
				title: "Caffe Vergnano Coffee",
				image: "https://picksy.vercel.app/static/e648d27d1074d0facb34419d18776e2c/aa668/Coffee-7-update-1.webp",
				info: "Beans 450g",
				price: 5.0,
				totalPrice: 5.0,
				quantity: 1,
			},
			{
				id: 3,
				title: "Caffe Vergnano Coffee",
				image: "https://picksy.vercel.app/static/e648d27d1074d0facb34419d18776e2c/aa668/Coffee-7-update-1.webp",
				info: "Beans 450g",
				price: 5.0,
				totalPrice: 5.0,
				quantity: 1,
			},
			{
				id: 4,
				title: "Caffe Vergnano Coffee",
				image: "https://picksy.vercel.app/static/e648d27d1074d0facb34419d18776e2c/aa668/Coffee-7-update-1.webp",
				info: "Beans 450g",
				price: 5.0,
				totalPrice: 5.0,
				quantity: 1,
			},
		],
		totalAmount: 20.0,
	},
	reducers: {
		addItem(state, action) {
			const newItem = action.payload;
			const newTotalAmount = state.totalAmount + newItem.price;

			const existingItemIndex = state.data.findIndex(
				(item) => item.id === newItem.id
			);

			const existingItem = state.data[existingItemIndex];

			if (!existingItem) {
				state.data = [...state.data, newItem];
			} else {
				const updatedItem = {
					...existingItem,
					quantity: existingItem.quantity + 1,
				};
				updatedItem.totalPrice =
					updatedItem.quantity * updatedItem.price;
				state.data[existingItemIndex] = updatedItem;
			}
			state.totalAmount = newTotalAmount;
		},
		removeItem(state, action) {
			const existingItemIndex = state.data.findIndex(
				(item) => item.id === action.payload
			);

			const existingItem = state.data[existingItemIndex];
			const newTotalAmount = state.totalAmount - existingItem.price;

			if (existingItem.quantity === 1) {
				state.data.splice(existingItemIndex, 1);
			} else {
				const updatedItem = {
					...existingItem,
					quantity: existingItem.quantity - 1,
				};
				updatedItem.totalPrice =
					updatedItem.quantity * updatedItem.price;
				state.data[existingItemIndex] = updatedItem;
			}

			state.totalAmount = newTotalAmount;
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

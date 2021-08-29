// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { getResponseError } from '../helpers';
// import userCartApi from '../apis/user-cart';

// export const userGetListCart = createAsyncThunk(
//   'userCart/GetList',
//   async (_, { rejectWithValue }) => {
//     try {
//       return (await userCartApi.getList()).data;
//     } catch (error) {
//       return rejectWithValue(getResponseError(error));
//     }
//   }
// );

// export const userAddToCart = createAsyncThunk(
//   'userCart/GetList',
//   async ({ cartAmount, prodId }, { rejectWithValue }) => {
//     try {
//       return (await userCartApi.addToCart({ cartAmount, prodId })).data;
//     } catch (error) {
//       return rejectWithValue(getResponseError(error));
//     }
//   }
// );

// export const userUpdateCartAmount = createAsyncThunk(
//   'userCart/UpdateAmount',
//   async ({ cartAmount, cartId }, { rejectWithValue }) => {
//     try {
//       return (await userCartApi.updateAmount({ cartAmount, cartId })).data;
//     } catch (error) {
//       return rejectWithValue(getResponseError(error));
//     }
//   }
// );
// export const userDeleteCart = createAsyncThunk(
//   'userCart/DeleteAmount',
//   async ({ cartId }, { rejectWithValue }) => {
//     try {
//       return (await userCartApi.deleteItem({ cartId })).data;
//     } catch (error) {
//       return rejectWithValue(getResponseError(error));
//     }
//   }
// );

// const userCartSlice = createSlice({
//   name: 'userCart',
//   initialState: {
//     loading: false,
//     data: [],
//     totalPrice: 0,
//   },
//   extraReducers: {
//     [userGetListCart.pending]: (state) => {
//       state.loading = true;
//     },
//     [userGetListCart.rejected]: (state) => {
//       state.loading = false;
//     },
//     [userGetListCart.fulfilled]: (state, action) => {
//       state.loading = false;
//     },
//   },
// });

// export const userCartActions = userCartSlice.actions;
// export default userCartSlice;

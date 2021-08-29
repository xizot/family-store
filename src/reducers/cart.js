import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getResponseError } from '../helpers';
import userCartApi from '../apis/user-cart';

export const userGetListCart = createAsyncThunk(
  'userCart/GetList',
  async (_, { rejectWithValue }) => {
    try {
      return (await userCartApi.getList()).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

export const userAddToCart = createAsyncThunk(
  'userCart/AddNew',
  async ({ quantity, prodId, item }, { rejectWithValue }) => {
    try {
      await userCartApi.addToCart({ cartAmount: +quantity, prodId });
      const formatItem = {
        prodId: item.prod_id || item.prodId,
        prodName: item.prod_name || item.prodName,
        prodPrice: item.prod_price || item.prodPrice,
        prodImage: item.prod_img?.length > 0 ? item.prod_img[0] : item?.images || item.prodImage,
      };
      return { formatItem, quantity };
    } catch (error) {
      console.log(error);
      return rejectWithValue(getResponseError(error));
    }
  }
);

export const userUpdateCartAmount = createAsyncThunk(
  'userCart/UpdateAmount',
  async ({ cartAmount, cartId }, { rejectWithValue }) => {
    try {
      return (await userCartApi.updateAmount({ cartAmount, cartId })).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);
export const userDeleteCart = createAsyncThunk(
  'userCart/DeleteAmount',
  async ({ cartId }, { rejectWithValue }) => {
    try {
      return (await userCartApi.deleteItem({ cartId })).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    data: [],
    totalAmount: 0,
  },
  reducers: {
    removeItem(state, action) {
      const existingItemIndex = state.data.findIndex((item) => item.id === action.payload);

      const existingItem = state.data[existingItemIndex];

      const existingItemPrice = existingItem?.salePrice || existingItem.price;

      const newTotalAmount = Number(state.totalAmount) - Number(existingItemPrice);

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
      state.data = state.data.filter((item) => item.id !== action.payload);
      const newTotalAmount = state.data.reduce((totalAmount, item) => {
        return totalAmount + item.totalPrice;
      }, 0);

      state.totalAmount = Number.parseFloat(newTotalAmount).toFixed(2);
    },
  },
  extraReducers: {
    [userGetListCart.fulfilled]: (state, action) => {
      console.log('🚀 ~ file: cart.js ~ line 114 ~ action', action);

      if (!action.payload.errorMessage) {
        state.data = action.payload.listCart;
        state.totalAmount = action.payload.totalPrice;
      }
    },
    [userAddToCart.error]: (state, action) => {
      console.log(action.payload);
    },
    [userAddToCart.fulfilled]: (state, action) => {
      const { quantity, formatItem: newItem } = action.payload;
      const newItemPrice = quantity * +newItem.prodPrice;
      const newTotalAmount = +state.totalAmount + newItemPrice;
      const existingItemIndex = state.data.findIndex((item) => item.prodId === newItem.prodId);
      const existingItem = state.data[existingItemIndex];

      if (!existingItem) {
        state.data = [
          ...state.data,
          { ...newItem, totalPrice: newItemPrice, cartAmount: quantity },
        ];
      } else {
        const updatedItem = {
          ...existingItem,
          cartAmount: existingItem.cartAmount + quantity,
        };

        updatedItem.totalPrice = updatedItem.cartAmount * +updatedItem.prodPrice;

        state.data[existingItemIndex] = updatedItem;
      }
      state.totalAmount = newTotalAmount;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;

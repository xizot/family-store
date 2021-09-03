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
      const reponse = (await userCartApi.addToCart({ cartAmount: +quantity, prodId })).data;
      const formatItem = {
        prodId: item.prod_id || item.prodId,
        prodName: item.prod_name || item.prodName,
        prodPrice: item.prod_price || item.prodPrice,
        prodImage: item.prod_img?.length > 0 ? item.prod_img[0] : item?.images || item.prodImage,
        cartId: reponse.cartId,
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
      await userCartApi.updateAmount({ cartAmount, cartId });
      return { cartAmount, cartId };
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);
export const userDeleteCart = createAsyncThunk(
  'userCart/DeleteAmount',
  async ({ cartId }, { rejectWithValue }) => {
    try {
      await userCartApi.deleteItem(cartId);
      return cartId;
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
  reducers: {},
  extraReducers: {
    [userGetListCart.fulfilled]: (state, action) => {
      if (!action.payload.errorMessage) {
        state.data = action.payload.listCart;
        state.totalAmount = action.payload.totalPrice;
      } else {
        state.data = [];
        state.totalAmount = 0;
      }
    },

    [userUpdateCartAmount.fulfilled]: (state, action) => {
      const { cartAmount, cartId } = action.payload;
      const existingItemIndex = state.data.findIndex((item) => item.cartId === cartId);
      const existingItem = state.data[existingItemIndex];
      const newItemTotalPrice = cartAmount * +existingItem.prodPrice;

      const newTotalAmount = +state.totalAmount - +existingItem.totalPrice + newItemTotalPrice;

      if (existingItem.cartAmount === 1) {
        state.data.splice(existingItemIndex, 1);
      } else {
        const updatedItem = {
          ...existingItem,
          cartAmount: cartAmount,
        };

        updatedItem.totalPrice = newItemTotalPrice;

        state.data[existingItemIndex] = updatedItem;
      }

      state.totalAmount = newTotalAmount;
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
    [userDeleteCart.fulfilled]: (state, action) => {
      state.data = state.data.filter((item) => item.cartId !== action.payload);
      const newTotalAmount = state.data.reduce((totalAmount, item) => {
        return totalAmount + item.totalPrice;
      }, 0);

      state.totalAmount = newTotalAmount;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;

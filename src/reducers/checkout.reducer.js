import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkoutApi } from '../apis/checkout.api';
import { getResponseError } from '../helpers';

export const addBill = createAsyncThunk(
  'check/addBill',
  async (
    { receiverName, receiverPhone, receiverNote, accAddress, priceShip, listProduct },
    { rejectWithValue }
  ) => {
    try {
      return (
        await checkoutApi.addBill({
          receiverName,
          receiverPhone,
          receiverNote,
          accAddress,
          priceShip,
          listProduct,
        })
      ).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [addBill.pending]: (state) => {
      state.loading = true;
    },
    [addBill.rejected]: (state) => {
      state.loading = false;
    },
    [addBill.fulfilled]: (state) => {
      state.loading = false;
    },
  },
});

export const checkoutActions = checkoutSlice.actions;
export default checkoutSlice;

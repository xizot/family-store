import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deliveryApi } from '../apis/delivery.api';
import { getResponseError } from '../helpers';

export const userAddDelivery = createAsyncThunk(
  'delivery/addNew',
  async ({ accId, cityId, distId, wardId, delDetailAddress }, { rejectWithValue }) => {
    console.log('vao day');
    try {
      return (await deliveryApi.addNew({ accId, cityId, distId, wardId, delDetailAddress })).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);
export const userGetListDelivery = createAsyncThunk(
  'delivery/getList',
  async ({ accId }, { rejectWithValue }) => {
    try {
      return (await deliveryApi.getList(accId)).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

const deliverySlice = createSlice({
  name: 'delivery',
  initialState: {
    loading: false,
  },
  reducers: {},
  extraReducers: {},
});

export const deliveryActions = deliverySlice.actions;
export default deliverySlice;

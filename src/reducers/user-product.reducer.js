import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userProductApi from '../apis/user-product.api';
import { getResponseError } from '../helpers';

export const getListProductByCateAndPage = createAsyncThunk(
  'userProduct/GetList',
  async ({ catID, page }, { rejectWithValue }) => {
    try {
      return (await userProductApi.getListByCateIDAndPage({ catID, page })).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);
export const getProductDetail = createAsyncThunk(
  'userProduct/GetDetail',
  async ({ id }, { rejectWithValue }) => {
    try {
      return (await userProductApi.getDetail(id)).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

const userProductSlice = createSlice({
  name: 'userProduct',
  initialState: {
    loading: false,
    products: [],
    totalPage: 0,
  },
  extraReducers: {
    [getListProductByCateAndPage.pending]: (state) => {
      state.loading = true;
    },
    [getListProductByCateAndPage.rejected]: (state) => {
      state.loading = false;
    },
    [getListProductByCateAndPage.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload.listProduct;
      state.totalPage = action.payload.numberOfPage;
    },
  },
});

export const userProductActions = userProductSlice.actions;
export default userProductSlice;

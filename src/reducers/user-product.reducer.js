import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userProductApi from '../apis/user-product.api';
import { getResponseError } from '../helpers';

export const getHomeProduct = createAsyncThunk(
  'userProduct/getHomeProduct',
  async (_, { rejectWithValue }) => {
    try {
      return (await userProductApi.getHomeProduct()).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);
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

export const getListProductSuggestion = createAsyncThunk(
  'userProduct/GetListSuggest',
  async ({ catID, page }, { rejectWithValue }) => {
    try {
      return (await userProductApi.getListSuggest({ catID, page })).data;
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
      state.products = [];
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
    [getProductDetail.pending]: (state) => {
      state.loading = true;
    },
    [getProductDetail.rejected]: (state) => {
      state.loading = false;
    },
    [getProductDetail.fulfilled]: (state, action) => {
      state.loading = false;
    },
  },
});

export const userProductActions = userProductSlice.actions;
export default userProductSlice;

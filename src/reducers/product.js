import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminProductApis from '../apis/admin-product';
import { getResponseError } from '../helpers';

const initialState = {
  data: [],
  loading: false,
};

export const getListProductByPage = createAsyncThunk(
  'product/Add',
  async (page, { rejectWithValue }) => {
    try {
      return (await adminProductApis.getByPage(page)).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

const adminProductSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: {
    [getListProductByPage.pending]: (state) => {
      state.loading = true;
    },
    [getListProductByPage.rejected]: (state) => {
      state.loading = false;
    },
    [getListProductByPage.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload.listCategories;
      console.log('🚀 lít product', action.payload);
    },
  },
});

export const adminProductActión = adminProductSlice.actions;
export default adminProductSlice;

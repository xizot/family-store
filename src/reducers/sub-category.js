import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminSubCategoryApi from '../apis/admin-sub-category';
import { getResponseError } from '../helpers';

const initialState = {
  data: [],
  loading: false,
};

export const getListSubCategory = createAsyncThunk(
  'subcategory/Get',
  async (page, { rejectWithValue }) => {
    try {
      return (await adminSubCategoryApi.getListSubCategory(page)).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

const adminSubCategorySlice = createSlice({
  name: 'subCategory',
  initialState,
  reducers: {},
  extraReducers: {
    [getListSubCategory.pending]: (state) => {
      state.loading = true;
    },
    [getListSubCategory.rejected]: (state) => {
      state.loading = false;
    },
    [getListSubCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload.listCategories;
      console.log('🚀 ~ file: admin-subcategory.js ~ line 53 ~ action.payload', action.payload);
    },
  },
});

export const adminSubCategoryActions = adminSubCategorySlice.actions;
export default adminSubCategorySlice;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminCategoryApi from '../apis/admin-category';

const initialState = {
  data: [],
  loading: false,
};

export const addCategory = createAsyncThunk(
  'admin/Category',
  async ({ cateId, cateName }, { rejectWithValue }) => {
    console.log('🚀 ~ file: admin-category.js ~ line 12 ~  cateId, cateName', cateId, cateName);

    try {
      return (await adminCategoryApi.addCategory({ cateId, cateName })).data;
    } catch (error) {
      console.log('🚀 ~ file: admin-category.js ~ line 29 ~ error', error);

      return rejectWithValue(error.response.data?.errorMessage || 'Something went wrong!');
    }
  }
);

const adminCategorySlice = createSlice({
  name: 'adminCategory',
  initialState,
  reducers: {},
  extraReducers: {
    [addCategory.pending]: (state) => {
      state.loading = true;
    },
    [addCategory.rejected]: (state) => {
      state.loading = false;
    },
    [addCategory.fulfilled]: (state) => {
      state.loading = false;
    },
  },
});

export const adminCategoryActions = adminCategorySlice.actions;
export default adminCategorySlice;

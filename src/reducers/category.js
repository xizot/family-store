import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminCategoryApi from '../apis/admin-category';
import { getResponseError } from '../helpers';

const initialState = {
  data: [],
  loading: false,
};

export const addCategory = createAsyncThunk(
  'category/Add',
  async ({  cateName }, { rejectWithValue }) => {
    try {
      return (await adminCategoryApi.addCategory({ cateName })).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);
export const getListCategory = createAsyncThunk(
  'category/Get',
  async (page, { rejectWithValue }) => {
    try {
      return (await adminCategoryApi.getListCategory(page)).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'subcategory/Delete',
  async (id, { rejectWithValue }) => {
    try {
      return (await adminCategoryApi.deleteCategory(id)).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

export const updateSubCategory = createAsyncThunk(
  'subcategory/Update',
  async ({ cateId, cateName }, { rejectWithValue }) => {
    try {
      return (await adminCategoryApi.updateSubCategory( cateId, cateName)).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

const adminCategorySlice = createSlice({
  name: 'category',
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
    [getListCategory.pending]: (state) => {
      state.loading = true;
    },
    [getListCategory.rejected]: (state) => {
      state.loading = false;
    },
    [getListCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload.listCategories;
      console.log('🚀 ~ file: admin-category.js ~ line 53 ~ action.payload', action.payload);
    },
  },
});

export const adminCategoryActions = adminCategorySlice.actions;
export default adminCategorySlice;

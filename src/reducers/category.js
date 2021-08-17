import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminCategoryApi from '../apis/admin-category';
import { getResponseError } from '../helpers';

const initialState = {
  data: [],
  loading: false,
  totalPage: 0,
};

export const addCategory = createAsyncThunk(
  'category/Add',
  async ({ cateName }, { rejectWithValue }) => {
    try {
      return (await adminCategoryApi.addCategory({ cateName })).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);
export const getListCategory = createAsyncThunk(
  'category/Get',
  async (page = null, { rejectWithValue }) => {
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
      await adminCategoryApi.deleteCategory(id);
      return id;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

export const updateSubCategory = createAsyncThunk(
  'subcategory/Update',
  async ({ cateId, cateName }, { rejectWithValue }) => {
    try {
      return (await adminCategoryApi.updateCategory(cateId, cateName)).data;
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
    [getListCategory.pending]: (state) => {
      state.loading = true;
    },
    [getListCategory.rejected]: (state) => {
      state.loading = false;
    },
    [getListCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload.paginationResult;
      state.totalPage = action.payload.totalPage || 0;
    },
    [deleteCategory.fulfilled]: (state, action) => {
      state.data = state.data.filter((item) => item.cateId !== action.payload);
      state.totalPage = Math.floor(state.data / 10) + state.data / 10 > 0 ? 1 : 0 + 1;
    },
  },
});

export const adminCategoryActions = adminCategorySlice.actions;
export default adminCategorySlice;

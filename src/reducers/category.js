import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminCategoryApi from '../apis/admin-category';
import { getResponseError } from '../helpers';

const initialState = {
  data: [],
  loading: false,
  modifyLoading: false,
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
  'category/Delete',
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
  'category/Update',
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
    [addCategory.pending]: (state) => {
      state.modifyLoading = true;
    },
    [addCategory.rejected]: (state) => {
      state.modifyLoading = false;
    },
    [addCategory.fulfilled]: (state) => {
      state.modifyLoading = false;
    },
    [updateSubCategory.pending]: (state) => {
      state.modifyLoading = true;
    },
    [updateSubCategory.rejected]: (state) => {
      state.modifyLoading = false;
    },
    [updateSubCategory.fulfilled]: (state) => {
      state.modifyLoading = false;
    },
  },
});

export const adminCategoryActions = adminCategorySlice.actions;
export default adminCategorySlice;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminSubCategoryApi from '../apis/admin-sub-category';
import { getResponseError } from '../helpers';

const initialState = {
  data: [],
  totalPage: 0,
  loading: false,
};

export const getListSubCategory = createAsyncThunk(
  'subcategory/Get',
  async ({ cateFather, page }, { rejectWithValue }) => {
    try {
      return (await adminSubCategoryApi.getListSubCategory(cateFather, page)).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'subcategory/Delete',
  async (id, { rejectWithValue }) => {
    try {
      await adminSubCategoryApi.deleteCategory(id);
      return id;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

export const addSubCategory = createAsyncThunk(
  'subcategory/Add',
  async ({ cateFather, cateName }, { rejectWithValue }) => {
    try {
      return (await adminSubCategoryApi.addSubCategory(cateName, cateFather)).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

export const updateSubCategory = createAsyncThunk(
  'subcategory/Update',
  async ({ cateFather, cateId, cateName }, { rejectWithValue }) => {
    try {
      return (await adminSubCategoryApi.updateSubCategory(cateFather, cateId, cateName)).data;
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
      state.data = action.payload.subCategories;
      state.totalPage = action.payload.totalPage || 0;
    },
  },
});

export const adminSubCategoryActions = adminSubCategorySlice.actions;
export default adminSubCategorySlice;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminProductApis from '../apis/admin-product';
import { getResponseError } from '../helpers';

const initialState = {
  data: [],
  loading: false,
  modifyLoading: false,
};

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      return (await adminProductApis.deleteById(productId)).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);
export const updateProductImage = createAsyncThunk(
  'product/updateProductImage',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return (await adminProductApis.updateImages(id, data)).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);
export const updateProductInformation = createAsyncThunk(
  'product/updateProductInformation',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return (await adminProductApis.updateInformation(id, data)).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);
export const addNewProduct = createAsyncThunk(
  'product/addNewProduct',
  async (formData, { rejectWithValue }) => {
    console.log('Form data', formData);
    try {
      return (await adminProductApis.addNew(formData)).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);
export const getListProductByPage = createAsyncThunk(
  'product/getListProductByPage',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      return (await adminProductApis.getByPage(page, limit)).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

export const getByCate = createAsyncThunk(
  'product/getByCate',
  async ({ catID, page, limit }, { rejectWithValue }) => {
    try {
      return (await adminProductApis.getByCate({ catID, page, limit })).data;
    } catch (error) {
      console.log('🚀 ~ file: product.js ~ line 80 ~ error', error);
      return rejectWithValue(getResponseError(error));
    }
  }
);

const adminProductSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: {
    [getByCate.pending]: (state) => {
      state.loading = true;
    },
    [getByCate.rejected]: (state) => {
      state.loading = false;
    },
    [getByCate.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload.listCategories;
    },
    [addNewProduct.pending]: (state) => {
      state.modifyLoading = true;
    },
    [addNewProduct.rejected]: (state) => {
      state.modifyLoading = false;
    },
    [addNewProduct.fulfilled]: (state) => {
      state.modifyLoading = false;
    },
    [updateProductInformation.pending]: (state) => {
      state.modifyLoading = true;
    },
    [updateProductInformation.rejected]: (state) => {
      state.modifyLoading = false;
    },
    [updateProductInformation.fulfilled]: (state) => {
      state.modifyLoading = false;
    },
  },
});

export const adminProductActión = adminProductSlice.actions;
export default adminProductSlice;

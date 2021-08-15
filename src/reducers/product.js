import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminProductApis from '../apis/admin-product';
import { getResponseError } from '../helpers';

const initialState = {
  data: [],
  loading: false,
  modifyLoading: false,
};

export const deleteProduct = createAsyncThunk(
  'product/DeleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      return (await adminProductApis.deleteById(productId)).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);
export const addNewProduct = createAsyncThunk(
  'product/AddNewProduct',
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
  'product/GetList',
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
  },
});

export const adminProductActión = adminProductSlice.actions;
export default adminProductSlice;

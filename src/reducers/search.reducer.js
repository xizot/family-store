import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { searchApi } from '../apis/search.api';
import { getResponseError } from '../helpers';

const initialState = {
  loading: false,
  query: '',
};

export const searchProduct = createAsyncThunk(
  'search/Get',
  async ({ prodName, limit, page, sortBy, filter }, { rejectWithValue }) => {
    try {
      return (await searchApi.search({ prodName, limit, page, sortBy, filter })).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: {
    [searchProduct.pending]: (state) => {
      state.loading = true;
    },
    [searchProduct.rejected]: (state) => {
      state.loading = false;
    },
    [searchProduct.fulfilled]: (state) => {
      state.loading = false;
    },
  },
});

export const searchActions = searchSlice.actions;
export default searchSlice;

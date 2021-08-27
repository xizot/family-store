import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userCategoryApi from '../apis/user-category.api';
import { getResponseError } from '../helpers';

export const userGetListCategory = createAsyncThunk(
  'userCategory/GetList',
  async (_, { rejectWithValue }) => {
    try {
      return (await userCategoryApi.getList()).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

const userCategorySlice = createSlice({
  name: 'userCategory',
  initialState: {
    loading: false,
    categories: [],
  },
  extraReducers: {
    [userGetListCategory.pending]: (state) => {
      state.loading = true;
    },
    [userGetListCategory.rejected]: (state) => {
      state.loading = false;
    },
    [userGetListCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.categories = action.payload.paginationResult;
    },
  },
});

export const userCategoryActions = userCategorySlice.actions;
export default userCategorySlice;

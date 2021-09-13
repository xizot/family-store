import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { accountApi } from '../apis/account.api';
import { getResponseError } from '../helpers';

export const details = createAsyncThunk(
  'account/details',
  async ({ accId }, { rejectWithValue }) => {
    try {
      return (await accountApi.details(accId)).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);
export const insertOrUpdateAvatar = createAsyncThunk(
  'account/insertOrUpdateAvatar',
  async (data, { rejectWithValue }) => {
    console.log('🚀 ~ file: account.reducer.js ~ line 18 ~ data', data);
    try {
      return (await accountApi.insertOrUpdateAvatar(data)).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    loading: false,
    modifyLoading: false,
  },
  reducers: {},
  extraReducers: {
    [details.pending]: (state) => {
      state.loading = true;
    },
    [details.rejected]: (state) => {
      state.loading = false;
    },
    [details.fulfilled]: (state) => {
      state.loading = false;
    },
    [insertOrUpdateAvatar.pending]: (state) => {
      state.modifyLoading = true;
    },
    [insertOrUpdateAvatar.rejected]: (state) => {
      state.modifyLoading = false;
    },
    [insertOrUpdateAvatar.fulfilled]: (state) => {
      state.modifyLoading = false;
    },
  },
});

export const accountActions = accountSlice.actions;
export default accountSlice;

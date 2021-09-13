import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { adminAccountApi } from '../apis/admin-account.api';
import { getResponseError } from '../helpers';

export const getList = createAsyncThunk(
  'adminAccount/getList',
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      return (await adminAccountApi.getList(page, limit)).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);
export const deleteAccount = createAsyncThunk(
  'adminAccount/deleteAccount',
  async ({ accId }, { rejectWithValue }) => {
    try {
      return (await adminAccountApi.deleteAccount(accId)).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);
export const updateRole = createAsyncThunk(
  'adminAccount/updateRole',
  async ({ accId, accRole }, { rejectWithValue }) => {
    try {
      return (await adminAccountApi.updateRole({ accId, accRole })).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);
export const updateAccount = createAsyncThunk(
  'adminAccount/updateAccount',
  async (data, { rejectWithValue }) => {
    try {
      return (await adminAccountApi.updateAccount(data)).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

const adminAccountSlice = createSlice({
  name: 'adminAccount',
  initialState: {
    loading: false,
    modify: false,
  },
  reducers: {},
  extraReducers: {
    [getList.pending]: (state) => {
      state.loading = true;
    },
    [getList.rejected]: (state) => {
      state.loading = false;
    },
    [getList.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [updateAccount.pending]: (state) => {
      state.modify = true;
    },
    [updateAccount.rejected]: (state) => {
      state.modify = false;
    },
    [updateAccount.fulfilled]: (state) => {
      state.modify = false;
    },
  },
});

export const adminAccountActions = adminAccountSlice.actions;
export default adminAccountSlice;

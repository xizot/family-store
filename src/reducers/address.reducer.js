import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import addressApi from '../apis/address.api';
import { getResponseError } from '../helpers';

export const getListCity = createAsyncThunk(
  'address/getListCity',
  async (_, { rejectWithValue }) => {
    try {
      return (await addressApi.getListCity()).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);
export const getListDistrict = createAsyncThunk(
  'address/getListDistrict',
  async ({ cityId }, { rejectWithValue }) => {
    try {
      return (await addressApi.getListDistrict(cityId)).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);
export const getListWard = createAsyncThunk(
  'address/getListWard',
  async ({ cityId, districtId }, { rejectWithValue }) => {
    try {
      return (await addressApi.getListWard({ cityId, districtId })).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    cities: [],
    districts: [],
    wards: [],
  },
  reducers: {},
});

export const addressActions = addressSlice.actions;
export default addressSlice;

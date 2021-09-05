import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addressApi } from '../apis/address.api';
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
  reducers: {
    reset: (state) => {
      state.districts = [];
      state.wards = [];
    },
    removeDisctricts: (state) => {
      state.districts = [];
    },
    removeWards: (state) => {
      state.wards = [];
    },
  },
  extraReducers: {
    [getListCity.fulfilled]: (state, action) => {
      state.cities = action.payload.listcities;
    },
    [getListDistrict.fulfilled]: (state, action) => {
      state.districts = action.payload.listDistricts;
    },
    [getListWard.fulfilled]: (state, action) => {
      state.wards = action.payload.listcities;
    },
  },
});

export const addressActions = addressSlice.actions;
export default addressSlice;

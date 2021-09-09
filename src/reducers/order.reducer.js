import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import orderApi from '../apis/order';
import { getResponseError } from '../helpers';

const initialState = {
    data: [],
    delivering: [],
    delivered: [],
    totalPage: 0,
    loading: false,
    loadDelivering: false,
    loadDelivered: false
};

export const getAllOrder = createAsyncThunk(
    'order/GetAll',
    async ({ page }, { rejectWithValue }) => {
        try {
            return (await orderApi.getAll(page)).data;
        } catch (error) {
            return rejectWithValue(getResponseError(error));
        }
    }
);
export const getDeliveringOrder = createAsyncThunk(
    'order/GetDelivering',
    async ({ page }, { rejectWithValue }) => {
        try {
            return (await orderApi.getDelivering(page)).data;
        } catch (error) {
            return rejectWithValue(getResponseError(error));
        }
    }
);
export const getDeliveredOrder = createAsyncThunk(
    'order/GetDelivered',
    async ({ page }, { rejectWithValue }) => {
        try {
            return (await orderApi.getDelivered(page)).data;
        } catch (error) {
            return rejectWithValue(getResponseError(error));
        }
    }
);
const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: {
        [getAllOrder.pending]: (state) => {
            state.loading = true;
        },
        [getAllOrder.rejected]: (state) => {
            state.loading = false;
        },
        [getAllOrder.fulfilled]: (state, action) => {
            state.loading = false;
            state.data = action.payload.billList;
            state.totalPage = action.payload.totalPage || 0;
        },
        [getDeliveringOrder.pending]: (state) => {
            state.loadDelivering = true
        },
        [getDeliveringOrder.rejected]: (state) => {
            state.loadDelivering = false;
        },
        [getDeliveringOrder.fulfilled]: (state, action) => {
            state.loadDelivering = false;
            state.delivering = action.payload.billList;
            state.totalPage = action.payload.totalPage || 0;
        },
        [getDeliveredOrder.pending]: (state) => {
            state.loadDelivered = true
        },
        [getDeliveredOrder.rejected]: (state) => {
            state.loadDelivered = false;
        },
        [getDeliveredOrder.fulfilled]: (state, action) => {
            state.loadDelivered = false;
            state.delivered = action.payload.billList;
            state.totalPage = action.payload.totalPage || 0;
        },
    },
});

export const orderActions = orderSlice.actions;
export default orderSlice;

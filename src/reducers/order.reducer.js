import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import orderApi from '../apis/order';
import { getResponseError } from '../helpers';

const initialState = {
    data: [],
    detail: [],
    delivering: [],
    delivered: [],
    confirm: [],
    cancel: [],
    totalPage: 0,
    loading: false,
    loadDelivering: false,
    loadDelivered: false,
    loadConfirm: false,
    loadCancel:false,
    loadDetail:false,
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
export const getConfirmOrder = createAsyncThunk(
    'order/GetConfirm',
    async ({ page }, { rejectWithValue }) => {
        try {
            return (await orderApi.getConfirm(page)).data;
        } catch (error) {
            return rejectWithValue(getResponseError(error));
        }
    }
);
export const getCancelOrder = createAsyncThunk(
    'order/GetCancel',
    async ({ page }, { rejectWithValue }) => {
        try {
            return (await orderApi.getCancel(page)).data;
        } catch (error) {
            return rejectWithValue(getResponseError(error));
        }
    }
);

export const getDetailOrder = createAsyncThunk(
    'order/GetDetail',
    async ( billId , { rejectWithValue }) => {
        try {
            return (await orderApi.getDetail(billId)).data;
        } catch (error) {
            return rejectWithValue(getResponseError(error));
        }
    }
);

export const updateStatus = createAsyncThunk(
    'order/updateStatus',
    async ( {billId, status} , { rejectWithValue }) => {
        try {
            return (await orderApi.updateStatus(billId,status)).data;
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
        [getConfirmOrder.pending]: (state) => {
            state.loadConfirm = false;
        },
        [getConfirmOrder.rejected]: (state) => {
            state.loadConfirm = true;
        },
        [getConfirmOrder.fulfilled]: (state, action) => {
            state.loadConfirm = true;
            state.confirm = action.payload.billList;
            state.totalPage = action.payload.totalPage || 0;
        },
        [getCancelOrder.pending]: (state) => {
            state.loadCancel = false;
        },
        [getCancelOrder.rejected]: (state) => {
            state.loadCancel = true;
        },
        [getCancelOrder.fulfilled]: (state, action) => {
            state.loadCancel = true;
            state.cancel = action.payload.billList;
            state.totalPage = action.payload.totalPage || 0;
        },
        [getDetailOrder.pending]: (state) => {
            state.loadDetail = false;
        },
        [getDetailOrder.rejected]: (state) => {
            state.loadDetail = true;
        },
        [getDetailOrder.fulfilled]: (state, action) => {
            state.detail =action.payload.ListDetail;
            state.loadDetail = true;
            state.detail = action.payload.ListDetail;
        },
    },
});

export const orderActions = orderSlice.actions;
export default orderSlice;

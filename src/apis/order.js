import axios from '../axios/index';

const getAll = (page = 1, limit = 10) => {
    return axios.post('/api/bill/list/all', { page, limit });
};
const getDelivering = (page = 1, limit = 10) => {
    return axios.post('/api/bill/list/shipping', { page, limit });
};
const getDelivered = (page = 1, limit = 10) => {
    return axios.post('/api/bill/list/delivered', { page, limit });
};
const getConfirm = (page = 1, limit = 10) => {
    return axios.post('/api/bill/list/confirm', { page, limit });
};
const getCancel = (page = 1, limit = 10) => {
    return axios.post('/api/bill/list/cancel', { page, limit });
};

const orderApi = {
    getAll,
    getDelivering,
    getDelivered,
    getConfirm,
    getCancel
};

export default orderApi;

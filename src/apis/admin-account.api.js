import axios from '../axios/index';

export const adminAccountApi = {
  getList: (page, limit) => axios.get(`/api/account/list?page=${page}&limit=${limit}`),
  deleteAccount: (accId) => axios.post(`/api/account/delete/${accId}`),
  updateRole: ({ accId, accRole }) =>
    axios.post('/api/account/update-role', { accId: +accId, accRole }),
  updateAccount: (data) => axios.post('/api/account/update', data),
};

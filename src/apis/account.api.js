import axios from '../axios/index';

export const accountApi = {
  details: (accId) => axios.get(`/api/account/details/${accId}`),
  insertOrUpdateAvatar: (data) =>
    axios.post('/api/account/update-avatar', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

import axios from '../axios/index';

export const accountApi = {
  details: (accId) => axios.get(`/api/account/details/${accId}`),
};

import axios from '../axios/index';
export const deliveryApi = {
  addNew: ({ accId, cityId, distId, wardId, delDetailAddress }) =>
    axios.post('/api/delivery/add-delivery', {
      accId: +accId,
      cityId: +cityId,
      distId: +distId,
      wardId: +wardId,
      delDetailAddress,
    }),
  getList: (accId) => axios.post('/api/delivery/list-deliveries', { accId: +accId }),
};
